"use client";

import { useState } from "react";

export default function Home() {
  const [preview, setPreview] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.url) setUrl(data.url);
  }

  return (
    <main className="flex flex-col items-center gap-4 p-8">
      <form onSubmit={handleUpload} className="flex flex-col gap-2">
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setPreview(URL.createObjectURL(file));
          }}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          アップロード
        </button>
      </form>

      {preview && (
        <div>
          <p>プレビュー:</p>
          <img src={preview} alt="preview" className="max-w-xs rounded-md" />
        </div>
      )}

      {url && (
        <div>
          <p>アップロード完了 🎉</p>
          <a href={url} target="_blank" className="text-blue-500 underline">
            {url}
          </a>
          <img src={url} alt="uploaded" className="max-w-xs rounded-md mt-2" />
        </div>
      )}
    </main>
  );
}
