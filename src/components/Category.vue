<template>
    <div class="category">
        <v-card class="category-card">
        <v-card
                class="mx-auto pa-4 name-card"
                elevation="4"
        >
            <h3>{{ categoryData.name }}</h3>
        </v-card>

        <v-form
            v-on:submit.prevent="updateCategoryName"
            ref="form"
            class="d-inline-flex edit-category-form"
        >
            <v-text-field
                v-model="categoryName"
                label="Edit category name"
                :error-messages="errorMessage"
                :rules="nameRules"
                dense
            >
            </v-text-field>
            <v-btn
                color="primary"
                type="submit"
                x-small
                fab
            >
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </v-form>
        <v-dialog
            v-model="dialog"
            width="500"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                        color="grey"
                        dark
                        v-bind="attrs"
                        v-on="on"
                        class="d-flex show-posts-btn"
                        small
                >
                    Show posts
                    <v-icon
                            right
                    >
                        mdi-format-list-bulleted-square
                    </v-icon>
                </v-btn>
            </template>

                <PostsView
                    :key="categoryData.id"
                    :categoryName="categoryData.name"
                />

        </v-dialog>
        </v-card>
    </div>
</template>

<script>
    import axios from "axios";
    import PostsView from "@/components/PostsView";

    export default {
        name: "Category",
        components: {
            PostsView
        },
        props: ["categoryData"],
        data: () => ({
            categoryName: "",
            errorMessage: "",
            nameRules: [
                v => !!v || "Please enter a name.",
                v => (v && v.length < 16) || "Category name cannot exceed 15 characters.",
                v => /^[\w]*$/.test(v) || "Please use only letters, numbers and underscores.",
            ],
            dialog: false
        }),
        methods: {
            updateCategoryName() {
                if (this.$refs.form.validate()) {
                    axios.put(`http://localhost:8080/api/categories/${this.categoryData.id}`,
                        {
                            name: this.categoryName
                        }).then((res) => {
                           console.log(res);

                            this.categoryData.name = this.categoryName;
                        this.$refs.form.reset();
                    }).catch((error) => {
                        this.errorMessage = error.response.data.name[0];
                        console.log(error.response.data.name[0]);
                    });
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .category {
        margin-bottom: $spacing--long;
    }
    .name-card {
        color: $primary-white;
        background: $primary-blue;
    }
    .edit-category-form {
        @extend .edit-button__margins
    }
    .show-posts-btn {
        margin-left: 20px;
    }
    .category-card {
        padding-bottom: 10px;
    }
</style>