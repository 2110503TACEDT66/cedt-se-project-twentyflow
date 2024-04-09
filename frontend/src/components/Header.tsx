import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser , faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons"
import getUserProfile from '@/libs/getUserProfile';
import LogOutButton from './LogOutButton';

export default async function Header() {
    const session = await getServerSession(authOptions)
    // var profile = null
    // if (session) {
    //     var profile = await getUserProfile(session.user.token)
    // }
    return (
        <header className="flex items-center justify-between py-7 px-10 h-[10vh]">
        <h1 className="text-5xl font-black text-main-100">CEDT</h1>
        <nav>
            <div className="flex space-x-7 justify-center items-center">
                <Link href="/" className=" text-xl font-bold">HOME</Link>
                <Link href="/coworkings" className=" text-xl font-bold">RESERVE</Link>
                {
                    !session ? 
                        (
                        <div className="flex space-x-7 justify-center items-center">
                            <Link href="/api/auth/register" className=" text-xl font-bold">REGISTER</Link>
                            <Link href="/api/auth/signin" className=" text-xl font-bold text-white p-2 bg-main-100 rounded-md">LOGIN</Link>
                        </div>
                        )
                        : (
                            <div className="flex space-x-7 justify-center items-center">
                                <Link href="/history" className=" text-xl font-bold">HISTORY</Link>
                                <div  className=" text-xl flex flex-row font-bold space-x-2 text-white p-2 bg-main-100 rounded-md">
                                    {/* <FontAwesomeIcon icon={ profile.data.role === "user" ? faUser : faScrewdriverWrench} className=" w-4 text-white" /> */}
                                    <h1>
                                        {session.user.name}
                                    </h1>      
                                </div>
                                <LogOutButton />
                            </div>
                        )
                }
            </div>
        </nav>
        </header>
    )
    }