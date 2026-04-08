import { GiftCard } from '../components/GiftCard';
import { Gift as GiftIcon } from 'lucide-react';
import type { Gift } from '../types';

interface HomeProps {
  gifts: Gift[];
  onDelete: (id: string) => void;
}

export function Home({ gifts, onDelete }: HomeProps) {
  // Sort gifts by creation date, newest first
  const sortedGifts = [...gifts].sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Todos os Presentes</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
            Visão geral de todos os presentes cadastrados.
          </p>
        </div>
      </div>

      {sortedGifts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <GiftIcon size={32} />
          </div>
          <h2 className="empty-title">Nenhum presente na lista</h2>
          <p>Os presentes de Fernando e Giovanna aparecerão aqui.</p>
        </div>
      ) : (
        <div className="gifts-grid">
          {sortedGifts.map(gift => (
            <GiftCard 
              key={gift.id} 
              gift={gift} 
              onDelete={onDelete} 
              showOwner={true} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
