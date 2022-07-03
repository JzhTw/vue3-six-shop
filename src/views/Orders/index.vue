<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">購買時間</th>
          <th scope="col">名字</th>
          <th scope="col">購買款項</th>
          <th scope="col">應付金額</th>
          <th scope="col">是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in orders" :key="key" v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
          <td>{{ $filters.date(item.create_at) }}</td>
          <td>
            <span v-text="item.user.name" v-if="item.user"></span>
          </td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ $filters.currency(item.total) }}</td>
          <td>
            <strong v-if="item.is_paid" class="text-success">已付款</strong>
            <span v-else class="text-muted">尚未起用</span>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @emitPages="getOrders"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';
import { getOrder } from '@/api/order';

export default {
  data() {
    return {
      orders: [],
      isNew: false,
      pagination: {},
      newOrder: []
    };
  },
  components: {
    Pagination
  },
  methods: {
    getOrders(currentPage = 1) {
      const vm = this;
      getOrder(currentPage).then(response => {
        console.log(response);
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
      });
    }
  },
  watch: {
    orders: {
      handler(val) {
        if (val.length) {
          val.sort((a, b) => {
            const aIsPaid = a.is_paid ? 1 : 0;
            const bIsPaid = b.is_paid ? 1 : 0;
            return bIsPaid - aIsPaid;
          });
        }
      }

    }
  },
  created() {
    this.getOrders();
  }
};
</script>
