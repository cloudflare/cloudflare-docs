import * as events from './events';
import * as timeago from './timeago';
import * as filterResults from './learning-paths';

(function () {
  timeago.init();
  events.focus();
  events.mobile();
  filterResults.filterResults();
  filterResults.loadResults();
})();
