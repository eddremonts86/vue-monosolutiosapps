<template>
    <div class="mx-auto search_box radius7 pa-5">
        <v-layout v-if="!customSearch" wrap>
            <v-flex class="xs12">
                <a @click="customSearch = !customSearch" class="custom_search_text">Custom Search</a>
                <a @click="search('history')" class="custom_search_text">History</a>
            </v-flex>
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
                            <img
                                    :src="data.item.flag"
                                    class="mx-1 radius7"
                                    height="18px"
                                    width="18px"
                            />
                            {{ data.item.name }}
                        </v-chip>
                    </template>
                    <template v-slot:item="data">
                        <template>
                            <img
                                    :src="data.item.flag"
                                    class="mx-1 radius7"
                                    height="18px"
                                    width="18px"
                            />
                            <v-list-tile-content v-text="data.item.name"/>
                        </template>
                    </template>
                </v-autocomplete>
            </v-flex>
            <v-flex class="xs4 sm2 mt-2  text-center">
                <v-btn @click="search('name', serachItems['country'])" class="primary" dark fab>
                    <v-icon>search</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
        <v-layout v-else wrap>
            <v-flex class="xs12">
                <v-card class="radius7">
                    <v-card-text class="px-3 pt-3 pb-0">
                        <v-form lazy-validation ref="form">
                            <v-layout wrap>
                                <v-flex xs2>
                                    <v-switch @click="elementsChanges('capitalSwitch')"
                                              v-model="showElements['capitalSwitch']"></v-switch>
                                </v-flex>
                                <v-flex xs10>
                                    <v-autocomplete
                                            :disabled="!showElements['capitalSwitch']"
                                            :items="getCountries"
                                            @change="createSearchArray('capital', serachItems['capital'])"
                                            append-icon="search"
                                            chips
                                            color="white"
                                            filled
                                            item-text="capital"
                                            item-value="capital"
                                            label="Search by country capital name"
                                            outline
                                            persistent-hint
                                            rounded
                                            v-model="serachItems['capital']"

                                    >
                                        <template class="custom_search_text" v-slot:capital>
                                            <v-icon class="custom_search_text" style="vertical-align: middle">
                                                search
                                            </v-icon>
                                            Search by country capital
                                        </template>
                                        <template v-slot:selection="data">
                                            <v-chip :selected="data.selected" @input="remove()" close>
                                                <img
                                                        :src="data.item.flag"
                                                        class="mx-1 radius7"
                                                        height="18px"
                                                        width="18px"
                                                />
                                                {{ data.item.capital }} ; {{ data.item.name }}
                                            </v-chip>
                                        </template>
                                        <template v-slot:item="data">
                                            <template>
                                                <img
                                                        :src="data.item.flag"
                                                        class="mx-1 radius7"
                                                        height="18px"
                                                        width="18px"
                                                />
                                                <v-list-tile-content v-text="data.item.capital"/>
                                            </template>
                                        </template>
                                    </v-autocomplete>
                                </v-flex>
                            </v-layout>
                            <v-layout wrap>
                                <v-flex xs2>
                                    <v-switch @click="elementsChanges('langSwitch')"
                                              v-model="showElements['langSwitch']"></v-switch>
                                </v-flex>
                                <v-flex xs10>
                                    <v-autocomplete
                                            :disabled="!showElements['langSwitch']"
                                            :items="getLang"
                                            @change="createSearchArray('lang', serachItems['language'])"
                                            append-icon="search"
                                            chips
                                            color="white"
                                            filled
                                            item-text="name"
                                            item-value="iso_1"
                                            label="Search by Langague"
                                            outline
                                            persistent-hint
                                            rounded
                                            v-model="serachItems['language']"

                                    >
                                        <template class="custom_search_text" v-slot:name>
                                            <v-icon class="custom_search_text" style="vertical-align: middle">
                                                search
                                            </v-icon>
                                            Search by language
                                        </template>
                                        <template v-slot:selection="data">
                                            <v-chip :selected="data.selected" @input="remove()" close>
                                                {{ data.item.name }}
                                            </v-chip>
                                        </template>
                                        <template v-slot:item="data">
                                            <template>
                                                <v-list-tile-content v-text="data.item.name"/>
                                                <v-spacer></v-spacer>
                                                <v-badge class="grey darken-1  pa-2 radius7"> Native : {{
                                                    data.item.nativeName }}
                                                </v-badge>
                                            </template>
                                        </template>
                                    </v-autocomplete>
                                </v-flex>
                            </v-layout>
                            <v-layout wrap>
                                <v-flex xs2>
                                    <v-switch @click="elementsChanges('currencySwitch')"
                                              v-model="showElements['currencySwitch']"></v-switch>
                                </v-flex>
                                <v-flex xs10>
                                    <v-autocomplete
                                            :disabled="!showElements['currencySwitch']"
                                            :items="getCurrencies"
                                            @change="createSearchArray('currency', serachItems['currency'])"
                                            append-icon="search"
                                            chips
                                            color="white"
                                            filled
                                            item-text="name"
                                            item-value="code"
                                            label="Search by currencies"
                                            outline
                                            persistent-hint
                                            rounded
                                            v-model="serachItems['currency']"

                                    >
                                        <template class="custom_search_text" v-slot:name>
                                            <v-icon class="custom_search_text" style="vertical-align: middle">
                                                search
                                            </v-icon>
                                            Search by courrencies
                                        </template>
                                        <template v-slot:selection="data">
                                            <v-chip :selected="data.selected" @input="remove()" close>
                                                {{ data.item.name }}
                                                <v-badge class="ml-2 grey darken-1 pa-1 radius7">{{ data.item.symbol
                                                    }}
                                                </v-badge>
                                            </v-chip>
                                        </template>
                                        <template v-slot:item="data">
                                            <template>
                                                <v-list-tile-content v-text="data.item.name"/>
                                                <v-spacer></v-spacer>
                                                <v-badge class="grey darken-1 pa-2 radius7">{{ data.item.symbol }}
                                                </v-badge>
                                            </template>
                                        </template>
                                    </v-autocomplete>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="grey darken-2">
                        <v-spacer/>
                        <v-btn @click="searchCustom()" class="primary radius7" dark>
                            <v-icon>search</v-icon>
                            search
                        </v-btn>
                        <v-btn @click="reset()" class="error radius7" dark>
                            <v-icon>close</v-icon>
                            close
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <v-dialog
                v-model="getWindowsStatus"
                width="60%"
                persistent
        >
            <country/>
        </v-dialog>
    </div>
</template>
<script>
    import country from "@/components/countries/country.vue";
    import {mapGetters} from "vuex";

    export default {
        name: "index",
        data() {
            return {
                customSearch: false,
                serachItems: [],
                showElements: [],
                serachArray: {},
            };
        },
        components: {
            country
        },
        created() {
            this.init();
        },
        computed: {
            ...mapGetters(["getCountries", "getCountry", "getCurrencies", "getLang","getWindowsStatus"])
        },
        methods: {
            init() {
                this.$store.dispatch("fetchCountries");
            },
            search(type = 'name', value) {
                this.$store.dispatch('fetchWindowsStatus', true);
                if (type === 'history') {
                    this.$store.dispatch('fetchCountry', null);
                    return true
                }
                let parameters = {
                    type: type,
                    value: value
                };
                this.$store.dispatch('fetchCountry', parameters)

            },
            reset() {
                this.customSearch = false;
                this.searchItems = [];
            },
            remove() {
                this.serachItems["country"] = "";
            },
            elementsChanges(element) {
                for (let key in this.showElements) {
                    if (key !== element) {
                        this.showElements[key] = false
                    }
                }
                for (let key in this.serachItems) {
                    if (key !== element) {
                        this.serachItems[key] = []
                    }
                }
            },
            createSearchArray(name, value) {
                this.serachArray = {
                    type: name,
                    value: value
                };
                return true;
            },
            searchCustom() {
                this.dialog = true;
                let parameters = {
                    type: this.serachArray.type,
                    value: this.serachArray.value
                };
                this.$store.dispatch('fetchCountry', parameters)
            },

        }
    };
</script>
