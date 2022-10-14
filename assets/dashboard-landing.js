
import * as recommendations from "./dashboard-landing.json";

let data = recommendations["default"]["resources"]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [{path: '/'}]
})

Vue.createApp({
  methods: {
    filterByQuery(query) {
      if (Object.keys(query)[0] === "dash_area") {
        this.visibleData = data.filter((item) => Object.values(this.$route.query)[0] === item.dashPath);
      }
    }
  },
  template: `
    <div>
        <ul>
            <li v-for="element in visibleData[0].recommendations"><a href='element.url_path'>[[ element.title ]]</a></li>
        </ul>
    </div>`,
  data() {
    return {
      visibleData: data
    };
  },
  computed: {
  },
  delimiters: ["[[", "]]"],
  created() {
    this.$watch(
      () => this.$route.query,
      () => {
        this.filterByQuery(this.$route.query)
      })
    }
}).use(router).mount("#dashboardLandingPage");