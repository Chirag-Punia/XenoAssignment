import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { EyeFilledIcon } from "./utilities/EyeFilledIcon.jsx";
import { EyeSlashFilledIcon } from "./utilities/EyeSlashFilledIcon.jsx";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import Header from "./Header.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignInPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const toggleVisibility = () => setIsVisible(!isVisible);
    const reactNavigator = useNavigate();

    const handleLogin = async () => {
        setIsLoading(true);
        setError("");
        try {
            const response = await axios.post("https://xenoassignment.onrender.com/auth/login", { email, password });
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                toast.success("Login Successful!");

                setTimeout(() => {
                    reactNavigator("/home");
                }, 1000); 

            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An error occurred while logging in.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const response = await axios.post("https://xenoassignment.onrender.com/auth/google-login", {
                    token: tokenResponse.access_token,
                });

                if (response.data.token) {
                    localStorage.setItem("token", response.data.token);
                    toast.success("Google Login Successful!");
                    reactNavigator("/home");
                } else {
                    toast.error("Google Login Failed");
                }
            } catch (error) {
                toast.error("An error occurred during Google Login.");
            }
        },
        onError: () => toast.error("Google Login Failed"),
    });

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <>
            <Header />
            <div className="bg-customPurple rounded-t-full rounded-b-full mx-2 max-h-full">
                <div className="h-[650px] flex">
                    <div className="flex-1 flex items-center justify-center  max-h-full">
                        <img
                            src="./left.jpg"
                            alt="Left side illustration"
                            className="pulsing-image rounded-full max-w-[650px] h-auto ml-36"
                        />
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-full max-w-md p-8" onKeyDown={handleKeyDown}>
                            <div className="flex flex-col gap-4">
                                <Input
                                    isClearable
                                    key="email"
                                    size="lg"
                                    type="email"
                                    color="primary"
                                    label="Email"
                                    placeholder="Enter your email"
                                    defaultValue=""
                                    className="max-w-full"
                                    variant="faded"
                                    radius="lg"
                                    isInvalid={false}
                                    errorMessage="Please enter a valid email"
                                    value={email}
                                    onValueChange={setEmail}
                                />
                                <Input
                                    key="password"
                                    label="Password"
                                    color="primary"
                                    variant="faded"
                                    size="lg"
                                    placeholder="Enter your password"
                                    value={password}
                                    onValueChange={setPassword}
                                    endContent={
                                        <button
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={toggleVisibility}
                                            aria-label="toggle password visibility"
                                        >
                                            {isVisible ? (
                                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                            ) : (
                                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                            )}
                                        </button>
                                    }
                                    type={isVisible ? "text" : "password"}
                                    className="max-w-full"
                                />
                                {error && <p className="text-red-500">{error}</p>}
                                <Button
                                    color="primary"
                                    variant="shadow"
                                    isLoading={isLoading}
                                    className="max-w-full"
                                    onPress={handleLogin}
                                >
                                    Login
                                </Button>

                                <div className="flex items-center my-4">
                                    <div className="border-t w-full border-gray-300"></div>
                                    <span className="px-2 text-gray-500">OR</span>
                                    <div className="border-t w-full border-gray-300"></div>
                                </div>

                                <Button
                                    onClick={handleGoogleLogin}
                                    className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 shadow-md hover:bg-gray-100 px-4 py-2 rounded-lg max-w-full"
                                >
                                    <FcGoogle className="mr-2 text-2xl" />
                                    Sign in with Google
                                </Button>

                                <div className="text-center mt-4">
                                    <span className="text-gray-600">Don't have an account?</span>{" "}
                                    <Button color="primary"
                                            variant="shadow"
                                            onClick={() => {
                                                reactNavigator("/signup")
                                            }}>Sign Up</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <style jsx={"true"}>{`
                        @keyframes pulse {
                            0%,
                            100% {
                                transform: scale(1);
                            }
                            50% {
                                transform: scale(1.05);
                            }
                        }
                        .pulsing-image {
                            animation: pulse 3s ease-in-out infinite;
                        }
                    `}</style>
                </div>
            </div>
        </>
    );
}
