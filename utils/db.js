import { openDB } from "idb";

export async function setToken(value, expiryMinutes = 5) {
  const db = await openDB("myAppDB", 1, {
    upgrade(db) {
      db.createObjectStore("storage");
    },
  });

  await db.put("storage", value, "validToken");
  const expirationTime = Date.now() + expiryMinutes * 60 * 1000;
  await db.put("storage", expirationTime.toString(), "validTokenExpiration");
}

export async function getToken() {
  const db = await openDB("myAppDB", 1);
  const storedToken = await db.get("storage", "validToken");
  const expirationTime = await db.get("storage", "validTokenExpiration");

  if (storedToken === "true" && expirationTime) {
    if (Date.now() < parseInt(expirationTime)) {
      return true;
    } else {
      await db.delete("storage", "validToken");
      await db.delete("storage", "validTokenExpiration");
      return false;
    }
  }
  return false;
}
