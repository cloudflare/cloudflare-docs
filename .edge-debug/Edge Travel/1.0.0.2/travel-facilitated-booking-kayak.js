/**
 * Copyright (C) Microsoft Corporation. All rights reserved.
 * Use of this source code is governed by a MIT license that can be
 * found in the LICENSE file.
 */

window['TravelAssistTabCommunicationRuntime'] = {
  initialize: () => {
    travelServiceNativeHandler.sendMessageToTab('Handshake');
  },
  raiseMessageFromHost: function(params) {
    const processError = (error) => {
      travelServiceNativeHandler.sendMessageToTab(
          'Error in raiseMessageFromHost' + error);
    };
    const onMessage = async (message) => {
      const parsedData = JSON.parse(message);
      const data = {};
      try {
        if (parsedData.config.popup) {
          const itemInterval = setInterval(() => {
            let listSummary =
                document.querySelector(parsedData.config.popup.selector);
            if (listSummary) {
              clearInterval(itemInterval);
              listSummary = listSummary.querySelector(
                  parsedData.config.popup.button.selector);
              if (listSummary) {
                travelServiceNativeHandler.sendMessageToTab(
                    listSummary[parsedData.config.popup.button.key]);
              }
            }
          }, parsedData.config.popup.interval);
        }
        await this.executeConfig(
            parsedData.name, data, document, parsedData.config);
        travelServiceNativeHandler.sendMessageToTab(JSON.stringify(data));
      } catch (err) {
        travelServiceNativeHandler.sendMessageToTab(
            'Error in ' + parsedData.name + err);
      }
    };
    if (params[0] === 'onError') {
      processError(params[1]);
    } else if (params[0] === 'onMessage') {
      if (params.indexOf('on-x-bing-error') !== -1) {
        processError(params[1]);
      } else {
        onMessage(params[1]);
      }
    }
  },
  executeConfig: async function(key, data, element, configItem) {
    const reservedKeys = [
      'type', 'wait', 'selector', 'key', 'condition', 'action', 'index', 'true',
      'false', 'maxTime', 'event', 'value', 'popup', 'not'
    ];

    const setValue = (selector, value, eventName) => {
      const element = document.querySelector(selector);
      if (element) {
        element.value = value;
        const event = new Event(eventName, { target: element, bubbles: true });
        element.dispatchEvent(event);
      }
    };

    const getElementByCondition = (element, selector, all = false) => {
      if (!element) {
        return;
      }
      const func = all ? 'querySelectorAll' : 'querySelector';
      if (typeof selector === 'string') {
        return element[func](selector);
      }
      if (element[func](selector.condition)) {
        return element[func](selector.true);
      } else {
        return element[func](selector.false);
      }
    };
    const awaitHelper = async (element, selector, interval, maxTime, not) => {
      return new Promise((resolve, reject) => {
        let resolved = false;
        if (maxTime) {
          setTimeout(() => {
            if (!resolved) {
              clearInterval(itemInterval);
              throw 'Timeout' + selector;
            }
          }, maxTime);
        }
        const itemInterval = setInterval(() => {
          const listSummary = getElementByCondition(element, selector);
          if (not ? !listSummary : listSummary) {
            clearInterval(itemInterval);
            resolved = true;
            resolve(listSummary);
          }
        }, interval);
      });
    };
    if (configItem.wait) {
      await awaitHelper(
          element, configItem.selector, configItem.wait, configItem.maxTime,
          configItem.not);
    }
    if (configItem.children) {
      element = getElementByCondition(element, configItem.selector, true);
      if (!element?.length) {
        return;
      }
      data[key] = [];
    } else {
      if (configItem.key || configItem.value) {
        if (configItem.index !== undefined) {
          element = getElementByCondition(element, configItem.selector, true);
          if (!element?.length) {
            return;
          }
          element = element[configItem.index];
        } else if (configItem.selector) {
          element = getElementByCondition(element, configItem.selector);
          if (!element) {
            return;
          }
        }
        if (configItem.value) {
          data[key] = {};
          setValue(configItem.selector, configItem.value, configItem.event);
        } else {
          const value = element[configItem.key];
          if (value) {
            data[key] = value;
          }
        }
      } else if (configItem.action) {
        let condition = true;
        if (configItem.condition) {
          condition = !!element.querySelector(configItem.condition);
        }
        if (condition) {
          element = getElementByCondition(element, configItem.selector);
          if (!element) {
            return;
          }
          data[key] = {};
          if (element) {
            element[configItem.action]();
          }
        }
      } else {
        data[key] = {};
      }
    }
    for (const keyChild in configItem) {
      if (reservedKeys.indexOf(keyChild) !== -1) {
        continue;
      }
      if (configItem.children && element?.length) {
        for (const item of element) {
          const obj = {};
          for (const childKey in configItem.children) {
            if (reservedKeys.indexOf(childKey) !== -1) {
              continue;
            }
            await this.executeConfig(
                childKey, obj, item, configItem.children[childKey]);
          }
          if (Object.keys(obj).length) {
            data[key].push(obj);
          }
        }
      } else {
        await this.executeConfig(
            keyChild, data[key], element, configItem[keyChild]);
      }
    }
  }

};
