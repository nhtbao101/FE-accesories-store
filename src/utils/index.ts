export const urlFriendlyName = (fileName: string) =>
  fileName
    .replace(/[^a-zA-Z0-9. ]/g, '') // Remove special characters except space and dot
    .replace(/(?<=\.)\.+/g, '') // Remove extra dots but keep the first one before the extension
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .toLowerCase();
