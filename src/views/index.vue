<template>
    <div class="mx-auto">
        <div v-if="!customSearch">
            <a @click="customSearch = !customSearch" class="custom_search_text">Custom Search</a>
             <v-autocomplete
                    :items="getCountries"
                    append-icon="search"
                    box
                    chips
                    color="blue-grey lighten-2"
                    filled
                    item-text="name"
                    item-value="name"
                    label="Search by country name"
                    outline
                    persistent-hint
                    rounded
                    v-model="serachItems['country']"
            >
                <template v-slot:name>
                    <v-icon style="vertical-align: middle">
                        search
                    </v-icon> Search by country name
                </template>
                <template v-slot:selection="data">
                    <v-chip
                            :selected="data.selected"
                            @input="remove()"
                            close
                    >
                        <v-icon>room</v-icon>
                        {{ data.item.name }}
                    </v-chip>
                </template>
                <template v-slot:item="data">
                    <template>
                        <v-icon>room</v-icon>
                        <v-list-tile-content v-text="data.item.name"/>
                    </template>
                </template>
            </v-autocomplete>
        </div>
        <div v-else>
            <v-card class="radius7">
                <v-card-title class="grey mb-3">
                    <v-spacer></v-spacer>
                    <v-btn @click="reset()" class="error" dark fab small>
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text class="px-3 pt-3 pb-0">
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
                    <v-spacer/>
                    <v-btn class="primary" dark fab>
                        <v-icon>search</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>

        </div>
    </div>
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
                this.$store.dispatch('fetchCountries');
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
