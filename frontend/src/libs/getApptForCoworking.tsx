export default async function getApptForCoworking(token : string , coworkingID: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/coworkings/${coworkingID}/appointments`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json()
    return data
}