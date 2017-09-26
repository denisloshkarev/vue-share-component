import Vue from 'vue';

Vue.component('share-button', () => import('./components/share-button.vue'));

var app = new Vue({
    el: '#app',
    methods: {
        sharePost(shareTo) {
            console.log("Shared to:", shareTo);
        }
    }
});


require('file-loader?name=./[name].[ext]!../../html/index.html');