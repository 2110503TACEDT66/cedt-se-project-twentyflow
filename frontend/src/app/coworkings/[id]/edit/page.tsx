import CoWorkingEdit from "@/components/CoworkingEdit";
import getCoworking from "@/libs/getCoworking"; 

export default async function EditPage({params} : {params : {id : string}}){

    const coworkingDetail = await getCoworking(params.id)
    return(
        <main className=" min-h-[90vh]  flex justify-center items-center bg-main-100">
            <CoWorkingEdit coworking={coworkingDetail.data}/>
        </main>
    )
}