import PaymentCard from "@/components/PaymentCard";
import getCoworking from "@/libs/getCoworking";


export default async function Page({params} : {params : {id : string}}){

    const coworkingDetail = await getCoworking(params.id)
    return(
        <PaymentCard coworking={coworkingDetail.data}/>
        
    )
}