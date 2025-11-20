# 📚 **\[BackEnd\] Plataforma de Aulas --- Professores & Alunos**

API desenvolvida em **Node.js + Express + Prisma**, responsável por
fornecer serviços de autenticação, gerenciamento de posts, professores e
alunos, além de suportar toda a camada de dados da aplicação FrontEnd.

------------------------------------------------------------------------

## 🧰 **1. Setup Inicial**

### **1.1 Requisitos do Sistema**

  ------------------
  \### **BackEnd**
  ------------------

-   **Linguagem:** Node.js \>= 18\
-   **Framework:** Express\
-   **ORM:** Prisma\
-   **Banco de Dados:** SQLite\
-   **Requisitos adicionais:** Docker (opcional, mas recomendado)\
-   **CI/CD:** GitHub Actions + DockerHub

------------------------------------------------------------------------

### **1.2 Instalação do Projeto**

  ------------------
  \### **BackEnd**
  ------------------

### **1. Clonar o repositório**

``` bash
git clone https://github.com/VillaresON/5FSDT-Fase-4-Tech-Challenge.git
cd 5FSDT-Fase-4-Tech-Challenge
```

------------------------------------------------------------------------

### **2. Criar o arquivo `.env`**

Crie um `.env` baseado no `.env.example`.\
Exemplo:

    PORT=3000
    JWT_SECRET=sua_chave_jwt

------------------------------------------------------------------------

### **3. Instalar dependências**

``` bash
npm install
```

------------------------------------------------------------------------

### **4. Gerar o Prisma Client**

``` bash
npx prisma generate
```

------------------------------------------------------------------------

### **5. Rodar migrações (se houver)**

``` bash
npx prisma migrate dev
```

------------------------------------------------------------------------

### **6. Rodar a aplicação**

``` bash
npm run start
```

A API estará disponível em:

    http://localhost:3000

------------------------------------------------------------------------

### **7. (Opcional) Rodar com Docker**

#### **1. Baixar imagem do DockerHub**

``` bash
docker pull <SEU_USER>/5FSDT-Fase-4Tech-Challenge:latest
```

#### **2. Executar o container**

``` bash
docker run -d   --name TechChallengeBackend   -p 3000:3000   <SEU_USER>/5FSDT-Fase-4Tech-Challenge:latest
```

------------------------------------------------------------------------

## 🏗️ **2. Arquitetura da Aplicação**

### **2.1 Visão Geral**

O backend segue uma arquitetura organizada e escalável:

-   **Node.js + Express** para criação da API\
-   **Prisma ORM** para acesso ao banco de dados\
-   **SQLite** para persistência\
-   **JWT** para autenticação\
-   **GitHub Actions + Docker Hub** para automação de deploy

------------------------------------------------------------------------

### **2.2 Diagrama da Arquitetura**

    [Frontend] ---> [Backend API REST] ---> [Prisma ORM] ---> [SQLite Database]

    [GitHub Actions] ---> [Docker Build & Push] ---> [DockerHub Repository]

------------------------------------------------------------------------

### **2.3 Estrutura de Diretórios**

    /src
      ├── /controllers
      ├── /middlewares
      ├── /routes
      ├── /prisma
      ├── /utils
      └── server.js
    prisma/schema.prisma
    Dockerfile
    .github/workflows/docker-ci.yml

------------------------------------------------------------------------

### **2.4 Tecnologias Utilizadas**

-   Node.js\
-   Express.js\
-   Prisma ORM\
-   SQLite\
-   JSON Web Token (JWT)\
-   Docker\
-   GitHub Actions\
-   Bcrypt

------------------------------------------------------------------------

## 🔌 **3. Endpoints Principais da API**

### **3.1 Autenticação**

  Método   Rota               Descrição
  -------- ------------------ ----------------------
  POST     `/auth/login`      Login de professor
  POST     `/auth/register`   Criação de professor

------------------------------------------------------------------------

### **3.2 Posts**

  Método   Rota                 Descrição
  -------- -------------------- -----------------------------------
  GET      `/posts`             Lista posts com busca + paginação
  GET      `/posts/:id`         Obtém um post
  POST     `/posts`             Cria um post (professor)
  PUT      `/posts/:id`         Atualiza um post
  DELETE   `/posts/:id`         Remove um post
  GET      `/posts/admin/all`   Lista administrativa

------------------------------------------------------------------------

### **3.3 Professores / Students**

-   `/teachers`
-   `/students`

Realizam:

-   Lista
-   Detalhe
-   Criação
-   Atualização
-   Exclusão

------------------------------------------------------------------------

## 🧪 **4. Testes**

Para executar testes (caso existam):

``` bash
npm test
```

------------------------------------------------------------------------

## 🌀 **5. CI/CD --- Deploy Automático com DockerHub**

O repositório conta com um workflow automático que:

✔ Realiza build\
✔ Executa testes\
✔ Faz login no DockerHub\
✔ Gera e envia a imagem automaticamente

Arquivo usado:

    .github/workflows/docker-ci.yml

A imagem gerada segue o padrão:

    <SEU_USER>/5FSDT-Fase-4Tech-Challenge:latest
    <SEU_USER>/5FSDT-Fase-4Tech-Challenge:<commit_sha>

------------------------------------------------------------------------

## 📎 **6. Links Úteis e Referências**

-   **Repositório Backend:**\
    https://github.com/VillaresON/5FSDT-Fase-4-Tech-Challenge

-   **Docker Hub:**\
    https://hub.docker.com/repository/docker/`<SEU_USER>`{=html}/5FSDT-Fase-4Tech-Challenge

-   **Prisma Docs:**\
    https://www.prisma.io/docs
