export default async function getCoupons(token:string){
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/coupon`,{
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
    if(!response.ok) {
        throw new Error("Failed to fetch coupons")
    }
    return response.json()
}