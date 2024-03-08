"use client"

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";


const Nav = () => {
    const isLoggedIn = true;
    const [providers, setProviders] = useState(null);

    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        }

        setProviders();
    }, []);
    
    return (
    <nav className="w-full flex-between mb-16 pt-3">
        <Link href="/" className="flex gap-2 flex-center">
            <Image
                src="/assets/images/logo.svg"
                alt="Promptopia Logo"
                width={30}
                height={30}
            />
            <h1 className="text-2xl font-bold leading-[1.15] orange_gradient">AI-prompt</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="sm:flex hidden">
            {isLoggedIn ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href="/create-prompt" className="black_btn">
                        Create Post
                    </Link>

                    <button 
                    type="button" 
                    onClick={signOut}
                    className="outline_btn"
                    >
                        SignOut
                    </button>
                    <Link href="/profile">
                        <Image
                        src="assets/images/logo.svg"
                        width={37}
                        height={37}
                        className="round-full"
                        alt="profile"
                        />
                    </Link>

                </div>
            ): (
                <>
                    {providers && 
                        Object.values(providers).map((provider) => {
                            <button
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className="black_btn"
                            >
                                SignIn
                            </button>
                        })}
                </>
            )}
        </div>
    </nav>
  )
}

export default Nav
