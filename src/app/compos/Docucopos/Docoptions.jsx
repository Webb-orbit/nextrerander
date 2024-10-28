import { useEffect, useState } from 'react'
import { Comboitems, Itembutton } from '../../utiles/Combo'
import { Gicon } from '../../utiles/Gicon'
import { useDispatch, useSelector } from 'react-redux'
import { setrandercompo } from '../../store/dashslice'
import Markdownop from './Optionsboxes/Markdownop'
import { nanoid } from '@reduxjs/toolkit'
import Deletedoc from './Optionsboxes/Deletedoc'
import Aiask from './Optionsboxes/Aiask'
import { TbTableOptions } from "react-icons/tb";
import { FaMarkdown } from "react-icons/fa";
import { MdFlightTakeoff, MdOutlineDeleteOutline } from "react-icons/md";

const Docoptions = () => {
    const [moreop, setmoreop] = useState(false)
    const dispatch = useDispatch()
    const { compo } = useSelector(state => state.dashstore.randers)

    useEffect(() => {
        setmoreop(false)
    }, [compo])

    const documentoptions = [
        {
            id: nanoid(),
            compo: <Aiask key={"ask ai"} />,
            icon: <MdFlightTakeoff/>,
            text: "ask ai",
            active: true
        },
        {
            id: nanoid(),
            compo: <Markdownop key={"markdown snippets"} />,
            icon: <FaMarkdown/>,
            text: "markdown snippets",
            className: "",
            active: true
        },
        {
            id: nanoid(),
            compo: <Deletedoc key={"delete"} />,
            icon: <MdOutlineDeleteOutline />,
            text: "delete",
            className: "hover:bg-red-600/80",
            active: true
        },
    ]

    return (
        <div className=' fixed bottom-10 right-4'>
            <div className=' relative'>
                <Comboitems active={moreop} >
                    {documentoptions.map((e) => (
                        e.active && <Itembutton
                            onClick={() => {dispatch(setrandercompo(e.compo))}}
                            classes={`w-[15rem] py-[0.5rem] flex items-center group gap-3 hover:bg-neutral-800 ${e.className}`}
                            key={e.id}>
                            {e.icon}
                            <p className='duration-75 group-hover:translate-x-1 text-[0.9rem]'>{e.text}</p>
                        </Itembutton>
                    ))}
                </Comboitems>
            </div>

            <button className='fixed bottom-4 bg-neutral-900 rounded-full right-4 py-2 px-3' onClick={() => setmoreop(pre => !pre)}><TbTableOptions/></button>
        </div>
    )
}

export default Docoptions