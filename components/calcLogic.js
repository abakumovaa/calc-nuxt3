import { ref } from "vue";

export function calcLogic() {
  const memoryValue = ref(0);
  let grandTotal = ref(0);

  const calculatorValue = ref("");
  const previousCalculatorValue = ref("");
  const operator = ref(null);
  const markupMode = ref(false);
  const history = ref([]);

  const saveHistory = () => {
    const limitedHistory = history.value.slice(-5);
    localStorage.setItem("calculatorHistory", JSON.stringify(limitedHistory));
  };

  const isSpecialButton = (n) => {
    const specialButtons = [
      "MC",
      "MR",
      "M-",
      "M+",
      "MU",
      "GT",
      "CE",
      "√",
      "±",
      "%",
      "/",
      "-",
      "+",
      "*",
      ".",
      "=",
    ];
    return specialButtons.includes(n);
  };

  const action = (n) => {
    const handlers = {
      'CE': () => {
        calculatorValue.value = "";
        previousCalculatorValue.value = "";
        markupMode.value = false;
      },
      '%': () => {
        calculatorValue.value = calculatorValue.value / 100 + "";
      },
      '√': () => {
        calculatorValue.value = Math.sqrt(calculatorValue.value);
      },
      '±': () => {
        calculatorValue.value = calculatorValue.value * -1;
      },
      'MC': () => {
        memoryValue.value = 0;
      },
      'MR': () => {
        calculatorValue.value = memoryValue.value;
      },
      'M-': () => {
        memoryValue.value -= calculatorValue.value;
      },
      'M+': () => {
        memoryValue.value += calculatorValue.value;
      },
      'MU': () => {
        previousCalculatorValue.value = calculatorValue.value;
        calculatorValue.value = "";
        markupMode.value = true;
      },
      'GT': () => {
        calculatorValue.value = grandTotal.value;
        history.value.push(`GT = ${grandTotal.value}`);
        saveHistory();
      },
      '=': () => {
        let result = null;
        if (markupMode.value) {
          const costPrice = parseFloat(previousCalculatorValue.value);
          const salePrice = parseFloat(calculatorValue.value);
          if (costPrice && salePrice) {
            const markupPercentage = ((salePrice - costPrice) / costPrice) * 100;
            result = markupPercentage.toFixed(2) + "%";
            history.value.push(`MU: ${costPrice} -> ${salePrice} = ${result}`);
          }
        } else {
          if (!previousCalculatorValue.value || !operator.value || !calculatorValue.value) return alert("Пожалуйста, введите выражение.");
          result = eval(previousCalculatorValue.value + operator.value + calculatorValue.value);
          grandTotal.value += parseFloat(result);
          history.value.push(
            `${previousCalculatorValue.value} ${operator.value} ${calculatorValue.value} = ${result}`
          );
        }
        calculatorValue.value = result;
        saveHistory();
        markupMode.value = false;
        previousCalculatorValue.value = "";
        operator.value = null;
      }
    };

    if (handlers[n]) {
      handlers[n]();
    } else if (!isNaN(n) || n === ".") {
      calculatorValue.value += n + "";
    } else if (["/", "*", "-", "+"].includes(n)) {
      operator.value = n;
      previousCalculatorValue.value = calculatorValue.value;
      calculatorValue.value = "";
    }
  };

  return {
    calculatorValue,
    history,
    action,
    isSpecialButton,
    grandTotal
  };
}
