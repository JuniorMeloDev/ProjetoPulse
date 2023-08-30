import React from 'react'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]'

export default function teste({user}) {
    return (
        <div>
            <h1>Usuario logado</h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
        
    )
}

/*export async function getServerSideProps(contexto) {
    const session = await getServerSession(contexto.req, contexto.res, authOptions)

    if (!session) {
        return {
            redirect: {
                destination: '/api/auth/signin',
                permanent: false,
            }
        }
    }

    return {
        props: {
            user: session.user, 
        }
    }
}
*/