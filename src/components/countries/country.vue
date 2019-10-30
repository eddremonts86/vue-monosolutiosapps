<template>
    <v-layout class="about pa-2 radius7 grey lighten-5" wrap>
        <v-flex class="md4 xs12">
            <v-expansion-panels v-if="getCountry.length > 0">
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
                        <p><b>Borders :</b></p>
                        <ul v-if="(country.borders).length > 0">
                            <li :key="i" class="ml-4" v-for="(borders,i) in country.borders">
                                {{borders}}
                            </li>
                        </ul>
                        <ul v-else> No Borders</ul>

                        <p><b>Currencies :</b></p>
                        <ul>
                            <li :key="i" class="ml-4" v-for="(currencies,i) in country.currencies">
                                {{currencies.name}} ({{currencies.symbol}}/{{currencies.code}})
                            </li>
                        </ul>

                        <p><b>Lenguages :</b></p>
                        <ul>
                            <li :key="i" class="ml-4" v-for="(languages,i) in country.languages">
                                {{languages.name}}
                            </li>
                        </ul>

                        <p><b>Phone Codes :</b></p>
                        <ul>
                            <li :key="i" class="ml-4" v-for="(callingCodes,i) in country.callingCodes">
                                {{callingCodes}}
                            </li>
                        </ul>

                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-flex>
        <v-flex class="pa-1 radius7 md-8 xs-12">
            <div v-if="activeMaps">
                <maps :key="reloadMap"
                      :lat="lat"
                      :lng="long"
                      :radius="1"
                      :showRadius="false"
                      class="maps"
                      v-if="showMaps"></maps>
            </div>
            <div v-else class="pa-3">
                <h3> No map enabled, please select a country</h3>
            </div>

        </v-flex>
    </v-layout>
</template>

<script>
    import {mapGetters} from 'vuex';
    import maps from '@/components/maps/maps.vue'

    export default {
        name: "country",
        data() {
            return {
                customSearch: false,
                showMaps: false,
                activeMaps: false,
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
                this.showMaps = false;
                this.activeMaps = false;
                this.searchItems = []
            },
            changeLatLong(latlng) {
                this.showMaps = true;
                this.activeMaps = true;
                this.lat = latlng[0];
                this.long = latlng[1];
                this.reloadMap = Math.random()
            }
        }
    }
</script>