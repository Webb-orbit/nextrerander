"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Optionbox from '@/app/utiles/Optionbox';
import { setrandercompo } from '@/app/store/dashslice';
import Togglebtn from '@/app/utiles/Togglebtn';
import Buttons from '@/app/utiles/Buttons';
import { QRCodeSVG } from 'qrcode.react';
import { PickOneDoc } from '@/app/lib/docs';
import { PickCreateShare, PickOneShare } from '@/app/lib/shares';
import { useParams } from 'next/navigation';
import { IoQrCodeOutline } from "react-icons/io5";

const Sharebox = () => {
    const {docid} = useParams()
    console.log(docid);
    
    const dispatch = useDispatch()
    
    const [shared, setshared] = useState(null)
    const [shareinfo, setshareinfo] = useState(null)
    const [sharepri, setsharepri] = useState(false)
    const [fetched, setfetched] = useState(false)
    const [showqr, setshowqr] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const shareed = await PickOneDoc(docid)
                if (!shareed.success) {
                    throw new Error(shareed.message)
                }
                const respon = shareed.data
                setshared(respon.shared)
                if (respon.shared) {
                    const newshare = await PickOneShare(respon.shareid)
                    if (!newshare.success) {
                        throw new Error(newshare.message)
                    }
                    const response = newshare.data
                    setshareinfo(response)
                    console.log("ADD SHARE IS ON THE DOCUMENT MODEL OK", response);
                }
            } catch (error) {
                console.log(error);
            } finally{
                setfetched(true)
            }
        })()

        return ()=>{
            setfetched(false)
            setshowqr(false)
            setshared(null)
            setshareinfo(null)
            setsharepri(false)
        }
    }, [docid])

    const createshare = async () => {
        try {
            const newshare = await PickCreateShare(docid, { privated: sharepri })
            if (!newshare.success) {
                throw new Error(newshare.message)
            }
            console.log("new share", newshare);
            const respon = newshare.data
            setshared(true)
            setshareinfo(respon)

        } catch (error) {
            console.log(error);

        }
    }

    const copyurl = () => {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/share/${shareinfo?._id}`)
    }

    return (
        <Optionbox
            dialog={"Share File"}
            container={"flex items-center justify-center backdrop-blur-sm"}
            classes={"static w-[35%] h-[65vh] "}
            closehandel={() => dispatch(setrandercompo(null))}>
            {fetched?<div className=' py-3 h-full'>
                {
                    shared && shareinfo? (
                        <div className=' flex flex-col   gap-5'>
                            <h3>your Public link</h3>
                            <div className='flex flex-col justify-between h-full gap-3'>
                                <div className=' flex items-center justify-between  px-1'>
                                    <div className='py-2 flex  items-center justify-between outline-1   outline  rounded-md px-1  w-[80%]  '>
                                        <input type="text" value={`${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/share/${shareinfo?._id}`} readOnly className={` bg-neutral-950  outline-none border-none text-[0.8rem] w-full text-neutral-200 truncate rounded-md py-1 px-2  placeholder:text-[0.9rem] `} />
                                        <Buttons onClick={copyurl} bclass={" text-nowrap text-[0.7rem] bg-neutral-300 text-black hover:bg-neutral-400 hover:text-black"}>copy url</Buttons>
                                    </div>
                                    <div>
                                        <button onClick={() => setshowqr(pre => !pre)} className=' hover:bg-zinc-800 w-8 h-8 flex items-center justify-center rounded-s-sm'><IoQrCodeOutline /></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className=' flex flex-col gap-5'>
                            <h3>create Public link</h3>
                            <div className='flex flex-col gap-3'>
                                <p>prived share link just see you</p>
                                <div className='flex items-center gap-2'>
                                    <Togglebtn settogg={setsharepri} togg={sharepri} />
                                    <p className=' uppercase text-[0.5rem] text-neutral-300 font-semibold'>{sharepri ? "only you can see the document" : "everyone see your document"}</p>
                                </div>
                                <div className='flex justify-center py-10'>
                                    <Buttons onClick={createshare} bclass={"text-[0.8rem] bg-neutral-300 text-black hover:bg-neutral-400 hover:text-black "}>create link</Buttons>
                                </div>
                            </div>
                        </div>
                    )}
            </div>:<p>loading..</p>}

            {showqr && shareinfo?._id && <div className=' select-none fixed bottom-3 left-3 w-[50vh] h-[50vh] bg-zinc-950 outline-1 outline-neutral-300 outline p-5 rounded-md  flex items-center justify-between flex-col max-sm:w-[90%]'>
                <h4 className=' noto-sans text-[1rem] text-center capitalize font-medium'>share as a QR code</h4>
                <div className=' flex items-center justify-center max-sm:w-[90%]'>
                    <QRCodeSVG
                        className='p-2 bg-black rounded-md scale-[1.2] w-[90%] h-[90%]'
                        value={`${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/share/${shareinfo?._id}`} />
                </div>
                <p className='text-[0.6rem] text-zinc-500 noto-sans'>Use phone camera to scan the QR code and instantly access this on other devices.</p>
            </div>}
        </Optionbox>
    )
}

export default Sharebox