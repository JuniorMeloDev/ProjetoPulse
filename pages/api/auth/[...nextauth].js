import NextAuth, { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        const { email, password } = credentials;
        const user = {
          name: "Junior Melo",
          email: "Junior@email.com",
  
          //const validacao = true
          // if (validacao) {
          //  throw new Error('Email e senha invalidos')
        };
        return user;
      },
    }),
  ],
  }

export default NextAuth(authOptions);

export const getServerAuthSession = (req, res) => {
  return getServerSession(req, res, authOptions)
}

 
