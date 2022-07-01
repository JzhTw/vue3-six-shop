<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="150">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ $filters.currency(item.origin_price) }}</td>
          <td class="text-right">{{ $filters.currency(item.price) }}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="openDelProductModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pages="pagination" @emitPages="getProducts"></Pagination>
    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image" v-model="tempProduct.imageUrl"
                    placeholder="請輸入圖片連結">
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control" ref="files" @change="uploadFile">
                </div>
                <img class="img-fluid" :src="tempProduct.image" alt>
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title" v-model="tempProduct.title" placeholder="請輸入標題">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category" v-model="tempProduct.category"
                      placeholder="請輸入分類">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit" v-model="tempProduct.unit" placeholder="請輸入單位">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price" v-model="tempProduct.origin_price"
                      placeholder="請輸入原價">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price" v-model="tempProduct.price"
                      placeholder="請輸入售價">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description" v-model="tempProduct.description"
                    placeholder="請輸入產品描述"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content" v-model="tempProduct.content"
                    placeholder="請輸入產品說明內容"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="tempProduct.is_enabled" :true-value="1"
                      :false-value="0" id="is_enabled">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="delProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "@/components/Pagination";
import axios from 'axios';
import {
  getProduct,
  delProduct,
  updateProduct,
  createProduct
} from "@/api/product";
import { Modal } from 'bootstrap';
export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false
      },
      productModal: null,
      delProductModal: null
    };
  },
  components: {
    Pagination
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      vm.isLoading = true;
      getProduct(page).then(response => {
        console.log(response.data);
        if (response.data.success) {
          vm.isLoading = false;
          vm.products = response.data.products;
          vm.pagination = response.data.pagination;
        }
      });
    },
    openModal(isNew, item) {
      const vm = this;
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
      }
      vm.productModal.show();

    },
    updateProduct() {
      const vm = this;
      // 新增
      if (!vm.isNew) {
        updateProduct(vm.tempProduct).then(response => {
          console.log(response.data);
          if (response.data.success) {
            vm.productModal.hide();
            vm.getProducts();
          } else {
            vm.productModal.hide();
            vm.getProducts();
            console.log("更新失敗");
          }
          vm.products = response.data.products;
        });
      } else {
        // 更新
        createProduct(vm.tempProduct).then(response => {
          console.log(response.data);
          if (response.data.success) {
            vm.productModal.hide();
            vm.getProducts();
          } else {
            vm.productModal.hide();
            vm.getProducts();
            console.log("新增失敗");
          }
          vm.products = response.data.products;
        });
      }
    },
    openDelProductModal(item) {
      const vm = this;
      vm.delProductModal.show();
      vm.tempProduct = Object.assign({}, item);
    },
    delProduct() {
      const vm = this;
      const delProductModal = new Modal(document.getElementById('delProductModal'));
      delProduct(vm.tempProduct.id).then(response => {
        vm.delProductModal.hide();
        this.getProducts();
      });
    },
    uploadFile() {
      console.log(this);
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append("file-to-upload", uploadedFile);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      vm.status.fileUploading = true;
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `${token}`
        }
      })
        .then(response => {
          console.log(response.data);
          vm.status.fileUploading = false;
          if (response.data.success) {
            // vm.tempProduct.imageUrl = response.data.imageUrl;
            // console.log(vm.tempProduct);
            vm.$set(vm.tempProduct, "imageUrl", response.data.image);
          } else {
            this.$bus.$emit("messsage:push", response.data.message, "danger");
          }
        });
    }
  },
  created() {
    const vm = this;
    vm.getProducts();
  },
  mounted() {
    const vm = this;
    vm.productModal = new Modal(document.getElementById('productModal'))
    vm.delProductModal = new Modal(document.getElementById('delProductModal'))
  }
};
</script>
