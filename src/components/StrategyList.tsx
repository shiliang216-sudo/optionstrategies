import { useState } from 'react';
import { strategies, Strategy, categories, Category } from '../data/strategies';

interface StrategyListProps {
  onSelect: (strategy: Strategy) => void;
  selectedId?: string;
}

const categoryColors: Record<Category, { bg: string; text: string; border: string; active: string }> = {
  '全部': { bg: 'bg-gray-700', text: 'text-gray-300', border: 'border-gray-600', active: 'bg-gray-600' },
  '看涨': { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/50', active: 'bg-blue-500' },
  '看跌': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/50', active: 'bg-red-500' },
  '震荡': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/50', active: 'bg-yellow-500' },
  '趋势': { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/50', active: 'bg-purple-500' },
  '日历': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/50', active: 'bg-green-500' },
};

export default function StrategyList({ onSelect, selectedId }: StrategyListProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('全部');

  const filteredStrategies = activeCategory === '全部'
    ? strategies
    : strategies.filter(s => s.category === activeCategory);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-xl font-serif font-bold text-white mb-1">策略构建器</h2>
        <p className="text-gray-400 text-sm">选择期权策略或自定义组合</p>
      </div>

      <div className="p-3 border-b border-gray-700 bg-surface/20">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => {
            const colors = categoryColors[category];
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? `${colors.bg} ${colors.text} border ${colors.border}`
                    : 'bg-primary/50 text-gray-400 border border-gray-700 hover:border-gray-500'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredStrategies.map(strategy => (
            <button
              key={strategy.id}
              onClick={() => onSelect(strategy)}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                selectedId === strategy.id
                  ? 'border-gold bg-gold/10 shadow-lg shadow-gold/20'
                  : 'border-gray-700 hover:border-gold/50 bg-surface/30 hover:bg-surface/50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold ${selectedId === strategy.id ? 'text-gold' : 'text-white'}`}>
                    {strategy.name}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{strategy.nameEn}</div>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                  strategy.category === '看涨' ? 'bg-blue-500/20 text-blue-400' :
                  strategy.category === '看跌' ? 'bg-red-500/20 text-red-400' :
                  strategy.category === '震荡' ? 'bg-yellow-500/20 text-yellow-400' :
                  strategy.category === '趋势' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {strategy.outlook}
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-2 line-clamp-2">
                {strategy.description}
              </div>
              <div className="flex gap-4 mt-2 text-xs">
                <span className="text-profit">盈利: {strategy.maxProfit}</span>
                <span className="text-loss">亏损: {strategy.maxLoss}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
