"use client"
import * as React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



 
const RankItem: React.FC<RankItemProps> = ({ rank, name, price }) => (
  <div className="flex items-center justify-between px-4 py-3 bg-white rounded-3xl w-[90%] m-3">
    <div className="flex items-center space-x-10">
      <div className="ml-5">{rank}</div>
      <div>{name}</div>
    </div>
    <div>{price}</div>
  </div>
);

function LeaderBoard() {
  const router = useRouter();
    const session = useSession()
    const currentUser = session.data?.user
    const [menuChanger, setMenuChanger] = useState<number>(1)
    const tranclass1 = (menuChanger === 1) ? "border-b-2" : ""
    const tranclass2 = (menuChanger === 2) ? "border-b-2" : ""
    const tranclass3 = (menuChanger === 3) ? "border-b-2" : ""
    const tranclass4 = (menuChanger === 4) ? "border-b-2" : ""
    const tranclass5 = (menuChanger === 5) ? "border-b-2" : ""
    const tranDiv1 = (menuChanger === 1) ? "flex" : "hidden"
    const tranDiv2 = (menuChanger === 2) ? "flex" : "hidden"
    const tranDiv3 = (menuChanger === 3) ? "flex" : "hidden"
    const tranDiv4 = (menuChanger === 4) ? "flex" : "hidden"  
    const tranDiv5 = (menuChanger === 5) ? "flex" : "hidden" 
    
  const rankData: RankItemProps[] = [
    { rank: 1, name: "Item 1", price: "$10" },
    { rank: 2, name: "Item 2", price: "$20" },
    { rank: 3, name: "Item 3", price: "$30" },
    { rank: 4, name: "Item 4", price: "$40" },
    { rank: 5, name: "Item 5", price: "$50" },
  ];

  return (
    <div className="flex w-screen flex-col  items-center bg-main-100 min-h-[90vh] p-7">
      <h1 className=" text-5xl py-10 font-semibold text-white">LEADER BOARD</h1>
    <div className="flex flex-col px-12 pt-6 pb-10 mt-20 max-w-full bg-white rounded-3xl w-[80%] max-md:px-5 max-md:mt-10">
      <header className="flex gap-5 justify-between self-center max-w-full w-[307px]">
        <div className="flex flex-col items-center">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad9cc240aaf125f4a36b2e0be073e722012c31e7a46c30586bf52f7198364202?apiKey=1a3387e3f7804194b69cc4aab4fb102b&"
            alt="Logo"
            className="aspect-square w-[45px]"
          />
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b889748cdac5edfe95090f7cf79a7558fe4672492ec6f42051547f6fea7778af?apiKey=1a3387e3f7804194b69cc4aab4fb102b&"
            alt="Decorative border"
            className="mt-3 border-4 border-solid aspect-[50] border-slate-500 stroke-[4px] stroke-slate-500 w-[181px]"
          />
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f4723cc08a9cdffebb94b6651dbeb96ac09c3ed28cb0161b480f1ae0e455461?apiKey=1a3387e3f7804194b69cc4aab4fb102b&"
          alt="Settings icon"
          className="shrink-0 self-start aspect-square fill-white w-[45px]"
        />
      </header>
      <main className="flex flex-col items-center pt-6 pb-20 mt-3.5 text-2xl font-bold text-center whitespace-nowrap rounded-3xl bg-zinc-300 text-stone-500 max-md:max-w-full">
        <div className="flex gap-5 justify-between max-w-full w-full max-md:flex-wrap">
          <div className="flex gap-5 justify-between">
            <div className="ml-16">Rank</div>
            <div>Name</div>
          </div>
          <div className="mr-16">Price</div>
        </div>
        <hr className="self-stretch mt-5 w-full border border-solid border-zinc-300 stroke-[1px] stroke-zinc-300 max-md:max-w-full" />
        {rankData.map((item, index) => (
          <RankItem key={index} {...item} />
        ))}
      </main>
    </div>
  </div>
  );
};

export default LeaderBoard;