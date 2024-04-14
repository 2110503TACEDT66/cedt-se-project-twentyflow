export default async function createCoupon (token:string, couponName:string){
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/coupon`
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "authorization":`Bearer ${token}`
        },
        body: JSON.stringify({ 
            couponName: couponName
        }),
    });
    if(!response.ok) {
        throw new Error("Failed to add coupon")
    }
    const body = await response.json()
    return body
}