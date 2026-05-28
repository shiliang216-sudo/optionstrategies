import { useState } from 'react';
import { strategies } from '../../data/content';

export default function FourStrategies() {
  const [expandedStrategy, setExpandedStrategy] = useState<string | null>(null);

  return (
    <section id="strategies" className="py-20 bg-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            四种基础交易形态
          </h2>
          <p className="text-xl text-gold font-sans">
            Four Basic Trading Strategies
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {strategies.map((strategy) => (
            <div
              key={strategy.id}
              className={`bg-surface/50 backdrop-blur-sm rounded-2xl border transition-all duration-300 cursor-pointer ${
                expandedStrategy === strategy.id
                  ? 'border-gold shadow-lg shadow-gold/20'
                  : 'border-white/10 hover:border-gold/50'
              }`}
              onClick={() => setExpandedStrategy(expandedStrategy === strategy.id ? null : strategy.id)}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{strategy.icon}</span>
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-white">
                        {strategy.title}
                      </h3>
                      <p className="text-white/60 font-sans">
                        {strategy.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-sans font-semibold ${
                        strategy.risk === 'limited'
                          ? 'bg-profit/20 text-profit'
                          : 'bg-loss/20 text-loss'
                      }`}
                    >
                      {strategy.risk === 'limited' ? '有限风险' : '无限风险'}
                    </span>
                    <span className="text-white/50 text-xl transition-transform duration-300">
                      {expandedStrategy === strategy.id ? '−' : '+'}
                    </span>
                  </div>
                </div>

                <p className="text-white/80 font-sans mb-4">
                  {strategy.description}
                </p>

                {expandedStrategy === strategy.id && (
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-6">
                    <div>
                      <h4 className="text-lg font-sans font-semibold text-gold mb-3">
                        特征分析
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {strategy.features.map((feature, index) => (
                          <div key={index} className="bg-primary/50 rounded-lg p-3">
                            <div className="text-sm text-white/60 mb-1">{feature.title}</div>
                            <div className="text-white font-sans text-sm">{feature.content}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-sans font-semibold text-gold mb-3">
                        {strategy.example.title}
                      </h4>
                      <div className="bg-primary/50 rounded-lg p-4">
                        <p className="text-white/80 font-sans text-sm leading-relaxed">
                          {strategy.example.content}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
