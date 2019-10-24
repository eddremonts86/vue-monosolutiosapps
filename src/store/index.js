import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        country: [],
        countries: [],
        baseUrl: 'https://restcountries.eu/rest/v2',
        axiosConf: {
            headers: {
                "content-type": "application/json"
            }
        }
    },
    mutations: {
        setCountry(state, data) {
            state.country = data;
        },
        setCountries(state, data) {
            state.countries = data;
        }
    },
    actions: {
        async fetchCountry({commit, state}, parameters) {
            const urlBase = `${state.baseUrl}/${parameters.type}/${parameters.value}`;
            const data = await Axios.get(urlBase, state.axiosConf);
            commit("setCountry", data.data);
            return data.data;
        },
        async fetchCountries({commit, state}) {
            const urlBase = `${state.baseUrl}/all`;
            const data = await Axios.get(urlBase, state.axiosConf);
            commit("setCountries", data.data);
            return data.data;
        }
    },
    getters: {
        getCountry(state) {
            return state.country;
        },
        getCountries(state) {
            return state.countries;
        }
    },
    modules: {}
});
