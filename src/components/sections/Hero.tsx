export default function Hero() {
  const scrollToBasics = () => {
    const element = document.getElementById('basics');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-surface"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-profit/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 text-6xl opacity-20 animate-bounce" style={{ animationDuration: '3s' }}>
        📈
      </div>
      <div className="absolute top-40 right-20 text-5xl opacity-20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
        💰
      </div>
      <div className="absolute bottom-40 left-40 text-5xl opacity-20 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '2s' }}>
        🎯
      </div>
      <div className="absolute bottom-20 right-40 text-6xl opacity-20 animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '0.5s' }}>
        📊
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 animate-fade-in-up">
            Option Strategy
          </h1>
          
          <div className="text-xl md:text-2xl text-gold font-sans mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="mb-4">如果说衍生品是金融产品中的皇冠</p>
            <p className="text-3xl md:text-4xl font-serif">那么期权就是这顶皇冠上的明珠</p>
          </div>

          <div className="text-lg md:text-xl text-white/70 font-sans mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <p>理解期权的核心概念、希腊字母以及四种基础交易形态</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="bg-surface/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-gold/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-gold/20">
              <div className="text-4xl mb-3">📈</div>
              <div className="text-white font-sans font-semibold">买入看涨</div>
              <div className="text-white/60 text-sm mt-1">Long Call</div>
            </div>
            <div className="bg-surface/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-accent/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/20">
              <div className="text-4xl mb-3">📉</div>
              <div className="text-white font-sans font-semibold">卖出看涨</div>
              <div className="text-white/60 text-sm mt-1">Short Call</div>
            </div>
            <div className="bg-surface/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-profit/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-profit/20">
              <div className="text-4xl mb-3">📊</div>
              <div className="text-white font-sans font-semibold">买入看跌</div>
              <div className="text-white/60 text-sm mt-1">Long Put</div>
            </div>
            <div className="bg-surface/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-loss/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-loss/20">
              <div className="text-4xl mb-3">💰</div>
              <div className="text-white font-sans font-semibold">卖出看跌</div>
              <div className="text-white/60 text-sm mt-1">Short Put</div>
            </div>
          </div>

          <button
            onClick={scrollToBasics}
            className="mt-12 bg-accent hover:bg-accent/80 text-white px-8 py-4 rounded-full font-sans font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/30 animate-fade-in-up"
            style={{ animationDelay: '0.8s' }}
          >
            开始学习 →
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="text-white/50 text-sm font-sans mb-2">向下滚动</div>
        <div className="text-2xl">↓</div>
      </div>
    </section>
  );
}
