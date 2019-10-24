<template>
    <div class="mx-auto" >
        <div v-if="!customSearch">
            <a  @click="customSearch = !customSearch" class="custom_search_text">Custom Search</a>
            <v-autocomplete
                    :items="states"
                    append-icon="search"
                    filled
                    label="Search by country name "
                    rounded
            ></v-autocomplete>
        </div>
        <div v-else>
            <v-card class="radius7">
                <v-card-title class="grey mb-3">
                    <v-spacer></v-spacer>
                    <v-btn class="error" @click="reset()" fab dark small><v-icon>close</v-icon> </v-btn>
                </v-card-title>
                <v-card-text class="px-3 pt-3 pb-0">
                    <v-form
                            ref="form"
                            lazy-validation
                    >
                        <v-text-field
                                v-model="serachItems['name']"
                                label="Name"
                                filled rounded
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="serachItems['capital']"
                                label="Capital"
                                filled rounded
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="serachItems['language']"
                                label="Language"
                                filled rounded
                                required
                        ></v-text-field>
                        <v-text-field
                                v-model="serachItems['currency']"
                                label="Currency"
                                filled rounded
                                required
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn class="primary" fab dark ><v-icon>search</v-icon></v-btn>
                </v-card-actions>
            </v-card>

        </div>
    </div>

</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                states: [],
                customSearch: false,
                serachItems:[]
            }
        },
        methods:{
            reset(){
                this.customSearch = false;
                this.searchItems = []
            }
        }
    }
</script>

<style scoped>

</style>