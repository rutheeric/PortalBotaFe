# Portal Comunitário de Links & Documentos (Compatível com GitHub Pages)

Portal estilo Linktree / Canva para grupos de jovens, pastorais, comunidades, eventos e movimentos com suporte a links do Google Drive, formulários, planilhas, redes sociais e gerador de QR Code.

---

## 🚀 Como hospedar no GitHub Pages (Passo a Passo)

Este site foi desenvolvido com **Vite + React + Tailwind CSS** e já está configurado com `base: './'` no `vite.config.ts`, permitindo que funcione perfeitamente em qualquer repositório no GitHub Pages.

### Opção 1: Automático via GitHub Actions (Recomendado)
Já deixamos o arquivo `.github/workflows/deploy.yml` pronto no repositório!
1. Suba o código para o seu repositório no GitHub na branch `main`.
2. No seu repositório, vá em **Settings** > **Pages**.
3. Na seção **Build and deployment > Source**, selecione: **GitHub Actions**.
4. Pronto! O GitHub fará o build e seu site estará publicado automaticamente.

### Opção 2: Build Manual
1. No seu computador, execute:
   ```bash
   npm install
   npm run build
   ```
2. A pasta `dist` será gerada com os arquivos estáticos prontos.
3. Você pode publicar a pasta `dist` diretamente na branch `gh-pages` ou arrastar para serviços como Vercel, Netlify ou GitHub Pages.

---

## 🎨 Como Alterar as Informações, Cores e Links

Você tem duas formas muito fáceis de editar:

### 1. Pelo Editor Visual na Tela
- Abra o site e clique no botão **"Personalizar"** no canto superior direito.
- Mude o nome do grupo, subtítulo, cores e adicione seus links do Google Drive.
- As mudanças aparecem em tempo real!
- Clique em **"Copiar siteData.ts"** para salvar seu código.

### 2. Pelo arquivo `src/config/siteData.ts`
Abra o arquivo `src/config/siteData.ts` no seu editor de código. Ele possui comentários explicativos para cada campo:
- **`group`**: Nome do grupo, ano, lema e logotipo.
- **`themeId`**: Paleta de cores (ex: `'oliva-creme'`, `'azul-sereno'`, `'terracota-acolhedor'`, etc.).
- **`links`**: Lista de botões com links para Google Drive, formulários do Google Forms, planilhas ou pastas.
- **`socials`**: Contas de Instagram, WhatsApp, TikTok, etc.
