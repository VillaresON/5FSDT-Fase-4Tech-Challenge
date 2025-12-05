# 📚 4ª Fase – Tech Challenge  
## 🖥️ Backend Oficial — Node.js + Express + Sequelize + SQLite3  
### Autor: **Jonathas Villares**

---

## 🎯 Sobre o Projeto

Este repositório contém o **backend completo** do Tech Challenge da 4ª fase, desenvolvido com:

- **Node.js** + **Express**
- **Sequelize ORM**
- **SQLite3**
- Autenticação com **JWT**
- Hash de senha com **bcrypt**
- CI/CD com **GitHub Actions**
- Deploy automático para Docker Hub:

```
villares/4fase-tech-challenge-back-end:latest
```

O sistema implementa Posts, Professores, Estudantes e Comentários, com permissões e autenticação completas.

---

## 🚀 Funcionalidades

### 👨‍🏫 Professores
- CRUD completo  
- Admins podem criar/remover professores  
- Professores editam apenas seus próprios dados

### 👨‍🎓 Estudantes
- CRUD completo  
- Professores autenticados podem gerenciar estudantes

### 📝 Postagens
- Listagem com paginação e busca (`?search=palavra`)
- Visualização completa
- Criação, edição e exclusão (autor/admin)
- Comentários vinculados

### 🔐 Autenticação
- JWT  
- Middleware de proteção  
- Permissões por tipo de usuário

---

## 🏗️ Estrutura do Projeto

```
backend/
├── server.js
├── package.json
├── Dockerfile
├── docker-compose.yml
├── .sequelizerc
├── .env.example
├── src/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middlewares/
│   └── seeders/
├── migrations/
├── seeders/
└── .github/
    └── workflows/
        ├── ci.yml
        └── docker-publish.yml
```

---

## ⚙️ Pré-requisitos

- Node.js 18+  
- NPM  
- Docker (opcional)

---

## ▶️ Como rodar localmente

### 1️⃣ Instalar dependências
```bash
npm install
```

### 2️⃣ Configurar `.env`
```bash
cp .env.example .env
```

Defina um valor forte para:
```
JWT_SECRET=seu_token_secreto
```

### 3️⃣ Criar admin automaticamente
```bash
npm run seed
```

Admin criado:
```
Email: admin@admin.com
Senha: admin123
```

### 4️⃣ Rodar API
```bash
npm run dev
```

API em:
```
http://localhost:3000
```

---

## 📡 Endpoints Principais

### Autenticação
| Método | Rota | Ação |
|--------|------|-------|
| POST | `/auth/login` | Login |
| POST | `/auth/register` | Criar professor |

### Posts
| Método | Rota |
|--------|-------|
| GET | `/posts` |
| GET | `/posts/:id` |
| POST | `/posts` |
| PUT | `/posts/:id` |
| DELETE | `/posts/:id` |

### Comentários
| Método | Rota |
|--------|-------|
| GET | `/posts/:postId/comments` |
| POST | `/posts/:postId/comments` |

### Professores
| CRUD completo | `/teachers` |

### Estudantes
| CRUD completo | `/students` |

---

## 🐳 Docker

### Build local
```bash
docker build -t villares/4fase-tech-challenge-back-end .
```

### Docker Compose
```bash
docker-compose up --build
```

### Pull Image
```bash
docker pull villares/4fase-tech-challenge-back-end:latest
```

### Executar container
```bash
docker run --name TechChallenge -p 3000:3000 --env-file .env villares/4fase-tech-challenge-back-end:latest
```


---

## 🔄 CI/CD — GitHub Actions

### `ci.yml`
- Instala dependências  
- Testa build  
- Executa testes (placeholder)

### `docker-publish.yml`
Ao fazer push para `main`, ele:

1. Constrói a imagem  
2. Envia para Docker Hub:  
```
villares/4fase-tech-challenge-back-end:latest
```

---

## 🏁 Conclusão

Este backend segue padrões profissionais:

- Arquitetura limpa  
- Autenticação robusta  
- Permissões avançadas  
- CI/CD completo  
- Deploy automatizado via Docker Hub  
