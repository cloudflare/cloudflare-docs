import * as recommendations from "./dashboard-landing.json";

const data = recommendations["default"]["resources"];

const dashPathMap = data.map((x) => x.dashPath);

const DEFAULT_ITEM_ID = "Default";
let longestMatch;

Vue.createApp({
  methods: {
    filterByParam() {
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      if (params.dash_area !== null) {
        const matches = this.dashPathMap.filter((item) =>
          params.dash_area.includes(item)
        );
        if (matches.length !== 0) {
          longestMatch = matches.reduce(function (a, b) {
            return a.length > b.length ? a : b;
          });
          this.visibleData = data.find(
            (element) => element.dashPath === longestMatch
          );
        } else {
          this.visibleData = data.find(
            (element) => element.id === DEFAULT_ITEM_ID
          );
        }
      } else {
        this.visibleData = data.find(
          (element) => element.id === DEFAULT_ITEM_ID
        );
      }
    },
  },
  beforeMount() {
    this.filterByParam();
  },
  template: `
        <ul class="recommendationList">
            <li class="recommendationLink" v-for="element in visibleData.recommendations"><a :href='element.url_path' target='_blank'>[[ element.title ]]</a></li>
        </ul>`,
  data() {
    return {
      visibleData: data,
      dashPathMap: dashPathMap,
    };
  },
  delimiters: ["[[", "]]"],
}).mount("#dashboardLandingPage");
