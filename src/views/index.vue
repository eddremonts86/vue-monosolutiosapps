<template>
    <div class="mx-auto search_box radius7 pa-5">
        <v-layout v-if="!customSearch" wrap>
            <v-flex class="xs12"><a @click="customSearch = !customSearch" class="custom_search_text"
            >Custom Search</a
            ></v-flex>
            <v-flex class="xs8 sm10">
                <v-autocomplete
                        :items="getCountries"
                        append-icon="search"
                        chips
                        color="white"
                        filled
                        item-text="name"
                        item-value="name"
                        label="Search by country name"
                        outline
                        persistent-hint
                        rounded
                        v-model="serachItems['country']"
                >
                    <template class="custom_search_text" v-slot:name>
                        <v-icon class="custom_search_text" style="vertical-align: middle">
                            search
                        </v-icon>
                        Search by country name
                    </template>
                    <template v-slot:selection="data">
                        <v-chip :selected="data.selected" @input="remove()" close>
                            <v-icon>room</v-icon>
                            <img
                                    :src="data.item.flag"
                                    class="mx-1 radius7"
                                    height="25px"
                                    width="25px"
                            />
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
            </v-flex>
            <v-flex class="xs4 sm2 mt-2  text-center">
                <v-btn @click="searchCountry()" class="primary" dark fab>
                    <v-icon>search</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout v-else wrap>
            <v-flex class="xs12">
                <v-card class="radius7">
                    <v-card-text class="px-3 pt-3 pb-0">
                        <v-form lazy-validation ref="form">
                            <v-text-field
                                    filled
                                    label="Capital"
                                    required
                                    rounded
                                    v-model="serachItems['capital']"
                            ></v-text-field>
                            <v-text-field
                                    filled
                                    label="Language"
                                    required
                                    rounded
                                    v-model="serachItems['language']"
                            ></v-text-field>
                            <v-text-field
                                    filled
                                    label="Currency"
                                    required
                                    rounded
                                    v-model="serachItems['currency']"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn class="primary" dark rounded>
                            <v-icon>search</v-icon>
                            search
                        </v-btn>
                        <v-btn @click="reset()" class="error" dark rounded>
                            <v-icon>close</v-icon>
                            close
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>

        <v-dialog
                v-model="dialog"
                width="70%"
        >
            <country/>
        </v-dialog>
    </div>
</template>
<script>
    import country from "@/views/About.vue";
    import {mapGetters} from "vuex";

    export default {
        name: "index",
        data() {
            return {
                customSearch: false,
                serachItems: [],
                dialog: false
            };
        },
        components: {
            country
        },
        created() {
            this.init();
        },
        computed: {
            ...mapGetters(["getCountries", "getCountry"])
        },
        methods: {
            init() {
                this.$store.dispatch("fetchCountries")
            },
            searchCountry() {
                this.dialog = true
                let parameters = {
                    type: 'name',
                    value: this.serachItems['country']
                };
                this.$store.dispatch('fetchCountry', parameters)
            },
            reset() {
                this.customSearch = false;
                this.searchItems = [];
            },
            remove() {
                this.serachItems["country"] = "";
            }
        }
    };
</script>
