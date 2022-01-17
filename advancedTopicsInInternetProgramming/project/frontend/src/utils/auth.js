const TOKEN = "token";

export const auth = {
    setAuthToken: authToken => {
        if(authToken)
            localStorage.setItem(TOKEN, authToken);
    },
    removeAuthToken: authToken => {
        if(authToken)
            localStorage.removeItem(TOKEN)
    },
    getAuthToken: () => localStorage.getItem(TOKEN),
    isAuthenticated: () => localStorage.getItem(TOKEN) !== null
};
