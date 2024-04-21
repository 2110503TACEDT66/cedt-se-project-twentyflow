"use client";

import Swal from "sweetalert2";

export default function LogInButton() {

    const handleLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault(); 
        Swal.fire({
          title: 'Are you sure?',
          text: 'Do you want to log in?',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Yes, log in',
          cancelButtonText: 'No, cancel',
      }).then((result) => {
          if (result.isConfirmed) {
              // User confirmed, proceed with login
              window.location.href = "/api/auth/signin";
          }
      });
    }

    return (
        <button onClick={handleLogin} className=" text-xl font-bold text-white p-2 bg-main-100 rounded-md">
            LOGIN
        </button>
    )
}