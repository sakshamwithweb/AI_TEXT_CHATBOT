"use client"
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [responseMessages, setResponseMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    console.log('Sending request with text:', inputText);

    try {
      const response = await axios.post('/api/generate', { text: inputText });
      console.log('Received response:', response.data);

      const newMessage = {
        id: responseMessages.length + 1,
        text: inputText,
        sender: 'user'
      };

      const aiMessage = {
        id: responseMessages.length + 2,
        text: response.data.cohere.generated_text,
        sender: 'ai'
      };

      setResponseMessages([...responseMessages, newMessage, aiMessage]);
    } catch (error) {
      console.error('Request error:', error);
      setResponseMessages([
        ...responseMessages,
        { id: responseMessages.length + 1, text: 'Error generating text', sender: 'ai' }
      ]);
    } finally {
      setInputText('');
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
      minHeight: '100vh',
      padding: '20px',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
        maxWidth: '90vw',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        marginBottom: '20px',
        padding: '20px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        maxHeight: '80vh',
      }}>
        {responseMessages.map((message) => (
          <div key={message.id} style={{
            marginBottom: '10px',
            textAlign: message.sender === 'user' ? 'right' : 'left',
          }}>
            <div style={{
              backgroundColor: message.sender === 'user' ? '#4CAF50' : '#f0f0f0',
              color: message.sender === 'user' ? '#fff' : '#333',
              borderRadius: '8px',
              padding: '10px 15px',
              maxWidth: '70%',
              wordWrap: 'break-word',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              display: 'inline-block',
            }}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
          placeholder="Type something here..."
          style={{
            flex: '1',
            minHeight: '50px',
            padding: '0.5rem',
            fontSize: '16px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            marginRight: '10px',
            outline: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            boxSizing: 'border-box'
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !inputText.trim()}
          style={{
            padding: '0.75rem',
            fontSize: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          {loading ? 'Generating...' : 'Send'}
        </button>
      </div>
    </div>
  );
}
