"use client"; 
import { useAuth } from "@/components/authProvider";
import Image from "next/image";
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
  const auth = useAuth();

  const { data, error, isLoading } = useSWR(`http://127.0.0.1:8001/api/hello`, fetcher)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>
  

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">

      <div>
        {auth.isAuthenticated ? (
          <h1 className="text-2xl font-bold row-start-1">Hello user!</h1>
        ) : (
          <h1 className="text-2xl font-bold row-start-1">Hello guest!</h1>
        )}
      </div>

        <div>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm">
            <code>{JSON.stringify(data)}</code>
          </pre>
        </div>

        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </div>
  );
}
