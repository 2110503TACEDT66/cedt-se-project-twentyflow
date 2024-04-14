// I want to create myprofile page that display name,email,telephone number


import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser , faScrewdriverWrench} from '@fortawesome/free-solid-svg-icons'
import getUserProfile from "@/libs/getUserProfile";

// i want the navbar in the top of the page that contain profile and edit profile


export default async function profile() {
    const session = await getServerSession(authOptions)
    return (
        
        
        <div>
            <h1>
            {session && session.user.name}
            </h1>
            <h1>
                {session && session.user.email}
            </h1>
            <h1>
                {session && session.user.telephone_number}
            </h1>
        </div>
        
    )
}
