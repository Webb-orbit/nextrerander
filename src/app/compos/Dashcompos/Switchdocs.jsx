"use client"
import { useDispatch, useSelector } from 'react-redux'
import { Gicon } from '@/app/utiles/Gicon'
import { documentroute } from '@/app/store/dashslice'
import { useEffect, useState } from 'react'
import { Blockerror } from '@/app/utiles/Blockerror'
import Link from 'next/link'

const Switchdocs = () => {
    const { documents } = useSelector(state => state.dashstore.routes)
    const dispatch = useDispatch()
    const [documentarr, setdocumentarr] = useState([])
    const [docinfo, setdocinfo] = useState({})
    const [haserror, sethaserror] = useState(false)

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const docs = await Docsbase.getalldocs()
    //             if (docs?.err) {
    //                 throw new Error("something went")
    //             }
    //             const response = docs.data.data
    //             setdocumentarr(response.doc)
    //             setdocinfo(response)
    //             console.log(response);
    //         } catch (error) {
    //             sethaserror(true)
    //             console.log(error);
    //         }
    //     })()
    // }, [])


    // const nextpage = async (naxtpagec) => {
    //     try {
    //         console.log("run", naxtpagec);
    //         const docs = await Docsbase.getalldocs(naxtpagec)
    //         if (docs?.err) {
    //             throw new Error(docs.message)
    //         }
    //         const response = docs.data.data
    //         setdocumentarr(response.doc)
    //         setdocinfo(response)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    return documents ? (
        <div className=' w-full h-screen bg-neutral-800/30 backdrop-blur-sm fixed top-0 left-0 z-[1000] flex flex-col justify-center items-center '>
            <div className=' flex flex-col justify-stretch w-[25%]  h-[80vh] bg-black px-5 py-5 rounded-md outline-1 outline outline-neutral-500/45  gap-5 overflow-y-scroll scroll'>
                <div className=' flex items-center justify-between'>
                    <h3 className='text-[1rem] capitalize font-medium '>create document</h3>
                    <Gicon onClick={() => dispatch(documentroute(false))} classes={"cursor-pointer"} icon={"cancel"} />
                </div>

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
                                                to={`/doc/${e._id}`}>
                                                    <p className=' truncate'>{e.title}</p>
                                                    <p className=' absolute bottom-2 right-2 text-neutral-400 text-[0.7rem] font-medium'>{e.createdAt?.substring(0,10)}</p>
                                                </Link>
                                        ))}
                                    </div>
                                    <div className='flex items-center justify-between py-7'>
                                        <p className='text-neutral-300 uppercase text-[0.7rem] font-medium'>{`${documentarr.length} docs / ${docinfo.count}`}</p>
                                        <div className=' flex gap-5'>
                                            <button
                                                disabled={docinfo.page == 0}
                                                onClick={() => nextpage(docinfo.page - 1)}
                                                className=' font-medium uppercase text-[0.7rem] py-0 rounded-sm px-1 disabled:text-neutral-400 flex items-center hover:text-neutral-300 '><Gicon icon={"arrow_back_ios_new"} />prev</button>
                                            <p className='text-[0.7rem font-medium]'>{docinfo.page}</p>
                                            <button
                                                onClick={() => nextpage(docinfo.page + 1)}
                                                disabled={!docinfo.hasmore} className=' font-medium uppercase text-[0.7rem] py-0 rounded-sm px-1 disabled:text-neutral-400 flex items-center hover:text-neutral-300 '>next<Gicon icon={"arrow_forward_ios"} /></button>
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

            </div>
        </div>
    ) : null
}

export default Switchdocs