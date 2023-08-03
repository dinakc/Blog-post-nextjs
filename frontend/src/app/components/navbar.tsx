import Link from "next/link";

function Navbar() {
  return (
    <div className="flex flex-row justify-around items-center bg-slate-900 text-white h-16">
      <Link href="/home">Home</Link>
      <Link href="/blogs">Blogs</Link>
      <Link href="/login">About Us</Link>
      <Link href="/register">Login</Link>
    </div>
  );
}

export default Navbar;
