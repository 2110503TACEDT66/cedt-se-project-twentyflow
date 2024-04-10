export default async function getCoworkings() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/coworkings`)
    if (!response.ok){
        throw new Error("Failed to fetch coworkings")
    }
    return await response.json()
}