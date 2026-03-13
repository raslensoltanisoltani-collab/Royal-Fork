import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const phoneNumber = '337764826093'; // Updated to French number
  const message = encodeURIComponent("Bonjour Royal Fork, j'aimerais avoir des informations sur vos services !");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '30px',
        left: '30px', // Left side (Chatbot is on right)
        backgroundColor: '#25D366',
        color: 'white',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        zIndex: 10000,
        transition: 'transform 0.3s ease',
        textDecoration: 'none'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      aria-label="Contactez-nous sur WhatsApp"
    >
      <MessageCircle size={32} />
      <span style={{
        position: 'absolute',
        top: '-10px',
        right: '-5px',
        backgroundColor: '#ff4d4d',
        color: 'white',
        fontSize: '0.7rem',
        padding: '2px 6px',
        borderRadius: '10px',
        fontWeight: 'bold',
        border: '2px solid white'
      }}>1</span>
    </a>
  );
};

export default WhatsAppButton;
