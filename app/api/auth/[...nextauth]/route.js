// https://next-auth.js.org/getting-started/example
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

// NOTE: Because we are using NextAuth in Next.js framework, this is in essence a serverless route! Namely there's no dedicated server to serve that route ALL THE TIME
// i.e. this route is only run, when there's a connection made through it

//- The below is the standard NextAuth main entry point: it is called "initializing NextAuth.js by calling the NextAuth() method"
// -> what it returns is a standard "Route Handler" (i.e. the below "handler" is a default Route Handler)
// -> Next.js 13.2 introduced Route Handlers, the preferred way to handle REST requests in App Router (app/).
// -> Now, All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth.js.
//- All we need to do is pass the OAuth providers that we want to use and designate whatever callback actions we want to do during its authenticating process
// within the callbacks object, for the default session(), signIn() and signOut() functions
// https://next-auth.js.org/configuration/initialization#route-handlers-app

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async signIn({ account, profile, user, credentials }) {
      // This is the callback function that's triggered after a successful sign-in from the specified OAuth provider
      // and having obtained the access_token (within the 'account' param) from this OAuth provider
      try {
        await connectToDB();
        console.log('--------- within the signIn callback, { account, profile, user, credentials } param is:', { account, profile, user, credentials });
        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
    async session({ session }) {
      // This is the callback function that's triggered after the signIn callback being processed and we get a 'session' object (i.e. that session param)
      // from the OAuth provider; then if necessary we can do our own special processing on this session object such as attaching new properties
      // -> thus then any component calling the useSession hook will have access to the updated session object with these new properties
      console.log('--------- within the session callback, { session } param is:', { session });
      // store the user id from MongoDB to session by simply updating the session object, 
      // -> thus then any component calling the useSession hook will have access to the updated session object
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
  }
})

export { handler as GET, handler as POST }