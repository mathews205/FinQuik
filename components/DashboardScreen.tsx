import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Calendar, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const DashboardScreen = () => {
  const [timeFilter, setTimeFilter] = useState('weekly');

  // Mock data for charts
  const weeklyData = [
    { name: 'Mon', sales: 400, expenses: 240 },
    { name: 'Tue', sales: 300, expenses: 139 },
    { name: 'Wed', sales: 200, expenses: 980 },
    { name: 'Thu', sales: 278, expenses: 390 },
    { name: 'Fri', sales: 189, expenses: 480 },
    { name: 'Sat', sales: 239, expenses: 380 },
    { name: 'Sun', sales: 349, expenses: 430 },
  ];

  const monthlyData = [
    { name: 'Week 1', sales: 2400, expenses: 1400 },
    { name: 'Week 2', sales: 1398, expenses: 2210 },
    { name: 'Week 3', sales: 9800, expenses: 2290 },
    { name: 'Week 4', sales: 3908, expenses: 2000 },
  ];

  const dailyData = [
    { name: '6 AM', sales: 100, expenses: 50 },
    { name: '12 PM', sales: 200, expenses: 100 },
    { name: '6 PM', sales: 150, expenses: 80 },
    { name: '11 PM', sales: 50, expenses: 30 },
  ];

  const pieData = [
    { name: 'Sales', value: 15420, color: '#E3EF26' },
    { name: 'Expenses', value: 8340, color: '#DDA15E' },
  ];

  const getChartData = () => {
    switch (timeFilter) {
      case 'daily': return dailyData;
      case 'weekly': return weeklyData;
      case 'monthly': return monthlyData;
      default: return weeklyData;
    }
  };

  const totalSales = 15420;
  const totalExpenses = 8340;
  const netBalance = totalSales - totalExpenses;

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-medium text-[#133215]">Dashboard</h1>
          <p className="text-sm text-[#666E51]">Financial Overview</p>
        </div>
        <Calendar className="w-6 h-6 text-[#768886]" />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-[#92B775]" />
            <span className="text-sm text-[#666E51]">Total Sales</span>
          </div>
          <div className="text-2xl font-medium text-[#133215]">
            ${totalSales.toLocaleString()}
          </div>
          <Badge className="bg-[#E3EF26] text-[#133215] hover:bg-[#E3EF26]">
            Sales
          </Badge>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-[#DDA15E]" />
            <span className="text-sm text-[#666E51]">Total Expenses</span>
          </div>
          <div className="text-2xl font-medium text-[#133215]">
            ${totalExpenses.toLocaleString()}
          </div>
          <Badge className="bg-[#DDA15E] text-white hover:bg-[#DDA15E]">
            Expenses
          </Badge>
        </div>
      </div>

      {/* Net Balance */}
      <div className="bg-gradient-to-r from-[#10383A] to-[#133215] rounded-2xl p-6 text-center">
        <p className="text-[#768886] mb-2">Net Balance</p>
        <div className="text-4xl font-medium text-white mb-2">
          ${netBalance.toLocaleString()}
        </div>
        <p className="text-[#92B775] text-sm">
          {netBalance > 0 ? '+' : ''}${(netBalance * 0.12).toFixed(2)} vs last month
        </p>
      </div>

      {/* Time Filter */}
      <div className="flex items-center gap-2 bg-white rounded-xl p-2">
        <Filter className="w-4 h-4 text-[#666E51]" />
        {['Daily', 'Weekly', 'Monthly'].map((filter) => (
          <Button
            key={filter}
            onClick={() => setTimeFilter(filter.toLowerCase())}
            className={`flex-1 rounded-lg py-2 px-3 text-sm ${
              timeFilter === filter.toLowerCase()
                ? 'bg-[#92B775] text-white hover:bg-[#809276]'
                : 'bg-transparent text-[#666E51] hover:bg-[#F3E8D3]'
            }`}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h3 className="text-lg font-medium text-[#133215] mb-4">
          {timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)} Overview
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getChartData()}>
              <XAxis 
                dataKey="name" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#666E51', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#666E51', fontSize: 12 }}
              />
              <Bar dataKey="sales" fill="#E3EF26" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="#DDA15E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#E3EF26] rounded"></div>
            <span className="text-sm text-[#666E51]">Sales</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#DDA15E] rounded"></div>
            <span className="text-sm text-[#666E51]">Expenses</span>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h3 className="text-lg font-medium text-[#133215] mb-4">Distribution</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6">
          {pieData.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-sm text-[#666E51]">
                {entry.name}: ${entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;