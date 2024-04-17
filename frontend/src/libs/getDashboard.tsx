export async function getDashboard() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/dashboard`)
    if(!response.ok) {
        throw new Error("Failed to fetch dashboard")
    }
    return await response.json()
}