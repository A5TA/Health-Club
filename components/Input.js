import {useRef, useState, useEffect} from 'react'
import {MdInsertPhoto, MdSchedule} from 'react-icons/md'
import {IoMdRemove} from 'react-icons/io'
import {BiHappyBeaming, BiPoll} from 'react-icons/bi'
import { db, storage } from "../firebase"
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore"
import { getDownloadURL, ref, uploadString } from "@firebase/storage"
import data from "@emoji-mart/data"
import {useSession} from 'next-auth/react'

function Input() {
    // new Picker({ data })
    const [input, setInput] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [showEmojis, setShowEmojis] = useState(false)
    const [loading, setLoading] = useState(false)
    const filePickerRef = useRef(null)
    const {data: session} = useSession()

    const sendPost = async () => {
        if (loading) return
        setLoading(true)

        const docRef = await addDoc(collection(db, 'posts'), {
            id: session.user.uid,
            username: session.user.name,
            userImg: session.user.image,
            tag: session.user.tag,
            text: input,
            timestamp: serverTimestamp(),
        })

        const imageRef = ref(storage, `posts/${docRef.id}/image`)

        if (selectedFile) {
            await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
                const downloadURL = await getDownloadURL(imageRef)
                await updateDoc(doc(db,'posts', docRef.id), {
                    image: downloadURL,
                })
            })
        }
        setLoading(false)
        setInput("")
        setSelectedFile(null)
        setShowEmojis(false)
    }

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0])
        }
    
        reader.onload = (readerEvent) => {
          setSelectedFile(readerEvent.target.result)
        }
      }

    const Picker = (props = {}) => {
        const ref = useRef()
    
        import("emoji-mart").then((EmojiMart) => {
          new EmojiMart.Picker({ ...props, data, ref })
        })
    
        return <div ref={ref}></div>
      }

      const addEmoji = (e) => {
        let sym = e.unified.split("-")
        let codesArray = []
        sym.forEach((el) => codesArray.push("0x" + el))
        let emoji = String.fromCodePoint(...codesArray)
        setInput(input + emoji)
      }
    
  return (
    <div className={`border-b border-[#47B5FF] p-3 flex gap-x-3 overflow-y-scroll scrollbar-hide ${loading && 'opacity-50'}`}>
        <img src={session.user.image} 
        className='h-10 w-10 rounded-full xl:mr-2.5'
        alt="" />
        <div className="w-full divide-y-2 divide-[#47B5FF]">
            <div className={`${selectedFile && 'pb-6'} ${input && 'gap-y-2.5'}`}>
                <textarea 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                rows="2"
                placeholder='Gym Time?'
                className='bg-transparent outline-none text-[#DFF6FF] min-h-[45px] placeholder-[#6w767d] tracking-wide w-full'
                />
                
                {/* Show the X out if the file is open */}
                {selectedFile && (
                    <div className='relative'>
                        <div className='absolute w-8 h-8 bg-[#15181c] hover:bg-[#06283D]
                         bg-opacity-65 rounded-full flex items-center justify-center top-1 
                         left-1 cursor-pointer' onClick={() => setSelectedFile(null)}>
                            <IoMdRemove className='text-white h-10'/>
                        </div>
                        <img src={selectedFile} alt="" className='rounded-2xl max-h-80 object-contain'/>
                    </div> 
                )}
            </div>
            {!loading && 
            <div>
                <div className='flex items-center justify-between pt-2.5'>
                    <div className='flex items-center'>
                        <div className='icon' onClick={() => filePickerRef.current.click()}>
                            <MdInsertPhoto className='h-[22px] text-[#47B5FF]'/>
                            <input type="file" onChange={addImageToPost} ref={filePickerRef} hidden/>
                        </div>

                        <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                            <BiHappyBeaming className="text-[#47B5FF] h-[22px]" />
                        </div>

                        <div className="icon">
                            <BiPoll className="text-[#47B5FF] h-[22px]" />
                        </div>

                        <div className="icon">
                            <MdSchedule className="text-[#47B5FF] h-[22px]" />
                        </div>

                        {showEmojis && (
                            <Picker
                                onEmojiSelect={addEmoji}
                                style={{
                                    position: "absolute",
                                    marginTop: "465px",
                                    marginLeft: -40,
                                    maxWidth: "320px",
                                    borderRadius: "20px",
                                }}
                                theme="dark"
                            />
                        )}
                    </div>
                    <button
                        className='bg-[#47B5FF] text-white rounded-full px-4 py-1.5 font-bold shadow-md
                         hover:bg-[#1363DF] disabled:hover:bg-[#47b5ff77] disabled:opacity-50 disabled:cursor-default'
                        disabled={!input.trim() && !selectedFile}
                        onClick={sendPost}
                        >
                        Post
                    </button>
                </div>
            </div>
            }
        </div>
    </div>
  )
}

export default Input