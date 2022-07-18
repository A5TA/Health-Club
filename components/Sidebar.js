import Image from 'next/image'
import SidebarLink from './SidebarLink'
import {AiFillHome} from 'react-icons/ai'
import {BiDumbbell} from 'react-icons/bi'
import {FaPaperclip} from 'react-icons/fa'
import {IoIosListBox} from 'react-icons/io'
import {IoMailSharp} from 'react-icons/io5'
import {GiMuscleUp, GiHamburgerMenu} from 'react-icons/gi'
import {ImSearch} from 'react-icons/im'
import {useSession, signOut} from 'next-auth/react'

function Sidebar() {
  const { data: session } = useSession()
  return (
    <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
        <div className="flex items-center justify-center w-13 p-0 h-13 hoverAnimation xl:ml-24">
            <Image src="/logo.png" width={40} height={45}/>
        </div>
        <div className='gap-y-2.5 mt-4 mb-2.5 xl:ml-24'>
            <SidebarLink text="Explore" Icon={ImSearch} />
            <SidebarLink text="Home" Icon={AiFillHome} active />
            <SidebarLink text="Notifications" Icon={BiDumbbell} />
            <SidebarLink text="Messages" Icon={IoMailSharp} />
            <SidebarLink text="Bookmarks" Icon={FaPaperclip} />
            <SidebarLink text="Lists" Icon={IoIosListBox} />
            <SidebarLink text="Profile" Icon={GiMuscleUp} />
            <SidebarLink text="More" Icon={GiHamburgerMenu} />
        </div>
        <button className='hidden xl:inline ml-auto bg-[#47B5FF] text-white rounded-full 
        h-[52px] w-52 text-lg font-bold shadow-md hover:bg-[#1363DF] transition duration-200 ease-out'>
            Post
        </button>
        <div className='text-[#DFF6FF] flex items-center justify-center hoverAnimation xl:ml-auto xl:-mr-5 mt-auto'>
            <img src={session?.user?.image} alt='' className='h-10 w-10 rounded-full xl:mr-2.5' />
            <div className='hidden xl:inline leading-5'>
                <h4 className='font-bold'>{session?.user?.name}</h4>
                <p className='text-[#6w767d]'>@{session?.user?.tag}</p>
            </div>
            <GiHamburgerMenu className="h-5 hidden xl:inline ml-10" size={25} onClick={signOut}/>
        </div>
    </div>
  )
}

export default Sidebar