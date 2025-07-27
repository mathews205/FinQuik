import React, { useState } from 'react';
import { Filter, ArrowUpDown, Download, Edit2, Trash2, Search, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const HistoryScreen = () => {
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');

  // Mock transaction data
  const allTransactions = [
    { id: 1, amount: 1250.00, type: 'sales', note: 'Website development project', date: '2025-01-26', time: '14:30' },
    { id: 2, amount: 85.50, type: 'expense', note: 'Office supplies purchase', date: '2025-01-26', time: '10:15' },
    { id: 3, amount: 450.00, type: 'sales', note: 'Consulting services', date: '2025-01-25', time: '16:45' },
    { id: 4, amount: 200.00, type: 'expense', note: 'Software subscription', date: '2025-01-25', time: '09:00' },
    { id: 5, amount: 750.00, type: 'sales', note: 'Product sales commission', date: '2025-01-24', time: '11:20' },
    { id: 6, amount: 35.75, type: 'expense', note: 'Transportation', date: '2025-01-24', time: '08:30' },
    { id: 7, amount: 320.00, type: 'sales', note: 'Freelance design work', date: '2025-01-23', time: '15:00' },
    { id: 8, amount: 125.00, type: 'expense', note: 'Client meeting lunch', date: '2025-01-23', time: '12:30' },
    { id: 9, amount: 890.00, type: 'sales', note: 'Mobile app development', date: '2025-01-22', time: '17:15' },
    { id: 10, amount: 65.00, type: 'expense', note: 'Parking fees', date: '2025-01-22', time: '08:45' },
  ];

  const filterTransactions = () => {
    let filtered = allTransactions;

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(t => t.type === typeFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.amount.toString().includes(searchTerm)
      );
    }

    // Filter by date (simplified - showing last 7 days vs all)
    if (dateFilter === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      filtered = filtered.filter(t => new Date(t.date) >= weekAgo);
    }

    // Sort by amount or date
    filtered.sort((a, b) => {
      if (sortOrder === 'desc') {
        return b.amount - a.amount;
      } else {
        return a.amount - b.amount;
      }
    });

    return filtered;
  };

  const filteredTransactions = filterTransactions();

  const handleExport = () => {
    // Mock export functionality
    alert('Exporting transactions to Excel... (Mock functionality)');
  };

  const handleEdit = (id) => {
    alert(`Edit transaction ${id} (Mock functionality)`);
  };

  const handleDelete = (id) => {
    alert(`Delete transaction ${id} (Mock functionality)`);
  };

  const totalSales = filteredTransactions
    .filter(t => t.type === 'sales')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-medium text-[#133215]">Transaction History</h1>
          <p className="text-sm text-[#666E51]">{filteredTransactions.length} transactions</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <p className="text-xs text-[#666E51]">Filtered Sales</p>
          <p className="text-lg font-medium text-[#133215]">${totalSales.toFixed(2)}</p>
          <Badge className="bg-[#E3EF26] text-[#133215] hover:bg-[#E3EF26] text-xs">
            Sales
          </Badge>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <p className="text-xs text-[#666E51]">Filtered Expenses</p>
          <p className="text-lg font-medium text-[#133215]">${totalExpenses.toFixed(2)}</p>
          <Badge className="bg-[#DDA15E] text-white hover:bg-[#DDA15E] text-xs">
            Expenses
          </Badge>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#666E51]" />
        <Input
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 rounded-xl bg-white border-[#809276]"
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-[#666E51]" />
          <span className="text-sm font-medium text-[#133215]">Filters</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-[#666E51] mb-1 block">Type</label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="rounded-lg border-[#809276]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="expense">Expenses</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-xs text-[#666E51] mb-1 block">Date Range</label>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="rounded-lg border-[#809276]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
          className="w-full bg-[#768886] hover:bg-[#666E51] text-white rounded-lg py-2 flex items-center justify-center gap-2"
        >
          <ArrowUpDown size={16} />
          Sort by Amount ({sortOrder === 'desc' ? 'High to Low' : 'Low to High'})
        </Button>
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {filteredTransactions.map((transaction) => (
          <div key={transaction.id} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-medium text-[#133215]">
                    ${transaction.amount.toFixed(2)}
                  </span>
                  <Badge className={`text-xs ${
                    transaction.type === 'sales' 
                      ? 'bg-[#E3EF26] text-[#133215] hover:bg-[#E3EF26]' 
                      : 'bg-[#DDA15E] text-white hover:bg-[#DDA15E]'
                  }`}>
                    {transaction.type}
                  </Badge>
                </div>
                <p className="text-sm text-[#666E51] mb-1">{transaction.note}</p>
                <div className="flex items-center gap-2 text-xs text-[#768886]">
                  <Calendar size={12} />
                  <span>{transaction.date} at {transaction.time}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleEdit(transaction.id)}
                  className="p-2 bg-[#92B775] hover:bg-[#809276] text-white rounded-lg"
                >
                  <Edit2 size={14} />
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDelete(transaction.id)}
                  className="p-2 bg-[#DDA15E] hover:bg-[#DAA112] text-white rounded-lg"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Export Button */}
      <div className="sticky bottom-4">
        <Button
          onClick={handleExport}
          className="w-full bg-[#10383A] hover:bg-[#133215] text-white rounded-xl py-4 flex items-center justify-center gap-2 shadow-lg"
        >
          <Download size={20} />
          Download as Excel
        </Button>
      </div>
    </div>
  );
};

export default HistoryScreen;