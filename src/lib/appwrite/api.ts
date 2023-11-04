import { ID } from "appwrite";
import { account } from "./config";
import { INewUser } from "@/types";

export async function createUserAccount(user:INewUser){
    try{
        const newaccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )
        return newaccount;
    }
    catch(error){
        console.log(error);
    }
}