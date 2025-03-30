import * as firebaseProbider from "../../../app/firebase/authProvider";

export const authService = {
    loginWithEmailPassword: ({ email, password }) => firebaseProbider.loginWithEmailPassword({ email, password }),
    logout: () => firebaseProbider.logout(),
};