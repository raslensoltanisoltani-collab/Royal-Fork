import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc, increment } from 'firebase/firestore';

const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  let browser = 'Unknown';
  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Edge')) browser = 'Edge';
  return browser;
};

const getDeviceType = () => {
  if (/Mobi|Android/i.test(navigator.userAgent)) return 'Mobile';
  if (/Tablet|iPad/i.test(navigator.userAgent)) return 'Tablet';
  return 'Desktop';
};

const VisitorTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        // 1. Log the individual page visit
        await addDoc(collection(db, 'visits'), {
          page: location.pathname,
          timestamp: serverTimestamp(),
          browser: getBrowserInfo(),
          device: getDeviceType(),
          referrer: document.referrer || 'direct',
          language: navigator.language,
        });

        // 2. Increment the global counter
        const counterRef = doc(db, 'analytics', 'global');
        await setDoc(counterRef, {
          totalVisits: increment(1),
          updatedAt: serverTimestamp(),
        }, { merge: true });

        // 3. Increment the per-page counter
        const pageKey = location.pathname.replace(/\//g, '_') || 'home';
        const pageRef = doc(db, 'analytics', `page_${pageKey}`);
        await setDoc(pageRef, {
          page: location.pathname,
          visits: increment(1),
          updatedAt: serverTimestamp(),
        }, { merge: true });
      } catch {
        // Silent fail - analytics should never break the app
      }
    };

    trackVisit();
  }, [location.pathname]);

  return null; // This component renders nothing
};

export default VisitorTracker;
