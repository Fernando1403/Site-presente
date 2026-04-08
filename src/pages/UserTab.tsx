import { useState } from 'react';
import { Plus, Gift as GiftIcon } from 'lucide-react';
import type { Gift, User } from '../types';
import { GiftCard } from '../components/GiftCard';
import { GiftModal } from '../components/GiftModal';

interface UserTabProps {
  user: User;
  gifts: Gift[];
  onAdd: (gift: Omit<Gift, 'id'>) => void;
  onDelete: (id: string) => void;
}

export function UserTab({ user, gifts, onAdd, onDelete }: UserTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter gifts belonging to this user
  const userGifts = gifts.filter((g) => g.owner === user)
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Lista de {user}</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
            Gerencie os presentes que você deseja.
          </p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} />
          <span>Novo Presente</span>
        </button>
      </div>

      {userGifts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <GiftIcon size={32} />
          </div>
          <h2 className="empty-title">Sua lista está vazia</h2>
          <p>Clique em "Novo Presente" para começar a adicionar ideias.</p>
        </div>
      ) : (
        <div className="gifts-grid">
          {userGifts.map(gift => (
            <GiftCard 
              key={gift.id} 
              gift={gift} 
              onDelete={onDelete} 
              showOwner={false} 
            />
          ))}
        </div>
      )}

      <GiftModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onAdd}
        owner={user}
      />
    </div>
  );
}
