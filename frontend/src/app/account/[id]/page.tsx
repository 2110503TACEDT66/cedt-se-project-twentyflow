import HistoryDetails from "@/components/HistoryDetails";


export default async function Page({ params }: { params: { id: string } }) {
    return (
       <HistoryDetails historyId={params.id} />
    );
  }