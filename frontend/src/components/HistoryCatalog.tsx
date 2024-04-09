import HistoryCard from './HistoryCard';
import CircularProgress from '@mui/material/CircularProgress';

export default function HistoryCatalog({reservation, isLoading}: {reservation: Reservation[] , isLoading: boolean}) {
    return (
        <>
        {
            isLoading ? 
            (
                <div className=" flex justify-center items-center py-20">
                    <CircularProgress  color="secondary" />
                </div>
            )
            :
            (
                reservation.length !== 0 ?
                (
                    <div className=" flex flex-col space-y-5 p-5">
                        {
                            reservation.map((reservationItem:Reservation) => (
                                <HistoryCard key={reservationItem._id} reservation={reservationItem} />
                            ))
                        }
                    </div>
                )
                :
                (
                    <div className=" flex justify-center items-center h-full py-20">
                        <h1 className=" text-3xl font-bold">
                            No History Found
                        </h1>
                    </div>
                )
            )
        }
        </>
    )
}