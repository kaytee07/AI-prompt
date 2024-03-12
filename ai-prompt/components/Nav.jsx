"use client"

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";


const Nav = () => {
  const isLoggedIn = false;
  const [providers, setProviders] = useState(null);

  useEffect(()=> {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
  }, []);
  return (
    <nav className="w-full flex-between mb-16 pt-3"> 
      <Link href="/" className=" logo_text flex gap-2 flex-cent">
        <Image
          src="/assets/images/logo.svg"
          alt="proptAI logo"
          width={30}
          height={30}
        />
        promptAI
      </Link>


      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
          {isLoggedIn ? (
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
            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
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
    </nav>
  )
}

export default Nav
