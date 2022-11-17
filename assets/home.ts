import * as events from './events';
import * as timeago from './timeago';
import * as filterResults from './learning-paths';
import * as sparrow from "./sparrow";

(function () {
  timeago.init();
  events.focus();
  events.mobile();
  events.load();
  filterResults.filterResults();
  sparrow.init();
})();
