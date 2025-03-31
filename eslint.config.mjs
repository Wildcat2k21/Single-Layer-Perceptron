import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
    {
    // Игнорируемые файлы и папки libs
        ignores: ["scripts/libs/**"]
    },
    {
    // Применяем ко всем JS-файлам
        files: ["**/*.{js,mjs,cjs}"]
    },
    {
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: {
            globals: globals.browser, // Глобальные переменные браузера
            sourceType: "module"      // Используем ES-модули
        }
    },
    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: { js, import: importPlugin },
        extends: ["js/recommended"],
        rules: {
            // Основные стилистические правила
            indent: ["error", 4],                   // Отступы в 2 пробела
            quotes: ["error", "double"],            // Использование двойных кавычек
            semi: ["error", "always"],              // Всегда ставить точку с запятой
            "no-console": "warn",                   // Предупреждение при использовании console
            eqeqeq: "error",                        // Использование === вместо ==
            curly: "error",                         // Обязательное использование фигурных скобок
            "comma-dangle": ["error", "never"],     // Запрещены завершающие запятые
            "space-before-function-paren": ["error", "never"], // Нет пробела перед скобками функций
            "keyword-spacing": ["error", { before: true, after: true }], // Пробелы вокруг ключевых слов

            // Правила для импорта
            "import/first": "error",                // Все импорты должны быть в начале файла

            // Правило для неиспользуемых переменных
            "no-unused-vars": "error",              // Ошибка, если переменная объявлена, но не используется

            // Дополнительные полезные правила:
            "eol-last": "error",                    // Требовать наличие пустой строки в конце файла
            "no-trailing-spaces": "error",          // Запрещать пробелы в конце строки
            "no-multiple-empty-lines": ["error", { max: 1 }] // Не более одной пустой строки подряд
        }
    }
]);
