import React, { useState } from 'react';
import { AlertTriangle, Plus, Minus, X, Divide, Equal } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const CalculatorScreen = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [note, setNote] = useState('');
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  // Mock recent transactions
  const recentTransactions = [
    { id: 1, amount: 250.00, type: 'sales', note: 'Product sale', date: '2025-01-26' },
    { id: 2, amount: 45.50, type: 'expense', note: 'Office supplies', date: '2025-01-25' },
    { id: 3, amount: 180.00, type: 'sales', note: 'Service fee', date: '2025-01-24' },
  ];

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleSave = (type) => {
    setShowSubscriptionModal(true);
  };

  const SubscriptionModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-[#DDA15E] mx-auto mb-4" />
          <h3 className="text-lg font-medium text-[#133215] mb-2">Subscription Required</h3>
          <p className="text-[#666E51] mb-6">Your subscription has expired. Renew to continue saving your records.</p>
          <div className="space-y-3">
            <Button 
              className="w-full bg-[#92B775] hover:bg-[#809276] text-white rounded-xl py-3"
              onClick={() => setShowSubscriptionModal(false)}
            >
              Renew Now
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-[#809276] text-[#666E51] rounded-xl py-3"
              onClick={() => setShowSubscriptionModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 space-y-6">
      {/* Subscription Banner */}
      <div className="bg-[#DDA15E] text-white p-3 rounded-xl flex items-center gap-2">
        <AlertTriangle size={20} />
        <div>
          <p className="text-sm font-medium">Subscription Expired</p>
          <p className="text-xs opacity-90">Expired: Jan 15, 2025</p>
        </div>
      </div>

      {/* Calculator Display */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="text-right text-3xl font-mono bg-[#F3E8D3] rounded-xl p-4 mb-4 border">
          {display}
        </div>

        {/* Calculator Buttons */}
        <div className="grid grid-cols-4 gap-3">
          <Button 
            className="col-span-2 bg-[#768886] hover:bg-[#666E51] text-white rounded-xl py-3"
            onClick={clearAll}
          >
            AC
          </Button>
          <Button 
            className="bg-[#DAA112] hover:bg-[#809276] text-white rounded-xl py-3"
            onClick={() => inputOperation('÷')}
          >
            <Divide size={20} />
          </Button>
          <Button 
            className="bg-[#DAA112] hover:bg-[#809276] text-white rounded-xl py-3"
            onClick={() => inputOperation('×')}
          >
            <X size={20} />
          </Button>

          {[7, 8, 9].map(num => (
            <Button 
              key={num}
              className="bg-[#10383A] hover:bg-[#133215] text-white rounded-xl py-3"
              onClick={() => inputNumber(num)}
            >
              {num}
            </Button>
          ))}
          <Button 
            className="bg-[#DAA112] hover:bg-[#809276] text-white rounded-xl py-3"
            onClick={() => inputOperation('-')}
          >
            <Minus size={20} />
          </Button>

          {[4, 5, 6].map(num => (
            <Button 
              key={num}
              className="bg-[#10383A] hover:bg-[#133215] text-white rounded-xl py-3"
              onClick={() => inputNumber(num)}
            >
              {num}
            </Button>
          ))}
          <Button 
            className="bg-[#DAA112] hover:bg-[#809276] text-white rounded-xl py-3"
            onClick={() => inputOperation('+')}
          >
            <Plus size={20} />
          </Button>

          {[1, 2, 3].map(num => (
            <Button 
              key={num}
              className="bg-[#10383A] hover:bg-[#133215] text-white rounded-xl py-3"
              onClick={() => inputNumber(num)}
            >
              {num}
            </Button>
          ))}
          <Button 
            className="row-span-2 bg-[#92B775] hover:bg-[#809276] text-white rounded-xl py-3"
            onClick={performCalculation}
          >
            <Equal size={20} />
          </Button>

          <Button 
            className="col-span-2 bg-[#10383A] hover:bg-[#133215] text-white rounded-xl py-3"
            onClick={() => inputNumber(0)}
          >
            0
          </Button>
          <Button 
            className="bg-[#10383A] hover:bg-[#133215] text-white rounded-xl py-3"
            onClick={() => setDisplay(display.includes('.') ? display : display + '.')}
          >
            .
          </Button>
        </div>
      </div>

      {/* Note Input */}
      <div className="space-y-3">
        <Input
          placeholder="Add a note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="rounded-xl p-4 bg-white border-[#809276]"
        />

        {/* Save Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            className="bg-gray-300 text-gray-500 rounded-xl py-4 cursor-not-allowed"
            disabled
            onClick={() => handleSave('sales')}
          >
            Save as Sales
          </Button>
          <Button 
            className="bg-gray-300 text-gray-500 rounded-xl py-4 cursor-not-allowed"
            disabled
            onClick={() => handleSave('expense')}
          >
            Save as Expense
          </Button>
        </div>
        
        <p className="text-center text-xs text-[#666E51]">
          Your subscription has ended. Please renew to enable saving.
        </p>
      </div>

      {/* Recent Transactions Preview */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h3 className="font-medium text-[#133215] mb-3">Recent Transactions</h3>
        <div className="space-y-2">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex justify-between items-center p-2 bg-[#F3E8D3] rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-[#133215]">
                    ${transaction.amount.toFixed(2)}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    transaction.type === 'sales' 
                      ? 'bg-[#E3EF26] text-[#133215]' 
                      : 'bg-[#DDA15E] text-white'
                  }`}>
                    {transaction.type}
                  </span>
                </div>
                <p className="text-xs text-[#666E51]">{transaction.note}</p>
              </div>
              <span className="text-xs text-[#768886]">{transaction.date}</span>
            </div>
          ))}
        </div>
      </div>

      {showSubscriptionModal && <SubscriptionModal />}
    </div>
  );
};

export default CalculatorScreen;