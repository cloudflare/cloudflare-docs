import * as events from './events';
import * as contents from './contents';
import * as timeago from './timeago';
import * as navs from './navlinks';

declare global {
  interface Window {
    // algolia; @see search.ts
    docsearch?(options: any): any;
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
  events.copy();

  contents.toc();
})();
