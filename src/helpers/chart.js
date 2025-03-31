//Вспомонательный модуль для построения графиков

export const chartOptions = (labelName, dataName) => ({
    type: "line",
    data: {
        labels: [], // Эпохи
        datasets: [{
            label: labelName,
            data: [], // Значения ошибки
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: false,
            tension: 0.1
        }]
    },
    options: {
        responsive: false,
        scales: {
            x: {
                type: "linear",
                position: "bottom",
                title: {
                    display: true,
                    text: dataName
                }
            },
            y: {
                title: {
                    display: true,
                    text: labelName
                }
            }
        },
        maintainAspectRatio: false // Разрешает свободное изменение пропорций
    }
});
