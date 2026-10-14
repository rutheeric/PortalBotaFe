import React, { useState } from 'react';
import {
  X,
  Palette,
  Edit3,
  Plus,
  Trash2,
  Copy,
  Check,
  Globe,
  FileCode,
  HelpCircle,
  RotateCcw,
  ExternalLink,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { SiteConfig, LinkItem, SocialLink, CategoryType } from '../types';
import { AVAILABLE_THEMES } from '../config/themes';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onUpdateConfig: (newConfig: SiteConfig) => void;
  onResetToDefault: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  onResetToDefault,
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'theme' | 'links' | 'socials' | 'github'>('info');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const handleGroupChange = (field: keyof typeof config.group, value: any) => {
    onUpdateConfig({
      ...config,
      group: {
        ...config.group,
        [field]: value,
      },
    });
  };

  const handleNoticeChange = (field: string, value: any) => {
    onUpdateConfig({
      ...config,
      group: {
        ...config.group,
        notice: {
          ...config.group.notice,
          enabled: field === 'enabled' ? value : config.group.notice?.enabled ?? false,
          text: field === 'text' ? value : config.group.notice?.text ?? '',
          linkUrl: field === 'linkUrl' ? value : config.group.notice?.linkUrl ?? '',
          linkLabel: field === 'linkLabel' ? value : config.group.notice?.linkLabel ?? '',
        },
      },
    });
  };

  const handleAddLink = () => {
    const newLink: LinkItem = {
      id: `link-${Date.now()}`,
      title: 'Novo Link / Documento',
      description: 'Descrição do link ou arquivo',
      url: 'https://drive.google.com/',
      category: 'documentos',
      iconName: 'FileText',
      badge: '',
    };
    onUpdateConfig({
      ...config,
      links: [...config.links, newLink],
    });
  };

  const handleUpdateLink = (id: string, field: keyof LinkItem, value: any) => {
    onUpdateConfig({
      ...config,
      links: config.links.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const handleDeleteLink = (id: string) => {
    onUpdateConfig({
      ...config,
      links: config.links.filter((item) => item.id !== id),
    });
  };

  const handleCopyCode = () => {
    const codeString = `import { SiteConfig } from '../types';\n\nexport const INITIAL_SITE_DATA: SiteConfig = ${JSON.stringify(
      config,
      null,
      2
    )};\n`;
    navigator.clipboard.writeText(codeString);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-xs">
      <div className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-slate-900 dark:text-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg font-serif-heading">Personalizar Portal</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Altere informações, cores, links do Drive e veja as mudanças em tempo real!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-4 bg-slate-50 dark:bg-slate-950/50 text-xs overflow-x-auto scrollbar-none shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`py-3 px-3 font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'info'
                ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            1. Dados do Grupo
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('theme')}
            className={`py-3 px-3 font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'theme'
                ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            2. Cores & Tema
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('links')}
            className={`py-3 px-3 font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'links'
                ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            3. Links & Drive ({config.links.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('socials')}
            className={`py-3 px-3 font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'socials'
                ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            4. Redes Sociais
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('github')}
            className={`py-3 px-3 font-semibold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'github'
                ? 'border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            5. GitHub Pages 🚀
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-sm">
          {/* TAB 1: DADOS DO GRUPO */}
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Nome Principal do Grupo / Evento
                  </label>
                  <input
                    type="text"
                    value={config.group.title}
                    onChange={(e) => handleGroupChange('title', e.target.value)}
                    placeholder="Ex: Jovens Conectados 2026"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Ano / Edição
                  </label>
                  <input
                    type="text"
                    value={config.group.year}
                    onChange={(e) => handleGroupChange('year', e.target.value)}
                    placeholder="Ex: 2026"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Subtítulo (Linha 1)
                </label>
                <input
                  type="text"
                  value={config.group.subtitle}
                  onChange={(e) => handleGroupChange('subtitle', e.target.value)}
                  placeholder="Ex: Pastoral da Juventude"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Lema / Movimento (Linha 2)
                </label>
                <input
                  type="text"
                  value={config.group.tagline}
                  onChange={(e) => handleGroupChange('tagline', e.target.value)}
                  placeholder="Ex: Paróquia São José • Diocese de São Paulo"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Iniciais para o Brasão (caso não tenha imagem)
                  </label>
                  <input
                    type="text"
                    value={config.group.avatarInitials || ''}
                    onChange={(e) => handleGroupChange('avatarInitials', e.target.value.toUpperCase())}
                    placeholder="Ex: PJ, MAC, JUC"
                    maxLength={4}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    URL da Imagem do Logo (opcional)
                  </label>
                  <input
                    type="text"
                    value={config.group.logoUrl || ''}
                    onChange={(e) => handleGroupChange('logoUrl', e.target.value)}
                    placeholder="https://exemplo.com/logo.png"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Aviso do Topo */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs">Banner de Comunicado / Aviso Rápido</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.group.notice?.enabled ?? false}
                      onChange={(e) => handleNoticeChange('enabled', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-300 peer-focus:outline-hidden rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                {config.group.notice?.enabled && (
                  <div className="space-y-2 pt-2">
                    <input
                      type="text"
                      value={config.group.notice.text}
                      onChange={(e) => handleNoticeChange('text', e.target.value)}
                      placeholder="Texto do aviso (ex: Inscrições abertas para o retiro!)"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={config.group.notice.linkUrl || ''}
                        onChange={(e) => handleNoticeChange('linkUrl', e.target.value)}
                        placeholder="Link opcional (ex: Google Forms)"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                      />
                      <input
                        type="text"
                        value={config.group.notice.linkLabel || ''}
                        onChange={(e) => handleNoticeChange('linkLabel', e.target.value)}
                        placeholder="Rótulo (ex: Inscreva-se)"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: TEMAS E CORES */}
          {activeTab === 'theme' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Selecione uma paleta pronta. As cores, fundos e botões mudam imediatamente na tela:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.values(AVAILABLE_THEMES).map((themeItem) => {
                  const isSelected = config.themeId === themeItem.id;
                  return (
                    <button
                      key={themeItem.id}
                      type="button"
                      onClick={() => onUpdateConfig({ ...config, themeId: themeItem.id })}
                      className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/20'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 bg-white dark:bg-slate-800/40'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 inline-block shrink-0 shadow-2xs"
                            style={{ backgroundColor: themeItem.pageBgColor }}
                          />
                          <span className="font-semibold text-xs sm:text-sm">{themeItem.name}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-6">
                          {themeItem.isDark ? 'Tema Escuro' : 'Tema Claro'}
                        </p>
                      </div>
                      {isSelected && <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: LINKS & GOOGLE DRIVE */}
          {activeTab === 'links' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Gerenciar Botões do Portal
                </span>
                <button
                  type="button"
                  onClick={handleAddLink}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Novo Botão</span>
                </button>
              </div>

              <div className="space-y-3">
                {config.links.map((link, idx) => (
                  <div
                    key={link.id}
                    className="p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-500 font-mono">#{idx + 1}</span>
                      <div className="flex items-center gap-2">
                        <label className="text-xs flex items-center gap-1 text-slate-600 dark:text-slate-400 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={link.isHighlighted || false}
                            onChange={(e) => handleUpdateLink(link.id, 'isHighlighted', e.target.checked)}
                            className="rounded text-emerald-600"
                          />
                          <span>Destaque</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => handleDeleteLink(link.id)}
                          className="p-1 rounded-md text-rose-500 hover:bg-rose-500/10 transition-colors"
                          title="Remover botão"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-slate-500 block mb-0.5">Título do Botão</label>
                        <input
                          type="text"
                          value={link.title}
                          onChange={(e) => handleUpdateLink(link.id, 'title', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-500 block mb-0.5">Selo / Badge (opcional)</label>
                        <input
                          type="text"
                          value={link.badge || ''}
                          onChange={(e) => handleUpdateLink(link.id, 'badge', e.target.value)}
                          placeholder="Ex: Novo, Drive, 2026"
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-500 block mb-0.5">Link URL (Google Drive, Docs, Forms, etc.)</label>
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => handleUpdateLink(link.id, 'url', e.target.value)}
                        placeholder="https://drive.google.com/..."
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono text-emerald-700 dark:text-emerald-400"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-slate-500 block mb-0.5">Descrição curta</label>
                        <input
                          type="text"
                          value={link.description || ''}
                          onChange={(e) => handleUpdateLink(link.id, 'description', e.target.value)}
                          placeholder="Ex: Informações e datas oficiais"
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-500 block mb-0.5">Categoria</label>
                        <select
                          value={link.category}
                          onChange={(e) => handleUpdateLink(link.id, 'category', e.target.value as CategoryType)}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                        >
                          <option value="documentos">Documentos</option>
                          <option value="formularios">Formulários</option>
                          <option value="financeiro">Financeiro</option>
                          <option value="midia">Fotos & Mídia</option>
                          <option value="social">Social & Ações</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: REDES SOCIAIS */}
          {activeTab === 'socials' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ajuste os links de Instagram, TikTok, Facebook ou WhatsApp que aparecem no rodapé:
              </p>
              <div className="space-y-3">
                {config.socials.map((social, sIdx) => (
                  <div
                    key={social.id}
                    className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 grid grid-cols-1 sm:grid-cols-3 gap-2 items-center"
                  >
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 block uppercase">
                        {social.platform}
                      </span>
                      <input
                        type="text"
                        value={social.handle}
                        onChange={(e) => {
                          const updated = [...config.socials];
                          updated[sIdx].handle = e.target.value;
                          onUpdateConfig({ ...config, socials: updated });
                        }}
                        placeholder="@seugrupo"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-[11px] font-semibold text-slate-500 block">URL Completa</span>
                      <input
                        type="text"
                        value={social.url}
                        onChange={(e) => {
                          const updated = [...config.socials];
                          updated[sIdx].url = e.target.value;
                          onUpdateConfig({ ...config, socials: updated });
                        }}
                        placeholder="https://..."
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: COMO HOSPEDAR NO GITHUB PAGES */}
          {activeTab === 'github' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
                <h3 className="font-bold text-sm text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Como publicar no GitHub Pages de graça:
                </h3>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-1 leading-relaxed">
                  O projeto já está configurado com <code className="bg-emerald-100 dark:bg-emerald-900/50 px-1 py-0.5 rounded font-mono">base: './'</code> no Vite. Qualquer repositório do GitHub consegue hospedá-lo instantaneamente!
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white">Opção 1: Build Local e Envio</span>
                  <p className="text-slate-600 dark:text-slate-400">
                    1. No seu terminal, execute:
                  </p>
                  <pre className="p-2 bg-slate-950 text-emerald-400 rounded-lg font-mono text-[11px] overflow-x-auto">
                    npm run build
                  </pre>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    2. Isso cria a pasta <code className="font-mono text-emerald-600 font-bold">dist</code> com todos os arquivos estáticos prontos para upload ou commit.
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white">Opção 2: Ativar no GitHub</span>
                  <p className="text-slate-600 dark:text-slate-400">
                    No seu repositório no GitHub:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 pl-1">
                    <li>Vá em <strong>Settings &gt; Pages</strong></li>
                    <li>Em <strong>Source</strong>, selecione <strong>GitHub Actions</strong> (ou selecione a branch com a pasta da build).</li>
                    <li>Seu site ficará no ar em: <code className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">https://seu-usuario.github.io/nome-do-repositorio/</code></li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onResetToDefault}
            className="px-3 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Padrão</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyCode}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                copiedCode
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
              }`}
              title="Copiar código pronto para colocar no arquivo siteData.ts"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5" /> : <FileCode className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Código Copiado!' : 'Copiar siteData.ts'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-950 text-xs font-semibold transition-colors cursor-pointer"
            >
              Concluir & Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
