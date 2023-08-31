export const mutations = {
  position: 0,
};

export function getLocalStorageItem(item: string) {
  if (typeof window === "undefined") return null;

  return localStorage.getItem(item)
    ? JSON.parse(localStorage.getItem(item) ?? "")
    : null;
}
