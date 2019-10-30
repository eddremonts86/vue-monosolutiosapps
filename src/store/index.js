import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        baseUrl: "https://restcountries.eu/rest/v2",
        axiosConf: {
            headers: {
                "content-type": "application/json"
            }
        },
        country: [],
        countries: [],
        lang: [],
        currency: []
    },
    mutations: {
        setCountry(state, data) {
            state.country = data;
        },
        setCountries(state, data) {
            state.countries = data;
        },
        setCurrency(state, data) {
            state.currency = data;
        },
        setLang(state, data) {
            state.lang = data;
        }
    },
    actions: {
        async fetchCountry({commit, state}, parameters) {
            let data = [];
            if (parameters === null) {
                let history = JSON.parse(localStorage.getItem('history'));
                commit("setCountry", history);
            } else {
                const urlBase = `${state.baseUrl}/${parameters.type}/${parameters.value}`;
                data = await Axios.get(urlBase, state.axiosConf);
                if (localStorage.getItem('history')) {
                    let history = JSON.parse(localStorage.getItem('history'));
                    data.data.forEach(function (element) {
                        let result = history.find(country => country.name === element.name);
                        if (!result) {
                            history.push(element);
                        }
                    });
                    localStorage.setItem('history', JSON.stringify(history));
                } else {
                    localStorage.setItem('history', JSON.stringify(data.data));
                }
                commit("setCountry", data.data);
            }
            return data.data;
        },
        fetchCountries({commit, state}) {
            const urlBase = `${state.baseUrl}/all?fields=name;capital;flag;languages;currencies`;
            let languages = [];
            let countries = [];
            let currencies = [];
            Axios.get(urlBase, state.axiosConf).then((response) => {
                countries = response.data;
                commit("setCountries", countries);
                countries.forEach((country) => {
                    (
                        country.languages).forEach((lang) => {
                        const resultado = languages.find(language => language.name === lang.name);
                        if (!resultado) {
                            languages.push({
                                'name': lang.name,
                                'nativeName': lang.nativeName,
                                'iso_1': lang.iso639_1,
                                'iso_2': lang.iso639_2,
                            })
                        }
                    });
                    (country.currencies).forEach((currency) => {
                        const resultado = currencies.find(currenc => currenc.name === currencies.name);
                        if (!resultado) {
                            currencies.push({
                                'name': currency.name,
                                'code': currency.code,
                                'symbol': currency.symbol,
                            })
                        }
                    });
                });
            }).finally(() => {
                commit("setCurrency", currencies);
                commit("setLang", languages);
            })
        }
    },
    getters: {
        getCountry(state) {
            return state.country;
        },
        getCountries(state) {
            return state.countries;
        },
        getCurrencies(state) {
            return state.currency;
        },
        getLang(state) {
            return state.lang;
        }
    },
    modules: {}
});
