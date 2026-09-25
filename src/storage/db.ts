import type { Channel } from "../types/channel";

const CHANNELS_KEY = "channels";

export async function getChannels(): Promise<Channel[]> {
    const result = await chrome.storage.local.get(CHANNELS_KEY);

    return (result[CHANNELS_KEY] as Channel[]) ?? [];
}