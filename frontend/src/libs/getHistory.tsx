export default async function getHistory(token: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/history`, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`,
        }
    });
    if (!res.ok) {
        throw new Error('Failed to fetch history');
    }
    return res.json();
}