import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import { router } from './router';
import { check } from "@/api/user";
import "bootstrap";
import { defineRule } from 'vee-validate';
import { required, email } from '@vee-validate/rules';
defineRule('required', value => {
    if (!value || !value.length) {
        return false;
    }
    return true;
});
defineRule('email', value => {
    // Field is empty, should pass
    if (!value || !value.length) {
        return true;
    }
    // Check if email
    if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/.test(value)) {
        return false;
    }
    return true;
});
const app = createApp(App).use();
app.use(store);
app.use(router);

app.config.globalProperties.$filters = {
    date(value) {
        return '$' + value
    },
    currency(value) {
        const n = Number(value);
        return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
            const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c);
            return currency;
        })}`;
    }
}
app.mount('#app');


router.beforeEach((to, from, next) => {
    console.log('to', to, 'from', from, 'next', next);
    // ...
    if (to.meta.requiresAuth) {
        const api = `${process.env.APIPATH}/api/user/check`;
        if (to.meta.requiresAuth) {
            // 確認身份
            check().then(response => {
                if (response.data.success) {
                    next();
                } else {
                    next({ path: `/login` }); // 否則全部到Login
                }
            })
        } else {
            next();
        }
    }
    next();
});