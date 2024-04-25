"use client"
import * as React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RankItem from "./RankItem";
import getUserSortByPrice from "@/libs/getUserSortByPrice";

function LeaderBoard() {
  const [ sortByPrice, setSortByPrice ] = useState<UserSortByPrice[]>([]);

  useEffect(() => {
    getUserSortByPrice()
      .then((response) => {
        const convertedData = response.data.map((item: any) => ({
          ...item,
          points: item.points.toString(), // Convert points to string
      }));
      
      // Update the sortByPrice state with the converted data
      setSortByPrice(convertedData);
      })
      .catch((error) => {
        console.error(error);
      });
      // console.log(sortByPrice)
  })
  

  const rankDataHour: RankItemHourProps[] = [
    {rank: 1, name: "Item 1", hour: "10"},
    {rank: 2, name: "Item 2", hour: "20"},
    {rank: 3, name: "Item 3", hour: "30"},
    {rank: 4, name: "Item 4", hour: "40"},
    {rank: 5, name: "Item 5", hour: "50"},
  ];

  const [menuChanger, setMenuChanger] = useState<number>(1)
  const tranclass1 = (menuChanger === 1) ? "border-b-4" : ""
  const tranclass2 = (menuChanger === 2) ? "border-b-4" : ""

  const tranDiv1 = (menuChanger === 1) ? "flex" : "hidden"
  const tranDiv2 = (menuChanger === 2) ? "flex" : "hidden"
  let index = 1;

  return (
    <div className="flex flex-col  items-center bg-main-100 min-h-[90vh]">
      <h1 className=" text-5xl py-10 font-semibold text-white">LEADER BOARD</h1>
    <div className="flex flex-col px-12 pb-4 max-w-full bg-white rounded-3xl w-[80%] max-md:px-5 max-md:mt-10">
      <header className="flex gap-5 justify-between self-center max-w-full w-[400px]">
        <div className={`${tranclass1} border-main-100 border-solid w-1/2 flex justify-center p-3`} onClick={() => {setMenuChanger(1)}}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad9cc240aaf125f4a36b2e0be073e722012c31e7a46c30586bf52f7198364202?apiKey=1a3387e3f7804194b69cc4aab4fb102b&"
            alt="Logo"
            className="aspect-square w-[45px]"
          />
        </div>
        <div className={`${tranclass2} border-main-100 border-solid w-1/2 flex justify-center p-3`} onClick={() => {setMenuChanger(2)}}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f4723cc08a9cdffebb94b6651dbeb96ac09c3ed28cb0161b480f1ae0e455461?apiKey=1a3387e3f7804194b69cc4aab4fb102b&"
          alt="Settings icon"
          className="shrink-0 self-start aspect-square fill-white w-[45px]"
        />
        </div>
      </header>

      <main className={`${tranDiv1} flex flex-col items-center pt-6 pb-4 mt-3.5 text-2xl font-bold text-center whitespace-nowrap rounded-3xl bg-zinc-300 text-stone-500 max-md:max-w-full`}>
        <div className="flex gap-5 justify-between max-w-full w-full max-md:flex-wrap">
          <div className="flex gap-5 justify-between">
            <div className="ml-16">Rank</div>
            <div>Name</div>
          </div>
          <div className="mr-16">Price</div>
        </div>
        <hr className="self-stretch w-full border border-solid border-zinc-300 stroke-[1px] stroke-zinc-300 max-md:max-w-full" />
        {sortByPrice.map((item) => {
          const element = (<RankItem 
            key={item._id} 
            rank={index++} 
            name={item.name} 
            price={item.points} />)

          return element;
        })}
      </main>

      <main className={`${tranDiv2} flex flex-col items-center pt-6 mt-3.5 text-2xl font-bold text-center whitespace-nowrap rounded-3xl bg-zinc-300 text-stone-500 max-md:max-w-full`}>
        <div className="flex gap-5 justify-between max-w-full w-full max-md:flex-wrap">
          <div className="flex gap-5 justify-between">
            <div className="ml-16">Rank</div>
            <div>Name</div>
          </div>
          <div className="mr-16">Hour</div>
        </div>
        <hr className="self-stretch w-full border border-solid border-zinc-300 stroke-[1px] stroke-zinc-300 max-md:max-w-full" />
        {rankDataHour.map((item, index) => (
          <RankItem key={index} rank={item.rank} name={item.name} hour={item.hour} />
        ))}
      </main>
    </div>
  </div>
  );
};

export default LeaderBoard;