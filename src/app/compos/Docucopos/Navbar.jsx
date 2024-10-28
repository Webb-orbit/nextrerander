/* eslint-disable react/prop-types */
"use client"
import Buttons from "@/app/utiles/Buttons"
import { Gicon } from "@/app/utiles/Gicon"
import Logo from "@/app/utiles/Logo"
import { useSelector } from "react-redux"
import { Minwidth } from "@/app/utiles/Minwidth"
import Link from "next/link"
import { useState } from "react"
import { Itemlink, Itembutton } from "@/app/utiles/Combo"
import Image from "next/image"
import { PickLogOut } from "@/app/lib/auth"
import { useRouter } from "next/navigation"

const Navbar = ({ auther }) => {
    const { status } = useSelector(state => state.clientstore)
    const [activenav, setactivenav] = useState(false)
    const router = useRouter()

    const logout = async ()=>{
        try {
            const log = await PickLogOut()
            if (!log.success) {
                throw new Error(log.message)
            }
            router.push("/login")
        } catch (error) {
            console.log(error);
            
        }
    }
    
    return (
        <Minwidth>
            <div className=" w-full h-20 flex  items-center justify-between  py-3 relative">
                <div className="flex items-center gap-4 ">
                    <Logo />
                </div>
                {status ? (
                    <>
                        <div className=" flex items-center gap-5">
                            <Link href={"/dashboard"} className=" select-none capitalize text-zinc-500  font-medium hover:text-zinc-400 text-[0.9rem]">dashbord</Link>
                            {auther?.logo ? <span className="w-9 h-9 rounded-full relative" onClick={() => setactivenav(pre => !pre)}><Image alt="logo"  src={auther.logo} fill className=" select-none object-cover object-center  cursor-pointer  " /> </span>: (
                                <div onClick={() => setactivenav(pre => !pre)} className="w-9 h-9  rounded-full bg-zinc-700 cursor-pointer flex items-center justify-center select-none text-[1.2rem] font-medium capitalize">{auther?.username?.substring(0, 1)}</div>)}
                        </div>
                    </>
                ) : (
                    <Link href={"/login"}>
                        <Buttons>
                            <Gicon icon={"login"} /> login
                        </Buttons>
                    </Link>
                )}
                <div className={`bg-neutral-900 outline outline-1 outline-neutral-300/50 p-2  flex-col absolute w-[18rem] z-10 rounded-md h-[20rem] right-1 top-20  gap-4 ${activenav ? "flex" : "hidden"} `}>
                    <div className="h-[9rem] rounded-md w-full bg-neutral-700 flex flex-col items-center justify-center gap-3">
                        <span className=" w-12 h-12 rounded-full overflow-hidden relative">
                        <Image alt="logo" src={auther.logo} fill className=" select-none object-cover object-center  cursor-pointer  " />
                        </span>

                        <p className=" font-medium text-[0.9rem] w-[80%] truncate text-center">{auther.username}</p>
                    </div>

                    <div className="flex flex-col gap-2 justify-between  overflow-y-scroll scroll">
                        <Itemlink href={"/"}>account setting</Itemlink>
                        <Itembutton className={"text-[0.9rem] shadow-2xl shadow-red-300 font-medium  hover:bg-red-500/60 hover:text-black"} onClick={logout}>logout</Itembutton>
                    </div>
                </div>
            </div>
        </Minwidth>
    )
}

export default Navbar