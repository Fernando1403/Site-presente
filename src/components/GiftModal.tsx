import { useState } from 'react';
import { X } from 'lucide-react';
import { GIFT_TYPES, PRIORITY_LABELS } from '../types';
import type { Gift, User, PriorityLevel } from '../types';

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (gift: Omit<Gift, 'id'>) => void;
  owner: User;
}

export function GiftModal({ isOpen, onClose, onSave, owner }: GiftModalProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState(GIFT_TYPES[0]);
  const [price, setPrice] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>(3);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newGiftData: Omit<Gift, 'id'> = {
      name,
      type,
      price: price || '0,00',
      priority,
      owner,
      createdAt: Date.now(),
    };

    onSave(newGiftData);
    
    // Reset form
    setName('');
    setType(GIFT_TYPES[0]);
    setPrice('');
    setPriority(3);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Adicionar Novo Presente</h2>
          <button onClick={onClose} className="close-button">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">O que é?</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="Ex: PlayStation 5, Camiseta Reserva..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tipo</label>
            <select
              className="form-input"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {GIFT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Preço (R$)</label>
            <input
              type="text"
              className="form-input"
              placeholder="Ex: 299,90"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <div className="flex justify-between" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label className="form-label">Prioridade</label>
              <span style={{ fontSize: '14px', fontWeight: 600, color: '#2563eb' }}>
                {PRIORITY_LABELS[priority]}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              className="priority-slider"
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value) as PriorityLevel)}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
              <span>Baixa</span>
              <span>Must-Have!</span>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Salvar Presente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
