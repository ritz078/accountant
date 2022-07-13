export function fetcher(url: string) {
  return fetch(url).then((res) => res.json());
}
