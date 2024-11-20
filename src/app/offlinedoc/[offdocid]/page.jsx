"use client"
import { getData, updateData } from '@/app/indexedstore'
import { useParams } from 'next/navigation'
import React, { useEffect, useState, useRef } from 'react'
import Buttons from '@/app/utiles/Buttons';
import { useForm } from 'react-hook-form';
import { Minwidth } from '@/app/utiles/Minwidth'
import plaintohtml from 'markdown-to-htm';
import { FaRegEdit } from "react-icons/fa";
import { codeToHtml } from 'shiki/index.mjs';
import { Displaychild } from '@/app/utiles/Displaychild';
import { createRoot } from 'react-dom/client';
import { useSelector } from 'react-redux';
import "@/app/edit.css"

const Page = () => {
  const { offdocid } = useParams();
  const [docdata, setdocdata] = useState({});
  const docuref = useRef(null);
  const previewref = useRef(null);
  const [editor, seteditor] = useState(false);
  const [predit, setpredit] = useState(false);
  const [defultextval, setdefultextval] = useState("");
  const {compo} = useSelector(state=> state.offlinestore.randers)

  const { register, handleSubmit, setValue, formState: { isSubmitting, errors } } = useForm();

  const savechange = async () => {
    try {
      const update = await updateData(offdocid, { content: defultextval })
      if (update) {
        setdocdata(update);
        seteditor(false);
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
      const update = await updateData(offdocid, { title: title })
      if (update) {
        setdocdata(update);
        setValue("title", update.title);
      }
    } catch (error) {
      setValue("title", title);
    }
  }

  useEffect(() => {
    if (docdata && docuref.current !== null) {
      const temp = docdata.content ? docdata.content : "hello how are you";
      docuref.current.innerHTML = plaintohtml(temp);
      setdefultextval(docdata.content);
    }
  }, [docdata, editor])

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
  }, [predit, docdata, editor])


  useEffect(() => {
    (async () => {
      const data = await getData(offdocid)
      console.log("offdocdata", data);
      setdocdata(data)
      setdefultextval(data.content);
      setValue("title", data.title);
    })()
  }, [offdocid])

  return docdata ? (
    <>
    {compo}
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
  ) : <>loafing</>
}

export default Page