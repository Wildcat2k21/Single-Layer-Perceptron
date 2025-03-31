// Модуль графика точности

import { Chart, registerables } from "chart.js";
import { chartOptions } from "../helpers/chart";
import { CHERS_CONTENT_SELECTOR } from "../constants/selectors";

// Регистрируем все необходимые компоненты Chart.js
Chart.register(...registerables);

// Создаем график с помощью Chart.js
export const createCertaintyChart = () => {
    const certaintyCanvas = document.createElement("canvas");
    certaintyCanvas.className = "certaintyChart";
    certaintyCanvas.width = 800;
    certaintyCanvas.height = 400;

    document.querySelector(CHERS_CONTENT_SELECTOR)
        .appendChild(certaintyCanvas);

    const ctx = certaintyCanvas.getContext("2d");
    const certaintyChart = new Chart(ctx, chartOptions("Точность", "Эпоха"));
    return certaintyChart;
};

// Обновляем данные графика, используя массив trainingHistory
export const updateCertaintyChart = (trainingHistory, certaintyChart) =>  {
    const epochs = trainingHistory.map(item => item.epoch);
    const certainty = trainingHistory.map(item => item.certainty);

    const sliceEvery = Math.floor(trainingHistory.length / 100);
    const slicedEpochs = epochs.filter((_, index) => index % sliceEvery === 0);
    const slicedcertainty = certainty.filter((_, index) => index % sliceEvery === 0);

    certaintyChart.data.labels = slicedEpochs;
    certaintyChart.data.datasets[0].data = slicedcertainty;
    certaintyChart.update();
};
