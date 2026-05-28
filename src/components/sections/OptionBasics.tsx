import { concepts } from '../../data/content';

export default function OptionBasics() {
  return (
    <section id="basics" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            期权基础
          </h2>
          <p className="text-xl text-gold font-sans">
            Option Basics
          </p>
        </div>

        <div className="grid gap-8">
          {concepts.map((concept, index) => (
            <div
              key={index}
              className="bg-surface/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-gold/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-5xl">{concept.icon}</span>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                  {concept.title}
                </h3>
              </div>
              
              <div className="text-white/80 font-sans text-lg leading-relaxed space-y-3">
                {concept.content.split('\n\n').map((paragraph, pIndex) => (
                  <div key={pIndex}>
                    {paragraph.includes('**') ? (
                      <div>
                        {paragraph.split('**').map((part, i) => (
                          <span key={i} className={i % 2 === 1 ? 'text-gold font-semibold' : ''}>
                            {part}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-1">
                        {paragraph.split('\n').map((line, lineIndex) => (
                          <span key={lineIndex}>
                            {line.includes('-') ? (
                              <div className="flex items-start gap-2">
                                <span className="text-gold">•</span>
                                <span>{line.replace(/^-\s*/, '')}</span>
                              </div>
                            ) : (
                              line
                            )}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mt-12 bg-surface/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-serif font-bold text-white mb-6 text-center">
            期权优势与风险
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Advantages */}
            <div>
              <h4 className="text-xl font-sans font-semibold text-profit mb-4 flex items-center gap-2">
                <span>✨</span> 期权优势
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-profit mt-1">✓</span>
                  <div className="text-white/80 font-sans">
                    <div className="font-semibold">非线性收益</div>
                    <div className="text-sm">利用杠杆实现小资金博取大收益</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-profit mt-1">✓</span>
                  <div className="text-white/80 font-sans">
                    <div className="font-semibold">多维交易</div>
                    <div className="text-sm">不仅可以交易方向，还可以交易波动率和时间</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-profit mt-1">✓</span>
                  <div className="text-white/80 font-sans">
                    <div className="font-semibold">风险管理</div>
                    <div className="text-sm">提供现货无法比拟的对冲保护功能</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Risks */}
            <div>
              <h4 className="text-xl font-sans font-semibold text-loss mb-4 flex items-center gap-2">
                <span>⚠️</span> 风险与挑战
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-loss mt-1">✗</span>
                  <div className="text-white/80 font-sans">
                    <div className="font-semibold">复杂性高</div>
                    <div className="text-sm">涉及多个变量（价格、时间、波动率），学习曲线陡峭</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-loss mt-1">✗</span>
                  <div className="text-white/80 font-sans">
                    <div className="font-semibold">时间损耗</div>
                    <div className="text-sm">买方每天面临时间价值的衰减</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-loss mt-1">✗</span>
                  <div className="text-white/80 font-sans">
                    <div className="font-semibold">流动性风险</div>
                    <div className="text-sm">部分深度虚值或远期合约可能缺乏流动性</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
