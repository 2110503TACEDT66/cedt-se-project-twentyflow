import LeaderBoard from "@/components/LeaderBoard";

export default function Page() {
    return (
        <main className=" p-7 min-h-[90vh] bg-main-100">
            <h1 className="mt-20 text-5xl font-bold text-center text-white max-md:mt-10 max-md:text-4xl">
                LEADER BOARD
            </h1>
            <LeaderBoard/>
        </main>
    );
}