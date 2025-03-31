/**
 * @module createNeuronNetwork
 * @description
 * Этот модуль реализует однослойный перцептрон для прогнозирования. Он инициализирует случайные матрицы весов для входного и скрытого слоев
 * и предоставляет метод предсказания, возвращающий как итоговое предсказание, так и промежуточные данные, необходимые для отладки и дальнейшего обучения.
 *
 * Экспортируемый конструктор:
 * - createNeuronNetwork(inputLayer, hiddenLayer, outputLayer): Создает нейронную сеть с заданным числом нейронов на входном, скрытом и выходном слоях.
 *
 * Возвращаемый объект имеет следующие свойства:
 * - _inputWeights: Матрица весов, соединяющая входной и скрытый слои.
 * - _hiddenWeights: Матрица весов, соединяющая скрытый и выходной слои.
 * - predict: Метод для выполнения предсказания, который принимает входные данные и возвращает промежуточные результаты.
 *
 * Метод predict:
 * - Принимает три числовых аргумента, соответствующих входным данным.
 * - Выполняет следующие шаги:
 *   1. Формирует вектор входных данных.
 *   2. Вычисляет взвешенную сумму для скрытого слоя и применяет сигмоидальную функцию активации.
 *   3. Вычисляет взвешенную сумму для выходного слоя и применяет сигмоидальную функцию активации.
 * - Возвращает объект, содержащий:
 *   - inputVector: Вектор входных данных.
 *   - outputVector: Вектор предсказанных значений (после применения сигмоидальной функции активации).
 *   - sigmoidVectors: Массив, состоящий из двух элементов — результатов применения сигмоидальной функции для скрытого и выходного слоев.
 */

import * as math from "mathjs";
import { sigmoid, createRandomMatrices } from "../helpers/math";

/**
 * @constructor
 * @param {number} inputLayer - Количество входов
 * @param {number} hiddenLayer - Количество нейронов на скрытом слое
 * @param {number} outputLayer - Количество выходов
 *
 * @description
 * Создает нейронную сеть с заданным числом нейронов на входном, скрытом и выходном слоях.
 *
 * @property {Matrix} _inputWeights - Матрица весов, соединяющая входной и скрытый слои.
 * @property {Matrix} _hiddenWeights - Матрица весов, соединяющая скрытый и выходной слои.
 * @property {function} predict - Метод для выполнения предсказания.
 */
const createNeuronNetwork = function(inputLayer, hiddenLayer, outputLayer) {
    // Инициализируем веса
    const [inputWeights, hiddenWeights] = createRandomMatrices(
        [hiddenLayer, inputLayer],
        [outputLayer, hiddenLayer],
        [-1, 1]
    );

    this._inputWeights = inputWeights;
    this._hiddenWeights = hiddenWeights;

    /**
     * Метод предсказания нейронной сети.
     * @param {number} in1 - первый вход
     * @param {number} in2 - второй вход
     * @param {number} in3 - третий вход
     * @returns {Object} Объект, содержащий:
     *  - inputVector: Вектор входных данных,
     *  - outputVector: Вектор предсказанных значений,
     *  - sigmoidVectors: Массив из двух векторов, где первый соответствует результатам скрытого слоя,
     *    а второй — выходного слоя после применения сигмоидальной функции.
     */
    this.predict = function(in1, in2, in3) {
        // Вектор входных данных
        const inputXVector = [[in1], [in2], [in3]];

        // Вычисляем сумму взвешенных входов для скрытого слоя и применяем сигмоидальную функцию
        const hiddenXVector = math.multiply(this._inputWeights, inputXVector);
        const sigmoidHiddenLayerVector = hiddenXVector.map((x) => [sigmoid(x[0])]);

        // Вычисляем сумму взвешенных входов для выходного слоя и применяем сигмоидальную функцию
        const outputXVector = math.multiply(this._hiddenWeights, sigmoidHiddenLayerVector);
        const sigmoidOutputLayerVector = outputXVector.map((x) => [sigmoid(x[0])]);

        return {
            inputVector: inputXVector,
            outputVector: sigmoidOutputLayerVector,
            sigmoidVectors: [sigmoidHiddenLayerVector, sigmoidOutputLayerVector]
        };
    };
};

export default createNeuronNetwork;
