import '@/styles/globals.css'

import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}


function Auth({ children }) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const isUser = !!session?.user
  const loading = status === 'loading'

  useEffect(() => {
    if (!loading) {
      if (!isUser) {
        router.push('/')
      }
    }
  }, [isUser, loading])

  if (loading) {
    return <h3>Carregando...</h3>
  }
  if (!loading && isUser) {
    return <div>{children}</div>
  }
  return null

}
