import React, { use, useState } from 'react'
import './Ai_Indicator.css'
import { IoClose } from "react-icons/io5";
import { MdAutoAwesome } from 'react-icons/md'
import apiRequest from '../../auth_apis/fetch_api';

const Ai_Indicator = () => {

    
    const [isAiOpen, setIsAiOpen] = useState(false)
    const [inputAi, setInputAi] = useState("")
    const [messagesAiShop, setMessagesAiShop] = useState([])
    console.log(messagesAiShop)
    const [loadingAiShop, setLoadingAiShop] = useState(false)


    const handleSubmitAiShop = async () => {
        setLoadingAiShop(true)
        let request_ai_shop = await apiRequest("/ai/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: inputAi,

            })
        })
        let response_ai_shop = await request_ai_shop.json()
        setMessagesAiShop(
            [
                ...messagesAiShop,

                {
                    sender: 'user',
                    reply: inputAi
                },
                {
                    sender: "ai",
                    reply: response_ai_shop.reply
                }
            ]
        )
        setLoadingAiShop(false)
        setInputAi("")

    }
    return (
        <>
            <div className="ai-shop">
                {isAiOpen &&
                    <div className="ai-container-shop">
                        <IoClose
                            className="cross-icon-ai"
                            size={28}
                            onClick={() => setIsAiOpen(false)}
                        />
                        {console.log(messagesAiShop)}

                        <h1 className="heading-ai-shop">
                            AI Assistant
                        </h1>

                        {/* <div className="messages-ai-shop">
                            {messagesAiShop.length ===0 ? "Ask something" : messagesAiShop.map(text => {
                                return (

                                    <div className={`${text.sender === "user" ? "user" : "ai"}-response-ai`}>
                                        <p className="user-message-para-ai">{text.reply}</p>
                                    </div>
                                )
                            })}
                        </div> */}


                        <div className="messages-ai-shop">
                            {messagesAiShop.length === 0 ? (
                                <div className="empty-chat-ai">
                                    <MdAutoAwesome size={45} />
                                    <h3>GreenLeaf AI</h3>
                                    <p>Ask anything about plants, gardening or fertilizers.</p>
                                </div>
                            ) : (
                                messagesAiShop.map((text,index) => {
                                    return (
                                        <div key={index} className={`${text.sender === "user" ? "user" : "ai"}-response-ai`}>
                                            <p className="user-message-para-ai">
                                                {text.reply}
                                            </p>
                                        </div>
                                    );
                                })
                            )}
                        </div>


                        <div className="input-ai-shop">
                            <input
                                value={inputAi}
                                onChange={(e) => setInputAi(e.target.value)}
                                type="text"
                                placeholder="Ask me about plants..."
                                disabled={loadingAiShop}
                            />

                            <button
                                onClick={handleSubmitAiShop}
                                disabled={loadingAiShop}
                            >
                                {loadingAiShop ? "Thinking..." : "Send"}
                            </button>
                        </div>
                    </div>
                }

                {!isAiOpen &&
                    <div className="ai-indicator-shop" onClick={() => { setIsAiOpen(true) }}>
                        <MdAutoAwesome size={24} />
                        <div>AI search</div>
                    </div>
                }

            </div>
        </>
    )
}

export default Ai_Indicator