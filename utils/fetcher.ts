import fetch from "unfetch";

export function fetcher(url: string) {
  return fetch(url).then((res) => res.json());
}
