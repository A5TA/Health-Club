import {signIn} from 'next-auth/react'
import Image from "next/image"
function Login({providers}) {
  return (
    <div className='flex flex-col items-center gap-y-10 pt-40'>
        <Image src="/logo-login.png" width={500} height={500} objectfit='contain' quality={100}/>
        <div>
            {Object.values(providers).map(provider => (
                <div key={provider.name}>
                    <button className='relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-[#DFF6FF] bg-[#47B5FF] rounded-lg group'
                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
                        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[#1363DF] rounded-full 
                        group-hover:w-56 group-hover:h-56"></span>
                        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 
                        bg-gradient-to-b from-transparent via-transparent to-[#1363DF]"></span>
                        <span className="relative">
                            Sign in with {provider.name}
                        </span>
                    </button>
                    
                </div>
            ))}
        </div>
    </div>
  )
}

export default Login