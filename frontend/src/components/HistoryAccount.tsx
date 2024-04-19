'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image"



export default function HistoryAccount( {historyName, historyPrice}: {historyName:string, historyPrice:number}) {


    return(
        <div className='w-full  rounded-lg shadow-xl bg-custom-purple flex flex-row'>
            <div className='w-[130px]  relative bg-white m-[30px] flex justify-center items-center rounded-lg '>
                <FontAwesomeIcon icon={faClockRotateLeft} size="5x" className="py-5 px-9 text-main-100"/>
            </div>
            <div className="w-full flex flex-col space-y-3 justify-center">
                <h1 className=" text-3xl text-white font-bold ">
                    {historyName}
                </h1>
                <h1 className=" text-3xl text-white font-bold ">
                    {historyPrice} THB
                </h1>
                
            </div>
        </div>
    )
}