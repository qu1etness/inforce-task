# Inforce Task

Репозиторій **inforce-task** — це демо‑проєкт для керування товарами (CRUD) з можливістю додавання та видалення коментарів.  
Стек побудовано на **React + Vite + Redux Toolkit (RTK Query)**, з валідацією через **Zod**.

---

## 📁 Структура проєкту

```
/backend              # код серверної частини (Flask або інший API)
/src                  # фронтенд частина (React)
 ├─ /components        # повторно використовувані UI-компоненти
 ├─ /pages             # сторінки: список, деталі продукту тощо
 ├─ /state             # RTK Query API, Redux store
 ├─ /schemas           # Zod схеми для валідації
 ├─ App.tsx            # головний компонент застосунку
 ├─ main.tsx           # точка входу (ReactDOM.createRoot)
vite.config.ts         # конфігурація Vite
tsconfig.json          # налаштування TypeScript
package.json           # залежності та скрипти
```

---

## 🚀 Запуск проєкту

1. Клонувати репозиторій:
   ```bash
   git clone https://github.com/qu1etness/inforce-task.git
   ```

2. Перейти до папки:
   ```bash
   cd inforce-task
   ```

3. Встановити залежності:
   ```bash
   npm install
   ```

4. Запустити дев-сервер:
   ```bash
   npm run dev
   ```

5. (Опціонально) Запустити бекенд, якщо використовується Flask:
   ```bash
   cd backend
   python app.py
   ```

---

## 🧰 Використані технології

- ⚛️ React 19 + TypeScript  
- ⚡️ Vite  
- 🧩 React Router v7  
- 🧠 Redux Toolkit + RTK Query  
- 🧮 Zod для валідації форм  
- 🎨 Tailwind CSS  

---

## 🔄 Функціонал

- Отримання списку продуктів  
- Перегляд детальної інформації про продукт  
- Додавання нового продукту (з валідацією)  
- Видалення продукту  
- Перегляд коментарів товару  
- Додавання / видалення коментарів  
- Автоматичне оновлення кешу через RTK Query (`invalidatesTags`)  

---


## ⚙️ Налаштування API

Файл: `src/state/products-api.ts`  
Редагуй `baseUrl`, щоб підключитися до свого бекенду:
```ts
baseUrl: "http://127.0.0.1:5000"
```

---

