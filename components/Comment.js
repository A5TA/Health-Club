import Moment from "react-moment"
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoChatbubbleSharp} from 'react-icons/io5'
import {MdShare} from 'react-icons/md'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import { BiPoll} from 'react-icons/bi'

function Comment({id, comment, poster}) {
  return (
    <div className="p-3 flex cursor-pointer border-b border-[#47B5FF]">
        <img src={comment?.userImg} alt="" className="h-11 2-11 rounded-full mr-4" />
        <div className="flex flex-col space-y-2 w-full">
        <div className="flex justify-between">
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4 className="font-bold text-[#d9d9d9] text-[15px] sm:text-base inline-block group-hover:underline">
                {comment?.username}
              </h4>
              <span className="ml-1.5 text-sm sm:text-[15px]">
                @{comment?.tag}{" "}
              </span>
            </div>
            <span className="flex text-sm sm:text-[13px]">
              Replying to <span className="text-[#47B5FF] ml-1 hover:underline"> @{poster}</span>
            </span>
            <span className="flex hover:underline text-sm sm:text-[13px]">
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
            <p className="text-[#d9d9d9] mt-0.5 max-w-lg overflow-scroll text-[15px] sm:text-base scrollbar-hide">
              {comment?.comment}
            </p>
          </div>
          <div className="icon group flex-shrink-0">
            <GiHamburgerMenu className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>

        <div className="text-[#6e767d] flex justify-between w-10/12">
          <div className="icon group">
            <IoChatbubbleSharp className="h-5 group-hover:text-[#1d9bf0]" />
          </div>

          <div className="flex items-center space-x-1 group">
            <div className="icon group-hover:bg-pink-600/10">
              <AiOutlineHeart className="h-5 group-hover:text-pink-600" />
            </div>
            <span className="group-hover:text-pink-600 text-sm"></span>
          </div>

          <div className="icon group">
            <MdShare className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="icon group">
            <BiPoll className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment