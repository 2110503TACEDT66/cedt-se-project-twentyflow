import Code from "./Code"

export default function CodeCatalog(){
    const userCoupons = ["asdfjkl;lkjfdsa", "qwertyuiop", "zxcvbnm"]; // replace this with actual user coupons

    return(
        <div className=" flex flex-col space-y-5 p-[50px]">
            {userCoupons.map((couponCode, index) => (
                <Code key={index} couponName={`Coupon Discount 50 THB ${index + 1}`} couponCode={couponCode}/>       
            ))}
        </div>
    )
}