<template>
  <div>
    <h1>Hewwo</h1>
    <h2>Your score is: {{ this.$props.score }}</h2>
    <div>
      <table :items="this.$props.table"></table>
    </div>
  </div>
</template>

<script>
export default {
  name: "resultPage",
  props: ["table", "score"],
  data() {
    return {};
  },
  mounted() {
    console.log(this.$props);
  },
};
</script>

<style scoped></style>
