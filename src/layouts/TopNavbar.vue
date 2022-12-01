<template>
  <div class="container">
    <nav style="flex-wrap: wrap">
      <h1 style="top: 1em; margin-left: 2em; font-size: 4em; font-weight: bold">
        lefo.net
      </h1>
      <img
        src="https://resitve.sio.si/wp-content/uploads/sites/7/2014/04/Lefo1.jpg"
        class="icon"
        alt="https://resitve.sio.si/wp-content/uploads/sites/7/2014/04/Lefo1.jpg"
      />

      <!--  <v-form>
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
    </v-form> -->
      <div class="sidenav">
        <router-link to="/home">Glavna stran </router-link>
      </div>

      <p v-if="user">{{ username }}</p>
    </nav>
  </div>
</template>

<script>
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
export default {
  name: "TopNavbar",
  data() {
    return {
      user: "Kekec",
      username: null,
    };
  },
};
</script>

<style scoped>
#app {
  overflow-y: hidden;
}

nav {
  display: flex;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 0px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.sidenav {
  margin-left: 2em;
  margin-top: 2em;
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
router-link {
  color: #0060b6 !important;
  text-decoration: none !important;
}
router-link:hover {
  color: #00a0c6 !important;
  text-decoration: none !important;
  cursor: pointer !important;
}

.container {
  margin-left: 0;
  padding-bottom: 0;
}
</style>
