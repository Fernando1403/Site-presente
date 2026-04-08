import { Home, User as UserIcon, Gift } from 'lucide-react';
import type { User } from '../types';

interface SidebarProps {
  currentTab: 'Home' | User;
  onTabChange: (tab: 'Home' | User) => void;
}

export function Sidebar({ currentTab, onTabChange }: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <Gift className="text-blue-400" size={28} />
        <span>Presentes</span>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`nav-item ${currentTab === 'Home' ? 'active' : ''}`}
          onClick={() => onTabChange('Home')}
        >
          <Home size={20} />
          <span>Geral</span>
        </button>

        <button
          className={`nav-item ${currentTab === 'Fernando' ? 'active' : ''}`}
          onClick={() => onTabChange('Fernando')}
        >
          <UserIcon size={20} />
          <span>Fernando</span>
        </button>

        <button
          className={`nav-item ${currentTab === 'Giovanna' ? 'active' : ''}`}
          onClick={() => onTabChange('Giovanna')}
        >
          <UserIcon size={20} />
          <span>Giovanna</span>
        </button>
      </nav>
    </div>
  );
}
