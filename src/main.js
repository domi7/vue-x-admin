import Vue from 'vue'


import router from './router';
import store from './store';
import './registerServiceWorker'

import ApiService from './common/js/api.service';
import DateFilter from './common/js/date.filter';
import ErrorFilter from './common/js/error.filter';





import 'normalize.css/normalize.css'
import './plugins/element'
import './plugins/splitpanel'
import './common/styles/index.scss'


import App from './App.vue'



Vue.config.productionTip = false;
Vue.filter("date", DateFilter);
Vue.filter("error", ErrorFilter);

ApiService.init();
ApiService.setHeader();

Vue.$router = router;


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
