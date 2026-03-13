import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const ChatBot = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Initialize/Reset welcome message when language changes
  useEffect(() => {
    setMessages([
      { id: 1, text: t('bot.welcome'), sender: 'bot' }
    ]);
  }, [i18n.language, t]);

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
    // Basic keyword detection across multiple languages
    if (query.includes('bonjour') || query.includes('salut') || query.includes('hello') || query.includes('hi') || query.includes('bojour') || query.includes('مرحبا')) {
      return t('bot.res_greeting');
    }
    if (query.includes('bienvenue') || query.includes('welcome') || query.includes('bieve') || query.includes('bienvenuu') || query.includes('bienvenu') || query.includes('أهلا')) {
      return t('bot.res_welcome');
    }
    if (query.includes('fondateur') || query.includes('proprietaire') || query.includes('najjar') || query.includes('kamel') || query.includes('aida') || query.includes('owner') || query.includes('founder') || query.includes('الأصحاب')) {
      return t('bot.res_founders');
    }
    if (query.includes('halal') || query.includes('hallal') || query.includes('certification') || query.includes('حلال')) {
      return t('bot.res_halal');
    }
    if (query.includes('personnel') || query.includes('equipe') || query.includes('cuisine') || query.includes('chef') || query.includes('staff') || query.includes('team') || query.includes('الموظفين')) {
      return t('bot.res_staff');
    }
    if (query.includes('menu') || query.includes('carte') || query.includes('manger') || query.includes('food') || query.includes('eat') || query.includes('قائمة')) {
      return t('bot.res_menu');
    }
    if (query.includes('commande') || query.includes('commander') || query.includes('order') || query.includes('طلب')) {
      return t('bot.res_order');
    }
    if (query.includes('livraison') || query.includes('pays') || query.includes('delivery') || query.includes('shipping') || query.includes('توصيل')) {
      return t('bot.res_delivery');
    }
    if (query.includes('admin') || query.includes('connexion') || query.includes('login') || query.includes('مسؤول')) {
      return t('bot.res_admin');
    }
    if (query.includes('objectif') || query.includes('but') || query.includes('avenir') || query.includes('expansion') || query.includes('goal') || query.includes('future') || query.includes('vision') || query.includes('أهداف') || query.includes('مشروع')) {
      return t('bot.res_goals');
    }
    if (query.includes('contact') || query.includes('appel') || query.includes('telephone') || query.includes('phone') || query.includes('email') || query.includes('اتصال')) {
      return t('bot.res_contact');
    }
    return t('bot.res_fallback');
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
        aria-label="Chat with Royal Bot"
      >
        {isOpen ? <X size={30} /> : <MessageCircle size={30} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8, originY: 1, originX: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            style={{
              position: 'fixed',
              bottom: '100px',
              right: '30px',
              width: 'min(350px, 90vw)',
              height: 'min(500px, 70vh)',
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
              <div style={{ position: 'relative' }}>
                <Bot size={24} color="var(--gold)" />
                <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%', border: '2px solid var(--navy)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{t('bot.title')}</div>
                <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>{t('bot.online')}</div>
              </div>
              <X size={20} style={{ cursor: 'pointer', opacity: 0.6 }} onClick={() => setIsOpen(false)} />
            </div>

            {/* Messages Area */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: '#fcfcfc' }}>
              {messages.map((msg) => (
                <div key={msg.id} style={{
                  alignSelf: msg.sender === 'bot' ? 'flex-start' : 'flex-end',
                  maxWidth: '85%',
                  display: 'flex',
                  gap: '10px',
                  flexDirection: msg.sender === 'bot' ? 'row' : 'row-reverse'
                }}>
                  {msg.sender === 'bot' && (
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(0,31,63,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Bot size={16} color="var(--navy)" />
                    </div>
                  )}
                  <div style={{
                    backgroundColor: msg.sender === 'bot' ? 'white' : 'var(--navy)',
                    color: msg.sender === 'bot' ? 'var(--navy)' : 'white',
                    padding: '12px 16px',
                    borderRadius: '18px',
                    borderTopLeftRadius: msg.sender === 'bot' ? '2px' : '18px',
                    borderTopRightRadius: msg.sender === 'user' ? '2px' : '18px',
                    fontSize: '0.92rem',
                    boxShadow: msg.sender === 'bot' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none',
                    lineHeight: '1.5',
                    textAlign: i18n.language === 'ar' ? 'right' : 'left',
                    direction: i18n.language === 'ar' ? 'rtl' : 'ltr'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{ padding: '15px', borderTop: '1px solid #f0f0f0', display: 'flex', gap: '10px', backgroundColor: 'white' }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('bot.placeholder')}
                style={{ 
                  flex: 1, 
                  padding: '12px 16px', 
                  borderRadius: '25px', 
                  border: '1.5px solid #eee', 
                  outline: 'none', 
                  fontSize: '0.9rem',
                  transition: 'border-color 0.2s',
                  direction: i18n.language === 'ar' ? 'rtl' : 'ltr'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--gold)'}
                onBlur={(e) => e.target.style.borderColor = '#eee'}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSend}
                style={{ backgroundColor: 'var(--navy)', color: 'white', border: 'none', width: '42px', height: '42px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,31,63,0.2)' }}
              >
                <Send size={18} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
