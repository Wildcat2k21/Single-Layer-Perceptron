Привет! Вот шпаргалка по **math.js** с важными методами, примерами и пояснениями.  

---

## 🔹 **1. Работа с матрицами**  

### ✅ **Создание матриц**
```js
import * as math from "mathjs";

// Создание матрицы (двумерного массива)
const A = math.matrix([[1, 2], [3, 4]]);
const B = math.matrix([[5, 6], [7, 8]]);
console.log(A.toString()); // [[1, 2], [3, 4]]
```
  
### ✅ **Случайная матрица**
```js
const randMatrix = math.random([3, 3]); // 3x3 матрица случайных чисел
console.log(randMatrix.toString());
```

### ✅ **Единичная матрица**
```js
const I = math.identity(3); // 3x3 единичная матрица
console.log(I.toString());
```

---

## 🔹 **2. Операции с матрицами**  

### ✅ **Сложение / Вычитание**
```js
const C = math.add(A, B);
const D = math.subtract(A, B);
console.log(C.toString()); // [[6, 8], [10, 12]]
console.log(D.toString()); // [[-4, -4], [-4, -4]]
```

### ✅ **Умножение матриц**
```js
const E = math.multiply(A, B);
console.log(E.toString()); // [[19, 22], [43, 50]]
```

### ✅ **Транспонирование матрицы**
```js
const A_T = math.transpose(A);
console.log(A_T.toString()); // [[1, 3], [2, 4]]
```

### ✅ **Обратная матрица**
```js
const A_inv = math.inv(A);
console.log(A_inv.toString()); 
// [[-2, 1], [1.5, -0.5]]
```

### ✅ **Определитель матрицы**
```js
const detA = math.det(A);
console.log(detA); // -2
```

---

## 🔹 **3. Векторы и линейная алгебра**  

### ✅ **Скалярное произведение векторов**
```js
const v1 = [1, 2, 3];
const v2 = [4, 5, 6];
const dotProduct = math.dot(v1, v2);
console.log(dotProduct); // 32 (1*4 + 2*5 + 3*6)
```

### ✅ **Норма (длина) вектора**
```js
const norm = math.norm(v1);
console.log(norm); // 3.74165
```

### ✅ **Косинусное сходство**
```js
const cosSim = math.dot(v1, v2) / (math.norm(v1) * math.norm(v2));
console.log(cosSim); // 0.974
```

---

## 🔹 **4. Работа с числами**  

### ✅ **Округления**
```js
console.log(math.round(3.14159, 2)); // 3.14
console.log(math.floor(3.99)); // 3
console.log(math.ceil(3.01)); // 4
```

### ✅ **Случайные числа**
```js
console.log(math.random()); // Число от 0 до 1
console.log(math.randomInt(1, 10)); // Целое число от 1 до 10
```

---

## 🔹 **5. Тригонометрия**  

### ✅ **Градусы в радианы и наоборот**
```js
console.log(math.radians(180)); // 3.14159 (π)
console.log(math.degrees(math.pi)); // 180
```

### ✅ **Синус, косинус, тангенс**
```js
console.log(math.sin(math.pi / 2)); // 1
console.log(math.cos(math.pi)); // -1
console.log(math.tan(math.pi / 4)); // 1
```

---

## 🔹 **6. Производные и интегралы**  

### ✅ **Численное дифференцирование**
```js
const f = x => math.pow(x, 2); // f(x) = x^2
const df = math.derivative(f, 'x');
console.log(df.toString()); // "2 * x"
```

### ✅ **Численное интегрирование (Приблизительное)**
```js
const integral = math.evaluate("integrate(x^2, x)");
console.log(integral.toString()); // "1/3 * x^3"
```

---

## 🔹 **7. Решение систем уравнений**  

### ✅ **Пример: 2x + 3y = 5, 4x + 6y = 10**
```js
const A = math.matrix([[2, 3], [4, 6]]);
const b = math.matrix([5, 10]);
const solution = math.lusolve(A, b);
console.log(solution.toString()); // Невозможно решить (линейно зависимая система)
```

---

## 🔹 **8. Символьная алгебра (Работа с выражениями)**  

### ✅ **Упрощение выражений**
```js
const simplified = math.simplify("2x + 3x - 5 + x");
console.log(simplified.toString()); // "6x - 5"
```

### ✅ **Разложение на множители**
```js
const factored = math.simplify("x^2 - 4");
console.log(factored.toString()); // "(x - 2) * (x + 2)"
```

---

## 🔹 **9. Генерация формул и парсинг выражений**  

### ✅ **Парсинг выражения**
```js
const expr = math.parse("2x + 3");
console.log(expr.evaluate({ x: 5 })); // 13
```

### ✅ **Форматирование чисел**
```js
console.log(math.format(12345.6789, { notation: 'engineering' })); // "12.346e+3"
```

---

## 🔹 **10. Работа с комплексными числами**  

### ✅ **Создание комплексного числа**
```js
const complexNum = math.complex(3, 4);
console.log(complexNum.toString()); // "3 + 4i"
```

### ✅ **Модуль комплексного числа**
```js
console.log(math.abs(complexNum)); // 5
```

### ✅ **Аргумент комплексного числа**
```js
console.log(math.arg(complexNum)); // 0.93 (в радианах)
```

---

## 🎯 **Заключение**
Эта шпаргалка охватывает **основные** и **полезные** функции библиотеки **math.js**. Если нужно что-то более специфичное, можно посмотреть [официальную документацию](https://mathjs.org/docs/).  

Если хочешь добавить что-то еще, говори! 🚀