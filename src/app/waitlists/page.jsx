"use client"; 
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const WAITLISTS_API_URL = "/api/waitlists/";

export default function Page() {

  const { data, error, isLoading } = useSWR(`${WAITLISTS_API_URL}`, fetcher)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>


  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <div>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm">
            <code>{JSON.stringify(data)}</code>
          </pre>
        </div>
    </div>
  );
}
