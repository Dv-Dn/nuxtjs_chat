export const state = () => ({
  user: {},
  users: [],
  messages: []
});
export const mutations = {
  SET_USER(state, payload) {
    state.user = payload;
  },
  CLEAR_USER(state) {
    state.user = {};
    state.messages = [];
    state.users = [];
  },
  SOCKET_newMessage(state, payload) {
    state.messages.push(payload);
  },
  SOCKET_updateUsers(state, payload) {
    state.users = payload;
  }
};
