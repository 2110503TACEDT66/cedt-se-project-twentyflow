import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user : {
            telephone_number: string;
            _id: string,
            name: string,
            email: string,
            role: string,
            token: string,
        }
    }
}