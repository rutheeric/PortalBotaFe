import React from 'react';
import { motion } from 'motion/react';
import { Share2, QrCode, Shield, Sparkles, AlertCircle, ArrowUpRight } from 'lucide-react';
import { GroupInfo, ThemeConfig } from '../types';

interface HeroHeaderProps {
  group: GroupInfo;
  theme: ThemeConfig;
  onOpenShare: () => void;
  onOpenQr: () => void;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({
  group,
  theme,
  onOpenShare,
  onOpenQr,
}) => {
  return (
    <header className="w-full text-center pt-8 pb-6 px-4">
      {/* Optional Top Notice Banner */}
      {group.notice?.enabled && group.notice.text && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto mb-6 p-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-between gap-3 shadow-sm border bg-amber-500/10 border-amber-500/20 text-amber-900 dark:text-amber-200"
        >
          <div className="flex items-center gap-2 text-left min-w-0">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
            <span className="truncate">{group.notice.text}</span>
          </div>
          {group.notice.linkUrl && (
            <a
              href={group.notice.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 font-semibold underline hover:no-underline flex items-center gap-0.5 text-xs text-amber-700 dark:text-amber-300"
            >
              {group.notice.linkLabel || 'Ver'}
              <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
        </motion.div>
      )}

      {/* Group Crest / Logos Display */}
      {group.secondaryLogoUrl ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-4 sm:gap-6 mb-5"
        >
          {/* Logo 1: TLC Bota Fé Official */}
          <div className="relative group text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-lg border-2 border-red-600/40 bg-neutral-950 p-0.5 transition-transform duration-300 group-hover:scale-105">
              <img
                src={group.logoUrl}
                alt="Logo TLC Bota Fé"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <span className="inline-block mt-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-300 bg-red-950/80 border border-red-600/30 px-2 py-0.5 rounded-full">
              TLC Bota Fé
            </span>
          </div>

          {/* Connection Divider or Cross */}
          <div className="h-10 w-px bg-red-600/30 opacity-60" />

          {/* Logo 2: Mini TLC Bota Fé */}
          <div className="relative group text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-lg border-2 border-red-600/30 bg-neutral-900/90 p-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <img
                src={group.secondaryLogoUrl}
                alt="Logo Mini TLC Bota Fé"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <span className="inline-block mt-1.5 text-[10px] font-bold uppercase tracking-wider text-neutral-300 bg-neutral-900 border border-neutral-700 px-2 py-0.5 rounded-full">
              Mini TLC
            </span>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 mb-4 group"
        >
          <div className="w-full h-full rounded-2xl overflow-hidden shadow-md border-2 border-black/10 dark:border-white/10 flex items-center justify-center bg-white/40 dark:bg-black/20 backdrop-blur-xs">
            {group.logoUrl ? (
              <img
                src={group.logoUrl}
                alt={group.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center select-none">
                <Shield className={`w-8 h-8 sm:w-10 sm:h-10 mb-1 opacity-80 ${theme.textPrimary}`} />
                <span className={`text-base sm:text-lg font-bold tracking-widest ${theme.textPrimary}`}>
                  {group.avatarInitials || group.title.slice(0, 3).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          <div className="absolute -bottom-2 -right-2 bg-black/80 dark:bg-white text-white dark:text-black text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            {group.year || '2026'}
          </div>
        </motion.div>
      )}

      {/* Header Tag / Badge */}
      {group.badge && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-2"
        >
          <span
            className={`inline-block text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full ${theme.headerBadgeBg} ${theme.headerBadgeText}`}
          >
            {group.badge}
          </span>
        </motion.div>
      )}

      {/* Main Title (Cormorant Garamond / Serif) */}
      <motion.h1
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-serif-heading ${theme.textPrimary}`}
      >
        {group.title}
      </motion.h1>

      {/* Subtitles & Movement Name */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-2 space-y-0.5"
      >
        {group.subtitle && (
          <p className={`text-xs sm:text-sm font-semibold uppercase tracking-widest ${theme.textSecondary}`}>
            {group.subtitle}
          </p>
        )}
        {group.tagline && (
          <p className={`text-xs sm:text-sm font-medium tracking-wide ${theme.textSecondary} opacity-85`}>
            {group.tagline}
          </p>
        )}
      </motion.div>

      {/* Quick Sharing Toolbar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="flex items-center justify-center gap-2 mt-5"
      >
        <button
          type="button"
          onClick={onOpenShare}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all shadow-xs border ${theme.cardBg} ${theme.cardBorder} hover:scale-102 active:scale-98 ${theme.textPrimary}`}
          title="Compartilhar portal"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Compartilhar</span>
        </button>

        <button
          type="button"
          onClick={onOpenQr}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all shadow-xs border ${theme.cardBg} ${theme.cardBorder} hover:scale-102 active:scale-98 ${theme.textPrimary}`}
          title="Abrir QR Code para ler no celular"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span>QR Code</span>
        </button>
      </motion.div>
    </header>
  );
};
