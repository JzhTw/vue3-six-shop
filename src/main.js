import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import { router } from './router';
import { check } from "@/api/user";
import "bootstrap";
import { defineRule } from 'vee-validate';
import { required, email } from '@vee-validate/rules';
defineRule('required', required);
defineRule('email', email);

const app = createApp(App);
app.use(store);
app.use(router);

app.config.globalProperties.$filters = {
    date(time) {
        const date = new Date(time * 1000);
        return date.toLocaleDateString();
    },
    currency(num) {
        const n = Number(num);
        return `$${n.toFixed(0).replace(/./g, (c, i, a) => {
            const currency = (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c);
            return currency;
        })}`;
    }
}
app.mount('#app');


router.beforeEach((to, from, next) => {
    console.log('to', to, 'from', from, 'next', next);
    if (to.meta.requiresAuth) {
        // 確認身份
        check().then(response => {
            console.log(response)
            if (response.data.success) {
                next();
            } else {
                console.log('請重新登入')
                router.push('/login')
            }
        })
    } else {
        next();
    }
});