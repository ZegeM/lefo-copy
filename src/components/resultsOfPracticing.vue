<template>
  <div class="container">
    <p class="incorrect">Rezultati:</p>
    <b-table striped hover :items="this.practiceTable"></b-table>
  </div>
</template>

<script>
export default {
  name: "resultsOfPracticing",
  data() {
    return {
      practiceTable: null,
      hasPracticed: true,
    };
  },
  mounted() {
    if (localStorage.getItem("results")) {
      console.log(JSON.parse(localStorage.getItem("results")));

      this.practiceTable = JSON.parse(
        localStorage.getItem("results")
      ).reverse();
    } else {
      this.hasPracticed = false;
    }
  },
};
</script>

<style scoped></style>
