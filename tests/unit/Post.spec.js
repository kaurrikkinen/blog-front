import { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Post from "@/components/Post";


// tests are unfinished

describe("Post.vue", () => {
    const localVue = createLocalVue();
    const vuetify = new Vuetify();
    const postData = {
        id: 1,
        content: "Blog post number one",
        category_id: 1
    };
    const wrapper = mount(Post, {
        localVue,
        vuetify,
        propsData: { postData }
    });


    it("should contain the correct content of the post", () => {
        expect(wrapper.text()).toContain(postData.content)
    })

    jest.mock("axios", () => ({
        put: jest.fn(() => postData)
    }))

})