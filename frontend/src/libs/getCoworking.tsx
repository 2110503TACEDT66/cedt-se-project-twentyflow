export default async function getCoworking(id:string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/coworkings/${id}`)
    if(!response.ok) {
        throw new Error("Failed to fetch coworking")
    }
    return await response.json()
}