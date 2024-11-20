"use client"
import { useEffect, useRef, useState } from "react"
import Codebtn from "./codebtn"
import { FiClipboard } from "react-icons/fi";
import { LuClipboardCheck } from "react-icons/lu";
import { TbTextWrap, TbTextWrapDisabled } from "react-icons/tb";

export const Displaychild = ({ children, copyeddata }) => {
    const comporef = useRef(null)
    const [copyed, setcopyed] = useState(false)
    const [wrap, setwrap] = useState(false)
    const [ishover, setishover] = useState(false)

    useEffect(() => {
        if (comporef.current !== null) {
            comporef.current.innerHTML = children
        }
    }, [children])

    const clipbordcontrol = () => {
        let timeout;
        if (timeout) clearTimeout(timeout)
        setcopyed(true)
        navigator.clipboard.writeText(copyeddata)
        timeout = setTimeout(() => {
            setcopyed(false)
        }, 1500)
    }

    useEffect(() => {
        if (comporef.current !== null) {
            const firstpre = comporef.current.firstElementChild
            if (wrap) {
                firstpre.classList.add("wrapshiki")
                comporef.current.className = ""
            } else {
                comporef.current.className = "overflow-x-scroll scrollwidth"
                firstpre.classList.remove("wrapshiki")
            }
        }
    }, [wrap])



    return (
        <>
            <div
                onMouseEnter={() => setishover(true)}
                onMouseLeave={() => setishover(false)}
                className=" relative" >
                <div className={` absolute  right-2 top-2 p-2 ${ishover ? "block" : "hidden"}`}>
                    <Codebtn control={() => clipbordcontrol()} hovered={ishover}>
                        {copyed ? <LuClipboardCheck className=' scale-[1.5] text-emerald-400' /> : <FiClipboard className=' scale-[1.5] ' />}
                    </Codebtn>
                    <Codebtn control={() => setwrap(pre => !pre)} hovered={ishover}>
                        {wrap ? <TbTextWrap className=' scale-[1.5]' /> : <TbTextWrapDisabled className=' scale-[1.5] ' />}
                    </Codebtn>
                </div>
                <div ref={comporef}></div>
            </div>
        </>
    )
}