import ReservationCard from "@/components/ReservationCard";
import getCoworking from "@/libs/getCoworking";
import CoworkingDetail from "@/components/CoworkingDetail";
import CoworkingAvailable from "@/components/CoworkingAvailable";

export default async function Page({ params }: { params: { id: string } }) {
  const coworkingDetail = await getCoworking(params.id);
  return (
    <main className=" p-10 min-h-[90vh] bg-main-100 flex flex-col space-y-10">
      <CoworkingDetail params={params}/>
      <CoworkingAvailable />
    </main>
  );
}
