//модуль инициализации прослушивания событий input для ползунков

import {
    EPOCH_SPAN_SELECTOR,
    LEARNING_SPAN_SELECTOR,
    INPUT_RANGE_LERNING_SELECTOR,
    INPUT_RANGE_EPOCH_SELECTOR
} from "../constants/selectors";

const epochRange = document.querySelector(INPUT_RANGE_EPOCH_SELECTOR);
const learningRange = document.querySelector(INPUT_RANGE_LERNING_SELECTOR);

// Вывод значения эпох в span
epochRange.addEventListener("input", ({ target }) => {
    const epochSpan = document.querySelector(EPOCH_SPAN_SELECTOR);
    epochSpan.textContent = target.value.padStart(6, "0");
});

// Вывод значения скорости обучения в span
learningRange.addEventListener("input", ({ target }) => {
    const learningSpan = document.querySelector(LEARNING_SPAN_SELECTOR);
    learningSpan.textContent = Number(target.value).toFixed(3);
});
