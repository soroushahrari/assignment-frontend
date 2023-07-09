import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Sign In with Email',
            id: 'signin',
            credentials: {
                email: { label: 'email', type: 'email', placeholder: 'email' },
                password: { label: 'password', type: 'password', placeholder: 'password' }
            },

            async authorize(credentials, req) {

                const payload = {
                    email: credentials?.email,
                    password: credentials?.password
                }

                const res = await fetch('http://localhost:3500/auth/login', {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error.message || data.message);
                }
                if (res.ok && data) {

                    return data.data;
                }

                return null;
            }
        }),
        CredentialsProvider({
            name: 'Sign Up with Email',
            id: 'signup',
            credentials: {
                email: { label: 'email', type: 'email', placeholder: 'email' },
                password: { label: 'password', type: 'password', placeholder: 'password' }
            },

            async authorize(credentials, req) {

                const payload = {
                    email: credentials?.email,
                    password: credentials?.password
                }

                const res = await fetch('http://localhost:3500/auth/signup', {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error.message || data.message);
                }
                if (res.ok && data) {

                    return data.data;
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                token.accessToken = user.accessToken;
            }

            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            return session;
        },
    },
    session: {
        strategy: 'jwt',
    }
})

export { handler as GET, handler as POST }