import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  LoginIcon
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import MobileHeader from "./MobileHeader";

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useRecoilState(modalState);

  return (
    <>
    <MobileHeader />
    <header className=" header__main  shadow-sm border-b bg-white fixed top-0 w-full z-50">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        <div
          onClick={() => router.push("/")}
          className="relative  hidden lg:inline-grid w-24"
        >
          <Image
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt="Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div
          onClick={() => router.push("/")}
          className="relative lg:hidden flex-shrink-0  w-10 cursor-pointer"
        >
          <Image
            src="https://i.ibb.co/sqD4sHb/insta-logo.png"
            alt="Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className="relative mt-1 p-3 rounded-md">
          <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-100 block w-full p-2 pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black"
          />
        </div>

        <div className="flex items-center justify-end space-x-4">
          <HomeIcon onClick={() => router.push("/")} className="icons-w-h" />
          <PlusCircleIcon
                onClick={() => setOpen(true)}
                className=" h-6 w-6 cursor-pointer transition-all duration-150 ease-out"
              />
          {session ? (
            <>
              <div className="relative icons-w-h">
                <PaperAirplaneIcon className="icons-w-h " />
                <div className="absolute bg-red-600 text-white rounded-full w-4 h-4 -right-2 -top-1 flex items-center justify-center text-xs">
                  1
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setOpen(true)}
                className="icons-w-h"
              />
              <UserGroupIcon className="icons-w-h" />
              <HeartIcon className="icons-w-h" />
              <img
                src={session?.user?.image}
                alt="profile pic"
                className="h-6 w-6 rounded-full object-contain cursor-pointer"
                onClick={signOut}
              />
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </header>
    </>
  );
}
