import { useState } from 'react';
import './Chatbot.css'; // Import your CSS file
import chatbotIcon from '../assets/ChatBotIcon.png';
function Chatbot() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State to track if the chatbox is open or closed

  const sendQuestion = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: question })
      });
      const data = await response.json();
      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuestion('');
    setResponse('');
  };

  return (
    <div className="app-container">
    
      {!isOpen && (
        <div className="chatbot-icon" onClick={() => setIsOpen(true)}>
          <img className="icon"src={chatbotIcon} alt="Chatbot Icon" />
        </div>
      )}

   
      {isOpen && (
        <div className="chatbot-container open">
          <button className="chatbot-close" onClick={handleClose}>✖</button>
          <div className="chatbot-popup">
            <textarea
              className="chatbot-response response"
              value={response}
              readOnly
              placeholder="Chatbot response..."
            ></textarea>
            <div className="chatbot-input bottom">
              <input
                className="input-box"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question..."
              />
              <button className="btn" onClick={sendQuestion}>Ask</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
