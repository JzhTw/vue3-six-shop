import request from '@/utils/request';

export function login(username, password) {
  return request({
    url: '/admin/signin',
    method: 'post',
    data: {
      username,
      password
    }
  });
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  });
}

export function check() {
  return request({
    url: '/api/user/check',
    method: 'post',
  });
}
