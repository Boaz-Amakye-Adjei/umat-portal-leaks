"use client";
import { useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import Link from "next/link";

export default function SmallScreenNav() {
  const [isopen, setIsOpen] = useState(false);

  const toggleNavBar = () => {
    setIsOpen((curr) => !curr);
  };

  return (
    <div className="md:hidden">
      <button
        onClick={toggleNavBar}
        className="border-green-300 border-solid border p-2 text-xl rounded "
      >
        {isopen ? <IoClose /> : <IoMenu />}
      </button>

      <div className="relative">
        <div
          className={`${
            isopen ? "visible" : "invisible"
          } absolute bg-white z-50 bottom-[-290px] right-[-20px] p-[20px] delay-100 transition-all `}
        >
          <ul className="flex flex-col w-[265px] gap-3">
            <Link
              href="/"
              className="px-3 py-2 border-[grey] border-solid border rounded bg-green-200"
            >
              Home
            </Link>

            <Link href="/about" className="px-3 py-2 rounded">
              About
            </Link>

            <Link href="/contact" className="px-3 py-2 rounded">
              Contact
            </Link>

            <li className="border border-solid border-[grey] my-3"></li>

            <button className="px-3 py-2 rounded bg-green-800 text-white">
              Submit Petition
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
}
