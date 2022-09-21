import * as events from './events';
import * as timeago from './timeago';
import * as learningPathFunctions from './learning-paths';

(function () {
  timeago.init();
  events.focus();
  events.mobile();
  events.load();
  learningPathFunctions.filterResults();
})();
