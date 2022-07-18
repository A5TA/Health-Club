import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import { getProviders, getSession, useSession } from 'next-auth/react'
import Login from '../components/Login'
import Modal from '../components/Modal'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Widgets from '../components/Widgets'

export default function Home({trendingResults, followResults, providers}) {
  const {data: session} = useSession()
  const [isOpen, setIsOpen] = useRecoilState(modalState)

  if (!session) return <Login providers={providers} /> 

  return (
    <div className=''>
      <Head>
        <title>Health Club</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='bg-[#06283D] min-h-screen flex max-2-[1500px] mx-auto'>
        <Sidebar/>
        <Feed />
        <Widgets trendingResults={trendingResults} followResults={followResults}/>

        {isOpen && <Modal/>}
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  // Use News API at https://saurav.tech/NewsAPI/
  const trendingResults = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/health/in.json").then(
    (res) => res.json()
  ).then(
    (ret) => [ret.articles[0], ret.articles[1], ret.articles[2]]
  )
  const followResults = await fetch("https://jsonkeeper.com/b/3VV8").then(
    (res) => res.json()
  )
  const providers = await getProviders()
  const session = await getSession(context)

  return {
    props: {
      trendingResults,
      followResults,
      providers, //The only provider is Google right now
      session,
    },
  }
}
