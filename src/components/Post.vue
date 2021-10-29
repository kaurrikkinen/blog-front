<template>
    <div>
    <v-card-text>

        <p class="text--primary font-weight-medium">
            {{ postData.content }}
        </p>


        <v-form
                v-on:submit.prevent="updatePostContent"
                ref="form"
                class="d-flex"
        >
            <v-text-field
                    v-model="postContent"
                    label="Edit post content"
                    :rules="contentRules"
                    dense

            >
            </v-text-field>
            <v-btn
                    color="warning"
                    type="submit"
                    small
            >
                Edit
            </v-btn>
        </v-form>
        <v-form
                v-on:submit.prevent="deletePost"
        >
            <v-btn
                    color="error"
                    type="submit"
                    small

            >
                Delete post
            </v-btn>
        </v-form>


    </v-card-text>
        <v-divider></v-divider>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "Post",
        props:
            ["postData"]
        ,
        data: () => ({
            postContent: "",
            contentRules: [
                v => !!v || "Please enter content.",
                v => (v && v.length < 141) || "Post content cannot exceed 140 characters.",
            ]
        }),
        methods: {
            updatePostContent() {
                if (this.$refs.form.validate()) {
                    axios.put(`http://localhost:8080/api/posts/${this.$vnode.key}`,
                        {
                            content: this.postContent
                        }).then((res) => {
                        console.log(res);
                        this.postData.content = this.postContent;
                        this.$refs.form.reset();
                    }).catch((error) => {
                        console.log(error.response.data.name[0]);
                    });
                }
            },
            deletePost() {
                axios.delete(`http://localhost:8080/api/posts/${this.$vnode.key}`)
                .then((res) => {
                    this.$emit("deletePost", this.$vnode.key);
                    console.log(res);
                }).catch((error) => {
                    console.log(error.response.data);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
 p {
     font-size: $paragraph-size;
 }
    .v-divider {
        border-width: $divider-width;
    }

</style>