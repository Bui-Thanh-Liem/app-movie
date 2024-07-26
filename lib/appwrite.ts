import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
} from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.btl.btl",
    projectId: "66a0b492000a6b1d7357",
    databaseID: "66a0b65a00109cae0971",
    userCollectionId: "66a0b67f001a1154d95b",
    videoCollectionId: "66a0b6c8001339c93a4f",
    storageId: "66a0b9270005c3966420",
};

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export const createUser = async (
    email: string,
    username: string,
    password: string
) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        //
        if (!newAccount) throw new Error();

        //
        const avatarURL = avatars.getInitials(username);

        //
        await signIn(email, password);

        //
        const newUser = await databases.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.userCollectionId,
            ID.unique(),
            { accountId: newAccount.$id, email, username, avatar: avatarURL }
        );

        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error("Error at lib appwrite", error as ErrorOptions);
    }
};

// Login User
export const signIn = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(
            email,
            password
        );
        return session;
    } catch (error) {
        throw new Error("Error at lib appwrite", error as ErrorOptions);
    }
};

// Get Current User
export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw new Error();

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser) throw new Error();

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
};

// Get All Posts
export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.videoCollectionId
        );
        return posts.documents;
    } catch (error) {
        throw new Error("Error", error as ErrorOptions);
    }
};

// Get Posts latest
export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.videoCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(7)]
        );
        return posts.documents;
    } catch (error) {
        throw new Error("Error", error as ErrorOptions);
    }
};
