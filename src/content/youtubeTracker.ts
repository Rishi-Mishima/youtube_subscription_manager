// Get Channel's id and name 

import { log } from "node:console";

console.log("YouTube Subscription Manager content script loaded");

function getVideoId(): string | null {
    const url = new URL(window.location.href);

    return url.searchParams.get("v");
}

function getChannelName(): string | null {
    const channelElement = document.querySelector("ytd-channel-name a");

    return channelElement?.textContent?.trim() ?? null;
}





console.log("Current video ID:", videoId);

// 异步 DOM 加载 - MutationObserver

function detectVideo() {
    const videoId = getVideoId();

    const channelName = getChannelName();

    if (videoId && channelName) {
        console.log("Video detected:", {
            videoId,
            channelName
        });

    }
}

// 监听
const observer = new MutationObserver(() => {
    detectVideo();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// 再次主动执行detectVideo  - 因为如果 Content Script 执行的时候 DOM 已经加载好了，没必要等下一次 DOM mutation。
detectVideo();