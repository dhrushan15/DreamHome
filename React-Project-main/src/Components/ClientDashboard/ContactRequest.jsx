import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import ContactForm from './ContactForm';

export default function ContactRequest() {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const userId = useSelector((state) => state.user.userId);
    const [showContactForm, setShowContactForm] = useState(false);

    // Fetching contactRequests every 5 seconds
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`https://api-main-1-kdm2.onrender.com/contactRequests`);
                if (!response.ok) {
                    throw new Error("Failed to fetch contact requests");
                }
                const data = await response.json();
                // Filter messages where the recipient id matches the current user's id
                const filteredMessages = data.filter(
                    (message) => message.recipient === userId && message.status === "request"
                );
                setMessages(filteredMessages);
            } catch (error) {
                console.error("Error fetching contact requests:", error);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 500);

        return () => clearInterval(interval);
    }, [userId]); // Include userId as a dependency

    // Fetching users every 10 seconds
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`https://api-main-1-kdm2.onrender.com/users`);
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const userData = await response.json();
                setUsers(userData);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
        const interval = setInterval(fetchUsers, 100);

        return () => clearInterval(interval);
    }, []); // No dependencies, fetchUsers should only run once

    const handleAction = async (id, status) => {
        try {
            const response = await fetch(`https://api-main-1-kdm2.onrender.com/contactRequest/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            });
            if (!response.ok) {
                throw new Error(`Failed to ${status} contact request`);
            }
        } catch (error) {
            console.error(`Error ${status} contact request:`, error);
        }
    };

    return (
        <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
            {messages.map((message, index) => {
                // Find the sender's information based on the sender's ID
                const senderInfo = users.find((user) => user._id === message.sender);
                return (
                    <article key={index} className="mx-auto my-10 flex border border-gray-300 max-w-md flex-col rounded-2xl bg-white px-4 shadow-lg md:max-w-5xl md:flex-row md:items-center">
                        <div className="py-4 sm:py-8 flex-grow pr-4">
                            <a href="#" className="mb-6 block text-2xl font-medium text-gray-700">
                                {message.title}
                            </a>
                            <p className="mb-6 text-gray-500">{message.message}</p>
                            <div className="flex items-center">
                                <img className="h-10 w-10 rounded-full object-cover" src="/images/ddHJYlQqOzyOKm4CSCY8o.png" alt="Simon Lewis" />
                                <p className="ml-4 w-56">
                                    <strong className="block font-medium text-gray-700">
                                        {senderInfo && (
                                            <>
                                                <strong className="block font-medium text-gray-700">{senderInfo.name}</strong>
                                            </>
                                        )}
                                    </strong>
                                    <span className="text-sm text-gray-400">{message.createdAt}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between items-center">
                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-green-600 transition duration-300" onClick={() => handleAction(message._id, "accepted")}>
                                Accept
                            </button>
                            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-green-600 transition duration-300" onClick={() => handleAction(message._id, "declined")}>
                                Decline
                            </button>
                            <button
                                className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 "
                                onClick={() => setShowContactForm(true)}
                            >
                                Reply
                            </button>
                            {showContactForm && (
                                    <ContactForm
                                        senderId={userId} // Pass the sender ID to the ContactForm component
                                        recipientType="User" // Or "Architect" based on your logic
                                        recipientId={message.sender} // Pass the userId of the house owner
                                        onClose={() => setShowContactForm(false)}
                                    />
                            )}
                        </div>
                        <div className="border-l border-gray-300 h-full mx-4"></div> {/* Vertical line */}
                    </article>
                );
            })}
        </div>
    );
}    