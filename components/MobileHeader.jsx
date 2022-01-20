import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon,
  LoginIcon,
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

export default function MobileHeader({ providers }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useRecoilState(modalState);

  return (
    <>
      <header className="  shadow-sm border-b bg-white fixed top-0 w-full z-50 p-2">
        <div className="flex justify-between items-center">
          <div
            onClick={() => router.push("/")}
            className="relative flex-shrink-0  w-40 h-8 cursor-pointer"
          >
            <Image
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt="Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <div className="relative h-6 flex align-center justify-center  ">
            <PaperAirplaneIcon className="h-6 " />
            <div className="absolute bg-red-600 text-white rounded-full w-4 h-4 -right-2 -top-1 flex items-center justify-center text-xs">
              1
            </div>
          </div>
        </div>
      </header>
      <div
        className={`show__display  shadow-sm border-b bg-white fixed bottom-0 w-full z-50 ${
          session ? "p-2" : "p-0"
        }`}
      >
        {session ? (
          <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto align-center">
            <>
              <div
                onClick={() => router.push("/")}
                className="flex-shrink-0  w-7 flex align-center"
              >
                <HomeIcon />
              </div>

              <div className="flex-shrink-0  w-7 flex align-center">
                <SearchIcon />
              </div>

              <div className="flex-shrink-0  w-7 flex align-center">
                <PlusCircleIcon onClick={() => setOpen(true)} />
              </div>

              <div className="flex-shrink-0  w-7 flex align-center">
                <HeartIcon />
              </div>
              <div className="flex-shrink-0  w-7 flex align-center">
                <img
                  src={session?.user?.image}
                  alt="profile pic"
                  className="h-6 w-6 rounded-full object-contain cursor-pointer"
                  onClick={signOut}
                />
              </div>
            </>
          </div>
        ) : (
          <div
            onClick={signIn}
            className="flex-1 flex align-center justify-center rounded-sm bg-blue-500 text-white p-1"
          >
            Log in
          </div>
        )}
      </div>
    </>
  );
}
