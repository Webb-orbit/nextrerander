/* eslint-disable react/prop-types */
"use client"
import React ,{ useEffect, useState } from 'react'
import Logo from '@/app/utiles/Logo'
import Buttons from '@/app/utiles/Buttons'
import { Comboitems, Itembutton, Itemlink } from '@/app/utiles/Combo'
import { useDispatch, useSelector } from 'react-redux'
import { createroute, documentroute, setrandercompo} from '@/app/store/dashslice'
import Sharebox from '@/app/compos/Docucopos/Optionsboxes/Sharebox'
import Setting from '@/app/compos/Dashcompos/Setting'
import { useParams, usePathname } from 'next/navigation'
import { BiHomeAlt, BiAddToQueue, BiSolidBookContent , BiDoughnutChart  } from "react-icons/bi";
import { MdDragIndicator, MdMoreVert, MdOutlineDocumentScanner   } from "react-icons/md";

const Dashnavbar = ({ data }) => {
    const pathname = usePathname()
    const {docid} = useParams() 
    const [docinfoactive, setdocinfoactive] = useState(false)
    const [moreopsactive, setmoreopsactive] = useState(false)
    const dispatch = useDispatch()
    const { createnew, documents } = useSelector(state => state.dashstore.routes)

    const compobj = {
        sharecompo: <Sharebox key={"sharebox"}/>,
        settingcompo: <Setting key={"setting"}/>,
    }

    useEffect(() => {
        setdocinfoactive(false)
        setmoreopsactive(false)
    }, [documents, createnew])

    useEffect(() => {
        setdocinfoactive(false)
        setmoreopsactive(false)
        dispatch(documentroute(false))
    }, [docid])

    return (
        <>
            <div className='flex items-center justify-between px-20 h-16'>
                <div className='flex items-center justify-start gap-3 relative'>
                    <Logo />
                    <p className='max-w-[15rem] w-fit truncate text-[0.9rem] text-neutral-500 select-none font-medium'>{pathname}</p>
                    <button
                        onClick={() => setmoreopsactive(pre => !pre)}
                        className=' py-1 rounded-sm px-1  hover:bg-neutral-800 '><MdDragIndicator/></button>
                    <Comboitems 
                    active={moreopsactive} classes={"absolute bg-neutral-950 left-[20rem] top-14  w-[13rem] p-1 z-[9999]"}>
                        <div className='mingzat flex flex-col gap-1 select-none '>
                            <Itemlink href={"/dashboard"}
                                classes={"flex items-center group gap-3 hover:bg-neutral-800"}
                            >
                                <BiHomeAlt/>
                                <p className=' duration-75 group-hover:translate-x-1 text-[0.8rem]'>Dashboard</p>
                            </Itemlink>
                            <Itembutton
                                onClick={() => dispatch(createroute())}
                                classes={"flex items-center group gap-3 hover:bg-neutral-800"}
                            ><BiAddToQueue />
                                <p className=' duration-75 group-hover:translate-x-1 text-[0.8rem]'>new document</p>
                            </Itembutton>
                            <Itembutton
                                onClick={() => dispatch(documentroute())}
                                classes={"flex items-center group gap-3 hover:bg-neutral-800"}
                            ><BiSolidBookContent  />
                                <p className=' duration-75 group-hover:translate-x-1 text-[0.8rem]'>switch document</p>
                            </Itembutton>
                        </div>
                        <hr className='border-neutral-500' />
                        <div className='mingzat flex flex-col gap-1 select-none'>
                            <Itembutton
                                onClick={() => dispatch(setrandercompo(compobj.settingcompo))}
                                classes={"flex items-center group gap-3 hover:bg-neutral-800"}
                            ><BiDoughnutChart />
                                <p className=' duration-75 group-hover:translate-x-1 text-[0.8rem]'>settings</p>
                            </Itembutton>
                        </div>
                    </Comboitems>
                </div>
                {data ? (
                    <div className='flex items-center justify-start gap-3 relative '>
                        <Buttons
                            onClick={() => {dispatch(setrandercompo(compobj?.sharecompo))}}
                            bclass={"bg-blue-600 text-[0.8rem]"}>publish</Buttons>
                        <button onClick={() => setdocinfoactive(pre => !pre)} className=' py-0 rounded-sm px-1 hover:bg-neutral-800 '><MdOutlineDocumentScanner  /></button>
                        <button className=' py-0 rounded-sm px-1 hover:bg-neutral-800 '><MdMoreVert/></button>

                        <Comboitems active={docinfoactive} classes={"absolute bg-neutral-950 right-0 top-14 p-4 w-[22rem]"}>
                            <div className='mingzat flex flex-col gap-5 select-none'>
                                <div className='flex items-center justify-start gap-3'>
                                    <p className=' capitalize font-medium'>id:</p>
                                    <p className='text-[0.8rem] text-neutral-200 truncate'>{data._id}</p>
                                </div>
                                <div className='flex items-center justify-start gap-3'>
                                    <p className=' capitalize font-medium'>created:</p>
                                    <p className='text-[0.8rem] text-neutral-200 truncate'>{data.createdAt.substring(0, 10)}</p>
                                </div>
                                <div className='flex items-center justify-start gap-3'>
                                    <p className=' capitalize font-medium'>last edit:</p>
                                    <p className='text-[0.8rem] text-neutral-200 truncate'>{data.updatedAt.substring(0, 10)}</p>
                                </div>
                                <div className='flex items-center justify-start gap-3'>
                                    <p className=' capitalize font-medium'>shared:</p>
                                    <p className='text-[0.8rem] text-neutral-200 truncate'>{data.shared ? "true" : "false"}</p>
                                </div>
                            </div>
                        </Comboitems>
                    </div>
                ) : (
                    <div className='flex items-center justify-start gap-3'>
                        <button className=' py-0 rounded-sm px-1 hover:bg-neutral-800 '><MdMoreVert  /></button>
                    </div>
                )}
            </div>
        </>
    )
}

export default Dashnavbar