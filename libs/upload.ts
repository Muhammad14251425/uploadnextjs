'use server'
import { mkdir, writeFile, access, rm, rmdir } from 'fs/promises';
import path from 'path';

export async function uploadImage(file: File) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const publicPath = path.join(process.cwd(), 'public', file.name);
    await writeFile(publicPath, buffer);
    // const relativePath = path.relative(path.join(process.cwd(), 'public'), publicPath);
    console.log(`File saved at ${publicPath}`);
}

export async function createFolder(folderName:string) {
    const folderPath = path.join(process.cwd(), 'public', folderName);
    await mkdir(folderPath, { recursive: true });
}

export async function folderExists(folderName: string): Promise<boolean> {
    const folderPath = path.join(process.cwd(), 'public', folderName);
    try {
        // Try accessing the folder
        await access(folderPath);
        console.log(true)
        return true; // Folder exists
    } catch {
        console.log(false)
        return false; // Folder does not exist
    }
}

export async function deleteFolder(folderName: string) {
    const folderPath = path.join(process.cwd(), 'public', folderName);
    try {
        await rmdir(folderPath, { recursive: true });
        console.log(`Folder deleted at ${folderPath}`);
    } catch (error) {
        console.error(`Error deleting folder: ${folderName}`);
    }
}

export async function removeFile(fileName: string, folderName?: string) {
    const filePath = path.join(process.cwd(), 'public', folderName || '', fileName);
    try {
        await rm(filePath);
        console.log(`File removed at ${filePath}`);
    } catch (error) {
        console.error(`Error removing file: ${fileName}`);
    }
}
