
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, ExternalLink, Search } from 'lucide-react';
import { NavItem } from '../types';
import { programs } from '../data/programsData';

const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Company', path: '/about' },
  { label: 'People', path: '/people' },
  { label: 'Programs', path: '/programs' },
  { label: 'Contact', path: '/contact' },
];

export const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchTerm("");
  }, [pathname]);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      // Small timeout to wait for render
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  const isHome = pathname === '/';

  // Search Logic
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const lowerTerm = searchTerm.toLowerCase();

    // 1. Pages
    const pages = [
      { title: 'Home', subtitle: 'Main Page', path: '/', type: 'PAGE' },
      { title: 'Company', subtitle: 'About Us', path: '/about', type: 'PAGE' },
      { title: 'People', subtitle: 'Instructors & Experts', path: '/people', type: 'PAGE' },
      { title: 'Programs', subtitle: 'Curriculum', path: '/programs', type: 'PAGE' },
      { title: 'Contact', subtitle: 'Get in Touch', path: '/contact', type: 'PAGE' },
    ];
    
    const matchedPages = pages.filter(p => 
      p.title.toLowerCase().includes(lowerTerm) || 
      p.subtitle.toLowerCase().includes(lowerTerm)
    );

    // 2. Programs
    const matchedPrograms = programs.filter(p => 
      p.title.toLowerCase().includes(lowerTerm) ||
      p.subtitle.toLowerCase().includes(lowerTerm) ||
      p.description.toLowerCase().includes(lowerTerm)
    ).map(p => ({
      title: p.title,
      subtitle: p.subtitle,
      path: `/programs?programId=${p.id}`,
      type: 'PROGRAM'
    }));

    return [...matchedPages, ...matchedPrograms];
  }, [searchTerm]);

  const handleSearchResultClick = (path: string) => {
    navigate(path);
    setIsSearchOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900">
      {/* Navigation Bar */}
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled || !isHome 
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-jjnavy rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-jjnavy/50 transition-all">
                JJ
              </div>
              <div className="flex flex-col">
                <span className={`font-bold text-lg leading-tight transition-colors ${isScrolled || !isHome ? 'text-jjnavy' : 'text-white'}`}>
                  JJ Creative
                </span>
                <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors ${isScrolled || !isHome ? 'text-jjorange' : 'text-white/80'}`}>
                  Education Lab
                </span>
              </div>
            </NavLink>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) => 
                    `text-sm font-bold transition-all hover:-translate-y-0.5 ${
                      isActive 
                        ? 'text-jjorange' 
                        : (isScrolled || !isHome ? 'text-slate-600 hover:text-jjnavy' : 'text-white/90 hover:text-white')
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              
              {/* Search Icon (Desktop) */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 rounded-full transition-colors ${
                  isScrolled || !isHome 
                    ? 'text-slate-600 hover:text-jjnavy hover:bg-slate-100' 
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </nav>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 ${isScrolled || !isHome ? 'text-slate-900' : 'text-white'}`}
                aria-label="Search"
              >
                <Search size={24} />
              </button>
              <button 
                className={`p-2 ${isScrolled || !isHome ? 'text-slate-900' : 'text-white'}`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl md:hidden animate-fade-in-down">
            <div className="flex flex-col p-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.path}
                  className={({ isActive }) => 
                    `py-4 px-4 text-lg font-bold border-b border-gray-50 last:border-0 ${
                      isActive ? 'text-jjorange bg-orange-50/50' : 'text-slate-700'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Search Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-jjnavy/95 backdrop-blur-sm flex flex-col pt-20 px-4 sm:px-8 animate-fade-in">
          <div className="max-w-3xl w-full mx-auto relative">
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>
            
            <input
              ref={searchInputRef}
              type="text"
              placeholder="무엇을 찾고 계신가요?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-b-2 border-white/20 text-white text-3xl sm:text-4xl font-bold py-4 focus:outline-none focus:border-jjorange placeholder-white/30"
            />
            
            <div className="mt-8 max-h-[60vh] overflow-y-auto">
              {searchResults.length > 0 ? (
                <div className="grid gap-4">
                  {searchResults.map((result, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSearchResultClick(result.path)}
                      className="text-left bg-white/5 hover:bg-white/10 p-4 rounded-xl transition-all group border border-white/10"
                    >
                      <div className="flex items-center justify-between">
                         <div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                              result.type === 'PAGE' ? 'bg-blue-500/20 text-blue-300' : 'bg-jjorange/20 text-jjorange'
                            }`}>
                              {result.type}
                            </span>
                            <h3 className="text-xl font-bold text-white mt-1 group-hover:text-jjorange transition-colors">{result.title}</h3>
                            <p className="text-sm text-gray-400">{result.subtitle}</p>
                         </div>
                         <ExternalLink className="text-white/30 group-hover:text-white transition-colors" size={20} />
                      </div>
                    </button>
                  ))}
                </div>
              ) : searchTerm ? (
                <div className="text-center py-12 text-white/50">
                  <p>검색 결과가 없습니다.</p>
                </div>
              ) : (
                 <div className="text-white/30 text-sm mt-4">
                   <p className="mb-2 font-bold uppercase tracking-widest text-white/20">Popular Searches</p>
                   <div className="flex flex-wrap gap-2">
                     {['AI', '리더십', '팀빌딩', '신입사원', '문제해결'].map(tag => (
                       <button 
                        key={tag}
                        onClick={() => setSearchTerm(tag)}
                        className="px-3 py-1 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                       >
                         #{tag}
                       </button>
                     ))}
                   </div>
                 </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Outlet */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-jjnavy text-white pt-20 pb-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand & Links */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white font-bold text-xl border border-white/20">
                  JJ
                </div>
                <span className="font-bold text-2xl tracking-tight">JJ Creative</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                조직의 잠재력을 깨우는 창의적 러닝 솔루션.<br/>
                Gamification & Simulation 기반의 실전형 교육.
              </p>
              
              {/* Footer Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a 
                  href="https://blog.naver.com/wofyrhd" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#03C75A] hover:bg-[#02b351] text-white rounded-lg text-xs font-bold transition-all shadow-lg hover:-translate-y-0.5"
                >
                  Blog <ExternalLink size={12} />
                </a>
                <a 
                  href="https://notebooklm.google.com/notebook/329d933e-d7b8-4981-94f3-b76bdd6142eb" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#8B5CF6] hover:bg-[#7c3aed] text-white rounded-lg text-xs font-bold transition-all shadow-lg hover:-translate-y-0.5"
                >
                  Chatbot <ExternalLink size={12} />
                </a>
                <a 
                  href="https://form.naver.com/response/S1p9qf7_I9qBZ96COOdSzA" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#F59E0B] hover:bg-[#d97706] text-white rounded-lg text-xs font-bold transition-all shadow-lg hover:-translate-y-0.5"
                >
                  Ask <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-jjorange text-sm uppercase tracking-wider mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><NavLink to="/about" className="hover:text-white transition-colors">회사 소개</NavLink></li>
                <li><NavLink to="/people" className="hover:text-white transition-colors">강사진 소개</NavLink></li>
                <li><NavLink to="/programs" className="hover:text-white transition-colors">교육 프로그램</NavLink></li>
                <li><NavLink to="/contact" className="hover:text-white transition-colors">문의하기</NavLink></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-jjorange text-sm uppercase tracking-wider mb-6">Contact Us</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-jjorange mt-0.5 shrink-0" />
                  <span>서울시 마포구 성암로 9안길 24 B101호</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-jjorange shrink-0" />
                  <span>010-8448-2354</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-jjorange shrink-0" />
                  <span>jjh@jjcreative.co.kr</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} JJ Creative Education Lab. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
