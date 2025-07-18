const { cookies } = require("next/headers")

const TOKEN_AGE = 3600
const TOKEN_NAME = "auth_token"
const TOKEN_REFRESH_NAME = "auth_refresh_token"

export async function getToken(){
    // api requests
    const myAuthToken = (await cookies()).get(TOKEN_NAME)
    return myAuthToken?.value
}


export async function getRefreshToken(){
    // api requests
    const myAuthToken = (await cookies()).get(TOKEN_REFRESH_NAME)
    return myAuthToken?.value
}

export async function setToken(authToken){
    // login
    return (await cookies()).set({
        name: TOKEN_NAME,
        value: authToken,
        httpOnly: true, // limit client-side js
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: TOKEN_AGE,
    })
}

export async function setRefreshToken(authRefreshToken){
    // login
    return (await cookies()).set({
        name: TOKEN_REFRESH_NAME,
        value: authRefreshToken,
        httpOnly: true, // limit client-side js
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: TOKEN_AGE,
    })
}

export async function deleteTokens(){
    // logout
    (await cookies()).delete(TOKEN_REFRESH_NAME)
    return (await cookies()).delete(TOKEN_NAME)
}