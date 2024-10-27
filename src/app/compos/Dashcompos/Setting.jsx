"use client"

import {useState } from 'react'
import Optionbox from '@/app/utiles/Optionbox'
import { useDispatch } from 'react-redux';
import { setrandercompo } from '@/app/store/dashslice';
import Profile from './setting/Profile';
import { nanoid } from '@reduxjs/toolkit';
import Apikey from './setting/Apikey';
import Sharetting from './setting/Sharetting';
import { TbWebhook } from "react-icons/tb";
import { CgProfile, CgListTree } from "react-icons/cg";

const Setting = () => {
    const dispatch = useDispatch()
    const [selecompo, setselecompo] = useState(<Profile key={"profile"} />)

    const sidenav = [
        {
            id: nanoid(),
            name: "profile",
            compo: <Profile key={"profile"} />,
            icon: <CgProfile/>
        },
        {
            id: nanoid(),
            name: "api key",
            compo: <Apikey key={"api key"} />,
            icon:  <TbWebhook/>
        },
        {
            id: nanoid(),
            name: "manage shares",
            compo: <Sharetting key={"manage shares"} />,
            icon:  <CgListTree/>
        },
    ]

    const rendercompo = (id) => {
        const rendered = sidenav.filter(e => e.id == id)
        const finallycom = rendered[0].compo || "hello motto"
        setselecompo(finallycom)
    }

    return (
        <Optionbox
            dialog={"settings"}
            container={"flex items-center justify-center backdrop-blur-sm z-[99999]"}
            closehandel={() => dispatch(setrandercompo(null))}
            classes={"static w-[90%] h-[90vh]"}>
            <div className=' flex items-stretch  w-full h-full justify-between'>
                <div className='flex fixed flex-col gap-3 w-[20%]  px-4 py-8 select-none'>
                    {sidenav.map((e) => (
                        <button
                            onClick={() => rendercompo(e.id)} key={e.id}
                            className={`text-white roboto tracking-wide text-[0.9rem] capitalize  px-2 py-1 rounded-md flex items-center group gap-3 ${selecompo.key == e.name ? "bg-blue-600" : "hover:bg-neutral-800"}`}
                        >
                            {e.icon}
                            <p className=' duration-75 group-hover:translate-x-1 text-[0.8rem]'>{e.name}</p>
                        </button>
                    ))}
                </div>

                <div className='ml-[25%] w-[80%] py-8'>
                    {selecompo}
                </div>
            </div>
        </Optionbox>
    )
}

export default Setting