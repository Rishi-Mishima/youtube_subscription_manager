import type { Channel } from "../types/channel";

const CHANNELS_KEY = "channels";

// 获取频道列表 (getChannels)
export async function getChannels(): Promise<Channel[]> {
    const result = await chrome.storage.local.get(CHANNELS_KEY);

    return (result[CHANNELS_KEY] as Channel[]) ?? [];
}

// 保存/更新频道 (saveChannels)
export async function saveChannels(channel: Channel): Promise<void> {
    const channels = await getChannels();

    const existingIndex = channels.findIndex(
        existingChannel => existingChannel.id === channel.id
    );

    if (existingIndex === -1) {
        // 没找到（返回 -1）：说明这是一个新频道，直接推入数组末尾
        channels.push(channel);
    } else {
        // 找到了：说明之前存过，用新的 channel 数据覆盖掉旧位置的数据
        channels[existingIndex] = channel;
    }

    await chrome.storage.local.set({
        [CHANNELS_KEY]: channels
    });
}