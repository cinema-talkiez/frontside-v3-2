export const setItem = async (key, value) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("appDB", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("storage")) {
        db.createObjectStore("storage");
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("storage", "readwrite");
      const store = transaction.objectStore("storage");
      store.put(value, key);
      resolve();
    };

    request.onerror = (event) => reject(event.target.error);
  });
};

export const getItem = async (key) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("appDB", 1);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("storage", "readonly");
      const store = transaction.objectStore("storage");
      const getRequest = store.get(key);

      getRequest.onsuccess = () => resolve(getRequest.result);
      getRequest.onerror = () => reject(getRequest.error);
    };

    request.onerror = (event) => reject(event.target.error);
  });
};

export const removeItem = async (key) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("appDB", 1);

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction("storage", "readwrite");
      const store = transaction.objectStore("storage");
      store.delete(key);
      resolve();
    };

    request.onerror = (event) => reject(event.target.error);
  });
};
