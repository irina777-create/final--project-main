# Positivus Landing Page — Starter

Стартовий проєкт для самостійної верстки адаптивної головної сторінки Positivus. Він містить налаштоване складання, залежності, базові Sass-стилі, Bootstrap JavaScript та всі графічні матеріали, але не містить готової верстки сторінки.

## Що вже налаштовано

- Gulp для складання CSS, JavaScript і SVG-спрайта;
- Sass із базовою типографікою, змінними та mixin-ами;
- вибрані модулі Bootstrap 5.3;
- Tailwind CSS 3.4 із префіксом `tw-`;
- PostCSS та Autoprefixer;
- esbuild для Bootstrap JavaScript;
- assets із логотипами, іконками, ілюстраціями та зображеннями.

## Запуск

1. Встановити [Node.js](https://nodejs.org/) і [pnpm](https://pnpm.io/installation).

2. Перейти до папки starter-проєкту:

   ```bash
   cd html_css_final_project_empty
   ```

3. Встановити залежності:

   ```bash
   pnpm install
   ```

4. Запустити режим розробки:

   ```bash
   pnpm dev
   ```

5. Відкрити `index.html` через Live Server або інший локальний HTTP-сервер.

6. Створити production-збірку:

   ```bash
   pnpm bash

   ```

Результати складання з’являться у `dist/styles`, `dist/scripts` і `dist/assets/icons`.
