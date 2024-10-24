'use client';

import { removeFile, uploadImage } from "@/libs/upload";
import Image from "next/image";
import { useState } from "react";

const Page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const uploadedImage = await uploadImage(file); // Ensure this stays client-side.
      setImages((prev) => [...prev, uploadedImage])
      setFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const removeImage = async (name:string) => {
    await removeFile(name)
    setImages((prev) => prev.filter((image) => image !== name));
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={onSubmit} className="mt-20">
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <input type="submit" value="Upload" />
      </form>
      <div className="mt-10 space-y-5">
        {images.map((item, index) => (
          <div className="relative" key={index}>
            <Image src={`/${item}`}  alt={item} width={500} height={500} />
            <button onClick={() => removeImage(item)} className="absolute top-0 right-0">delete file</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
