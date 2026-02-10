import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"


export const userRequired = async ()=>{
    // this function we will get from kind
    const {isAuthenticated , getUser}  =  getKindeServerSession()


    const isUserAuthenticated = await isAuthenticated()

    if(!isUserAuthenticated){
            redirect("/api/auth/login")
    }

    const user = await getUser()

    return {
        user,
        isUserAuthenticated
    }
}