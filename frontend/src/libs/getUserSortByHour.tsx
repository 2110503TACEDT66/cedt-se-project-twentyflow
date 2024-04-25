export default async function getUserSortByHour(){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/hour`,{
        method: "GET"
    })
    if(!response.ok) {
        throw new Error("Failed to fetch user sort by price")
    }
    return response.json()
}