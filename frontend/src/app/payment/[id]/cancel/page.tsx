import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Cancel() {
  return (
    <main>
      <main className=" flex justify-center items-center">
            <div className=" mt-20 w-1/2 bg-white flex space-y-10 flex-col items-center p-10">
                <FontAwesomeIcon icon={faCircleXmark} size="xl" className=" w-40 h-40 text-red-600" />
                <h1 className=" text-5xl font-semibold">
                    Failed!
                </h1>
                <h1 className=" text-2xl font-semibold">
                    Your payment has been failed.
                </h1>
                <button>
                    <Link href="/" className=" text-white text-xl bg-main-100 p-3 font-semibold rounded-full">
                        Go back to home
                    </Link>
                </button>
            </div>
        </main>
    </main>
  );
}
