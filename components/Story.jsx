import React from 'react'
import { useSession } from 'next-auth/react'

export default function Story({username, key}) {
    return (
        <div>
            <img src={`https://avatars.dicebear.com/api/adventurer/${username}.svg`} alt={username} className='w-14 h-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-105 transition transform-duration-200 ease-out'  />
            <p className='text-xs w-14 truncate text-center'>{username}</p>
        </div>
    )
}
