# 💰 App de Despesas (Expense Tracker)

Um aplicativo web moderno para controle financeiro pessoal. Ele permite o gerenciamento de múltiplas contas bancárias, registro de receitas e despesas, e visualização de extratos detalhados com navegação fluida em abas.

## ✨ Funcionalidades
- **Autenticação Segura:** Login social com o Google usando Firebase Authentication.
- **Gestão de Contas:** Crie e exclua contas bancárias (ex: Nubank, Itaú, etc).
- **Controle de Transações:** Registre gastos e depósitos com atualização instantânea de saldo (Optimistic UI - zero tempo de carregamento).
- **Extrato Inteligente:** Histórico de transações agrupado automaticamente por mês e ano.
- **Filtros Avançados:** Filtre o extrato por contas bancárias específicas.
- **Reversão de Saldo (Estorno):** Exclua transações lançadas por engano e tenha o saldo da conta revertido automaticamente usando restrições relacionais seguras.

## 🚀 Tecnologias Utilizadas
- **Frontend:** React.js, Vite, HTML5, CSS3.
- **Backend & Banco de Dados:** Firebase Data Connect (PostgreSQL + GraphQL).
- **Autenticação:** Firebase Authentication.
- **Hospedagem (Deploy):** Firebase Hosting.

## 🛠️ Como rodar o projeto localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (versão 18 ou superior).
- [Firebase CLI](https://firebase.google.com/docs/cli) instalado globalmente (`npm install -g firebase-tools`).

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   cd SEU_REPOSITORIO
   ```

2. **Instale as dependências do Frontend:**
   ```bash
   cd frontend
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   Crie um arquivo `.env` dentro da pasta `frontend` com as chaves do seu projeto Firebase:
   ```env
   VITE_FIREBASE_API_KEY="sua_api_key"
   VITE_FIREBASE_AUTH_DOMAIN="seu_auth_domain"
   VITE_FIREBASE_DATABASE_URL="sua_database_url"
   VITE_FIREBASE_PROJECT_ID="seu_project_id"
   VITE_FIREBASE_STORAGE_BUCKET="seu_storage_bucket"
   VITE_FIREBASE_MESSAGING_SENDER_ID="seu_sender_id"
   VITE_FIREBASE_APP_ID="seu_app_id"
   VITE_FIREBASE_MEASUREMENT_ID="seu_measurement_id"
   ```

4. **Inicie o Emulador do Firebase (Opcional, para testes locais):**
   Volte para a raiz do projeto e inicie os emuladores:
   ```bash
   cd ..
   firebase emulators:start
   ```

5. **Rode a aplicação React:**
   Em um novo terminal, dentro da pasta `frontend`, execute:
   ```bash
   npm run dev
   ```
   O site estará disponível em `http://localhost:5173`.

## ☁️ Como publicar na nuvem (Deploy)
Para fazer o deploy no Firebase Hosting, basta gerar a build de produção e enviar:

```bash
cd frontend
npm run build
cd ..
firebase deploy
```