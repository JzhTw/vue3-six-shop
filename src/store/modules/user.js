import { login, logout, getInfo} from '@/api/user';
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
    // 獲取用戶訊息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data;
          if (data.roles && data.roles.length > 0) { // 驗證返回的roles是否是一個非空陣列
            commit('SET_ROLES', data.roles);
          } else {
            reject('getInfo: roles must be a non-null array !');
          }
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', data.avatar);
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
