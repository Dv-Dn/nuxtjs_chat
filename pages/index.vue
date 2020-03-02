<script>
export default {
  name: "index",
  layout: "empty",
  head: {
    title: "Welcome to nuxt chat"
  },
  sockets: {
    connect() {
      console.log("SOCKET IN INDEX PAGE WAS CONNECTED");
    }
  },
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 15) || "Name must be less than 10 characters"
    ],
    room: "",
    roomRules: [v => !!v || "Enter room name"]
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const user = {
          name: this.name,
          room: this.room
        };
        this.$socket.emit("userConnected", user, data => {
          if (typeof data === "string") {
            console.error(data);
          } else {
            user.id = data.userId;
            this.$store.commit("SET_USER", user);
            this.$router.push("/chat");
          }
        });
      }
    }
  }
};
</script>
// ? HTML
<template>
  <v-layout justify-center>
    <!-- <v-col> -->
    <v-card min-width="400" max-width="600" width="100%">
      <v-card-title class="display-1">Login</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :counter="15"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="room"
            :rules="roomRules"
            label="Room name"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="primary"
            class="mr-4"
            @click="submit"
          >
            Log in
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <!-- </v-col> -->
  </v-layout>
</template>
