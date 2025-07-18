"use server"

export default async function Page({params, searchParams}) {
    return <h1>
        API Page - Params: {JSON.stringify(params)}, Search Params: {JSON.stringify(searchParams)}
    </h1>

}