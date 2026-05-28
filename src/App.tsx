import { useState } from 'react';
import StrategyList from './components/StrategyList';
import OptionLegEditor from './components/OptionLegEditor';
import PayoffChart from './components/PayoffChart';
import { strategies, Strategy, OptionLeg } from './data/strategies';

export default function App() {
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy>(strategies[0]);
  const [legs, setLegs] = useState<OptionLeg[]>(strategies[0].defaultLegs);
  const [currentPrice, setCurrentPrice] = useState(100);
  const [showStrategyList, setShowStrategyList] = useState(true);

  const handleSelectStrategy = (strategy: Strategy) => {
    setSelectedStrategy(strategy);
    setLegs([...strategy.defaultLegs]);
  };

  return (
    <div className="h-screen bg-primary flex flex-col">
      <header className="h-14 bg-surface border-b border-gray-700 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-serif font-bold text-white">
            <span className="text-gold">期权</span>策略构建器
          </h1>
        </div>
        <button
          onClick={() => setShowStrategyList(!showStrategyList)}
          className="md:hidden px-3 py-1.5 bg-accent text-white rounded-lg text-sm"
        >
          {showStrategyList ? '隐藏策略' : '选择策略'}
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {showStrategyList && (
          <div className="w-72 md:w-80 bg-surface border-r border-gray-700 flex-shrink-0 hidden md:block">
            <StrategyList
              onSelect={handleSelectStrategy}
              selectedId={selectedStrategy.id}
            />
          </div>
        )}

        <div className="w-96 md:w-[28rem] bg-primary border-r border-gray-700 flex-shrink-0">
          <OptionLegEditor
            legs={legs}
            onUpdate={setLegs}
            currentPrice={currentPrice}
            onPriceChange={setCurrentPrice}
          />
        </div>

        <div className="flex-1 bg-secondary">
          <PayoffChart
            legs={legs}
            currentPrice={currentPrice}
            strategyName={selectedStrategy?.name}
          />
        </div>
      </div>

      {showStrategyList && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setShowStrategyList(false)}>
          <div className="w-80 h-full bg-surface" onClick={e => e.stopPropagation()}>
            <StrategyList
              onSelect={(s) => {
                handleSelectStrategy(s);
                setShowStrategyList(false);
              }}
              selectedId={selectedStrategy.id}
            />
          </div>
        </div>
      )}
    </div>
  );
}
