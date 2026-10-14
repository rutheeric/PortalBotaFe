import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Copy, Check } from 'lucide-react';
import { LinkItem, ThemeConfig } from '../types';
import { getLinkIcon } from '../utils/iconMap';

interface LinkCardProps {
  link: LinkItem;
  theme: ThemeConfig;
  index: number;
}

export const LinkCard: React.FC<LinkCardProps> = ({ link, theme, index }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(link.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.4) }}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      className="relative group"
    >
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`w-full flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all duration-200 shadow-sm hover:shadow-md ${theme.cardBg} ${theme.cardBorder} ${theme.cardHoverBorder} ${
          link.isHighlighted ? 'ring-2 ' + theme.buttonRing : ''
        }`}
      >
        <div className="flex items-center gap-4 min-w-0 pr-2">
          {/* Icon Box */}
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
              link.isHighlighted
                ? `${theme.accentBg} ${theme.accentText}`
                : 'bg-black/5 dark:bg-white/10 ' + theme.textPrimary
            }`}
          >
            {getLinkIcon(link.iconName, 'w-6 h-6')}
          </div>

          {/* Text Content */}
          <div className="min-w-0 text-left">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`font-semibold text-base sm:text-lg tracking-tight leading-snug truncate ${theme.textPrimary}`}>
                {link.title}
              </h3>
              {link.badge && (
                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    link.isHighlighted
                      ? `${theme.accentBg} ${theme.accentText}`
                      : 'bg-black/5 dark:bg-white/10 ' + theme.textSecondary
                  }`}
                >
                  {link.badge}
                </span>
              )}
            </div>

            {link.description && (
              <p className={`text-xs sm:text-sm mt-0.5 line-clamp-1 ${theme.textSecondary}`}>
                {link.description}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons: Copy link & External link */}
        <div className="flex items-center gap-1 shrink-0 ml-2">
          <button
            type="button"
            onClick={handleCopy}
            title={copied ? 'Link copiado!' : 'Copiar link'}
            aria-label="Copiar link do documento"
            className={`p-2 rounded-lg opacity-70 hover:opacity-100 transition-opacity hover:bg-black/5 dark:hover:bg-white/10 ${theme.textSecondary}`}
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>

          <div
            className={`p-2 rounded-lg opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all ${theme.textPrimary}`}
          >
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </a>
    </motion.div>
  );
};
