'use client';

import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai"; // Import for ChatGPT-based AI model interaction
import styles from './page.module.css'; // Import CSS module

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  //messages là một mảng chứa các tin nhắn trong chatbot.
  //setMessages là hàm dùng để update cái messages
  const [input, setInput] = useState('');
  //handle send là này một hàm để gửi tin nhắn của sender user
  const handleSend = async () => {
    //input.trim() sẽ trả về một chuỗi mới mà không có khoảng trắng ở đầu và cuối. Nếu chuỗi input chỉ chứa khoảng trắng hoặc là rỗng, input.trim() sẽ trả về chuỗi rỗng "".
    //if (input.trim()) kiểm tra xem người dùng có thực sự nhập nội dung hay không (tức là không phải chỉ có khoảng trắng hoặc không nhập gì cả). Nếu người dùng nhập tin nhắn hợp lệ, thì mã bên trong dấu ngoặc {} sẽ được thực thi.
    if (input.trim()) {
        setMessages([
            ...messages,
            { sender: 'user', text: input },
        ]);
        

        setInput('');
        //chỗ này có nghĩa là một chuổi rỗng có nghĩa là khi mà đã gửi tin nhắn cho api rồi thì set cái input này là rỗng
        
        //Chỗ này là gọi api của google
        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(input);
        // nó sẽ trả về input thay vì là promt
        // 1. để dùng hiện thị trên thanh chat 

        //setMessages này dùng để trả tin nhắn bot
        //sender là phần bot
        // ..prevMessages đây nó thứ để dùng copy lại dcai1 phần chat của chat box trước khi chuyển qua cuâ khác
        setMessages(prevMessages => [
            ...prevMessages,
            { sender: 'bot', text: result.response.text() }
        ])
    }
}

    const handleKeyDown = (e) =>{
        if(e.key === 'Enter'){
            handleSend()
        }
    }
    //handleKeyDown dùng để nhận giá trị enter
    // tức là cho e là một giá trị xong gắn key vào là key là nút enter 
    // nên khi nhắn enter thì nó cũng sẽ gửi mã luôn không nhất thiết phải bấm vào button
    return (
        <div className={styles.chatboxContainer}>
            <div className={styles.header}>
                <div className={styles.username}>Chatbox</div>
            </div>
            <div className={styles.chatMessages}>
                {messages.map((message, index) => (
                <div
                    key={index}
                    className={`${styles.chatMessage} ${
                    message.sender === 'user' ? styles.userMessage : styles.botMessage
                    }`}
                >
                    <div className={styles.messageBubble}>{message.text}</div>
                </div>
                ))}
            </div>
            <div className={styles.footer}>
                <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Viết tin nhắn..."
                //onKeyDown là khi nó phát hiện chúng ta nhập tin nhắn vào rồi
                //xong đó nếu mà nó có cái key enter cũng như là nó bằng với cái enter của handleKeyDown thì nó sẽ send mess
                onKeyDown={handleKeyDown}
                />
                <button onClick={handleSend}>Gửi</button>
            </div>
        </div>
    );
}

export default Chatbox;
