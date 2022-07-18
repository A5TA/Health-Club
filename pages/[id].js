import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore"
import { getProviders, getSession, useSession } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { modalState } from "../atoms/modalAtom"
import Modal from "../components/Modal"
import Sidebar from "../components/Sidebar"
import Widgets from "../components/Widgets"
import Post from "../components/Post"
import { db } from "../firebase"
import Comment from "../components/Comment"
import {Login} from '../components/Login'
import {GiBackPain} from 'react-icons/gi'


function PostPage({ trendingResults, followResults, providers }) {
  const {data: session} = useSession()
  const [isOpen, setIsOpen] = useRecoilState(modalState)
  const router = useRouter()
  const {id} = router.query 
  const [post, setPost] = useState()
  const [comments, setComments] = useState([])
  
  useEffect(
    () =>
      onSnapshot(doc(db, "posts", id), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db]
  )

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  )

  if (!session) return <Login providers={providers} /> 
  return (
    <div className=''>
    <Head>
      <title>{post?.username} posted "{post?.text}"</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className='bg-[#06283D] min-h-screen flex max-2-[1500px] mx-auto'>
      <Sidebar />
      <div className="flex-grow border-r border-l border-[#47B5FF] max-w-2xl sm:ml-[73px] xl:ml-[370px]">
        <div className="flex items-center px-1.5 py-2 border-b border-[#47B5FF] text-[#DFF6FF] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-[#06283D]">
            <div
              className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
              onClick={() => router.push("/")}
            >
              <GiBackPain className="h-8 text-[#DFF6FF]" />
            </div>
            Post
          </div>

          <Post id={id} post={post} postPage />

          {comments.length > 0 && (
            <div className="pb-72">
              {comments.map(comment => (
                <Comment key={comment.id} id={comment.id} comment={comment.data()} poster={post?.tag}/>
              ))}
            </div>
          )}
      </div>
      <Widgets trendingResults={trendingResults} followResults={followResults}/>

      {isOpen && <Modal/>}
    </main>
  </div>
  )
}

export default PostPage

export async function getServerSideProps(context) {
  // Use News API at https://saurav.tech/NewsAPI/
  const trendingResults = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/health/in.json").then(
    (res) => res.json()
  ).then(
    (ret) => [ret.articles[0], ret.articles[1], ret.articles[2]]
  )
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
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
