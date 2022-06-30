<template>
  <!-- <nav id="sidebar">
    <div class="sidebar-header">
      <h3>後台</h3>
      <strong>BG</strong>
    </div>

    <ul class="list-unstyled components">
      <li>
        <a
          href="#AdminSubmenu"
          data-toggle="collapse"
          aria-expanded="false"
          class="dropdown-toggle"
        >
          <i class="fas fa-home"></i>
          管理員
        </a>
        <ul
          class="collapse list-unstyled"
          id="AdminSubmenu"
        >
          <li>
            <router-link
              to="/admin/products"
              class="nav-link"
            >
              <i class="fas fa-box-open"></i> 產品列表
            </router-link>
          </li>
          <li>
            <router-link
              to="/admin/orders"
              class="nav-link"
            >
              <i class="far fa-list-alt"></i> 訂單列表
            </router-link>
          </li>
          <li>
            <router-link
              to="/admin/coupons"
              class="nav-link"
            >
              <i class="fas fa-ticket-alt"></i> 優惠券
            </router-link>
          </li>
        </ul>
      </li>
      <li>
        <a
          href="#pageSubmenu"
          data-toggle="collapse"
          aria-expanded="false"
          class="dropdown-toggle"
        >
          <i class="fas fa-copy"></i>
          模擬功能
        </a>
        <ul
          class="collapse list-unstyled"
          id="pageSubmenu"
        >
          <router-link to="/customer_order">
            <i class="fas fa-shopping-cart"></i> 模擬訂單
          </router-link>
        </ul>
      </li>
    </ul>
  </nav> -->
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="position-sticky pt-3">
      <h6 class="sidebar-heading d-flex justify-content-between
        align-items-center px-3 mt-4 mb-1 text-muted">
        <span>管理員</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle"></span>
        </a>
      </h6>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/admin/products" class="nav-link">
            <i class="fas fa-box-open"></i> 產品列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/orders" class="nav-link">
            <i class="far fa-list-alt"></i> 訂單列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/coupons" class="nav-link">
            <i class="fas fa-ticket-alt"></i> 優惠券
          </router-link>
        </li>
      </ul>

      <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
        <span>模擬功能</span>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link to="/customer_order" class="nav-link">
            <i class="fas fa-shopping-cart"></i> 模擬訂單
          </router-link>
        </li>
      </ul>
    </div>
  </nav>

</template>
<script>
// :pages="{ 頁碼資訊 }"
// @emitPages="更新頁面事件"
export default {
  name: 'SideBar'
};
</script>
