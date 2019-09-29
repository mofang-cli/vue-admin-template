export default {
  setCancelAxios (state, func) {
    state.cancelAxios.push(func)
  },
  clearCancelAxios (state) {
    state.cancelAxios = []
  }
}
