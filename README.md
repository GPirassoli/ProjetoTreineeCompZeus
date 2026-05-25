# Projeto ZEUS - Treinee CompJunior Mobile 2026

Sistema interno da Comp Júnior voltado para cadastro e gerenciamento de informações da empresa.
O ZEUS funciona como um sistema ERP mobile simplificado, permitindo a administração de Membros, Clientes, Equipamentos, Orçamentos e Penalidades.

## 💻 Tecnologias Utilizadas

- **React Native**: Framework principal para o desenvolvimento mobile cross-platform (Android e iOS).
- **JavaScript**: Linguagem de programação base do projeto.
- **React Context API**: Gerenciamento de estado global da aplicação.
- **React Navigation**: Gerenciamento de rotas e navegação entre telas (stack navigation).

## 🧠 Justificativas Técnicas

- **React Native:** Escolhido por permitir a criação de aplicativos nativos para iOS e Android usando uma base de código única, acelerando o desenvolvimento e facilitando a manutenção da equipe.
- **Context API:** Optamos por utilizar a Context API nativa do React em vez de bibliotecas externas (como Redux ou Zustand) devido à leveza e simplicidade. Como a aplicação lida com fluxos de CRUD (Create, Read, Update, Delete) independentes (clientes, membros, etc.), o Contexto fornece o isolamento e o compartilhamento de estado perfeito sem adicionar complexidade desnecessária.
- **Layout Responsivo:** Utilização nativa do hook `useWindowDimensions` para criar condicionalmente um layout que se adapta automaticamente, entregando uma excelente experiência tanto em smartphones quanto em tablets.
- **Emails Pré-Determinados:** Optamos por utilizar um sistema em que a pessoa receberia o perfil dela pela administração, indispensando assim de um sistema para criação de contas. Com os e-mails válidos sendo colocados diretamente no sistema.

## 📂 Estrutura do Projeto

A arquitetura foi dividida focando na separação de responsabilidades e na reutilização de código:

```text
src/
 ┣ assets/        # Imagens, logotipos e ícones (lupa, menu, etc).
 ┣ componentes/   # Componentes visuais reutilizáveis (BarraSuperior, MenuLateral, ImagemZeus, Pedido, ButtonConf).
 ┣ contextos/     # Lógica de negócios e estado global (ClientesContext, MembrosContext, etc).
 ┗ telas/         # Telas completas da aplicação (Login, Home, listagens, formulários de edição e adição).
```

## 🚀 Instruções de Execução

Para rodar o projeto localmente, siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd ZeusCompTreinee
   ```

2. **Instale as dependências:**
   ```bash
   npm install 
   # ou
   yarn install
   ```
   *(Este comando baixará automaticamente todas as bibliotecas do projeto, incluindo o **React Navigation**).*

3. **Execute o Metro Bundler:**
   ```bash
   npx react-native start
   ```

4. **Rode o aplicativo (Android):**
   ```bash
   npx react-native run-android
   ```

## 🌐 API Pública e Dados

No momento, o aplicativo **não utiliza uma API pública ou remota**. 
Para fins de desenvolvimento e demonstração, os dados estão sendo "mockados" (simulados) em memória através dos *Providers* da Context API. Operações de criação, edição e exclusão alteram o estado localmente enquanto o aplicativo estiver aberto.
