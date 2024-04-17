export default function CreditCard() {
    return(
        <div className=" w-full flex flex-col space-y-4">
            <div>
                <h1 className=" font-bold text-xl">
                    Card Number
                </h1>
                <input type="number" placeholder="0000 0000 0000 0000" className=" w-full font-semibold text-xl border-2 p-3 rounded-md border-gray-300" ></input>
            </div>

            <div className=" flex flex-row w-full space-x-4">
                <div className=" w-1/2">
                    <h1 className=" font-bold text-xl">
                        Expiry Date
                    </h1>
                    <input type="number" placeholder="MM/YY" className=" w-full font-semibold text-xl border-2 p-3 rounded-md border-gray-300" ></input>
                </div>
                <div className=" w-1/2">
                    <h1 className=" font-bold text-xl">
                        CVC
                    </h1>
                    <input placeholder="•••" type="number" className=" w-full font-semibold text-xl border-2 p-3 rounded-md border-gray-300" ></input>
                </div>
            </div>
            <button className= "bg-main-100 text-white text-[20px] py-3 rounded-md font-semibold w-full">
                SAVE
            </button>
        </div>
    )
}