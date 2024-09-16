<template>
    <div class="p-3" style="max-width: 400px; margin: 50px auto; background: #002b72">
        <div class="w-full rounded m-1 p-3 text-end lead font-weight-bolder text-white bg-vue-light">
            {{ calculatorValue || 0 }}
        </div>
    
        <div class="row no-gutters">
                <div class="col-3" v-for="n in calculatorElements"
            :key="n">
            <div class="lead text-white text-center m-1 py-2 bg-vue-light rounded hover-class"
            :class="{'bg-vue-special-btn': ['MC', 'MR', 'M-', 'M+',
                                      'MU', 'GT', 'CE', '√',
                                      '±', '%', '/', '-',
                                      '+', '*', '.', '='].includes(n)}" 
            @click="action(n)"
            >
                {{ n }}
            </div>
        </div>
        </div>
    </div>
    </template>
    
    <script>

    export default {
        name: 'Calculator',
        props: {
            msg: String
        },
        data() {
        return {
            calculatorValue: '',
            calculatorElements: [
            "MC", "MR", "M-", "M+",
            "MU", "GT", "CE", "√",
            7, 8, 9, "±", 4, 5, 6,
            "%", 1, 2, 3, "/", 0, "*",
            "+", "-", ".", "=",
            ],
            operator: null,
            previousCalculatorValue: '',
        }
    },
     methods: {
            action(n) {
                if(!isNaN(n) || n === '.') {
                    this.calculatorValue += n + '';
                }

                if(n === 'CE') {
                    this.calculatorValue = '';
                    this.previousCalculatorValue = "";
                }

                if (n === '%') {
                    this.calculatorValue = this.calculatorValue / 100 + '';
                }

                if (n === '√') {
                    this.calculatorValue = Math.sqrt(this.calculatorValue);
                }

                if (n === '±') {
                    this.calculatorValue = this.calculatorValue * -1;
                }

                if (n === 'MC') {
                    memoryValue.value = 0;
                }

                if (n === 'MR') {
                    this.calculatorValue = memoryValue.value;
                }

                if (n === 'M-') {
                    memoryValue.value -= this.calculatorValue;
                }

                if (n === 'M+') {
                    memoryValue.value += this.calculatorValue;
                }

                if(n === 'MU') {
                   
                }

                if (n === 'GT') {

                }

                if (['/', '*', '-', '+'].includes(n)){
                    this.operator = n;
                    this.previousCalculatorValue = this.calculatorValue;
                    this.calculatorValue = '';
                }

                if (n === '=') {
                    this.calculatorValue = eval(
                        this.previousCalculatorValue + this.operator + this.calculatorValue
                    );
                    
                    this.previousCalculatorValue = '';
                    this.operator = null;
                }
            }
        }
    }
    
    </script>
    
    <style scoped>

    .bg-vue-light {
        background: #0bbbef;
    }
    .bg-vue-special-btn {
        background-color: #1f72b8; 
    }
    .hover-class:hover {
        cursor: pointer;
        background-color: #003a97;
    }
    
    </style>