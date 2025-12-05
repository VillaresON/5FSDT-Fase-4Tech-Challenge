📘 README.md — Backend Node.js + Express + Sequelize + SQLite
# 📚 4ª Fase – Tech Challenge  
## 🖥️ Backend Oficial — Node.js + Express + Sequelize + SQLite3  
### Autor: **Jonathas Villares**

---

## 🎯 Sobre o Projeto

Este repositório contém o **backend completo** do Tech Challenge da 4ª fase, desenvolvido com:

- **Node.js** + **Express**
- **Sequelize ORM**
- **SQLite3** (leve, simples e ideal para ambiente acadêmico)
- Autenticação com **JWT**
- Hash de senha com **bcrypt**
- Padrão REST profissional
- CI/CD com **GitHub Actions**
- Deploy via imagem Docker enviada automaticamente para o Docker Hub:



villares/4fase-tech-challenge-back-end:latest


O sistema implementa toda a estrutura de **Posts, Professores e Estudantes**, incluindo autenticação, permissões, CRUD completo e comentários.

---

## 🚀 Funcionalidades

### 👨‍🏫 Professores
- Cadastro, edição, listagem e exclusão
- Apenas **admins** podem cadastrar e excluir professores
- Professores comuns podem editar apenas seus próprios dados

### 👨‍🎓 Estudantes
- CRUD completo
- Professores autenticados podem gerenciar estudantes

### 📝 Postagens
- Listagem com paginação e busca (`?search=palavra`)
- Exibição completa do post
- Criação de post (professor autenticado)
- Edição e exclusão (somente autor ou admin)
- Comentários vinculados aos posts

### 🔐 Autenticação e Autorização
- Login via JWT
- Rotas protegidas com middleware
- Controle de permissões (admin, autor, usuário comum)

---

## 🏗️ Arquitetura do Projeto



backend/
├── server.js
├── package.json
├── Dockerfile
├── docker-compose.yml
├── .sequelizerc
├── .env.example
├── src/
│ ├── config/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middlewares/
│ └── seeders/
├── migrations/
├── seeders/
└── .github/
└── workflows/
├── ci.yml
└── docker-publish.yml


---

## ⚙️ Pré-requisitos

- **Node.js 18+**
- **NPM**
- Docker (opcional)
- Git

---

## ▶️ Como rodar localmente

### 1️⃣ Instale dependências

```bash
npm install

2️⃣ Configure o ambiente

Copie o arquivo exemplo:

cp .env.example .env


E defina um valor forte para:

JWT_SECRET=seu_token_secreto

3️⃣ Crie o banco e o admin automaticamente
npm run seed


O seed cria:

Login admin:
Email: admin@admin.com
Senha: admin123

4️⃣ Rode o backend
npm run dev


API rodando em:

http://localhost:3000

📡 Endpoints
🔐 Autenticação
Método	Rota	Descrição
POST	/auth/login	Login
POST	/auth/register	Criar professor (ideal para admins)
📝 Posts
Método	Rota	Descrição
GET	/posts	Listar posts
GET	/posts/:id	Detalhes do post
POST	/posts	Criar post (login obrigatório)
PUT	/posts/:id	Editar post
DELETE	/posts/:id	Excluir post
💬 Comentários
Método	Rota	Descrição
GET	/posts/:postId/comments	Listar comentários
POST	/posts/:postId/comments	Criar comentário
👨‍🏫 Professores
Método	Rota
GET	/teachers
GET	/teachers/:id
POST	/teachers
PUT	/teachers/:id
DELETE	/teachers/:id
👨‍🎓 Estudantes
Método	Rota
GET	/students
GET	/students/:id
POST	/students
PUT	/students/:id
DELETE	/students/:id
🧪 Testando no VSCode / Insomnia / Postman
Login primeiro:

POST /auth/login

{
  "email": "admin@admin.com",
  "password": "admin123"
}


Use o token retornado em:

Authorization: Bearer <token>

🐳 Rodando com Docker
Build local
docker build -t villares/4fase-tech-challenge-back-end .

Rodar o container
docker run -p 3000:3000 --env-file .env villares/4fase-tech-challenge-back-end

Docker-compose
docker-compose up --build

🔄 CI/CD — GitHub Actions

Este backend possui integração contínua:

ci.yml

Instala dependências

Valida build

Executa testes (placeholder)

Valida projeto

docker-publish.yml

Ao fazer push na branch main, o GitHub:

Constrói a imagem Docker

Faz push automático para o Docker Hub:

villares/4fase-tech-challenge-back-end:latest