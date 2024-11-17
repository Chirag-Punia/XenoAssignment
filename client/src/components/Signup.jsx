import { Input, Link } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { EyeFilledIcon } from "./utilities/EyeFilledIcon.jsx";
import { EyeSlashFilledIcon } from "./utilities/EyeSlashFilledIcon.jsx";
import Header from "./Header.jsx";
import axios from "axios";
import {useGoogleLogin} from "@react-oauth/google";
import {toast} from "react-toastify";
import {FcGoogle} from "react-icons/fc";
import {useNavigate} from "react-router-dom";

export default function SignUpPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const reactNavigator = useNavigate();
    const toggleVisibility = () => setIsVisible(!isVisible);
    const handleSignup = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        setIsLoading(true);
        try {
            const res = await axios.post("https://xenoassignment.onrender.com/auth/signup", { name, email, password });
            localStorage.setItem("token", res.data.token);
            reactNavigator("/home");
            alert(res.data.msg);
        } catch (err) {
            alert(err.response.data.msg);
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

    return (
        <>
            <Header />
            <div className="bg-customPurple rounded-t-full rounded-b-xl mx-2">
                <div className="h-[610px] flex">
                    <div className="flex-1 flex items-center justify-center">
                        <img
                            src="../../public/left.jpg"
                            alt="Left side illustration"
                            className="pulsing-image rounded-full max-w-[650px] h-auto"
                        />
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-full max-w-md p-8">
                            <div className="flex flex-col gap-4">
                                <Input
                                    isClearable
                                    key="name"
                                    size="lg"
                                    type="text"
                                    color="primary"
                                    label="Name"
                                    placeholder="Enter your name"
                                    value={name}
                                    onValueChange={setName}
                                    variant="faded"
                                    radius="lg"
                                    className="max-w-full"
                                />

                                <Input
                                    isClearable
                                    key="email"
                                    size="lg"
                                    type="email"
                                    color="primary"
                                    label="Email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onValueChange={setEmail}
                                    variant="faded"
                                    radius="lg"
                                    className="max-w-full"
                                    isInvalid={false}
                                    errorMessage="Please enter a valid email"
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
                                                <EyeSlashFilledIcon
                                                    className="text-2xl text-default-400 pointer-events-none"/>
                                            ) : (
                                                <EyeFilledIcon
                                                    className="text-2xl text-default-400 pointer-events-none"/>
                                            )}
                                        </button>
                                    }
                                    type={isVisible ? "text" : "password"}
                                    className="max-w-full"
                                />

                                <Input
                                    key="confirmPassword"
                                    label="Confirm Password"
                                    color="primary"
                                    variant="faded"
                                    size="lg"
                                    placeholder="Re-enter your password"
                                    value={confirmPassword}
                                    onValueChange={setConfirmPassword}
                                    endContent={
                                        <button
                                            className="focus:outline-none"
                                            type="button"
                                            onClick={toggleVisibility}
                                            aria-label="toggle password visibility"
                                        >
                                            {isVisible ? (
                                                <EyeSlashFilledIcon
                                                    className="text-2xl text-default-400 pointer-events-none"/>
                                            ) : (
                                                <EyeFilledIcon
                                                    className="text-2xl text-default-400 pointer-events-none"/>
                                            )}
                                        </button>
                                    }
                                    type={isVisible ? "text" : "password"}
                                    className="max-w-full"
                                />

                                <Button
                                    color="primary"
                                    variant="shadow"
                                    isLoading={isLoading}
                                    className="max-w-full"
                                    onClick={handleSignup}

                                >
                                    Sign Up
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
                                    <FcGoogle className="mr-2 text-2xl"/>
                                    Sign in with Google
                                </Button>

                                <div className="text-center mt-4">
                                    <span className="text-gray-600">Already have an account?</span>{" "}
                                    <Link href="/login" className="text-blue-600 hover:underline">
                                        Sign In
                                    </Link>
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
