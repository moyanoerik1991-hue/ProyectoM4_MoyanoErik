import {
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";

import { db } from "./firebase.ts";

export const createUserProfile = async (
    uid: string,
    userName: string,
    email: string
) => {
    const userRef = doc(db, "users", uid);

    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
        return;
    }

    await setDoc(userRef, {
        userName,
        email,
        createdAt: new Date(),
    });
};