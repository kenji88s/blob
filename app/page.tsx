"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [files, setFiles] = useState<{ url: string; name: string }[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  // 初期ロードで一覧取得
  useEffect(() => {
    const fetchFiles = async () => {
      const res = await fetch("/api/list");
      const data = await res.json();
      setFiles(data.map((f: any) => ({ url: f.url, name: f.pathname })));
    };
    fetchFiles();
  }, []);

  // アップロード
  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.url) {
      setFiles((prev) => [...prev, { url: data.url, name: data.pathname }]);
      setPreview(null);
    }
  }

  // 削除
  async function handleDelete(url: string) {
    await fetch("/api/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    setFiles((prev) => prev.filter((f) => f.url !== url));
  }

  return (
    <main className="flex flex-col items-center gap-6 p-8">
      {/* アップロードフォーム */}
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

      {/* プレビュー */}
      {preview && (
        <div>
          <p>プレビュー:</p>
          <img src={preview} alt="preview" className="max-w-xs rounded-md" />
        </div>
      )}

      {/* 一覧表示 */}
      <div className="grid grid-cols-2 gap-4">
        {files.map((f) => (
          <div key={f.url} className="relative">
            <img src={f.url} alt={f.name} className="max-w-xs rounded-md" />
            <button
              onClick={() => handleDelete(f.url)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-1 text-sm"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
