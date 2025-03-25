import Image from "next/image";
import SmallScreenNav from "./smallscreennav";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-4 bg-white justify-between flex items-center px-[20px] md:px-[30px] lg:px-[50px]">
      <div>
        <Image src="/umatlogo.jpg" width={30} height={30} alt="UMaT Logo" />
      </div>
      <nav className="hidden md:block">
        <ul className="flex gap-3 justify-center items-center">
          <li>
            <Link
              href="/"
              className="border-b-green-300 borer-solid border py-2 px-3 rounded text-green-800 hover:bg-green-200 cursor-pointer delay-75 shadow"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="py-2 px-3 rounded  hover:bg-green-200 cursor-pointer delay-75"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="py-2 px-3 rounded  hover:bg-green-200 cursor-pointer delay-75"
            >
              Contact
            </Link>
          </li>
          <li>
            <button className="py-2 px-3 rounded  hover:bg-green-200 bg-green-600 text-white cursor-pointer delay-75">
              Submit Petition
            </button>
          </li>
        </ul>
      </nav>

      <SmallScreenNav />
    </header>
  );
}
