"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faArrowUpWideShort , faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons"


export default function SearchBar({search,sort} : {search : Function,sort : Function}) {

   
    return(
        <div className=" p-5 w-full flex flex-row space-x-5">
                <div className=" w-10/12 flex flex-row space-x-3 p-2 bg-gray-200 rounded-md">
                    <div className=" flex justify-center items-center w-[5%]">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className=" w-7 text-main-100 " />
                    </div>
                    <input
                    onChange={(e) => {search(e.target.value)}}
                    className=" w-[85%] focus:outline-none rounded-md px-5" type="text"  />
                    <button className=" w-[10%] bg-main-100 text-white font-bold py-3 rounded-md">
                        SEARCH
                    </button>

                </div>
                <button onClick={() => {sort("asc")} }
                 className=" w-1/12 bg-main-100 text-white font-bold py-3 rounded-md flex justify-center items-center">
                    <FontAwesomeIcon icon={faArrowUpWideShort} className=" w-7 text-white" />
                </button>
                <button onClick={() => {sort("desc")} }
                className=" w-1/12 bg-main-100 text-white font-bold py-3 rounded-md flex justify-center items-center">
                    <FontAwesomeIcon icon={faArrowDownWideShort} className=" w-7 text-white" />
                </button>
            </div>
    )
 }