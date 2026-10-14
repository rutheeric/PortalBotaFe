export type CategoryType = 'todos' | 'documentos' | 'formularios' | 'financeiro' | 'midia' | 'social';

export interface LinkItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  category: CategoryType;
  iconName: string; // lucide icon name like Calendar, FileText, Folder, FormInput, DollarSign, Users, Camera, Heart, MessageCircle
  badge?: string; // e.g. "2026", "Novo", "Drive", "Form", "PDF"
  isHighlighted?: boolean;
}

export type SocialPlatform = 
  | 'instagram' 
  | 'whatsapp' 
  | 'tiktok' 
  | 'facebook' 
  | 'youtube' 
  | 'email' 
  | 'drive' 
  | 'telegram' 
  | 'custom';

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  label: string;
  handle: string; // e.g. "@seugrupo" or "+55 (11) 99999-9999"
  url: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  bgGradient: string; // Tailwind gradient or color
  pageBgColor: string; // Hex for background
  cardBg: string;
  cardBorder: string;
  cardHoverBorder: string;
  textPrimary: string;
  textSecondary: string;
  accentBg: string;
  accentText: string;
  headerBadgeBg: string;
  headerBadgeText: string;
  buttonRing: string;
  isDark: boolean;
}

export interface GroupInfo {
  title: string; // e.g. "MAC 2026" ou "Jovens em Cristo"
  subtitle: string; // e.g. "Treinamento de Liderança Cristã"
  tagline: string; // e.g. "Movimento dos Anunciadores de Cristo"
  badge: string; // e.g. "Portal Oficial 2026"
  year: string; // e.g. "2026"
  logoUrl?: string; // Link para foto/logo principal
  secondaryLogoUrl?: string; // Link para logo secundário (ex: Mini TLC)
  avatarInitials?: string; // Iniciais se não tiver imagem (ex: "MAC")
  bannerImageUrl?: string; // Foto de capa opcional
  notice?: {
    enabled: boolean;
    text: string;
    linkUrl?: string;
    linkLabel?: string;
  };
}

export interface SiteConfig {
  group: GroupInfo;
  themeId: string;
  links: LinkItem[];
  socials: SocialLink[];
  footer: {
    groupName: string;
    parishOrCity?: string; // e.g. "Paróquia Santa Cruz • Canoinhas/SC"
    credits: string;
  };
}
