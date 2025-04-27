import { signInWithEmailAndPassword, onAuthStateChanged, getAuth } from 'firebase/auth';
import { FirebaseAuth } from './firebase';


export const loginWithEmailPassword = async({ email, password }) => {
    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, 
            photoURL, 
            displayName,
            email
        }
    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const logout = async () => {
    try {
        await FirebaseAuth.signOut();

        return {
            ok: true,
        }
    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

export const onCheckAuth = async () => {
    try {
        const user = await onCheckAuthAdapter();
        if (!user) throw new Error("User not logged");

        const { uid, email, displayName, photoURL } = user;
        
        return {
            ok: true,
            uid, 
            email, 
            displayName, 
            photoURL
        }
    } catch (error) {
        return { ok: false, errorMessage: error.message }
    }
}

const onCheckAuthAdapter = () => {
    return new Promise((resolve) => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            resolve(user || null);
        });
    });
};