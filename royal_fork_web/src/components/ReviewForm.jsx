import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Star } from 'lucide-react';

const ReviewForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'reviews'), {
        name,
        role,
        content,
        rating,
        status: 'pending', // Requires admin validation
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setTimeout(() => onClose(), 2000);
    } catch (err) {
      console.error("Error adding review:", err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ color: '#2ecc71', marginBottom: '20px' }}>
             <Star size={50} fill="#2ecc71" />
        </div>
        <h3 style={{ color: 'var(--navy)' }}>Merci !</h3>
        <p>Votre avis a été envoyé et sera visible après validation par notre équipe.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px' }}>
      <h3 style={{ color: 'var(--navy)', marginBottom: '20px' }}>Laisser un avis</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Nom complet</label>
          <input 
            type="text" 
            required 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Votre rôle (ex: Client de Genève)</label>
          <input 
            type="text" 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Note</label>
          <div style={{ display: 'flex', gap: '5px' }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star 
                key={s}
                size={24}
                style={{ cursor: 'pointer' }}
                fill={s <= rating ? "var(--gold)" : "none"}
                color="var(--gold)"
                onClick={() => setRating(s)}
              />
            ))}
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Votre message</label>
          <textarea 
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ddd', resize: 'none' }}
          ></textarea>
        </div>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button type="button" onClick={onClose} style={{ flex: 1, padding: '12px', borderRadius: '4px', border: '1px solid #ddd', cursor: 'pointer' }}>Annuler</button>
          <button type="submit" disabled={status === 'submitting'} className="btn-primary" style={{ flex: 2 }}>
            {status === 'submitting' ? "Envoi..." : "Publier l'avis"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
