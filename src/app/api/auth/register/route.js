import {prisma} from '@/app/lib/prisma'
// import { NextApiRequest, NextApiResponse } from 'next';
import { hash} from "bcrypt"
import { NextResponse } from 'next/server';

export async function POST(request){

    const {email, password, name} = await request.json();

    const exists = await prisma.user.findUnique({
        where:{
            email,
        }
    });

    if(exists){
        return NextResponse.json({error:"Email already registred"},{status:"400"});
    }

    const user = await prisma.user.create({
        data:{
            email,
            name,
            password:await hash(password, 10),
        }
    })
    
    return NextResponse.json(user);

}