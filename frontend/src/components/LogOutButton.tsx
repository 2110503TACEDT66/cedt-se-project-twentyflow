"use client";

import { signOut } from "next-auth/react";
import Swal from "sweetalert2";

export default function LogOutButton() {

    const handleLogoutClick = () => {
        // Trigger SweetAlert2 confirmation dialog
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you really want to log out?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, log out',
            cancelButtonText: 'No, cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                // User confirmed, proceed with logout
                signOut();
            }
        });
    };


    return (
        <button onClick={handleLogoutClick} className=" text-xl font-bold bg-white lg:text-white p-2 lg:bg-main-100 rounded-md">
            LOGOUT
        </button>
    )
}