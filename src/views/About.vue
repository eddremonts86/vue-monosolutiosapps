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
        <v-flex class="pa-4 grey lighten-3" md3 xs12>
            <h2>Related Info </h2>
            <div class="pa-5" v-for="country in getCountry" :key="country.name">
                <img :src="country.flag" class="radius7" height="auto" width="150px"/>
                <h3>Name : {{country.name}}</h3>
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
                    value: 'spain'
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