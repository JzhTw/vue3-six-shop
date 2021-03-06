import request from "@/utils/request";

// 取得優惠卷
export function getCoupons(data) {
  return request({
    url: `/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons`,
    method: "get",
    data: {
      data: {
        ...data
      }
    }
  });
}
// 更新優惠卷
export function updateCoupon(data) {
  return request({
    url: `/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${data.id}`,
    method: "put",
    data: {
      data: {
        ...data
      }
    }
  });
}

// 新建優惠卷
export function createCoupon(data) {
  return request({
    url: `/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`,
    method: "post",
    data: {
      data: {
        ...data
      }
    }
  });
}

// 新建優惠卷
export function addCoupon(data) {
  return request({
    url: `/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`,
    method: "post",
    data: {
      data: {
        ...data
      }
    }
  });
}
