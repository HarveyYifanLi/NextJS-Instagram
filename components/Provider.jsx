"use client";

import { SessionProvider } from "next-auth/react";
// Note that Provider is actually a HOC, by utilizing the children props of React!!
// In effect, this means that all components nested inside of the <Provider></Provider>
// will be able to access the 'session' object by calling the useSession() hook from NextAuth.js
const Provider = ({children, session}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider