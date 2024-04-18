export default async function getCustomerCard(id:string, token:string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/user/${id}`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`,
        }
    });

    if(!response.ok) {
        throw new Error("Failed to fetch Customer's card")
    }
    return await response.json()
}