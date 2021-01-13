export const SIGN_IN = "SIGN_IN";
export const LogInaction = (userState) => {
    return {
        type: "SIGN_IN",
        payload: {
            isSignedIn: true,
            role: userState.role,
            id: userState.id,
            name: userState.name,
            email: userState.email
        }
    }
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
    return {
        type: "SIGN_OUT",
        payload: {
            isSignedIn: false,
            uid: "",
            name: "",
        }
    }
};