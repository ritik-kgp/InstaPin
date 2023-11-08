import { ID } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";
import { INewUser } from "@/types";

export async function createUserAccount(user:INewUser){
    try{
        const newaccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )
        if(!newaccount) throw Error;
        const avatarUrl = avatars.getInitials(user.name);
        const newUser = await saveUserToDB({
            accountId : newaccount.$id,
            name : newaccount.name,
            email : newaccount.email,
            userName : user.username,
            imageUrl : avatarUrl,
        })
        return newUser;
    }
    catch(error){
        console.log(error);
    }
}

export async function saveUserToDB(user : {
    accountId : string;
    email : string;
    name : string;
    userName ?: string;
    imageUrl : URL;
}){
    try{
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        )
        return newUser;
    }catch(error){
        console.log(error);
    }
}