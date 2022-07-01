<template>
  <div class="form-signin ">
    <form @submit.prevent="signin">
      <h1 class="h3 mb-3 fw-normal text-center">後台管理</h1>

      <div class="form-floating">
        <input type="email" class="form-control" id="floatingInput" placeholder="請輸入信箱" v-model="user.email" required
          autofocus>
        <label for="floatingInput">信箱</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" v-model="user.password" placeholder="請輸入密碼"
          required>
        <label for="floatingPassword">密碼</label>
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">登入</button>
      <p class="mt-5 mb-3 text-center">JEFF © 2022–2022</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    signin() {
      const vm = this;
      let data = {
        username: vm.user.email,
        password: vm.user.password
      }
      // 登入
      this.$store
        .dispatch("Login", data)
        .then((res) => {
          // 新增到cookie
          const token = res.data.token;
          const expired = res.data.expired;
          console.log(token, expired);
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
          if (res.data.success) {
            vm.$router.push('/admin/products');
          }
        })
        .catch(() => {
        });
    },
  },
};
</script>

<style scoped>

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
