"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Minwidth } from '@/app/utiles/Minwidth';
import { createRoot } from 'react-dom/client';
import plaintohtml from 'markdown-to-htm';
import "@/app/edit.css";
import Dashnavbar from '@/app/compos/Dashcompos/Dashnavbar';
import Buttons from '@/app/utiles/Buttons';
import Docoptions from '@/app/compos/Docucopos/Docoptions';
import { useForm } from 'react-hook-form';
import { FaRegEdit } from "react-icons/fa";
import { PickOneDoc, PickToChangeDoc } from '@/app/lib/docs';
import { useParams } from 'next/navigation';
import { codeToHtml } from 'shiki/index.mjs';
import { Displaychild } from '@/app/utiles/Displaychild';

// ADD METE DATA IN DOC PAGE
// return {
//     title: `Rerander/${docid}`,
//     description: 'one chance one change',
//     generator: 'Next.js',
//     keywords: ['rerander', '2026', 'vellane'],
//     authors: [{ name: 'makarov' }, { name: 'TN', url: 'https://www.instagram.com/igtanii' }],
//     creator: 'makarov',
// }

const Page = () => {
    const { docid } = useParams()

    const [documents, setdocuments] = useState(null);
    const docuref = useRef(null);
    const previewref = useRef(null);
    const [editor, seteditor] = useState(false);
    const [predit, setpredit] = useState(false);
    const [defultextval, setdefultextval] = useState("");

    const { register, handleSubmit, setValue, formState: { isSubmitting, errors } } = useForm();

    useEffect(() => {
        (async () => {
            try {
                const documents = await PickOneDoc(docid);
                console.log("hello",documents);
                
                if (!documents.success) {
                    throw new Error(documents.message);
                }
                const data = documents.data;
                setdocuments(data);
                setdefultextval(data.content);
                setValue("title", data.title);
            } catch (error) {
                console.log(error);
            }

            return () => {
                setdocuments(null);
            }
        })()
    }, [docid])


    const savechange = async () => {
        try {
            const update = await PickToChangeDoc(documents._id, { content: defultextval });
            if (!update.success) {
                throw new Error(update.error);
            }
            const data = update.data;
            if (data) {
                seteditor(false);
                setdocuments(data);
                setdefultextval(data.content);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const cancelchange = () => {
        seteditor(false);
        setpredit(false);
    }

    const renamedoc = async ({ title }) => {
        try {
            const update = await PickToChangeDoc(documents._id, { title: title });
            if (!update.success) {
                throw new Error(update.error);
            }
            const data = update.data;
            if (data) {
                setdocuments(data);
                setValue("title", data.title);
            }
        } catch (error) {
            setValue("title", documents.title);
            console.log(error);
        }
    }

    useEffect(() => {
        if (documents && docuref.current !== null) {
            const temp = documents.content ? documents.content : "hello how are you";
            docuref.current.innerHTML = plaintohtml(temp);
            setdefultextval(documents.content);
        }
    }, [documents, editor])

    useEffect(() => {
        if (previewref.current !== null) {
            previewref.current.innerHTML = plaintohtml(defultextval);
        }
    }, [predit])

    useEffect(() => {
        const pres = Array.from(document.getElementsByClassName("pre"))

        if (pres?.length > 0) {
            pres.forEach(async (e) => {
                const code = await codeToHtml(e.innerText, {
                    theme: "aurora-x",
                    lang: "jsx",
                })
                const root = createRoot(e);
                root.render(<><Displaychild copyeddata={e.innerText}>{code}</Displaychild></>)
            })
        }
    }, [predit, documents, editor])

    return documents ? (
        <>
            <Dashnavbar data={documents} />
            <Docoptions />
            <Minwidth>
                <div>
                    <div className='py-10 text-neutral-300 mingzat tracking-tighter flex justify-between items-center '>
                        <div>
                            <form onSubmit={handleSubmit(renamedoc)}>
                                <input
                                    {...register("title", { maxLength: { value: 100, message: "you have max 100 charaters" }, minLength: { value: 5, message: "you have at least 5 charaters" } })}
                                    type="text" spellCheck={false} disabled={isSubmitting} className={` bg-transparent border-none outline-none text-[2.5rem] font-extrabold truncate w-[95%] ${isSubmitting && "animate-pulse"}`} />
                            </form>
                            <p className="text-[0.6rem] animate-pulse tracking-tight text-red-500 font-thin">{errors.title && errors.title.message}</p>
                        </div>
                        <div>
                            <button
                                className={`${editor && "border-b-2 border-neutral-400"}`}
                                onClick={() => seteditor(pre => !pre)}>
                                <FaRegEdit />
                            </button>
                        </div>
                    </div>
                    <div className='w-full h-full '>
                        {editor && <div className='flex flex-col gap-5 h-full w-full'>
                            <div className=' flex gap-2 items-center justify-between'>
                                <div className='flex gap-2'>
                                    <Buttons onClick={() => setpredit(false)} bclass={`text-[0.8rem] rounded-sm ${!predit && "bg-neutral-200 text-black"} `}>editor</Buttons>
                                    <Buttons onClick={() => setpredit(true)} bclass={` text-[0.8rem] rounded-sm ${predit && "bg-neutral-200 text-black"} `}>preview</Buttons>
                                </div>
                                <div className='flex gap-2'>
                                    <Buttons onClick={savechange} bclass={"text-[0.8rem] rounded-sm bg-green-600 "}>save</Buttons>
                                    <Buttons onClick={cancelchange} bclass={"text-[0.8rem] rounded-sm  bg-red-600"}>cancel</Buttons>
                                </div>
                            </div>
                            {predit ? (
                                <div
                                    className=' rounded-md bg-neutral-950 p-5 h-[90vh] scroll overflow-y-scroll'
                                    ref={previewref}></div>
                            ) : (
                                <textarea
                                    onChange={(e) => setdefultextval(e.target.value)}
                                    value={defultextval}
                                    spellCheck={false} className=' rounded-md resize-none outline-none border-none bg-neutral-950 p-5 h-[90vh] scroll'></textarea>
                            )}
                        </div>}

                        {!editor && <div className={`whitespace-pre-wrap py-8 text-neutral-300`} ref={docuref}></div>}
                    </div>
                </div>
            </Minwidth>
        </>
    ) : <h1>skleton</h1>
}

export default Page