"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";


const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(()=> {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  }, []);
  return (
    <nav className="w-full flex-between mb-16 pt-3"> 
      <Link href="/" className="flex gap-2 flex-cent">
        <Image
          src="/assets/images/logo.svg"
          alt="proptAI logo"
          width={30}
          height={30}
        />
        <p className="logo_text">promptAI</p>
      </Link>


      {/* Desktop Navigation */}
      <div className="md:flex hidden">
          {session?.user ? (
        <div className="flex gap-3 md:gap-5">
          <Link 
            href="/create-prompt"
            className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/myprofile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
        </div>
      ): (
          <>
             {providers && 
            Object.values(providers).map((provider)=>(
              <button
                type="button"
                key={provider.name}
                onClick={()=> signIn(provider.id)}
                className="black_btn"
              >
                SignIn
              </button>
            ))}
          </>
         )
}
      
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {
          session?.user ? (
            
            <div className="flex">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
                onClick={() => setToggleDropdown((prev) => !prev)}
              />
              {toggleDropdown && (
                <div className="dropdown">
                  <Link
                    href="/myprofile"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                    <Link
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false)
                      signOut();
                    }}
                    className="mt-5 w-full black_btn"
                  >
                    Signout
                  </button>
                </div>
              )}
              {console.log()}
            </div>
          ):(
            <>
              {providers && 
            Object.values(providers).map((provider)=>(
              <button
                type="button"
                key={provider.name}
                onClick={(e)=> {
                  e.preventDefault()
                  signIn(provider.id)
                }}
                className="black_btn"
              >
                SignIn
              </button>
            ))}
            </>
          )
        }
      </div>
    </nav>
  )
}

export default Nav
