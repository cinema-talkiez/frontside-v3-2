import { useRouter } from "next/router";
import { removeItem } from "@/utils/db";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await removeItem("loggedIn");
    await removeItem("expiryTime");

    console.log("❌ Logged out!");

    router.push("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
