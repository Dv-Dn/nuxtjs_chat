<script>
import Message from "@/components/Message";
import { mapState } from "vuex";
export default {
  middleware: ["chat_redirect"],
  components: { Message },
  head() {
    return {
      title: `Chat ${this.user.room}`
    };
  },
  data: () => ({
    message: ""
  }),
  computed: mapState(["user", "messages"]),
  methods: {
    sendMessage() {
      this.$socket.emit(
        "sendMessage",
        {
          text: this.message,
          id: this.$store.state.user.id
        },
        data => {
          if (typeof data == "string") {
            console.error(data);
          }
        }
      );
      this.clearMessage();
    },
    clearMessage() {
      this.message = "";
    }
  }
};
</script>

<template>
  <div class="chat__wrap">
    <div class="chat__body">
      <ul class="pa-0"> 
        
        <!-- <li :key="message.text" v-for="message in messages">
          {{ message.text }}
        </li> -->
        <Message
          :key="'_' + index + message.text + message.name"
          :name="message.name"
          :text="message.text"
          :owner="message.id === user.id"
          v-for="(message, index) in messages"
        />
      </ul>
    </div>
    <div class="chat__text-field pa-3">
      <v-text-field
        v-model="message"
        :prepend-icon="icon"
        append-outer-icon="mdi-send"
        filled
        clear-icon="mdi-close-circle"
        clearable
        label="Message"
        type="text"
        @click:append-outer="sendMessage"
        @keydown.enter="sendMessage"
      ></v-text-field>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat__wrap {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.chat__body {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 80px;
  padding: 1rem;
  overflow-y: auto;
}
.chat__text-field {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
}
</style>
