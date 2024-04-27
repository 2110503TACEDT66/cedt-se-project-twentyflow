export default async function getApptByRoom(token : string , roomID: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/coworkings/${roomID}/appointments`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
    const data = await res.json()
    return data
}