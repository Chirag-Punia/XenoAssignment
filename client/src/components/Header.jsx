import { Button } from "@nextui-org/button";
import {useNavigate} from "react-router-dom";
const Header = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center p-4" style={{ fontWeight: '1000', fontSize: '44px', color: '#000000' }}>
            <a href="/"><img src="./logo.png" alt="Logo" className="h-24 mr-4" /></a>
            <h1 className="font-Doto">Mini CRM & Campaign Management Portal</h1>


            <div className="ml-auto flex gap-4">
                {location.pathname !== "/"   ? <></> : <>
                    <Button
                        color="primary"
                        variant="shadow"
                        className="bg-customPurple text-white font-Doto rounded-lg shadow-md px-8 py-3 hover:bg-customPurple/80"
                        onClick={() => {
                            navigate("/login")
                        }}
                    >
                        Login
                    </Button>
                    <Button
                        color="primary"
                        variant="shadow"
                        className="bg-white text-bold text-purple-800 border border-customPurple rounded-lg shadow-md px-8 py-3 hover:bg-gray-100 font-Doto"
                        onClick={() => {
                            navigate("/signup")
                        }}
                    >
                        SignUp
                    </Button></>}

            </div>
        </div>
    );
};

export default Header;
