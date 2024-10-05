"use client";
import { CirclePlus,ImagePlus,Paperclip,Send } from 'lucide-react'

export default function Page() {
  return (
    <div className="flex w-full gap-2 p-1 ">
      <div className="w-[80%] h-[830px] bg-black border relative ">
        <div className="w-[98%] h-24   absolute bottom-0  flex items-center gap-2 justify-center">
        <CirclePlus width={35} height={35} className='ml-2'/>
        <ImagePlus width={35} height={35} />
        <Paperclip width={35} height={35} />
        <input type="text" className='bg-black border w-[84%] h-10 rounded-full pl-4' />
        <Send width={35} height={35} />
        </div>
      </div>

      {/* active user */}
      <div className="w-[20%] h-[825px] bg-black border ">
        <div className="p-1">
          <div className="w-full  h-14 border"></div>
        </div>
        <div className="flex justify-center w-full h-14 mb-2">
          <div className="flex items-center gap-2 w-[290px] rounded-md ">
            <div className="w-10 h-10 rounded-full bg-red-200 ml-1"></div>
            <div className="hidden lg:block">Kaung Khant Hmue</div>
          </div>
        </div>
        <div className="flex justify-center w-full h-14 ">
          <div className="flex items-center gap-2 w-[290px] rounded-md">
            <div className="w-10 h-10 rounded-full bg-red-300 ml-1"></div>
            <div className="hidden lg:block">Zin May Htet </div>
          </div>
        </div>
      </div>
    </div>
  );
}
