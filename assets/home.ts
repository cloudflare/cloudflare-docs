import * as events from './events';
import * as timeago from './timeago';

(function () {
  timeago.init();

  events.focus();
  events.mobile();
})();
