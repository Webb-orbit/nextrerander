"use client"
import Optionbox from '@/app/utiles/Optionbox'
import { useDispatch } from 'react-redux'
import Buttons from '@/app/utiles/Buttons'
import { useRouter } from 'next/navigation'
import React from 'react'
import { setoffrender } from '@/app/store/offlineslice'
import { useForm } from 'react-hook-form'
import { addData } from '@/app/indexedstore'
import { nanoid } from '@reduxjs/toolkit'


const Createofflinedoc = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { handleSubmit, register, formState: { errors } } = useForm();

    const createdoc = async ({title}) => {
        try {
            const data = await addData({content:"hello, how are you?",title:title, _id: nanoid(), createdAt: Date.now()})
            console.log("create offline data---> ",  data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Optionbox
            dialog={"create offline document"}
            classes={"static w-[25rem] h-[10rem]"}
            container={"flex backdrop-blur-sm items-center justify-center"}
            closehandel={() => dispatch(setoffrender(null))} >
            <div className='py-2 flex flex-col justify-center h-full w-full items-center'>
                {errors.title && <p className='text-[0.7rem] capitalize items-start text-rose-500 animate-pulse'>{errors.title.message}</p>}
                <form onSubmit={handleSubmit(createdoc)} className='w-[90%] flex  flex-col gap-5 text-neutral-300 inter '>
                    <input
                        {...register("title", { required: "document title is required" })}
                        spellCheck={false}
                        className='w-full bg-neutral-800 rounded-sm px-3 py-1   outline-none'
                        type="text" />
                    <div className=' w-full justify-end items-center flex'>
                        <Buttons type={"submit"} bclass={"text-[0.8rem] bg-neutral-300 text-black hover:bg-neutral-400 hover:text-black capitalize"}>create</Buttons>
                    </div>
                </form>
            </div>
        </Optionbox>
    )
}

export default Createofflinedoc