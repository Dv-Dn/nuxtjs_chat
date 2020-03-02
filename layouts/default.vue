<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["user", "users"]),
  data: () => ({
    drawer: true
  }),
  methods: {
    exit() {
      this.$socket.emit("userLeft", this.user.id, () => {
        this.$router.push("/?leftChat");
        this.$store.commit("CLEAR_USER");
        ff;
      });
    }
  }
};
</script>

<template>
  <v-app app>
    <v-navigation-drawer app v-model="drawer" mobile-break-point="750"
      ><v-list subheader>
        <v-subheader>Users list</v-subheader>

        <v-list-item v-for="u in users" :key="u.id" @click.prevent>
          <v-list-item-content>
            <v-list-item-title v-text="u.name"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-icon>
            <v-icon :color="u.id === user.id ? 'grey' : 'primary'"
              >mdi-message
            </v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn icon @click="exit"><v-icon>mdi-arrow-left</v-icon></v-btn>
      <v-toolbar-title>Chat rooms {{ user.room }}</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>
