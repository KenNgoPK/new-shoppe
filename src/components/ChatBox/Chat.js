// components/ChatBtw.js
import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import styles from './chat.module.css';

const ChatBtw = () => {
  const [messages, setMessages] = useState([]);
  //messages là một mảng chứa các tin nhắn trong chatbot.
  //setMessages là hàm dùng để update cái messages
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  //dùng để set mở và đóng

  const handleSend = async () => {
    //input.trim() sẽ trả về một chuỗi mới mà không có khoảng trắng ở đầu và cuối. Nếu chuỗi input chỉ chứa khoảng trắng hoặc là rỗng, input.trim() sẽ trả về chuỗi rỗng "".
    //if (input.trim()) kiểm tra xem người dùng có thực sự nhập nội dung hay không (tức là không phải chỉ có khoảng trắng hoặc không nhập gì cả). Nếu người dùng nhập tin nhắn hợp lệ, thì mã bên trong dấu ngoặc {} sẽ được thực thi.
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      setInput('');

      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(input);

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: result.response.text() },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleOpenMenu = () => {
    setIsOpen(true);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };


  return (
    <div className={styles.container}>
      <div className={styles.floatingButton} onClick={handleOpenMenu}>
        <img src="/image/chatbox.jpg" alt="Chat Button" className={styles.icon} />
      </div>

      {isOpen && (
        <div className={styles.chatboxContainer}>
          <div className={styles.header}>
            <div className={styles.username}>Chatbox</div>
            <div className={styles.remove} onClick={handleCloseMenu}>❌</div>
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
              placeholder="Write your message..."
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBtw;
//youtube and wiki đã tài trợ chương trình này
