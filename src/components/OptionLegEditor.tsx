import { OptionLeg } from '../data/strategies';

interface OptionLegEditorProps {
  legs: OptionLeg[];
  onUpdate: (legs: OptionLeg[]) => void;
  currentPrice: number;
  onPriceChange: (price: number) => void;
}

export default function OptionLegEditor({
  legs,
  onUpdate,
  currentPrice,
  onPriceChange,
}: OptionLegEditorProps) {
  const updateLeg = (index: number, updates: Partial<OptionLeg>) => {
    const newLegs = [...legs];
    newLegs[index] = { ...newLegs[index], ...updates };
    onUpdate(newLegs);
  };

  const removeLeg = (index: number) => {
    const newLegs = legs.filter((_, i) => i !== index);
    onUpdate(newLegs);
  };

  const addLeg = () => {
    const newLeg: OptionLeg = {
      type: 'call',
      direction: 'long',
      strike: currentPrice,
      price: 5,
      expiration: 30,
      quantity: 1,
    };
    onUpdate([...legs, newLeg]);
  };

  const addStockLeg = () => {
    const newLeg: OptionLeg = {
      type: 'stock',
      direction: 'long',
      price: currentPrice,
      quantity: 1,
    };
    onUpdate([...legs, newLeg]);
  };

  return (
    <div className="h-full flex flex-col bg-primary border-r border-gray-700">
      <div className="p-4 border-b border-gray-700 bg-surface/30">
        <h2 className="text-xl font-serif font-bold text-white mb-4">策略参数</h2>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            标的当前价格
          </label>
          <div className="flex items-center gap-2">
            <span className="text-gold font-mono text-lg">¥</span>
            <input
              type="text"
              value={currentPrice}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '') {
                  onPriceChange(0);
                } else {
                  const num = parseFloat(val);
                  onPriceChange(isNaN(num) ? currentPrice : num);
                }
              }}
              className="flex-1 px-3 py-2 bg-primary border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gold font-mono"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {legs.map((leg, index) => (
          <div key={index} className="bg-surface/30 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  leg.direction === 'long' ? 'bg-profit/20 text-profit' : 'bg-loss/20 text-loss'
                }`}>
                  {leg.direction === 'long' ? '买入' : '卖出'}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  leg.type === 'call' ? 'bg-blue-500/20 text-blue-400' :
                  leg.type === 'put' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {leg.type === 'call' ? '看涨期权' :
                   leg.type === 'put' ? '看跌期权' : '标的资产'}
                </span>
              </div>
              <button
                onClick={() => removeLeg(index)}
                className="text-gray-400 hover:text-loss transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {leg.type !== 'stock' && (
                <div>
                  <label className="block text-xs text-gray-400 mb-1">行权价</label>
                  <div className="relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gold text-xs">¥</span>
                    <input
                      type="text"
                      value={leg.strike}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '') {
                          updateLeg(index, { strike: 0 });
                        } else {
                          const num = parseFloat(val);
                          updateLeg(index, { strike: isNaN(num) ? leg.strike : num });
                        }
                      }}
                      className="w-full px-2 py-1.5 bg-primary border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-gold font-mono pl-5"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  {leg.type === 'stock' ? '成本价' : '期权价格'}
                </label>
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gold text-xs">¥</span>
                  <input
                    type="text"
                    value={leg.price}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '') {
                        updateLeg(index, { price: 0 });
                      } else {
                        const num = parseFloat(val);
                        updateLeg(index, { price: isNaN(num) ? leg.price : num });
                      }
                    }}
                    className="w-full px-2 py-1.5 bg-primary border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-gold font-mono pl-5"
                  />
                </div>
              </div>

              {leg.type !== 'stock' && (
                <div>
                  <label className="block text-xs text-gray-400 mb-1">到期天数</label>
                  <input
                    type="text"
                    value={leg.expiration}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '') {
                        updateLeg(index, { expiration: 0 });
                      } else {
                        const num = parseInt(val);
                        updateLeg(index, { expiration: isNaN(num) ? leg.expiration : num });
                      }
                    }}
                    className="w-full px-2 py-1.5 bg-primary border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-gold font-mono pl-5"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs text-gray-400 mb-1">数量</label>
                <input
                  type="text"
                  value={leg.quantity}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '') {
                      updateLeg(index, { quantity: 0 });
                    } else {
                      const num = parseInt(val);
                      updateLeg(index, { quantity: isNaN(num) ? leg.quantity : num });
                    }
                  }}
                  className="w-full px-2 py-1.5 bg-primary border border-gray-700 rounded text-white text-sm focus:outline-none focus:border-gold font-mono pl-5"
                />
              </div>
            </div>

            {(leg.type !== 'stock') && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => updateLeg(index, { type: leg.type === 'call' ? 'put' : 'call' })}
                  className="flex-1 py-1.5 text-xs bg-primary border border-gray-700 rounded text-gray-300 hover:border-gold hover:text-gold transition-colors"
                >
                  切换期权类型
                </button>
                <button
                  onClick={() => updateLeg(index, { direction: leg.direction === 'long' ? 'short' : 'long' })}
                  className="flex-1 py-1.5 text-xs bg-primary border border-gray-700 rounded text-gray-300 hover:border-gold hover:text-gold transition-colors"
                >
                  切换买卖方向
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-700 space-y-2">
        <button
          onClick={addLeg}
          className="w-full py-2.5 bg-gold text-primary font-bold rounded-lg hover:bg-gold/90 transition-colors"
        >
          + 添加期权腿
        </button>
        <button
          onClick={addStockLeg}
          className="w-full py-2.5 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-colors"
        >
          + 添加标的资产
        </button>
      </div>
    </div>
  );
}
