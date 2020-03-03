<script>
export default {
  props: {
    name: String,
    text: String,
    owner: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<template>
  <div class="my-3">
    <div v-if="name === 'Admin'" class="message__admin">
      <p class="text-xs-center pb-0 text-center">{{ text }}</p>
      <hr />
    </div>
    <v-card
      v-else
      max-width="49%"
      min-width="300px"
      class="teal accent-4"
      :class="{ 'grey lighten-3': owner, 'ml-auto': owner }"
    >
      <v-card-text>
        {{ text }}
      </v-card-text>
      <v-list-item class="grow">
        <v-list-item-content>
          <v-list-item-title>{{ name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>
