<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div
          class="p-3 rounded"
          style="max-width: 400px; margin: 50px auto; background: #002b72"
        >
          <Display :value="calculatorValue" />
          <div class="row no-gutters">
            <div class="col-3" v-for="n in calculatorElements" :key="n">
              <Button
                :label="n"
                :isSpecialButton="isSpecialButton(n)"
                @buttonClick="action"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <History :history="history" />
      </div>
    </div>
  </div>
</template>

<script>
import Display from "./Display.vue";
import Button from "./Button.vue";
import History from "./History.vue";

import { ref } from "vue";

const memoryValue = ref(0);
let grandTotal = ref(0);

export default {
  name: "Calculator",
  components: {
    Display,
    Button,
    History,
  },
  data() {
    return {
      calculatorValue: "",
      calculatorElements: [
        "MC",
        "MR",
        "M-",
        "M+",
        "MU",
        "GT",
        "CE",
        "√",
        7,
        8,
        9,
        "±",
        4,
        5,
        6,
        "%",
        1,
        2,
        3,
        "/",
        0,
        "*",
        "+",
        "-",
        ".",
        "=",
      ],
      operator: null,
      previousCalculatorValue: "",
      markupMode: false,
      history: [],
    };
  },
  mounted() {
    const savedHistory = localStorage.getItem("calculatorHistory");
    if (savedHistory) {
      this.history = JSON.parse(savedHistory);
    }
  },
  methods: {
  saveHistory() {
    const limitedHistory = this.history.slice(-5);
    localStorage.setItem("calculatorHistory", JSON.stringify(limitedHistory));
  },

  action(n) {
    const handlers = {
      'CE': () => {
        this.calculatorValue = "";
        this.previousCalculatorValue = "";
        this.markupMode = false;
      },
      '%': () => {
        this.calculatorValue = this.calculatorValue / 100 + "";
      },
      '√': () => {
        this.calculatorValue = Math.sqrt(this.calculatorValue);
      },
      '±': () => {
        this.calculatorValue = this.calculatorValue * -1;
      },
      'MC': () => {
        memoryValue.value = 0;
      },
      'MR': () => {
        this.calculatorValue = memoryValue.value;
      },
      'M-': () => {
        memoryValue.value -= this.calculatorValue;
      },
      'M+': () => {
        memoryValue.value += this.calculatorValue;
      },
      'MU': () => {
        this.previousCalculatorValue = this.calculatorValue;
        this.calculatorValue = "";
        this.markupMode = true;
      },
      'GT': () => {
        this.calculatorValue = grandTotal.value;
        this.history.push(`GT = ${grandTotal.value}`);
        this.saveHistory();
      },
      '=': () => {
        let result = null;
        if (this.markupMode) {
          const costPrice = parseFloat(this.previousCalculatorValue);
          const salePrice = parseFloat(this.calculatorValue);
          if (costPrice && salePrice) {
            const markupPercentage =
              ((salePrice - costPrice) / costPrice) * 100;
            result = markupPercentage.toFixed(2) + "%";
            this.history.push(`MU: ${costPrice} -> ${salePrice} = ${result}`);
          }
        } else {
          if (!this.previousCalculatorValue || !this.operator || !this.calculatorValue) return alert("Пожалуйста, введите выражение.");
          result = eval(
            this.previousCalculatorValue + this.operator + this.calculatorValue
          );
          grandTotal.value += parseFloat(result);
          this.history.push(
            `${this.previousCalculatorValue} ${this.operator} ${this.calculatorValue} = ${result}`
          );
        }
        this.calculatorValue = result;
        this.saveHistory();
        this.markupMode = false;
        this.previousCalculatorValue = "";
        this.operator = null;
      }
    };

    if (handlers[n]) {
      handlers[n]();
    } else if (!isNaN(n) || n === ".") {
      this.calculatorValue += n + "";
    } else if (["/", "*", "-", "+"].includes(n)) {
      this.operator = n;
      this.previousCalculatorValue = this.calculatorValue;
      this.calculatorValue = "";
    }
  },

  isSpecialButton(n) {
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
  },
}
};
</script>

<style scoped>
.bg-vue-light {
  background: #0bbbef;
  font-weight: 600;
}
.bg-vue-special-btn {
  background-color: #1f72b8;
}
.hover-class:hover {
  cursor: pointer;
  background-color: #003a97;
}
</style>
