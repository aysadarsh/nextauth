import {prisma} from '../../lib/prisma'
// import { NextApiRequest, NextApiResponse } from 'next';
import { hash} from "bcrypt"
import { NextResponse } from 'next/server';

export const login = async(email, password)=>{

    try{
        const user = await prisma.User.findUnique({
            where:{email:email}
        })

        if(!user)
        {
            throw "email";
        }
        // check password

        return user;
    }
    catch(e){

        console.log(e)

        throw e;
        // console.log(e);
        // throw e;
    }
    // finally(
    //     prisma.$disconnect();
    // )
    

}