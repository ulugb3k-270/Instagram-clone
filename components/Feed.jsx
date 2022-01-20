import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestion from "./Suggestion";
import { useSession } from "next-auth/react";

export default function Feed() {
  const { data: session } = useSession();

  return (
    <main className={` grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto margins mb-3 ${!session && "!grid-cols-1 !max-w-3xl"}`}>
      <section className="col-span-2">
        <Stories />
        <Posts />
      </section>

      {session && (
        <section className="xl:inline-grid md:col-span-1 responsive">
          <div className="fixed top-12 ">
            <MiniProfile />
            <Suggestion />
          </div>
        </section>
      )}
    </main>
  );
}
