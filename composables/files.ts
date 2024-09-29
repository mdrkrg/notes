import fs from 'node:fs/promises'
import path from 'node:path'

async function getFiles(dir: string): Promise<string[]> {
  const dirents = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(dirents.map(async (dirent) => {
    const res = path.resolve(dir, dirent.name);
    return (dirent.isDirectory() ? getFiles(res) : res);
  }));
  return Array.prototype.concat(...files);
}

const cwd = process.cwd()

export const noteRootDir = `${cwd}/pages`

export async function getNavItems(dir: string) {
  const markdownFiles = await getFiles(dir)
    .then(files => files.filter(file => file.endsWith('.md')))
    .then(files => files.map(file => file.replace(/\.md$/, '')))
    .then(files => files.map(file => file.replace(cwd, '')))
  return markdownFiles.map(file => ({ text: file.split('/').pop(), link: file }))
}
