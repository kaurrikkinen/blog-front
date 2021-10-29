module.exports = {
    devServer: {
        proxy: "http://[::1]:8000/"
    },

    transpileDependencies: [
      'vuetify'
    ],
    css: {
        loaderOptions: {
            sass: {
                // Here we can specify the older indent syntax formatted SASS
                // Note that there is *not* a semicolon at the end of the below line
                additionalData: `@import "@/styles/_variables.sass"`
            },
            scss: {
                // Here we can use the newer SCSS flavor of Sass.
                // Note that there *is* a semicolon at the end of the below line
                additionalData: `@import "@/styles/_variables.scss";`
            }
        }
    }
};
