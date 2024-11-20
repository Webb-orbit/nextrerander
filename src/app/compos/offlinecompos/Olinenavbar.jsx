"use client"
import React from 'react'
import Logo from '@/app/utiles/Logo';
import { MdMoreVert } from "react-icons/md";
import { addData } from '@/app/indexedstore';
import { usePathname } from 'next/navigation';

const Olinenavbar = () => {
    const pathname = usePathname()
    console.log(pathname);
    
    return (
        <>
            <div className='flex items-center justify-between px-20 h-16 max-sm:px-3'>
                <div className='flex items-center justify-start gap-3 relative'>
                    <Logo />
                    <p className='max-w-[15rem] w-fit truncate text-[0.9rem] text-neutral-500 select-none font-medium max-sm:hidden'>{pathname}</p>
                </div>
                <div className='flex items-center justify-start gap-3'>
                    <button onClick={() => addData({
                        "_id": "671f7235a0e16867e402db30",
                        "title": "success",
                        "content": "one day i can to prove our are right! Update on phone ",
                        "creator": "6708c307122e7907ddf97463",
                        "shared": true,
                        "shareid": "672efd9a1ff4113db28fb21e",
                        "createdAt": "2024-10-28T11:15:01.609Z",
                        "updatedAt": "2024-11-13T09:45:56.733Z",
                        "__v": 0
                    })} className=' py-0 rounded-sm px-1 hover:bg-neutral-800 '><MdMoreVert /></button>
                </div>

            </div>
        </>
    )
}

export default Olinenavbar