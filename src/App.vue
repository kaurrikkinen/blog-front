<template>
  <v-app>
    <v-main>
      <v-container
        :style="{width: getWidth + '%'}"
      >
        <h1 class="mb-4">Current categories</h1>
        <v-form
                v-on:submit.prevent="addCategory"
                ref="form"
                class="d-inline-flex new-category-form"
        >
          <v-text-field
                  v-model="categoryName"
                  label="Add a new category!"
                  :error-messages="errorMessage"
                  :rules="nameRules"
                  dense
          >
          </v-text-field>
          <v-btn
                  color="success"
                  type="submit"
                  x-small
                  fab
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-form>
        <Category
                v-for="category in categories"
                :key="category.id"
                :categoryData="category"
        />
      </v-container>

    </v-main>
  </v-app>
</template>

<script>
import Category from "@/components/Category";
import axios from "axios";

export default {
  name: 'App',

  components: {
    Category
  },

  data: () => ({
    categories: null,
    categoryName: "",
    errorMessage: "",
    nameRules: [
      v => !!v || "Please enter a name.",
      v => (v && v.length < 16) || "Category name cannot exceed 15 characters.",
      v => /^[\w]*$/.test(v) || "Please use only letters, numbers and underscores.",
    ]
  }),
  computed: {
    getWidth() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs": return 100
        case "sm": return 80
        case "md": return 60
        default: return 50
      }
    }
  },
  methods: {
    getData() {
      axios.get("http://localhost:8080/api/categories").then(response => {
        this.categories = response.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    addCategory() {
      if (this.$refs.form.validate()) {
        axios.post("http://localhost:8080/api/categories",
                {
                  name: this.categoryName
                }).then((res) => {
          console.log(res);
          this.categories.unshift(res.data);
          this.$refs.form.reset();
        }).catch((error) => {
          this.errorMessage = error.response.data.name[0];
          console.log(error.response.data.name[0]);
        });
      }
    },
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="scss">

  .new-category-form {
    margin-bottom: $spacing--long;
  }
  h1 {
    color: $primary-blue;
  }
</style>