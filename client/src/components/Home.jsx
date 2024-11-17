import { Button } from "@nextui-org/button";
import { googleLogout } from "@react-oauth/google";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";

const Home = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    function logOut() {
        localStorage.clear();
        googleLogout();
        navigate("/");
    }

    if (token) {
        return (
            <>
                <Header />


                <div className="mt-28 flex flex-col items-center justify-center  rounded-full bg-customPurple  px-6 py-12">

                    <div className="bg-white rounded-lg shadow-md p-10 text-center">
                        <h1 className="text-3xl font-bold mb-4 text-purple-700">
                            Welcome to Your Dashboard!
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Manage your audience and campaigns easily.
                        </p>

            
                        <div className="flex flex-col md:flex-row gap-4">
                            <Button
                                className="bg-purple-700 text-white w-full md:w-auto px-8 py-3 rounded-lg"
                                onClick={() => navigate("/create-audience")}
                            >
                                Create Audience
                            </Button>
                            <Button
                                className="bg-purple-700 text-white w-full md:w-auto px-8 py-3 rounded-lg"
                                onClick={() => navigate("/manage-campaigns")}
                            >
                                Manage Campaigns
                            </Button>
                        </div>

                   
                        <Button
                            className="mt-8 bg-red-500 text-white px-6 py-2 rounded-lg"
                            onClick={logOut}
                        >
                            Log Out
                        </Button>
                    </div>
                </div>
            </>
        );
    } else {
        return <Navigate to="/" />;
    }
};

export default Home;