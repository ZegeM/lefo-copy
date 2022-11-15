<template>
  <nav style="background-color: lightslategrey; flex-wrap: wrap">
    <h1 style="top: 0.5em; margin-left: 1.55em; font-size: 75px">Lefo.net</h1>
    <img
      src="https://resitve.sio.si/wp-content/uploads/sites/7/2014/04/Lefo1.jpg"
      class="icon"
      alt="https://resitve.sio.si/wp-content/uploads/sites/7/2014/04/Lefo1.jpg"
    />
    <div id="links">
      <router-link to="/home">Home</router-link>
      <router-link to="/results">Results</router-link>
    </div>
    <v-form>
      <v-container class="username">
        <v-text-field
          v-model="username"
          label="Uporabniško ime:"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Geslo:"
          type="password"
          required
        ></v-text-field>
        <v-row>
          <v-btn class="btn-info">Submit</v-btn>
        </v-row>
      </v-container>
    </v-form>
  </nav>
</template>

<script>
export default {
  name: "TopNavbar",
  data() {
    return {
      username: null,
      password: null,
    };
  },
};
</script>

<style scoped>
nav {
  display: flex;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 16px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.icon {
  position: absolute;

  width: 7em;
  height: 7em;
  top: 0;
}
.username {
  display: inline;
  width: 15em;
  position: absolute;
  right: 2em;
  top: 0;
  padding: 3px !important;
}
</style>
