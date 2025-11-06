import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import logo from 'figma:asset/258365824ad1037955a42e676b969cfb54fcdf75.png';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const { t, locale, setLocale } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { key: 'home', label: t.nav.home },
    { key: 'participants', label: t.nav.participants },
    { key: 'vote', label: t.nav.vote },
    { key: 'ranking', label: t.nav.ranking },
    { key: 'calendar', label: t.nav.calendar },
    { key: 'map', label: t.nav.map },
  ];
  
  const toggleLocale = () => {
    setLocale(locale === 'es' ? 'en' : 'es');
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[var(--sb-border)] shadow-sm">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo + Title */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group"
            aria-label="Go to Home"
          >
            <img
              src={logo}
              alt="Sevilla Burger League"
              className="h-10 md:h-12 w-auto"
            />
            {/* ADDED TITLE */}
            <span className="text-sm md:text-xl font-semibold text-[var(--sb-carbon)] whitespace-nowrap truncate max-w-[55vw] md:max-w-none">
              Sevilla Burger League
            </span>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === item.key
                    ? 'bg-[var(--sb-orange)] text-white'
                    : 'text-[var(--sb-carbon)] hover:bg-[var(--sb-gray-100)]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          {/* Language Toggle & CTA */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={toggleLocale}
              className="px-3 py-1.5 text-sm border border-[var(--sb-border)] rounded-lg hover:bg-[var(--sb-gray-100)] transition-colors"
            >
              {locale.toUpperCase()}
            </button>
            
            <Button
              onClick={() => onNavigate('vote')}
              className="hidden md:inline-flex bg-[var(--sb-orange)] hover:bg-[#E55F00] text-white h-10"
            >
              {t.nav.vote}
            </Button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-[var(--sb-gray-100)] rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[var(--sb-border)]">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  onNavigate(item.key);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.key
                    ? 'bg-[var(--sb-orange)] text-white'
                    : 'text-[var(--sb-carbon)] hover:bg-[var(--sb-gray-100)]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
      
      {/* Sticky Vote Button (Mobile) */}
      {currentPage !== 'vote' && (
        <div className="md:hidden fixed bottom-4 right-4 z-50">
          <Button
            onClick={() => onNavigate('vote')}
            className="bg-[var(--sb-orange)] hover:bg-[#E55F00] text-white shadow-lg h-14 px-8"
          >
            {t.nav.vote}
          </Button>
        </div>
      )}
    </header>
  );
}
