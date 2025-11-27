import React, { useState, useMemo } from 'react';
import { BookOpen, Search, Menu, X, Info } from 'lucide-react';
import { DICTIONARY_DATA } from './constants';
import { DictionaryEntry, Category } from './types';
import { DictionaryList } from './components/DictionaryList';
import { Translator } from './components/Translator';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'translate' | 'dictionary'>('translate');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Memoize the data processing to avoid recalculations on every render
  const sortedData = useMemo(() => {
    return [...DICTIONARY_DATA].sort((a, b) => a.indonesian.localeCompare(b.indonesian));
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="min-h-screen flex flex-col text-slate-800">
      {/* Navigation Bar */}
      <nav className="bg-emerald-700 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Logo area */}
              <div className="bg-emerald-800 p-2 rounded-lg mr-3 shadow-inner">
                <BookOpen className="h-6 w-6 text-emerald-100" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight leading-tight">Bunaipaii</span>
                <span className="text-[10px] uppercase tracking-wider text-emerald-200 font-semibold">Kamus Suku Mee</span>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('translate')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'translate' 
                    ? 'bg-emerald-800 text-white' 
                    : 'text-emerald-100 hover:bg-emerald-600'
                }`}
              >
                Penerjemah
              </button>
              <button
                onClick={() => setActiveTab('dictionary')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'dictionary' 
                    ? 'bg-emerald-800 text-white' 
                    : 'text-emerald-100 hover:bg-emerald-600'
                }`}
              >
                Daftar Kata
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-emerald-100 hover:text-white hover:bg-emerald-600 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-emerald-700 pb-2 shadow-xl">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                onClick={() => {
                  setActiveTab('translate');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activeTab === 'translate' 
                    ? 'bg-emerald-900 text-white' 
                    : 'text-emerald-100 hover:bg-emerald-600'
                }`}
              >
                Penerjemah
              </button>
              <button
                onClick={() => {
                  setActiveTab('dictionary');
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  activeTab === 'dictionary' 
                    ? 'bg-emerald-900 text-white' 
                    : 'text-emerald-100 hover:bg-emerald-600'
                }`}
              >
                Daftar Kata
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'translate' ? (
          <Translator data={sortedData} />
        ) : (
          <DictionaryList data={sortedData} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Bunaipaii - Kamus Bahasa Suku Mee.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;