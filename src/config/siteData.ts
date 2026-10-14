import { SiteConfig } from '../types';

/**
 * =========================================================================
 * ⚙️ CONFIGURAÇÃO DO SEU SITE (PORTAL DE LINKS)
 * =========================================================================
 * 
 * Você pode alterar todas as informações abaixo para o seu novo grupo!
 * Dica: Você também pode usar o botão "Personalizar" direto na tela para
 * testar e copiar o código pronto.
 * 
 * COMPATIBILIDADE COM GITHUB PAGES:
 * - Este site gera arquivos estáticos puros (HTML/CSS/JS).
 * - Basta dar `npm run build` e publicar a pasta `dist` no seu repositório!
 * =========================================================================
 */

export const INITIAL_SITE_DATA: SiteConfig = {
  // ==========================================
  // 1. DADOS PRINCIPAIS DO GRUPO
  // ==========================================
  group: {
    // ➡️ Nome em destaque do seu grupo/evento
    title: 'TLC Bota Fé',

    // ➡️ Subtítulo ou categoria
    subtitle: 'Treinamento de Liderança Cristã',

    // ➡️ Lema, movimento ou paróquia
    tagline: 'Movimento dos Anunciadores de Cristo',

    // ➡️ Selo / Badge no topo
    badge: 'Paróquia Divino Espírito Santo - Major Vieira, SC',

    // ➡️ Ano em vigência
    year: '2026',

    // ➡️ Iniciais para o escudo/brasão
    avatarInitials: 'TLC',

    // ➡️ Logo Principal (TLC Bota Fé oficial)
    logoUrl: './logo-tlc.svg',

    // ➡️ Logo Secundário (Mini TLC Bota Fé)
    secondaryLogoUrl: './logo-mini.svg',

    // ➡️ Foto de fundo opcional (textura ou foto do grupo)
    bannerImageUrl: '',

    // ➡️ Comunicado fixo no topo (opcional)
    notice: {
      enabled: true,
      text: '📌 Atenção: Inscrições abertas para o próximo encontro de formação!',
      linkUrl: 'https://docs.google.com/forms',
      linkLabel: 'Inscreva-se aqui',
    },
  },

  // ==========================================
  // 2. TEMA DE CORES
  // Opções prontas disponíveis:
  // - 'preto-vermelho'     (Preto & Vermelho Minimalista & Elegante)
  // - 'oliva-creme'        (Verde Oliva e Creme - Original estilo Canva)
  // - 'azul-sereno'        (Azul Noite e Dourado Real)
  // - 'terracota-acolhedor'(Terracota e Tons Areia)
  // - 'verde-esperanca'    (Verde Floresta e Menta)
  // - 'minimalista-clean'  (Branco e Grafite Moderno)
  // ==========================================
  themeId: 'preto-vermelho',

  // ==========================================
  // 3. BOTÕES E LINKS OFICIAIS
  // Aqui você insere seus links do Google Drive,
  // Formulários, Planilhas, PDFs, etc.
  // ==========================================
  links: [
    {
      id: 'link-calendario',
      title: 'Calendário MAC 2026',
      description: 'Datas de encontros, formações, missas e retiros do ano',
      url: 'https://drive.google.com/file/d/1Q-8-T543PijBtCdPolr_zQSm4aScOnLr/view?usp=sharing',
      category: 'documentos',
      iconName: 'Calendar',
      badge: 'Oficial',
      isHighlighted: true,
    },
    {
      id: 'link-presencas',
      title: 'Participações e Presenças',
      description: 'Registro de frequência dos membros e equipes',
      url: 'https://drive.google.com/file/d/1n9_wTmPQL51_jxvpJQXQY6M3hVtwELhw/view?usp=sharing',
      category: 'documentos',
      iconName: 'FileCheck',
      badge: 'Atualizado',
    },
    {
      id: 'link-contas',
      title: 'Prestações de Contas',
      description: 'Relatórios de transparência e finanças do movimento',
      url: 'https://drive.google.com/file/d/14XjiVjhx5DACz2m0fy7Dj2N4DLC_MVIZ/view?usp=sharing',
      category: 'financeiro',
      iconName: 'DollarSign',
      badge: 'Transparência',
    },
    {
      id: 'link-coordenacao',
      title: 'Coordenação e Equipes',
      description: 'Estrutura organizacional, pastas e responsáveis 2026',
      url: 'https://drive.google.com/file/d/15lOAfmTKDMeXGG296UvK6w2hmuTrmU0G/view?usp=sharing',
      category: 'documentos',
      iconName: 'Users',
    },
    {
      id: 'link-fotos',
      title: 'Fotos dos Encontros',
      description: 'Pasta compartilhada no Drive com os registros fotográficos',
      url: 'https://drive.google.com/drive/folders/1jIh8AByg5hspWpYfJEjenIAjOiwipAQj?usp=drive_link',
      category: 'midia',
      iconName: 'Camera',
      badge: 'Drive',
    },
    {
      id: 'link-acoes-sociais',
      title: 'Ações Sociais & Voluntariado',
      description: 'Projetos solidários, arrecadações e visitas comunitárias',
      url: 'https://drive.google.com/file/d/1LfzXelFKqBrZGjm7Ybj7dV_C32mBc5VP/view?usp=sharing',
      category: 'social',
      iconName: 'HeartHandshake',
    },
    {
      id: 'link-sugestoes',
      title: 'Justificativas & Sugestões',
      description: 'Envie sua justificativa de falta, ideia ou sugestão de melhoria',
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSdlOtl4dIJZff5ac5RiMh4Xw8VjiitN7Cm1Fky3mxHh0sEgfA/viewform?usp=sharing',
      category: 'formularios',
      iconName: 'ClipboardEdit',
      badge: 'Formulário',
    },
  ],

  // ==========================================
  // 4. REDES SOCIAIS E CANAIS DE CONTATO
  // Adicione ou altere perfis no rodapé
  // ==========================================
  socials: [
    {
      id: 'social-insta-1',
      platform: 'instagram',
      label: 'Instagram TLC',
      handle: '@tlcdomac',
      url: 'https://www.instagram.com/tlcdomac/',
    },
    {
      id: 'social-insta-2',
      platform: 'instagram',
      label: 'Instagram Mini TLC',
      handle: '@minitlcdomac',
      url: 'https://www.instagram.com/minitlcdomac/',
    },
    {
      id: 'social-tiktok',
      platform: 'tiktok',
      label: 'TikTok Oficial',
      handle: '@minietlcmac',
      url: 'https://www.tiktok.com/@minietlcmac',
    },
    {
      id: 'social-face-1',
      platform: 'facebook',
      label: 'Facebook TLC MAC',
      handle: 'TLC MAC Canoinhas',
      url: 'https://www.facebook.com/minitlcdomac',
    },
  ],

  // ==========================================
  // 5. RODAPÉ DO SITE
  // ==========================================
  footer: {
    groupName: 'TLC Bota Fé • Movimento dos Anunciadores de Cristo',
    parishOrCity: 'Paróquia Divino Espírito Santo • Major Vieira, SC',
    credits: 'Portal Comunitário • Construído com React & Tailwind CSS',
  },
};
