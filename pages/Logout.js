import { useRouter } from "next/router";
import { removeItem } from "@/utils/db";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await removeItem("loggedIn");
    console.log("User logged out ❌");

    router.push("/login"); // Redirect back to login
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
