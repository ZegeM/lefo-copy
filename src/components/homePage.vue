<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container fluid id="main-div" min-height>
      <b-row h-100>
        <b-col cols="2" id="rules" align-v="stretch">
          <div style="padding-top: 2em"></div>

          <b-nav vertical>
            <b-nav-item
              class="ruled"
              :class="{ active: $route.name === 'home' }"
            >
              <router-link
                style="text-decoration: none; color: black"
                to="/home"
                >Glavna stran
              </router-link></b-nav-item
            >

            <b-nav-item
              class="ruled"
              :class="{ active: $route.name === 'orders' }"
            >
              <router-link
                style="text-decoration: none; color: black"
                to="/rules"
                >Pravila</router-link
              ></b-nav-item
            >
            <b-nav-item
              class="ruled"
              :class="{ active: $route.name === 'orders' }"
            >
              <router-link
                style="text-decoration: none; color: black"
                to="/practice-results"
                >Rezultati izvajanja</router-link
              ></b-nav-item
            >
          </b-nav>
        </b-col>
        <b-col id="rules">
          <div style="padding-top: 2em"></div>
          <p id="ucno">Učno polje</p>

          <ul>
            <li v-for="item in typesOfCalc" :key="item.operation">
              <router-link
                :to="{
                  name: 'calculate',
                  params: {
                    operation: item.operation,
                    type: item.type,
                    eng: item.eng,
                  },
                }"
                >{{ item.type }}
              </router-link>
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
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
  name: "homePage",
  props: ["operation"],
  data() {
    return {
      typesOfCalc: [
        { type: "Seštevanje", operation: "+", eng: "addition" },
        { type: "Odštevanje", operation: "-", eng: "subtraction" },
        { type: "Seštevanje in Odštvanje", operation: "+-", eng: "addSub" },
        { type: "Množenje", operation: "*", eng: "multiplication" },
        { type: "Deljenje", operation: "@/", eng: "dividing" },
        { type: "Množenje in Deljenje", operation: "*/", eng: "mulDiv" },
        {
          type: "Iskanje neznanega števila",
          operation: "?",
          eng: "unknownNum",
        },
        { type: "Primerjava", operation: "=", eng: "comparison" },
      ],
    };
  },
};
</script>

<style scoped>
#rules {
  background-color: white;
  border-right: dotted 2px sandybrown;
}
#main-div {
  width: 100%;
  left: 0;
  position: absolute;
  border-width: 2em;
  border-left-width: 3em;
  border-style: solid;
  border-color: red;
  border-bottom-width: 0;
  border-right-width: 0;
  border-top-left-radius: 1em;
  display: inline;
  padding-bottom: 0;
}
body {
  background-image: url("../assets/si.lefo_.net_.png") !important;
}
.container {
  max-width: 100%;
  padding-left: 0;
  padding-top: 0;
}
#ucno {
  margin-left: 1em;
  font-size: 1.5em;
}
#practice {
  width: 20%;
  background-color: black;
}

html,
body {
  height: 100%;
}

.ruled:hover {
  background-color: orange;
}

a {
  text-decoration: none !important;
  color: black;
}
</style>
