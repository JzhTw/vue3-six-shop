<template>
  <div>
    <div class="row mt-4">
      <div class="col-md-2 mb-2" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div style="height: 516px; background-size: cover; background-position: center"
            :style="{ backgroundImage: `url(${item.imageUrl})` }"></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
              <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="my-5 row justify-content-center">
      <div class="col-md-6">
        <table class="table">
          <thead>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td class="align-middle">
                <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x"
                    viewBox="0 0 16 16">
                    <path
                      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </button>
              </td>
              <td class="align-middle">
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">已套用優惠券</div>
              </td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">{{ cart.total }}</td>
            </tr>
            <tr v-if="cart.final_total !== cart.total">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ cart.final_total }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">套用優惠碼</button>
          </div>
        </div>
      </div>
    </div>
    <div class="my-5 row justify-content-center">
      <Form class="col-md-6" @submit="createOrder" v-slot="{ errors }">
        <div class="form-group">
          <label for="useremail">Email</label>
          <Field type="email" class="form-control" name="email" id="useremail" v-model="form.user.email"
            placeholder="請輸入 Email" rules="required|email" />
          <span class="text-danger" v-if="errors.hasOwnProperty('email')">信箱必須輸入</span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <Field type="text" class="form-control" name="name" id="username" v-model="form.user.name" rules="required"
            placeholder="輸入姓名" />
          <span class="text-danger" v-if="errors.hasOwnProperty('name')">姓名必須輸入</span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <Field type="address" class="form-control" name="address" id="useraddress" v-model="form.user.address"
            rules="required" placeholder="請輸入地址" />
          <span class="text-danger" v-if="errors.hasOwnProperty('address')">地址欄位不得留空</span>
        </div>

        <div class="form-group">
          <label for="useraddress">留言</label>
          <textarea name id class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </Form>
    </div>
    <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <img :src="product.image" class="img-fluid" alt>
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">選購 {{ num }} {{ product.unit }}</option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong>{{ product.num * product.price }}</strong> 元
            </div>
            <button type="button" class="btn btn-primary" @click="addtoCart(product.id, product.num)">
              <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { getCustomProduct, getSingleProduct } from "@/api/product";
import { getCart, deleteCart, addCart } from "@/api/cart";
import { addCoupon } from "@/api/coupons";
import { createOrder } from "@/api/order";
import { Form, Field, } from 'vee-validate';
import { Modal } from 'bootstrap';


export default {
  data() {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: "" //暫存物品
      },
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      cart: {},
      isLoading: false,
      coupon_code: "",
      productModal: null
    };
  },
  components: {
    Form,
    Field,
  },
  methods: {
    // 取得所有產品
    getProducts() {
      const vm = this;
      // const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products`;
      // getCustProduct().then(response => {
      //   vm.products = response.data.products;
      // });
      getCustomProduct().then(response => {
        vm.products = response.data.products;
      });
    },
    // 取得產品(單)
    getProduct(id) {
      const vm = this;
      vm.status.loadingItem = id;
      getSingleProduct(id).then(response => {
        vm.product = response.data.product;
        // $("#productModal").modal("show");
        vm.productModal.show();
        vm.status.loadingItem = "";
      });
    },
    // 新增購物車
    addtoCart(id, qty = 1) {
      const vm = this;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty
      };
      addCart(cart).then(response => {
        vm.status.loadingItem = "";
        vm.getCart();
        vm.productModal.hide();
      });
    },
    // 取得購物車
    getCart() {
      const vm = this;
      getCart().then(response => {
        vm.cart = response.data.data;
      });
    },
    // 刪除購物車產品
    removeCartItem(id) {
      const vm = this;
      deleteCart(id).then(() => {
        vm.getCart();
      });
    },
    // 新增優惠卷
    addCouponCode() {
      const vm = this;
      const coupon = {
        code: vm.coupon_code
      };
      addCoupon(coupon).then(() => {
        vm.getCart();
      });
    },
    // 新增訂單
    createOrder() {
      const vm = this;
      const order = vm.form;
      console.log('test')
      createOrder(order).then(response => {
        console.log("訂單已建立", response);
        if (response.data.success) {
          vm.$router.push(`/customer_checkout/${response.data.orderId}`);
        }
        // vm.getCart();
        vm.isLoading = false;
      });
    }
  },
  mounted() {
    const vm = this;
    vm.productModal = new Modal(document.getElementById('productModal'));
  },
  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>
