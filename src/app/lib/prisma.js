import { PrismaClient } from "@prisma/client";

let lprisma ;

if (process.env.NODE_ENV === 'production'){
    lprisma = new PrismaClient();
}
else{
    if(!global.prisma){
        global.prisma = new PrismaClient();
    }

    lprisma = global.prisma;
}

export const prisma = lprisma;
