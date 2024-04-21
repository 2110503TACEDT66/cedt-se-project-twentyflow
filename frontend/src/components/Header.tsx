import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import getUserProfile from "@/libs/getUserProfile";
import LogOutButton from "./LogOutButton";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import LogInButton from "./LogInButton";

export default async function Header() {
  const session = await getServerSession(authOptions);
  // var profile = null
  // if (session) {
  //     var profile = await getUserProfile(session.user.token)
  // }
  
  return (
    <header className="flex items-center justify-between py-7 px-10 h-[10vh]">
      <Link href="/" className="text-5xl font-black text-main-100">
      CEDT
      </Link>
      <nav>
        <div className="flex space-x-7 justify-center items-center">
          <Link href="/" className=" text-xl font-bold hover:text-main-100">
            HOME
          </Link>
          <Link href="/coworkings" className=" text-xl font-bold hover:text-main-100">
            COWORKING
          </Link>
          {!session ? (
            <div className="flex space-x-7 justify-center items-center">
              <Link href="/api/auth/register" className=" text-xl font-bold">
                REGISTER
              </Link>
              {/* <Link
                href="/api/auth/signin"
                className=" text-xl font-bold text-white p-2 bg-main-100 rounded-md"
                onClick={handleLogin}
              >
                LOGIN
              </Link> */}
              <LogInButton />
            </div>
          ) : (
            <div className="flex space-x-7 justify-center items-center">
              <Link href="/booking" className=" text-xl font-bold hover:text-main-100">
                BOOKING
              </Link>
              {session.user.role === "admin" ? (
                <Link href={"/dashboard"} className=" text-xl font-bold hover:text-main-100">
                  DASHBOARD
                </Link>
              ) : (
                <Link href={"/coupon"} className=" text-xl font-bold hover:text-main-100">
                  COUPON
                </Link>
              )}
              <Link
                className="text-xl flex flex-row font-bold space-x-2 text-white p-2 bg-main-100 rounded-md"
                href="/account"
              >
                {/* <FontAwesomeIcon icon={ profile.data.role === "user" ? faUser : faScrewdriverWrench} className=" w-4 text-white" /> */}
                <h1>{session.user.name}</h1>
              </Link>
              <LogOutButton />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
