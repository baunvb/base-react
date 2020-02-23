'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _SvgIcon = require('material-ui/SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SvgIconCustom = global.__MUI_SvgIcon__ || _SvgIcon2.default;

var _ref = _react2.default.createElement('path', 
{ d: "M10 2.94737V3.44737H10.5H13.5C14.0647 3.44737 14.5 3.88761 14.5 4.42105V12.5263C14.5 13.0598 14.0647 13.5 13.5 13.5H1.5C0.935337 13.5 0.500115 13.0599 0.5 12.5265C0.5 12.5265 0.5 12.5264 0.5 12.5263L0.5075 4.42151V4.42105C0.5075 3.88436 0.938559 3.44737 1.5 3.44737H4.5H5V2.94737V1.47368C5 0.940238 5.43526 0.5 6 0.5H9C9.56474 0.5 10 0.940238 10 1.47368V2.94737ZM9 3.44737H9.5V2.94737V1.47368V0.973684H9H6H5.5V1.47368V2.94737V3.44737H6H9Z", stroke:"#8C8C8C"
});

var StorageIcon = function StorageIcon(props) {
  return _react2.default.createElement(
    SvgIconCustom,
    props,
    _ref
  );
};

StorageIcon = (0, _pure2.default)(StorageIcon);
StorageIcon.muiName = 'SvgIcon';

exports.default = StorageIcon;