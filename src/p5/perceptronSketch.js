//скетч Перцептрона на canvas c p5

import p5 from "p5";

// Создает заготовленный p5 скетч перцептрона
export const drawPerceptron = () => {
    new p5((p) => {
        p.setup = () => {
            p.createCanvas(800, 380);
        };

        p.draw = () => {
            p.background(67,70,95);
            p.stroke(26,27,37);

            const inputNeurons = [50, 100, 150];
            const hiddenNeurons = [100, 200];
            const outputNeuron = [185];

            // Связи
            inputNeurons.forEach((y) => {
                hiddenNeurons.forEach((hy) => {
                    p.line(250, y * 2, 400, hy * 1.25);
                });
            });

            hiddenNeurons.forEach((y) => {
                p.line(400, y * 1.25, 550, outputNeuron[0]);
            });

            // Входной слой
            inputNeurons.forEach((y) => {
                p.ellipse(250, y * 2, 30, 30);
            });

            // Скрытый слой
            hiddenNeurons.forEach((y) => {
                p.ellipse(400, y * 1.25, 30, 30);
            });

            // Выходной слой
            p.fill(135,182,255);
            p.ellipse(550, outputNeuron[0], 30, 30);
        };
    }, document.getElementById("perceptron-container"));
};
