import { login, logout } from '@/api/user';
const user = {
  state: {
    uid: '',
    token:''
  },

  mutations: {
    // 名字
    SET_UID: (state, name) => {
      state.uid = name;
    },
    // 名字
    SET_TOKEN: (state, name) => {
      state.token = name;
    }
  },

  actions: {
    // 登入
    Login({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data.username, data.password).then(response => {
          const data = response.data;
          commit('SET_UID', data.uid)
          commit('SET_TOKEN', data.token)
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout().then((res) => {
          console.log(res)
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    }

  }
};

export default user;
