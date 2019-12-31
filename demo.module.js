"use strict";

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _readline = _interopRequireDefault(require("readline"));

var _build = _interopRequireDefault(require("./build"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const FocusContext = _react.default.createContext({});

function useFocus(ref) {
  const focusContext = (0, _react.useContext)(FocusContext);
  (0, _react.useEffect)(() => {
    // register as focusable element
    focusContext.register(ref);
  }, []);
  return focusContext.hasFocus(ref);
}

function TextInputWithFocus(props) {
  // Code that should be used in "inputable" libraries
  const ref = (0, _react.useRef)(null);
  const hasFocus = useFocus(ref);
  return _react.default.createElement(_build.default, _extends({
    ref: ref,
    focus: hasFocus
  }, props));
}

function App({
  children
}) {
  const [elementList, setElementList] = (0, _react.useState)([]);
  const [focusedIndex, setFocusedIndex] = (0, _react.useState)(0);

  function register(ref) {
    elementList.push(ref);
    setElementList(elementList.slice(0)); // don't alter elementList reference, but clone the array
  }

  function hasFocus(ref) {
    return focusedIndex === elementList.findIndex(e => e === ref);
  }

  function focusPrevious(input) {
    let newIndex = focusedIndex - 1;

    if (newIndex < 0) {
      newIndex = elementList.length - 1;
    }

    setFocusedIndex(newIndex);
  }

  function focusNext(input) {
    let newIndex = focusedIndex + 1;

    if (newIndex >= elementList.length) {
      newIndex = 0;
    }

    setFocusedIndex(newIndex);
  }

  (0, _ink.useInput)((input, key) => {
    if (key.return) {
      // should be "tab" but we need something to tell the subcomponent to not respond in this case + tab is not mapped by ink
      if (key.shift) {
        // "shift" is not working
        focusPrevious();
      } else {
        focusNext();
      }
    }
  });
  return _react.default.createElement(FocusContext.Provider, {
    value: {
      register,
      hasFocus
      /*, focusNext, focusPrevious */

    }
  }, children, _react.default.createElement(_ink.Color, {
    gray: true
  }, _react.default.createElement(_ink.Box, {
    flexDirection: "column"
  }, _react.default.createElement(_ink.Box, null, "-----------------------------"), _react.default.createElement(_ink.Box, null, "Debug:"), _react.default.createElement(_ink.Box, null, "Nb focusable elements : ", elementList.length), _react.default.createElement(_ink.Box, null, "Focused index : ", focusedIndex))));
}

function SearchQuery() {
  const [name, setName] = (0, _react.useState)("");
  const [quest, setQuest] = (0, _react.useState)("");
  const [favoriteColor, setFavoriteColor] = (0, _react.useState)("");
  return _react.default.createElement(App, null, _react.default.createElement(_ink.Box, {
    flexDirection: "column"
  }, _react.default.createElement(_ink.Box, null, " "), _react.default.createElement(_ink.Box, null, "============================="), _react.default.createElement(_ink.Box, null, _react.default.createElement(_ink.Box, {
    marginRight: 1
  }, "What's your name ?"), _react.default.createElement(TextInputWithFocus, {
    value: name,
    onChange: setName
  })), _react.default.createElement(_ink.Box, null, _react.default.createElement(_ink.Box, {
    marginRight: 1
  }, "What is your quest ?"), _react.default.createElement(TextInputWithFocus, {
    value: quest,
    onChange: setQuest
  })), _react.default.createElement(_ink.Box, null, _react.default.createElement(_ink.Box, {
    marginRight: 1
  }, "What is your favorite color ?"), _react.default.createElement(TextInputWithFocus, {
    value: favoriteColor,
    onChange: setFavoriteColor
  }))));
}

(0, _ink.render)(_react.default.createElement(SearchQuery, null), {
  debug: false
});

