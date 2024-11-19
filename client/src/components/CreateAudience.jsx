import React, { useState } from 'react';
import axios from 'axios';
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Header from "./Header.jsx";
import { Checkbox } from "@nextui-org/checkbox";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

const CreateAudience = () => {
    const [name, setName] = useState('');
    const [spending, setSpending] = useState('');
    const [visits, setVisits] = useState('');
    const [lastVisitDate, setLastVisitDate] = useState('');

    const [useSpending, setUseSpending] = useState(false);
    const [useVisits, setUseVisits] = useState(false);
    const [useLastVisitDate, setUseLastVisitDate] = useState(false);

    const [spendingOperator, setSpendingOperator] = useState('>');
    const [visitsOperator, setVisitsOperator] = useState('<=');
    const [dateOperator, setDateOperator] = useState('<');

    const [logicSpendingVisits, setLogicSpendingVisits] = useState('AND');
    const [logicSpendingDate, setLogicSpendingDate] = useState('AND');
    const [logicVisitsDate, setLogicVisitsDate] = useState('AND');

    const navigate = useNavigate();

    const calculateAudienceSize = async () => {
        try {

            const token = localStorage.getItem("token");
            const response = await axios.post(
                'https://xenoassignment.onrender.com/aud/calculate-size',
                {
                    filters: [
                        useSpending ? { field: 'totalSpends', operator: spendingOperator, value: parseFloat(spending) } : null,
                        useVisits ? { field: 'maxVisits', operator: visitsOperator, value: parseInt(visits) } : null,
                        useLastVisitDate ? { field: 'lastVisit', operator: dateOperator, value: lastVisitDate } : null,
                    ].filter(Boolean),
                    logic: {
                        spendingVisits: logicSpendingVisits,
                        spendingDate: logicSpendingDate,
                        visitsDate: logicVisitsDate,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            if (response.data && response.data.size !== undefined) {
                toast.success(`Audience Size ${response.data.size}`);
            } else {
                throw new Error('Invalid response structure');
            }
        } catch (error) {
            console.error("Error calculating audience size", error);

        }
    };


    const createAudience = async () => {
        try {

            const token = localStorage.getItem("token");
            await axios.post(
                'https://xenoassignment.onrender.com/aud/create',
                {
                    name,
                    filters: [
                        useSpending ? { field: 'totalSpends', operator: spendingOperator, value: parseFloat(spending) } : null,
                        useVisits ? { field: 'maxVisits', operator: visitsOperator, value: parseInt(visits) } : null,
                        useLastVisitDate ? { field: 'lastVisit', operator: dateOperator, value: lastVisitDate } : null,
                    ].filter(Boolean),
                    logic: {
                        spendingVisits: logicSpendingVisits,
                        spendingDate: logicSpendingDate,
                        visitsDate: logicVisitsDate,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            toast.success('Audience created successfully.');
        } catch (error) {
            console.error("Error creating audience", error);

        }
    };
    const shouldHideSpendingDateLogic =
        useSpending && useVisits && useLastVisitDate;

    return (
        <>
            <Header />
            <Button className="bg-orange-600 text-white w-full md:w-auto px-8 py-3 rounded-lg" onPress={() => navigate("/home")}>
                Back
            </Button>
            <div className="flex justify-center items-start p-6 bg-customPurple rounded-full">
                <div className="flex-1 max-w-md bg-white p-6 rounded-lg shadow-md mr-6">
                    <h2 className="text-xl font-bold text-purple-600 mb-4">Create Audience<h2 className="text-red-600">(Populate customer table first)</h2></h2>

                    <div className="mb-3">
                        <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">Audience Name:</label>
                        <Input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter audience name"
                            fullWidth
                            bordered
                            color="primary"
                        />
                    </div>

                    {/* Spending checkbox and input */}
                    <div className="mb-3 flex items-center">
                        <Checkbox checked={useSpending} onChange={(e) => setUseSpending(e.target.checked)}>
                            Spending:
                        </Checkbox>
                        {useSpending && (
                            <>
                                <select
                                    value={spendingOperator}
                                    onChange={(e) => setSpendingOperator(e.target.value)}
                                    className="p-2 border rounded-lg ml-2"
                                >
                                    <option value=">">Greater Than</option>
                                    <option value="<">Less Than</option>
                                </select>
                                <Input
                                    id="spending"
                                    type="number"
                                    value={spending}
                                    onChange={(e) => setSpending(e.target.value)}
                                    placeholder="Enter spending amount"
                                    fullWidth
                                    bordered
                                    color="primary"
                                    className="ml-2"
                                />
                            </>
                        )}
                    </div>

                    {/* Logic Between Spending and Visits */}
                    {useSpending && useVisits && (
                        <div className="mb-3">
                            <label className="block text-gray-700 font-semibold">Logic Between Spending and
                                Visits:</label>
                            <select
                                value={logicSpendingVisits}
                                onChange={(e) => setLogicSpendingVisits(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                            >
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                            </select>
                        </div>
                    )}

                    {/* Visits checkbox and input */}
                    <div className="mb-3 flex items-center">
                        <Checkbox checked={useVisits} onChange={(e) => setUseVisits(e.target.checked)}>
                            Visits:
                        </Checkbox>
                        {useVisits && (
                            <>
                                <select
                                    value={visitsOperator}
                                    onChange={(e) => setVisitsOperator(e.target.value)}
                                    className="p-2 border rounded-lg ml-2"
                                >
                                    <option value="<=">Less Than or Equal</option>
                                    <option value=">=">Greater Than or Equal</option>
                                </select>
                                <Input
                                    id="visits"
                                    type="number"
                                    value={visits}
                                    onChange={(e) => setVisits(e.target.value)}
                                    placeholder="Enter number of visits"
                                    fullWidth
                                    bordered
                                    color="primary"
                                    className="ml-2"
                                />
                            </>
                        )}
                    </div>

                    {/* Logic Between Spending and Last Visit Date - only visible if not all three are selected */}
                    {!shouldHideSpendingDateLogic && useSpending && useLastVisitDate && (
                        <div className="mb-3">
                            <label className="block text-gray-700 font-semibold">Logic Between Spending and Last Visit
                                Date:</label>
                            <select
                                value={logicSpendingDate}
                                onChange={(e) => setLogicSpendingDate(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                            >
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                            </select>
                        </div>
                    )}

                    {/* Last Visit Date checkbox and input */}
                    <div className="mb-3 flex items-center">
                        <Checkbox checked={useLastVisitDate} onChange={(e) => setUseLastVisitDate(e.target.checked)}>
                            Last Visit Date:
                        </Checkbox>
                        {useLastVisitDate && (
                            <>
                                <select
                                    value={dateOperator}
                                    onChange={(e) => setDateOperator(e.target.value)}
                                    className="p-2 border rounded-lg ml-2"
                                >
                                    <option value="<">Before</option>
                                    <option value=">">After</option>
                                </select>
                                <Input
                                    id="lastVisitDate"
                                    type="date"
                                    value={lastVisitDate}
                                    onChange={(e) => setLastVisitDate(e.target.value)}
                                    fullWidth
                                    bordered
                                    color="primary"
                                    className="ml-2"
                                />
                            </>
                        )}
                    </div>

                    {/* Logic Between Visits and Last Visit Date */}
                    {useVisits && useLastVisitDate && (
                        <div className="mb-3">
                            <label className="block text-gray-700 font-semibold">Logic Between Visits and Last Visit
                                Date:</label>
                            <select
                                value={logicVisitsDate}
                                onChange={(e) => setLogicVisitsDate(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                            >
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                            </select>
                        </div>
                    )}

                    <Button
                        onClick={calculateAudienceSize}
                        color="primary"
                        size="lg"
                        fullWidth
                        className="mt-2"
                    >
                        Calculate Audience Size
                    </Button>


                    <Button
                        onClick={createAudience}
                        color="primary"
                        size="lg"
                        fullWidth
                        className="mt-4"
                    >
                        Create Audience
                    </Button>
                    <Button
                        className="bg-purple-700 text-white mt-3 rounded-2xl"
                        fullWidth
                        onClick={() => navigate("/manage-campaigns")}
                    >
                        Manage Campaigns
                    </Button>

                </div>
            </div>
        </>
    );
};

export default CreateAudience;
