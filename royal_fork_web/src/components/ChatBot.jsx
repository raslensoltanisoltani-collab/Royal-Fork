import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Bonjour ! Je suis l'assistant Royal Fork. Comment puis-je vous aider aujourd'hui ?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

let nextMsgId = 100;

  const handleSend = () => {
    if (!input.trim()) return;

    nextMsgId++;
    const userMsg = { id: nextMsgId, text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // AI Logic / Auto-responses
    setTimeout(() => {
      const botResponse = getBotResponse(input.toLowerCase());
      nextMsgId++;
      setMessages(prev => [...prev, { id: nextMsgId, text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  const getBotResponse = (query) => {
    if (query.includes('bonjour') || query.includes('salut') || query.includes('hello') || query.includes('bojour')) {
      return "Bonjour ! Bienvenue chez Royal Fork. Comment puis-je vous aider aujourd'hui ?";
    }
    if (query.includes('bienvenue') || query.includes('bieve')) {
      return "Merci ! Nous sommes ravis de vous accueillir chez Royal Fork, l'excellence de la fusion culinaire.";
    }
    if (query.includes('menu') || query.includes('carte') || query.includes('manger')) {
      return "Vous pouvez consulter notre menu complet dans la section 'Menu'. Nous proposons une fusion cuisine Orientale & Occidentale !";
    }
    if (query.includes('commande') || query.includes('commander')) {
      return "Pour commander, ajoutez des articles à votre panier depuis le Menu, puis allez dans votre panier pour finaliser le paiement.";
    }
    if (query.includes('livraison') || query.includes('pays') || query.includes('ou librez-vous')) {
      return "Nous livrons en France, Suisse, Belgique, Pays-Bas, Allemagne et Italie avec notre propre flotte de véhicules.";
    }
    if (query.includes('admin') || query.includes('connexion')) {
      return "L'accès administrateur se trouve en bas de page. Vous aurez besoin de vos identifiants pour vous connecter.";
    }
    if (query.includes('contact') || query.includes('appel') || query.includes('telephone')) {
      return "Vous pouvez nous contacter au 07764826093 ou par email à contact@royalfork.fr.";
    }
    return "Je ne suis pas sûr de comprendre, mais je peux vous renseigner sur notre menu, nos zones de livraison ou comment passer une commande !";
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'var(--gold)',
          color: 'var(--navy)',
          border: 'none',
          boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isOpen ? <X size={30} /> : <MessageCircle size={30} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '30px',
              width: '350px',
              height: '500px',
              backgroundColor: 'white',
              borderRadius: '15px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 2000,
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{ backgroundColor: 'var(--navy)', color: 'white', padding: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bot size={24} color="var(--gold)" />
              <div>
                <div style={{ fontWeight: 'bold' }}>Assistant Royal Bot</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>En ligne • Réponses rapides</div>
              </div>
            </div>

            {/* Messages Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: '#fcfcfc' }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{
                  alignSelf: msg.sender === 'bot' ? 'flex-start' : 'flex-end',
                  maxWidth: '80%',
                  display: 'flex',
                  gap: '8px',
                  flexDirection: msg.sender === 'bot' ? 'row' : 'row-reverse'
                }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: msg.sender === 'bot' ? 'var(--navy)' : 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {msg.sender === 'bot' ? <Bot size={14} color="var(--gold)" /> : <User size={14} color="var(--navy)" />}
                  </div>
                  <div style={{
                    backgroundColor: msg.sender === 'bot' ? 'white' : 'var(--navy)',
                    color: msg.sender === 'bot' ? 'var(--navy)' : 'white',
                    padding: '10px 15px',
                    borderRadius: '12px',
                    borderTopLeftRadius: msg.sender === 'bot' ? '2px' : '12px',
                    borderTopRightRadius: msg.sender === 'user' ? '2px' : '12px',
                    fontSize: '0.9rem',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                    lineHeight: '1.4'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{ padding: '15px', borderTop: '1px solid #eee', display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Écrivez votre message..."
                style={{ flex: 1, padding: '10px', borderRadius: '20px', border: '1px solid #ddd', outline: 'none', fontSize: '0.9rem' }}
              />
              <button
                onClick={handleSend}
                style={{ backgroundColor: 'var(--navy)', color: 'white', border: 'none', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
