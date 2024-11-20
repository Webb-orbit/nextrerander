"use client"
import { useEffect, useState } from 'react'
import { Comboitems, Itembutton } from '../../utiles/Combo'
import { useDispatch, useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { TbTableOptions } from "react-icons/tb";
import { MdOutlineDeleteOutline, MdOutlineCreate  } from "react-icons/md";
import { setoffrender } from '@/app/store/offlineslice'
import Deleteofflinedoc from './Deleteofflinedoc'
import Createofflinedoc from './Createofflinedoc'

const Crudoffline = () => {
    const [moreop, setmoreop] = useState(false)
    const dispatch = useDispatch()
    const { compo } = useSelector(state => state.offlinestore.randers)

    useEffect(() => {
        setmoreop(false)
    }, [compo])

    const documentoptions = [
        {
            id: nanoid(),
            compo: <Createofflinedoc key={"create"} />,
            icon: <MdOutlineCreate />,
            text: "create",
            className: "",
            active: true
        },
        {
            id: nanoid(),
            compo: <Deleteofflinedoc key={"delete"} />,
            icon: <MdOutlineDeleteOutline />,
            text: "delete",
            className: "hover:bg-red-600/80",
            active: true
        },
    ]

  return (
    <div className=' fixed bottom-10 right-4'>
    <div className=' relative'>
        <Comboitems active={moreop} >
            {documentoptions.map((e) => (
                e.active && <Itembutton
                    onClick={() => {dispatch(setoffrender(e.compo))}}
                    className={`w-[15rem] py-[0.5rem] flex items-center group gap-3 hover:bg-neutral-800 ${e.className}`}
                    key={e.id}>
                    {e.icon}
                    <p className='duration-75 group-hover:translate-x-1 text-[0.9rem]'>{e.text}</p>
                </Itembutton>
            ))}
        </Comboitems>
    </div>

    <button className='fixed bottom-4 bg-neutral-900 rounded-full right-4 py-2 px-3' onClick={() => setmoreop(pre => !pre)}><TbTableOptions/></button>
</div>
  )
}

export default Crudoffline