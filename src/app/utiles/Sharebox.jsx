"use client"
import React,{ useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Optionbox from '@/app/utiles/Optionbox'
import { setrandercompo } from '@/app/store/dashslice';
import Togglebtn from '@/app/utiles/Togglebtn';
import Buttons from '@/app/utiles/Buttons';
import { Gicon } from '@/app/utiles/Gicon';
import { QRCodeSVG } from 'qrcode.react';

const Sharebox = ({params}) => {
    const dispatch = useDispatch();
    // const {docid} = React.use(params);
    const [shared, setshared] = useState(null);
    const [shareinfo, setshareinfo] = useState(null);
    const [sharepri, setsharepri] = useState(false);
    const [showqr, setshowqr] = useState(false);

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const shareed = await Docsbase.getonedocument(docid)
    //             const respon = shareed.data.data
    //             setshared(respon.shared)
    //             if (respon.shared) {
    //                 const newshare = await Sharebase.getoneshare(respon.shareid)
    //                 // ADD SHARE IS ON THE DOCUMENT MODEL OK
    //                 const response = newshare.data.data

    //                 console.log("ADD SHARE IS ON THE DOCUMENT MODEL OK", response);
    //                 if (response) {
    //                     setshareinfo(response)
    //                 }
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     })()

    //     return () => {
    //         setshareinfo(null)
    //         setshowqr(false)
    //         setshared(null)
    //     }
    // }, [docid])

    const createshare = async () => {
        try {
            const newshare = await Sharebase.addnewshare(docid, { privated: sharepri })
            console.log("new share", newshare);
            const respon = newshare.data.data
            if (newshare) {
                setshared(true)
                setshareinfo(respon)
            }

        } catch (error) {
            console.log(error);

        }
    }

    const copyurl = () => {
        navigator.clipboard.writeText(`${import.meta.env.VITE_BASE_URL}/share/${shareinfo?._id}`)
    }

    return (
        <Optionbox
            dialog={"Share File"}
            container={"flex items-center justify-center backdrop-blur-sm"}
            classes={"static w-[35%] h-[65vh] "}
            closehandel={() => dispatch(setrandercompo(null))}>
            <div className=' py-3 h-full'>
                {
                    shared ? (
                        <div className=' flex flex-col   gap-5'>
                            <h3>your Public link</h3>
                            <div className='flex flex-col justify-between h-full gap-3'>
                                <div className=' flex items-center justify-between  px-1'>
                                    <div className='py-2 flex  items-center justify-between outline-1   outline  rounded-md px-1  w-[80%]  '>
                                        <input type="text" value={`${import.meta.env.VITE_BASE_URL}/share/${shareinfo?._id}`} readOnly className={` bg-neutral-950  outline-none border-none text-[0.8rem] w-full text-neutral-200 truncate rounded-md py-1 px-2  placeholder:text-[0.9rem] `} />
                                        <Buttons onClick={copyurl} bclass={" text-nowrap text-[0.7rem] bg-neutral-300 text-black hover:bg-neutral-400 hover:text-black"}>copy url</Buttons>
                                    </div>
                                    <div>
                                        <button onClick={() => setshowqr(pre => !pre)} className=' hover:bg-zinc-800 w-8 h-8 flex items-center justify-center rounded-s-sm'><Gicon icon={"qr_code_2_add"} classes={"text-[1.6rem]"} /></button>
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
            </div>

            {showqr && shareinfo?._id && <div className=' select-none fixed bottom-3 left-3 w-[50vh] h-[50vh] bg-zinc-950 outline-1 outline-neutral-300 outline p-5 rounded-md  flex items-center justify-between flex-col'>
                <h4 className=' noto-sans text-[1rem] text-center capitalize font-medium'>share as a QR code</h4>
                <div className=' h-full flex items-center justify-center'>
                    <QRCodeSVG
                        className='p-2 bg-black rounded-md scale-[1.2]'
                        value={`${import.meta.env.VITE_BASE_URL}/share/${shareinfo?._id}`} />
                </div>
                <p className='text-[0.6rem] text-zinc-500 noto-sans'>Use phone camera to scan the QR code and instantly access this on other devices.</p>
            </div>}
        </Optionbox>
    )
}

export default Sharebox