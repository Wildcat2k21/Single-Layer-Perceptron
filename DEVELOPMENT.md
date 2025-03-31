# Инструкция по разработке проекта

## 🌳 Структура проекта

```
│   .gitignore
│   DEVELOPMENT.md
│   eslint.config.mjs
│   favicon.ico
│   index.html
│   LICENSE
│   package-lock.json
│   package.json
│   README.md
│
├───modules docs
│       charts.md
│       math.md
│       p5.md
│
└───src
    │   index.js
    │
    ├───constants
    │       selectors.js
    │
    ├───data
    │       trainingData.json
    │
    ├───helpers
    │       chart.js
    │       math.js
    │
    ├───modules
    │       createNeuronNetwork.js
    │       reverseDistribution.js
    │
    ├───p5
    │       perceptronSketch.js
    │
    ├───preload
    │       inputRangeListeners.js
    │
    ├───styles
    │       index.css
    │
    └───utils
            certaintyChart.js
```

## 📌 Установка и настройка Vite

Проект использует **Vite** для удобной разработки и сборки.

### 1. Установка зависимостей

1. Установите зависимости проекта:
   ```bash
   npm install
   ```
2. Запустите локальный сервер разработки:
   ```bash
   npm run dev
   ```
3. Для сборки проекта используйте:
   ```bash
   npm run build
   ```

## 📌 Линтер и форматирование кода

В проекте используется **ESLint** для поддержания чистоты кода.

### 1. Установка и настройка ESLint

1. Установите ESLint:
   ```bash
   npm install eslint --save-dev
   ```
2. В проекте уже есть конфигурация в файле `eslint.config.mjs`.
3. Проверить код можно командой:
   ```bash
   npx eslint .
   ```
4. Автоматически исправить ошибки можно так:
   ```bash
   npx eslint --fix .
   ```

## ⚙️ Основные модули проекта

- `helpers/chart.js` — вспомогательные функции для работы с графиками.
- `helpers/math.js` — математические функции для работы с перцептроном.
- `modules/createNeuronNetwork.js` — создание и настройка нейросети.
- `modules/reverseDistribution.js` — обратное распределение значений.
- `p5/perceptronSketch.js` — визуализация работы перцептрона.
- `preload/inputRangeListeners.js` — обработчики событий для UI-элементов.
- `utils/certaintyChart.js` — генерация графиков уверенности предсказаний.

## 📚 Используемые библиотеки

### 📊 Chart.js
Chart.js используется для построения графиков и визуализации данных.
Документация: [https://www.chartjs.org/docs/latest/](https://www.chartjs.org/docs/latest/)

### 🎨 P5.js
P5.js помогает визуализировать работу перцептрона.
Документация: [https://p5js.org/reference/](https://p5js.org/reference/)

## 🧑‍💻 Полезные команды Git

- Добавить все изменения:
  ```bash
  git add .
  ```
- Сделать коммит:
  ```bash
  git commit -m "Описание изменений"
  ```
- Отправить в репозиторий:
  ```bash
  git push origin main
  ```
- Проверить статус репозитория:
  ```bash
  git status
  ```

## 🚀 Запуск проекта

1. Установите зависимости `npm install`.
2. Запустите сервер разработки `npm run dev`.
3. Открывайте `http://localhost:5173` в браузере.

Проект готов к работе! 🎯

