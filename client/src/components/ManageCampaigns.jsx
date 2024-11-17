import React, { useState, useEffect } from 'react';
import { Input, Button, Textarea, Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import axios from 'axios';
import Header from './Header.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function ManageCampaigns() {
    const [message, setMessage] = useState('');
    const [segments, setSegments] = useState([]);
    const [selectedSegment, setSelectedSegment] = useState('');
    const [campaigns, setCampaigns] = useState([]);
    const [selectedCampaign, setSelectedCampaign] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchSegments = async () => {
            try {
                const response = await axios.get('https://xenoassignment.onrender.com/aud/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const sortedSegments = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setSegments(sortedSegments);
            } catch (error) {
                console.error('Error fetching segments:', error);
            }
        };

        const fetchCampaigns = async () => {
            try {
                const response = await axios.get('https://xenoassignment.onrender.com/campaigns/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCampaigns(response.data);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
        };

        fetchSegments();
        fetchCampaigns();
    }, []);

    const handleCreateCampaign = async () => {
        try {
            const requestBody = {
                audienceCriteria: {
                    segmentId: selectedSegment,
                },
                message,
            };

            const response = await axios.post(
                'https://xenoassignment.onrender.com/campaigns/create',
                requestBody,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessage('');
            setSelectedSegment('');
            toast.success('Campaign created successfully');
            setCampaigns((prevCampaigns) => [...prevCampaigns, response.data.campaign]);
        } catch (error) {
            console.error('Error creating campaign', error);
        }
    };

    const handleSendMessage = async () => {
        try {
            if (!selectedCampaign) {
                toast.error('Please select a campaign');
                return;
            }

            await axios.put(
                `https://xenoassignment.onrender.com/campaigns/delivery-receipt`,
                { campaignId: selectedCampaign },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success('Messages sent successfully');
        } catch (error) {
            console.error('Error sending messages:', error);
            toast.error('Failed to send messages');
        }
    };


    const handleNewSegment = () => {
        navigate('/create-audience');
    };

    const getCampaignStats = (campaign) => {
        const sentMessages = campaign.sentMessages || [];
        const audienceSize = sentMessages.length;
        const sentCount = sentMessages.filter((msg) => msg.status === 'SENT').length;
        const failedCount = sentMessages.filter((msg) => msg.status === 'FAILED').length;
        const pendingCount = sentMessages.filter((msg) => msg.status === 'PENDING').length;

        return { audienceSize, sentCount, failedCount, pendingCount };
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };
    const handleClick =  () => {
        navigate("/home");
    }

    return (
        <>
            <Header />
            <Button className="bg-orange-600  text-white w-full md:w-auto px-8 py-3 rounded-lg"
                    onPress={handleClick}>Back</Button>
            <div className="flex justify-center items-center min-h-[500px]">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">Create Campaign</h2>
                    <label className="block text-gray-700 font-semibold mb-2">Select Audience Segment:</label>
                    <select
                        value={selectedSegment}
                        onChange={(e) => setSelectedSegment(e.target.value)}
                        className="w-full p-2 border rounded-md mb-4"
                    >
                        <option value="">Select a segment</option>
                        {segments.map((segment) => (
                            <option key={segment._id} value={segment._id}>
                                {segment.name}
                            </option>
                        ))}
                    </select>
                    <Button onPress={handleNewSegment} color="secondary" fullWidth className="mb-4">
                        Create New Segment
                    </Button>
                    <Textarea
                        placeholder="Enter your message here"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        fullWidth
                        bordered
                        color="primary"
                        className="mb-6"
                    />
                    <Button onPress={handleCreateCampaign} color="primary" fullWidth className="mb-4">
                        Create Campaign
                    </Button>

                    <label className="block text-gray-700 font-semibold mb-2">Select Campaign:</label>
                    <select
                        value={selectedCampaign}
                        onChange={(e) => setSelectedCampaign(e.target.value)}
                        className="w-full p-2 border rounded-md mb-4"
                    >
                        <option value="">Select a Campaign</option>
                        {campaigns.map((campaign) => (
                            <option key={campaign._id} value={campaign._id}>
                                {campaign.message || 'Campaign Name'}
                            </option>
                        ))}
                    </select>
                    <Button onPress={handleSendMessage} color="primary" fullWidth className="mb-4">
                        Send Message
                    </Button>
                </div>
            </div>

            <div className="flex justify-center items-center min-h-[500px] mt-12">
                <div className="w-full max-w-screen-lg">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Existing Campaigns</h2>
                    <div className="flex flex-wrap justify-start gap-6">
                        {campaigns.map((campaign) => {
                            const { audienceSize, sentCount, failedCount, pendingCount } = getCampaignStats(campaign);
                            const completionDate = formatDate(campaign.sentAt);

                            return (
                                <div key={campaign._id} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                                    <Card className="shadow-md mb-4">
                                        <CardHeader>
                                            <h3 className="font-bold text-lg">{campaign.message || 'Campaign Name'}</h3>
                                            <p className="text-gray-500">Status: {campaign.status}</p>
                                        </CardHeader>
                                        <CardBody>
                                            <p className="font-semibold">Audience Size: {audienceSize}</p>
                                            <p className="font-semibold">Number Sent: {sentCount}</p>
                                            <p className="font-semibold">Number Failed: {failedCount}</p>
                                            <p className="font-semibold">Number Pending: {pendingCount}</p>
                                            <p className="font-semibold">Completion Date: {completionDate}</p>
                                            <Divider className="my-2" />
                                        </CardBody>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageCampaigns;
