<template>
    <v-layout class="about pa-2 radius7 grey lighten-5" wrap>
        <v-flex class="pa-4 grey lighten-2 radius_left" md3 xs12>
            <v-card class="radius7">
                <v-card-text class="grey lighten-4 ">
                    <v-form
                            lazy-validation
                            ref="form"
                    >
                        <v-text-field
                                filled
                                label="Name"
                                required rounded
                                v-model="serachItems['name']"
                        ></v-text-field>
                        <v-text-field
                                filled
                                label="Capital"
                                required rounded
                                v-model="serachItems['capital']"
                        ></v-text-field>
                        <v-text-field
                                filled
                                label="Language"
                                required rounded
                                v-model="serachItems['language']"
                        ></v-text-field>
                        <v-text-field
                                filled
                                label="Currency"
                                required rounded
                                v-model="serachItems['currency']"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="primary" dark fab>
                        <v-icon>search</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
        <v-flex class="grey lighten-3" md3 xs12>
            <div :key="country.name" class="pa-4" v-for="country in getCountry">
                <v-card class="info_card">
                    <v-card-text>
                        <h2>General Information </h2><br>
                        <img :src="country.flag" class="radius7" height="auto" width="100%"/>
                        <p><b>Name :</b> {{country.name}}</p>
                        <p><b>Country Code :</b> {{country.alpha3Code}}</p>
                        <p><b>Capital :</b> {{country.capital}}</p>
                        <p><b>Region :</b> {{country.region}}</p>
                        <p><b>Population :</b> {{country.population}}</p>
                        <p><b>Numeric Code :</b> {{country.numericCode}}</p>
                        <h2>Other Information </h2><br>
                        <p><b>Borders :</b>
                        <ul v-if="(country.borders).length > 0">
                            <li :key="i" class="ml-4" v-for="(borders,i) in country.borders">
                                {{borders}}
                            </li>
                        </ul>
                        <ul v-else> No Borders</ul>
                        </p>
                        <p><b>Currencies :</b>
                        <ul>
                            <li :key="i" class="ml-4" v-for="(currencies,i) in country.currencies">
                                {{currencies.name}} ({{currencies.symbol}}/{{currencies.code}})
                            </li>
                        </ul>
                        </p>
                        <p><b>Lenguages :</b>
                        <ul>
                            <li :key="i" class="ml-4" v-for="(languages,i) in country.languages">
                                {{languages.name}}
                            </li>
                        </ul>
                        </p>
                        <p><b>Phone Codes :</b>
                        <ul>
                            <li :key="i" class="ml-4" v-for="(callingCodes,i) in country.callingCodes">
                                {{callingCodes}}
                            </li>
                        </ul>
                        </p>
                        <v-btn class="primary" dark fab> <v-icon>map</v-icon></v-btn>
                    </v-card-text>
                </v-card>
            </div>
        </v-flex>
        <v-flex class="pa-4 grey lighten-4 radius_right" md6 xs12>

        </v-flex>
    </v-layout>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "index",
        data() {
            return {
                customSearch: false,
                serachItems: []
            }
        },
        created() {
            this.init();
        },
        computed: {
            ...mapGetters([
                'getCountries',
                'getCountry'
            ])
        },
        methods: {
            init() {
                let parameters = {
                    type: 'name',
                    value: 'China'
                };
                this.$store.dispatch('fetchCountry', parameters)
            },
            reset() {
                this.customSearch = false;
                this.searchItems = []
            },
            remove() {
                this.serachItems['country'] = ''
            },
        }
    }
</script>