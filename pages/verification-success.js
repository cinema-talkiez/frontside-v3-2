import { useEffect } from "react";
import { useRouter } from "next/router";
import { openDB } from "idb";

export default function VerificationSuccess() {
  const router = useRouter();

  useEffect(() => {
    async function storeToken() {
      const db = await openDB("AuthDB", 1, {
        upgrade(db) {
          db.createObjectStore("auth");
        },
      });

      const expirationTime = Date.now() + 5 * 60 * 1000; // 5 minutes from now

      await db.put("auth", "true", "validToken");
      await db.put("auth", expirationTime, "validTokenExpiration");

      router.push("/index1"); // Redirect to homepage
    }

    storeToken();
  }, [router]);

  return (
    <div className="verification-success">
      <h1>Verification Successful!</h1>
      <p>Your token is now valid. Redirecting...</p>
    </div>
  );
}
