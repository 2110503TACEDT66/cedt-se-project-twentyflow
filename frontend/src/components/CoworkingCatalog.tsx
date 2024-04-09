import CoworkingCard from "./CoworkingCard"
import CircularProgress from '@mui/material/CircularProgress';

export default function CoworkingCatalog({coworking, isLoading}: {coworking: Coworking[] , isLoading: boolean}) {
    return (
        <div>
        {
            isLoading ? 
            (
                <div className=" flex justify-center items-center py-20">
                    <CircularProgress  color="secondary" />
                </div>
            )
            :
            (
                coworking.length !== 0 ?
                (
                    <div className=" flex flex-col space-y-5 p-5">
                        {
                            coworking.map((coworkingItem:Coworking) => (
                                <CoworkingCard key={coworkingItem.name} coworking={coworkingItem} />
                            ))
                        }
                    </div>
                )
                :
                (
                    <div className=" flex justify-center items-center h-full py-40">
                        <h1 className=" text-3xl font-bold">
                            No Coworking Found
                        </h1>
                    </div>
                )
            )
        }
        </div>
    )
}