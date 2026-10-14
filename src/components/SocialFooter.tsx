import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Instagram,
  Facebook,
  MessageCircle,
  Video,
  Youtube,
  Mail,
  Send,
  ExternalLink,
  Lock,
} from 'lucide-react';
import { SocialLink, ThemeConfig } from '../types';

interface SocialFooterProps {
  socials: SocialLink[];
  footer: {
    groupName: string;
    parishOrCity?: string;
    credits: string;
  };
  theme: ThemeConfig;
  onSecretAdminTrigger: () => void;
  isAdminLoggedIn?: boolean;
}

export const SocialFooter: React.FC<SocialFooterProps> = ({
  socials,
  footer,
  theme,
  onSecretAdminTrigger,
  isAdminLoggedIn,
}) => {
  const [clickCount, setClickCount] = useState(0);

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'telegram':
        return <Send className="w-4 h-4" />;
      case 'tiktok':
      default:
        return <Video className="w-4 h-4" />;
    }
  };

  // Secret 3-tap gesture on the subtle footer dot or text
  const handleSecretTap = () => {
    const next = clickCount + 1;
    if (next >= 3) {
      setClickCount(0);
      onSecretAdminTrigger();
    } else {
      setClickCount(next);
      setTimeout(() => setClickCount(0), 1800);
    }
  };

  return (
    <footer className="w-full mt-10 pb-16 px-4 text-center">
      {/* Social Links Grid */}
      {socials.length > 0 && (
        <div className="max-w-md mx-auto mb-8">
          <p className={`text-xs uppercase tracking-widest font-semibold mb-3 ${theme.textSecondary}`}>
            Canais Oficiais & Redes Sociais
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {socials.map((social) => (
              <motion.a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border shadow-xs transition-all ${theme.cardBg} ${theme.cardBorder} ${theme.cardHoverBorder} ${theme.textPrimary}`}
              >
                {getSocialIcon(social.platform)}
                <span className="font-semibold">{social.handle || social.label}</span>
                <ExternalLink className="w-3 h-3 opacity-50" />
              </motion.a>
            ))}
          </div>
        </div>
      )}

      {/* Decorative Divider */}
      <div className="w-16 h-px mx-auto my-6 bg-black/10 dark:bg-white/10" />

      {/* Footer Info with secret admin tap on lock dot */}
      <div className="space-y-1 text-xs select-none">
        <p className={`font-semibold ${theme.textPrimary}`}>{footer.groupName}</p>
        {footer.parishOrCity && (
          <p className={`${theme.textSecondary}`}>{footer.parishOrCity}</p>
        )}
        <div className="flex items-center justify-center gap-1.5 opacity-60 text-[11px] pt-1">
          <span className={theme.textSecondary}>{footer.credits}</span>
          <button
            type="button"
            onClick={handleSecretTap}
            title="Administração"
            className="w-4 h-4 inline-flex items-center justify-center text-transparent hover:text-neutral-500 transition-colors cursor-default"
          >
            <Lock className="w-2.5 h-2.5 opacity-30" />
          </button>
        </div>
      </div>
    </footer>
  );
};
