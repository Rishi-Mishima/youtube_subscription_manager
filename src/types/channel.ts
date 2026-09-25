export type Channel = {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  lastUploadAt: string | null; // 因为 Channel 可以已经存在，但我们还没有拿到最近一次上传时间。
};
