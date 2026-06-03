<span style="color: #0070f3;">

# 📢 Voz do Bairro — Protótipo de Relatos Comunitários (Expo)

O **Voz do Bairro** é um app mobile e web feito em React Native + Expo para dar voz aos cidadãos. A ideia é simples: um canal direto, sem enrolação, para a galera registrar, categorizar e acompanhar problemas do dia a dia da comunidade — como aquele buraco na rua, falta de iluminação ou saneamento.

O foco aqui foi criar um app estável, multiplataforma de verdade e com um visual responsivo que não quebra nem de um jeito nem de outro (seja no celular ou no monitorzão do PC).

---

## 📑 Descrição do Problema Social Escolhido

Nas comunidades e centros urbanos, a falta de canais eficientes e rápidos para reportar problemas de infraestrutura básica gera a degradação dos espaços públicos e o isolamento dos moradores. O **Voz do Bairro** ataca esse problema centralizando as demandas da população em um painel visual e prático, estimulando a cidadania ativa e facilitando a cobrança por melhorias em zeladoria urbana, saneamento e segurança.

---

## 🛠️ Tecnologias Utilizadas (O que tem debaixo do capô?)

* **React Native & Expo:** A base de tudo para gerenciar o app e fazer a mágica acontecer.
* **React Navigation:** Mistura fina de `Bottom Tabs` (aquele menu que fica embaixo) com `Native Stack` para abrir os detalhes de cada relato sem complicação.
* **React Context API:** Estado global centralizado (`ReportsContext`) cuidando de todo o fluxo de dados (criar, listar e deletar relatos) em tempo real.
* **StyleSheet Nativo:** Estilização sob medida feita do zero para rodar liso na Web, garantindo bordas arredondadas, sombras bonitas e uma largura máxima controlada (`maxWidth: 480px`) para o layout não ficar esticado e bizarro.

---

## 🚀 Como rodar o projeto na sua máquina (Instruções Básicas)

Para botar o app para funcionar, você só precisa ter o **Node.js** instalado. Depois, segue o fluxo no terminal:

### 1. Entra na pasta do projeto:
```bash
cd voz-do-bairro

2. Instalar as dependências:

npm install

3. Starta o servidor do Expo limpando o cache anterior:

npx expo start --clear

---

⌨️ Atalhos salvadores no terminal:

Aperte w e o app abre direto no seu navegador web padrão.

Aperte a para abrir no emulador Android.

Aperte i para abrir no emulador iOS.

💻 Testando como App de Desktop (PWA)
Como o layout foi blindado para telas grandes, você pode testar o projeto como se fosse um programa de computador de verdade:

Abra o app no Google Chrome (http://localhost:19006).

Clique nos três pontinhos ⋮ no canto superior direito do navegador.

Vá em Salvar e compartilhar > Criar atalho...

Marque a caixinha "Abrir como janela" e clique em Criar.

Pronto! O app ganha uma janela exclusiva sem abas e vira um software desktop com atalho na sua Área de Trabalho.

📌 Notas de Desenvolvimento
Web First & StyleSheet: Mudei o foco do Tailwind/NativeWind para o StyleSheet nativo do React Native. Essa decisão corrigiu os bugs de CSS que davam tilt no navegador, deixando o menu inferior e os formulários limpos, modernos e funcionais.

🎓 Quem Fez (Membros: 1):
Desenvolvedor: Breno da Silva Bonim
Matrícula: 202508233371
Curso: Engenharia de Software
Disciplina: Programação para dispositivos móveis em Android