
import * as recommendations from "./dashboard-landing.json";

let data = recommendations["default"]["resources"]

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

Vue.createApp({
  methods: {
    filterByParam() {
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      if (params.dash_area !== null) {
        this.visibleData = data.filter((item) => item.dashPath === params.dash_area);
        if (this.visibleData.length === 0) {
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
  delimiters: ["[[", "]]"],
}).mount("#dashboardLandingPage");