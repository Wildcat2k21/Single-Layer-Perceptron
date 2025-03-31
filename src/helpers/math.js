// Модуль математических функций

import * as math from "mathjs";

// Сигмовидная функция активации и её производная
export function sigmoid(x) {
    return 1 / (1 + math.exp(-x));
}

export function dsigmoid(y) {
    return y * (1 - y);
}

// Генерация случайных матриц, посдений аргумент - массив диапозона [from, to]
export function createRandomMatrices() {
    const matrices = Array.from(arguments);
    const range = matrices.pop();
    return matrices.map(matrix => math.random(matrix, ...range));
}
