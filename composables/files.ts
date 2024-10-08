import type { DefaultTheme } from 'vitepress'
import fs from 'node:fs/promises'
import path from 'node:path'

/**
 * Return a list of absolute path of plain files strings given a directory
 * @param dir Directory to get file from
 * @returns Absolute paths of all plain files in dir
 */
async function getFiles(dir: string): Promise<string[]> {
  const dirents = await fs.readdir(dir, { withFileTypes: true })
  const files = await Promise.all(dirents.map(async (dirent) => {
    const res = path.resolve(dir, dirent.name);
    return (dirent.isDirectory() ? getFiles(res) : res);
  }));
  return Array.prototype.concat(...files);
}

/**
 * Current working directory of the build
 */
const cwd = process.cwd()

/**
 * Directory of the notes
 */
export const noteRootDir = `${cwd}/pages`

/**
 * Return a list of sidebar navigation links given a directory of notes
 * @param dir The directory of notes to get from
 * @returns { text: filename, link: /relative/path/to/file }
 */
export async function getNavItems(dir: string): Promise<DefaultTheme.SidebarItem[]> {
  const markdownFiles = await getFiles(dir)
    .then(files => files.filter(file => file.endsWith('.md')))
    .then(files => files.map(file => file.replace(/\.md$/, '')))
    .then(files => files.map(file => file.replace(cwd, '')))
  return markdownFiles.map(file => ({ text: file.split('/').pop(), link: file }))
}
