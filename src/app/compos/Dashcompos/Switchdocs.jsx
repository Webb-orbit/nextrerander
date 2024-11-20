"use client"
import { useDispatch, useSelector } from 'react-redux'
import { documentroute } from '@/app/store/dashslice'
import { useEffect, useState } from 'react'
import { Blockerror } from '@/app/utiles/Blockerror'
import Link from 'next/link'
import { PickAllDocs } from '@/app/lib/docs'
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import Optionbox from '@/app/utiles/Optionbox'

const Switchdocs = () => {
    const { documents } = useSelector(state => state.dashstore.routes)
    const dispatch = useDispatch()
    const [documentarr, setdocumentarr] = useState([])
    const [docinfo, setdocinfo] = useState({})
    const [haserror, sethaserror] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const docs = await PickAllDocs()
                if (!docs?.success) {
                    throw new Error(docs.message)
                }
                const response = docs.data
                setdocumentarr(response.doc)
                setdocinfo(response)
                console.log(response);
            } catch (error) {
                sethaserror(true)
                console.log(error);
            }
        })()
    }, [])


    const nextpage = async (naxtpagec) => {
        try {
            console.log("run", naxtpagec);
            const docs = await Docsbase.getalldocs(naxtpagec)
            if (!docs?.success) {
                throw new Error(docs.message)
            }
            const response = docs.data
            setdocumentarr(response.doc)
            setdocinfo(response)
        } catch (error) {
            console.log(error);
        }
    }


    return documents ? (
        <Optionbox
            closehandel={()=>dispatch(documentroute(false))}
            dialog={"switch docs"}
            container={"flex items-center justify-center backdrop-blur-sm z-[99999] max-sm:p-0"}
            classes={"static  w-[25%]  h-[80vh] max-sm:w-[100%] max-sm:h-screen"}
        >
            <div>
                {haserror ? (<Blockerror message={"something went wrong"} />) : (
                    docinfo.limit ? (
                        docinfo.count > 0 ? (
                            <div>
                                <div className='flex flex-wrap justify-start gap-5'>
                                    {documentarr?.map((e) => (
                                        <Link
                                            key={e._id}
                                            className='py-2 px-3 h-[5rem] w-full truncate rounded-md bg-neutral-900 relative hover:bg-neutral-800'
                                            href={`/doc/${e._id}`}>
                                            <p className=' truncate'>{e.title}</p>
                                            <p className=' absolute bottom-2 right-2 text-neutral-400 text-[0.7rem] font-medium'>{e.createdAt?.substring(0, 10)}</p>
                                        </Link>
                                    ))}
                                </div>
                                <div className='flex items-center justify-between py-7'>
                                    <p className='text-neutral-300 uppercase text-[0.7rem] font-medium'>{`${documentarr.length} docs / ${docinfo.count}`}</p>
                                    <div className=' flex gap-5'>
                                        <button
                                            disabled={docinfo.page == 0}
                                            onClick={() => nextpage(docinfo.page - 1)}
                                            className=' font-medium uppercase text-[0.7rem] py-0 rounded-sm px-1 disabled:text-neutral-400 flex items-center hover:text-neutral-300 '><GrFormPrevious />prev</button>
                                        <p className='text-[0.7rem font-medium]'>{docinfo.page}</p>
                                        <button
                                            onClick={() => nextpage(docinfo.page + 1)}
                                            disabled={!docinfo.hasmore} className=' font-medium uppercase text-[0.7rem] py-0 rounded-sm px-1 disabled:text-neutral-400 flex items-center hover:text-neutral-300 '>next<GrFormNext /></button>
                                    </div>
                                </div>
                            </div>

                        ) : (
                            <>no docs found...</>
                        )

                    ) : <h2>skleton</h2>

                    // (<Skeleton sx={{ bgcolor: 'grey.900' }}
                    //     variant="rectangular"
                    //     className='w-full min-h-[5rem] relative rounded-md p-3' ></Skeleton>)
                )}
            </div>
        </Optionbox>
    ) : null
}

export default Switchdocs