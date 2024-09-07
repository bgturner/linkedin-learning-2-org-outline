export function downloadHtml(url: string) {
  return fetch(url)
    .then((response) => response.text())
    .then((html) => {
      return html;
    });
}
