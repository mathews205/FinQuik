import React, { useState } from 'react';
import { Calculator, BarChart3, History, Plus, Minus } from 'lucide-react';
import CalculatorScreen from './components/CalculatorScreen';
import DashboardScreen from './components/DashboardScreen';
import HistoryScreen from './components/HistoryScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('calculator');

  const renderScreen = () => {
    switch (activeTab) {
      case 'calculator':
        return <CalculatorScreen />;
      case 'dashboard':
        return <DashboardScreen />;
      case 'history':
        return <HistoryScreen />;
      default:
        return <CalculatorScreen />;
    }
  };

  return (
    <div className="w-full max-w-[375px] mx-auto h-screen bg-[#F3E8D3] flex flex-col">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-[#10383A] p-4 flex justify-around items-center rounded-t-3xl">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
            activeTab === 'calculator' 
              ? 'bg-[#92B775] text-[#133215]' 
              : 'text-[#768886]'
          }`}
        >
          <Calculator size={24} />
          <span className="text-xs">Calculator</span>
        </button>
        
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
            activeTab === 'dashboard' 
              ? 'bg-[#92B775] text-[#133215]' 
              : 'text-[#768886]'
          }`}
        >
          <BarChart3 size={24} />
          <span className="text-xs">Dashboard</span>
        </button>
        
        <button
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
            activeTab === 'history' 
              ? 'bg-[#92B775] text-[#133215]' 
              : 'text-[#768886]'
          }`}
        >
          <History size={24} />
          <span className="text-xs">History</span>
        </button>
      </div>
    </div>
  );
}