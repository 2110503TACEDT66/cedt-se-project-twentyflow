"use client"
import updateUserProfile from "@/libs/updateUserProfile";
import { faClockRotateLeft, faPenToSquare, faTag, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { Telemetry } from "next/dist/telemetry/storage";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CodeCatalog from "./CodeCatalog";
import HistoryAccountCatalog from "./HistoryAccountCatalog";


export default function Account() {

    const router = useRouter();
    const session = useSession()
    const currentUser = session.data?.user
    const [menuChanger, setMenuChanger] = useState<number>(1)
    const tranclass1 = (menuChanger === 1) ? "border-b-2" : ""
    const tranclass2 = (menuChanger === 2) ? "border-b-2" : ""
    const tranclass3 = (menuChanger === 3) ? "border-b-2" : ""
    const tranclass4 = (menuChanger === 4) ? "border-b-2" : ""
    const tranDiv1 = (menuChanger === 1) ? "flex" : "hidden"
    const tranDiv2 = (menuChanger === 2) ? "flex" : "hidden"
    const tranDiv3 = (menuChanger === 3) ? "flex" : "hidden"
    const tranDiv4 = (menuChanger === 4) ? "flex" : "hidden"  
    useEffect(() => {
        
        
        
      }, [])
    const userName = currentUser?.name
    const userEmail = currentUser?.email
    const tel = currentUser?.telephone_number

    const [changeUsername, setChangeUsername] = useState<string | undefined>(userName);
    const [changeTel, setChangeTel] = useState<string | undefined>(tel);

    const handleSave = async () => {
        if(changeUsername && changeTel && currentUser?.token && currentUser?._id){
            await updateUserProfile(changeUsername, currentUser?.token, currentUser?._id, changeTel);
            session.update();
            setMenuChanger(1);
            router.push("/account")
        }
    }

    return (
        <div className="flex w-full  scrollbar-none flex-col  items-center bg-main-100 min-h-[90vh] p-7">
            <h1 className=" text-5xl py-10 font-semibold text-white">
                ACCOUNT
            </h1>
            
            <div className=" w-10/12 space-y-10 h-full p-10 pt-0 bg-white rounded-md flex flex-col">
                <div className="w-3/5 mx-auto bg-grey-100 flex">
                    <div className={`w-1/4 flex justify-center rounded-t-lg ${tranclass1} border-main-100 hover:bg-slate-300 hover:cursor-pointer`}
                    onClick={() => {setMenuChanger(1)}}><FontAwesomeIcon icon={faUser} size="2x" className="py-5 px-9 text-main-100"/></div>
                    <div className={`w-1/4 flex justify-center rounded-t-lg ${tranclass2} border-main-100 hover:bg-slate-300 hover:cursor-pointer`}
                    onClick={() => {setMenuChanger(2)}}><FontAwesomeIcon icon={faPenToSquare} size="2x" className="py-5 px-9 text-main-100"/></div>
                    <div className={`w-1/4 flex justify-center rounded-t-lg ${tranclass3}  border-main-100 hover:bg-slate-300 hover:cursor-pointer`}
                    onClick={() => {setMenuChanger(3)}}><FontAwesomeIcon icon={faTag} size="2x" className="py-5 px-9 text-main-100"/></div>
                    <div className={`w-1/4 flex justify-center rounded-t-lg ${tranclass4}  border-main-100 hover:bg-slate-300 hover:cursor-pointer`}
                    onClick={() => {setMenuChanger(4)}}><FontAwesomeIcon icon={faClockRotateLeft} size="2x" className="py-5 px-9 text-main-100"/></div>
                </div>
            
                <div className={`${tranDiv1} flex-col space-y-3`}>
                    <h1 className=" font-bold text-xl">
                        Name
                    </h1>
                    <h1 className=" font-semibold text-xl border-2 p-3 rounded-md border-gray-300">
                        {userName}
                    </h1>

                    <h1 className=" font-bold text-xl">
                        Email
                    </h1>
                    <h1 className=" font-semibold text-xl border-2 p-3 rounded-md border-gray-300">
                        {userEmail}
                    </h1>

                    <h1 className=" font-bold text-xl">
                        Telephone Number
                    </h1>
                    <h1 className="font-semibold text-xl border-2 p-3 rounded-md border-gray-300">
                        {tel}
                    </h1>
                </div>

                <div className={`${tranDiv2} flex-col space-y-4`}>
                    <h1 className=" font-bold text-xl">
                        Name
                    </h1>
                    <input className=" font-semibold text-xl border-2 p-3 rounded-md border-gray-300" value={changeUsername} onChange={(event) => {setChangeUsername(event?.target.value)}}></input>

                    <h1 className=" font-bold text-xl">
                        Telephone Number
                    </h1>
                    <input className="font-semibold text-xl border-2 p-3 rounded-md border-gray-300" value={changeTel} onChange={(event) => {setChangeTel(event.target.value)}}></input>

                    <button className= "bg-main-100 text-white text-[20px] py-3 rounded-md font-semibold w-full"
                    onClick={handleSave}>
                        SAVE
                    </button>
                </div>
                <div className={`${tranDiv3} flex-col space-y-4 `}>
                    <CodeCatalog/>
                </div>  
                <div className={`${tranDiv4} flex-col space-y-4 `}>
                    <HistoryAccountCatalog  />
                </div>  
        </div>

        </div>
        
        
    )
}
