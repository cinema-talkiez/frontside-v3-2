import { useRouter } from "next/router";
import { setItem } from "@/utils/db";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async () => {
    const expiryTime = Date.now() + 5 * 60 * 1000; // 5 minutes expiry

    await setItem("loggedIn", "true");
    await setItem("expiryTime", expiryTime);

    console.log("✅ Login successful (Session expires in 5 mins)");

    router.push("/index1"); // Redirect to index1
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
