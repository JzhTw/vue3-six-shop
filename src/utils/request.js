import axios from 'axios';

// 創建axios實例
const service = axios.create({
  baseURL: process.env.VUE_APP_APIPATH, // api 的 base_url
  timeout: 5000, // 請求超時時間
})

// request攔截器
service.interceptors.request.use(
  config => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    if (token) {
      config.headers.common['Authorization'] = `${token}`;
    }
    return config
  },
  error => {
    // Do something with request error
    Promise.reject(error);
  }
)

// response 攔截器
service.interceptors.response.use(
  response => {
    /**
     * 
     */
    console.log(response);

    return response;
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service;