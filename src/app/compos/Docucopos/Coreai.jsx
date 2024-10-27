/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Searchinput } from '../../utiles/Searchinput'
import { GoogleGenerativeAI } from '@google/generative-ai'
import plaintohtml from 'markdown-to-htm'
import parse from 'html-react-parser';
import { FlipWords } from '../../utiles/Flipwords';
import { TbWashDryclean } from "react-icons/tb";


const Coreai = ({ data }) => {
  const words = ["Write Smarter with Gemini AI", "Boost Your Writing with AI", "Exploring the Limits of AI", "Rerander"];
  const genAI = new GoogleGenerativeAI(data.apikey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const [resposes, setresposes] = useState([])
  const [messagees, setmessagees] = useState("")
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 10000,
    responseMimeType: "text/plain",
  };

  const chatwithai = async () => {
    try {
      const chat = model.startChat({
        generationConfig,
        history: resposes,
      })

      await chat.sendMessage(messagees)
      console.log(resposes);

      setresposes([...resposes])

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=' relative h-full flex flex-col justify-between'>
      <div className=' h-[80%] overflow-y-scroll scroll flex flex-col gap-5 items-end pb-20 px-3'>
        {resposes.length > 1?resposes.map((e, i) => (
          e.role == "user" ? (<p className=' w-fit bg-blue-600/90 py-1 px-3 text-[0.8rem] rounded-sm text-white font-normal' key={i}>{e.parts[0]?.text}</p>) : (
            <div className=' w-fit whitespace-break-spaces bg-neutral-600/50 py-1 px-3 text-[0.8rem] rounded-sm text-white font-normal' key={i}>{parse(plaintohtml(e.parts[0]?.text))}</div>
          )
        )):(<div className=' w-full h-full flex items-center justify-center'>
          <FlipWords className={"text-[1.2rem] mingzat font-semibold"} words={words} duration={4500}/>
        </div>)}
      </div>

      <div className='p-2 rounded-md   bottom-3  w-full bg-zinc-500/50 flex gap-2 items-center'>
        <Searchinput
          onSubmit={chatwithai}
          onChange={(e) => setmessagees(e.target.value)}
          placeholders={["hello", "how are you", "faith is power"]} />
        <button onClick={()=> setresposes([])} className='w-6 h-6 rounded-full flex items-center text-black justify-center bg-blue-200'><TbWashDryclean/></button>
      </div>
    </div>
  )
}

export default Coreai