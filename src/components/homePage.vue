<template>
  <div>
    <button class="btn-info" @click="start">Start</button>

    <h1 v-if="started > 0">Score: {{ SCORE }}</h1>
    <div id="main">
      <h2>Current calculation:</h2>
      <h3 v-if="calculation_number1 && started">
        {{ calculation_number1 }} + {{ calculation_number2 }} = {{ user_input }}
      </h3>
    </div>
    <h4 id="mistake">Narobe! Pravilen rezulat je {{ calculation_result }}</h4>
    <div class="calculator-table">
      <table>
        <tr>
          <td>
            <button class="btn" @click="btn_onclick('1')">1</button>
          </td>
          <td>
            <button class="btn" @click="btn_onclick('2')">2</button>
          </td>
          <td>
            <button class="btn" @click="btn_onclick('3')">3</button>
          </td>
        </tr>

        <tr>
          <td>
            <button class="btn" @click="btn_onclick('4')">4</button>
          </td>
          <td>
            <button class="btn" @click="btn_onclick('5')">5</button>
          </td>
          <td>
            <button class="btn" @click="btn_onclick('6')">6</button>
          </td>
        </tr>
        <tr>
          <td>
            <button class="btn" @click="btn_onclick('7')">7</button>
          </td>
          <td>
            <button class="btn" @click="btn_onclick('8')">8</button>
          </td>
          <td>
            <button class="btn" @click="btn_onclick('9')">9</button>
          </td>
        </tr>
        <tr>
          <td>
            <button class="btn" @click="btn_onclick('0')">0</button>
          </td>
          <td colspan="2">
            <button class="btn" @click="checkResult()">OK</button>
          </td>
        </tr>
      </table>
      <button value="Brisi" @click="remove">Briši</button>
    </div>

    <h2 style="margin-top: 2em" v-if="started">Timer: {{ timer }}</h2>
  </div>
</template>

<script>
export default {
  name: "homePage",
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
      SCORE: 0,
      timer: 10,
      incorrect_table: [],
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
          this.started = false;
          this.timer = 10;
          this.end();
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
      if(!this.started){
        return;
      }

      const x = parseInt(this.user_input);
      if (x === this.calculation_result) {
        this.SCORE += 1;
        this.newCalculation();
      } else {
        var temp = {
          'Equation' : this.calculation_number1 + " + " + this.calculation_number2,
          "Correct result" : this.calculation_result,
          "Your input" : this.user_input
        };
        if(Array.isArray(this.incorrect_table)){
          console.log("U do be right")
        } else{
          console.log("u do be wrong")
        }

        this.incorrect_table.push(temp);

        document.getElementById("mistake").style.display = "block";
        setTimeout(() => {
          document.getElementById("mistake").style.display = "none";
        }, 2000);
        console.log(this.incorrect_table);
        this.newCalculation();
      }
    },
    newCalculation() {
      this.user_input = "";
      this.calculation_number1 = this.getRandomInt(1000);
      this.calculation_number2 = this.getRandomInt(1000);
      this.calculation_result =
        this.calculation_number1 + this.calculation_number2;
    },
    start() {
      this.started = true;
      this.newCalculation();
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
  font-size: 5em;
  margin-top: 2em;
  margin-left: 2em !important;
  display: inline;
}
#main {
  margin-left: 0;
}
.btn {
  width: 100%;
  height: 100%;
}
</style>
