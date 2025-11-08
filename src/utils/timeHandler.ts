import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";

// 初始化配置
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

// 静态时间处理（固定时间点，如创建时间）
export const staticTime = {
  /**
   * 格式化静态时间
   * @param time 时间（支持 Date、时间戳、字符串）
   * @param format 格式字符串，默认 'YYYY-MM-DD HH:mm:ss'
   */
  format(time: Date | number | string, format: string = "YYYY-MM-DD HH:mm:ss") {
    return dayjs(time).format(format);
  },

  /**
   * 获取静态时间的时间戳
   * @param time 时间（支持 Date、时间戳、字符串）
   */
  getTimestamp(time: Date | number | string): number {
    return dayjs(time).valueOf();
  },

  /**
   * 计算与当前时间的相对时间（一次性计算）
   * @param time 时间（支持 Date、时间戳、字符串）
   */
  getRelative(time: Date | number | string): string {
    return dayjs().to(dayjs(time));
  },
};

// 动态时间处理（实时更新的时间）
export const dynamicTime = {
  // 存储定时器的映射表
  timers: new Map<string, number>(),

  /**
   * 获取当前时间
   * @param format 格式字符串，默认 'YYYY-MM-DD HH:mm:ss'
   */
  getCurrent(format: string = "YYYY-MM-DD HH:mm:ss"): string {
    return dayjs().format(format);
  },

  /**
   * 启动实时相对时间更新
   * @param id 唯一标识（用于停止更新）
   * @param targetTime 目标时间
   * @param callback 每次更新的回调函数
   * @param interval 更新间隔（毫秒），默认1000ms
   */
  startRelativeUpdate(
    id: string,
    targetTime: Date | number | string,
    callback: (relativeTime: string) => void,
    interval: number = 1000
  ) {
    // 先清除已有的定时器
    this.stopUpdate(id);

    // 立即执行一次
    callback(dayjs().to(dayjs(targetTime)));

    // 设置定时器并存储
    const timerId = window.setInterval(() => {
      callback(dayjs().to(dayjs(targetTime)));
    }, interval);

    this.timers.set(id, timerId);
  },

  /**
   * 启动实时时钟更新
   * @param id 唯一标识
   * @param callback 每次更新的回调函数
   * @param format 时间格式
   * @param interval 更新间隔（毫秒）
   */
  startClockUpdate(
    id: string,
    callback: (currentTime: string) => void,
    format: string = "YYYY-MM-DD HH:mm:ss",
    interval: number = 1000
  ) {
    this.stopUpdate(id);

    callback(this.getCurrent(format));

    const timerId = window.setInterval(() => {
      callback(this.getCurrent(format));
    }, interval);

    this.timers.set(id, timerId);
  },

  /**
   * 停止指定ID的更新
   * @param id 要停止的定时器ID
   */
  stopUpdate(id: string) {
    const timerId = this.timers.get(id);
    if (timerId) {
      window.clearInterval(timerId);
      this.timers.delete(id);
    }
  },

  /**
   * 停止所有更新
   */
  stopAllUpdates() {
    this.timers.forEach((timerId) => {
      window.clearInterval(timerId);
    });
    this.timers.clear();
  },
};
