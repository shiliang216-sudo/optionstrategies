import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import { generateChartData, getKeyMetrics, OptionLeg } from '../data/strategies';

interface PayoffChartProps {
  legs: OptionLeg[];
  currentPrice: number;
  strategyName?: string;
}

const getLegDescription = (leg: OptionLeg): string => {
  const direction = leg.direction === 'long' ? '买入' : '卖出';
  let type = '';
  if (leg.type === 'call') {
    type = '看涨期权';
  } else if (leg.type === 'put') {
    type = '看跌期权';
  } else {
    type = '标的资产';
  }
  if (leg.type !== 'stock' && leg.strike) {
    return `${direction}${type}(行权价${leg.strike})`;
  }
  return `${direction}${type}`;
};

const generateStrategyTitle = (legs: OptionLeg[]): string => {
  if (legs.length === 0) return '自定义策略';
  if (legs.length === 1) return getLegDescription(legs[0]);
  return legs.map(getLegDescription).join(' + ');
};

export default function PayoffChart({ legs, currentPrice, strategyName }: PayoffChartProps) {
  const chartData = generateChartData(legs, currentPrice);
  const metrics = getKeyMetrics(legs, currentPrice);
  const displayTitle = legs.length > 0 ? generateStrategyTitle(legs) : '自定义策略';

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const profit = payload[0].value;
      return (
        <div className="bg-primary border border-gray-700 rounded-lg p-3 shadow-xl">
          <p className="text-gray-300 text-sm mb-1">标的价格: ¥{payload[0].payload.x.toFixed(2)}</p>
          <p className={`text-lg font-bold font-mono ${profit >= 0 ? 'text-profit' : 'text-loss'}`}>
            {profit >= 0 ? '+' : ''}¥{profit.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full flex flex-col p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-serif font-bold text-white mb-2">{displayTitle}</h2>
        <div className="flex flex-wrap gap-3">
          <div className="bg-surface/50 px-4 py-2 rounded-lg border border-gray-700">
            <span className="text-gray-400 text-xs block mb-1">当前收益</span>
            <span className={`text-lg font-bold font-mono ${
              metrics.currentProfit >= 0 ? 'text-profit' : 'text-loss'
            }`}>
              {metrics.currentProfit >= 0 ? '+' : ''}¥{metrics.currentProfit.toFixed(2)}
            </span>
          </div>
          <div className="bg-surface/50 px-4 py-2 rounded-lg border border-gray-700">
            <span className="text-gray-400 text-xs block mb-1">最大盈利</span>
            <span className="text-lg font-bold font-mono text-profit">
              {metrics.maxProfit === Infinity ? '无限' : `¥${metrics.maxProfit.toFixed(2)}`}
            </span>
          </div>
          <div className="bg-surface/50 px-4 py-2 rounded-lg border border-gray-700">
            <span className="text-gray-400 text-xs block mb-1">最大亏损</span>
            <span className="text-lg font-bold font-mono text-loss">
              {metrics.maxLoss === -Infinity ? '无限' : `¥${metrics.maxLoss.toFixed(2)}`}
            </span>
          </div>
          {metrics.breakEvenPoints.length > 0 && (
            <div className="bg-surface/50 px-4 py-2 rounded-lg border border-gray-700">
              <span className="text-gray-400 text-xs block mb-1">盈亏平衡点</span>
              <span className="text-lg font-bold font-mono text-gold">
                ¥{metrics.breakEvenPoints.join(' / ¥')}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 bg-surface/30 rounded-2xl border border-gray-700 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
            <defs>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00ff88" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#00ff88" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff4757" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#ff4757" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="x"
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              domain={['auto', 'auto']}
              tickFormatter={(value) => `¥${value.toFixed(0)}`}
            />
            <YAxis
              stroke="#9CA3AF"
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              tickFormatter={(value) => `¥${value.toFixed(0)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0} stroke="#4B5563" strokeWidth={2} />
            <ReferenceLine x={currentPrice} stroke="#FFD700" strokeDasharray="5 5" label={{ position: 'top', value: '当前价格', fill: '#FFD700', fontSize: 12 }} />
            {metrics.breakEvenPoints.map((be, i) => (
              <ReferenceLine key={i} x={be} stroke="#9CA3AF" strokeDasharray="3 3" label={{ position: 'top', value: 'BEP', fill: '#9CA3AF', fontSize: 10 }} />
            ))}
            <Line
              type="monotone"
              dataKey="y"
              stroke={metrics.currentProfit >= 0 ? '#00ff88' : '#ff4757'}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#FFD700' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-surface/30 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-profit"></div>
            <span className="text-gray-400 text-sm">盈利区域</span>
          </div>
          <p className="text-white text-xs">曲线在0轴上方时获利</p>
        </div>
        <div className="bg-surface/30 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-loss"></div>
            <span className="text-gray-400 text-sm">亏损区域</span>
          </div>
          <p className="text-white text-xs">曲线在0轴下方时亏损</p>
        </div>
      </div>
    </div>
  );
}
