'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image"
import { useState } from "react"


export default function Code( {couponName, couponCode}: {couponName:string, couponCode:string}) {

    const [isTextVisible, setIsTextVisible] = useState(false);

    const toggleTextVisibility = () => {
        setIsTextVisible(!isTextVisible);
    };

    const copyText = (entryText:string) => {
        navigator.clipboard.writeText(entryText);
        setIsButtonClicked(true);
        setTimeout(defaultButton, 500);
    }
    const defaultButton = () => {
        setIsButtonClicked(false);
    }
    const [isButtonClicked, setIsButtonClicked] = useState(false);

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
                    <div className=" bg-white rounded-lg w-3/4 h-[50px] flex flex-row justify-between items-center">
                        <div className="font-bold text-xl text-center p-2 w-[90%]">
                            {isTextVisible && couponCode }
                        </div>
                        {isTextVisible && <button title="copy" className="p-3" onClick={()=>{copyText(couponCode);}}>
                            <FontAwesomeIcon className={`h-5 w-6 ${isButtonClicked ?"text-gray-400": "text-gray-600"}`} icon={faCopy}/>
                        </button>}
                    </div>
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