import { Button } from '../ui/Button';

import { IoIosSettings } from 'react-icons/io';
import { RiLayout3Fill } from 'react-icons/ri';
import { IoIosCloud } from 'react-icons/io';
import { BsPencilFill } from 'react-icons/bs';

import logo from '/log.svg';
export function Header() {
  return (
    <header className="h-16 min-h-[64px] px-2 flex items-center justify-between text-white select-none">
      {/* Left side: CodePen Logo & Project Details */}
      <div className="flex items-center gap-1.5">
        <img src={logo} className="w-10 h-10" />

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 leading-none relative top-0.5">
            <h1 className="text-[20px] font-bold font-secondary text-white hover:underline cursor-pointer">
              Untitled
            </h1>
            <BsPencilFill className="w-[14px] h-[14px] text-white cursor-pointer" />
          </div>
          <span className="text-[13px] text-[#aaa] relative top-1 cursor-pointer ">
            Captain Anonymous
          </span>
        </div>
      </div>

      {/* Right side: Action Control Buttons */}
      <div className="flex items-center gap-2 font-secondary">
        <Button className="bg-[#5A5F73]! hover:bg-[#3a3f50] text-white text-[15px]! font-medium px-[18px] h-10.5 rounded-[4px]! flex items-center gap-[5px]! transition-colors border-0">
          <IoIosCloud className="w-[17px] h-[17px] text-white" />
          <span>Save</span>
        </Button>
        <Button className="bg-[#5A5F73]! hover:bg-[#3a3f50]! text-white text-[15px]! font-medium px-[18px] h-10.5 rounded-[4px]! flex items-center gap-[5px]! transition-colors border-0">
          <IoIosSettings className="w-[17px] h-[17px] text-white" />
          <span>Settings</span>
        </Button>

        <Button className="bg-[#5A5F73]! hover:bg-[#3a3f50]! text-white  px-[18px].5 h-10.5 rounded-[4px]! flex items-center justify-center transition-colors border-0">
          <RiLayout3Fill className="w-[22px] h-[22px] text-white" />
        </Button>

        <Button className="bg-[#248C46]! hover:bg-[#24bf53]! text-black font-bold text-[15px]! px-[18px] h-10.5 rounded-[4px]! transition-colors border-0">
          Sign Up
        </Button>

        <Button className="bg-[#5A5F73]! hover:bg-[#3a3f50]! text-white text-[15px]! font-medium px-[18px] h-10.5 rounded-[4px]! transition-colors border-0">
          Log In
        </Button>
      </div>
    </header>
  );
}
