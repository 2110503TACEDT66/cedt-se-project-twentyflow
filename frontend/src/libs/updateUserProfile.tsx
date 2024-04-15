export default async function updateUserProfile(name:string,token:string,userId:string ,telephone:string){
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/${userId}`
    const response = await fetch(url,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "authorization":`Bearer ${token}`
        },
        body: JSON.stringify({ 
            name:name ,
            telephone_number:telephone
        }),
    });
    const body = await response.json()
    return body
}