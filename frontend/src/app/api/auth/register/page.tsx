import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation'
import { authOptions } from '../[...nextauth]/route';
const Page = async () => {
    const session = await getServerSession(authOptions)
    if(!session){
        const onSubmit = async (registerData : FormData) => {
        "use server"
        const email =  registerData.get('email');
        const pass = registerData.get('password');
        const name = registerData.get('name');
        const telephone = registerData.get('telephone');
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            email : email,
            password : pass,
            name : name,
            telephone_number : telephone,
            role : "user"
        }),
        });
        if(response.ok){
            redirect('/api/auth/signin')
        }else
        {
            redirect('/')
        }
    };

  return (
    <main className="flex w-screen flex-col  items-center bg-main-100 min-h-[90vh] p-7">
      <h1 className=" text-5xl py-10 font-semibold text-white">
        REGISTER
      </h1>
      <form action={onSubmit}  className="px-7 py-4 shadow space-y-7 bg-white rounded-md flex flex-col w-2/5">

        <div className=" flex flex-row w-full ">
            <div className=" flex flex-col space-y-3 w-full">
                <h1 className=" font-bold text-xl">
                    Email
                </h1>
                <input required id="email" name="email"
                placeholder="johndoe@gmail.com" className=" text-xl text-blck font-semibold placeholder:text-xl border-2 focus:outline-none py-2 px-5 border-gray-300 h-full rounded-md" type="email" />
            </div>
        </div>
        <div className=" flex flex-row w-full ">
            <div className=" flex flex-col space-y-3 w-full">
                <h1 className=" font-bold text-xl">
                    Password
                </h1>
                <input  required id="password" name="password" 
                placeholder="Password" className=" text-xl text-blck font-semibold placeholder:text-xl border-2 focus:outline-none py-2 px-5 border-gray-300 h-full rounded-md" type="password" />
            </div>
        </div>
        <div className=" flex flex-row w-full space-x-5">
            <div className=" flex flex-col space-y-3 w-1/2">
                <h1 className=" font-bold text-xl">
                    Name
                </h1>
                <input required id="name" name="name" 
                placeholder="John Doe" className=" text-xl text-blck font-semibold placeholder:text-xl border-2 focus:outline-none py-2 px-5 border-gray-300 h-full rounded-md" type="text" />
            </div>
            <div className=" flex flex-col space-y-3 w-1/2">
                <h1 className=" font-bold text-xl">
                    Telephone
                </h1>
                <input required id="telephone" name="telephone"
                placeholder="0800000000" className=" text-xl text-blck font-semibold placeholder:text-xl border-2 focus:outline-none py-2 px-5 border-gray-300 h-full rounded-md" type="text" />
            </div>
        </div>
        <button type="submit" className=" bg-main-100 text-white  text-center py-3 rounded-md font-semibold" >
            REGISTER
        </button>
      </form>
    </main>
  );
}else{
    redirect('/')
}
};

export default Page;