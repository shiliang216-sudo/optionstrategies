export interface Strategy {
  id: string;
  title: string;
  icon: string;
  subtitle: string;
  description: string;
  features: { title: string; content: string }[];
  example: { title: string; content: string };
  risk: 'limited' | 'unlimited';
}

export interface Greek {
  symbol: string;
  name: string;
  description: string;
  example: string;
  application: string;
  icon: string;
}

export interface Concept {
  title: string;
  content: string;
  icon: string;
}

export const strategies: Strategy[] = [
  {
    id: 'long-call',
    title: '买入看涨',
    icon: '📈',
    subtitle: 'Long Call',
    description: '买入看涨期权，预期标的资产价格上涨',
    features: [
      {
        title: '最大亏损',
        content: '仅限于支付的权利金'
      },
      {
        title: '最大盈利',
        content: '理论上无限（标的价格无限上涨）'
      },
      {
        title: '盈利平衡点',
        content: '行权价 + 权利金'
      },
      {
        title: '适用场景',
        content: '强烈看涨，愿意用小资金博取大收益'
      }
    ],
    example: {
      title: '实例',
      content: 'BTC现价$100,000，买入行权价$100,000的Call，权利金$5,000。若BTC涨到$120,000，行权后盈利$20,000 - $5,000 = $15,000（3倍收益）。若BTC跌到$90,000，放弃行权，亏损$5,000。'
    },
    risk: 'limited'
  },
  {
    id: 'short-call',
    title: '卖出看涨',
    icon: '📉',
    subtitle: 'Short Call',
    description: '卖出看涨期权，预期标的资产价格不会大幅上涨',
    features: [
      {
        title: '最大盈利',
        content: '仅限于收取的权利金'
      },
      {
        title: '最大亏损',
        content: '理论上无限（标的价格无限上涨）'
      },
      {
        title: '盈利平衡点',
        content: '行权价 + 权利金'
      },
      {
        title: '适用场景',
        content: '温和看跌或中性，通过卖期权收取权利金'
      }
    ],
    example: {
      title: '实例',
      content: 'BTC现价$100,000，卖出行权价$105,000的Call，收取权利金$3,000。若BTC涨到$120,000，买方行权，你亏损$120,000 - $105,000 - $3,000 = $12,000。若BTC维持$100,000，权利金落袋。'
    },
    risk: 'unlimited'
  },
  {
    id: 'long-put',
    title: '买入看跌',
    icon: '📊',
    subtitle: 'Long Put',
    description: '买入看跌期权，预期标的资产价格下跌',
    features: [
      {
        title: '最大亏损',
        content: '仅限于支付的权利金'
      },
      {
        title: '最大盈利',
        content: '标的价格跌至0时的收益（行权价 - 权利金）'
      },
      {
        title: '盈利平衡点',
        content: '行权价 - 权利金'
      },
      {
        title: '适用场景',
        content: '看跌市场，或为持仓提供下行保护'
      }
    ],
    example: {
      title: '实例',
      content: 'BTC现价$100,000，买入行权价$100,000的Put，权利金$4,000。若BTC跌到$80,000，行权后盈利$100,000 - $80,000 - $4,000 = $16,000（4倍收益）。若BTC涨到$110,000，放弃行权，亏损$4,000。'
    },
    risk: 'limited'
  },
  {
    id: 'short-put',
    title: '卖出看跌',
    icon: '💰',
    subtitle: 'Short Put',
    description: '卖出看跌期权，预期标的资产价格不会大幅下跌',
    features: [
      {
        title: '最大盈利',
        content: '仅限于收取的权利金'
      },
      {
        title: '最大亏损',
        content: '标的价格跌至0时的损失（行权价 - 权利金）'
      },
      {
        title: '盈利平衡点',
        content: '行权价 - 权利金'
      },
      {
        title: '适用场景',
        content: '看涨或中性市场，想以较低价格买入标的'
      }
    ],
    example: {
      title: '实例',
      content: 'BTC现价$100,000，卖出行权价$95,000的Put，收取权利金$3,000。若BTC跌到$80,000，买方行权，你亏损$95,000 - $80,000 - $3,000 = $12,000。若BTC维持$100,000，权利金落袋，还能以理想价格买入。'
    },
    risk: 'unlimited'
  }
];

export const greeks: Greek[] = [
  {
    symbol: 'Δ',
    name: 'Delta',
    description: '衡量期权价格对标的资产价格变动的敏感度。Call的Delta范围：0到1；Put的Delta范围：-1到0。',
    example: '某Call的Delta=0.6，意味着BTC涨$1，该期权涨约$0.6。',
    application: 'Delta=0.5的期权被认为有50%概率到期时实值。可用于对冲：持有1 BTC + 卖出2个Delta=0.5的Call = Delta中性。',
    icon: '📊'
  },
  {
    symbol: 'Γ',
    name: 'Gamma',
    description: '衡量Delta对标的价格变动的敏感度，是Delta的"加速度"。',
    example: 'Gamma=0.02意味着价格涨$1，Delta增加0.02。',
    application: 'ATM期权的Gamma最大，临近到期时Gamma暴增（Gamma爆炸），这对卖方极其危险。买方喜欢高Gamma（有利时赚得更快），卖方害怕高Gamma。',
    icon: '🚀'
  },
  {
    symbol: 'Θ',
    name: 'Theta',
    description: '衡量每过一天期权损失多少价值。买方的敌人，卖方的朋友。',
    example: 'Theta=-50意味着如果其他条件不变，今天到明天这个期权会损失$50的时间价值。',
    application: 'ATM期权的Theta最大。卖方通过卖近月期权赚取Theta收入（收租策略）。最后30天的衰减速度 >> 前面的时间。',
    icon: '⏰'
  },
  {
    symbol: 'ν',
    name: 'Vega',
    description: '衡量隐含波动率(IV)变化1%对期权价格的影响。',
    example: 'Vega=200意味着IV涨1%，期权价格涨$200。',
    application: '重大事件（如减半、ETF决议）前IV飙升，事件后"利好/空出尽"，IV暴跌导致期权价格崩盘。预期波动加剧 → 买入期权；预期波动回落 → 卖出期权。',
    icon: '🌊'
  },
  {
    symbol: 'ρ',
    name: 'Rho',
    description: '衡量无风险利率变化对期权价格的影响。在加密市场中影响极小，通常可以忽略。',
    example: '在传统金融市场，利率变化会影响持仓成本。',
    application: '在加密市场，由于没有传统意义的无风险利率（或使用Funding Rate代替），Rho的作用微乎其微，通常忽略不计。',
    icon: '🏦'
  }
];

export const concepts: Concept[] = [
  {
    title: '什么是期权？',
    icon: '💎',
    content: `期权（Options）是一种金融衍生工具，它**赋予持有人在未来特定时间（到期日）以特定价格（行权价）买入或卖出某种资产的权利，但并非义务**。这是期权与期货最本质的区别——期货必须履约，而期权可以选择性行权。

**通俗例子**：假设你看中一套房子，目前100万。你支付5万定金给房东，约定3个月内可以用100万买下这套房。3个月后：
- 如果房价涨到120万，你选择行权，以100万买入，净赚15万
- 如果房价跌到80万，你选择不买，只损失5万定金

这个定金就是**权利金**，100万就是**行权价**，3个月就是**到期日**。`
  },
  {
    title: 'Call vs Put',
    icon: '📈📉',
    content: `**Call（看涨期权）**：赋予买方在未来以约定价格买入资产的权利。

**场景**：你认为BTC会从$100,000涨到$120,000，买入行权价$100,000的Call。若真涨到$120,000，你行权买入后立即卖出，净赚约$20,000（减去权利金）。

**Put（看跌期权）**：赋予买方在未来以约定价格卖出资产的权利。

**场景**：你认为BTC会从$100,000跌到$80,000，买入行权价$100,000的Put。若真跌到$80,000，你可以按$100,000卖出，净赚约$20,000（减去权利金）。`
  },
  {
    title: '行权价（Strike）',
    icon: '🎯',
    content: `行权价是期权合约中约定的买卖价格。根据行权价与当前市场价格的关系，期权分为三种状态：

**ITM 实值 (In-The-Money)**：Call的行权价 < 市价，或 Put的行权价 > 市价。具有内在价值，行权就能赚钱。

**ATM 平值 (At-The-Money)**：行权价 ≈ 市价。流动性最好，时间价值最高，是最常交易的期权。

**OTM 虚值 (Out-of-The-Money)**：Call的行权价 > 市价，或 Put的行权价 < 市价。无内在价值，仅有时间价值，价格便宜但需要更大的价格波动才能盈利。`
  },
  {
    title: '到期日（Expiration）',
    icon: '⏰',
    content: `期权的有效期限。**时间就是期权的生命**，越临近到期日，期权的时间价值衰减越快。

**时间衰减规律**：最后30天的时间价值衰减速度 > 前面几个月的总和。这就是为什么卖方喜欢卖短期期权（赚Theta），买方更倾向买长期期权（避免快速衰减）。

**周末和假期也在衰减**——不交易但时间在流逝。`
  },
  {
    title: '权利金（Premium）',
    icon: '💰',
    content: `权利金是期权的价格，由**内在价值 + 时间价值**组成：

**内在价值**：如果现在行权能赚多少（实值期权才有，虚值期权为0）

**时间价值**：市场对未来价格波动的预期（所有期权都有，越接近到期越小）

**例**：BTC现价$100,000，一个行权价$95,000的Call，权利金$7,000。其中内在价值=$5,000（$100k-$95k），时间价值=$2,000。`
  },
  {
    title: '买方 vs 卖方',
    icon: '⚖️',
    content: `**买方（Long）**：
- 支付权利金
- 获得选择权
- 风险有限（最多损失权利金）
- 收益潜力大（甚至无限）

**卖方（Short）**：
- 收取权利金
- 承担履约义务
- 收益有限（最多赚权利金）
- 风险可能很大（裸卖风险无限）`
  }
];

export const advantages = [
  {
    icon: '📈',
    title: '非线性收益',
    content: '利用杠杆实现小资金博取大收益'
  },
  {
    icon: '🌊',
    title: '多维交易',
    content: '不仅可以交易方向，还可以交易波动率和时间'
  },
  {
    icon: '🛡️',
    title: '风险管理',
    content: '提供现货无法比拟的对冲保护功能'
  }
];

export const risks = [
  {
    icon: '📚',
    title: '复杂性高',
    content: '涉及多个变量（价格、时间、波动率），学习曲线陡峭'
  },
  {
    icon: '⏳',
    title: '时间损耗',
    content: '买方每天面临时间价值的衰减'
  },
  {
    icon: '💧',
    title: '流动性风险',
    content: '部分深度虚值或远期合约可能缺乏流动性'
  }
];
