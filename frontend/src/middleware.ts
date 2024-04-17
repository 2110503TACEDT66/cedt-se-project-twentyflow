export { default } from 'next-auth/middleware'

export const config = {
    matcher: ['/coworkings','/coworkings/:path*','/booking', '/coupon','/account','/dashboard' , '/payment','/payment/:path*'],
};