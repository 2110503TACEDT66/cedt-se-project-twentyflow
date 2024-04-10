"use client";

import { signOut } from "next-auth/react";

export default function LogOutButton() {

    return (
        <button onClick={()=>signOut()} className=" text-xl font-bold text-white p-2 bg-main-100 rounded-md">
            LOGOUT
        </button>
    )
}