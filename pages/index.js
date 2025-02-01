import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { openDB } from "idb";

export default function HomePage() {
  const [validToken, setValidToken] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkTokenValidity() {
      const db = await openDB("AuthDB", 1);
      const storedValidToken = await db.get("auth", "validToken");
      const storedExpirationTime = await db.get("auth", "validTokenExpiration");

      if (storedValidToken === "true" && storedExpirationTime) {
        if (Date.now() < storedExpirationTime) {
          setValidToken(true);
        } else {
          setValidToken(false);
          await db.delete("auth", "validToken");
          await db.delete("auth", "validTokenExpiration");
        }
      } else {
        setValidToken(false);
      }

      setCheckingToken(false);
    }

    checkTokenValidity();
  }, []);

  return (
    <div className="container">
      {checkingToken ? (
        <p>Checking token...</p>
      ) : (
        <>
          {!validToken && (
            <button onClick={() => router.push("/verify")} className="verifyButton">
              Verify Now
            </button>
          )}

          {validToken && (
            <Link href="/index1">
              <button className="visitButton">Visit HomePage</button>
            </Link>
          )}
        </>
      )}
    </div>
  );
}
