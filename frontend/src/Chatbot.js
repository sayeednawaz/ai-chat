import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const Chatbot = () => {

    const [messages, setMessages] = useState([
        {
            text: 'Hello! I am your Gemini AI assistant. How can I help you today?',
            sender: 'bot'
        }
    ]);

    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    // Dynamic API URL
    const API_URL =
        window.location.hostname === 'localhost'
            ? 'http://localhost:5000'
            : 'https://ai-chat-p37k.onrender.com';

    // Load Google Ads
    useEffect(() => {

        try {

            if (window.adsbygoogle) {
                window.adsbygoogle.push({});
                window.adsbygoogle.push({});
            }

        } catch (err) {
            console.log(err);
        }

    }, []);

    const sendMessage = async (e) => {

        e.preventDefault();

        if (!input.trim()) return;

        // User Message
        const userMessage = {
            text: input,
            sender: 'user'
        };

        setMessages(prev => [...prev, userMessage]);

        setInput('');
        setLoading(true);

        try {

            // Backend API Request
            const response = await axios.post(
                `${API_URL}/api/chat`,
                {
                    message: input
                }
            );

            // Bot Reply
            const botMessage = {
                text: response.data.reply,
                sender: 'bot'
            };

            setMessages(prev => [...prev, botMessage]);

        } catch (error) {

            console.error('Error:', error);

            setMessages(prev => [
                ...prev,
                {
                    text: 'Sorry, something went wrong.',
                    sender: 'bot'
                }
            ]);

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="chat-container">

            {/* TOP BANNER GOOGLE AD */}

            <div className="top-banner-ad">

                <ins
                    className="adsbygoogle"
                    style={{
                        display: 'block'
                    }}
                    data-ad-client="ca-pub-xxxxxxxxxxxx"
                    data-ad-slot="1234567890"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                ></ins>

            </div>

            {/* CHAT HEADER */}

            <div className="chat-header">
                <h2>🤖 Gemini AI Chatbot</h2>
                <p>Powered by Gemini 3.5 Flash</p>
            </div>

            {/* MESSAGES */}

            <div className="chat-messages">

                {messages.map((msg, index) => (

                    <div
                        key={index}
                        className={`message ${msg.sender}`}
                    >

                        <div className="message-content">

                            {msg.sender === 'bot' && (
                                <span className="bot-icon">🤖</span>
                            )}

                            {msg.text}

                            {msg.sender === 'user' && (
                                <span className="user-icon">👤</span>
                            )}

                        </div>

                    </div>

                ))}

                {/* Loading */}

                {loading && (
                    <div className="message bot">

                        <div className="typing-indicator">
                            <span>.</span>
                            <span>.</span>
                            <span>.</span>
                        </div>

                    </div>
                )}

            </div>

            {/* INPUT */}

            <form
                onSubmit={sendMessage}
                className="chat-input-form"
            >

                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="chat-input"
                    disabled={loading}
                />

                <button
                    type="submit"
                    className="send-button"
                    disabled={loading}
                >
                    {loading ? 'Sending...' : 'Send'}
                </button>

            </form>

            {/* BOTTOM STICKY GOOGLE AD */}

            <div className="bottom-sticky-ad">

                <ins
                    className="adsbygoogle"
                    style={{
                        display: 'block'
                    }}
                    data-ad-client="ca-pub-xxxxxxxxxxxx"
                    data-ad-slot="9876543210"
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                ></ins>

            </div>

        </div>
    );
};

export default Chatbot;