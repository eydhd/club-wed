<template>
  <Tuo></Tuo>
  <Return></Return>
  <Returns></Returns>
  <div class="comment-section">
    <!-- 评论输入区 -->
    <div class="comment-input-section">
      <textarea
        v-model="newCommentContent"
        placeholder="写下你的评论..."
        class="comment-input"
        @keydown.enter.exact.prevent="handleSubmitComment"
      ></textarea>
      <button
        class="submit-btn"
        @click="handleSubmitComment"
        :disabled="!newCommentContent.trim()"
      >
        发布评论
      </button>
    </div>

    <!-- 评论列表 -->
    <div class="comments-list">
      <div v-if="loading" class="loading">加载中...</div>
      <div v-if="error" class="error">{{ error }}</div>

      <div v-for="comment in comments" :key="comment.id" class="comment-item">
        <!-- 评论头部 -->
        <div class="comment-header">
          <div class="avatar" :style="{ backgroundColor: comment.avatarColor }">
            {{ comment.author.charAt(0).toUpperCase() }}
          </div>
          <div class="author-info">
            <div class="author-name">{{ comment.author }}</div>
            <div class="comment-time">
              {{ formatTime(comment.timestamp) }}
            </div>
          </div>
        </div>

        <!-- 评论内容 -->
        <div
          class="comment-content"
          v-html="sanitizedHTML(comment.content)"
        ></div>

        <!-- 评论操作 -->
        <div class="comment-actions">
          <button
            class="action-btn like-btn"
            @click="handleLike(comment.id)"
            :class="{ liked: comment.liked }"
          >
            <span class="like-icon">♥</span>
            <span class="like-count">{{ comment.likes }}</span>
          </button>
          <button class="action-btn reply-btn" @click="toggleReply(comment.id)">
            回复
          </button>
        </div>

        <!-- 回复输入框 -->
        <div v-if="comment.showReplyInput" class="reply-input-section">
          <textarea
            v-model="comment.replyContent"
            placeholder="写下你的回复..."
            class="reply-input"
            @keydown.enter.exact.prevent="handleSubmitReply(comment.id)"
          ></textarea>
          <div class="reply-buttons">
            <button class="cancel-btn" @click="toggleReply(comment.id)">
              取消
            </button>
            <button
              class="submit-reply-btn"
              @click="handleSubmitReply(comment.id)"
              :disabled="!comment.replyContent.trim()"
            >
              回复
            </button>
          </div>
        </div>

        <!-- 回复列表 -->
        <div class="replies-list" v-if="comment.replies.length">
          <div
            v-for="reply in comment.replies"
            :key="reply.id"
            class="reply-item"
          >
            <div class="reply-header">
              <div
                class="reply-avatar"
                :style="{ backgroundColor: reply.avatarColor }"
              >
                {{ reply.author.charAt(0).toUpperCase() }}
              </div>
              <div class="reply-author">{{ reply.author }}</div>
              <div class="reply-time">{{ formatTime(reply.timestamp) }}</div>
            </div>
            <div
              class="reply-content"
              v-html="sanitizedHTML(reply.content)"
            ></div>
          </div>
        </div>
      </div>

      <div
        v-if="comments.length === 0 && !loading && !error"
        class="no-comments"
      >
        暂无评论，快来抢沙发吧~
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {
  fetchComments,
  submitCommentAction,
} from "@/api/commentApi";
import type { Comment, Reply } from "@/api/commentApi";
import { sanitizeInput, sanitizeHTML } from "@/utils/xss";
import Tuo from "@/components/tuo/tuo.vue";
import Returns from "@/components/return/returns.vue";
import Return from "@/components/return/return.vue";

// 扩展Comment类型以支持本地状态
interface CommentWithState extends Comment {
  showReplyInput: boolean;
  replyContent: string;
}

// 状态管理
const comments = ref<CommentWithState[]>([]);
const newCommentContent = ref("");
const loading = ref(false);
const error = ref("");

// 获取评论列表
const loadComments = async () => {
  try {
    loading.value = true;
    error.value = "";
    const data = await fetchComments();
    // 为每条评论添加本地状态
    comments.value = data.map((comment) => ({
      ...comment,
      showReplyInput: false,
      replyContent: "",
    }));
  } catch (err) {
    error.value = "加载评论失败，请稍后重试";
    console.error("Failed to load comments:", err);
  } finally {
    loading.value = false;
  }
};

// 初始化加载评论
onMounted(loadComments);

// 格式化时间
const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

// 处理HTML内容 sanitize
const sanitizedHTML = (html: string) => {
  return sanitizeHTML(html);
};

// 提交新评论
const handleSubmitComment = async () => {
  if (!newCommentContent.value.trim()) return;

  try {
    // 使用sanitizeInput处理纯文本输入
    const sanitizedContent = sanitizeInput(newCommentContent.value);

    const newComment = await submitCommentAction("comment", {
      author: "当前用户", // 实际应用中应从用户信息中获取
      avatarColor: getRandomColor(),
      content: sanitizedContent,
      timestamp: Date.now(),
      likes: 0,
      liked: false,
      replies: [] as Reply[],
    } as Omit<Comment, "id">);

    // 添加到评论列表
    comments.value.unshift({
      ...(newComment as Comment),
      showReplyInput: false,
      replyContent: "",
    });

    // 清空输入框
    newCommentContent.value = "";
  } catch (err) {
    console.error("Failed to submit comment:", err);
    alert("发布评论失败，请稍后重试");
  }
};

// 切换回复输入框显示状态
const toggleReply = (commentId: string | number) => {
  const comment = comments.value.find((c) => c.id === commentId);
  if (comment) {
    comment.showReplyInput = !comment.showReplyInput;
    // 清空回复内容
    if (!comment.showReplyInput) {
      comment.replyContent = "";
    }
  }
};

// 提交回复
const handleSubmitReply = async (commentId: string | number) => {
  const comment = comments.value.find((c) => c.id === commentId);
  if (!comment || !comment.replyContent.trim()) return;

  try {
    // 使用sanitizeInput处理纯文本输入
    const sanitizedContent = sanitizeInput(comment.replyContent);

    const newReply = await submitCommentAction("reply", {
      commentId,
      reply: {
        author: "当前用户", // 实际应用中应从用户信息中获取
        avatarColor: getRandomColor(),
        content: sanitizedContent,
        timestamp: Date.now(),
      } as Omit<Reply, "id">,
    });

    // 添加到回复列表
    comment.replies.unshift(newReply as Reply);

    // 清空并关闭回复输入框
    comment.replyContent = "";
    comment.showReplyInput = false;
  } catch (err) {
    console.error("Failed to submit reply:", err);
    alert("发布回复失败，请稍后重试");
  }
};

// 处理点赞
const handleLike = async (commentId: string | number) => {
  const comment = comments.value.find((c) => c.id === commentId);
  if (!comment) return;

  try {
    const currentLikedState = comment.liked;
    // 先本地更新UI
    comment.liked = !currentLikedState;
    comment.likes += currentLikedState ? -1 : 1;

    // 调用API
    await submitCommentAction("like", {
      commentId,
      liked: !currentLikedState,
    });
  } catch (err) {
    console.error("Failed to toggle like:", err);
    // 失败时回滚UI状态
    comment.liked = !comment.liked;
    comment.likes += comment.liked ? -1 : 1;
    alert("操作失败，请稍后重试");
  }
};

// 生成随机头像颜色
const getRandomColor = () => {
  const colors = [
    "#4285F4",
    "#EA4335",
    "#FBBC05",
    "#34A853",
    "#9C27B0",
    "#FF9800",
    "#795548",
    "#673AB7",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
</script>

<style scoped>
.comment-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 150px;
}

.comment-input-section {
  margin-bottom: 30px;
}

.comment-input,
.reply-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 80px;
  margin-bottom: 10px;
}

.submit-btn,
.submit-reply-btn {
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:disabled,
.submit-reply-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.comments-list {
  gap: 20px;
}

.comment-item {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar,
.reply-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 10px;
}

.reply-avatar {
  width: 28px;
  height: 28px;
  font-size: 12px;
}

.author-info {
  flex: 1;
}

.author-name {
  font-weight: bold;
  margin-bottom: 2px;
}

.comment-time,
.reply-time {
  font-size: 12px;
  color: #666;
}

.comment-content,
.reply-content {
  margin-bottom: 10px;
  line-height: 1.6;
}

.comment-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
}

.action-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.action-btn:hover {
  color: #4285f4;
}

.like-btn.liked .like-icon {
  color: #ea4335;
}

.reply-input-section {
  margin-top: 10px;
  padding-left: 46px;
}

.reply-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.cancel-btn {
  background-color: #eee;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.replies-list {
  margin-top: 15px;
  padding-left: 46px;
  border-left: 2px solid #eee;
}

.reply-item {
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}

.reply-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-size: 14px;
}

.reply-author {
  font-weight: bold;
  margin-right: 10px;
}

.loading,
.no-comments {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error {
  text-align: center;
  padding: 20px;
  color: #ea4335;
}
</style>
