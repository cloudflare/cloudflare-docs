
import * as recommendations from "./dashboard-landing.json";

const data = recommendations["default"]["resources"]

const dashPathMap = data.map((x) => x.dashPath )

Vue.createApp({
  methods: {
    filterByParam() {      
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      if (params.dash_area !== null) {
        if (params.dash_area in this.dashPathMap) {
          this.visibleData = data.filter((item) => item.dashPath === params.dash_area);
        } else {
          this.visibleData = data.filter((item) => params.dash_area.includes(item.dashPath));
        }         
        if (this.visibleData.length === 0) {
          this.visibleData = data.filter((item) => item.id === "Default");
        }
      } else {
        this.visibleData = data.filter((item) => item.id === "Default");
      }
    }
  },
  beforeMount() {
    this.filterByParam();
  },
  template: `
        <ul class="recommendationList">
            <li class="recommendationLink" v-for="element in visibleData[0].recommendations"><a href='element.url_path'>[[ element.title ]]</a></li>
        </ul>`,
  data() {
    return {
      visibleData: data,
      dashPathMap: dashPathMap
    };
  },
  delimiters: ["[[", "]]"],
}).mount("#dashboardLandingPage");