import { Button } from "@nextui-org/button";
import Header from "./Header.jsx";
import {useNavigate} from "react-router-dom";

export default function LandingPage() {
    const reactNavigator = useNavigate();
    return (
        <>
            <Header />
            <div className="bg-customPurple min-h-screen font-doto text-darkText rounded-t-full rounded-b-full" >
                <div className="container mx-auto px-6 py-16">
             
                    <div className="text-center">
                        <h1 className="text-5xl font-bold leading-tight">
                            Welcome to Our CRM Platform
                        </h1>
                        <p className="mt-6 text-lg">
                            Discover a new way to manage and optimize your customer relationships effectively and efficiently.
                        </p>
                        <Button
                            color="primary"
                            className="mt-8 bg-white text-purple-700 rounded-lg shadow-md px-8 py-4 text-lg hover:bg-gray-100"
                            onPress={() => reactNavigator("/login")}
                        >
                            Get Started
                        </Button>
                    </div>

 
                    <div className="mt-16 grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg p-8 shadow-md text-center">
                            <h3 className="text-xl font-bold text-purple-700">Lead Management</h3>
                            <p className="mt-4">
                                Capture, track, and nurture leads with ease. Prioritize and manage your leads efficiently.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg p-8 shadow-md text-center">
                            <h3 className="text-xl font-bold text-purple-700">Automated Campaigns</h3>
                            <p className="mt-4">
                                Automate your marketing campaigns and personalize customer interactions effortlessly.
                            </p>
                        </div>
                        <div className="bg-white rounded-lg p-8 shadow-md text-center">
                            <h3 className="text-xl font-bold text-purple-700">Sales Analytics</h3>
                            <p className="mt-4">
                                Use our insights to make data-driven sales decisions and optimize your sales strategy.
                            </p>
                        </div>
                    </div>

   
                    <div className="mt-16 text-center">
                        <h2 className="text-3xl font-bold text-white">Choose Your Plan</h2>
                        <div className="mt-8 grid md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-lg p-8 shadow-md text-center">
                                <h3 className="text-xl font-bold text-purple-700">Basic</h3>
                                <p className="mt-4">$10/month</p>
                                <p className="mt-4">Basic CRM tools for small teams</p>
                                <Button className="mt-4 bg-purple-700 text-white rounded-lg px-6 py-2">
                                    Select Plan
                                </Button>
                            </div>
                            <div className="bg-white rounded-lg p-8 shadow-md text-center">
                                <h3 className="text-xl font-bold text-purple-700">Pro</h3>
                                <p className="mt-4">$30/month</p>
                                <p className="mt-4">Advanced CRM features and automation</p>
                                <Button className="mt-4 bg-purple-700 text-white rounded-lg px-6 py-2">
                                    Select Plan
                                </Button>
                            </div>
                            <div className="bg-white rounded-lg p-8 shadow-md text-center">
                                <h3 className="text-xl font-bold text-purple-700">Enterprise</h3>
                                <p className="mt-4">Contact Us</p>
                                <p className="mt-4">Custom solutions for large businesses</p>
                                <Button className="mt-4 bg-purple-700 text-white rounded-lg px-6 py-2">
                                    Contact Us
                                </Button>
                            </div>
                        </div>
                    </div>


                    <div className="mt-16 text-center">
                        <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
                        <div className="mt-8 max-w-2xl mx-auto">
                            <div className="bg-white rounded-lg p-6 shadow-md mb-4">
                                <h4 className="text-lg font-bold text-purple-700">What is a CRM?</h4>
                                <p className="mt-2">
                                    A CRM (Customer Relationship Management) system helps manage and analyze customer interactions and data.
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-6 shadow-md mb-4">
                                <h4 className="text-lg font-bold text-purple-700">How secure is my data?</h4>
                                <p className="mt-2">
                                    We implement top security measures to ensure your data remains safe and confidential.
                                </p>
                            </div>
                            <div className="bg-white rounded-lg p-6 shadow-md mb-4">
                                <h4 className="text-lg font-bold text-purple-700">Can I switch plans later?</h4>
                                <p className="mt-2">
                                    Absolutely! You can upgrade or downgrade your plan anytime from your account settings.
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className="mt-16 text-center">
                        <h2 className="text-3xl font-bold text-white">Join Us Today!</h2>
                        <p className="mt-4 text-lg text-bold">
                            Sign up now and start optimizing your customer relationships with our CRM platform.
                        </p>
                        <Button
                            color="primary"
                            className="mt-8 bg-white text-purple-700 rounded-lg shadow-md px-8 py-4 text-lg hover:bg-gray-100"
                            onPress={() =>reactNavigator("/signup")}
                        >
                            Sign Up
                        </Button>
                    </div>
                </div>

                <style jsx={"true"}>{`
                    .bg-customPurple {
                        background: linear-gradient(135deg, #6a0dad, #b700ff);
                    }
                    .font-doto {
                        font-family: 'Doto', sans-serif;
                    }
                    .text-darkText {
                        color: #2D2D2D;
                    }
                `}</style>
            </div>
        </>
    );
}
