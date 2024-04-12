'use client'

import Image from "next/image"
import { useState } from "react"


export default function Code( {couponName, couponCode}: {couponName:string, couponCode:string}) {

    const [isTextVisible, setIsTextVisible] = useState(false);

    const toggleTextVisibility = () => {
        setIsTextVisible(!isTextVisible);
    };

    return(
        <div className='w-full h-[200px] rounded-lg shadow-xl bg-custom-purple flex flex-row'>
            <div className='w-[130px] h-[130px] relative bg-white m-[30px] rounded-lg '>
                <Image src={ '/img/couponIcon.png'}
                alt='couponIcon Picture'
                fill={true}
                className='object-contain rounded-t-lg p-[30px]'/>
            </div>
            <div className="w-full">
                <h1 className='text-white font-bold text-3xl m-[30px] mx-0'>{couponName}</h1> 
                <div className="w-full flex items-center">
                    <h1 className=" bg-white p-3 rounded-lg font-bold text-xl text-center w-3/4 h-[50px]">
                        {isTextVisible && couponCode }
                    </h1>
                    <button onClick={toggleTextVisibility} className='w-[70px] h-[50px] relative bg-white rounded-lg ml-2'>
                        <Image src={ '/img/showEye.png'}
                        alt='showEye Picture'
                        fill={true}
                        className='object-contain rounded-t-lg p-[7px]'/>
                        {
                            isTextVisible ? <Image src={ '/img/hideLine.png'}
                            alt='hideLine Picture'
                            fill={true}
                            className='object-contain rounded-t-lg p-[7px]'/>:null
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}