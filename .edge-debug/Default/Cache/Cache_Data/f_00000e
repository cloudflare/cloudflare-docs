import { injectQuery as __vite__injectQuery } from "/@vite/client";const exports = {};
/**
 * @license React
 * react-refresh-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
"use strict";
if (true) {
  (function() {
    "use strict";
    var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
    var REACT_MEMO_TYPE = Symbol.for("react.memo");
    var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
    var allFamiliesByID = /* @__PURE__ */ new Map();
    var allFamiliesByType = new PossiblyWeakMap();
    var allSignaturesByType = new PossiblyWeakMap();
    var updatedFamiliesByType = new PossiblyWeakMap();
    var pendingUpdates = [];
    var helpersByRendererID = /* @__PURE__ */ new Map();
    var helpersByRoot = /* @__PURE__ */ new Map();
    var mountedRoots = /* @__PURE__ */ new Set();
    var failedRoots = /* @__PURE__ */ new Set();
    var rootElements = (
      // $FlowIssue
      typeof WeakMap === "function" ? /* @__PURE__ */ new WeakMap() : null
    );
    var isPerformingRefresh = false;
    function computeFullKey(signature) {
      if (signature.fullKey !== null) {
        return signature.fullKey;
      }
      var fullKey = signature.ownKey;
      var hooks2;
      try {
        hooks2 = signature.getCustomHooks();
      } catch (err) {
        signature.forceReset = true;
        signature.fullKey = fullKey;
        return fullKey;
      }
      for (var i = 0; i < hooks2.length; i++) {
        var hook = hooks2[i];
        if (typeof hook !== "function") {
          signature.forceReset = true;
          signature.fullKey = fullKey;
          return fullKey;
        }
        var nestedHookSignature = allSignaturesByType.get(hook);
        if (nestedHookSignature === void 0) {
          continue;
        }
        var nestedHookKey = computeFullKey(nestedHookSignature);
        if (nestedHookSignature.forceReset) {
          signature.forceReset = true;
        }
        fullKey += "\n---\n" + nestedHookKey;
      }
      signature.fullKey = fullKey;
      return fullKey;
    }
    function haveEqualSignatures(prevType, nextType) {
      var prevSignature = allSignaturesByType.get(prevType);
      var nextSignature = allSignaturesByType.get(nextType);
      if (prevSignature === void 0 && nextSignature === void 0) {
        return true;
      }
      if (prevSignature === void 0 || nextSignature === void 0) {
        return false;
      }
      if (computeFullKey(prevSignature) !== computeFullKey(nextSignature)) {
        return false;
      }
      if (nextSignature.forceReset) {
        return false;
      }
      return true;
    }
    function isReactClass(type) {
      return type.prototype && type.prototype.isReactComponent;
    }
    function canPreserveStateBetween(prevType, nextType) {
      if (isReactClass(prevType) || isReactClass(nextType)) {
        return false;
      }
      if (haveEqualSignatures(prevType, nextType)) {
        return true;
      }
      return false;
    }
    function resolveFamily(type) {
      return updatedFamiliesByType.get(type);
    }
    function cloneMap(map) {
      var clone = /* @__PURE__ */ new Map();
      map.forEach(function(value, key) {
        clone.set(key, value);
      });
      return clone;
    }
    function cloneSet(set) {
      var clone = /* @__PURE__ */ new Set();
      set.forEach(function(value) {
        clone.add(value);
      });
      return clone;
    }
    function getProperty(object, property) {
      try {
        return object[property];
      } catch (err) {
        return void 0;
      }
    }
    function performReactRefresh() {
      if (pendingUpdates.length === 0) {
        return null;
      }
      if (isPerformingRefresh) {
        return null;
      }
      isPerformingRefresh = true;
      try {
        var staleFamilies = /* @__PURE__ */ new Set();
        var updatedFamilies = /* @__PURE__ */ new Set();
        var updates = pendingUpdates;
        pendingUpdates = [];
        updates.forEach(function(_ref) {
          var family = _ref[0], nextType = _ref[1];
          var prevType = family.current;
          updatedFamiliesByType.set(prevType, family);
          updatedFamiliesByType.set(nextType, family);
          family.current = nextType;
          if (canPreserveStateBetween(prevType, nextType)) {
            updatedFamilies.add(family);
          } else {
            staleFamilies.add(family);
          }
        });
        var update = {
          updatedFamilies,
          // Families that will re-render preserving state
          staleFamilies
          // Families that will be remounted
        };
        helpersByRendererID.forEach(function(helpers) {
          helpers.setRefreshHandler(resolveFamily);
        });
        var didError = false;
        var firstError = null;
        var failedRootsSnapshot = cloneSet(failedRoots);
        var mountedRootsSnapshot = cloneSet(mountedRoots);
        var helpersByRootSnapshot = cloneMap(helpersByRoot);
        failedRootsSnapshot.forEach(function(root) {
          var helpers = helpersByRootSnapshot.get(root);
          if (helpers === void 0) {
            throw new Error("Could not find helpers for a root. This is a bug in React Refresh.");
          }
          if (!failedRoots.has(root)) {
          }
          if (rootElements === null) {
            return;
          }
          if (!rootElements.has(root)) {
            return;
          }
          var element = rootElements.get(root);
          try {
            helpers.scheduleRoot(root, element);
          } catch (err) {
            if (!didError) {
              didError = true;
              firstError = err;
            }
          }
        });
        mountedRootsSnapshot.forEach(function(root) {
          var helpers = helpersByRootSnapshot.get(root);
          if (helpers === void 0) {
            throw new Error("Could not find helpers for a root. This is a bug in React Refresh.");
          }
          if (!mountedRoots.has(root)) {
          }
          try {
            helpers.scheduleRefresh(root, update);
          } catch (err) {
            if (!didError) {
              didError = true;
              firstError = err;
            }
          }
        });
        if (didError) {
          throw firstError;
        }
        return update;
      } finally {
        isPerformingRefresh = false;
      }
    }
    function register(type, id) {
      {
        if (type === null) {
          return;
        }
        if (typeof type !== "function" && typeof type !== "object") {
          return;
        }
        if (allFamiliesByType.has(type)) {
          return;
        }
        var family = allFamiliesByID.get(id);
        if (family === void 0) {
          family = {
            current: type
          };
          allFamiliesByID.set(id, family);
        } else {
          pendingUpdates.push([family, type]);
        }
        allFamiliesByType.set(type, family);
        if (typeof type === "object" && type !== null) {
          switch (getProperty(type, "$$typeof")) {
            case REACT_FORWARD_REF_TYPE:
              register(type.render, id + "$render");
              break;
            case REACT_MEMO_TYPE:
              register(type.type, id + "$type");
              break;
          }
        }
      }
    }
    function setSignature(type, key) {
      var forceReset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      var getCustomHooks = arguments.length > 3 ? arguments[3] : void 0;
      {
        if (!allSignaturesByType.has(type)) {
          allSignaturesByType.set(type, {
            forceReset,
            ownKey: key,
            fullKey: null,
            getCustomHooks: getCustomHooks || function() {
              return [];
            }
          });
        }
        if (typeof type === "object" && type !== null) {
          switch (getProperty(type, "$$typeof")) {
            case REACT_FORWARD_REF_TYPE:
              setSignature(type.render, key, forceReset, getCustomHooks);
              break;
            case REACT_MEMO_TYPE:
              setSignature(type.type, key, forceReset, getCustomHooks);
              break;
          }
        }
      }
    }
    function collectCustomHooksForSignature(type) {
      {
        var signature = allSignaturesByType.get(type);
        if (signature !== void 0) {
          computeFullKey(signature);
        }
      }
    }
    function getFamilyByID(id) {
      {
        return allFamiliesByID.get(id);
      }
    }
    function getFamilyByType(type) {
      {
        return allFamiliesByType.get(type);
      }
    }
    function findAffectedHostInstances(families) {
      {
        var affectedInstances = /* @__PURE__ */ new Set();
        mountedRoots.forEach(function(root) {
          var helpers = helpersByRoot.get(root);
          if (helpers === void 0) {
            throw new Error("Could not find helpers for a root. This is a bug in React Refresh.");
          }
          var instancesForRoot = helpers.findHostInstancesForRefresh(root, families);
          instancesForRoot.forEach(function(inst) {
            affectedInstances.add(inst);
          });
        });
        return affectedInstances;
      }
    }
    function injectIntoGlobalHook(globalObject) {
      {
        var hook = globalObject.__REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (hook === void 0) {
          var nextID = 0;
          globalObject.__REACT_DEVTOOLS_GLOBAL_HOOK__ = hook = {
            renderers: /* @__PURE__ */ new Map(),
            supportsFiber: true,
            inject: function(injected) {
              return nextID++;
            },
            onScheduleFiberRoot: function(id, root, children) {
            },
            onCommitFiberRoot: function(id, root, maybePriorityLevel, didError) {
            },
            onCommitFiberUnmount: function() {
            }
          };
        }
        if (hook.isDisabled) {
          console["warn"]("Something has shimmed the React DevTools global hook (__REACT_DEVTOOLS_GLOBAL_HOOK__). Fast Refresh is not compatible with this shim and will be disabled.");
          return;
        }
        var oldInject = hook.inject;
        hook.inject = function(injected) {
          var id = oldInject.apply(this, arguments);
          if (typeof injected.scheduleRefresh === "function" && typeof injected.setRefreshHandler === "function") {
            helpersByRendererID.set(id, injected);
          }
          return id;
        };
        hook.renderers.forEach(function(injected, id) {
          if (typeof injected.scheduleRefresh === "function" && typeof injected.setRefreshHandler === "function") {
            helpersByRendererID.set(id, injected);
          }
        });
        var oldOnCommitFiberRoot = hook.onCommitFiberRoot;
        var oldOnScheduleFiberRoot = hook.onScheduleFiberRoot || function() {
        };
        hook.onScheduleFiberRoot = function(id, root, children) {
          if (!isPerformingRefresh) {
            failedRoots.delete(root);
            if (rootElements !== null) {
              rootElements.set(root, children);
            }
          }
          return oldOnScheduleFiberRoot.apply(this, arguments);
        };
        hook.onCommitFiberRoot = function(id, root, maybePriorityLevel, didError) {
          var helpers = helpersByRendererID.get(id);
          if (helpers !== void 0) {
            helpersByRoot.set(root, helpers);
            var current = root.current;
            var alternate = current.alternate;
            if (alternate !== null) {
              var wasMounted = alternate.memoizedState != null && alternate.memoizedState.element != null && mountedRoots.has(root);
              var isMounted = current.memoizedState != null && current.memoizedState.element != null;
              if (!wasMounted && isMounted) {
                mountedRoots.add(root);
                failedRoots.delete(root);
              } else if (wasMounted && isMounted) ;
              else if (wasMounted && !isMounted) {
                mountedRoots.delete(root);
                if (didError) {
                  failedRoots.add(root);
                } else {
                  helpersByRoot.delete(root);
                }
              } else if (!wasMounted && !isMounted) {
                if (didError) {
                  failedRoots.add(root);
                }
              }
            } else {
              mountedRoots.add(root);
            }
          }
          return oldOnCommitFiberRoot.apply(this, arguments);
        };
      }
    }
    function hasUnrecoverableErrors() {
      return false;
    }
    function _getMountedRootCount() {
      {
        return mountedRoots.size;
      }
    }
    function createSignatureFunctionForTransform() {
      {
        var savedType;
        var hasCustomHooks;
        var didCollectHooks = false;
        return function(type, key, forceReset, getCustomHooks) {
          if (typeof key === "string") {
            if (!savedType) {
              savedType = type;
              hasCustomHooks = typeof getCustomHooks === "function";
            }
            if (type != null && (typeof type === "function" || typeof type === "object")) {
              setSignature(type, key, forceReset, getCustomHooks);
            }
            return type;
          } else {
            if (!didCollectHooks && hasCustomHooks) {
              didCollectHooks = true;
              collectCustomHooksForSignature(savedType);
            }
          }
        };
      }
    }
    function isLikelyComponentType(type) {
      {
        switch (typeof type) {
          case "function": {
            if (type.prototype != null) {
              if (type.prototype.isReactComponent) {
                return true;
              }
              var ownNames = Object.getOwnPropertyNames(type.prototype);
              if (ownNames.length > 1 || ownNames[0] !== "constructor") {
                return false;
              }
              if (type.prototype.__proto__ !== Object.prototype) {
                return false;
              }
            }
            var name = type.name || type.displayName;
            return typeof name === "string" && /^[A-Z]/.test(name);
          }
          case "object": {
            if (type != null) {
              switch (getProperty(type, "$$typeof")) {
                case REACT_FORWARD_REF_TYPE:
                case REACT_MEMO_TYPE:
                  return true;
                default:
                  return false;
              }
            }
            return false;
          }
          default: {
            return false;
          }
        }
      }
    }
    exports._getMountedRootCount = _getMountedRootCount;
    exports.collectCustomHooksForSignature = collectCustomHooksForSignature;
    exports.createSignatureFunctionForTransform = createSignatureFunctionForTransform;
    exports.findAffectedHostInstances = findAffectedHostInstances;
    exports.getFamilyByID = getFamilyByID;
    exports.getFamilyByType = getFamilyByType;
    exports.hasUnrecoverableErrors = hasUnrecoverableErrors;
    exports.injectIntoGlobalHook = injectIntoGlobalHook;
    exports.isLikelyComponentType = isLikelyComponentType;
    exports.performReactRefresh = performReactRefresh;
    exports.register = register;
    exports.setSignature = setSignature;
  })();
}
function debounce(fn, delay) {
  let handle;
  return () => {
    clearTimeout(handle);
    handle = setTimeout(fn, delay);
  };
}
const hooks = [];
window.__registerBeforePerformReactRefresh = (cb) => {
  hooks.push(cb);
};
const enqueueUpdate = debounce(async () => {
  if (hooks.length) await Promise.all(hooks.map((cb) => cb()));
  exports.performReactRefresh();
}, 16);
function registerExportsForReactRefresh(filename, moduleExports) {
  for (const key in moduleExports) {
    if (key === "__esModule") continue;
    const exportValue = moduleExports[key];
    if (exports.isLikelyComponentType(exportValue)) {
      exports.register(exportValue, filename + " export " + key);
    }
  }
}
function validateRefreshBoundaryAndEnqueueUpdate(id, prevExports, nextExports) {
  const ignoredExports = window.__getReactRefreshIgnoredExports?.({ id }) ?? [];
  if (predicateOnExport(
    ignoredExports,
    prevExports,
    (key) => key in nextExports
  ) !== true) {
    return "Could not Fast Refresh (export removed)";
  }
  if (predicateOnExport(
    ignoredExports,
    nextExports,
    (key) => key in prevExports
  ) !== true) {
    return "Could not Fast Refresh (new export)";
  }
  let hasExports = false;
  const allExportsAreComponentsOrUnchanged = predicateOnExport(
    ignoredExports,
    nextExports,
    (key, value) => {
      hasExports = true;
      if (exports.isLikelyComponentType(value)) return true;
      return prevExports[key] === nextExports[key];
    }
  );
  if (hasExports && allExportsAreComponentsOrUnchanged === true) {
    enqueueUpdate();
  } else {
    return `Could not Fast Refresh ("${allExportsAreComponentsOrUnchanged}" export is incompatible). Learn more at https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#consistent-components-exports`;
  }
}
function predicateOnExport(ignoredExports, moduleExports, predicate) {
  for (const key in moduleExports) {
    if (key === "__esModule") continue;
    if (ignoredExports.includes(key)) continue;
    const desc = Object.getOwnPropertyDescriptor(moduleExports, key);
    if (desc && desc.get) return key;
    if (!predicate(key, moduleExports[key])) return key;
  }
  return true;
}
function __hmr_import(module) {
  return import(
    /* @vite-ignore */
    __vite__injectQuery(module, 'import')
  );
}
exports.__hmr_import = __hmr_import;
exports.registerExportsForReactRefresh = registerExportsForReactRefresh;
exports.validateRefreshBoundaryAndEnqueueUpdate = validateRefreshBoundaryAndEnqueueUpdate;
export default exports;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkByZWFjdC1yZWZyZXNoIl0sInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3QgZXhwb3J0cyA9IHt9XG4vKipcbiAqIEBsaWNlbnNlIFJlYWN0XG4gKiByZWFjdC1yZWZyZXNoLXJ1bnRpbWUuZGV2ZWxvcG1lbnQuanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIEZhY2Vib29rLCBJbmMuIGFuZCBpdHMgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBBVFRFTlRJT05cbnZhciBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFID0gU3ltYm9sLmZvcigncmVhY3QuZm9yd2FyZF9yZWYnKTtcbnZhciBSRUFDVF9NRU1PX1RZUEUgPSBTeW1ib2wuZm9yKCdyZWFjdC5tZW1vJyk7XG5cbnZhciBQb3NzaWJseVdlYWtNYXAgPSB0eXBlb2YgV2Vha01hcCA9PT0gJ2Z1bmN0aW9uJyA/IFdlYWtNYXAgOiBNYXA7IC8vIFdlIG5ldmVyIHJlbW92ZSB0aGVzZSBhc3NvY2lhdGlvbnMuXG4vLyBJdCdzIE9LIHRvIHJlZmVyZW5jZSBmYW1pbGllcywgYnV0IHVzZSBXZWFrTWFwL1NldCBmb3IgdHlwZXMuXG5cbnZhciBhbGxGYW1pbGllc0J5SUQgPSBuZXcgTWFwKCk7XG52YXIgYWxsRmFtaWxpZXNCeVR5cGUgPSBuZXcgUG9zc2libHlXZWFrTWFwKCk7XG52YXIgYWxsU2lnbmF0dXJlc0J5VHlwZSA9IG5ldyBQb3NzaWJseVdlYWtNYXAoKTsgLy8gVGhpcyBXZWFrTWFwIGlzIHJlYWQgYnkgUmVhY3QsIHNvIHdlIG9ubHkgcHV0IGZhbWlsaWVzXG4vLyB0aGF0IGhhdmUgYWN0dWFsbHkgYmVlbiBlZGl0ZWQgaGVyZS4gVGhpcyBrZWVwcyBjaGVja3MgZmFzdC5cbi8vICRGbG93SXNzdWVcblxudmFyIHVwZGF0ZWRGYW1pbGllc0J5VHlwZSA9IG5ldyBQb3NzaWJseVdlYWtNYXAoKTsgLy8gVGhpcyBpcyBjbGVhcmVkIG9uIGV2ZXJ5IHBlcmZvcm1SZWFjdFJlZnJlc2goKSBjYWxsLlxuLy8gSXQgaXMgYW4gYXJyYXkgb2YgW0ZhbWlseSwgTmV4dFR5cGVdIHR1cGxlcy5cblxudmFyIHBlbmRpbmdVcGRhdGVzID0gW107IC8vIFRoaXMgaXMgaW5qZWN0ZWQgYnkgdGhlIHJlbmRlcmVyIHZpYSBEZXZUb29scyBnbG9iYWwgaG9vay5cblxudmFyIGhlbHBlcnNCeVJlbmRlcmVySUQgPSBuZXcgTWFwKCk7XG52YXIgaGVscGVyc0J5Um9vdCA9IG5ldyBNYXAoKTsgLy8gV2Uga2VlcCB0cmFjayBvZiBtb3VudGVkIHJvb3RzIHNvIHdlIGNhbiBzY2hlZHVsZSB1cGRhdGVzLlxuXG52YXIgbW91bnRlZFJvb3RzID0gbmV3IFNldCgpOyAvLyBJZiBhIHJvb3QgY2FwdHVyZXMgYW4gZXJyb3IsIHdlIHJlbWVtYmVyIGl0IHNvIHdlIGNhbiByZXRyeSBvbiBlZGl0LlxuXG52YXIgZmFpbGVkUm9vdHMgPSBuZXcgU2V0KCk7IC8vIEluIGVudmlyb25tZW50cyB0aGF0IHN1cHBvcnQgV2Vha01hcCwgd2UgYWxzbyByZW1lbWJlciB0aGUgbGFzdCBlbGVtZW50IGZvciBldmVyeSByb290LlxuLy8gSXQgbmVlZHMgdG8gYmUgd2VhayBiZWNhdXNlIHdlIGRvIHRoaXMgZXZlbiBmb3Igcm9vdHMgdGhhdCBmYWlsZWQgdG8gbW91bnQuXG4vLyBJZiB0aGVyZSBpcyBubyBXZWFrTWFwLCB3ZSB3b24ndCBhdHRlbXB0IHRvIGRvIHJldHJ5aW5nLlxuLy8gJEZsb3dJc3N1ZVxuXG52YXIgcm9vdEVsZW1lbnRzID0gLy8gJEZsb3dJc3N1ZVxudHlwZW9mIFdlYWtNYXAgPT09ICdmdW5jdGlvbicgPyBuZXcgV2Vha01hcCgpIDogbnVsbDtcbnZhciBpc1BlcmZvcm1pbmdSZWZyZXNoID0gZmFsc2U7XG5cbmZ1bmN0aW9uIGNvbXB1dGVGdWxsS2V5KHNpZ25hdHVyZSkge1xuICBpZiAoc2lnbmF0dXJlLmZ1bGxLZXkgIT09IG51bGwpIHtcbiAgICByZXR1cm4gc2lnbmF0dXJlLmZ1bGxLZXk7XG4gIH1cblxuICB2YXIgZnVsbEtleSA9IHNpZ25hdHVyZS5vd25LZXk7XG4gIHZhciBob29rcztcblxuICB0cnkge1xuICAgIGhvb2tzID0gc2lnbmF0dXJlLmdldEN1c3RvbUhvb2tzKCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIC8vIFRoaXMgY2FuIGhhcHBlbiBpbiBhbiBlZGdlIGNhc2UsIGUuZy4gaWYgZXhwcmVzc2lvbiBsaWtlIEZvby51c2VTb21ldGhpbmdcbiAgICAvLyBkZXBlbmRzIG9uIEZvbyB3aGljaCBpcyBsYXppbHkgaW5pdGlhbGl6ZWQgZHVyaW5nIHJlbmRlcmluZy5cbiAgICAvLyBJbiB0aGF0IGNhc2UganVzdCBhc3N1bWUgd2UnbGwgaGF2ZSB0byByZW1vdW50LlxuICAgIHNpZ25hdHVyZS5mb3JjZVJlc2V0ID0gdHJ1ZTtcbiAgICBzaWduYXR1cmUuZnVsbEtleSA9IGZ1bGxLZXk7XG4gICAgcmV0dXJuIGZ1bGxLZXk7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGhvb2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGhvb2sgPSBob29rc1tpXTtcblxuICAgIGlmICh0eXBlb2YgaG9vayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gU29tZXRoaW5nJ3Mgd3JvbmcuIEFzc3VtZSB3ZSBuZWVkIHRvIHJlbW91bnQuXG4gICAgICBzaWduYXR1cmUuZm9yY2VSZXNldCA9IHRydWU7XG4gICAgICBzaWduYXR1cmUuZnVsbEtleSA9IGZ1bGxLZXk7XG4gICAgICByZXR1cm4gZnVsbEtleTtcbiAgICB9XG5cbiAgICB2YXIgbmVzdGVkSG9va1NpZ25hdHVyZSA9IGFsbFNpZ25hdHVyZXNCeVR5cGUuZ2V0KGhvb2spO1xuXG4gICAgaWYgKG5lc3RlZEhvb2tTaWduYXR1cmUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gTm8gc2lnbmF0dXJlIG1lYW5zIEhvb2sgd2Fzbid0IGluIHRoZSBzb3VyY2UgY29kZSwgZS5nLiBpbiBhIGxpYnJhcnkuXG4gICAgICAvLyBXZSdsbCBza2lwIGl0IGJlY2F1c2Ugd2UgY2FuIGFzc3VtZSBpdCB3b24ndCBjaGFuZ2UgZHVyaW5nIHRoaXMgc2Vzc2lvbi5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBuZXN0ZWRIb29rS2V5ID0gY29tcHV0ZUZ1bGxLZXkobmVzdGVkSG9va1NpZ25hdHVyZSk7XG5cbiAgICBpZiAobmVzdGVkSG9va1NpZ25hdHVyZS5mb3JjZVJlc2V0KSB7XG4gICAgICBzaWduYXR1cmUuZm9yY2VSZXNldCA9IHRydWU7XG4gICAgfVxuXG4gICAgZnVsbEtleSArPSAnXFxuLS0tXFxuJyArIG5lc3RlZEhvb2tLZXk7XG4gIH1cblxuICBzaWduYXR1cmUuZnVsbEtleSA9IGZ1bGxLZXk7XG4gIHJldHVybiBmdWxsS2V5O1xufVxuXG5mdW5jdGlvbiBoYXZlRXF1YWxTaWduYXR1cmVzKHByZXZUeXBlLCBuZXh0VHlwZSkge1xuICB2YXIgcHJldlNpZ25hdHVyZSA9IGFsbFNpZ25hdHVyZXNCeVR5cGUuZ2V0KHByZXZUeXBlKTtcbiAgdmFyIG5leHRTaWduYXR1cmUgPSBhbGxTaWduYXR1cmVzQnlUeXBlLmdldChuZXh0VHlwZSk7XG5cbiAgaWYgKHByZXZTaWduYXR1cmUgPT09IHVuZGVmaW5lZCAmJiBuZXh0U2lnbmF0dXJlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmIChwcmV2U2lnbmF0dXJlID09PSB1bmRlZmluZWQgfHwgbmV4dFNpZ25hdHVyZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKGNvbXB1dGVGdWxsS2V5KHByZXZTaWduYXR1cmUpICE9PSBjb21wdXRlRnVsbEtleShuZXh0U2lnbmF0dXJlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChuZXh0U2lnbmF0dXJlLmZvcmNlUmVzZXQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gaXNSZWFjdENsYXNzKHR5cGUpIHtcbiAgcmV0dXJuIHR5cGUucHJvdG90eXBlICYmIHR5cGUucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQ7XG59XG5cbmZ1bmN0aW9uIGNhblByZXNlcnZlU3RhdGVCZXR3ZWVuKHByZXZUeXBlLCBuZXh0VHlwZSkge1xuICBpZiAoaXNSZWFjdENsYXNzKHByZXZUeXBlKSB8fCBpc1JlYWN0Q2xhc3MobmV4dFR5cGUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKGhhdmVFcXVhbFNpZ25hdHVyZXMocHJldlR5cGUsIG5leHRUeXBlKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiByZXNvbHZlRmFtaWx5KHR5cGUpIHtcbiAgLy8gT25seSBjaGVjayB1cGRhdGVkIHR5cGVzIHRvIGtlZXAgbG9va3VwcyBmYXN0LlxuICByZXR1cm4gdXBkYXRlZEZhbWlsaWVzQnlUeXBlLmdldCh0eXBlKTtcbn0gLy8gSWYgd2UgZGlkbid0IGNhcmUgYWJvdXQgSUUxMSwgd2UgY291bGQgdXNlIG5ldyBNYXAvU2V0KGl0ZXJhYmxlKS5cblxuXG5mdW5jdGlvbiBjbG9uZU1hcChtYXApIHtcbiAgdmFyIGNsb25lID0gbmV3IE1hcCgpO1xuICBtYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgIGNsb25lLnNldChrZXksIHZhbHVlKTtcbiAgfSk7XG4gIHJldHVybiBjbG9uZTtcbn1cblxuZnVuY3Rpb24gY2xvbmVTZXQoc2V0KSB7XG4gIHZhciBjbG9uZSA9IG5ldyBTZXQoKTtcbiAgc2V0LmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgY2xvbmUuYWRkKHZhbHVlKTtcbiAgfSk7XG4gIHJldHVybiBjbG9uZTtcbn0gLy8gVGhpcyBpcyBhIHNhZmV0eSBtZWNoYW5pc20gdG8gcHJvdGVjdCBhZ2FpbnN0IHJvZ3VlIGdldHRlcnMgYW5kIFByb3hpZXMuXG5cblxuZnVuY3Rpb24gZ2V0UHJvcGVydHkob2JqZWN0LCBwcm9wZXJ0eSkge1xuICB0cnkge1xuICAgIHJldHVybiBvYmplY3RbcHJvcGVydHldO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICAvLyBJbnRlbnRpb25hbGx5IGlnbm9yZS5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBlcmZvcm1SZWFjdFJlZnJlc2goKSB7XG5cbiAgaWYgKHBlbmRpbmdVcGRhdGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKGlzUGVyZm9ybWluZ1JlZnJlc2gpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlzUGVyZm9ybWluZ1JlZnJlc2ggPSB0cnVlO1xuXG4gIHRyeSB7XG4gICAgdmFyIHN0YWxlRmFtaWxpZXMgPSBuZXcgU2V0KCk7XG4gICAgdmFyIHVwZGF0ZWRGYW1pbGllcyA9IG5ldyBTZXQoKTtcbiAgICB2YXIgdXBkYXRlcyA9IHBlbmRpbmdVcGRhdGVzO1xuICAgIHBlbmRpbmdVcGRhdGVzID0gW107XG4gICAgdXBkYXRlcy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgICB2YXIgZmFtaWx5ID0gX3JlZlswXSxcbiAgICAgICAgICBuZXh0VHlwZSA9IF9yZWZbMV07XG4gICAgICAvLyBOb3cgdGhhdCB3ZSBnb3QgYSByZWFsIGVkaXQsIHdlIGNhbiBjcmVhdGUgYXNzb2NpYXRpb25zXG4gICAgICAvLyB0aGF0IHdpbGwgYmUgcmVhZCBieSB0aGUgUmVhY3QgcmVjb25jaWxlci5cbiAgICAgIHZhciBwcmV2VHlwZSA9IGZhbWlseS5jdXJyZW50O1xuICAgICAgdXBkYXRlZEZhbWlsaWVzQnlUeXBlLnNldChwcmV2VHlwZSwgZmFtaWx5KTtcbiAgICAgIHVwZGF0ZWRGYW1pbGllc0J5VHlwZS5zZXQobmV4dFR5cGUsIGZhbWlseSk7XG4gICAgICBmYW1pbHkuY3VycmVudCA9IG5leHRUeXBlOyAvLyBEZXRlcm1pbmUgd2hldGhlciB0aGlzIHNob3VsZCBiZSBhIHJlLXJlbmRlciBvciBhIHJlLW1vdW50LlxuXG4gICAgICBpZiAoY2FuUHJlc2VydmVTdGF0ZUJldHdlZW4ocHJldlR5cGUsIG5leHRUeXBlKSkge1xuICAgICAgICB1cGRhdGVkRmFtaWxpZXMuYWRkKGZhbWlseSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGFsZUZhbWlsaWVzLmFkZChmYW1pbHkpO1xuICAgICAgfVxuICAgIH0pOyAvLyBUT0RPOiByZW5hbWUgdGhlc2UgZmllbGRzIHRvIHNvbWV0aGluZyBtb3JlIG1lYW5pbmdmdWwuXG5cbiAgICB2YXIgdXBkYXRlID0ge1xuICAgICAgdXBkYXRlZEZhbWlsaWVzOiB1cGRhdGVkRmFtaWxpZXMsXG4gICAgICAvLyBGYW1pbGllcyB0aGF0IHdpbGwgcmUtcmVuZGVyIHByZXNlcnZpbmcgc3RhdGVcbiAgICAgIHN0YWxlRmFtaWxpZXM6IHN0YWxlRmFtaWxpZXMgLy8gRmFtaWxpZXMgdGhhdCB3aWxsIGJlIHJlbW91bnRlZFxuXG4gICAgfTtcbiAgICBoZWxwZXJzQnlSZW5kZXJlcklELmZvckVhY2goZnVuY3Rpb24gKGhlbHBlcnMpIHtcbiAgICAgIC8vIEV2ZW4gaWYgdGhlcmUgYXJlIG5vIHJvb3RzLCBzZXQgdGhlIGhhbmRsZXIgb24gZmlyc3QgdXBkYXRlLlxuICAgICAgLy8gVGhpcyBlbnN1cmVzIHRoYXQgaWYgKm5ldyogcm9vdHMgYXJlIG1vdW50ZWQsIHRoZXknbGwgdXNlIHRoZSByZXNvbHZlIGhhbmRsZXIuXG4gICAgICBoZWxwZXJzLnNldFJlZnJlc2hIYW5kbGVyKHJlc29sdmVGYW1pbHkpO1xuICAgIH0pO1xuICAgIHZhciBkaWRFcnJvciA9IGZhbHNlO1xuICAgIHZhciBmaXJzdEVycm9yID0gbnVsbDsgLy8gV2Ugc25hcHNob3QgbWFwcyBhbmQgc2V0cyB0aGF0IGFyZSBtdXRhdGVkIGR1cmluZyBjb21taXRzLlxuICAgIC8vIElmIHdlIGRvbid0IGRvIHRoaXMsIHRoZXJlIGlzIGEgcmlzayB0aGV5IHdpbGwgYmUgbXV0YXRlZCB3aGlsZVxuICAgIC8vIHdlIGl0ZXJhdGUgb3ZlciB0aGVtLiBGb3IgZXhhbXBsZSwgdHJ5aW5nIHRvIHJlY292ZXIgYSBmYWlsZWQgcm9vdFxuICAgIC8vIG1heSBjYXVzZSBhbm90aGVyIHJvb3QgdG8gYmUgYWRkZWQgdG8gdGhlIGZhaWxlZCBsaXN0IC0tIGFuIGluZmluaXRlIGxvb3AuXG5cbiAgICB2YXIgZmFpbGVkUm9vdHNTbmFwc2hvdCA9IGNsb25lU2V0KGZhaWxlZFJvb3RzKTtcbiAgICB2YXIgbW91bnRlZFJvb3RzU25hcHNob3QgPSBjbG9uZVNldChtb3VudGVkUm9vdHMpO1xuICAgIHZhciBoZWxwZXJzQnlSb290U25hcHNob3QgPSBjbG9uZU1hcChoZWxwZXJzQnlSb290KTtcbiAgICBmYWlsZWRSb290c1NuYXBzaG90LmZvckVhY2goZnVuY3Rpb24gKHJvb3QpIHtcbiAgICAgIHZhciBoZWxwZXJzID0gaGVscGVyc0J5Um9vdFNuYXBzaG90LmdldChyb290KTtcblxuICAgICAgaWYgKGhlbHBlcnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIGhlbHBlcnMgZm9yIGEgcm9vdC4gVGhpcyBpcyBhIGJ1ZyBpbiBSZWFjdCBSZWZyZXNoLicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWZhaWxlZFJvb3RzLmhhcyhyb290KSkgey8vIE5vIGxvbmdlciBmYWlsZWQuXG4gICAgICB9XG5cbiAgICAgIGlmIChyb290RWxlbWVudHMgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXJvb3RFbGVtZW50cy5oYXMocm9vdCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgZWxlbWVudCA9IHJvb3RFbGVtZW50cy5nZXQocm9vdCk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGhlbHBlcnMuc2NoZWR1bGVSb290KHJvb3QsIGVsZW1lbnQpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGlmICghZGlkRXJyb3IpIHtcbiAgICAgICAgICBkaWRFcnJvciA9IHRydWU7XG4gICAgICAgICAgZmlyc3RFcnJvciA9IGVycjtcbiAgICAgICAgfSAvLyBLZWVwIHRyeWluZyBvdGhlciByb290cy5cblxuICAgICAgfVxuICAgIH0pO1xuICAgIG1vdW50ZWRSb290c1NuYXBzaG90LmZvckVhY2goZnVuY3Rpb24gKHJvb3QpIHtcbiAgICAgIHZhciBoZWxwZXJzID0gaGVscGVyc0J5Um9vdFNuYXBzaG90LmdldChyb290KTtcblxuICAgICAgaWYgKGhlbHBlcnMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIGhlbHBlcnMgZm9yIGEgcm9vdC4gVGhpcyBpcyBhIGJ1ZyBpbiBSZWFjdCBSZWZyZXNoLicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIW1vdW50ZWRSb290cy5oYXMocm9vdCkpIHsvLyBObyBsb25nZXIgbW91bnRlZC5cbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgaGVscGVycy5zY2hlZHVsZVJlZnJlc2gocm9vdCwgdXBkYXRlKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBpZiAoIWRpZEVycm9yKSB7XG4gICAgICAgICAgZGlkRXJyb3IgPSB0cnVlO1xuICAgICAgICAgIGZpcnN0RXJyb3IgPSBlcnI7XG4gICAgICAgIH0gLy8gS2VlcCB0cnlpbmcgb3RoZXIgcm9vdHMuXG5cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChkaWRFcnJvcikge1xuICAgICAgdGhyb3cgZmlyc3RFcnJvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gdXBkYXRlO1xuICB9IGZpbmFsbHkge1xuICAgIGlzUGVyZm9ybWluZ1JlZnJlc2ggPSBmYWxzZTtcbiAgfVxufVxuZnVuY3Rpb24gcmVnaXN0ZXIodHlwZSwgaWQpIHtcbiAge1xuICAgIGlmICh0eXBlID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0eXBlICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB0eXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuO1xuICAgIH0gLy8gVGhpcyBjYW4gaGFwcGVuIGluIGFuIGVkZ2UgY2FzZSwgZS5nLiBpZiB3ZSByZWdpc3RlclxuICAgIC8vIHJldHVybiB2YWx1ZSBvZiBhIEhPQyBidXQgaXQgcmV0dXJucyBhIGNhY2hlZCBjb21wb25lbnQuXG4gICAgLy8gSWdub3JlIGFueXRoaW5nIGJ1dCB0aGUgZmlyc3QgcmVnaXN0cmF0aW9uIGZvciBlYWNoIHR5cGUuXG5cblxuICAgIGlmIChhbGxGYW1pbGllc0J5VHlwZS5oYXModHlwZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IC8vIENyZWF0ZSBmYW1pbHkgb3IgcmVtZW1iZXIgdG8gdXBkYXRlIGl0LlxuICAgIC8vIE5vbmUgb2YgdGhpcyBib29ra2VlcGluZyBhZmZlY3RzIHJlY29uY2lsaWF0aW9uXG4gICAgLy8gdW50aWwgdGhlIGZpcnN0IHBlcmZvcm1SZWFjdFJlZnJlc2goKSBjYWxsIGFib3ZlLlxuXG5cbiAgICB2YXIgZmFtaWx5ID0gYWxsRmFtaWxpZXNCeUlELmdldChpZCk7XG5cbiAgICBpZiAoZmFtaWx5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGZhbWlseSA9IHtcbiAgICAgICAgY3VycmVudDogdHlwZVxuICAgICAgfTtcbiAgICAgIGFsbEZhbWlsaWVzQnlJRC5zZXQoaWQsIGZhbWlseSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBlbmRpbmdVcGRhdGVzLnB1c2goW2ZhbWlseSwgdHlwZV0pO1xuICAgIH1cblxuICAgIGFsbEZhbWlsaWVzQnlUeXBlLnNldCh0eXBlLCBmYW1pbHkpOyAvLyBWaXNpdCBpbm5lciB0eXBlcyBiZWNhdXNlIHdlIG1pZ2h0IG5vdCBoYXZlIHJlZ2lzdGVyZWQgdGhlbS5cblxuICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcgJiYgdHlwZSAhPT0gbnVsbCkge1xuICAgICAgc3dpdGNoIChnZXRQcm9wZXJ0eSh0eXBlLCAnJCR0eXBlb2YnKSkge1xuICAgICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgICAgcmVnaXN0ZXIodHlwZS5yZW5kZXIsIGlkICsgJyRyZW5kZXInKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFJFQUNUX01FTU9fVFlQRTpcbiAgICAgICAgICByZWdpc3Rlcih0eXBlLnR5cGUsIGlkICsgJyR0eXBlJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiBzZXRTaWduYXR1cmUodHlwZSwga2V5KSB7XG4gIHZhciBmb3JjZVJlc2V0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBmYWxzZTtcbiAgdmFyIGdldEN1c3RvbUhvb2tzID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgPyBhcmd1bWVudHNbM10gOiB1bmRlZmluZWQ7XG5cbiAge1xuICAgIGlmICghYWxsU2lnbmF0dXJlc0J5VHlwZS5oYXModHlwZSkpIHtcbiAgICAgIGFsbFNpZ25hdHVyZXNCeVR5cGUuc2V0KHR5cGUsIHtcbiAgICAgICAgZm9yY2VSZXNldDogZm9yY2VSZXNldCxcbiAgICAgICAgb3duS2V5OiBrZXksXG4gICAgICAgIGZ1bGxLZXk6IG51bGwsXG4gICAgICAgIGdldEN1c3RvbUhvb2tzOiBnZXRDdXN0b21Ib29rcyB8fCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IC8vIFZpc2l0IGlubmVyIHR5cGVzIGJlY2F1c2Ugd2UgbWlnaHQgbm90IGhhdmUgc2lnbmVkIHRoZW0uXG5cblxuICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcgJiYgdHlwZSAhPT0gbnVsbCkge1xuICAgICAgc3dpdGNoIChnZXRQcm9wZXJ0eSh0eXBlLCAnJCR0eXBlb2YnKSkge1xuICAgICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgICAgc2V0U2lnbmF0dXJlKHR5cGUucmVuZGVyLCBrZXksIGZvcmNlUmVzZXQsIGdldEN1c3RvbUhvb2tzKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFJFQUNUX01FTU9fVFlQRTpcbiAgICAgICAgICBzZXRTaWduYXR1cmUodHlwZS50eXBlLCBrZXksIGZvcmNlUmVzZXQsIGdldEN1c3RvbUhvb2tzKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0gLy8gVGhpcyBpcyBsYXppbHkgY2FsbGVkIGR1cmluZyBmaXJzdCByZW5kZXIgZm9yIGEgdHlwZS5cbi8vIEl0IGNhcHR1cmVzIEhvb2sgbGlzdCBhdCB0aGF0IHRpbWUgc28gaW5saW5lIHJlcXVpcmVzIGRvbid0IGJyZWFrIGNvbXBhcmlzb25zLlxuXG5mdW5jdGlvbiBjb2xsZWN0Q3VzdG9tSG9va3NGb3JTaWduYXR1cmUodHlwZSkge1xuICB7XG4gICAgdmFyIHNpZ25hdHVyZSA9IGFsbFNpZ25hdHVyZXNCeVR5cGUuZ2V0KHR5cGUpO1xuXG4gICAgaWYgKHNpZ25hdHVyZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb21wdXRlRnVsbEtleShzaWduYXR1cmUpO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gZ2V0RmFtaWx5QnlJRChpZCkge1xuICB7XG4gICAgcmV0dXJuIGFsbEZhbWlsaWVzQnlJRC5nZXQoaWQpO1xuICB9XG59XG5mdW5jdGlvbiBnZXRGYW1pbHlCeVR5cGUodHlwZSkge1xuICB7XG4gICAgcmV0dXJuIGFsbEZhbWlsaWVzQnlUeXBlLmdldCh0eXBlKTtcbiAgfVxufVxuZnVuY3Rpb24gZmluZEFmZmVjdGVkSG9zdEluc3RhbmNlcyhmYW1pbGllcykge1xuICB7XG4gICAgdmFyIGFmZmVjdGVkSW5zdGFuY2VzID0gbmV3IFNldCgpO1xuICAgIG1vdW50ZWRSb290cy5mb3JFYWNoKGZ1bmN0aW9uIChyb290KSB7XG4gICAgICB2YXIgaGVscGVycyA9IGhlbHBlcnNCeVJvb3QuZ2V0KHJvb3QpO1xuXG4gICAgICBpZiAoaGVscGVycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgaGVscGVycyBmb3IgYSByb290LiBUaGlzIGlzIGEgYnVnIGluIFJlYWN0IFJlZnJlc2guJyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBpbnN0YW5jZXNGb3JSb290ID0gaGVscGVycy5maW5kSG9zdEluc3RhbmNlc0ZvclJlZnJlc2gocm9vdCwgZmFtaWxpZXMpO1xuICAgICAgaW5zdGFuY2VzRm9yUm9vdC5mb3JFYWNoKGZ1bmN0aW9uIChpbnN0KSB7XG4gICAgICAgIGFmZmVjdGVkSW5zdGFuY2VzLmFkZChpbnN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIHJldHVybiBhZmZlY3RlZEluc3RhbmNlcztcbiAgfVxufVxuZnVuY3Rpb24gaW5qZWN0SW50b0dsb2JhbEhvb2soZ2xvYmFsT2JqZWN0KSB7XG4gIHtcbiAgICAvLyBGb3IgUmVhY3QgTmF0aXZlLCB0aGUgZ2xvYmFsIGhvb2sgd2lsbCBiZSBzZXQgdXAgYnkgcmVxdWlyZSgncmVhY3QtZGV2dG9vbHMtY29yZScpLlxuICAgIC8vIFRoYXQgY29kZSB3aWxsIHJ1biBiZWZvcmUgdXMuIFNvIHdlIG5lZWQgdG8gbW9ua2V5cGF0Y2ggZnVuY3Rpb25zIG9uIGV4aXN0aW5nIGhvb2suXG4gICAgLy8gRm9yIFJlYWN0IFdlYiwgdGhlIGdsb2JhbCBob29rIHdpbGwgYmUgc2V0IHVwIGJ5IHRoZSBleHRlbnNpb24uXG4gICAgLy8gVGhpcyB3aWxsIGFsc28gcnVuIGJlZm9yZSB1cy5cbiAgICB2YXIgaG9vayA9IGdsb2JhbE9iamVjdC5fX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX187XG5cbiAgICBpZiAoaG9vayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBIb3dldmVyLCBpZiB0aGVyZSBpcyBubyBEZXZUb29scyBleHRlbnNpb24sIHdlJ2xsIG5lZWQgdG8gc2V0IHVwIHRoZSBnbG9iYWwgaG9vayBvdXJzZWx2ZXMuXG4gICAgICAvLyBOb3RlIHRoYXQgaW4gdGhpcyBjYXNlIGl0J3MgaW1wb3J0YW50IHRoYXQgcmVuZGVyZXIgY29kZSBydW5zICphZnRlciogdGhpcyBtZXRob2QgY2FsbC5cbiAgICAgIC8vIE90aGVyd2lzZSwgdGhlIHJlbmRlcmVyIHdpbGwgdGhpbmsgdGhhdCB0aGVyZSBpcyBubyBnbG9iYWwgaG9vaywgYW5kIHdvbid0IGRvIHRoZSBpbmplY3Rpb24uXG4gICAgICB2YXIgbmV4dElEID0gMDtcbiAgICAgIGdsb2JhbE9iamVjdC5fX1JFQUNUX0RFVlRPT0xTX0dMT0JBTF9IT09LX18gPSBob29rID0ge1xuICAgICAgICByZW5kZXJlcnM6IG5ldyBNYXAoKSxcbiAgICAgICAgc3VwcG9ydHNGaWJlcjogdHJ1ZSxcbiAgICAgICAgaW5qZWN0OiBmdW5jdGlvbiAoaW5qZWN0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gbmV4dElEKys7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU2NoZWR1bGVGaWJlclJvb3Q6IGZ1bmN0aW9uIChpZCwgcm9vdCwgY2hpbGRyZW4pIHt9LFxuICAgICAgICBvbkNvbW1pdEZpYmVyUm9vdDogZnVuY3Rpb24gKGlkLCByb290LCBtYXliZVByaW9yaXR5TGV2ZWwsIGRpZEVycm9yKSB7fSxcbiAgICAgICAgb25Db21taXRGaWJlclVubW91bnQ6IGZ1bmN0aW9uICgpIHt9XG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChob29rLmlzRGlzYWJsZWQpIHtcbiAgICAgIC8vIFRoaXMgaXNuJ3QgYSByZWFsIHByb3BlcnR5IG9uIHRoZSBob29rLCBidXQgaXQgY2FuIGJlIHNldCB0byBvcHQgb3V0XG4gICAgICAvLyBvZiBEZXZUb29scyBpbnRlZ3JhdGlvbiBhbmQgYXNzb2NpYXRlZCB3YXJuaW5ncyBhbmQgbG9ncy5cbiAgICAgIC8vIFVzaW5nIGNvbnNvbGVbJ3dhcm4nXSB0byBldmFkZSBCYWJlbCBhbmQgRVNMaW50XG4gICAgICBjb25zb2xlWyd3YXJuJ10oJ1NvbWV0aGluZyBoYXMgc2hpbW1lZCB0aGUgUmVhY3QgRGV2VG9vbHMgZ2xvYmFsIGhvb2sgKF9fUkVBQ1RfREVWVE9PTFNfR0xPQkFMX0hPT0tfXykuICcgKyAnRmFzdCBSZWZyZXNoIGlzIG5vdCBjb21wYXRpYmxlIHdpdGggdGhpcyBzaGltIGFuZCB3aWxsIGJlIGRpc2FibGVkLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH0gLy8gSGVyZSwgd2UganVzdCB3YW50IHRvIGdldCBhIHJlZmVyZW5jZSB0byBzY2hlZHVsZVJlZnJlc2guXG5cblxuICAgIHZhciBvbGRJbmplY3QgPSBob29rLmluamVjdDtcblxuICAgIGhvb2suaW5qZWN0ID0gZnVuY3Rpb24gKGluamVjdGVkKSB7XG4gICAgICB2YXIgaWQgPSBvbGRJbmplY3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgICAgaWYgKHR5cGVvZiBpbmplY3RlZC5zY2hlZHVsZVJlZnJlc2ggPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGluamVjdGVkLnNldFJlZnJlc2hIYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIFRoaXMgdmVyc2lvbiBzdXBwb3J0cyBSZWFjdCBSZWZyZXNoLlxuICAgICAgICBoZWxwZXJzQnlSZW5kZXJlcklELnNldChpZCwgaW5qZWN0ZWQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gaWQ7XG4gICAgfTsgLy8gRG8gdGhlIHNhbWUgZm9yIGFueSBhbHJlYWR5IGluamVjdGVkIHJvb3RzLlxuICAgIC8vIFRoaXMgaXMgdXNlZnVsIGlmIFJlYWN0RE9NIGhhcyBhbHJlYWR5IGJlZW4gaW5pdGlhbGl6ZWQuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8xNzYyNlxuXG5cbiAgICBob29rLnJlbmRlcmVycy5mb3JFYWNoKGZ1bmN0aW9uIChpbmplY3RlZCwgaWQpIHtcbiAgICAgIGlmICh0eXBlb2YgaW5qZWN0ZWQuc2NoZWR1bGVSZWZyZXNoID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBpbmplY3RlZC5zZXRSZWZyZXNoSGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAvLyBUaGlzIHZlcnNpb24gc3VwcG9ydHMgUmVhY3QgUmVmcmVzaC5cbiAgICAgICAgaGVscGVyc0J5UmVuZGVyZXJJRC5zZXQoaWQsIGluamVjdGVkKTtcbiAgICAgIH1cbiAgICB9KTsgLy8gV2UgYWxzbyB3YW50IHRvIHRyYWNrIGN1cnJlbnRseSBtb3VudGVkIHJvb3RzLlxuXG4gICAgdmFyIG9sZE9uQ29tbWl0RmliZXJSb290ID0gaG9vay5vbkNvbW1pdEZpYmVyUm9vdDtcblxuICAgIHZhciBvbGRPblNjaGVkdWxlRmliZXJSb290ID0gaG9vay5vblNjaGVkdWxlRmliZXJSb290IHx8IGZ1bmN0aW9uICgpIHt9O1xuXG4gICAgaG9vay5vblNjaGVkdWxlRmliZXJSb290ID0gZnVuY3Rpb24gKGlkLCByb290LCBjaGlsZHJlbikge1xuICAgICAgaWYgKCFpc1BlcmZvcm1pbmdSZWZyZXNoKSB7XG4gICAgICAgIC8vIElmIGl0IHdhcyBpbnRlbnRpb25hbGx5IHNjaGVkdWxlZCwgZG9uJ3QgYXR0ZW1wdCB0byByZXN0b3JlLlxuICAgICAgICAvLyBUaGlzIGluY2x1ZGVzIGludGVudGlvbmFsbHkgc2NoZWR1bGVkIHVubW91bnRzLlxuICAgICAgICBmYWlsZWRSb290cy5kZWxldGUocm9vdCk7XG5cbiAgICAgICAgaWYgKHJvb3RFbGVtZW50cyAhPT0gbnVsbCkge1xuICAgICAgICAgIHJvb3RFbGVtZW50cy5zZXQocm9vdCwgY2hpbGRyZW4pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvbGRPblNjaGVkdWxlRmliZXJSb290LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIGhvb2sub25Db21taXRGaWJlclJvb3QgPSBmdW5jdGlvbiAoaWQsIHJvb3QsIG1heWJlUHJpb3JpdHlMZXZlbCwgZGlkRXJyb3IpIHtcbiAgICAgIHZhciBoZWxwZXJzID0gaGVscGVyc0J5UmVuZGVyZXJJRC5nZXQoaWQpO1xuXG4gICAgICBpZiAoaGVscGVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGhlbHBlcnNCeVJvb3Quc2V0KHJvb3QsIGhlbHBlcnMpO1xuICAgICAgICB2YXIgY3VycmVudCA9IHJvb3QuY3VycmVudDtcbiAgICAgICAgdmFyIGFsdGVybmF0ZSA9IGN1cnJlbnQuYWx0ZXJuYXRlOyAvLyBXZSBuZWVkIHRvIGRldGVybWluZSB3aGV0aGVyIHRoaXMgcm9vdCBoYXMganVzdCAodW4pbW91bnRlZC5cbiAgICAgICAgLy8gVGhpcyBsb2dpYyBpcyBjb3B5LXBhc3RlZCBmcm9tIHNpbWlsYXIgbG9naWMgaW4gdGhlIERldlRvb2xzIGJhY2tlbmQuXG4gICAgICAgIC8vIElmIHRoaXMgYnJlYWtzIHdpdGggc29tZSByZWZhY3RvcmluZywgeW91J2xsIHdhbnQgdG8gdXBkYXRlIERldlRvb2xzIHRvby5cblxuICAgICAgICBpZiAoYWx0ZXJuYXRlICE9PSBudWxsKSB7XG4gICAgICAgICAgdmFyIHdhc01vdW50ZWQgPSBhbHRlcm5hdGUubWVtb2l6ZWRTdGF0ZSAhPSBudWxsICYmIGFsdGVybmF0ZS5tZW1vaXplZFN0YXRlLmVsZW1lbnQgIT0gbnVsbCAmJiBtb3VudGVkUm9vdHMuaGFzKHJvb3QpO1xuICAgICAgICAgIHZhciBpc01vdW50ZWQgPSBjdXJyZW50Lm1lbW9pemVkU3RhdGUgIT0gbnVsbCAmJiBjdXJyZW50Lm1lbW9pemVkU3RhdGUuZWxlbWVudCAhPSBudWxsO1xuXG4gICAgICAgICAgaWYgKCF3YXNNb3VudGVkICYmIGlzTW91bnRlZCkge1xuICAgICAgICAgICAgLy8gTW91bnQgYSBuZXcgcm9vdC5cbiAgICAgICAgICAgIG1vdW50ZWRSb290cy5hZGQocm9vdCk7XG4gICAgICAgICAgICBmYWlsZWRSb290cy5kZWxldGUocm9vdCk7XG4gICAgICAgICAgfSBlbHNlIGlmICh3YXNNb3VudGVkICYmIGlzTW91bnRlZCkgOyBlbHNlIGlmICh3YXNNb3VudGVkICYmICFpc01vdW50ZWQpIHtcbiAgICAgICAgICAgIC8vIFVubW91bnQgYW4gZXhpc3Rpbmcgcm9vdC5cbiAgICAgICAgICAgIG1vdW50ZWRSb290cy5kZWxldGUocm9vdCk7XG5cbiAgICAgICAgICAgIGlmIChkaWRFcnJvcikge1xuICAgICAgICAgICAgICAvLyBXZSdsbCByZW1vdW50IGl0IG9uIGZ1dHVyZSBlZGl0cy5cbiAgICAgICAgICAgICAgZmFpbGVkUm9vdHMuYWRkKHJvb3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaGVscGVyc0J5Um9vdC5kZWxldGUocm9vdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICghd2FzTW91bnRlZCAmJiAhaXNNb3VudGVkKSB7XG4gICAgICAgICAgICBpZiAoZGlkRXJyb3IpIHtcbiAgICAgICAgICAgICAgLy8gV2UnbGwgcmVtb3VudCBpdCBvbiBmdXR1cmUgZWRpdHMuXG4gICAgICAgICAgICAgIGZhaWxlZFJvb3RzLmFkZChyb290KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gTW91bnQgYSBuZXcgcm9vdC5cbiAgICAgICAgICBtb3VudGVkUm9vdHMuYWRkKHJvb3QpO1xuICAgICAgICB9XG4gICAgICB9IC8vIEFsd2F5cyBjYWxsIHRoZSBkZWNvcmF0ZWQgRGV2VG9vbHMgaG9vay5cblxuXG4gICAgICByZXR1cm4gb2xkT25Db21taXRGaWJlclJvb3QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICB9XG59XG5mdW5jdGlvbiBoYXNVbnJlY292ZXJhYmxlRXJyb3JzKCkge1xuICAvLyBUT0RPOiBkZWxldGUgdGhpcyBhZnRlciByZW1vdmluZyBkZXBlbmRlbmN5IGluIFJOLlxuICByZXR1cm4gZmFsc2U7XG59IC8vIEV4cG9zZWQgZm9yIHRlc3RpbmcuXG5cbmZ1bmN0aW9uIF9nZXRNb3VudGVkUm9vdENvdW50KCkge1xuICB7XG4gICAgcmV0dXJuIG1vdW50ZWRSb290cy5zaXplO1xuICB9XG59IC8vIFRoaXMgaXMgYSB3cmFwcGVyIG92ZXIgbW9yZSBwcmltaXRpdmUgZnVuY3Rpb25zIGZvciBzZXR0aW5nIHNpZ25hdHVyZS5cbi8vIFNpZ25hdHVyZXMgbGV0IHVzIGRlY2lkZSB3aGV0aGVyIHRoZSBIb29rIG9yZGVyIGhhcyBjaGFuZ2VkIG9uIHJlZnJlc2guXG4vL1xuLy8gVGhpcyBmdW5jdGlvbiBpcyBpbnRlbmRlZCB0byBiZSB1c2VkIGFzIGEgdHJhbnNmb3JtIHRhcmdldCwgZS5nLjpcbi8vIHZhciBfcyA9IGNyZWF0ZVNpZ25hdHVyZUZ1bmN0aW9uRm9yVHJhbnNmb3JtKClcbi8vXG4vLyBmdW5jdGlvbiBIZWxsbygpIHtcbi8vICAgY29uc3QgW2Zvbywgc2V0Rm9vXSA9IHVzZVN0YXRlKDApO1xuLy8gICBjb25zdCB2YWx1ZSA9IHVzZUN1c3RvbUhvb2soKTtcbi8vICAgX3MoKTsgLyogQ2FsbCB3aXRob3V0IGFyZ3VtZW50cyB0cmlnZ2VycyBjb2xsZWN0aW5nIHRoZSBjdXN0b20gSG9vayBsaXN0LlxuLy8gICAgICAgICAgKiBUaGlzIGRvZXNuJ3QgaGFwcGVuIGR1cmluZyB0aGUgbW9kdWxlIGV2YWx1YXRpb24gYmVjYXVzZSB3ZVxuLy8gICAgICAgICAgKiBkb24ndCB3YW50IHRvIGNoYW5nZSB0aGUgbW9kdWxlIG9yZGVyIHdpdGggaW5saW5lIHJlcXVpcmVzLlxuLy8gICAgICAgICAgKiBOZXh0IGNhbGxzIGFyZSBub29wcy4gKi9cbi8vICAgcmV0dXJuIDxoMT5IaTwvaDE+O1xuLy8gfVxuLy9cbi8vIC8qIENhbGwgd2l0aCBhcmd1bWVudHMgYXR0YWNoZXMgdGhlIHNpZ25hdHVyZSB0byB0aGUgdHlwZTogKi9cbi8vIF9zKFxuLy8gICBIZWxsbyxcbi8vICAgJ3VzZVN0YXRle1tmb28sIHNldEZvb119KDApJyxcbi8vICAgKCkgPT4gW3VzZUN1c3RvbUhvb2tdLCAvKiBMYXp5IHRvIGF2b2lkIHRyaWdnZXJpbmcgaW5saW5lIHJlcXVpcmVzICovXG4vLyApO1xuXG5mdW5jdGlvbiBjcmVhdGVTaWduYXR1cmVGdW5jdGlvbkZvclRyYW5zZm9ybSgpIHtcbiAge1xuICAgIHZhciBzYXZlZFR5cGU7XG4gICAgdmFyIGhhc0N1c3RvbUhvb2tzO1xuICAgIHZhciBkaWRDb2xsZWN0SG9va3MgPSBmYWxzZTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHR5cGUsIGtleSwgZm9yY2VSZXNldCwgZ2V0Q3VzdG9tSG9va3MpIHtcbiAgICAgIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAvLyBXZSdyZSBpbiB0aGUgaW5pdGlhbCBwaGFzZSB0aGF0IGFzc29jaWF0ZXMgc2lnbmF0dXJlc1xuICAgICAgICAvLyB3aXRoIHRoZSBmdW5jdGlvbnMuIE5vdGUgdGhpcyBtYXkgYmUgY2FsbGVkIG11bHRpcGxlIHRpbWVzXG4gICAgICAgIC8vIGluIEhPQyBjaGFpbnMgbGlrZSBfcyhob2MxKF9zKGhvYzIoX3MoYWN0dWFsRnVuY3Rpb24pKSkpKS5cbiAgICAgICAgaWYgKCFzYXZlZFR5cGUpIHtcbiAgICAgICAgICAvLyBXZSdyZSBpbiB0aGUgaW5uZXJtb3N0IGNhbGwsIHNvIHRoaXMgaXMgdGhlIGFjdHVhbCB0eXBlLlxuICAgICAgICAgIHNhdmVkVHlwZSA9IHR5cGU7XG4gICAgICAgICAgaGFzQ3VzdG9tSG9va3MgPSB0eXBlb2YgZ2V0Q3VzdG9tSG9va3MgPT09ICdmdW5jdGlvbic7XG4gICAgICAgIH0gLy8gU2V0IHRoZSBzaWduYXR1cmUgZm9yIGFsbCB0eXBlcyAoZXZlbiB3cmFwcGVycyEpIGluIGNhc2VcbiAgICAgICAgLy8gdGhleSBoYXZlIG5vIHNpZ25hdHVyZXMgb2YgdGhlaXIgb3duLiBUaGlzIGlzIHRvIHByZXZlbnRcbiAgICAgICAgLy8gcHJvYmxlbXMgbGlrZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzIwNDE3LlxuXG5cbiAgICAgICAgaWYgKHR5cGUgIT0gbnVsbCAmJiAodHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnKSkge1xuICAgICAgICAgIHNldFNpZ25hdHVyZSh0eXBlLCBrZXksIGZvcmNlUmVzZXQsIGdldEN1c3RvbUhvb2tzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gV2UncmUgaW4gdGhlIF9zKCkgY2FsbCB3aXRob3V0IGFyZ3VtZW50cywgd2hpY2ggbWVhbnNcbiAgICAgICAgLy8gdGhpcyBpcyB0aGUgdGltZSB0byBjb2xsZWN0IGN1c3RvbSBIb29rIHNpZ25hdHVyZXMuXG4gICAgICAgIC8vIE9ubHkgZG8gdGhpcyBvbmNlLiBUaGlzIHBhdGggaXMgaG90IGFuZCBydW5zICppbnNpZGUqIGV2ZXJ5IHJlbmRlciFcbiAgICAgICAgaWYgKCFkaWRDb2xsZWN0SG9va3MgJiYgaGFzQ3VzdG9tSG9va3MpIHtcbiAgICAgICAgICBkaWRDb2xsZWN0SG9va3MgPSB0cnVlO1xuICAgICAgICAgIGNvbGxlY3RDdXN0b21Ib29rc0ZvclNpZ25hdHVyZShzYXZlZFR5cGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuZnVuY3Rpb24gaXNMaWtlbHlDb21wb25lbnRUeXBlKHR5cGUpIHtcbiAge1xuICAgIHN3aXRjaCAodHlwZW9mIHR5cGUpIHtcbiAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAge1xuICAgICAgICAgIC8vIEZpcnN0LCBkZWFsIHdpdGggY2xhc3Nlcy5cbiAgICAgICAgICBpZiAodHlwZS5wcm90b3R5cGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHR5cGUucHJvdG90eXBlLmlzUmVhY3RDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgLy8gUmVhY3QgY2xhc3MuXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgb3duTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0eXBlLnByb3RvdHlwZSk7XG5cbiAgICAgICAgICAgIGlmIChvd25OYW1lcy5sZW5ndGggPiAxIHx8IG93bk5hbWVzWzBdICE9PSAnY29uc3RydWN0b3InKSB7XG4gICAgICAgICAgICAgIC8vIFRoaXMgbG9va3MgbGlrZSBhIGNsYXNzLlxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b1xuXG5cbiAgICAgICAgICAgIGlmICh0eXBlLnByb3RvdHlwZS5fX3Byb3RvX18gIT09IE9iamVjdC5wcm90b3R5cGUpIHtcbiAgICAgICAgICAgICAgLy8gSXQgaGFzIGEgc3VwZXJjbGFzcy5cbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSAvLyBQYXNzIHRocm91Z2guXG4gICAgICAgICAgICAvLyBUaGlzIGxvb2tzIGxpa2UgYSByZWd1bGFyIGZ1bmN0aW9uIHdpdGggZW1wdHkgcHJvdG90eXBlLlxuXG4gICAgICAgICAgfSAvLyBGb3IgcGxhaW4gZnVuY3Rpb25zIGFuZCBhcnJvd3MsIHVzZSBuYW1lIGFzIGEgaGV1cmlzdGljLlxuXG5cbiAgICAgICAgICB2YXIgbmFtZSA9IHR5cGUubmFtZSB8fCB0eXBlLmRpc3BsYXlOYW1lO1xuICAgICAgICAgIHJldHVybiB0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycgJiYgL15bQS1aXS8udGVzdChuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICB7XG4gICAgICAgICAgaWYgKHR5cGUgIT0gbnVsbCkge1xuICAgICAgICAgICAgc3dpdGNoIChnZXRQcm9wZXJ0eSh0eXBlLCAnJCR0eXBlb2YnKSkge1xuICAgICAgICAgICAgICBjYXNlIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfTUVNT19UWVBFOlxuICAgICAgICAgICAgICAgIC8vIERlZmluaXRlbHkgUmVhY3QgY29tcG9uZW50cy5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnRzLl9nZXRNb3VudGVkUm9vdENvdW50ID0gX2dldE1vdW50ZWRSb290Q291bnQ7XG5leHBvcnRzLmNvbGxlY3RDdXN0b21Ib29rc0ZvclNpZ25hdHVyZSA9IGNvbGxlY3RDdXN0b21Ib29rc0ZvclNpZ25hdHVyZTtcbmV4cG9ydHMuY3JlYXRlU2lnbmF0dXJlRnVuY3Rpb25Gb3JUcmFuc2Zvcm0gPSBjcmVhdGVTaWduYXR1cmVGdW5jdGlvbkZvclRyYW5zZm9ybTtcbmV4cG9ydHMuZmluZEFmZmVjdGVkSG9zdEluc3RhbmNlcyA9IGZpbmRBZmZlY3RlZEhvc3RJbnN0YW5jZXM7XG5leHBvcnRzLmdldEZhbWlseUJ5SUQgPSBnZXRGYW1pbHlCeUlEO1xuZXhwb3J0cy5nZXRGYW1pbHlCeVR5cGUgPSBnZXRGYW1pbHlCeVR5cGU7XG5leHBvcnRzLmhhc1VucmVjb3ZlcmFibGVFcnJvcnMgPSBoYXNVbnJlY292ZXJhYmxlRXJyb3JzO1xuZXhwb3J0cy5pbmplY3RJbnRvR2xvYmFsSG9vayA9IGluamVjdEludG9HbG9iYWxIb29rO1xuZXhwb3J0cy5pc0xpa2VseUNvbXBvbmVudFR5cGUgPSBpc0xpa2VseUNvbXBvbmVudFR5cGU7XG5leHBvcnRzLnBlcmZvcm1SZWFjdFJlZnJlc2ggPSBwZXJmb3JtUmVhY3RSZWZyZXNoO1xuZXhwb3J0cy5yZWdpc3RlciA9IHJlZ2lzdGVyO1xuZXhwb3J0cy5zZXRTaWduYXR1cmUgPSBzZXRTaWduYXR1cmU7XG4gIH0pKCk7XG59XG5cbmZ1bmN0aW9uIGRlYm91bmNlKGZuLCBkZWxheSkge1xuICBsZXQgaGFuZGxlXG4gIHJldHVybiAoKSA9PiB7XG4gICAgY2xlYXJUaW1lb3V0KGhhbmRsZSlcbiAgICBoYW5kbGUgPSBzZXRUaW1lb3V0KGZuLCBkZWxheSlcbiAgfVxufVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xuY29uc3QgaG9va3MgPSBbXVxud2luZG93Ll9fcmVnaXN0ZXJCZWZvcmVQZXJmb3JtUmVhY3RSZWZyZXNoID0gKGNiKSA9PiB7XG4gIGhvb2tzLnB1c2goY2IpXG59XG5jb25zdCBlbnF1ZXVlVXBkYXRlID0gZGVib3VuY2UoYXN5bmMgKCkgPT4ge1xuICBpZiAoaG9va3MubGVuZ3RoKSBhd2FpdCBQcm9taXNlLmFsbChob29rcy5tYXAoKGNiKSA9PiBjYigpKSlcbiAgZXhwb3J0cy5wZXJmb3JtUmVhY3RSZWZyZXNoKClcbn0sIDE2KVxuXG4vLyBUYWtlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9wbW1td2gvcmVhY3QtcmVmcmVzaC13ZWJwYWNrLXBsdWdpbi9ibG9iL21haW4vbGliL3J1bnRpbWUvUmVmcmVzaFV0aWxzLmpzI0wxNDFcbi8vIFRoaXMgYWxsb3dzIHRvIHJlc2lzdGVyIGNvbXBvbmVudHMgbm90IGRldGVjdGVkIGJ5IFNXQyBsaWtlIHN0eWxlZCBjb21wb25lbnRcbmZ1bmN0aW9uIHJlZ2lzdGVyRXhwb3J0c0ZvclJlYWN0UmVmcmVzaChmaWxlbmFtZSwgbW9kdWxlRXhwb3J0cykge1xuICBmb3IgKGNvbnN0IGtleSBpbiBtb2R1bGVFeHBvcnRzKSB7XG4gICAgaWYgKGtleSA9PT0gJ19fZXNNb2R1bGUnKSBjb250aW51ZVxuICAgIGNvbnN0IGV4cG9ydFZhbHVlID0gbW9kdWxlRXhwb3J0c1trZXldXG4gICAgaWYgKGV4cG9ydHMuaXNMaWtlbHlDb21wb25lbnRUeXBlKGV4cG9ydFZhbHVlKSkge1xuICAgICAgLy8gJ2V4cG9ydCcgaXMgcmVxdWlyZWQgdG8gYXZvaWQga2V5IGNvbGxpc2lvbiB3aGVuIHJlbmFtZWQgZXhwb3J0cyB0aGF0XG4gICAgICAvLyBzaGFkb3cgYSBsb2NhbCBjb21wb25lbnQgbmFtZTogaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVqcy92aXRlLXBsdWdpbi1yZWFjdC9pc3N1ZXMvMTE2XG4gICAgICAvLyBUaGUgcmVnaXN0ZXIgZnVuY3Rpb24gaGFzIGFuIGlkZW50aXR5IGNoZWNrIHRvIG5vdCByZWdpc3RlciB0d2ljZSB0aGUgc2FtZSBjb21wb25lbnQsXG4gICAgICAvLyBzbyB0aGlzIGlzIHNhZmUgdG8gbm90IHVzZWQgdGhlIHNhbWUga2V5IGhlcmUuXG4gICAgICBleHBvcnRzLnJlZ2lzdGVyKGV4cG9ydFZhbHVlLCBmaWxlbmFtZSArICcgZXhwb3J0ICcgKyBrZXkpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlUmVmcmVzaEJvdW5kYXJ5QW5kRW5xdWV1ZVVwZGF0ZShpZCwgcHJldkV4cG9ydHMsIG5leHRFeHBvcnRzKSB7XG4gIGNvbnN0IGlnbm9yZWRFeHBvcnRzID0gd2luZG93Ll9fZ2V0UmVhY3RSZWZyZXNoSWdub3JlZEV4cG9ydHM/Lih7IGlkIH0pID8/IFtdXG4gIGlmIChcbiAgICBwcmVkaWNhdGVPbkV4cG9ydChcbiAgICAgIGlnbm9yZWRFeHBvcnRzLFxuICAgICAgcHJldkV4cG9ydHMsXG4gICAgICAoa2V5KSA9PiBrZXkgaW4gbmV4dEV4cG9ydHMsXG4gICAgKSAhPT0gdHJ1ZVxuICApIHtcbiAgICByZXR1cm4gJ0NvdWxkIG5vdCBGYXN0IFJlZnJlc2ggKGV4cG9ydCByZW1vdmVkKSdcbiAgfVxuICBpZiAoXG4gICAgcHJlZGljYXRlT25FeHBvcnQoXG4gICAgICBpZ25vcmVkRXhwb3J0cyxcbiAgICAgIG5leHRFeHBvcnRzLFxuICAgICAgKGtleSkgPT4ga2V5IGluIHByZXZFeHBvcnRzLFxuICAgICkgIT09IHRydWVcbiAgKSB7XG4gICAgcmV0dXJuICdDb3VsZCBub3QgRmFzdCBSZWZyZXNoIChuZXcgZXhwb3J0KSdcbiAgfVxuXG4gIGxldCBoYXNFeHBvcnRzID0gZmFsc2VcbiAgY29uc3QgYWxsRXhwb3J0c0FyZUNvbXBvbmVudHNPclVuY2hhbmdlZCA9IHByZWRpY2F0ZU9uRXhwb3J0KFxuICAgIGlnbm9yZWRFeHBvcnRzLFxuICAgIG5leHRFeHBvcnRzLFxuICAgIChrZXksIHZhbHVlKSA9PiB7XG4gICAgICBoYXNFeHBvcnRzID0gdHJ1ZVxuICAgICAgaWYgKGV4cG9ydHMuaXNMaWtlbHlDb21wb25lbnRUeXBlKHZhbHVlKSkgcmV0dXJuIHRydWVcbiAgICAgIHJldHVybiBwcmV2RXhwb3J0c1trZXldID09PSBuZXh0RXhwb3J0c1trZXldXG4gICAgfSxcbiAgKVxuICBpZiAoaGFzRXhwb3J0cyAmJiBhbGxFeHBvcnRzQXJlQ29tcG9uZW50c09yVW5jaGFuZ2VkID09PSB0cnVlKSB7XG4gICAgZW5xdWV1ZVVwZGF0ZSgpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGBDb3VsZCBub3QgRmFzdCBSZWZyZXNoIChcIiR7YWxsRXhwb3J0c0FyZUNvbXBvbmVudHNPclVuY2hhbmdlZH1cIiBleHBvcnQgaXMgaW5jb21wYXRpYmxlKS4gTGVhcm4gbW9yZSBhdCBodHRwczovL2dpdGh1Yi5jb20vdml0ZWpzL3ZpdGUtcGx1Z2luLXJlYWN0L3RyZWUvbWFpbi9wYWNrYWdlcy9wbHVnaW4tcmVhY3QjY29uc2lzdGVudC1jb21wb25lbnRzLWV4cG9ydHNgXG4gIH1cbn1cblxuZnVuY3Rpb24gcHJlZGljYXRlT25FeHBvcnQoaWdub3JlZEV4cG9ydHMsIG1vZHVsZUV4cG9ydHMsIHByZWRpY2F0ZSkge1xuICBmb3IgKGNvbnN0IGtleSBpbiBtb2R1bGVFeHBvcnRzKSB7XG4gICAgaWYgKGtleSA9PT0gJ19fZXNNb2R1bGUnKSBjb250aW51ZVxuICAgIGlmIChpZ25vcmVkRXhwb3J0cy5pbmNsdWRlcyhrZXkpKSBjb250aW51ZVxuICAgIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG1vZHVsZUV4cG9ydHMsIGtleSlcbiAgICBpZiAoZGVzYyAmJiBkZXNjLmdldCkgcmV0dXJuIGtleVxuICAgIGlmICghcHJlZGljYXRlKGtleSwgbW9kdWxlRXhwb3J0c1trZXldKSkgcmV0dXJuIGtleVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbi8vIEhpZGVzIHZpdGUtaWdub3JlZCBkeW5hbWljIGltcG9ydCBzbyB0aGF0IFZpdGUgY2FuIHNraXAgYW5hbHlzaXMgaWYgbm8gb3RoZXJcbi8vIGR5bmFtaWMgaW1wb3J0IGlzIHByZXNlbnQgKGh0dHBzOi8vZ2l0aHViLmNvbS92aXRlanMvdml0ZS9wdWxsLzEyNzMyKVxuZnVuY3Rpb24gX19obXJfaW1wb3J0KG1vZHVsZSkge1xuICByZXR1cm4gaW1wb3J0KC8qIEB2aXRlLWlnbm9yZSAqLyBtb2R1bGUpXG59XG5cbmV4cG9ydHMuX19obXJfaW1wb3J0ID0gX19obXJfaW1wb3J0XG5leHBvcnRzLnJlZ2lzdGVyRXhwb3J0c0ZvclJlYWN0UmVmcmVzaCA9IHJlZ2lzdGVyRXhwb3J0c0ZvclJlYWN0UmVmcmVzaFxuZXhwb3J0cy52YWxpZGF0ZVJlZnJlc2hCb3VuZGFyeUFuZEVucXVldWVVcGRhdGUgPVxuICB2YWxpZGF0ZVJlZnJlc2hCb3VuZGFyeUFuZEVucXVldWVVcGRhdGVcblxuZXhwb3J0IGRlZmF1bHQgZXhwb3J0c1xuIl0sIm1hcHBpbmdzIjoiQUFDQSxNQUFNLFVBQVUsQ0FBQztBQUNqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFVQTtBQUVBLElBQUksTUFBdUM7QUFDekMsR0FBQyxXQUFXO0FBQ2Q7QUFHQSxRQUFJLHlCQUF5QixPQUFPLElBQUksbUJBQW1CO0FBQzNELFFBQUksa0JBQWtCLE9BQU8sSUFBSSxZQUFZO0FBRTdDLFFBQUksa0JBQWtCLE9BQU8sWUFBWSxhQUFhLFVBQVU7QUFHaEUsUUFBSSxrQkFBa0Isb0JBQUksSUFBSTtBQUM5QixRQUFJLG9CQUFvQixJQUFJLGdCQUFnQjtBQUM1QyxRQUFJLHNCQUFzQixJQUFJLGdCQUFnQjtBQUk5QyxRQUFJLHdCQUF3QixJQUFJLGdCQUFnQjtBQUdoRCxRQUFJLGlCQUFpQixDQUFDO0FBRXRCLFFBQUksc0JBQXNCLG9CQUFJLElBQUk7QUFDbEMsUUFBSSxnQkFBZ0Isb0JBQUksSUFBSTtBQUU1QixRQUFJLGVBQWUsb0JBQUksSUFBSTtBQUUzQixRQUFJLGNBQWMsb0JBQUksSUFBSTtBQUsxQixRQUFJO0FBQUE7QUFBQSxNQUNKLE9BQU8sWUFBWSxhQUFhLG9CQUFJLFFBQVEsSUFBSTtBQUFBO0FBQ2hELFFBQUksc0JBQXNCO0FBRTFCLGFBQVMsZUFBZSxXQUFXO0FBQ2pDLFVBQUksVUFBVSxZQUFZLE1BQU07QUFDOUIsZUFBTyxVQUFVO0FBQUEsTUFDbkI7QUFFQSxVQUFJLFVBQVUsVUFBVTtBQUN4QixVQUFJQTtBQUVKLFVBQUk7QUFDRixRQUFBQSxTQUFRLFVBQVUsZUFBZTtBQUFBLE1BQ25DLFNBQVMsS0FBSztBQUlaLGtCQUFVLGFBQWE7QUFDdkIsa0JBQVUsVUFBVTtBQUNwQixlQUFPO0FBQUEsTUFDVDtBQUVBLGVBQVMsSUFBSSxHQUFHLElBQUlBLE9BQU0sUUFBUSxLQUFLO0FBQ3JDLFlBQUksT0FBT0EsT0FBTSxDQUFDO0FBRWxCLFlBQUksT0FBTyxTQUFTLFlBQVk7QUFFOUIsb0JBQVUsYUFBYTtBQUN2QixvQkFBVSxVQUFVO0FBQ3BCLGlCQUFPO0FBQUEsUUFDVDtBQUVBLFlBQUksc0JBQXNCLG9CQUFvQixJQUFJLElBQUk7QUFFdEQsWUFBSSx3QkFBd0IsUUFBVztBQUdyQztBQUFBLFFBQ0Y7QUFFQSxZQUFJLGdCQUFnQixlQUFlLG1CQUFtQjtBQUV0RCxZQUFJLG9CQUFvQixZQUFZO0FBQ2xDLG9CQUFVLGFBQWE7QUFBQSxRQUN6QjtBQUVBLG1CQUFXLFlBQVk7QUFBQSxNQUN6QjtBQUVBLGdCQUFVLFVBQVU7QUFDcEIsYUFBTztBQUFBLElBQ1Q7QUFFQSxhQUFTLG9CQUFvQixVQUFVLFVBQVU7QUFDL0MsVUFBSSxnQkFBZ0Isb0JBQW9CLElBQUksUUFBUTtBQUNwRCxVQUFJLGdCQUFnQixvQkFBb0IsSUFBSSxRQUFRO0FBRXBELFVBQUksa0JBQWtCLFVBQWEsa0JBQWtCLFFBQVc7QUFDOUQsZUFBTztBQUFBLE1BQ1Q7QUFFQSxVQUFJLGtCQUFrQixVQUFhLGtCQUFrQixRQUFXO0FBQzlELGVBQU87QUFBQSxNQUNUO0FBRUEsVUFBSSxlQUFlLGFBQWEsTUFBTSxlQUFlLGFBQWEsR0FBRztBQUNuRSxlQUFPO0FBQUEsTUFDVDtBQUVBLFVBQUksY0FBYyxZQUFZO0FBQzVCLGVBQU87QUFBQSxNQUNUO0FBRUEsYUFBTztBQUFBLElBQ1Q7QUFFQSxhQUFTLGFBQWEsTUFBTTtBQUMxQixhQUFPLEtBQUssYUFBYSxLQUFLLFVBQVU7QUFBQSxJQUMxQztBQUVBLGFBQVMsd0JBQXdCLFVBQVUsVUFBVTtBQUNuRCxVQUFJLGFBQWEsUUFBUSxLQUFLLGFBQWEsUUFBUSxHQUFHO0FBQ3BELGVBQU87QUFBQSxNQUNUO0FBRUEsVUFBSSxvQkFBb0IsVUFBVSxRQUFRLEdBQUc7QUFDM0MsZUFBTztBQUFBLE1BQ1Q7QUFFQSxhQUFPO0FBQUEsSUFDVDtBQUVBLGFBQVMsY0FBYyxNQUFNO0FBRTNCLGFBQU8sc0JBQXNCLElBQUksSUFBSTtBQUFBLElBQ3ZDO0FBR0EsYUFBUyxTQUFTLEtBQUs7QUFDckIsVUFBSSxRQUFRLG9CQUFJLElBQUk7QUFDcEIsVUFBSSxRQUFRLFNBQVUsT0FBTyxLQUFLO0FBQ2hDLGNBQU0sSUFBSSxLQUFLLEtBQUs7QUFBQSxNQUN0QixDQUFDO0FBQ0QsYUFBTztBQUFBLElBQ1Q7QUFFQSxhQUFTLFNBQVMsS0FBSztBQUNyQixVQUFJLFFBQVEsb0JBQUksSUFBSTtBQUNwQixVQUFJLFFBQVEsU0FBVSxPQUFPO0FBQzNCLGNBQU0sSUFBSSxLQUFLO0FBQUEsTUFDakIsQ0FBQztBQUNELGFBQU87QUFBQSxJQUNUO0FBR0EsYUFBUyxZQUFZLFFBQVEsVUFBVTtBQUNyQyxVQUFJO0FBQ0YsZUFBTyxPQUFPLFFBQVE7QUFBQSxNQUN4QixTQUFTLEtBQUs7QUFFWixlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFFQSxhQUFTLHNCQUFzQjtBQUU3QixVQUFJLGVBQWUsV0FBVyxHQUFHO0FBQy9CLGVBQU87QUFBQSxNQUNUO0FBRUEsVUFBSSxxQkFBcUI7QUFDdkIsZUFBTztBQUFBLE1BQ1Q7QUFFQSw0QkFBc0I7QUFFdEIsVUFBSTtBQUNGLFlBQUksZ0JBQWdCLG9CQUFJLElBQUk7QUFDNUIsWUFBSSxrQkFBa0Isb0JBQUksSUFBSTtBQUM5QixZQUFJLFVBQVU7QUFDZCx5QkFBaUIsQ0FBQztBQUNsQixnQkFBUSxRQUFRLFNBQVUsTUFBTTtBQUM5QixjQUFJLFNBQVMsS0FBSyxDQUFDLEdBQ2YsV0FBVyxLQUFLLENBQUM7QUFHckIsY0FBSSxXQUFXLE9BQU87QUFDdEIsZ0NBQXNCLElBQUksVUFBVSxNQUFNO0FBQzFDLGdDQUFzQixJQUFJLFVBQVUsTUFBTTtBQUMxQyxpQkFBTyxVQUFVO0FBRWpCLGNBQUksd0JBQXdCLFVBQVUsUUFBUSxHQUFHO0FBQy9DLDRCQUFnQixJQUFJLE1BQU07QUFBQSxVQUM1QixPQUFPO0FBQ0wsMEJBQWMsSUFBSSxNQUFNO0FBQUEsVUFDMUI7QUFBQSxRQUNGLENBQUM7QUFFRCxZQUFJLFNBQVM7QUFBQSxVQUNYO0FBQUE7QUFBQSxVQUVBO0FBQUE7QUFBQSxRQUVGO0FBQ0EsNEJBQW9CLFFBQVEsU0FBVSxTQUFTO0FBRzdDLGtCQUFRLGtCQUFrQixhQUFhO0FBQUEsUUFDekMsQ0FBQztBQUNELFlBQUksV0FBVztBQUNmLFlBQUksYUFBYTtBQUtqQixZQUFJLHNCQUFzQixTQUFTLFdBQVc7QUFDOUMsWUFBSSx1QkFBdUIsU0FBUyxZQUFZO0FBQ2hELFlBQUksd0JBQXdCLFNBQVMsYUFBYTtBQUNsRCw0QkFBb0IsUUFBUSxTQUFVLE1BQU07QUFDMUMsY0FBSSxVQUFVLHNCQUFzQixJQUFJLElBQUk7QUFFNUMsY0FBSSxZQUFZLFFBQVc7QUFDekIsa0JBQU0sSUFBSSxNQUFNLG9FQUFvRTtBQUFBLFVBQ3RGO0FBRUEsY0FBSSxDQUFDLFlBQVksSUFBSSxJQUFJLEdBQUc7QUFBQSxVQUM1QjtBQUVBLGNBQUksaUJBQWlCLE1BQU07QUFDekI7QUFBQSxVQUNGO0FBRUEsY0FBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLEdBQUc7QUFDM0I7QUFBQSxVQUNGO0FBRUEsY0FBSSxVQUFVLGFBQWEsSUFBSSxJQUFJO0FBRW5DLGNBQUk7QUFDRixvQkFBUSxhQUFhLE1BQU0sT0FBTztBQUFBLFVBQ3BDLFNBQVMsS0FBSztBQUNaLGdCQUFJLENBQUMsVUFBVTtBQUNiLHlCQUFXO0FBQ1gsMkJBQWE7QUFBQSxZQUNmO0FBQUEsVUFFRjtBQUFBLFFBQ0YsQ0FBQztBQUNELDZCQUFxQixRQUFRLFNBQVUsTUFBTTtBQUMzQyxjQUFJLFVBQVUsc0JBQXNCLElBQUksSUFBSTtBQUU1QyxjQUFJLFlBQVksUUFBVztBQUN6QixrQkFBTSxJQUFJLE1BQU0sb0VBQW9FO0FBQUEsVUFDdEY7QUFFQSxjQUFJLENBQUMsYUFBYSxJQUFJLElBQUksR0FBRztBQUFBLFVBQzdCO0FBRUEsY0FBSTtBQUNGLG9CQUFRLGdCQUFnQixNQUFNLE1BQU07QUFBQSxVQUN0QyxTQUFTLEtBQUs7QUFDWixnQkFBSSxDQUFDLFVBQVU7QUFDYix5QkFBVztBQUNYLDJCQUFhO0FBQUEsWUFDZjtBQUFBLFVBRUY7QUFBQSxRQUNGLENBQUM7QUFFRCxZQUFJLFVBQVU7QUFDWixnQkFBTTtBQUFBLFFBQ1I7QUFFQSxlQUFPO0FBQUEsTUFDVCxVQUFFO0FBQ0EsOEJBQXNCO0FBQUEsTUFDeEI7QUFBQSxJQUNGO0FBQ0EsYUFBUyxTQUFTLE1BQU0sSUFBSTtBQUMxQjtBQUNFLFlBQUksU0FBUyxNQUFNO0FBQ2pCO0FBQUEsUUFDRjtBQUVBLFlBQUksT0FBTyxTQUFTLGNBQWMsT0FBTyxTQUFTLFVBQVU7QUFDMUQ7QUFBQSxRQUNGO0FBS0EsWUFBSSxrQkFBa0IsSUFBSSxJQUFJLEdBQUc7QUFDL0I7QUFBQSxRQUNGO0FBS0EsWUFBSSxTQUFTLGdCQUFnQixJQUFJLEVBQUU7QUFFbkMsWUFBSSxXQUFXLFFBQVc7QUFDeEIsbUJBQVM7QUFBQSxZQUNQLFNBQVM7QUFBQSxVQUNYO0FBQ0EsMEJBQWdCLElBQUksSUFBSSxNQUFNO0FBQUEsUUFDaEMsT0FBTztBQUNMLHlCQUFlLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQztBQUFBLFFBQ3BDO0FBRUEsMEJBQWtCLElBQUksTUFBTSxNQUFNO0FBRWxDLFlBQUksT0FBTyxTQUFTLFlBQVksU0FBUyxNQUFNO0FBQzdDLGtCQUFRLFlBQVksTUFBTSxVQUFVLEdBQUc7QUFBQSxZQUNyQyxLQUFLO0FBQ0gsdUJBQVMsS0FBSyxRQUFRLEtBQUssU0FBUztBQUNwQztBQUFBLFlBRUYsS0FBSztBQUNILHVCQUFTLEtBQUssTUFBTSxLQUFLLE9BQU87QUFDaEM7QUFBQSxVQUNKO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQ0EsYUFBUyxhQUFhLE1BQU0sS0FBSztBQUMvQixVQUFJLGFBQWEsVUFBVSxTQUFTLEtBQUssVUFBVSxDQUFDLE1BQU0sU0FBWSxVQUFVLENBQUMsSUFBSTtBQUNyRixVQUFJLGlCQUFpQixVQUFVLFNBQVMsSUFBSSxVQUFVLENBQUMsSUFBSTtBQUUzRDtBQUNFLFlBQUksQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLEdBQUc7QUFDbEMsOEJBQW9CLElBQUksTUFBTTtBQUFBLFlBQzVCO0FBQUEsWUFDQSxRQUFRO0FBQUEsWUFDUixTQUFTO0FBQUEsWUFDVCxnQkFBZ0Isa0JBQWtCLFdBQVk7QUFDNUMscUJBQU8sQ0FBQztBQUFBLFlBQ1Y7QUFBQSxVQUNGLENBQUM7QUFBQSxRQUNIO0FBR0EsWUFBSSxPQUFPLFNBQVMsWUFBWSxTQUFTLE1BQU07QUFDN0Msa0JBQVEsWUFBWSxNQUFNLFVBQVUsR0FBRztBQUFBLFlBQ3JDLEtBQUs7QUFDSCwyQkFBYSxLQUFLLFFBQVEsS0FBSyxZQUFZLGNBQWM7QUFDekQ7QUFBQSxZQUVGLEtBQUs7QUFDSCwyQkFBYSxLQUFLLE1BQU0sS0FBSyxZQUFZLGNBQWM7QUFDdkQ7QUFBQSxVQUNKO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBR0EsYUFBUywrQkFBK0IsTUFBTTtBQUM1QztBQUNFLFlBQUksWUFBWSxvQkFBb0IsSUFBSSxJQUFJO0FBRTVDLFlBQUksY0FBYyxRQUFXO0FBQzNCLHlCQUFlLFNBQVM7QUFBQSxRQUMxQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQ0EsYUFBUyxjQUFjLElBQUk7QUFDekI7QUFDRSxlQUFPLGdCQUFnQixJQUFJLEVBQUU7QUFBQSxNQUMvQjtBQUFBLElBQ0Y7QUFDQSxhQUFTLGdCQUFnQixNQUFNO0FBQzdCO0FBQ0UsZUFBTyxrQkFBa0IsSUFBSSxJQUFJO0FBQUEsTUFDbkM7QUFBQSxJQUNGO0FBQ0EsYUFBUywwQkFBMEIsVUFBVTtBQUMzQztBQUNFLFlBQUksb0JBQW9CLG9CQUFJLElBQUk7QUFDaEMscUJBQWEsUUFBUSxTQUFVLE1BQU07QUFDbkMsY0FBSSxVQUFVLGNBQWMsSUFBSSxJQUFJO0FBRXBDLGNBQUksWUFBWSxRQUFXO0FBQ3pCLGtCQUFNLElBQUksTUFBTSxvRUFBb0U7QUFBQSxVQUN0RjtBQUVBLGNBQUksbUJBQW1CLFFBQVEsNEJBQTRCLE1BQU0sUUFBUTtBQUN6RSwyQkFBaUIsUUFBUSxTQUFVLE1BQU07QUFDdkMsOEJBQWtCLElBQUksSUFBSTtBQUFBLFVBQzVCLENBQUM7QUFBQSxRQUNILENBQUM7QUFDRCxlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFDQSxhQUFTLHFCQUFxQixjQUFjO0FBQzFDO0FBS0UsWUFBSSxPQUFPLGFBQWE7QUFFeEIsWUFBSSxTQUFTLFFBQVc7QUFJdEIsY0FBSSxTQUFTO0FBQ2IsdUJBQWEsaUNBQWlDLE9BQU87QUFBQSxZQUNuRCxXQUFXLG9CQUFJLElBQUk7QUFBQSxZQUNuQixlQUFlO0FBQUEsWUFDZixRQUFRLFNBQVUsVUFBVTtBQUMxQixxQkFBTztBQUFBLFlBQ1Q7QUFBQSxZQUNBLHFCQUFxQixTQUFVLElBQUksTUFBTSxVQUFVO0FBQUEsWUFBQztBQUFBLFlBQ3BELG1CQUFtQixTQUFVLElBQUksTUFBTSxvQkFBb0IsVUFBVTtBQUFBLFlBQUM7QUFBQSxZQUN0RSxzQkFBc0IsV0FBWTtBQUFBLFlBQUM7QUFBQSxVQUNyQztBQUFBLFFBQ0Y7QUFFQSxZQUFJLEtBQUssWUFBWTtBQUluQixrQkFBUSxNQUFNLEVBQUUsNEpBQWlLO0FBQ2pMO0FBQUEsUUFDRjtBQUdBLFlBQUksWUFBWSxLQUFLO0FBRXJCLGFBQUssU0FBUyxTQUFVLFVBQVU7QUFDaEMsY0FBSSxLQUFLLFVBQVUsTUFBTSxNQUFNLFNBQVM7QUFFeEMsY0FBSSxPQUFPLFNBQVMsb0JBQW9CLGNBQWMsT0FBTyxTQUFTLHNCQUFzQixZQUFZO0FBRXRHLGdDQUFvQixJQUFJLElBQUksUUFBUTtBQUFBLFVBQ3RDO0FBRUEsaUJBQU87QUFBQSxRQUNUO0FBS0EsYUFBSyxVQUFVLFFBQVEsU0FBVSxVQUFVLElBQUk7QUFDN0MsY0FBSSxPQUFPLFNBQVMsb0JBQW9CLGNBQWMsT0FBTyxTQUFTLHNCQUFzQixZQUFZO0FBRXRHLGdDQUFvQixJQUFJLElBQUksUUFBUTtBQUFBLFVBQ3RDO0FBQUEsUUFDRixDQUFDO0FBRUQsWUFBSSx1QkFBdUIsS0FBSztBQUVoQyxZQUFJLHlCQUF5QixLQUFLLHVCQUF1QixXQUFZO0FBQUEsUUFBQztBQUV0RSxhQUFLLHNCQUFzQixTQUFVLElBQUksTUFBTSxVQUFVO0FBQ3ZELGNBQUksQ0FBQyxxQkFBcUI7QUFHeEIsd0JBQVksT0FBTyxJQUFJO0FBRXZCLGdCQUFJLGlCQUFpQixNQUFNO0FBQ3pCLDJCQUFhLElBQUksTUFBTSxRQUFRO0FBQUEsWUFDakM7QUFBQSxVQUNGO0FBRUEsaUJBQU8sdUJBQXVCLE1BQU0sTUFBTSxTQUFTO0FBQUEsUUFDckQ7QUFFQSxhQUFLLG9CQUFvQixTQUFVLElBQUksTUFBTSxvQkFBb0IsVUFBVTtBQUN6RSxjQUFJLFVBQVUsb0JBQW9CLElBQUksRUFBRTtBQUV4QyxjQUFJLFlBQVksUUFBVztBQUN6QiwwQkFBYyxJQUFJLE1BQU0sT0FBTztBQUMvQixnQkFBSSxVQUFVLEtBQUs7QUFDbkIsZ0JBQUksWUFBWSxRQUFRO0FBSXhCLGdCQUFJLGNBQWMsTUFBTTtBQUN0QixrQkFBSSxhQUFhLFVBQVUsaUJBQWlCLFFBQVEsVUFBVSxjQUFjLFdBQVcsUUFBUSxhQUFhLElBQUksSUFBSTtBQUNwSCxrQkFBSSxZQUFZLFFBQVEsaUJBQWlCLFFBQVEsUUFBUSxjQUFjLFdBQVc7QUFFbEYsa0JBQUksQ0FBQyxjQUFjLFdBQVc7QUFFNUIsNkJBQWEsSUFBSSxJQUFJO0FBQ3JCLDRCQUFZLE9BQU8sSUFBSTtBQUFBLGNBQ3pCLFdBQVcsY0FBYyxVQUFXO0FBQUEsdUJBQVcsY0FBYyxDQUFDLFdBQVc7QUFFdkUsNkJBQWEsT0FBTyxJQUFJO0FBRXhCLG9CQUFJLFVBQVU7QUFFWiw4QkFBWSxJQUFJLElBQUk7QUFBQSxnQkFDdEIsT0FBTztBQUNMLGdDQUFjLE9BQU8sSUFBSTtBQUFBLGdCQUMzQjtBQUFBLGNBQ0YsV0FBVyxDQUFDLGNBQWMsQ0FBQyxXQUFXO0FBQ3BDLG9CQUFJLFVBQVU7QUFFWiw4QkFBWSxJQUFJLElBQUk7QUFBQSxnQkFDdEI7QUFBQSxjQUNGO0FBQUEsWUFDRixPQUFPO0FBRUwsMkJBQWEsSUFBSSxJQUFJO0FBQUEsWUFDdkI7QUFBQSxVQUNGO0FBR0EsaUJBQU8scUJBQXFCLE1BQU0sTUFBTSxTQUFTO0FBQUEsUUFDbkQ7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUNBLGFBQVMseUJBQXlCO0FBRWhDLGFBQU87QUFBQSxJQUNUO0FBRUEsYUFBUyx1QkFBdUI7QUFDOUI7QUFDRSxlQUFPLGFBQWE7QUFBQSxNQUN0QjtBQUFBLElBQ0Y7QUF1QkEsYUFBUyxzQ0FBc0M7QUFDN0M7QUFDRSxZQUFJO0FBQ0osWUFBSTtBQUNKLFlBQUksa0JBQWtCO0FBQ3RCLGVBQU8sU0FBVSxNQUFNLEtBQUssWUFBWSxnQkFBZ0I7QUFDdEQsY0FBSSxPQUFPLFFBQVEsVUFBVTtBQUkzQixnQkFBSSxDQUFDLFdBQVc7QUFFZCwwQkFBWTtBQUNaLCtCQUFpQixPQUFPLG1CQUFtQjtBQUFBLFlBQzdDO0FBS0EsZ0JBQUksUUFBUSxTQUFTLE9BQU8sU0FBUyxjQUFjLE9BQU8sU0FBUyxXQUFXO0FBQzVFLDJCQUFhLE1BQU0sS0FBSyxZQUFZLGNBQWM7QUFBQSxZQUNwRDtBQUVBLG1CQUFPO0FBQUEsVUFDVCxPQUFPO0FBSUwsZ0JBQUksQ0FBQyxtQkFBbUIsZ0JBQWdCO0FBQ3RDLGdDQUFrQjtBQUNsQiw2Q0FBK0IsU0FBUztBQUFBLFlBQzFDO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUNBLGFBQVMsc0JBQXNCLE1BQU07QUFDbkM7QUFDRSxnQkFBUSxPQUFPLE1BQU07QUFBQSxVQUNuQixLQUFLLFlBQ0g7QUFFRSxnQkFBSSxLQUFLLGFBQWEsTUFBTTtBQUMxQixrQkFBSSxLQUFLLFVBQVUsa0JBQWtCO0FBRW5DLHVCQUFPO0FBQUEsY0FDVDtBQUVBLGtCQUFJLFdBQVcsT0FBTyxvQkFBb0IsS0FBSyxTQUFTO0FBRXhELGtCQUFJLFNBQVMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxNQUFNLGVBQWU7QUFFeEQsdUJBQU87QUFBQSxjQUNUO0FBR0Esa0JBQUksS0FBSyxVQUFVLGNBQWMsT0FBTyxXQUFXO0FBRWpELHVCQUFPO0FBQUEsY0FDVDtBQUFBLFlBR0Y7QUFHQSxnQkFBSSxPQUFPLEtBQUssUUFBUSxLQUFLO0FBQzdCLG1CQUFPLE9BQU8sU0FBUyxZQUFZLFNBQVMsS0FBSyxJQUFJO0FBQUEsVUFDdkQ7QUFBQSxVQUVGLEtBQUssVUFDSDtBQUNFLGdCQUFJLFFBQVEsTUFBTTtBQUNoQixzQkFBUSxZQUFZLE1BQU0sVUFBVSxHQUFHO0FBQUEsZ0JBQ3JDLEtBQUs7QUFBQSxnQkFDTCxLQUFLO0FBRUgseUJBQU87QUFBQSxnQkFFVDtBQUNFLHlCQUFPO0FBQUEsY0FDWDtBQUFBLFlBQ0Y7QUFFQSxtQkFBTztBQUFBLFVBQ1Q7QUFBQSxVQUVGLFNBQ0U7QUFDRSxtQkFBTztBQUFBLFVBQ1Q7QUFBQSxRQUNKO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxZQUFRLHVCQUF1QjtBQUMvQixZQUFRLGlDQUFpQztBQUN6QyxZQUFRLHNDQUFzQztBQUM5QyxZQUFRLDRCQUE0QjtBQUNwQyxZQUFRLGdCQUFnQjtBQUN4QixZQUFRLGtCQUFrQjtBQUMxQixZQUFRLHlCQUF5QjtBQUNqQyxZQUFRLHVCQUF1QjtBQUMvQixZQUFRLHdCQUF3QjtBQUNoQyxZQUFRLHNCQUFzQjtBQUM5QixZQUFRLFdBQVc7QUFDbkIsWUFBUSxlQUFlO0FBQUEsRUFDckIsR0FBRztBQUNMO0FBRUEsU0FBUyxTQUFTLElBQUksT0FBTztBQUMzQixNQUFJO0FBQ0osU0FBTyxNQUFNO0FBQ1gsaUJBQWEsTUFBTTtBQUNuQixhQUFTLFdBQVcsSUFBSSxLQUFLO0FBQUEsRUFDL0I7QUFDRjtBQUdBLE1BQU0sUUFBUSxDQUFDO0FBQ2YsT0FBTyxzQ0FBc0MsQ0FBQyxPQUFPO0FBQ25ELFFBQU0sS0FBSyxFQUFFO0FBQ2Y7QUFDQSxNQUFNLGdCQUFnQixTQUFTLFlBQVk7QUFDekMsTUFBSSxNQUFNLE9BQVEsT0FBTSxRQUFRLElBQUksTUFBTSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztBQUMzRCxVQUFRLG9CQUFvQjtBQUM5QixHQUFHLEVBQUU7QUFJTCxTQUFTLCtCQUErQixVQUFVLGVBQWU7QUFDL0QsYUFBVyxPQUFPLGVBQWU7QUFDL0IsUUFBSSxRQUFRLGFBQWM7QUFDMUIsVUFBTSxjQUFjLGNBQWMsR0FBRztBQUNyQyxRQUFJLFFBQVEsc0JBQXNCLFdBQVcsR0FBRztBQUs5QyxjQUFRLFNBQVMsYUFBYSxXQUFXLGFBQWEsR0FBRztBQUFBLElBQzNEO0FBQUEsRUFDRjtBQUNGO0FBRUEsU0FBUyx3Q0FBd0MsSUFBSSxhQUFhLGFBQWE7QUFDN0UsUUFBTSxpQkFBaUIsT0FBTyxrQ0FBa0MsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDO0FBQzVFLE1BQ0U7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLElBQ0EsQ0FBQyxRQUFRLE9BQU87QUFBQSxFQUNsQixNQUFNLE1BQ047QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUNBLE1BQ0U7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLElBQ0EsQ0FBQyxRQUFRLE9BQU87QUFBQSxFQUNsQixNQUFNLE1BQ047QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUksYUFBYTtBQUNqQixRQUFNLHFDQUFxQztBQUFBLElBQ3pDO0FBQUEsSUFDQTtBQUFBLElBQ0EsQ0FBQyxLQUFLLFVBQVU7QUFDZCxtQkFBYTtBQUNiLFVBQUksUUFBUSxzQkFBc0IsS0FBSyxFQUFHLFFBQU87QUFDakQsYUFBTyxZQUFZLEdBQUcsTUFBTSxZQUFZLEdBQUc7QUFBQSxJQUM3QztBQUFBLEVBQ0Y7QUFDQSxNQUFJLGNBQWMsdUNBQXVDLE1BQU07QUFDN0Qsa0JBQWM7QUFBQSxFQUNoQixPQUFPO0FBQ0wsV0FBTyw0QkFBNEIsa0NBQWtDO0FBQUEsRUFDdkU7QUFDRjtBQUVBLFNBQVMsa0JBQWtCLGdCQUFnQixlQUFlLFdBQVc7QUFDbkUsYUFBVyxPQUFPLGVBQWU7QUFDL0IsUUFBSSxRQUFRLGFBQWM7QUFDMUIsUUFBSSxlQUFlLFNBQVMsR0FBRyxFQUFHO0FBQ2xDLFVBQU0sT0FBTyxPQUFPLHlCQUF5QixlQUFlLEdBQUc7QUFDL0QsUUFBSSxRQUFRLEtBQUssSUFBSyxRQUFPO0FBQzdCLFFBQUksQ0FBQyxVQUFVLEtBQUssY0FBYyxHQUFHLENBQUMsRUFBRyxRQUFPO0FBQUEsRUFDbEQ7QUFDQSxTQUFPO0FBQ1Q7QUFJQSxTQUFTLGFBQWEsUUFBUTtBQUM1QixTQUFPO0FBQUE7QUFBQSxJQUEwQjtBQUFBO0FBQ25DO0FBRUEsUUFBUSxlQUFlO0FBQ3ZCLFFBQVEsaUNBQWlDO0FBQ3pDLFFBQVEsMENBQ047QUFFRixlQUFlOyIsIm5hbWVzIjpbImhvb2tzIl19