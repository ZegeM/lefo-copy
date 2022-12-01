<template>
  <div class="container">
    <p class="incorrect">Your score is: {{ this.$props.score }}</p>
    <div class="container">
      <p class="incorrect">Nepravilni izračuni:</p>
      <b-table striped hover :items="this.$props.incTable"></b-table>
    </div>
    <div class="container">
      <p class="incorrect">Pravilni izračuni:</p>
      <b-table striped hover :items="this.$props.table"></b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "resultPage",
  props: ["incTable", "score", "table", "type"],
  data() {
    return {};
  },
  mounted() {
    console.log(this.$props);

    var currentdate = new Date();
    var datetime =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    const resulted = {
      "Daum in čas": datetime,
      Rezultat: this.$props.score,
      Operacija: this.$props.type,
    };
    if (localStorage.getItem("results")) {
      const tempRes = JSON.parse(localStorage.getItem("results"));
      tempRes.push(resulted);
      localStorage.setItem("results", JSON.stringify(tempRes));
    } else {
      const temp = JSON.stringify([resulted]);
      console.log(temp);
      localStorage.setItem("results", temp);
    }
  },
};
</script>

<style scoped>
.incorrect {
  font-size: 2em;
}
</style>
