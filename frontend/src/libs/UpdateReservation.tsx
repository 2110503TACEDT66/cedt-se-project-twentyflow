export default async function UpdateReservation(apptDate:string,token:string,appId:string ){
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments/${appId}`
    const response = await fetch(url,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "authorization":`Bearer ${token}`
        },
        body: JSON.stringify({ 
            apptDate:apptDate ,
        }),
    });
    const body = await response.json()
    return body
}