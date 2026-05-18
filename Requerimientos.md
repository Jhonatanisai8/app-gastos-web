# App de Gastos Personales — Arquitectura Completa

## Stack Tecnológico

### Backend
- Java 21
- Spring Boot 3
- Spring Security
- JWT
- PostgreSQL
- Flyway
- MapStruct

### Frontend
- React Native
- Expo Go
- Expo Router
- Zustand
- React Query

---

# 1. Arquitectura General

```text
React Native (Expo)
        │
        │ HTTPS + JWT
        ▼
Spring Boot API
        │
 ┌──────┴──────┐
 │             │
PostgreSQL   Redis(opcional)
```

---

# 2. Funcionalidades Principales

## Usuarios
- Registro
- Login
- Perfil
- Configuración monetaria

## Gastos
- Registrar gastos
- Editar gastos
- Eliminar gastos
- Categorías
- Métodos de pago

## Ingresos
- Registrar ingresos
- Historial de ingresos

## Predicciones
- Predicción semanal
- Predicción mensual
- Flujo de dinero

## Reportes
- Diario
- Semanal
- Mensual
- Por categorías

---

# 3. Modelo de Entidades

```text
User
 ├── Expense
 ├── Income
 ├── Budget
 ├── Category
 └── PaymentMethod

Expense
 ├── belongs to User
 ├── belongs to Category
 └── belongs to PaymentMethod

Income
 └── belongs to User

Budget
 ├── belongs to User
 └── belongs to Category

Category
 └── belongs to User
```

---

# 4. Entidades

## User

```text
id
name
email
password
currency
createdAt
updatedAt
```

---

## Expense

```text
id
title
description
amount
expenseDate
type (FIXED | VARIABLE)
userId
categoryId
paymentMethodId
createdAt
```

---

## Income

```text
id
title
amount
incomeDate
userId
createdAt
```

---

## Category

```text
id
name
icon
color
type (EXPENSE | INCOME)
userId
```

---

## Budget

```text
id
limitAmount
month
year
categoryId
userId
```

---

## PaymentMethod

```text
id
name
type (CASH | CARD | YAPE | PLIN | BANK)
userId
```

---

# 5. Predicciones Financieras

## Lógica Inicial

```text
promedio últimos 30 días
+
tendencia semanal
+
comparación histórica
```

## Ejemplo

```text
Últimos 4 lunes:
50
70
65
55

Promedio:
60

Predicción próximo lunes:
≈ 60-65
```

---

# 6. Endpoints REST

# AUTH

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh
```

---

# USER

```http
GET    /api/v1/users/me
PUT    /api/v1/users/me
```

---

# EXPENSES

```http
GET    /api/v1/expenses
GET    /api/v1/expenses/{id}
POST   /api/v1/expenses
PUT    /api/v1/expenses/{id}
DELETE /api/v1/expenses/{id}
```

---

# INCOMES

```http
GET    /api/v1/incomes
POST   /api/v1/incomes
PUT    /api/v1/incomes/{id}
DELETE /api/v1/incomes/{id}
```

---

# CATEGORIES

```http
GET    /api/v1/categories
POST   /api/v1/categories
PUT    /api/v1/categories/{id}
DELETE /api/v1/categories/{id}
```

---

# BUDGETS

```http
GET    /api/v1/budgets
POST   /api/v1/budgets
PUT    /api/v1/budgets/{id}
DELETE /api/v1/budgets/{id}
```

---

# REPORTS

```http
GET /api/v1/reports/daily
GET /api/v1/reports/weekly
GET /api/v1/reports/monthly
GET /api/v1/reports/category
```

---

# PREDICTIONS

```http
GET /api/v1/predictions/weekly
GET /api/v1/predictions/monthly
GET /api/v1/predictions/cashflow
```

---

# 7. Arquitectura Backend

```text
backend/
└── src/main/java/com/financeapp
    ├── config
    ├── security
    │
    ├── auth
    │   ├── controller
    │   ├── dto
    │   ├── service
    │   └── jwt
    │
    ├── user
    │   ├── controller
    │   ├── dto
    │   ├── entity
    │   ├── repository
    │   ├── service
    │   └── mapper
    │
    ├── expense
    ├── income
    ├── category
    ├── budget
    ├── report
    ├── prediction
    │
    ├── common
    │   ├── exception
    │   ├── response
    │   ├── util
    │   └── constants
    │
    └── FinanceApplication.java
```

---

# 8. Arquitectura Frontend

```text
mobile/
├── app
│   ├── (auth)
│   │   ├── login.tsx
│   │   └── register.tsx
│   │
│   ├── (tabs)
│   │   ├── home.tsx
│   │   ├── expenses.tsx
│   │   ├── reports.tsx
│   │   └── profile.tsx
│   │
│   ├── expense
│   │   ├── create.tsx
│   │   └── edit.tsx
│   │
│   └── _layout.tsx
│
├── src
│   ├── components
│   ├── hooks
│   ├── services
│   ├── store
│   ├── constants
│   ├── utils
│   ├── types
│   ├── theme
│   └── validations
│
├── assets
├── package.json
└── app.json
```

---

# 9. Librerías Recomendadas

## Backend

```text
Spring Web
Spring Security
Spring Data JPA
Validation
PostgreSQL Driver
JWT
MapStruct
Lombok
Flyway
```

---

## Frontend

```text
expo-router
axios
zustand
react-query
react-hook-form
zod
nativewind
victory-native
react-native-svg
```

---

# 10. Pantallas

## Auth
- Login
- Registro

## Principal
- Dashboard
- Agregar gasto
- Historial
- Reportes
- Predicciones
- Configuración

---

# 11. Dashboard

## Cards

```text
Saldo actual
Gastos del mes
Ingresos del mes
Ahorro proyectado
```

## Gráficos

```text
Pie chart -> categorías
Line chart -> gasto semanal
Bar chart -> gasto mensual
```

---

# 12. Flujo de Desarrollo

## FASE 1
- JWT
- Usuarios
- CRUD gastos

## FASE 2
- Frontend básico
- Login
- CRUD gastos

## FASE 3
- Reportes

## FASE 4
- Predicciones

## FASE 5
- Deploy

---

# 13. Base de Datos

## Recomendación
PostgreSQL

### Motivos
- Excelente integración con Spring Boot
- Escalable
- Gratuito
- Muy estable

---

# 14. Deploy

## Backend
- Railway
- Render
- VPS Ubuntu + Docker

## Frontend
- Expo EAS Build

---

# 15. Recomendaciones

## NO usar
- Microservicios
- Kafka
- Arquitecturas complejas

## SÍ usar
- Arquitectura modular
- Código limpio
- Separación por módulos

---

# 16. Estructura Ideal

## Backend

```text
Controller
   ↓
Service
   ↓
Repository
   ↓
Database
```

## Frontend

```text
Screen
  ↓
Hook
  ↓
Service(API)
  ↓
Backend
```

---

# 17. Roadmap Recomendado

1. Auth JWT
2. CRUD gastos
3. Dashboard
4. Reportes
5. Predicciones
6. Deploy