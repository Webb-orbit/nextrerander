import Optionbox from '@/app/utiles/Optionbox'
import { useDispatch } from 'react-redux'
import { setrandercompo } from '@/app/store/dashslice'

const Markdownop = () => {
    const dispatch = useDispatch()

    return (
        <Optionbox 
        dialog={"markdown snneptes"}
        closehandel={() => dispatch(setrandercompo(null))} >
            <div className=" flex flex-col gap-3 py-3">
                <p className="text-xl font-bold">H1 heading = <span ># text</span></p>
                <p className="text-lg font-semibold">H2 heading = <span >## text</span></p>
                <p className="text-base font-medium">H3 heading = <span >### text</span></p>

                <p className="text-sm list-disc">Bulleted list = <span className="font-mono">* text</span></p>
                <p className="text-sm">1. Numbered list = <span className="font-mono">^ text</span></p>

                <p className="text-sm">Bold = <span className="font-bold">**text**</span></p>

                <p className="text-sm">Code block = <span className="bg-neutral-800 p-1 rounded">``` code ```</span></p>

                <p className="text-sm">Inline Code block = <span className="bg-neutral-800 px-2 py-1 rounded">` code `</span></p>

                <p className="text-sm">Blockquote = <span >&gt; text</span></p>

                <div className="text-sm">Insert link = <p className="text-blue-500 underline">[URL](NAME)</p></div>

                <p className="text-sm">Text divider = <span>---</span></p>
            </div>
        </Optionbox>
    )
}

export default Markdownop