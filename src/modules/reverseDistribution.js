/**
 * @module reverseDistribution
 * @description
 * Этот модуль реализует алгоритм обратного распространения ошибки для однослойного перцептрона.
 * Функция reverseDistribution обновляет веса нейронной сети посредством градиентного спуска,
 * используя случайно выбранные обучающие примеры из набора trainingData. Кроме того, она собирает
 * историю изменения точности предсказания (в процентах), что может быть полезно для отладки или
 * визуализации кривой обучения.
 */

import { dsigmoid } from "../helpers/math";
import { trainingData } from "../data/trainingData.json";
import * as math from "mathjs";

/**
 * Выполняет обратное распространение ошибки для нейронной сети и обновляет ее веса.
 *
 * @function reverseDistribution
 * @param {Object} options - Объект с параметрами.
 * @param {Object} options.neuronNetwork - Экземпляр нейронной сети, созданный с помощью createNeuronNetwork.
 * @param {number} options.epochs - Количество эпох обучения.
 * @param {number} options.learningRate - Скорость обучения.
 * @param {function} [options.epochCallback] - Функция обратного вызова, вызываемая после каждой эпохи.
 *     Принимает объект с полями:
 *         - epoch {number}: номер текущей эпохи.
 *         - certainty {number}: точность предсказания (в процентах), вычисленная как (1 - |predictionError|) * 100.
 * @returns {Array<Object>} history - Массив объектов, содержащих историю обучения. Каждый объект имеет поля:
 *                                      - epoch {number}: номер эпохи.
 *                                      - certainty {number}: точность предсказания в процентах.
 *
 * @example
 * const history = reverseDistribution({
 *   neuronNetwork,
 *   epochs: 1000,
 *   learningRate: 0.1,
 *   epochCallback: ({ epoch, certainty }) => {
 *     console.log(`Эпоха ${epoch}: точность ${certainty}%`);
 *   }
 * });
 * console.log(history);
 */
const reverseDistribution = ({ neuronNetwork, epochs, learningRate, epochCallback }) => {
    // Обучающие данные
    const data = trainingData;
    // Массив для хранения истории обучения (номер эпохи и точность предсказания)
    const history = [];

    // Помечаем нейросеть как обученную
    neuronNetwork.trained = true;

    /**
     * Возвращает случайный обучающий пример из trainingData.
     * @returns {Object} Случайный обучающий пример.
     */
    const randomTrainingCase = () => {
        const index = Math.floor(Math.random() * data.length);
        return data[index];
    };

    // Деструктурируем веса нейронной сети
    const {
        _inputWeights: inputWeights,
        _hiddenWeights: hiddenWeights
    } = neuronNetwork;

    // Проходим по эпохам обучения
    for (let epoch = 0; epoch < epochs; epoch++) {
        const trainingCase = randomTrainingCase();
        // Получаем результат предсказания для выбранного обучающего примера
        const result = neuronNetwork.predict(...trainingCase.inputs);

        // Вычисляем ошибку выходного нейрона (разность между предсказанием и целевым значением)
        const predictionError = (result.outputVector[0] - trainingCase.target);
        // Модифицируем ошибку с учетом производной сигмоидальной функции для корректировки весов
        const error = predictionError * dsigmoid(result.sigmoidVectors[1][0][0]);

        // Корректировка весов выходного слоя (элементы матрицы hiddenWeights)
        hiddenWeights[0][0] -= result.sigmoidVectors[0][0] * error * learningRate;
        hiddenWeights[0][1] -= result.sigmoidVectors[0][1] * error * learningRate;

        // Вычисляем ошибку для скрытого слоя, используя матричное умножение
        const nextLayerErrors = math.multiply([[error]], hiddenWeights);
        nextLayerErrors[0][0] *= dsigmoid(result.sigmoidVectors[0][0][0]);
        nextLayerErrors[0][1] *= dsigmoid(result.sigmoidVectors[0][1][0]);

        // Корректировка весов скрытого слоя (элементы матрицы inputWeights)
        for (let i = 0; i < inputWeights.length; i++) {
            for (let j = 0; j < inputWeights[i].length; j++) {
                inputWeights[i][j] -= result.inputVector[j][0] * nextLayerErrors[0][i] * learningRate;
            }
        }

        // Вычисляем точность предсказания (certainty) как (1 - |predictionError|) * 100
        const certainty = (1 - Math.abs(predictionError)) * 100;

        // Вызываем функцию обратного вызова, если она предоставлена
        if (epochCallback) {
            epochCallback({ epoch, certainty });
        }

        // Добавляем запись в историю обучения
        history.push({ epoch, certainty });
    }

    // Возвращаем историю обучения
    return history;
};

export default reverseDistribution;
