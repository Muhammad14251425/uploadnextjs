'use client';

import { removeFile, uploadImage } from "@/libs/upload";
import { useState } from "react";

const Page = () => {
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      await uploadImage(file); // Ensure this stays client-side.
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <input type="submit" value="Upload" />
      </form>
      <button onClick={() => removeFile("Samsung Galaxy S23 DeX Wallpaper 6 YTECHB.png")}>delete file</button>
    </div>
  );
};

export default Page;
