export default async function getRoom({token, id} : {token:string, id:string}){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/room/${id}`,{
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },

    })
    if(!response.ok) {
        throw new Error("Failed to fetch room")
    }
    return await response.json()

}