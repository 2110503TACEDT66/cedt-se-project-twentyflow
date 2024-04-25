'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image"
import Link from "next/link";


export default function HistoryAccount( {historyName, historyPrice}: {historyName:string, historyPrice:number}) {


    return(
        <div className='w-full  rounded-lg shadow-xl bg-custom-purple flex flex-row'>
            <div className='w-[130px]  relative bg-white m-[30px] flex justify-center items-center rounded-lg '>
                <FontAwesomeIcon icon={faClockRotateLeft} size="5x" className="py-5 px-9 text-main-100"/>
            </div>
            <div className="w-3/4 flex flex-col space-y-3 justify-center">
                <h1 className=" text-3xl text-white font-bold ">
                    {historyName}
                </h1>
                <h1 className=" text-3xl text-white font-bold ">
                    {historyPrice} THB
                </h1>
            </div>
            <div className="w-1/4 flex justify-center place-items-end my-4">
                <Link href={`/account/${'6628f6c350a76747b2c554fb'}`} className="bg-white text-main-100 text-[20px] py-2 rounded-md font-bold w-3/4 text-center hover:text-black hover:shadow-lg">
                        Details
                </Link>
            </div>
        </div>
    )
}