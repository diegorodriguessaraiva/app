# 📚 Minha Agenda Escolar

Aplicativo web para administrar sua agenda de **deveres de casa**, **provas**, **trabalhos** e **datas importantes** — com **login com Google** e **sincronização automática** entre celular e computador.

## Como usar

Basta abrir o arquivo `index.html` em qualquer navegador — não precisa instalar nada.

Para acessar do celular, publique com o **GitHub Pages** (Settings → Pages → escolha o branch → Save). O app ganha um endereço como `https://SEU-USUARIO.github.io/app/` que você pode adicionar à tela de início do iPhone (Safari → Compartilhar → "Adicionar à Tela de Início") ou instalar no Windows (Chrome/Edge → ícone de instalar na barra de endereço).

## Funcionalidades

- 📱 **Interface no estilo iPhone (iOS)** — título grande, folhas deslizantes, abas na base e toques com resposta tátil
- ➕ **Adicionar itens** com título, tipo, matéria, data, hora e anotações
- 📎 **Anexos**: guarde **PDF, fotos e imagens** (JPEG/PNG/etc.) em cada item, com **visualizador embutido** (abre imagens e PDFs dentro do app, além de baixar ou abrir em nova aba)
- 🔁 **Itens recorrentes**: diário, semanal, quinzenal ou mensal — ao concluir, a próxima ocorrência é criada sozinha
- 🔔 **Lembretes/notificações**: escolha em cada item (no horário, 10/30 min, 1 h ou 1 dia antes)
- 📚 **Grade de horários** das aulas (Outono e Inverno), dia a dia, com cor por matéria e destaque do dia atual
- 👆 **Deslizar** um item: arraste para a **direita para concluir** ✓ ou para a **esquerda para excluir** 🗑️ (gesto estilo iOS)
- 🗓️ **Visão de calendário** mensal com bolinhas nos dias que têm itens e a lista do dia selecionado
- 🏷️ **Tipos**: dever de casa, prova, trabalho, data importante e outros
- 🔎 **Visualizações**: Próximos, Hoje, Semana, Atrasados, Concluídos e Todos
- 🔍 **Busca** por texto (título, matéria ou anotação)
- 📊 **Painel de resumo** tocável: atrasados, para hoje, próximos 7 dias e provas por vir
- ✅ Marcar como concluído, editar e excluir
- ☁️ **Sincronização automática** entre aparelhos com **login com Google** (Firebase)
- 💾 Funciona também **sem login**, salvando no aparelho
- ⬇⬆ **Exportar/importar backup** em JSON
- 🎨 **Tema**: Automático, Claro ou Escuro (nos Ajustes ⚙️)

> **Sobre os anexos:** os arquivos ficam guardados **no próprio aparelho** (armazenamento local do navegador, que aguenta arquivos grandes). Os itens e as datas sincronizam pela nuvem; os arquivos em si não são enviados para a nuvem, então cada aparelho tem os seus.

> **Sobre as notificações:** ative em **Ajustes ⚙️ → Lembretes** e permita as notificações no navegador. Elas disparam de forma confiável enquanto o app está aberto; ao abrir o app, ele também avisa o que passou. Para os lembretes funcionarem melhor no celular, **instale o app na tela de início** (o app já vem com ícone e manifesto para isso). Aviso em segundo plano com o app totalmente fechado depende do sistema e nem sempre é garantido em sites estáticos.

> **Sobre a grade de horários:** as aulas de Outono 2026 e Inverno 2027 já vêm cadastradas no código (no bloco `TERMS` do `index.html`). Para mudar de semestre no futuro, edite esse bloco.

## ☁️ Ativar a sincronização entre aparelhos (uma vez só)

A sincronização usa o **Firebase**, serviço gratuito do Google. Sem essa configuração o app continua funcionando, mas cada aparelho guarda seus próprios dados. Com ela, o que você criar no celular aparece no computador em segundos (e vice-versa).

### 1. Criar o projeto Firebase

1. Acesse [console.firebase.google.com](https://console.firebase.google.com) e entre com sua conta Google
2. Clique em **Criar um projeto** (ou "Add project"), dê um nome (ex.: `agenda-escolar`) e conclua — pode **desativar o Google Analytics** quando perguntar

### 2. Ativar o login com Google

1. No menu lateral, vá em **Criação** (Build) → **Authentication** → **Vamos começar**
2. Na aba **Sign-in method**, clique em **Google** → **Ativar** → escolha seu e-mail de suporte → **Salvar**

### 3. Criar o banco de dados

1. No menu lateral, vá em **Criação** (Build) → **Firestore Database** → **Criar banco de dados**
2. Escolha o local padrão e inicie em **modo de produção**
3. Na aba **Regras** (Rules), substitua o conteúdo por isto e clique em **Publicar**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /agendas/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

> Essas regras garantem que **cada pessoa só acessa a própria agenda**.

### 4. Registrar o app web e copiar a configuração

1. Na página inicial do projeto, clique no ícone **`</>`** (Web) para registrar um app
2. Dê um apelido qualquer (ex.: `agenda`) e clique em **Registrar app** (não precisa do Hosting)
3. Vai aparecer um bloco `firebaseConfig` com `apiKey`, `authDomain`, `projectId`, `appId` etc. — **copie esses valores**

### 5. Colar no app

1. Abra o arquivo `index.html` e procure o bloco `FIREBASE_CONFIG` (perto do início do `<script>`)
2. Substitua os textos `COLE_SEU_..._AQUI` pelos valores copiados:

```js
const FIREBASE_CONFIG = {
  apiKey: "AIza...",
  authDomain: "agenda-escolar-xxxxx.firebaseapp.com",
  projectId: "agenda-escolar-xxxxx",
  appId: "1:1234567890:web:abc123"
};
```

3. Salve, faça commit e envie para o GitHub (se estiver usando GitHub Pages)

### 6. Autorizar o endereço do GitHub Pages

1. No Firebase, vá em **Authentication** → **Settings** → **Authorized domains** (Domínios autorizados)
2. Clique em **Adicionar domínio** e adicione o domínio do seu site, ex.: `SEU-USUARIO.github.io`

### Pronto! 🎉

Abra o app, clique em **Entrar com Google** na barra do topo e faça login **com a mesma conta** em todos os seus aparelhos. Tudo passa a sincronizar automaticamente. Os itens que já existiam no aparelho são enviados para a nuvem no primeiro login — nada se perde.

> 💡 A `apiKey` do Firebase **não é secreta** — ela pode ficar pública no código sem problema. A segurança vem das regras do Firestore (passo 3), que só deixam cada usuário ler e gravar os próprios dados.

## Observações

- Sem login, os dados ficam salvos apenas no navegador do aparelho. Use **Exportar**/**Importar** para transferir manualmente.
- O login com Google exige internet; sem internet o app continua abrindo e mostrando os dados locais.
