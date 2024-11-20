"use client"
import React, { useEffect, useRef, useState } from 'react';
import "@/app/edit.css";
import { Pageloading } from '@/app/utiles/Pageloading';
import Sharenavbar from '@/app/compos/Docucopos/sharepagecompos/sharenavbar';
import Shareheader from '@/app/compos/Docucopos/sharepagecompos/Shareheader';
import { Minwidth } from '@/app/utiles/Minwidth';
import plaintohtml from 'markdown-to-htm';
import { PickOneShare, PickToChangeShare } from '@/app/lib/shares';
import { codeToHtml } from 'shiki/index.mjs';
import { createRoot } from 'react-dom/client';
import { Displaychild } from '@/app/utiles/Displaychild';

const Sharepage = ({ params }) => {
    const { shareid } = React.use(params)
    const [sharedata, setsharedata] = useState(null)
    const [error, seterror] = useState(null)
    const contentref = useRef(null)

    useEffect(() => {
        let timeout;
        (async () => {
            try {
                const share = await PickOneShare(shareid)
                if (!share.success) {
                    throw new Error(share.message)
                }
                const shareres = share.data
                setsharedata(shareres)
                console.log(shareres);
                    timeout = setTimeout(() => {
                        (async () => {
                            await PickToChangeShare(shareres._id, { views: eval(shareres.views + 1) })
                        })()
                    }, 1000);
            } catch (error) {
                seterror({ success: false, message: error.status >= 500 ? (error.message) : "someing broken try again" })
                console.log(error);
                // dispatch(showtoast({ title: "document not found", icon: "home", timeout: 5000, color: "red-600", bgcolor: "neutral-900", position: "bottom_left" }))
            }
        })()

        return () => {
            clearTimeout(timeout)
            setsharedata(null)
            seterror(null)
        }
    }, [shareid])


    useEffect(() => {
        if (sharedata && contentref.current !== null) {
            const temp = sharedata.doc.content || "something went wrong / no data"
            contentref.current.innerHTML = plaintohtml(temp)
            const pres = Array.from(document.getElementsByClassName("pre"))
            if (pres?.length > 0) {
                pres.forEach(async (e) => {
                    const code = await codeToHtml(e.innerText, {
                        theme: "aurora-x",
                        lang: "jsx",
                    })
                    const root = createRoot(e)
                    root.render(<Displaychild copyeddata={e.innerText}>{code}</Displaychild>)
                })
            }
        }

    }, [sharedata, contentref])

    if (error !== null && !error?.success) {
        return (
            <div className='fixed w-full h-screen top-0 left-0 flex items-center justify-center flex-col gap-2'>
                <h3 className='capitalize'>{error.message}!</h3>
            </div>
        )
    }

    return sharedata ? (
        <>
            <Sharenavbar data={sharedata} />
            <Minwidth>
                <Shareheader data={sharedata} />
                <div className='py-20' ref={contentref}></div>
            </Minwidth>
        </>
    ) : (<Pageloading />)
}

export default Sharepage


