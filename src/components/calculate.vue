<template>
  <div id="main-div">
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
        ><span> Ti potrebuješ 20 točk </span>

        <span>
          <b-button v-if="!started" id="startbtn" variant="info" @click="start"
            >Začni</b-button
          >
          <b-button v-if="started" variant="danger" @click="end"
            >Končaj</b-button
          >
        </span>
      </p>
      <p style="font-size: 3em; left: 0em">
        <span v-if="started">
          {{ calculation_number1 }} + {{ calculation_number2 }} =
          {{ user_input }}
        </span>
        <span v-else> </span>
      </p>
      <p id="mistake">Narobe! Pravilen rezulat je {{ calculation_result }}</p>
    </div>

    <div style="display: block">
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
              <button class="gridTable" @click="checkResult()">OK</button>
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
  name: "calcuLate",
  components: {},
  data() {
    return {
      started: false,
      username: null,
      password: null,
      user_input: "",
      calculation_result: null,
      calculation_number1: null,
      calculation_number2: null,
      cached1: null,
      cached2: null,
      SCORE: 0,
      timer: 40,
      stage: 1,
      incorrect_table: [],
      stage_1_zero_counter: 0,
      stage_max: {
        1: 10,
        2: 20,
        3: 100,
        4: 1000,
        5: 10000,
        6: 100000,
      },
      stage_advance_req: 20,
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
    /* eslint-disable */
    checkResult() {
      if(!this.started){  //add disable buttons if not started
        return;
      }

      let x = 0;
      if(this.user_input!==""){
        x = parseInt(this.user_input);
      }
      if (x === this.calculation_result) {
        this.calculateScoreAddition();
        this.newCalculation();
      }
      else {
        this.wrongCalculation();
      }
    },
    calculateScoreAddition(){
      switch(this.stage){
        case 1:
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
          console.log("not ready yet")

      }

    },
    newCalculation() {
      this.user_input = "";
      if(this.stage === 1){
        this.calculation_number1 = this.getRandomInt(this.stage_max[this.stage]);
        this.calculation_number2 = this.getRandomInt(this.stage_max[this.stage]-this.calculation_number1);
        //i don't want too many zeros on my app, that shit is disgusting
        if(this.calculation_number1===0 && this.calculation_number2===0){
          this.calculation_number1 = this.getRandomInt(this.stage_max[this.stage]);
          this.calculation_number2 = this.getRandomInt((this.stage_max[this.stage]-1)-this.calculation_number1)+1;
        } else if(this.calculation_number1===this.cached1 && this.calculation_number2===this.cached2){
          this.calculation_number1=cached2;
          this.calculation_number2=cached1;
        }
      }
      else if (this.stage === 2 || this.stage=== 3){
        this.calculation_number1 = this.getRandomInt(this.stage_max[this.stage]);
        this.calculation_number2 = this.getRandomInt(this.stage_max[this.stage]-this.calculation_number1);
        if(this.calculation_number1 === 0){
          while (this.calculation_number1 === 0){
            this.calculation_number1 = this.getRandomInt(this.stage_max[this.stage]-this.calculation_number2);
          }
        }
        if (this.calculation_number2 === 0){
          while (this.calculation_number2 === 0){
            this.calculation_number2 = this.getRandomInt(this.stage_max[this.stage]-this.calculation_number1);
          }
        }
      }

      this.cached1=this.calculation_number1;
      this.cached2=this.calculation_number2;
      this.calculation_result = this.calculation_number1 + this.calculation_number2;
    },
    wrongCalculation(){
      var temp = {
        'Equation' : this.calculation_number1 + " + " + this.calculation_number2,
        "Correct result" : this.calculation_result,
        "Your input" : this.user_input
      };
      this.incorrect_table.push(temp);
      document.getElementById("mistake").style.display = "block";
      setTimeout(() => {
        document.getElementById("mistake").style.display = "none";
        this.newCalculation();
      }, 2000);
      console.log(this.incorrect_table);
    },
    stageCheck(){
      if(this.stage===3){
        this.end()
      }
      if (this.SCORE > this.stage_advance_req){
        this.stage++;
      }
      //add failed advance animation

      this.timer = 40;

    },
    start() {
      this.started = true;
      this.newCalculation();
      document.getElementById("startbtn").hidden=true;
    },
    end() {
      this.$router.push({
        name: "result",
        params: { "table" : this.incorrect_table, "score" :this.SCORE },
      });
    },
  },
  mounted() {
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
  margin-top: 4em;
}

</style>
