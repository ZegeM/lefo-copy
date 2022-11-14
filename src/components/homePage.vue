<template>
  <div>
    <h1>Lefo.net</h1>

    <img src="../assets/Lefo1.jpg" alt="Italian Trulli" class="icon" />
    <!--<v-img
        max-height="109"
        max-width="250"
        src="../assets/Lefo1.jpg"
    ></v-img> -->
    <v-form>
      <v-container class="username">
        <v-row>
          <v-text-field
            v-model="username"
            label="Uporabniško ime:"
          ></v-text-field>
        </v-row>
        <v-row>
          <v-text-field
            v-model="password"
            label="Geslo:"
            type="password"
          ></v-text-field>
        </v-row>
      </v-container>
    </v-form>
    <button class="btn-info" @click="start">Start</button>

    <h1 v-if="SCORE > 0">Score: {{ SCORE }}</h1>
    <h2>Current calculation:</h2>
    <h3 v-if="calculation_number1">
      {{ calculation_number1 }} + {{ calculation_number2 }}
    </h3>

    <h3 v-if="started">{{ user_input }}</h3>
    <div style="display: block">
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
            <td>
              <button class="btn" @click="checkResult()">OK</button>
            </td>
            <td>
              <button class="btn" value="Brisi" @click="remove">Briši</button>
            </td>
          </tr>
        </table>
      </div>
      <h2 v-if="started">Timer: {{ timer }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "homePage",
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
      timer: 40,
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
          this.timer = 40;
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
    checkResult() {
      const x = parseInt(this.user_input);
      console.log(x);
      if (x === this.calculation_result) {
        this.SCORE += 1;
        this.newCalculation();
      } else {
        var temp = {};
        temp.put(this.calculation_number1);
        temp.put(this.calculation_number2);
        temp.put(this.calculation_result);
        temp.put(this.user_input);
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
  },
};
</script>

<style scoped>
.username {
  width: 10em;
  position: absolute;
  right: 2em;
  top: 0;
}
.icon {
  position: absolute;
  left: 1em;
  width: 100px;
  height: 100px;
  top: 0;
}

td {
  width: 2em;
  color: white;
  height: 100%;
  background-color: dimgrey;
}
td:hover {
  background-color: #2c3e50;
}

.calculator-table {
  font-size: 4em;
  border-style: solid;
  border-width: 1px;
  margin-top: 3em;
  display: flex;
  align-items: center;
  margin-left: 39.5%;
  width: 6.1em;
}

.btn {
  width: 100%;
  height: 100%;
}
</style>
