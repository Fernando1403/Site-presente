import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { useGifts } from './hooks/useGifts';
import { Home } from './pages/Home';
import { UserTab } from './pages/UserTab';
import type { User } from './types';

type Tab = 'Home' | User;

function App() {
  const [currentTab, setCurrentTab] = useState<Tab>('Home');
  const { gifts, addGift, removeGift } = useGifts();

  const renderContent = () => {
    switch (currentTab) {
      case 'Home':
        return <Home gifts={gifts} onDelete={removeGift} />;
      case 'Fernando':
        return <UserTab user="Fernando" gifts={gifts} onAdd={addGift} onDelete={removeGift} />;
      case 'Giovanna':
        return <UserTab user="Giovanna" gifts={gifts} onAdd={addGift} onDelete={removeGift} />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
