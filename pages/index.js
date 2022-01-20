import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";
import { useSession } from "next-auth/react";

export default function Home() {
  return (
    <div className="bg-gray-50 overflow-y-scroll scrollbar-hide">
      <Head>
        <title>CLONE</title>
        <link
          rel="shortcut icon"
          href="https://www.instagram.com/static/images/ico/apple-touch-icon-76x76-precomposed.png/666282be8229.png"
          type="image/x-icon"
        />
      </Head>
      <Header />
      <Feed />
      <Modal />
    </div>
  );
}
