import { Trash2 } from 'lucide-react';
import { PRIORITY_LABELS } from '../types';
import type { Gift } from '../types';

interface GiftCardProps {
  gift: Gift;
  onDelete: (id: string) => void;
  showOwner?: boolean;
}

export function GiftCard({ gift, onDelete, showOwner = true }: GiftCardProps) {
  // Convert priority to percentage for the bar (1 to 5 mapping to 20% to 100%)
  const priorityPercent = (gift.priority / 5) * 100;
  
  // Colors for different priorities
  const getPriorityColor = () => {
    switch (gift.priority) {
      case 1: return '#10b981'; // Green
      case 2: return '#3b82f6'; // Blue
      case 3: return '#f59e0b'; // Yellow
      case 4: return '#ef4444'; // Red
      case 5: return '#8b5cf6'; // Purple (Must-Have)
      default: return '#cbd5e1';
    }
  };

  return (
    <div className="gift-card">
      <div className="gift-header">
        <div>
          <h3 className="gift-title">{gift.name}</h3>
          {showOwner && (
            <div className="gift-owner">
              Adicionado por: 
              <span className={`owner-badge owner-${gift.owner.toLowerCase()}`}>
                {gift.owner}
              </span>
            </div>
          )}
        </div>
        <button 
          onClick={() => onDelete(gift.id)}
          className="text-slate-400 hover:text-red-500 transition-colors"
          title="Excluir presente"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div>
        <span className="gift-type-badge">{gift.type}</span>
      </div>

      <div className="gift-price">
        R$ {gift.price}
      </div>

      <div className="priority-container">
        <div className="priority-header">
          <span>Prioridade</span>
          <span style={{ color: getPriorityColor(), fontWeight: 600 }}>
            {PRIORITY_LABELS[gift.priority]}
          </span>
        </div>
        <div className="priority-bar-bg">
          <div 
            className="priority-bar-fill" 
            style={{ 
              width: `${priorityPercent}%`,
              backgroundColor: getPriorityColor() 
            }}
          />
        </div>
      </div>
    </div>
  );
}
