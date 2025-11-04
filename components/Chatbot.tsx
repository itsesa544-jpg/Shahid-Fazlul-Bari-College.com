import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { ChatBubbleIcon, CloseIcon, PaperAirplaneIcon } from './Icons';

// Basic markdown to HTML renderer
const MarkdownRenderer = ({ content }: { content: string }) => {
    // A simple renderer for bold text and newlines.
    const htmlContent = content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
        .replace(/\n/g, '<br />'); // Newlines

    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};


const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'model'; content: string }[]>([
        {
            role: 'model',
            content: 'হ্যালো! আমি আপনার सहायक। শহীদ ফজলুল বারী কারিগরি ও বাণিজ্যিক মহাবিদ্যালয় সম্পর্কে আপনার কী জানার আছে?'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    // Initialize chat
    useEffect(() => {
        try {
            if (!process.env.API_KEY) {
                console.error("API_KEY is not set.");
                setError("চ্যাট এই মুহূর্তে недоступен।");
                return;
            }
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const systemInstruction = `You are a friendly and helpful AI assistant for the "Shahid Fazlul Bari Technical and Business College". Your name is "সহকারী" (Assistant). Your goal is to answer questions from prospective students, current students, and parents.
            - The college name is "শহীদ ফজলুল বারী কারিগরি ও বাণিজ্যিক মহাবিদ্যালয়".
            - Location: দাড়িদহ, শিবগঞ্জ, বগুড়া.
            - Established: ২০০৩ ইং.
            - Principal: মোঃ মাহবুব আলম (মানিক).
            - Key departments: অফিস ব্যবস্থাপনা, হিসাব বিজ্ঞান, ব্যবসায় সংগঠন ও ব্যবস্থাপনা, মানব সম্পদ ব্যবস্থাপনা, ব্যাংকিং, মার্কেটিং, কম্পিউটার অপারেশন, ই-কমার্স / ডিজিটাল মার্কেটিং.
            - Always be polite and provide information in Bengali (Bangla).
            - If you don't know an answer, say "এই মুহূর্তে আমার কাছে এই তথ্যটি নেই। অনুগ্রহ করে কলেজ অফিসে যোগাযোগ করুন।" (I do not have this information at the moment. Please contact the college office.).
            - Keep answers concise and helpful.`;

            chatRef.current = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction,
                },
            });
        } catch (e) {
             console.error("Failed to initialize AI Chat:", e);
             setError("চ্যাট শুরু করতে একটি সমস্যা হয়েছে।");
        }
    }, []);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage = { role: 'user' as const, content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const responseStream = await chatRef.current.sendMessageStream({ message: userMessage.content });

            let currentModelMessage = '';
            // Add a placeholder for the model's message
            setMessages(prev => [...prev, { role: 'model', content: '' }]);

            for await (const chunk of responseStream) {
                currentModelMessage += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    // Update the last message (the model's response)
                    newMessages[newMessages.length - 1] = { role: 'model', content: currentModelMessage };
                    return newMessages;
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setError('দুঃখিত, একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
            // Remove the empty model message placeholder on error
            setMessages(prev => prev.slice(0, prev.length -1));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={`fixed bottom-0 right-0 m-4 sm:m-8 z-50 transition-all duration-300 ${isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-primary text-white rounded-full p-4 shadow-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transform hover:scale-110 transition-transform"
                    aria-label="চ্যাট খুলুন"
                >
                    <ChatBubbleIcon className="w-8 h-8" />
                </button>
            </div>

            <div className={`fixed bottom-0 right-0 z-50 w-full h-full sm:h-auto sm:max-h-[80vh] sm:w-96 sm:m-8 bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}>
                {/* Header */}
                <header className="bg-primary text-white p-4 flex justify-between items-center rounded-t-lg flex-shrink-0">
                    <h2 className="font-bold text-lg">কলেজ সহকারী</h2>
                    <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-white/20" aria-label="চ্যাট বন্ধ করুন">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </header>

                {/* Messages */}
                <div className="flex-grow p-4 overflow-y-auto bg-base-200">
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'model' && (
                                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0 text-sm">
                                        স
                                    </div>
                                )}
                                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-base-100 text-gray-800 rounded-bl-none'}`}>
                                    {msg.content ? <MarkdownRenderer content={msg.content} /> : <span className="w-2 h-2 bg-gray-400 rounded-full inline-block animate-pulse"></span>}
                                </div>
                            </div>
                        ))}
                         {isLoading && messages[messages.length - 1]?.role === 'user' && (
                            <div className="flex items-end gap-2 justify-start">
                                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold flex-shrink-0 text-sm">
                                    স
                                </div>
                                <div className="max-w-[80%] p-3 rounded-2xl bg-base-100 text-gray-800 rounded-bl-none">
                                    <div className="flex gap-1 items-center">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {error && <div className="text-center text-red-600 text-sm p-2 bg-red-100 rounded-md">{error}</div>}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input */}
                <footer className="p-4 bg-white border-t rounded-b-lg flex-shrink-0">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="আপনার প্রশ্ন লিখুন..."
                            className="flex-grow p-2 border border-gray-300 rounded-full focus:ring-primary focus:border-primary"
                            disabled={isLoading || !!error}
                            aria-label="Chat input"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading || !!error}
                            className="bg-primary text-white rounded-full p-3 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                            aria-label="বার্তা পাঠান"
                        >
                            <PaperAirplaneIcon className="w-5 h-5" />
                        </button>
                    </form>
                </footer>
            </div>
        </>
    );
};

export default Chatbot;
