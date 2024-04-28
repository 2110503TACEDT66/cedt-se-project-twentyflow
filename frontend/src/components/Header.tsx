'use client'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import getUserProfile from "@/libs/getUserProfile";
import LogOutButton from "./LogOutButton";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { useSession } from "next-auth/react";


export default function Header() {
  const { data: session } = useSession();    
  
  // State to manage the visibility of the menu
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  

  return (
    <header className="flex items-center z-50 justify-between py-7 px-10 h-[10vh]">
      <Link href="/" className="text-5xl font-black text-main-100">
      CEDT
      </Link>
      <nav className=" lg:flex hidden">
        <div className="flex lg:space-x-3 xl:space-x-7 justify-center items-center">
          <Link href="/" className="  text-base lg:text-xl font-bold hover:text-main-100">
            HOME
          </Link>
          <Link href="/coworkings" className="  text-base lg:text-xl font-bold hover:text-main-100">
            COWORKING
          </Link>
          {!session ? (
            <div className="flex lg:space-x-3 xl:space-x-7 justify-center items-center">
              <Link href="/api/auth/register" className="  text-base lg:text-xl font-bold">
                REGISTER
              </Link>
              <Link
                href="/api/auth/signin"
                className="  text-base lg:text-xl font-bold text-white p-2 bg-main-100 rounded-md"
              >
                LOGIN
              </Link>
              {/* <LogInButton /> */}
            </div>
          ) : (
            <div className="flex lg:space-x-3 xl:space-x-7 justify-center items-center">
              
              <Link href="/leaderboard" className="  text-base lg:text-xl font-bold hover:text-main-100">
                LEADERBOARD
              </Link>
              {session.user.role === "admin" ? (
                <Link href={"/dashboard"} className="  text-base lg:text-xl font-bold hover:text-main-100">
                  DASHBOARD
                </Link>
              ) : (
                <Link href={"/coupon"} className=" text-base lg:text-xl font-bold hover:text-main-100">
                  COUPON
                </Link>
              )
              }
              <Link href="/booking" className=" text-base lg:text-xl font-bold hover:text-main-100">
                BOOKING
              </Link>
              
              <Link
                className=" text-base lg:text-xl flex flex-row font-bold space-x-2 text-white p-2 bg-main-100 rounded-md"
                href="/account"
              >
                {/* <FontAwesomeIcon icon={ profile.data.role === "user" ? faUser : faScrewdriverWrench} className=" w-4 text-white" /> */}
                <h1>{session.user.name.split(" ")[0]}</h1>
              </Link>
              <LogOutButton />
              
            </div>
          )}
        </div>
      </nav>
      <nav className="lg:hidden flex">
        <FontAwesomeIcon
          icon={ !menuOpen ? faBars : faTimes}
          className="text-3xl text-main-100"
          onClick={toggleMenu}
        />
        {menuOpen && (
          <div className="fixed z-50 top-[10vh] left-0 w-full h-[90vh] bg-main-100 flex flex-col items-center justify-center">
            <FontAwesomeIcon
              icon={faTimes}
              className="text-3xl text-main-100"
              onClick={toggleMenu}
            />
            <div className="flex flex-col space-y-3">
              <Link href="/" onClick={()=>setMenuOpen(false)} className="text-2xl font-bold text-white">
                HOME
              </Link>
              <Link href="/coworkings" onClick={()=>setMenuOpen(false)} className="text-2xl font-bold text-white">
                COWORKING
              </Link>
              {!session ? (
                <div className="flex flex-col space-y-3">
                  <Link href="/api/auth/register" onClick={()=>setMenuOpen(false)} className="text-2xl font-bold text-white">
                    REGISTER
                  </Link>
                  <Link
                    href="/api/auth/signin"
                    onClick={()=>setMenuOpen(false)}
                    className="text-2xl font-bold text-white"
                  >
                    LOGIN
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link href="/leaderboard" onClick={()=>setMenuOpen(false)} className="text-2xl font-bold text-white">
                    LEADERBOARD
                  </Link>
                  {session.user.role === "admin" ? (
                    <Link href={"/dashboard"} onClick={()=>setMenuOpen(false)} className="text-2xl font-bold text-white">
                      DASHBOARD
                    </Link>
                  ) : (
                    <Link href={"/coupon"} onClick={()=>setMenuOpen(false)} className="text-2xl font-bold text-white">
                      COUPON
                    </Link>
                  )
                  }
                  <Link href="/booking" onClick={()=>setMenuOpen(false)} className="text-2xl font-bold text-white">
                    BOOKING
                  </Link>
                  <Link
                    className="text-2xl font-bold bg-white text-black text-center py-3 rounded-md"
                    onClick={()=>setMenuOpen(false)}
                    href="/account"
                  >
                    <h1>{session.user.name.split(" ")[0]}</h1>
                  </Link>
                  <LogOutButton />
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
