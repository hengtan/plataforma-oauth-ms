# 🧱 Arquitetura de Sistema: Plataforma Full-Stack Moderna com OAuth, Microsserviços, Gateway, e Cache-Aside

## 🎯 Objetivo

Construir uma plataforma realista com:

- SPA (React + OAuth 2.1 + PKCE)
- Auth Server com IdentityServer 6
- Microsserviços independentes (.NET 9)
- API Gateway inteligente e seguro
- Validação de JWT + roles/policies
- **Cache-Aside com Redis** para leitura intensiva
- Infra com Docker Compose e PostgreSQL
- System Design desacoplado, seguro e extensível

## 🧠 Visão Geral da Arquitetura

```
┌────────────────────────────────────────────────────────────┐
│                       Frontend (React SPA)                 │
│          - Login via PKCE (OAuth 2.1 + OpenID Connect)     │
│          - Tokens salvos no Zustand                        │
│          - Requisições autenticadas com Bearer Token       │
└──────────────┬──────────────────────┬──────────────────────┘
               │                      │
               ▼                      ▼
      ┌────────────────────┐   ┌────────────────────────────┐
      │    Auth Server     │   │        API Gateway         │
      │  IdentityServer 6  │   │    (ASP.NET Core + YARP)   │
      └────────┬───────────┘   └────────────┬───────────────┘
               │                            │
         PostgreSQL                    Validates JWT
               │                            │
               ▼                            ▼
        ┌──────────────┐        ┌─────────────────────────┐
        │ UserService  │◄───────┤  Redis (Cache-Aside)    │
        └──────────────┘        └─────────────────────────┘
               │
               ▼
         PostgreSQL (UserDB)

        ┌──────────────┐        ┌─────────────────────────┐
        │OrderService  │◄───────┤  Redis (Cache-Aside)    │
        └──────────────┘        └─────────────────────────┘
               │
               ▼
         PostgreSQL (OrderDB)
```

## 🧩 Componentes

[... conteúdo detalhado descrito na resposta anterior ...]

## 📌 Etapas de Execução

1. Criar `auth-server` com IdentityServer 6 e PostgreSQL
2. Criar `frontend` com fluxo PKCE completo
3. Criar `api-gateway` com JWT validation e YARP
4. Criar `user-service` com Redis + PostgreSQL
5. Criar `order-service` idem
6. Testar fluxo fim-a-fim com JWT + cache
7. Orquestrar com Docker Compose
8. Adicionar logout, refresh, revogação
