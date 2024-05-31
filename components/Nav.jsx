"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    // Note below regarding immediately invoking an async function within useEffect
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3 border-gray border-b pb-4'>
      <Link href='/' className='flex gap-2 flex-center'>
        <p className='font-handwritten text-2xl'>Insta-brother</p>
      </Link>

      {/* Desktop Navigation */}
      {/* If there's already an user session, display the links related to 'Create prompt/Sign Out/profile'
          Else, loop through the currently supported/available providers (e.g. google) and display a sign in buttn for each of it
      */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='blue_btn'>
              Create Post
            </Link>

            <button type='button' onClick={signOut} className='white_btn'>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                loader={({src})=> session?.user.image} // exactly same as doing: loader={({src})=>`${src}`}
                unoptimized={true}
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <>
                  <button
                    type='button'
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className='blue_btn'
                  >
                    Log In
                  </button>

                  <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='white_btn'
                 >
                  Sign Up
                 </button>
              </>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              loader={({src})=> session?.user.image} // exactly same as doing: loader={({src}) => src}
              unoptimized={true}
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Post
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full blue_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <>
                  <button
                    type='button'
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className='blue_btn'
                  >
                    Log In
                  </button>

                  <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='white_btn'
                 >
                  Sign Up
                 </button>
              </>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;