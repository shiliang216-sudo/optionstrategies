export interface OptionLeg {
  type: 'call' | 'put' | 'stock';
  direction: 'long' | 'short';
  strike?: number;
  price: number;
  expiration?: number;
  quantity: number;
}

export interface Strategy {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  outlook: string;
  description: string;
  maxProfit: string;
  maxLoss: string;
  defaultLegs: OptionLeg[];
}

export const strategies: Strategy[] = [
  // ========== 看涨类 ==========
  {
    id: 'long-call',
    name: '买入看涨期权',
    nameEn: 'Long Call',
    category: '看涨',
    outlook: '看涨',
    description: '预期标的将上涨时使用。',
    maxProfit: '无限',
    maxLoss: '有限（权利金）',
    defaultLegs: [
      { type: 'call', direction: 'long', strike: 100, price: 5, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'short-put',
    name: '卖出看跌期权',
    nameEn: 'Short Put',
    category: '看涨',
    outlook: '看涨/中性',
    description: '预期标的不会大跌或将上涨。',
    maxProfit: '有限（权利金）',
    maxLoss: '标的下跌至0的损失',
    defaultLegs: [
      { type: 'put', direction: 'short', strike: 95, price: 3, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'covered-call',
    name: '备兑看涨',
    nameEn: 'Covered Call',
    category: '看涨',
    outlook: '温和看涨/中性',
    description: '持有标的且预期温和上涨或盘整，希望获取额外权利金收入。',
    maxProfit: '有限（行权价-买入价+权利金）',
    maxLoss: '标的下跌损失（减权利金）',
    defaultLegs: [
      { type: 'stock', direction: 'long', price: 100, quantity: 1 },
      { type: 'call', direction: 'short', strike: 105, price: 3, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'bull-call-spread',
    name: '看涨牛市价差',
    nameEn: 'Bull Call Spread',
    category: '看涨',
    outlook: '温和看涨',
    description: '预期标的温和上涨。',
    maxProfit: '有限（价差-净权利金）',
    maxLoss: '有限（净权利金）',
    defaultLegs: [
      { type: 'call', direction: 'long', strike: 95, price: 8, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'short', strike: 105, price: 3, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'bull-put-spread',
    name: '看跌牛市价差',
    nameEn: 'Bull Put Spread',
    category: '看涨',
    outlook: '温和看涨/中性',
    description: '预期标的温和上涨或持平。',
    maxProfit: '有限（净权利金）',
    maxLoss: '有限（价差-净权利金）',
    defaultLegs: [
      { type: 'put', direction: 'short', strike: 95, price: 3, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'long', strike: 85, price: 1, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'synthetic-put',
    name: '合成看跌期权',
    nameEn: 'Synthetic Put',
    category: '看涨',
    outlook: '看跌保护',
    description: '预期标的下跌，但希望限制上涨风险。相当于持有标的并买入看跌期权。',
    maxProfit: '标的下跌收益 + 期权盈利',
    maxLoss: '有限（权利金）',
    defaultLegs: [
      { type: 'stock', direction: 'long', price: 100, quantity: 1 },
      { type: 'put', direction: 'long', strike: 95, price: 3, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'long-combo',
    name: '做多组合',
    nameEn: 'Long Combo',
    category: '看涨',
    outlook: '看涨',
    description: '看好标的，类似合成做多但行权价不同。',
    maxProfit: '无限',
    maxLoss: '标的下跌损失 + 净权利金',
    defaultLegs: [
      { type: 'stock', direction: 'long', price: 100, quantity: 1 },
      { type: 'call', direction: 'long', strike: 105, price: 3, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'long-synthetic-future',
    name: '合成做多期货',
    nameEn: 'Long Synthetic Future',
    category: '看涨',
    outlook: '看涨',
    description: '看好标的但不想投入大量资金直接买入。',
    maxProfit: '无限',
    maxLoss: '有限',
    defaultLegs: [
      { type: 'call', direction: 'long', strike: 100, price: 5, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'short', strike: 100, price: 5, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'ratio-call-spread',
    name: '看涨期权比率价差',
    nameEn: 'Ratio Call Spread',
    category: '看涨',
    outlook: '温和看涨',
    description: '预期标的温和上涨但不会大涨。',
    maxProfit: '有限（在中间行权价处）',
    maxLoss: '无限（大幅上涨）',
    defaultLegs: [
      { type: 'call', direction: 'long', strike: 95, price: 8, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'short', strike: 105, price: 3, expiration: 30, quantity: 2 },
    ],
  },
  {
    id: 'call-ratio-backspread',
    name: '看涨期权比率反向价差',
    nameEn: 'Call Ratio Backspread',
    category: '看涨',
    outlook: '大幅看涨',
    description: '预期标的将大幅上涨。',
    maxProfit: '无限（大幅上涨）',
    maxLoss: '有限（净权利金或小幅亏损）',
    defaultLegs: [
      { type: 'call', direction: 'short', strike: 95, price: 8, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'long', strike: 105, price: 3, expiration: 30, quantity: 2 },
    ],
  },
  {
    id: 'long-stock',
    name: '买入标的',
    nameEn: 'Long Stock',
    category: '看涨',
    outlook: '看涨',
    description: '看好标的长期或短期表现。',
    maxProfit: '无限',
    maxLoss: '标的下跌至0',
    defaultLegs: [
      { type: 'stock', direction: 'long', price: 100, quantity: 1 },
    ],
  },
  // ========== 看涨领子策略 ==========
  {
    id: 'fence-bull',
    name: '看涨领子策略',
    nameEn: 'Bull Fence',
    category: '看涨',
    outlook: '温和看涨',
    description: '卖出低行权价看跌收取权利金，同时买入高行权价看涨保护上涨。',
    maxProfit: '无限（高于高行权价时持续上涨）',
    maxLoss: '有限（低于低行权价时亏损）',
    defaultLegs: [
      { type: 'put', direction: 'short', strike: 95, price: 3, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'long', strike: 105, price: 3, expiration: 30, quantity: 1 },
    ],
  },
  // ========== 看涨海鸥期权 ==========
  {
    id: 'seagull-bull',
    name: '看涨海鸥期权',
    nameEn: 'Bull Seagull',
    category: '看涨',
    outlook: '温和看涨/震荡',
    description: '买入中间行权价看涨，同时卖出低行权价看跌和高行权价看涨，构建低成本看多。',
    maxProfit: '有限（高行权价-中间行权价）',
    maxLoss: '有限（中间行权价-低行权价）',
    defaultLegs: [
      { type: 'put', direction: 'short', strike: 90, price: 2, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'long', strike: 100, price: 5, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'short', strike: 110, price: 3, expiration: 30, quantity: 1 },
    ],
  },

  // ========== 看跌类 ==========
  {
    id: 'long-put',
    name: '买入看跌期权',
    nameEn: 'Long Put',
    category: '看跌',
    outlook: '看跌',
    description: '预期标的将下跌时使用。',
    maxProfit: '标的下跌至0的收益',
    maxLoss: '有限（权利金）',
    defaultLegs: [
      { type: 'put', direction: 'long', strike: 100, price: 5, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'short-call',
    name: '卖出看涨期权',
    nameEn: 'Short Call',
    category: '看跌',
    outlook: '看跌/中性',
    description: '预期标的不会大涨或将下跌。',
    maxProfit: '有限（权利金）',
    maxLoss: '无限',
    defaultLegs: [
      { type: 'call', direction: 'short', strike: 105, price: 3, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'bear-put-spread',
    name: '看跌熊市价差',
    nameEn: 'Bear Put Spread',
    category: '看跌',
    outlook: '温和看跌',
    description: '预期标的温和下跌。',
    maxProfit: '有限（价差-净权利金）',
    maxLoss: '有限（净权利金）',
    defaultLegs: [
      { type: 'put', direction: 'long', strike: 105, price: 8, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'short', strike: 95, price: 3, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'bear-call-spread',
    name: '看涨熊市价差',
    nameEn: 'Bear Call Spread',
    category: '看跌',
    outlook: '温和看跌/中性',
    description: '预期标的温和下跌或持平。',
    maxProfit: '有限（净权利金）',
    maxLoss: '有限（价差-净权利金）',
    defaultLegs: [
      { type: 'call', direction: 'short', strike: 105, price: 3, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'long', strike: 115, price: 1, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'short-synthetic-future',
    name: '合成做空期货',
    nameEn: 'Short Synthetic Future',
    category: '看跌',
    outlook: '看跌',
    description: '看空标的但做空标的不方便或成本高。',
    maxProfit: '有限',
    maxLoss: '无限',
    defaultLegs: [
      { type: 'put', direction: 'long', strike: 100, price: 5, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'short', strike: 100, price: 5, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'short-combo',
    name: '做空组合',
    nameEn: 'Short Combo',
    category: '看跌',
    outlook: '看跌',
    description: '看空标的，类似合成做空但行权价不同。',
    maxProfit: '标的下跌收益 + 净权利金',
    maxLoss: '无限（大幅上涨）',
    defaultLegs: [
      { type: 'stock', direction: 'short', price: 100, quantity: 1 },
      { type: 'put', direction: 'short', strike: 95, price: 3, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'ratio-put-spread',
    name: '看跌期权比率价差',
    nameEn: 'Ratio Put Spread',
    category: '看跌',
    outlook: '温和看跌',
    description: '预期标的温和下跌但不会大跌。',
    maxProfit: '有限（在中间行权价处）',
    maxLoss: '标的下跌至0的损失',
    defaultLegs: [
      { type: 'put', direction: 'long', strike: 105, price: 8, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'short', strike: 95, price: 3, expiration: 30, quantity: 2 },
    ],
  },
  {
    id: 'put-ratio-backspread',
    name: '看跌期权比率反向价差',
    nameEn: 'Put Ratio Backspread',
    category: '看跌',
    outlook: '大幅看跌',
    description: '预期标的将大幅下跌。',
    maxProfit: '标的下跌至0的收益',
    maxLoss: '有限（净权利金或小幅亏损）',
    defaultLegs: [
      { type: 'put', direction: 'short', strike: 105, price: 8, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'long', strike: 95, price: 3, expiration: 30, quantity: 2 },
    ],
  },
  {
    id: 'short-stock',
    name: '卖出标的',
    nameEn: 'Short Stock',
    category: '看跌',
    outlook: '看跌',
    description: '看空标的，预期下跌。',
    maxProfit: '标的下跌至0的收益',
    maxLoss: '无限（标的上涨）',
    defaultLegs: [
      { type: 'stock', direction: 'short', price: 100, quantity: 1 },
    ],
  },
  // ========== 看跌领口策略 ==========
  {
    id: 'collar-short',
    name: '看跌领口策略',
    nameEn: 'Short Collar',
    category: '看跌',
    outlook: '温和看跌/风险保护',
    description: '已卖空标的，希望低成本保护上涨风险。',
    maxProfit: '有限（持有价-下行保护价+净权利金）',
    maxLoss: '有限（上行保护价-持有价-净权利金）',
    defaultLegs: [
      { type: 'stock', direction: 'short', price: 100, quantity: 1 },
      { type: 'call', direction: 'long', strike: 110, price: 3, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'short', strike: 90, price: 3, expiration: 30, quantity: 1 },
    ],
  },
  // ========== 看跌领子策略 ==========
  {
    id: 'fence-bear',
    name: '看跌领子策略',
    nameEn: 'Bear Fence',
    category: '看跌',
    outlook: '温和看跌',
    description: '卖出高行权价看涨收取权利金，同时买入低行权价看跌保护下跌。',
    maxProfit: '无限（低于低行权价时持续下跌）',
    maxLoss: '有限（高于高行权价时亏损）',
    defaultLegs: [
      { type: 'call', direction: 'short', strike: 105, price: 3, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'long', strike: 95, price: 3, expiration: 30, quantity: 1 },
    ],
  },
  // ========== 看跌海鸥期权 ==========
  {
    id: 'seagull-bear',
    name: '看跌海鸥期权',
    nameEn: 'Bear Seagull',
    category: '看跌',
    outlook: '温和看跌/震荡',
    description: '买入中间行权价看跌，同时卖出低行权价看跌和高行权价看涨，构建低成本看空。',
    maxProfit: '有限（中间行权价-低行权价）',
    maxLoss: '有限（高行权价-中间行权价）',
    defaultLegs: [
      { type: 'put', direction: 'short', strike: 90, price: 3, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'long', strike: 100, price: 5, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'short', strike: 110, price: 2, expiration: 30, quantity: 1 },
    ],
  },

  // ========== 震荡类 ==========
  {
    id: 'short-straddle',
    name: '卖出跨式期权',
    nameEn: 'Short Straddle',
    category: '震荡',
    outlook: '震荡',
    description: '预期标的将在窄幅区间波动。',
    maxProfit: '有限（总权利金）',
    maxLoss: '无限（大幅波动）',
    defaultLegs: [
      { type: 'call', direction: 'short', strike: 100, price: 5, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'short', strike: 100, price: 5, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'short-strangle',
    name: '卖出宽跨式期权',
    nameEn: 'Short Strangle',
    category: '震荡',
    outlook: '震荡',
    description: '预期标的在较宽区间内波动。',
    maxProfit: '有限（总权利金）',
    maxLoss: '无限（大幅波动）',
    defaultLegs: [
      { type: 'call', direction: 'short', strike: 110, price: 2, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'short', strike: 90, price: 2, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'iron-butterfly',
    name: '铁蝶式期权',
    nameEn: 'Iron Butterfly',
    category: '震荡',
    outlook: '震荡',
    description: '预期标的在狭窄区间波动。',
    maxProfit: '有限（净权利金）',
    maxLoss: '有限（价差-净权利金）',
    defaultLegs: [
      { type: 'call', direction: 'short', strike: 100, price: 5, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'long', strike: 105, price: 2, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'short', strike: 100, price: 5, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'long', strike: 95, price: 2, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'iron-condor',
    name: '铁鹰式期权',
    nameEn: 'Iron Condor',
    category: '震荡',
    outlook: '震荡',
    description: '预期标的在较宽区间内波动。',
    maxProfit: '有限（净权利金）',
    maxLoss: '有限（价差-净权利金）',
    defaultLegs: [
      { type: 'call', direction: 'short', strike: 110, price: 2, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'long', strike: 115, price: 1, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'short', strike: 90, price: 2, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'long', strike: 85, price: 1, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'long-call-condor',
    name: '看涨期权鹰式价差',
    nameEn: 'Long Call Condor',
    category: '震荡',
    outlook: '震荡',
    description: '预期标的在中间区间波动。',
    maxProfit: '有限（净权利金）',
    maxLoss: '有限（价差-净权利金）',
    defaultLegs: [
      { type: 'call', direction: 'long', strike: 90, price: 8, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'short', strike: 95, price: 5, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'short', strike: 105, price: 3, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'long', strike: 110, price: 1, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'long-put-condor',
    name: '看跌期权鹰式价差',
    nameEn: 'Long Put Condor',
    category: '震荡',
    outlook: '震荡',
    description: '预期标的在中间区间波动。',
    maxProfit: '有限（净权利金）',
    maxLoss: '有限（价差-净权利金）',
    defaultLegs: [
      { type: 'put', direction: 'long', strike: 110, price: 8, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'short', strike: 105, price: 5, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'short', strike: 95, price: 3, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'long', strike: 90, price: 1, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'bull-call-ladder',
    name: '看涨牛市期权阶梯',
    nameEn: 'Bull Call Ladder',
    category: '震荡',
    outlook: '温和看涨',
    description: '预期标的温和上涨但不会大涨。',
    maxProfit: '有限',
    maxLoss: '有限（大幅上涨时锁定）',
    defaultLegs: [
      { type: 'call', direction: 'long', strike: 95, price: 8, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'short', strike: 100, price: 5, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'short', strike: 110, price: 2, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'bear-put-ladder',
    name: '看跌熊市期权阶梯',
    nameEn: 'Bear Put Ladder',
    category: '震荡',
    outlook: '温和看跌',
    description: '预期标的温和下跌但不会大跌。',
    maxProfit: '有限',
    maxLoss: '有限（大幅下跌时锁定）',
    defaultLegs: [
      { type: 'put', direction: 'long', strike: 105, price: 8, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'short', strike: 100, price: 5, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'short', strike: 90, price: 2, expiration: 30, quantity: 1 },
    ],
  },

  // ========== 趋势类 ==========
  {
    id: 'long-straddle',
    name: '买入跨式期权',
    nameEn: 'Long Straddle',
    category: '趋势',
    outlook: '大幅波动',
    description: '预期标的将大幅波动，但方向不确定。',
    maxProfit: '无限（单边大幅波动）',
    maxLoss: '有限（总权利金）',
    defaultLegs: [
      { type: 'call', direction: 'long', strike: 100, price: 5, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'long', strike: 100, price: 5, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'long-strangle',
    name: '买入宽跨式期权',
    nameEn: 'Long Strangle',
    category: '趋势',
    outlook: '大幅波动',
    description: '预期标的将大幅波动，但方向不确定。成本较低。',
    maxProfit: '无限（单边大幅波动）',
    maxLoss: '有限（总权利金）',
    defaultLegs: [
      { type: 'call', direction: 'long', strike: 110, price: 2, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'long', strike: 90, price: 2, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'strap',
    name: '双倍看涨跨式',
    nameEn: 'Strap',
    category: '趋势',
    outlook: '趋势看涨',
    description: '预期标的将大幅波动，但更可能上涨。',
    maxProfit: '无限（上涨时更多）',
    maxLoss: '有限（总权利金×2）',
    defaultLegs: [
      { type: 'call', direction: 'long', strike: 100, price: 5, expiration: 30, quantity: 2 },
      { type: 'put', direction: 'long', strike: 100, price: 5, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'strip',
    name: '双倍看跌跨式',
    nameEn: 'Strip',
    category: '趋势',
    outlook: '趋势看跌',
    description: '预期标的将大幅波动，但更可能下跌。',
    maxProfit: '无限（下跌时更多）',
    maxLoss: '有限（总权利金×2）',
    defaultLegs: [
      { type: 'call', direction: 'long', strike: 100, price: 5, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'long', strike: 100, price: 5, expiration: 30, quantity: 2 },
    ],
  },
  {
    id: 'short-call-butterfly',
    name: '反向看涨期权蝶式',
    nameEn: 'Short Call Butterfly',
    category: '趋势',
    outlook: '大幅波动',
    description: '预期标的将大幅波动。',
    maxProfit: '有限（价差-净权利金）',
    maxLoss: '有限',
    defaultLegs: [
      { type: 'call', direction: 'short', strike: 100, price: 5, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'long', strike: 95, price: 8, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'long', strike: 105, price: 2, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'short-put-butterfly',
    name: '反向看跌期权蝶式',
    nameEn: 'Short Put Butterfly',
    category: '趋势',
    outlook: '大幅波动',
    description: '预期标的将大幅波动。',
    maxProfit: '有限（价差-净权利金）',
    maxLoss: '有限',
    defaultLegs: [
      { type: 'put', direction: 'short', strike: 100, price: 5, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'long', strike: 105, price: 8, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'long', strike: 95, price: 2, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'bear-call-ladder',
    name: '看涨熊市期权阶梯',
    nameEn: 'Bear Call Ladder',
    category: '趋势',
    outlook: '下跌或大涨',
    description: '预期标的下跌或大涨。',
    maxProfit: '有限（下跌有限，大涨无限）',
    maxLoss: '有限',
    defaultLegs: [
      { type: 'call', direction: 'short', strike: 95, price: 8, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'long', strike: 100, price: 5, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'short', strike: 110, price: 2, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'bull-put-ladder',
    name: '看跌牛市期权阶梯',
    nameEn: 'Bull Put Ladder',
    category: '趋势',
    outlook: '上涨或大跌',
    description: '预期标的上涨或大跌。',
    maxProfit: '有限（上涨有限，大跌无限）',
    maxLoss: '有限',
    defaultLegs: [
      { type: 'put', direction: 'short', strike: 105, price: 8, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'long', strike: 100, price: 5, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'short', strike: 90, price: 2, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'short-call-condor',
    name: '反向看涨期权鹰式',
    nameEn: 'Short Call Condor',
    category: '趋势',
    outlook: '大幅波动',
    description: '预期标的将大幅波动突破中间区间。',
    maxProfit: '有限（价差-净权利金）',
    maxLoss: '有限',
    defaultLegs: [
      { type: 'call', direction: 'short', strike: 95, price: 5, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'long', strike: 100, price: 3, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'long', strike: 105, price: 2, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'short', strike: 110, price: 1, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'short-put-condor',
    name: '反向看跌期权鹰式',
    nameEn: 'Short Put Condor',
    category: '趋势',
    outlook: '大幅波动',
    description: '预期标的将大幅波动突破中间区间。',
    maxProfit: '有限（价差-净权利金）',
    maxLoss: '有限',
    defaultLegs: [
      { type: 'put', direction: 'short', strike: 105, price: 5, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'long', strike: 100, price: 3, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'long', strike: 95, price: 2, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'short', strike: 90, price: 1, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'inverse-iron-butterfly',
    name: '反向铁蝶式',
    nameEn: 'Inverse Iron Butterfly',
    category: '趋势',
    outlook: '大幅波动',
    description: '预期标的将大幅波动。',
    maxProfit: '有限（价差-净权利金）',
    maxLoss: '有限',
    defaultLegs: [
      { type: 'call', direction: 'long', strike: 100, price: 5, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'long', strike: 100, price: 5, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'short', strike: 110, price: 2, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'short', strike: 90, price: 2, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'inverse-iron-condor',
    name: '反向铁鹰式',
    nameEn: 'Inverse Iron Condor',
    category: '趋势',
    outlook: '大幅波动',
    description: '预期标的将大幅波动。',
    maxProfit: '有限（价差-净权利金）',
    maxLoss: '有限',
    defaultLegs: [
      { type: 'call', direction: 'long', strike: 90, price: 1, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'short', strike: 95, price: 2, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'short', strike: 105, price: 2, expiration: 30, quantity: 1 },
      { type: 'put', direction: 'long', strike: 110, price: 1, expiration: 30, quantity: 1 },
    ],
  },

  // ========== 日历类 ==========
  {
    id: 'calendar-call-spread',
    name: '看涨期权日历价差',
    nameEn: 'Calendar Call Spread',
    category: '日历',
    outlook: '震荡日历',
    description: '预期标的在近期横盘或小幅波动，波动率将上升。',
    maxProfit: 'Theta衰减收益+Vega收益',
    maxLoss: '有限（净权利金）',
    defaultLegs: [
      { type: 'call', direction: 'long', strike: 100, price: 10, expiration: 60, quantity: 1 },
      { type: 'call', direction: 'short', strike: 100, price: 5, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'calendar-put-spread',
    name: '看跌期权日历价差',
    nameEn: 'Calendar Put Spread',
    category: '日历',
    outlook: '震荡日历',
    description: '预期标的在近期横盘或小幅波动，波动率将上升。',
    maxProfit: 'Theta衰减收益+Vega收益',
    maxLoss: '有限（净权利金）',
    defaultLegs: [
      { type: 'put', direction: 'long', strike: 100, price: 10, expiration: 60, quantity: 1 },
      { type: 'put', direction: 'short', strike: 100, price: 5, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'reverse-calendar-call',
    name: '反向看涨期权日历价差',
    nameEn: 'Reverse Calendar Call Spread',
    category: '日历',
    outlook: '趋势日历',
    description: '预期标的将快速大幅波动，波动率将下降。',
    maxProfit: 'Vega收益（波动率下降）',
    maxLoss: '有限（净权利金）',
    defaultLegs: [
      { type: 'call', direction: 'short', strike: 100, price: 10, expiration: 60, quantity: 1 },
      { type: 'call', direction: 'long', strike: 100, price: 5, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'reverse-calendar-put',
    name: '反向看跌期权日历价差',
    nameEn: 'Reverse Calendar Put Spread',
    category: '日历',
    outlook: '趋势日历',
    description: '预期标的将快速大幅波动，波动率将下降。',
    maxProfit: 'Vega收益（波动率下降）',
    maxLoss: '有限（净权利金）',
    defaultLegs: [
      { type: 'put', direction: 'short', strike: 100, price: 10, expiration: 60, quantity: 1 },
      { type: 'put', direction: 'long', strike: 100, price: 5, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'diagonal-call-spread',
    name: '看涨期权对角价差',
    nameEn: 'Diagonal Call Spread',
    category: '日历',
    outlook: '看涨日历',
    description: '预期标的温和上涨，适合长期持有的看涨头寸。',
    maxProfit: 'Theta+Vega+方向收益',
    maxLoss: '有限（净权利金）',
    defaultLegs: [
      { type: 'call', direction: 'long', strike: 95, price: 10, expiration: 60, quantity: 1 },
      { type: 'call', direction: 'short', strike: 105, price: 3, expiration: 30, quantity: 1 },
    ],
  },
  {
    id: 'diagonal-put-spread',
    name: '看跌期权对角价差',
    nameEn: 'Diagonal Put Spread',
    category: '日历',
    outlook: '看跌日历',
    description: '预期标的温和下跌，适合长期持有的看跌头寸。',
    maxProfit: 'Theta+Vega+方向收益',
    maxLoss: '有限（净权利金）',
    defaultLegs: [
      { type: 'put', direction: 'long', strike: 105, price: 10, expiration: 60, quantity: 1 },
      { type: 'put', direction: 'short', strike: 95, price: 3, expiration: 30, quantity: 1 },
    ],
  },

  // ========== 看涨领口策略 ==========
  {
    id: 'collar-long',
    name: '看涨领口策略',
    nameEn: 'Long Collar',
    category: '看涨',
    outlook: '温和看涨/风险保护',
    description: '已持有标的，希望低成本保护下跌风险。',
    maxProfit: '有限（上行保护价-持有价+净权利金）',
    maxLoss: '有限（持有价-下行保护价-净权利金）',
    defaultLegs: [
      { type: 'stock', direction: 'long', price: 100, quantity: 1 },
      { type: 'put', direction: 'long', strike: 90, price: 3, expiration: 30, quantity: 1 },
      { type: 'call', direction: 'short', strike: 110, price: 3, expiration: 30, quantity: 1 },
    ],
  },
  ];

export const calculatePayoff = (legs: OptionLeg[], underlyingPrice: number): number => {
  let totalPayoff = 0;

  legs.forEach(leg => {
    let legPayoff = 0;

    if (leg.type === 'stock') {
      if (leg.direction === 'long') {
        legPayoff = (underlyingPrice - leg.price) * leg.quantity;
      } else {
        legPayoff = (leg.price - underlyingPrice) * leg.quantity;
      }
    } else {
      const multiplier = leg.direction === 'long' ? 1 : -1;
      const strike = leg.strike || 0;

      if (leg.type === 'call') {
        legPayoff = Math.max(0, underlyingPrice - strike);
      } else {
        legPayoff = Math.max(0, strike - underlyingPrice);
      }

      legPayoff = (legPayoff - leg.price) * multiplier * leg.quantity;
    }

    totalPayoff += legPayoff;
  });

  return totalPayoff;
};

export const generateChartData = (legs: OptionLeg[], currentPrice: number) => {
  const data = [];
  const minPrice = currentPrice * 0.7;
  const maxPrice = currentPrice * 1.3;
  const step = (maxPrice - minPrice) / 100;

  for (let price = minPrice; price <= maxPrice; price += step) {
    data.push({
      x: price,
      y: calculatePayoff(legs, price),
    });
  }

  return data;
};

export const getKeyMetrics = (legs: OptionLeg[], currentPrice: number) => {
  const chartData = generateChartData(legs, currentPrice);
  
  let maxProfit = -Infinity;
  let maxLoss = Infinity;
  let breakEvenPoints: number[] = [];
  
  let prevY = null;
  let prevX = null;

  chartData.forEach(point => {
    if (point.y > maxProfit) maxProfit = point.y;
    if (point.y < maxLoss) maxLoss = point.y;
    
    if (prevY !== null && prevX !== null) {
      if ((prevY < 0 && point.y >= 0) || (prevY >= 0 && point.y < 0)) {
        const m = (point.y - prevY) / (point.x - prevX);
        const b = prevY - m * prevX;
        const be = -b / m;
        if (be >= chartData[0].x && be <= chartData[chartData.length - 1].x) {
          breakEvenPoints.push(be);
        }
      }
    }
    
    prevY = point.y;
    prevX = point.x;
  });

  const currentProfit = calculatePayoff(legs, currentPrice);

  return {
    maxProfit,
    maxLoss,
    breakEvenPoints: Array.from(new Set(breakEvenPoints.map(b => Math.round(b * 100) / 100))),
    currentProfit,
  };
};

export const categories = ['全部', '看涨', '看跌', '震荡', '趋势', '日历'] as const;
export type Category = typeof categories[number];
