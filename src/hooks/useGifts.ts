import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Gift } from '../types';

const COLLECTION_NAME = 'gifts';

export function useGifts() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Referência para a coleção de presentes
    const giftsRef = collection(db, COLLECTION_NAME);
    
    // Consulta ordenada pela data de criação
    const q = query(giftsRef, orderBy('createdAt', 'desc'));

    // Escuta mudanças em tempo real no Firestore
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const giftsData: Gift[] = [];
      querySnapshot.forEach((doc) => {
        giftsData.push({ id: doc.id, ...doc.data() } as Gift);
      });
      setGifts(giftsData);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao carregar presentes do Firestore:", error);
      setLoading(false);
    });

    // Cleanup ao desmontar o componente
    return () => unsubscribe();
  }, []);

  const addGift = async (gift: Omit<Gift, 'id'>) => {
    try {
      await addDoc(collection(db, COLLECTION_NAME), gift);
    } catch (error) {
      console.error("Erro ao adicionar presente:", error);
    }
  };

  const removeGift = async (id: string) => {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error("Erro ao remover presente:", error);
    }
  };

  return { gifts, addGift, removeGift, loading };
}
