import Link from "next/link";
import AuthModal from "../auth/AuthModal";

const Navbar = () => {
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div className="flex items-center">
        {/* <button className="bg-blue-400 text-white border p-1 px-4 rounded mr-3">
            Sign in
          </button> */}
        <AuthModal signin />
        <AuthModal />
      </div>
    </nav>
  );
};

export default Navbar;
