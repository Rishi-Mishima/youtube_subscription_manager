import "./styles.css";
import { saveChannels, getChannels } from "../storage/db";
import { useEffect, useState } from "react";
import type { Channel } from "../types/channel";
import { channel } from "node:diagnostics_channel";

export function App() {

  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    async function loadChannels() {
      const storedChannels = await getChannels();

      setChannels(storedChannels);
    }
    loadChannels();
  }, []);

  async function handleTestSave() {
    await saveChannels({
      id: "UC_TEST_001",
      title: "Fireship",
      url: "https://www.youtube.com/@Fireship",
      thumbnailUrl: "",
      lastUploadAt: null
    });

    const updatedChannels = await getChannels();

    setChannels(updatedChannels);
  }


  return (
    <main className="side-panel">
      <h1>YouTube Subscription Manager</h1>
      <p>Extension is running.</p>

      <button onClick={handleTestSave}>Save Test Channel</button>

      <h2>My Channels</h2>

      {channels.map(channel => (
        <div key={channel.id}>
          <strong>{channel.title}</strong>
        </div>
      ))}

    </main>
  );
}
