import NextAuth, { getServerSession } from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
        },
        senha: {
          label: 'password',
          type: 'password',
        },
      },
      // credenciais cadastradas no banco (mesmos nomes que consta lá)
      async authorize(credentials, req) {
        console.log('Credenciais Recebidas:', credentials)
        if (!credentials.email && !credentials.senha) {
          throw new Error('invalidos')
        }

        const res = await fetch(
          'http://localhost:8080/auth/login',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials?.email,
              senha: credentials?.senha,
            }),
            //faz a requisição no banco de dados onde tem os cadastros dos usuarios (POST)
          }
       );

        const user = await res.json();

        if (user) {
          return { ...user};
        } else {
          return null;
        }
      
        
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
      //funções para usar o JWT token
    },

    pages: {
      signIn: '/',
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

export const getServerAuthSession = (req, res) => {
  return getServerSession(req, res, authOptions);
};