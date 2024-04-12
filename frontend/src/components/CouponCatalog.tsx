"use client";
import CouponCard from "./CouponCard"

export default function CouponCatalog() {

    return (
        <div>
        <h1 className=" font-bold text-2xl text-white px-[60px]">
            Redeem
        </h1>
        <div style={{margin:"20px" ,display:"flex", flexDirection:"row",
            alignContent : "space-around",justifyContent : "space-around" ,flexWrap: "wrap"}}>
               <CouponCard couponName="Coupon Discount 10 THB" couponPoint={1000} />
               <CouponCard couponName="Coupon Discount 20 THB" couponPoint={2000} />
               <CouponCard couponName="Coupon Discount 50 THB" couponPoint={5000} />
               <CouponCard couponName="Coupon Discount 100 THB" couponPoint={10000} />
            </div>
        </div>
    )
}