import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTicket, faHouseCircleCheck, faGifts } from "@fortawesome/free-solid-svg-icons"


export default function HistoryPointSubCard({point, name} : {point: number, name: string}) {
    return (
        <div className="flex flex-row w-full justify-between">
            <div className="flex flex-row space-x-4">
                <div className=" bg-main-100 w-16 h-16  rounded-md flex justify-center items-center">
                    {
                        point > 0 ? <FontAwesomeIcon icon={faHouseCircleCheck} size="2xl" className="text-white"/> : <FontAwesomeIcon icon={faTicket} size="2xl" className="text-white"/>
                    
                    }
                </div>
                <div className=" flex justify-center items-center">
                    <h1 className="font-bold text-lg text-gray-600">{name}</h1>
                </div>
            </div>
            <div className=" flex flex-row space-x-4">
                <h1 className=" text-2xl text-main-100 font-bold">
                    {point > 0 ? "+" : "-"}
                </h1>
                <h1 className=" text-2xl text-main-100 font-bold ">
                    
                      {Math.abs(point)}
                </h1>
                <FontAwesomeIcon icon={faGifts} size="lg" className="text-main-100"/>
            </div>
        </div>
    )
}