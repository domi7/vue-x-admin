import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import TokenService from "@/common/js/token.service";
import {API_URL, REQ_TIMEOUT, REQ_CROS, IS_MOCK} from "@/common/js/config";

const adapter = async function (config) {
    if (IS_MOCK) {
        const mock = await import('@/mock')
        const mockdata =mock.default
        const baseUrl = config.baseURL.endsWith('/') ? config.baseURL : config.baseURL + '/';

        const uri = config.url.replace(baseUrl, '/')

        if (config.method == 'get') {
            console.log('GET 请求参数：' + config.params)
        }

        if (config.method == 'post') {
            console.log('POST 请求参数：' + config.data)
        }


        const item = mockdata.find(item => {

            return uri.indexOf(item.url) === 0
        })


        return new Promise((resolve) => {
            resolve(item.response)
        })

    }
}

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = API_URL;
        Vue.axios.defaults.timeout = REQ_TIMEOUT;
        Vue.axios.defaults.withCredentials = REQ_CROS;
        Vue.axios.defaults.adapter = adapter;
        Vue.axios.interceptors.response.use(response=>{
            if(response.code===4004){
                Vue.$message('token验证失败，重新登录！')
                Vue.$router.replace("/login")

            }
            return response;

        },error => {
            return error;
        })
    },

    setHeader() {
        Vue.axios.defaults.headers.common[
            "Authorization"
            ] = `Token ${TokenService.getToken()}`;
    },

    query(resource, params) {
        return Vue.axios.get(resource, params).catch(error => {
            throw new Error(`[VXM] ApiService ${error}`);
        });
    },

    get(resource, slug = "") {
        return Vue.axios.get(`${resource}/${slug}`).catch(error => {
            throw new Error(`[VXM] ApiService ${error}`);
        });
    },

    post(resource, params) {
        return Vue.axios.post(`${resource}`, params);
    },

    update(resource, slug, params) {
        return Vue.axios.put(`${resource}/${slug}`, params);
    },

    put(resource, params) {
        return Vue.axios.put(`${resource}`, params);
    },

    delete(resource) {
        return Vue.axios.delete(resource).catch(error => {
            throw new Error(`[VXM] ApiService ${error}`);
        });
    }
};


export default ApiService;


