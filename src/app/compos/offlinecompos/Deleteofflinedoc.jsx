"use client"
import Optionbox from '@/app/utiles/Optionbox'
import { useDispatch } from 'react-redux'
import Buttons from '@/app/utiles/Buttons'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useParams } from 'next/navigation'
import { setoffrender } from '@/app/store/offlineslice'


const Deleteofflinedoc = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const {offdocid} = useParams()
    console.log(offdocid);
    
    const deletehandel = async () => {
        console.log("deleted");
    }

  return (
    <Optionbox
    dialog={"Are you sure?"}
    classes={"static w-[25rem] h-[10rem]"}
    container={"flex backdrop-blur-sm items-center justify-center"}
    closehandel={() => dispatch(setoffrender(null))} >
    <div className='py-2 flex flex-col  justify-center h-full gap-3'>
        <div>
            <p className='text-[0.6rem] text-neutral-300 uppercase font-medium'> document id : {offdocid}</p>
            <p className='text-[0.8rem] text-neutral-300'>This action cannot be undone. This will permanently delete your offline document</p>
        </div>
        <div className='flex gap-3 justify-end'>
            <Buttons onClick={() => dispatch(setoffrender(null))} bclass={"text-[0.8rem] bg-neutral-700 text-white hover:bg-neutral-800 hover:text-white "}>cancel</Buttons>
            <Buttons onClick={deletehandel} bclass={"text-[0.8rem] bg-neutral-300 text-black hover:bg-neutral-400 hover:text-black "}>YES, Delete</Buttons>
        </div>
    </div>
</Optionbox>
  )
}

export default Deleteofflinedoc