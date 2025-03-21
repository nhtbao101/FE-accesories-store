export const setLocalStorage = (name: any, items: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(name, JSON.stringify(items));
  }
};
export const getLocalStorage = (name: any) => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(name);
    if (data) {
      return JSON.parse(data);
    } else {
      localStorage.setItem(name, JSON.stringify([]));
      return [];
    }
  }
};
