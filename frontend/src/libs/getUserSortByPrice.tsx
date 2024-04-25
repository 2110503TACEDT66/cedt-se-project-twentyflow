export default async function getUserSortByPrice(){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user-sort-by-price`,{
        method: "GET"
    })
    if(!response.ok) {
        throw new Error("Failed to fetch user sort by price")
    }
    return response.json()
}