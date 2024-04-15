import Image from 'next/image'
import getUserProfile from '@/libs/getUserProfile'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';


export default async function MyPointsCard() {  
    const session = await getServerSession(authOptions);
    const token = session?.user.token as string     
    const user = await getUserProfile(token)  
    return (
        <div className='w-1/3'>
        <h1 className=" font-bold text-2xl text-white px-[60px]">My Points</h1>
        <div className='w-full h-[300px] rounded-lg shadow-lg bg-white p-10 my-[20px] mx-[60px]'>
            <div className='w-full h-[50%] rounded-t-lg relative '>
                <Image src={ '/img/giftIcon.png'}
                alt='giftIcon Picture'
                fill={true}
                className='object-contain rounded-t-lg'/>
            </div>
            <div className='w-full  p-[10px] text-main-100 text-5xl font-extrabold text-center'>{user.data.points}</div>
            <div className='w-full  p-[10px] text-center font-bold'>your balance</div>
        </div>
        </div>
    )
}