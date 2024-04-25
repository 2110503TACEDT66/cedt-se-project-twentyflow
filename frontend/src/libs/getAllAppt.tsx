export default async function getAllAppt(token : string , coworkingID: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/appointments/all`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json()
    return data
}