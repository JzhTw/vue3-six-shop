<template>
  <!-- Navbar -->
  <Navbar />
  <div class="container-fluid">
    <div class="row">
      <!-- Sidebar  -->
      <Sidebar />
      <!-- Content -->
      <div class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <router-view :key="key"></router-view>
      </div>
    </div>

  </div>
</template>

<script>
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
// import Alert from '../AlertMessage';

export default {
  name: 'DashBoard',
  components: {
    Sidebar,
    Navbar,
    // Alert,
  },
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
};
</script>
<style>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>