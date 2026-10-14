import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal, LogOut, FolderOpen, Shield } from 'lucide-react';
import { SiteConfig, CategoryType } from './types';
import { INITIAL_SITE_DATA } from './config/siteData';
import { AVAILABLE_THEMES } from './config/themes';
import { HeroHeader } from './components/HeroHeader';
import { LinkCard } from './components/LinkCard';
import { CategoryFilter } from './components/CategoryFilter';
import { SocialFooter } from './components/SocialFooter';
import { ShareModal } from './components/ShareModal';
import { CustomizerModal } from './components/CustomizerModal';
import { AdminAuthModal } from './components/AdminAuthModal';

const STORAGE_KEY = 'portal_comunitario_config_v3';
const ADMIN_SESSION_KEY = 'portal_admin_session_v1';

export default function App() {
  // Load saved configuration or fall back to default
  const [config, setConfig] = useState<SiteConfig>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.group && parsed.links) {
            return parsed;
          }
        }
      } catch (e) {
        console.error('Erro ao carregar dados salvos:', e);
      }
    }
    return INITIAL_SITE_DATA;
  });

  const [activeCategory, setActiveCategory] = useState<CategoryType>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);

  // Admin authentication state (only the owner sees edit controls)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        return sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
      } catch {
        return false;
      }
    }
    return false;
  });

  // Check if URL has ?admin=1 or ?admin=true
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === '1' || params.get('admin') === 'true') {
        if (!isAdminLoggedIn) {
          setIsAdminAuthOpen(true);
        } else {
          setIsCustomizerOpen(true);
        }
      }
    }
  }, [isAdminLoggedIn]);

  // Keyboard shortcut: Ctrl+Shift+A (or Cmd+Shift+A) to open Admin login
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAdminLoggedIn) {
          setIsCustomizerOpen(true);
        } else {
          setIsAdminAuthOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminLoggedIn]);

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
    setIsAdminAuthOpen(false);
    setIsCustomizerOpen(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsCustomizerOpen(false);
  };

  // Save to localStorage whenever user modifies configuration
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error('Erro ao salvar no localStorage:', e);
    }
  }, [config]);

  // Current active theme
  const currentTheme = useMemo(() => {
    return AVAILABLE_THEMES[config.themeId] || AVAILABLE_THEMES['preto-vermelho'];
  }, [config.themeId]);

  // Update HTML document title based on group name
  useEffect(() => {
    if (config.group?.title) {
      document.title = `${config.group.title} | Portal Oficial`;
    }
  }, [config.group?.title]);

  // Link counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryType, number> = {
      todos: config.links.length,
      documentos: 0,
      formularios: 0,
      financeiro: 0,
      midia: 0,
      social: 0,
    };
    config.links.forEach((l) => {
      if (counts[l.category] !== undefined) {
        counts[l.category]++;
      }
    });
    return counts;
  }, [config.links]);

  // Filtered links
  const filteredLinks = useMemo(() => {
    return config.links.filter((item) => {
      const matchesCategory =
        activeCategory === 'todos' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        (item.badge && item.badge.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [config.links, activeCategory, searchQuery]);

  const handleResetToDefault = () => {
    if (window.confirm('Deseja restaurar as configurações originais do portal?')) {
      setConfig(INITIAL_SITE_DATA);
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        // ignore
      }
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 relative flex flex-col justify-between ${currentTheme.bgGradient}`}
      style={{ backgroundColor: currentTheme.pageBgColor }}
    >
      {/* Background Ambience or Optional Custom Image Texture */}
      {config.group.bannerImageUrl && (
        <div
          className="fixed inset-0 pointer-events-none opacity-15 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${config.group.bannerImageUrl})` }}
        />
      )}

      {/* Admin Toolbar (ONLY visible to authenticated owner) */}
      {isAdminLoggedIn && (
        <div className="fixed top-3 right-3 z-40 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
          <button
            type="button"
            onClick={() => setIsCustomizerOpen(true)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-md border flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 bg-neutral-900/90 text-neutral-100 border-red-500/40 cursor-pointer"
            title="Painel de Edição do Administrador"
          >
            <Shield className="w-3.5 h-3.5 text-red-500" />
            <span>Editar Portal</span>
          </button>

          <button
            type="button"
            onClick={handleAdminLogout}
            className="p-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-md border bg-neutral-900/90 text-neutral-400 hover:text-white border-neutral-700 hover:border-neutral-500 cursor-pointer transition-colors"
            title="Sair do modo administrador"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-xl mx-auto px-4 sm:px-6 flex-1 flex flex-col items-center">
        {/* Header with Group Emblem & Subtitle */}
        <HeroHeader
          group={config.group}
          theme={currentTheme}
          onOpenShare={() => setIsShareOpen(true)}
          onOpenQr={() => setIsShareOpen(true)}
        />

        {/* Filter and Search Bar */}
        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          theme={currentTheme}
          counts={categoryCounts}
        />

        {/* Links Cards Feed */}
        <section className="w-full space-y-3 sm:space-y-3.5 mt-1 flex-1">
          <AnimatePresence mode="popLayout">
            {filteredLinks.length > 0 ? (
              filteredLinks.map((link, idx) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  theme={currentTheme}
                  index={idx}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className={`text-center py-12 px-4 rounded-3xl border ${currentTheme.cardBg} ${currentTheme.cardBorder}`}
              >
                <FolderOpen className={`w-10 h-10 mx-auto mb-3 opacity-40 ${currentTheme.textPrimary}`} />
                <h4 className={`text-base font-semibold ${currentTheme.textPrimary}`}>
                  Nenhum link encontrado
                </h4>
                <p className={`text-xs mt-1 ${currentTheme.textSecondary}`}>
                  {searchQuery
                    ? `Nenhum resultado corresponde à busca "${searchQuery}"`
                    : 'Nenhum item adicionado a esta categoria ainda.'}
                </p>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="mt-3 text-xs font-semibold underline underline-offset-2 opacity-80 hover:opacity-100"
                  >
                    Limpar pesquisa
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Social Channels and Footer Credits */}
        <SocialFooter
          socials={config.socials}
          footer={config.footer}
          theme={currentTheme}
          onSecretAdminTrigger={() => setIsAdminAuthOpen(true)}
          isAdminLoggedIn={isAdminLoggedIn}
        />
      </main>

      {/* Share / QR Code Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={config.group.title}
        theme={currentTheme}
      />

      {/* Admin Password Prompt Modal */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />

      {/* Full Live Customizer Modal (Only accessible by authenticated owner) */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        config={config}
        onUpdateConfig={setConfig}
        onResetToDefault={handleResetToDefault}
      />
    </div>
  );
}
