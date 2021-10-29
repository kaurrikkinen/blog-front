<template>
    <v-card>
        <v-card-title class="text-h5 category-title">
            {{ categoryName }}
        </v-card-title>
        <v-container>
        <v-form
                v-on:submit.prevent="addPost"
                ref="form"
        >
            <v-textarea
                    v-model="postContent"
                    label="Add a new post!"
                    :rules="contentRules"
                    rows="3"
                    counter
            >
            </v-textarea>
            <v-btn
                    color="success"
                    type="submit"
            >
                Add
            </v-btn>
        </v-form>
            <v-divider></v-divider>
        <Post
                v-for="post in posts"
                :key="post.id"
                :postData="post"
                @deletePost="postDeleted"
        />
        </v-container>
    </v-card>
</template>

<script>
    import axios from "axios";
    import Post from "@/components/Post";

    export default {
        name: "PostsView",
        components: {
            Post
        },
        props: {
            categoryName: String
        },
        data: () => ({
            posts: null,
            postContent: "",
            contentRules: [
                v => !!v || "Please enter content.",
                v => (v && v.length < 141) || "Post content cannot exceed 140 characters.",
            ]
        }),
        methods: {
            getPosts() {
                axios.get(`http://localhost:8080/api/posts/${this.$vnode.key}`).then(response => {
                    this.posts = response.data;
                }).catch((error) => {
                    console.log(error);
                });
            },
            addPost() {
                if (this.$refs.form.validate()) {
                    axios.post("http://localhost:8080/api/posts",
                        {
                            content: this.postContent,
                            category_id: this.$vnode.key
                        }).then((res) => {
                        console.log(res);
                        this.posts.unshift(res.data);
                        this.$refs.form.reset();
                    }).catch((error) => {
                        console.log(error.response.data.name[0]);
                    });
                }
            },
            postDeleted(postId) {
                this.posts = this.posts.filter(function( post ) {
                   return post.id !== postId;
                });
            }
        },
        mounted() {
            this.getPosts();
        }

    }
</script>

<style lang="scss" scoped>
    .category-title {
        color: $primary-white;
        background: $primary-blue;
    }
    .v-divider {
        border-width: $divider-width;
        margin-top: $divider-margin;
    }
</style>