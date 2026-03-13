import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const [email, setEmail] = useState('admin@royalfork.fr');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // DEV MODE BYPASS: Allow login with hardcoded credentials if Firebase fails
    if (email === 'admin@royalfork.fr' && password === 'admin123') {
      localStorage.setItem('devAdmin', 'true');
      navigate('/admin');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch {
      setError('Identifiants invalides ou erreur de connexion.');
    }
  };

  const handleSetup = async () => {
    setError('');
    setSuccess('');
    if (!password || password.length < 6) {
      setError('Veuillez entrer un mot de passe valide (min 6 caractères).');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess('Compte Admin créé avec succès ! Vous pouvez maintenant vous connecter.');
    } catch (_err) {
      setError(_err.message.includes('email-already-in-use') 
        ? 'Ce compte existe déjà. Essayez de vous connecter.' 
        : 'Erreur lors de la création : ' + _err.message);
    }
  };

  return (
    <div className="login-page section-padding" style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f8f9fa' 
    }}>
      <div style={{ 
        maxWidth: '400px', 
        width: '100%', 
        backgroundColor: 'white', 
        padding: '40px', 
        borderRadius: '12px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)' 
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            backgroundColor: 'var(--navy)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 15px' 
          }}>
            <LogIn color="var(--gold)" size={30} />
          </div>
          <h2 style={{ color: 'var(--navy)' }}>{t('login.title')}</h2>
          <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>{t('login.subtitle')}</p>
        </div>

        {error && <div style={{ color: '#ff4d4d', backgroundColor: '#fff1f1', padding: '10px', borderRadius: '4px', marginBottom: '20px', fontSize: '0.85rem', border: '1px solid #ff4d4d' }}>{error}</div>}
        {success && <div style={{ color: '#2ecc71', backgroundColor: '#eafaf1', padding: '10px', borderRadius: '4px', marginBottom: '20px', fontSize: '0.85rem', border: '1px solid #2ecc71' }}>{success}</div>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '500' }}>{t('login.email_label')}</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('login.email_placeholder')} 
              required
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', outline: 'none' }} 
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '500' }}>{t('login.password_label')}</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('login.password_placeholder')}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', outline: 'none' }} 
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            <button type="submit" className="btn-primary" style={{ padding: '15px', fontSize: '1rem' }}>
              {t('login.submit_btn')}
            </button>
            <button 
              type="button" 
              onClick={handleSetup}
              style={{ 
                padding: '12px', 
                backgroundColor: 'transparent', 
                color: 'var(--navy)', 
                border: '1px solid var(--navy)', 
                borderRadius: '6px', 
                fontSize: '0.9rem', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <UserPlus size={16} /> {t('login.setup_btn')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
