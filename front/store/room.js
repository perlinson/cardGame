import axios from 'axios'

export const state = () => ({
  name_room: '',
  list_rooms: [],
  list_rooms2: [],
  isLoading: false
})

export const mutations = {
  setItems(state, lists) {
    console.log('list', lists)
    state.list_rooms = lists
  },
  hideLoading(state) {
    state.isLoading = false
  },
  showLoading(state) {
    state.isLoading = true
  }
}

export const getters = {
  roomList: (state) => state.list_rooms
}

export const actions = {
  async getRoomList({ commit }) {
    commit('showLoading')

    try {
      await this.$axios.$get('/api/room/').then((result) => {
        commit('setItems', result.data)
        commit('hideLoading')
      })
    } catch (err) {
      console.log(err)
    }
  },
  async joinRoom({ commit }, room) {
    commit('showLoading')
    try {
      await this.$axios.$get(`/api/room/${room._id}`).then((result) => {
        this.$router.push({ path: '/startgame/' + response.id })
      })
    } catch (err) {
      console.log(err)
    }
  },
  async createRoom({ commit, dispatch }, event) {
    const formdata = new FormData(event.target)
    const roomName = formdata.get('nameRoom')
    await this.$axios
      .$post('/api/room/createRoom', {
        room_name: roomName,
        players: [
          {
            player1: {
              player_name: 'playername'
            }
          }
        ]
      })
      .then((response) => {
        dispatch('getRoomList')
        this.$router.push({ path: '/startgame/' + response.id })
      })
      .catch((error) => {
        console.log(error)
        commit('hideLoading')
        this.$router.push('/error')
      })
  }
}
