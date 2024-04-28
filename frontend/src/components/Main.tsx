import Image from "next/image";
import Link from "next/link";

export default function Main() {
    return (
        <div className="w-full flex flex-col md:flex-row h-[90vh]">
            <div className="w-full p-10 h-full flex flex-col space-y-6 md:h-full md:flex-col md:space-y-6 md:justify-center md:w-1/2">
                <div>
                    <h1 className="text-5xl text-main-100 font-extrabold text-center">
                        COWORKING SPACE
                    </h1>
                </div>
                <div className="md:h-full md:hidden block h-3/4">
                <Image
                    src="/img/bg1.svg"
                    alt="bg"
                    width={0}
                    height={0}
                    className="object-cover w-full h-full"
                />
                </div>
                <div>
                    <h1 className="font-semibold text-zinc-600 font-kanit text-center md:text-left">
                        ปลดล็อกศักยภาพของคุณ Coworking Space ที่ออกแบบมาเพื่อการทำงานอย่างมีประสิทธิภาพ
                    </h1>
                </div>
                <Link href="/coworkings" className="bg-main-100 text-white text-center py-3 rounded-md font-semibold">
                    RESERVE
                </Link>
            </div>
            <div className="w-full md:w-4/6 md:h-full md:block hidden">
                <Image
                    src="/img/bg1.svg"
                    alt="bg"
                    width={0}
                    height={0}
                    unoptimized
                    className="object-fill w-full h-full"
                />
            </div>
        </div>
    );
}
