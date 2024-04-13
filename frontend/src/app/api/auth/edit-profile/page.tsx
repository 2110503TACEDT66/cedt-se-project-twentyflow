
'use client'
import React, { use, useState } from 'react';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from 'next/link'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser , faScrewdriverWrench} from '@fortawesome/free-solid-svg-icons'
import getUserProfile from "@/libs/getUserProfile";
import { useRouter } from 'next/router';
import updateUserProfile from "@/libs/updateUserProfile";
import { getSession,useSession } from 'next-auth/react';

const EditProfilePage: React.FC = () => {
    const [name, setName] = useState('');
    const [telephone, setTelephone] = useState('');
    const session = useSession();

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleTelephoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTelephone(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Update the name and telephone number in the database
        try {
            
            const currentUser = session.data?.user;
            if(currentUser && currentUser.token && currentUser._id){
                updateUserProfile(name, currentUser.token, currentUser._id, telephone);
            }
            
            // updateUserProfile(name, currentUser.token, currentUser.userId);
        } catch (error) {
            console.error('Failed to update user profile', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={handleNameChange} />
                </div>
                <div>
                    <label htmlFor="telephone">Telephone:</label>
                    <input type="text" id="telephone" value={telephone} onChange={handleTelephoneChange} />
                </div>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default EditProfilePage;

