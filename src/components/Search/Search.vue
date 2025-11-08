<template>
  <div class="search-container">
    <div class="search-wrapper">
      <!-- 搜索输入框 -->
      <div class="search-input-group">
        <input
          type="text"
          v-model="searchQuery"
          @input="handleInput"
          @keydown.down="handleKeyNavigation('down')"
          @keydown.up="handleKeyNavigation('up')"
          @keydown.enter="handleEnter"
          @focus="showSuggestions = true"
          placeholder="搜索..."
          class="search-input"
          ref="searchInputRef"
        />
        <button class="search-btn" @click="handleSearch">
          <i class="search-icon">🔍</i>
        </button>
      </div>

      <!-- 搜索建议列表 -->
      <div
        v-if="showSuggestions && suggestions.length > 0"
        class="suggestions-list"
        @mouseleave="resetHighlightedIndex"
      >
        <div
          v-for="(suggestion, index) in suggestions"
          :key="index"
          class="suggestion-item"
          :class="{ highlighted: highlightedIndex === index }"
          @click="selectSuggestion(suggestion)"
          @mouseenter="highlightedIndex = index"
        >
          {{ suggestion }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "./index.scss";
import { ref, watch, onMounted } from "vue";
import type { Ref } from "vue";
import { debounce } from "@/utils/Anti-shake";
import { SearchService } from "@/utils/search-service";
import { sanitizeInput } from "@/utils/xss";

// 初始化搜索服务
const searchService = new SearchService();

// 响应式变量
const searchQuery: Ref<string> = ref("");
const suggestions: Ref<string[]> = ref([]);
const showSuggestions: Ref<boolean> = ref(false);
const highlightedIndex: Ref<number> = ref(-1);
const searchInputRef: Ref<HTMLInputElement | null> = ref(null);

// 处理输入事件 - 使用防抖
const handleInput = debounce(async () => {
  const safeQuery = sanitizeInput(searchQuery.value);
  showSuggestions.value = true;
  highlightedIndex.value = -1;

  // 获取搜索建议
  suggestions.value = await searchService.getSuggestions(safeQuery);
}, 300);

// 处理搜索
const handleSearch = async () => {
  const result = await searchService.performSearch(searchQuery.value);

  if (result.success) {
  } else {
    console.warn(result.message);
  }

  showSuggestions.value = false;
};

// 处理回车键
const handleEnter = () => {
  if (highlightedIndex.value !== -1 && suggestions.value.length > 0) {
    const suggestion = suggestions.value[highlightedIndex.value];
    if (suggestion !== undefined) {
      selectSuggestion(suggestion);
    } else {
      handleSearch();
    }
  } else {
    handleSearch();
  }
};

// 选择建议项
const selectSuggestion = (suggestion: string) => {
  searchQuery.value = suggestion;
  showSuggestions.value = false;
  highlightedIndex.value = -1;
  handleSearch();
};

// 处理键盘导航
const handleKeyNavigation = (direction: "up" | "down") => {
  if (!showSuggestions.value || suggestions.value.length === 0) return;

  if (direction === "down") {
    highlightedIndex.value =
      highlightedIndex.value === suggestions.value.length - 1
        ? 0
        : highlightedIndex.value + 1;
  } else {
    highlightedIndex.value =
      highlightedIndex.value <= 0
        ? suggestions.value.length - 1
        : highlightedIndex.value - 1;
  }
};

// 重置高亮索引
const resetHighlightedIndex = () => {
  highlightedIndex.value = -1;
};

// 点击外部关闭建议列表
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Element;
  if (
    searchInputRef.value &&
    !searchInputRef.value.contains(target) &&
    !target?.closest(".suggestions-list")
  ) {
    showSuggestions.value = false;
    highlightedIndex.value = -1;
  }
};

// 挂载时添加点击外部事件监听
onMounted(() => {
  document.addEventListener("click", handleClickOutside);

  // 清理函数
  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
});

// 监听搜索词变化
watch(searchQuery, (newVal) => {
  if (!newVal.trim()) {
    suggestions.value = [];
    showSuggestions.value = false;
  }
});
</script>
