// showMsg.ts
import { createApp } from "vue";
import MessageBox from "@/components/MessageBox/MessageBox.vue";

// 定义弹框配置项类型
interface MsgOptions {
  message: string;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  showCancelBtn?: boolean;
  closeOnClickOutside?: boolean;
}

// 定义回调函数类型
interface MsgCallbacks {
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

// 优化后的弹框调用函数
export function showMsg(
  options: string | MsgOptions,
  callbacks?: MsgCallbacks
) {
  // 处理字符串形式的调用
  if (typeof options === "string") {
    options = { message: options };
  }

  const div = document.createElement("div");
  document.body.appendChild(div);

  // 创建应用实例
  const app = createApp(MessageBox, {
    ...options,
    visible: true, // 确保弹框显示
    onConfirm: () => {
      callbacks?.onConfirm?.();
      app.unmount();
      div.remove();
    },
    onCancel: () => {
      callbacks?.onCancel?.();
      app.unmount();
      div.remove();
    },
    onClose: () => {
      callbacks?.onClose?.();
      app.unmount();
      div.remove();
    },
  });

  app.mount(div);
}
