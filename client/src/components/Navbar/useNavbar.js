import { useAxios } from "@/hooks/axioshook";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

export default (props) => {

    const {
        loginWithRedirect,
        user,
        isAuthenticated,
        getIdTokenClaims,
        logout,
    } = useAuth0();

    const UserCreation = useAxios();
    const handleSignup = () => {
        loginWithRedirect({
            authorizationParams: { screen_hint: "signup" },
        });
    };
    const handleLogin = async () => {
        await loginWithRedirect();
    };
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userDataSaved");
        logout();
    };

    const saveUserData = async () => {
        if (isAuthenticated && !localStorage.getItem("userDataSaved")) {
            try {
                const idTokenClaims = await getIdTokenClaims();
                const token = idTokenClaims.__raw;
                localStorage.setItem("authToken", token);
                const username = idTokenClaims.name;
                const email = idTokenClaims.email;
                const role = idTokenClaims.role;
                const _id = user.sub;
                const signupOrLogin = idTokenClaims["signup_or_login"];

                if (signupOrLogin && signupOrLogin === "signup") {
                    const userdata = {
                        _id,
                        username,
                        email,
                        role,
                    };

                    const newAxiosParams = {
                        method: "POST",
                        url: "/users",
                        data: userdata,
                    };

                    /*forcage setState setAxiosParams((prev) => ({
                        ...prev ,
                        url:url
                        })); */
                    await UserCreation.customFetchData(
                        newAxiosParams
                    ).then((data) => console.log(data));
                }
            } catch (error) {
                console.error("Error saving user data:", error);
            }
        }
    };

    useEffect(() => {
        saveUserData();
    }, [isAuthenticated]);

    useEffect(() => {
        const idTokenClaims = getIdTokenClaims();
        const signupOrLogin = idTokenClaims["signup_or_login"];
        if (signupOrLogin && signupOrLogin === "signup") {
            if (UserCreation.fetchHandler.response) {
                console.log(
                    "User creation response:",
                    UserCreation.fetchHandler.response
                );
                localStorage.setItem("userDataSaved", "true");
            }
            if (UserCreation.fetchHandler.error) {
                console.error(
                    "Error creating user:",
                    UserCreation.fetchHandler.error
                );
            }
        }
    }, [UserCreation]);
    return {
        handleSignup,
        handleLogin,
        handleLogout,
    };
};
