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
import { calcLogic } from "./calcLogic"; 

export default {
  name: "Calculator",
  components: {
    Display,
    Button,
    History,
  },
  setup() {
    const { calculatorValue, history, action, isSpecialButton } = calcLogic();

    return {
      calculatorValue,
      history,
      action,
      isSpecialButton,
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
    };
  },
};
</script>
