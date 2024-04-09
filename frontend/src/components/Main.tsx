import Image from "next/image"
import Link from "next/link"

export default function Main() {
    return(
        <div className=" w-full flex flex-row h-[90vh]">
            <div className=" w-2/6 p-10 h-full flex flex-col space-y-5 justify-center">
                <div>
                    <h1 className=" text-5xl text-main-100 font-extrabold">
                        COWORKING SPACE
                    </h1>
                </div>
                <div>
                    <h1 className=" font-semibold text-zinc-600 font-kanit">
                        ปลดล็อกศักยภาพของคุณ Coworking Space ที่ออกแบบมาเพื่อการทำงานอย่างมีประสิทธิภาพ
                    </h1>
                </div>
                <Link href={"/coworkings"} className=" bg-main-100 text-white  text-center py-3 rounded-md font-semibold">
                    RESERVE
                </Link>

            </div>
            <div className=" w-4/6 h-full">
                <Image 
                src={"/img/bg1.svg"}
                alt="bg"
                width={0}
                height={0}
                unoptimized
                className=" object-fill w-full h-full"
                />
            </div>
        </div>
    )
}