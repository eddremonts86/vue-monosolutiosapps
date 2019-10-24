<template>
    <v-layout class="about pa-2 radius7 grey lighten-5" wrap>
        <v-flex class="grey lighten-3" md4 >
            <v-expansion-panels>
                <v-expansion-panel
                        :key="i"
                        v-for="(country,i) in getCountry"
                >
                    <v-expansion-panel-header @click="changeLatLong(country.latlng)">
                        <span><img :src="country.flag" class="radius7 pt-4" height="25px" width="25px"/> {{country.name}}</span>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
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

                        <v-btn @click="changeLatLong(country.latlng)" class="primary" dark fab>
                            <v-icon>map</v-icon>
                        </v-btn>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-flex>
        <v-flex class="pa-4 grey lighten-4 radius_right" md8 xs12 v-if="showMaps">
            <maps :key="reloadMap"
                  :lat="lat"
                  :lng="long"
                  :radius="1"
                  :showRadius="false"
                  style="height: 100%; min-height: 300px"
            ></maps>
        </v-flex>
    </v-layout>
</template>

<script>
    import {mapGetters} from 'vuex';
    import maps from '@/views/maps.vue'

    export default {
        name: "country",
        data() {
            return {
                customSearch: false,
                showMaps: false,
                lat: 0,
                long: 0,
                reloadMap: 1
            }
        },
        components: {
            maps
        },
        computed: {
            ...mapGetters([
                'getCountries',
                'getCountry'
            ])
        },
        methods: {
            reset() {
                this.customSearch = false;
                this.searchItems = []
            },
            changeLatLong(latlng) {
                this.showMaps = true;
                this.lat = latlng[0];
                this.long = latlng[1];
                this.reloadMap = Math.random()
            }
        }
    }
</script>