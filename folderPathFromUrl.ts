export function folderPathFromUrl(url: string) {
  const urlWithoutProtocol = url.replace(/https?:\/\//, '');
  const urlWithoutQueryString = urlWithoutProtocol.replace(/\?.*/, '');
  const urlWithoutTrailingSlash = urlWithoutQueryString.replace(/\/$/, '');
  return `./temp/${urlWithoutTrailingSlash}`;
}
  
