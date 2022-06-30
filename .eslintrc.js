module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    rules: {
        "no-console": "off",
        'vue/multi-word-component-names': 'off',
        'no-unused-vars': "off",
        'vue/no-v-model-argument': "off",
        'vue/no-multiple-template-root': "off",
        'vue/no-use-v-if-with-v-for': 'off'
    }
}