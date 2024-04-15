export default async function getReservation(token:string,appId:string ){
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments/${appId}`
    const response = await fetch(url,{
        method: 'Get',
        headers: {
            'Content-Type': 'application/json',
            "authorization":`Bearer ${token}`
        }
    });
    if(!response.ok) {
        throw new Error("Failed to add appt")
    }
    const body = await response.json()
    return body
}