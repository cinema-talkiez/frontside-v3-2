import { openDB } from "idb";

const DB_NAME = "movieDB";
const STORE_NAME = "authStore";

const getDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

export const setItem = async (key, value) => {
  const db = await getDB();
  await db.put(STORE_NAME, value, key);
};

export const getItem = async (key) => {
  const db = await getDB();
  return db.get(STORE_NAME, key);
};

export const removeItem = async (key) => {
  const db = await getDB();
  await db.delete(STORE_NAME, key);
};
