import * as events from "./events";
import * as contents from "./contents";
import * as timeago from "./timeago";
import * as navs from "./navlinks";
import * as learningPathNavigation from "./learning-path-navigation";

declare global {
  interface Window {
    // algolia; @see search.ts
    Coveo?: any;
  }
}

const currentLocation = window.location.href;

(function () {
  navs.init();
  timeago.init();
  events.load();
  events.focus();
  events.mobile();
  events.dropdowns();
  contents.toc();
  events.toggleSidebar();
  events.activeTab();
  events.tabs();
  if (currentLocation.includes("/learning-paths/modules")) {
    learningPathNavigation.init();
  }
})();
