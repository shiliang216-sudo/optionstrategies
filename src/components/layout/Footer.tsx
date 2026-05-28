export default function Footer() {
  return (
    <footer className="bg-secondary py-8 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="text-2xl font-serif font-bold text-white mb-4">
            <span className="text-gold">期权</span>策略
          </div>
          <p className="text-white/50 font-sans text-sm mb-4">
            专注于期权知识教育与策略分析
          </p>
          <div className="flex justify-center gap-6 text-white/50 font-sans text-sm mb-6">
            <a href="#home" className="hover:text-gold transition-colors">
              首页
            </a>
            <a href="#basics" className="hover:text-gold transition-colors">
              期权基础
            </a>
            <a href="#strategies" className="hover:text-gold transition-colors">
              四种策略
            </a>
            <a href="#greeks" className="hover:text-gold transition-colors">
              希腊字母
            </a>
          </div>
          <p className="text-white/40 font-sans text-xs">
            © 2024 Option Strategy. All rights reserved.
          </p>
          <p className="text-white/30 font-sans text-xs mt-2">
            仅供教育目的，不构成投资建议
          </p>
        </div>
      </div>
    </footer>
  );
}
