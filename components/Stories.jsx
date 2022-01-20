import faker from "faker/locale/en";
import { useEffect, useState } from "react";
import Story from "./Story";
import { useSession } from "next-auth/react";
export default function Stories() {
  const {data: session} = useSession()
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);
  return (
    <div className="flex overflow-x-scroll space-x-2 bg-white mt-8 border-gray-200 border rounded-sm p-3 scrollbar-thin scrollbar-thumb-gray-200">
      {session && (
        <div>
        <img src={session?.user?.image} alt={session?.user?.username} className='w-14 h-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-105 transition transform-duration-200 ease-out'  />
        <p className='text-xs w-14 truncate text-center'>Your Story</p>
    </div>
      )}
      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          name={profile.name}
          username={profile.username}
          avatar={profile.avatar}
        />
      ))}
    </div>
  );
}
