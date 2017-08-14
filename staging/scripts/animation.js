'use strict';
var _classCallCheck2 = require( 'babel-runtime/helpers/classCallCheck' );
var _classCallCheck3 = _interopRequireDefault( _classCallCheck2 );
var _createClass2 = require( 'babel-runtime/helpers/createClass' );
var _createClass3 = _interopRequireDefault( _createClass2 );
function _interopRequireDefault( obj ) { return obj && obj.__esModule ? obj : { default: obj }; }
var Animation = function() {
    function Animation() {
        var _this = this;
        (0, _classCallCheck3.default)( this, Animation );
        this.add = function( element, from, to, direct, type ) {
            var unit = arguments.length > 5 && arguments[ 5 ] !== undefined ? arguments[ 5 ] : 'px';
            var duration = arguments.length > 6 && arguments[ 6 ] !== undefined ? arguments[ 6 ] : 500;
            switch ( type ) {
                case 'translate':
                    _this.timers.push( _this.translate( element, from, to, direct, unit, duration ) );
                    break;
            }
            _this.start();
        };
        this.tick = function() {
            var i = 0;
            var timer = void 0;
            for ( ; i < _this.timers.length; i++ ) {
                timer = _this.timers[ i ];
                if ( !timer() && _this.timers[ i ] === timer ) {
                    _this.timers.splice( i--, 1 );
                }
                if ( _this.timers.length === 0 ) {
                    _this.stop();
                }
            }
        };
        this.start = function() {
            if ( !_this.timerId ) {
                _this.timerId = setInterval( _this.tick, _this.interval );
            }
        };
        this.stop = function() {
            clearInterval( _this.timerId );
            _this.timers = [];
            _this.timerId = 0;
        };
        this.interval = 13;
        this.timerId = 0;
        this.timers = [];
    }

    (0, _createClass3.default)( Animation, [ {
        key  : 'translate',
        value: function translate( element, from, to, direct, unit, duration ) {
            var start = +new Date();
            return function() {
                var progress = void 0,
                cur = void 0;
                var cur_time = +new Date();
                var done = true;
                progress = (cur_time - start) / duration;
                cur = (to - from) * progress;
                if ( cur >= to ) {
                    cur = to;
                    done = false;
                }
                element.style[ direct ] = cur + unit;
                return done;
            };
        }
    } ] );
    return Animation;
}();
module.exports = new Animation();
//# sourceMappingURL=animation.js.map
