import { createStore } from 'vuex'

const store = createStore({
  state: {
    user: { isLogin: false }
  },
  // mutation: {
  //   login(state: { user: any }) {
  //     state.user = { ...state.user, isLogin: true, name: 'viking' }
  //   }
  // }
  getters: {
    biggerColumnsLen(state) {
      return state.columns.filter(c => c.id > 2).length
    },
    getColumnById: (state) => (id: number) => {
      return state.columns.find(c => c.id === id)
    }
    getPostsByCid: (state) => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid)
    }
  }
})