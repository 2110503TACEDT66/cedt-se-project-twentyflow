export default async function createReward (token:string, rewardName:string, rewardPoint : number){
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/reward`
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "authorization":`Bearer ${token}`
        },
        body: JSON.stringify({ 
            rewardName: rewardName, 
            rewardPoint: rewardPoint
        }),
    });
    if(!response.ok) {
        throw new Error("Failed to add reward")
    }
    const body = await response.json()
    return body
}