import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <Link href="/login">
        <button>Go to Login</button>
      </Link>
    </div>
  );
}
