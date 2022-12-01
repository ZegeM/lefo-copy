<template>
  <div id="main-div">
    <div id="back-button">
      <b-button @click="back" variant="danger">Nazaj</b-button>
    </div>
    <div id="main">
      <p style="font-size: 2em; font-weight: bold">
        Čas:
        <span
          style="
            border: 1px solid;
            color: white;
            background-color: #2c3e50;
            padding: 3px;
          "
          >{{ timer }}</span
        >Točke:
        <span
          style="
            border: 1px solid;
            color: white;
            background-color: #2c3e50;
            padding: 3px;
            width: 50px;
          "
        >
          {{ SCORE }}</span
        >
        Stopnja:
        <span
          style="
            border: 1px solid;
            color: white;
            background-color: #2c3e50;
            padding: 3px;
          "
          >{{ stage }}</span
        ><span> Ti potrebuješ {{ stage_advance_req }} točk </span>

        <span>
          <b-button v-if="!started" id="startbtn" variant="info" @click="start"
            >Začni</b-button
          >
          <b-button v-else variant="danger" @click="end">Končaj</b-button>
        </span>
      </p>
      <p style="font-size: 3em; left: 0em">
        <span v-if="started">
          {{ calculation_number1 }} {{ calculation_operator }}
          {{ calculation_number2 }} =
          {{ user_input }}
        </span>
        <span v-else>Prični ko si pripravljen/a!</span>
      </p>
      <p id="mistake">Narobe! Pravilen rezulat je {{ calculation_result }}</p>
    </div>

    <div>
      <div class="calculator-table">
        <table style="border-top-width: 0; border-right-width: 0">
          <tr>
            <td>
              <button class="gridTable" @click="btn_onclick('7')">7</button>
            </td>
            <td>
              <button class="gridTable" @click="btn_onclick('8')">8</button>
            </td>
            <td>
              <button class="gridTable" @click="btn_onclick('9')">9</button>
            </td>
          </tr>

          <tr>
            <td>
              <button class="gridTable" @click="btn_onclick('4')">4</button>
            </td>
            <td>
              <button class="gridTable" @click="btn_onclick('5')">5</button>
            </td>
            <td>
              <button class="gridTable" @click="btn_onclick('6')">6</button>
            </td>
          </tr>
          <tr>
            <td>
              <button class="gridTable" @click="btn_onclick('1')">1</button>
            </td>
            <td>
              <button class="gridTable" @click="btn_onclick('2')">2</button>
            </td>
            <td>
              <button class="gridTable" @click="btn_onclick('3')">3</button>
            </td>
          </tr>
          <tr>
            <td>
              <button class="gridTable" @click="btn_onclick('0')">0</button>
            </td>
            <td colspan="2">
              <button class="gridTable" id="okButton" @click="checkResult()">
                OK
              </button>
            </td>
            <td style="border: 0; background-color: orangered">
              <button
                class="gridTable"
                style="font-size: 50%"
                value="Brisi"
                @click="remove"
              >
                Briši
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
export default {
  name: "calculatePage",
  components: {},
  props: ["operation", "type", "eng"],
  data() {
    return {
      started: false,
      username: null,
      password: null,
      user_input: "",
      calculation_result: null,
      calculation_number1: null,
      calculation_number2: null,
      calculation_operator: "+",
      cached1: null,
      cached2: null,
      SCORE: 0,
      timer: 40,
      stage: 1,
      incorrect_table: [],
      correct_table: [],
      stage_1_zero_counter: 0,
      stage_max: {
        1: 10,
        2: 18,
        3: 99,
        4: 999,
        5: 9999,
        6: 99999,
      },
      stage_min: {
        1: 0,
        2: 2,
        3: 1,
        4: 10,
        5: 100,
        6: 1000,
      },
      stage_advance_req: 20,
      stage_multipliers: {
        1: 20,
        2: 1.7,
        3: 1.66,
        4: 1.55,
        5: 1.44,
        6: 1.33,
      },
      lvlCount: 1,
    };
  },
  watch: {
    started(value) {
      if (value) {
        setTimeout(() => {
          this.timer--;
        }, 1000);
      }
    },
    timer: {
      handler(value) {
        if (value > 0 && this.started) {
          setTimeout(() => {
            this.timer--;
          }, 1000);
        } else {
          this.stageCheck();
        }
      },
    },
  },
  methods: {
    /* eslint-disable */
    start() {
      this.started = true;
      this.newCalculation();
    },
    end() {
      this.$router.push({
        name: "result",
        params: {
          incTable: this.incorrect_table,
          score: this.SCORE,
          table: this.correct_table,
          type: this.$props.type
        },
      });
    },
    btn_onclick(integer) {
      this.user_input = this.user_input + integer;
    },
    remove() {
      if (this.user_input.length > 0) {
        this.user_input = this.user_input.slice(0, -1);
      }
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max);
    },
    checkResult() {
      if(!this.started){  //add disable buttons if not started
        return;
      }
      document.getElementById("okButton").disabled = true;
      document.getElementById("okButton").style.backgroundColor="black";
      let x = 0;
      if(this.user_input!==""){
        x = parseInt(this.user_input);
      }
      if (x === this.calculation_result) {
        var temp1 = {
          'Račun' : this.calculation_number1 + " + " + this.calculation_number2,
          "Pravilen rezultat" : this.calculation_result,
          "Tvoj rezultat" : this.user_input,
          "Stopnja" : this.stage,

        };
        this.correct_table.push(temp1);

        this.calculateScoreAddition();
        this.newCalculation();
      }
      else {
        this.wrongCalculation();
      }
      document.getElementById("okButton").disabled = false;
      document.getElementById("okButton").style.backgroundColor="dimgrey";

    },
    calculateScoreAddition(){
      switch(this.stage){
        case 1:
          this.SCORE+=2;
          break;
        case 2:
          this.SCORE+=4;
          break;
        case 3:
          this.SCORE+=6;
          break;
        case 4:
          this.SCORE+=10;
          break;
        case 5:
          this.SCORE+=16;
          break;
        case 6:
          this.SCORE+=26;
          break;
        /*case 1:
          if(this.calculation_number1 === 0 || this.calculation_number2 === 0){
          this.SCORE += 1;
          }
          else if(this.calculation_number1 === 5 && this.calculation_number2 === 5){
            this.SCORE += 5;
          }
          else if(this.calculation_number1 === this.calculation_number2){
            this.SCORE += (this.calculation_number1+this.calculation_number2)-1;
          }
          else if(this.calculation_result===10){
            this.SCORE += 5;
          }
          else{
            this.SCORE += this.calculation_result-1;
          }
          break;

        case 2:

          break;

        case 3:
          if(this.calculation_result<11){
            this.SCORE+=this.calculation_result;
          }
          else if(this.calculation_number1 === this.calculation_number2){
            this.SCORE += (this.calculation_number1+this.calculation_number2)/2-1;
          }
          else if (this.calculation_number1 < 10 || this.calculation_number2 < 10){
            this.SCORE += (this.calculation_number2 + this.calculation_number1)/4;
          }
          else {
            this.SCORE += (this.calculation_number2 + this.calculation_number1)/3;
          }
          break;*/
      }

    },
    plus(){
      switch(this.stage){
        case 1:
          this.calculation_number1 = this.getRandomInt(this.stage_max[this.stage]);
          this.calculation_number2 = this.getRandomInt(this.stage_max[this.stage] - this.calculation_number1);
          if (this.calculation_number1 === 0 && this.calculation_number2 === 0) {
            this.calculation_number1 = this.getRandomInt(this.stage_max[this.stage])+1;
          }
          break
        default:
          this.calculation_number1 = this.getRandomInt(this.stage_max[this.stage]);
          this.calculation_number2 = this.getRandomInt(this.stage_max[this.stage] - this.calculation_number1)+this.stage_min[this.stage];
          break
      }
      this.calculation_result = this.calculation_number1 + this.calculation_number2;

    },
    minus(){
      switch(this.stage){
        case 1:
          this.calculation_number1 = this.getRandomInt(this.stage_max[this.stage]);
          this.calculation_number2 = this.getRandomInt(this.stage_max[this.stage] - this.calculation_number1);
          if (this.calculation_number1 === 0 && this.calculation_number2 === 0) {
            this.calculation_number1 = this.getRandomInt(this.stage_max[this.stage])+1;
          }
          break
        default:
          this.calculation_number1 = this.getRandomInt(this.stage_max[this.stage]);
          this.calculation_number2 = this.getRandomInt(this.stage_max[this.stage] - this.calculation_number1)+this.stage_min[this.stage];
          break
      }
      if(this.calculation_number2>this.calculation_number1){
        var temp = this.calculation_number1;
        this.calculation_number1=this.calculation_number2;
        this.calculation_number2=temp;
      }
      this.calculation_result = this.calculation_number1 - this.calculation_number2;
    },
    multiply(){
      switch(this.stage){
        case 1:
          this.calculation_number1 = this.getRandomInt(this.stage_max[this.stage]);
          this.calculation_number2 = this.getRandomInt(this.stage_max[this.stage] - this.calculation_number1);
          if (this.calculation_number1 === 0 && this.calculation_number2 === 0) {
            this.calculation_number1 = this.getRandomInt(this.stage_max[this.stage])+1;
          }
          break
        default:
          this.calculation_number1 = this.getRandomInt(this.stage_max[this.stage]);
          this.calculation_number2 = this.getRandomInt(this.stage_max[this.stage] - this.calculation_number1)+this.stage_min[this.stage];
          break
      }
      if(this.calculation_number2>this.calculation_number1){
        var temp = this.calculation_number1;
        this.calculation_number1=this.calculation_number2;
        this.calculation_number2=temp;
      }
      this.calculation_result = this.calculation_number1 - this.calculation_number2;
    },

    newCalculation() {
      this.user_input = "";
      switch (this.$props.operation){
        case "+":
          this.plus();
          break;

        case "-":
          this.minus();
          break;

        case "+-":
          var x = this.getRandomInt(100);
          if(x<50){
            this.calculation_operator="+";
            this.plus();
          }
          else{
            this.calculation_operator="-"

            this.minus();
          }
          break;
      }
     /* if(this.stage === 1){
        this.calculation_number1 = this.getRandomInt(this.stage_max[this.stage]);
        this.calculation_number2 = this.getRandomInt(this.stage_max[this.stage]-this.calculation_number1);
        // i don't want too many zeros on my app, that shit is disgusting
        if(this.calculation_number1===0 && this.calculation_number2===0){
          this.calculation_number1 = this.getRandomInt(this.stage_max[this.stage]);
          this.calculation_number2 = this.getRandomInt((this.stage_max[this.stage]-1)-this.calculation_number1)+1;
        } else if(this.calculation_number1===this.cached1 && this.calculation_number2===this.cached2){
          this.calculation_number1= this.cached2;
          this.calculation_number2= this.cached1;
        }
      }
      else if (this.stage === 2){
        this.calculation_number1 = this.getRandomInt(this.stage_max[this.stage]);
        this.calculation_number2 = this.getRandomInt(this.stage_max[this.stage]-this.calculation_number1);
        if(this.calculation_number1===0){
          this.calculation_number1+=1;
        }
        if(this.calculation_number2===0){
          this.calculation_number2+=1;
        }
      }
      else if (this.stage > 2){
        this.calculation_number1 = this.getRandomInt(this.stage_max[this.stage]-this.stage_max[this.stage-1])+this.stage_max[this.stage-1];
        this.calculation_number2 = this.getRandomInt(this.stage_max[this.stage]-this.calculation_number1-this.stage_max[this.stage-1])+this.stage_max[this.stage-1];
      }*/

      this.cached1=this.calculation_number1;
      this.cached2=this.calculation_number2;
    },
    wrongCalculation(){
      var temp = {
        'Račun' : this.calculation_number1 + " + " + this.calculation_number2,
        "Pravilen rezultat" : this.calculation_result,
        "Tvoj rezultat" : this.user_input,
        "Stopnja" : this.stage,
      };
      this.incorrect_table.push(temp);
      document.getElementById("mistake").style.display = "block";
      setTimeout(() => {
        if(this.lvlCount===7){
          this.end();
        }
        document.getElementById("mistake").style.display = "none";
        this.newCalculation();
      }, 2000);
    },
    stageCheck(){

      if(this.lvlCount===6){
        if(this.user_input !== ""){
          this.timer=10;
          this.lvlCount++;
          return;
        }
        else{
          this.end();
        }

      } else if(this.lvlCount===7){
        this.end();
      }
      if(this.stage_advance_req <= this.SCORE){
        this.stage++;
        this.lvlCount++;
        this.stage_advance_req = Math.ceil(this.SCORE*this.stage_multipliers[this.stage]);
      }
      else {
        //implement code for failing a stage!
      }
      this.timer = 40;

    },
    back(){
      this.$router.go(-1);
    },
  },
  mounted() {
    switch (this.$props.operation){
      case "-":
        this.calculation_operator = "-";
        break;
      case "/":
        this.calculation_operator = ":";
        break;
      case "*":
        this.calculation_operator = "x";
        break;
      case "=":
        this.calculation_operator = "==";
        break;
    }
    document.getElementById("mistake").style.display = "none";
  },
};
</script>

<style scoped>
td {
  width: 2em;
  color: white;
  height: 1.5em;
  background-color: dimgrey;
}
td:hover {
  background-color: #2c3e50;
}

.calculator-table {
  font-size: 5em !important;
  margin-top: 1em;
  margin-left: 2em !important;
}
#main {
  margin-left: 10em;
  margin-top: 5em;
  width:fit-content;
}
.gridTable {
  width: 100%;
  height: 100%;
}
table, th, td {
  border: 1px solid white;
}

#main-div {
  background-color: #30ab51 !important;
  height: 100%;
  width: 100%;
  position: absolute;
  overflow: hidden;
}
#main-div::-webkit-scrollbar {
  display: none;
}
#back-button {
  right: 1em;
  top: 1em;
  position: absolute;
}

#app {
  background-color: #30ab51 !important;
  background-size: cover !important;
}
</style>
