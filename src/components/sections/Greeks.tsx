import { greeks } from '../../data/content';

export default function Greeks() {
  return (
    <section id="greeks" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            希腊字母
          </h2>
          <p className="text-xl text-gold font-sans mb-4">
            The Greeks
          </p>
          <p className="text-white/60 font-sans">
            期权风险指标 - 掌握它们是期权交易进阶的关键
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {greeks.map((greek, index) => (
            <div
              key={index}
              className="bg-surface/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-gold/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-gold/10"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{greek.icon}</div>
                <div>
                  <div className="text-3xl font-mono font-bold text-gold">
                    {greek.symbol}
                  </div>
                  <div className="text-xl font-serif font-semibold text-white">
                    {greek.name}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-sans font-semibold text-gold mb-2">
                    定义
                  </h4>
                  <p className="text-white/70 font-sans text-sm leading-relaxed">
                    {greek.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-sans font-semibold text-gold mb-2">
                    实例
                  </h4>
                  <div className="bg-primary/50 rounded-lg p-3">
                    <p className="text-white/80 font-sans text-sm leading-relaxed">
                      {greek.example}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-sans font-semibold text-gold mb-2">
                    应用
                  </h4>
                  <p className="text-white/70 font-sans text-sm leading-relaxed">
                    {greek.application}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="mt-12 bg-gradient-to-r from-surface to-primary rounded-2xl p-8 border border-gold/30">
          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl">🎓</span>
            <div>
              <h3 className="text-2xl font-serif font-bold text-white mb-2">
                进阶建议
              </h3>
              <p className="text-white/60 font-sans">
                Advanced Suggestions
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-gold mt-1">→</span>
                <p className="text-white/80 font-sans">
                  新手先理解Delta和Theta，这是最直观的两个指标
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold mt-1">→</span>
                <p className="text-white/80 font-sans">
                  理解希腊字母之间的关系：Gamma影响Delta，Vega和Theta相互制约
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-gold mt-1">→</span>
                <p className="text-white/80 font-sans">
                  实盘前用期权计算器模拟不同场景下希腊字母的变化
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-gold mt-1">→</span>
                <p className="text-white/80 font-sans">
                  记住：买方做多Gamma和Vega，做空Theta；卖方相反
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
