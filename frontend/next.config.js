/** @type {import('next').NextConfig} */
const nextConfig = {
    'experimental': {
        serverActions: true,
    },
    env: {
        NEXT_PUBLIC_BACKEND_URL : process.env.NEXT_PUBLIC_BACKEND_URL,
        NEXT_PUBLIC_FRONTEND_URL : process.env.NEXT_PUBLIC_FRONTEND_URL,
        NEXTAUTH_SECRET : process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL : process.env.NEXTAUTH_URL,
        NEXTAUTH_URL_INTERNAL : process.env.NEXTAUTH_URL_INTERNAL,

    },
    'output': 'standalone',
}

module.exports = nextConfig
