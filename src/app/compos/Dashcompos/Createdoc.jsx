"use client"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createroute } from '@/app/store/dashslice'
import Optionbox from '@/app/utiles/Optionbox'
import { useRouter } from 'next/navigation'
import { PickCreateDocs } from '@/app/lib/docs'

const Createdoc = () => {
    const router = useRouter()
    const [name, setname] = useState("")
    const { createnew } = useSelector(state => state.dashstore.routes)
    const dispatch = useDispatch()

    const createdoc = async () => {
        try {
            const newdoc = await PickCreateDocs(name)
            if (!newdoc.success) {
                throw new Error(newdoc.error)
            }
            dispatch(createroute(false))
            router.push(`/doc/${newdoc.data._id}`)

            // dispatch(showtoast({ title: "Document created", icon: "done", timeout: 3000, color: "-green-600", bgcolor: "neutral-700", position: "bottom_right" }))

        } catch (error) {
            console.log(error);
            // dispatch(showtoast({ title: "OPPS! something went wrong", icon: "opps", timeout: 3000, color: "-red-600", bgcolor: "neutral-900", position: "bottom_right" }))
        }
    }

    const closehandelfun = () => {
        dispatch(createroute(null))
    }
    return createnew ? (
        <Optionbox
            dialog={"create orbit"}
            classes={"static w-[45%] min-h-[20rem] h-[50vh] "}
            closehandel={closehandelfun}
            container={"flex backdrop-blur-sm items-center  z-[999]  justify-center"}>
            <div className='w-full h-full overflow-y-scroll scroll flex items-center justify-center flex-col'>
                <p className=' capitalize text-neutral-300 font-normal'>enter a title to create new document</p>
                <div className=' flex w-full bg-neutral-800 py-2 px-5 rounded-lg items-center justify-between'>
                    <input
                        onChange={(e) => setname(e.target.value)}
                        value={name}
                        type="text" placeholder='Document name' spellCheck={false} className=' selection:bg-white selection:text-black font-light w-[80%] bg-transparent outline-none border-none' />
                    <button onClick={createdoc} className='font-medium '>create</button>
                </div>
            </div>
        </Optionbox>
    ) : null
}

export default Createdoc