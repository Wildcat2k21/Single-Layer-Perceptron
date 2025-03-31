import { defineConfig } from "vite";

export default defineConfig({
    // Здесь можно указать дополнительные параметры конфигурации Vite
    root: "./", // Путь к корневой папке вашего проекта
    build: {
        outDir: "build" // Папка для выходных файлов
    }
});
