import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { requireAdmin } from "@/lib/guard";

const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/avif", "image/gif", "image/svg+xml"];
const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(req: Request) {
  const blocked = await requireAdmin();
  if (blocked) return blocked;

  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Local /public/uploads is read-only in production. Add a real object store to enable uploads." },
      { status: 403 }
    );
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ error: `Unsupported type: ${file.type}` }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (>8MB)" }, { status: 400 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name) || guessExt(file.type);
  const base = path.basename(file.name, ext).replace(/[^a-z0-9-]+/gi, "-").toLowerCase().slice(0, 40) || "upload";
  const name = `${base}-${Date.now()}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), buf);

  return NextResponse.json({ url: `/uploads/${name}` });
}

function guessExt(mime: string) {
  if (mime === "image/jpeg") return ".jpg";
  if (mime === "image/svg+xml") return ".svg";
  return "." + mime.split("/")[1];
}
