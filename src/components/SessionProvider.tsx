"use client"
import { Session } from "next-auth"
import { SessionProvider as Provider} from "next-auth/react"
export function SessionProvider({children, session}:
    {
        children: React.ReactNode
        session: Session | null
    }){
    return (
        <Provider>
            {children}
        </Provider>
    )
}