export default function Summary() {
  return (
    <section id="summary" className="py-20 bg-primary">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              核心总结
            </h2>
            <p className="text-xl text-gold font-sans">
              Key Takeaway
            </p>
          </div>

          <div className="bg-gradient-to-br from-surface via-secondary to-surface rounded-3xl p-8 md:p-12 border border-gold/30 mb-12">
            <div className="text-center mb-8">
              <span className="text-8xl mb-4 block">💎</span>
              <h3 className="text-3xl font-serif font-bold text-white mb-4">
                期权交易是三维博弈
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-primary/50 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">📈</div>
                <div className="text-xl font-serif font-semibold text-gold mb-2">
                  方向
                </div>
                <p className="text-white/70 font-sans text-sm">
                  标的资产价格的涨跌
                </p>
              </div>
              <div className="bg-primary/50 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">🌊</div>
                <div className="text-xl font-serif font-semibold text-gold mb-2">
                  波动率
                </div>
                <p className="text-white/70 font-sans text-sm">
                  隐含波动率的变化
                </p>
              </div>
              <div className="bg-primary/50 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">⏰</div>
                <div className="text-xl font-serif font-semibold text-gold mb-2">
                  时间
                </div>
                <p className="text-white/70 font-sans text-sm">
                  时间价值的衰减
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-white/80 font-sans text-lg leading-relaxed">
                期权交易不是简单的买涨买跌，而是对<span className="text-gold font-semibold">波动率</span>、<span className="text-gold font-semibold">时间</span>和<span className="text-gold font-semibold">方向</span>的三维博弈。掌握希腊字母是进阶的关键。
              </p>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-serif font-bold text-white mb-6 text-center">
              实用建议
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-primary/30 rounded-lg">
                <span className="text-3xl">📋</span>
                <div className="flex-1">
                  <h4 className="text-lg font-sans font-semibold text-gold mb-2">
                    策略选择建议
                  </h4>
                  <div className="text-white/70 font-sans space-y-1 text-sm">
                    <p>• 腿分布：Call 0 / Put 0；ITM 0，ATM 0，OTM 0</p>
                    <p>• 行权价偏移：基准价 × offset（如 1.10 = +10%）</p>
                    <p>• 买方更偏向 ATM/ITM，卖方更偏向 OTM</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-primary/30 rounded-lg">
                <span className="text-3xl">📅</span>
                <div className="flex-1">
                  <h4 className="text-lg font-sans font-semibold text-gold mb-2">
                    到期日建议
                  </h4>
                  <div className="text-white/70 font-sans space-y-1 text-sm">
                    <p>• 按事件窗口选择 7–30 天</p>
                    <p>• 避免过早被 Theta 吃掉</p>
                    <p>• 临近到期 Gamma 增大，价格靠近行权价时盈亏更敏感</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-primary/30 rounded-lg">
                <span className="text-3xl">⚙️</span>
                <div className="flex-1">
                  <h4 className="text-lg font-sans font-semibold text-gold mb-2">
                    管理与滚动建议
                  </h4>
                  <div className="text-white/70 font-sans space-y-1 text-sm">
                    <p>• 权利金亏损 40–50% 时考虑止损</p>
                    <p>• 事件后 IV 回落可能导致回吐，分批止盈</p>
                    <p>• 选择流动性好的合约，降低点差与滑点</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-white/60 font-sans mb-6">
              准备好开始您的期权学习之旅了吗？
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-gold hover:bg-gold/80 text-primary px-8 py-4 rounded-full font-sans font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold/30"
            >
              返回顶部，重新学习
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
