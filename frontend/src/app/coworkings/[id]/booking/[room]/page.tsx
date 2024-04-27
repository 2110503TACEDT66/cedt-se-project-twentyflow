import ReservationCard from "@/components/ReservationCard";
import getCoworking from "@/libs/getCoworking";
import getRoom from "@/libs/getRoom";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";



export default async function Page({ params }: { params: { id: string , room : string} }) {
  const session = await getServerSession(authOptions);
  const coworkingDetail = await getCoworking(params.id);

  if(!session) {
    return null;
  }
  const room = await getRoom({token: session?.user?.token, id: params.room});
  return (
    <main className=" min-h-[120vh]  flex justify-center items-center bg-main-100">
      <ReservationCard room={room.data} coworking={coworkingDetail.data} />
    </main>
  );
}
