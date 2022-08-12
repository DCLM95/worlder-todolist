import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

function Header() {
  return (
    <div className="flex relative top-0 bg-[#ffff64] w-full text-white items-center justify-center space-x-5  p-4 shadow-lg">
      <p className="text-black text-2xl font-bold">WORLDER</p>
      <button
        className="px-1 py-1 w-20 bg-black rounded-lg text-white hover:bg-white hover:text-black absolute z-50 right-1"
        onClick={() => {
          signOut(auth);
        }}
      >
        {" "}
        Sign out
      </button>
    </div>
  );
}

export default Header;
