import * as events from "./events";
import * as contents from "./contents";
import * as timeago from "./timeago";
import * as navs from "./navlinks";

declare global {
  interface Window {
    docsearch: any;
    Coveo?: any;
  }
}

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
})();
