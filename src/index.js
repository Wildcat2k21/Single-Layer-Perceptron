// Импортируем однослойный перцептрон и функцию обратного распространения ошибки
import createNeuronNetwork from "./modules/createNeuronNetwork";
import reverseDistribution from "./modules/reverseDistribution";
import "./preload/inputRangeListeners";
import { trainingData } from "./data/trainingData.json";
import { createCertaintyChart, updateCertaintyChart } from "./utils/certaintyChart";

import {
    SPAN_PREDICTION_SELECTOR,
    CONDITION1_SELECTOR,
    CONDITION2_SELECTOR,
    CONDITION3_SELECTOR,
    TRAIN_BUTTON_SELECTOR,
    INPUT_RANGE_EPOCH_SELECTOR,
    INPUT_RANGE_LERNING_SELECTOR
} from "./constants/selectors";

import { drawPerceptron } from "./p5/perceptronSketch";

// Инициализируем нейроны (3 входа, 2 скрытых, 1 выходной)
const neuronNetwork = new createNeuronNetwork(3, 2, 1);

// Будущий график
let certaintyChart;

// Функция для получения входных данных из чекбоксов
const getInputValues = () => {
    const condition1 = document.querySelector(CONDITION1_SELECTOR).checked ? 1 : 0;
    const condition2 = document.querySelector(CONDITION2_SELECTOR).checked ? 1 : 0;
    const condition3 = document.querySelector(CONDITION3_SELECTOR).checked ? 1 : 0;
    return [condition1, condition2, condition3];
};

// Функция для запуска обучения, обновления графика и отображения результата
const runPredictionAndTrain = () => {
    // Считываем входные данные до обучения
    const inputs = getInputValues();

    // Считываем параметры обучения из range-инпутов
    const learningRate = parseFloat(document.querySelector(INPUT_RANGE_LERNING_SELECTOR).value);
    const epochs = parseInt(document.querySelector(INPUT_RANGE_EPOCH_SELECTOR).value);

    if (!neuronNetwork.trained) {
        // Запускаем обратное распространение ошибки (обучение)
        const trainingHistory = reverseDistribution({ neuronNetwork, epochs, learningRate });
        // Обновляем график обучения, если имеются данные
        if (trainingHistory.length > 0) {
            updateCertaintyChart(trainingHistory, certaintyChart);
        }
    }

    // Считываем предсказание после обучения
    const newPrediction = neuronNetwork.predict(...inputs);

    // Функция для получения текста предсказания по значению
    const predictionMeaning = (val) =>
        val > 0.5 ? "[Уходим c пары]" : "[Остаемся на паре]";

    const predictionText = "Нейросеть считает: " + predictionMeaning(newPrediction.outputVector[0][0]);
    // Ищем корректный trainingData по входным данным
    const validAnswer = trainingData.find(item =>
        item.inputs.every((val, i) => val === inputs[i])
    );

    // Вычисляем точность (чем меньше разница, тем выше точность)
    const certainty = (1 - Math.abs(newPrediction.outputVector[0][0] - validAnswer.target)) * 100;

    const predictionElem = document.querySelector(SPAN_PREDICTION_SELECTOR);
    predictionElem.innerHTML = predictionText;
    predictionElem.innerHTML += "<br/><br/>Верный ответ: " + validAnswer.target + " " + predictionMeaning(validAnswer.target);
    predictionElem.innerHTML += "<br/>Точность ответа: " + certainty.toFixed(3) + "%";
};

// Обработчик клика по кнопке "Обучить"
document.querySelector(TRAIN_BUTTON_SELECTOR).addEventListener("click", runPredictionAndTrain);

document.addEventListener("DOMContentLoaded", () => {
    certaintyChart = createCertaintyChart();
    drawPerceptron(getInputValues()); // Отрисовка при загрузке
});
