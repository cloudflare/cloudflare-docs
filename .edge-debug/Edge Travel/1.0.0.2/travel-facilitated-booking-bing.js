/**
 * Copyright (C) Microsoft Corporation. All rights reserved.
 * Use of this source code is governed by a MIT license that can be
 * found in the LICENSE file.
 */

window['TravelAssistTabCommunicationRuntime'] = {
  initialize: (edgeMetaData) => {
    document.head.setAttribute('bing-script', 1);
    // Pending version and flight check
    travelServiceNativeHandler.logAdoption();
    const params = new URLSearchParams(location.search);
    const url = decodeURIComponent(params.get('bookingurl'));
    travelServiceNativeHandler.openHiddenTab(
        110, unescape(window.location.search.split('=')[1]), 'script_name');
  },
  processError: function(error) {
    const event = new CustomEvent('onscripterror', {detail: error});
    window.dispatchEvent(event);
  },
  raiseMessageFromHost: function(params) {
    if (params[0] === 'onError') {
      this.processError(params[1]);

    } else if (params[0] === 'onMessage') {
      if (params.indexOf('on-x-bing-error') !== -1) {
        this.processError(params[1]);
      } else {
        if (params[1] === 'Handshake') {
          const event = new CustomEvent('handshake');
          window.dispatchEvent(event);
        } else if (params[1].indexOf('Error') !== -1) {
          this.processError(params[1]);
        } else {
          let strRecieve = '';
          try {
            strRecieve = JSON.parse(params[1]);
          } catch (error) {
            strRecieve = params[1];
          }
          const event = new CustomEvent('recieve', {detail: strRecieve});
          window.dispatchEvent(event);
        }
      }
    }
  }
};

window.addEventListener('communicatetotab', (evt) => {
  const message = JSON.stringify(evt.detail);
  if (evt.detail.name !== 'showtab') {
    travelServiceNativeHandler.sendMessageToTab(message);
  }

  if (evt.detail.name === 'book') {
    travelServiceNativeHandler.logCompletion();
    travelServiceNativeHandler.showHiddenTab();
    window.close();
  }
  if (evt.detail.name === 'showtab') {
    travelServiceNativeHandler.showHiddenTab();
    window.close();
  }
});

window.addEventListener('logbingmetric', (evt) => {
  if (evt.detail === 'sourceRendered') {
    travelServiceNativeHandler.logFirstSuccess();
  } else if (evt.detail === 'engagement') {
    travelServiceNativeHandler.logEngagement();
  } else if (evt.detail === 'abort') {
    travelServiceNativeHandler.logAborted();
  }
});
