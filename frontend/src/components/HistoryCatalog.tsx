import HistoryCard from './HistoryCard';
import CircularProgress from '@mui/material/CircularProgress';

export default function HistoryCatalog({reservation, isLoading}: {reservation: ReservationJson[] , isLoading: boolean}) {
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
                            reservation.map((reservationItem:ReservationJson) => (
                                <HistoryCard key={reservationItem._id} reservation={reservationItem} />
                            ))
                        }
                    </div>
                )
                :
                (
                    <div className=" flex justify-center items-center h-full py-20">
                        <h1 className=" text-3xl font-bold">
                            No Booking Found
                        </h1>
                    </div>
                )
            )
        }
        </>
    )
}