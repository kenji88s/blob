import { list } from "@vercel/blob";

export async function GET() {
  const { blobs } = await list(); // 既存のファイル一覧を取得
  return Response.json(blobs);
}
