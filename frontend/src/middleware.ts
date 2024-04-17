export { default } from 'next-auth/middleware'

export const config = {
    matcher: ['/coworkings','/coworkings/:path*','/history', '/coupon','/account','/dashboard' , '/payment','/payment/:path*'],
};