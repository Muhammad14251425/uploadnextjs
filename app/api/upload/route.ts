import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Resolve the path to the public folder
  const publicPath = path.join(process.cwd(), 'public', file.name);
  await writeFile(publicPath, buffer);
  console.log(`File saved at ${publicPath}`);

  return NextResponse.json({ success: true });
}
