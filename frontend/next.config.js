/** @type {import('next').NextConfig} */
const nextConfig = {
    'experimental': {
        serverActions: true,
    },
    env: {
        NEXT_PUBLIC_BACKEND_URL : process.env.NEXT_PUBLIC_BACKEND_URL,
        NEXT_PUBLIC_FRONTEND_URL : process.env.NEXT_PUBLIC_FRONTEND_URL,
    }
}

module.exports = nextConfig
