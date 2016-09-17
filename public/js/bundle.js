(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _getinfo = require('./getinfo');

var _getinfo2 = _interopRequireDefault(_getinfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import {data} from './data';

// Filterable CheatSheet Component
//ReactDOM.render( <SearchableTable data={data}/>, document.getElementById('searchableTable') );
_reactDom2.default.render(_react2.default.createElement(_getinfo2.default, null), document.getElementById('getinfo'));
//import SearchableTable from './SearchableTable';

},{"./getinfo":2,"react":"react","react-dom":"react-dom"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Getinfo = function (_React$Component) {
    _inherits(Getinfo, _React$Component);

    function Getinfo(props) {
        _classCallCheck(this, Getinfo);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Getinfo).call(this, props));

        _this.state = {
            data: 'Hola, soy un estado',
            place: '',
            data_: '',
            showResults: false
        };
        return _this;
    }

    _createClass(Getinfo, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            if (window.id) {
                fetch('http://localhost:8080/api/loaduser/' + window.id).then(function (response) {
                    return response.json();
                }).then(function (data2) {
                    _this2.setState({ place: data2.recentplace });
                    _this2.getDataPlease();
                });
            }
        }
    }, {
        key: 'getDataPlease',
        value: function getDataPlease() {
            var _this3 = this;

            //fetch('http://localhost:8080/test')
            fetch('http://localhost:8080/search/' + this.state.place).then(function (response) {
                return response.json();
            }).then(function (data2) {
                _this3.setState({ data_: data2, showResults: true });
                fetch('http://localhost:8080/api/loaduser2/' + window.id + '/' + _this3.state.place, {
                    method: 'POST'
                }).then(function (response) {
                    return response.json();
                });
            });
        }
    }, {
        key: 'changeState',
        value: function changeState() {
            this.setState({
                data: 'Me cambiaron....',
                showResults: true
            });
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            this.setState({ place: e.target.value });
        }
    }, {
        key: '_handleKeyPress',
        value: function _handleKeyPress(e) {
            if (e.key === 'Enter') {
                this.getDataPlease();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    null,
                    window.places
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'searchDiv' },
                    _react2.default.createElement('input', {
                        type: 'text',
                        className: 'form-control',
                        value: this.state.place,
                        onChange: this.handleChange.bind(this),
                        onKeyPress: this._handleKeyPress.bind(this)
                    }),
                    _react2.default.createElement(
                        'button',
                        { className: 'btn btn-primary', onClick: this.getDataPlease.bind(this), value: this.state.place },
                        'Search!'
                    )
                ),
                this.state.showResults ? _react2.default.createElement(Results, { results: this.state.data_ }) : null
            );
        }
    }]);

    return Getinfo;
}(_react2.default.Component);

/* No la usare ahora... pero la dejare igual para poder realizar bien la integracion del search con el jumbortron*/


exports.default = Getinfo;

var Jumbo = function (_React$Component2) {
    _inherits(Jumbo, _React$Component2);

    function Jumbo() {
        _classCallCheck(this, Jumbo);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Jumbo).apply(this, arguments));
    }

    _createClass(Jumbo, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'jumbotron' },
                _react2.default.createElement(
                    'h1',
                    null,
                    'Nightlife Coordination App'
                ),
                _react2.default.createElement(
                    'p',
                    { className: 'desc' },
                    'Welcome to Nightlife Coordination App!, you can search from different places in your area, and confirm that you\'re in!. Just type your place at the search bar below, and then press enter or click the button Search!, to see the results'
                ),
                _react2.default.createElement('br', null),
                window.name,
                _react2.default.createElement(
                    'div',
                    { className: 'btn-container' },
                    _react2.default.createElement('br', null),
                    _react2.default.createElement(
                        'a',
                        { className: 'btn-primary btn', href: '/auth/facebook' },
                        'Log with Facebook'
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'btn-primary btn', href: '/logout' },
                        'Logout'
                    )
                )
            );
        }
    }]);

    return Jumbo;
}(_react2.default.Component);

var Results = function (_React$Component3) {
    _inherits(Results, _React$Component3);

    function Results(props) {
        _classCallCheck(this, Results);

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(Results).call(this, props));

        _this5.state = { active: false, places: [], arr: [] };
        return _this5;
    }
    /*
    componentWillMount(){
        fetch('http://localhost:8080/search/santiago')
        .then((response) => {
            return response.json();
        })
        .then((data2) => {
            console.log(data2);
            this.setState({ 
                active: true,
            });
        })
    }
    */


    _createClass(Results, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            this.fetchData();
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            //fetch('http://localhost:8080/test')
            this.fetchData();
        }
    }, {
        key: 'fetchData',
        value: function fetchData() {
            var _this6 = this;

            if (window.id) {
                fetch('http://localhost:8080/api/load/' + window.id).then(function (response) {
                    return response.json();
                }).then(function (data2) {
                    var dataf = data2.userdata;
                    _this6.setState({ places: dataf.places });
                    var thearray = [];
                    _this6.props.results.businesses.map(function (asd) {
                        asd.assisting = false;
                        asd.going = 0;
                        dataf.places.forEach(function (qwer) {
                            if (qwer === asd.id) asd.assisting = true;
                        });
                        data2.placedata.forEach(function (asdf) {
                            if (asdf.place_id === asd.id) asd.going = asdf.going;
                        });
                        thearray.push(asd);
                    });
                    _this6.setState({ arr: thearray });
                }).catch(function () {
                    console.log("no user to fetch");
                });
            } else {
                fetch('http://localhost:8080/api/load2').then(function (response) {
                    return response.json();
                }).then(function (data2) {
                    var thearray = [];
                    _this6.props.results.businesses.map(function (asd) {
                        asd.assisting = false;
                        asd.going = 0;
                        data2.forEach(function (asdf) {
                            if (asdf.place_id === asd.id) asd.going = asdf.going;
                        });
                        thearray.push(asd);
                    });
                    _this6.setState({ arr: thearray });
                });
            }
        }
    }, {
        key: 'HandleClick',
        value: function HandleClick(index, _id) {
            //e.preventDefault();
            if (window.id) {
                var aux = this.state.arr;
                var that = this;
                var qwerty = new FormData();
                var aux2 = { place: _id };
                qwerty.append("place", _id);

                if (aux[index].assisting) {
                    //true
                    fetch('http://localhost:8080/api/post/' + window.id + '/' + _id, {
                        method: 'delete',
                        body: JSON.stringify(aux2),
                        asd: _id
                    }).then(function () {
                        aux[index].assisting ^= true;
                        aux[index].going -= 1;
                        that.setState({ arr: aux });
                    });
                } else {
                    fetch('http://localhost:8080/api/post/' + window.id + '/' + _id, {
                        method: 'post',
                        body: qwerty
                    }).then(function () {
                        aux[index].assisting ^= true;
                        aux[index].going += 1;
                        that.setState({ arr: aux });
                    });
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this7 = this;

            var rows = [];
            return _react2.default.createElement(
                'div',
                { className: 'results' },
                this.state.arr.map(function (asd, index) {
                    return _react2.default.createElement(Result, {
                        assist: asd.assisting,
                        index: index,
                        key: index,
                        img_url: asd.image_url,
                        name_: asd.name,
                        snippet: asd.snippet_text,
                        place_id: asd.id,
                        going: asd.going,
                        handleClick: _this7.HandleClick.bind(_this7, index, asd.id)
                    });
                })
            );
        }
    }]);

    return Results;
}(_react2.default.Component);

var Result = function (_React$Component4) {
    _inherits(Result, _React$Component4);

    function Result(props) {
        _classCallCheck(this, Result);

        var _this8 = _possibleConstructorReturn(this, Object.getPrototypeOf(Result).call(this, props));

        _this8.state = {
            assist: false
        };
        _this8.handleClick = _this8.handleClick.bind(_this8);
        return _this8;
    }

    _createClass(Result, [{
        key: 'handleClick',
        value: function handleClick() {
            this.setState({ assist: !this.state.assist });
        }
    }, {
        key: 'render',
        value: function render() {
            var aux = this.props;
            var assistans = ' (' + this.props.going + ' assistans)';
            var assisting = this.props.assist ? 'Going!!' + assistans : 'Going?' + assistans;
            var theclass = this.props.assist ? 'btn btn-success' : 'btn btn-primary';

            return _react2.default.createElement(
                'div',
                { className: 'row', key: aux.index },
                _react2.default.createElement(
                    'div',
                    { className: 'img-container col col-sm-4' },
                    _react2.default.createElement('span', { className: 'helper' }),
                    _react2.default.createElement('img', { src: aux.img_url })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'descrip col col-sm-8' },
                    _react2.default.createElement(
                        'h3',
                        null,
                        aux.name_
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        aux.snippet
                    ),
                    _react2.default.createElement(
                        'button',
                        {
                            className: theclass,
                            onClick: this.props.handleClick },
                        assisting
                    )
                )
            );
        }
    }]);

    return Result;
}(_react2.default.Component);

},{"react":"react"}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanN4L2Jhc2UuanMiLCJhcHAvanN4L2dldGluZm8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7OztBQUtBLG1CQUFTLE1BQVQsQ0FBaUIsc0RBQWpCLEVBQThCLFNBQVMsY0FBVCxDQUF3QixTQUF4QixDQUE5Qjs7Ozs7Ozs7Ozs7O0FDUkE7Ozs7Ozs7Ozs7OztJQUdxQixPOzs7QUFDakIscUJBQVksS0FBWixFQUFrQjtBQUFBOztBQUFBLCtGQUNSLEtBRFE7O0FBRWQsY0FBSyxLQUFMLEdBQWE7QUFDVCxrQkFBTyxxQkFERTtBQUVULG1CQUFPLEVBRkU7QUFHVCxtQkFBUSxFQUhDO0FBSVQseUJBQWE7QUFKSixTQUFiO0FBRmM7QUFRakI7Ozs7NkNBQ21CO0FBQUE7O0FBQ2hCLGdCQUFHLE9BQU8sRUFBVixFQUFhO0FBQ1Qsc0JBQU0sd0NBQXNDLE9BQU8sRUFBbkQsRUFDQyxJQURELENBQ00sVUFBQyxRQUFELEVBQWM7QUFDaEIsMkJBQU8sU0FBUyxJQUFULEVBQVA7QUFDSCxpQkFIRCxFQUlDLElBSkQsQ0FJTSxVQUFDLEtBQUQsRUFBVztBQUNiLDJCQUFLLFFBQUwsQ0FBYyxFQUFFLE9BQU8sTUFBTSxXQUFmLEVBQWQ7QUFDQSwyQkFBSyxhQUFMO0FBQ0gsaUJBUEQ7QUFRSDtBQUNKOzs7d0NBQ2M7QUFBQTs7O0FBRVgsa0JBQU0sa0NBQWdDLEtBQUssS0FBTCxDQUFXLEtBQWpELEVBQ0MsSUFERCxDQUNNLFVBQUMsUUFBRCxFQUFjO0FBQ2hCLHVCQUFPLFNBQVMsSUFBVCxFQUFQO0FBQ0gsYUFIRCxFQUlDLElBSkQsQ0FJTSxVQUFDLEtBQUQsRUFBVztBQUNiLHVCQUFLLFFBQUwsQ0FBYyxFQUFFLE9BQVEsS0FBVixFQUFpQixhQUFhLElBQTlCLEVBQWQ7QUFDQSxzQkFBTSx5Q0FBdUMsT0FBTyxFQUE5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VyxLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLGlCQUFwQixHQUF3QyxpQkFBekQ7O0FBRUEsbUJBQ0k7QUFBQTtnQkFBQSxFQUFLLFdBQVUsS0FBZixFQUFxQixLQUFLLElBQUksS0FBOUI7Z0JBQ0k7QUFBQTtvQkFBQSxFQUFLLFdBQVUsNEJBQWY7b0JBQ0ksd0NBQU0sV0FBVSxRQUFoQixHQURKO29CQUVJLHVDQUFLLEtBQUssSUFBSSxPQUFkO0FBRkosaUJBREo7Z0JBS0k7QUFBQTtvQkFBQSxFQUFLLFdBQVUsc0JBQWY7b0JBQ0k7QUFBQTt3QkFBQTt3QkFBSyxJQUFJO0FBQVQscUJBREo7b0JBRUk7QUFBQTt3QkFBQTt3QkFBSSxJQUFJO0FBQVIscUJBRko7b0JBR0k7QUFBQTt3QkFBQTtBQUNJLHVDQUFXLFFBRGY7QUFFSSxxQ0FBUyxLQUFLLEtBQUwsQ0FBVyxXQUZ4Qjt3QkFFc0M7QUFGdEM7QUFISjtBQUxKLGFBREo7QUFlSDs7OztFQWhDZ0IsZ0JBQU0sUyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG4vL2ltcG9ydCBTZWFyY2hhYmxlVGFibGUgZnJvbSAnLi9TZWFyY2hhYmxlVGFibGUnO1xuaW1wb3J0IEdldEluZm8gZnJvbSAnLi9nZXRpbmZvJztcbi8vaW1wb3J0IHtkYXRhfSBmcm9tICcuL2RhdGEnO1xuXG4vLyBGaWx0ZXJhYmxlIENoZWF0U2hlZXQgQ29tcG9uZW50XG4vL1JlYWN0RE9NLnJlbmRlciggPFNlYXJjaGFibGVUYWJsZSBkYXRhPXtkYXRhfS8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VhcmNoYWJsZVRhYmxlJykgKTtcblJlYWN0RE9NLnJlbmRlciggPEdldEluZm8gLz4sIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnZXRpbmZvJykgKTtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7IFxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdldGluZm8gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IFxuICAgICAgICAgICAgZGF0YSA6ICdIb2xhLCBzb3kgdW4gZXN0YWRvJyxcbiAgICAgICAgICAgIHBsYWNlOiAnJyxcbiAgICAgICAgICAgIGRhdGFfIDogJycsXG4gICAgICAgICAgICBzaG93UmVzdWx0czogZmFsc2VcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbE1vdW50KCl7XG4gICAgICAgIGlmKHdpbmRvdy5pZCl7XG4gICAgICAgICAgICBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2FkdXNlci8nK3dpbmRvdy5pZClcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEyKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHBsYWNlOiBkYXRhMi5yZWNlbnRwbGFjZSB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmdldERhdGFQbGVhc2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldERhdGFQbGVhc2UoKXtcbiAgICAgICAgLy9mZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo4MDgwL3Rlc3QnKVxuICAgICAgICBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo4MDgwL3NlYXJjaC8nK3RoaXMuc3RhdGUucGxhY2UpXG4gICAgICAgIC50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGRhdGEyKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgZGF0YV8gOiBkYXRhMiwgc2hvd1Jlc3VsdHM6IHRydWUgfSk7XG4gICAgICAgICAgICBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2FkdXNlcjIvJyt3aW5kb3cuaWQrJy8nK3RoaXMuc3RhdGUucGxhY2Use1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH1cbiAgICBjaGFuZ2VTdGF0ZSgpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGE6ICdNZSBjYW1iaWFyb24uLi4uJyxcbiAgICAgICAgICAgIHNob3dSZXN1bHRzOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgaGFuZGxlQ2hhbmdlKGUpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgcGxhY2U6IGUudGFyZ2V0LnZhbHVlIH0pO1xuICB9XG4gIF9oYW5kbGVLZXlQcmVzcyhlKSB7XG4gICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgIHRoaXMuZ2V0RGF0YVBsZWFzZSgpO1xuICAgIH1cbiAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2Pnt3aW5kb3cucGxhY2VzfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2VhcmNoRGl2XCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLnN0YXRlLnBsYWNlfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlQcmVzcz17dGhpcy5faGFuZGxlS2V5UHJlc3MuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17dGhpcy5nZXREYXRhUGxlYXNlLmJpbmQodGhpcyl9IHZhbHVlPXt0aGlzLnN0YXRlLnBsYWNlfT5TZWFyY2ghPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLnNob3dSZXN1bHRzID8gPFJlc3VsdHMgcmVzdWx0cz17dGhpcy5zdGF0ZS5kYXRhX30gLz4gOiBudWxsIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuLyogTm8gbGEgdXNhcmUgYWhvcmEuLi4gcGVybyBsYSBkZWphcmUgaWd1YWwgcGFyYSBwb2RlciByZWFsaXphciBiaWVuIGxhIGludGVncmFjaW9uIGRlbCBzZWFyY2ggY29uIGVsIGp1bWJvcnRyb24qL1xuY2xhc3MgSnVtYm8gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnR7XG4gICAgcmVuZGVyKCl7XG4gICAgICAgIHJldHVybihcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJqdW1ib3Ryb25cIj5cbiAgICAgICAgICAgIDxoMT5OaWdodGxpZmUgQ29vcmRpbmF0aW9uIEFwcDwvaDE+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJkZXNjXCI+V2VsY29tZSB0byBOaWdodGxpZmUgQ29vcmRpbmF0aW9uIEFwcCEsIHlvdSBjYW4gc2VhcmNoIGZyb20gZGlmZmVyZW50IHBsYWNlcyBpbiB5b3VyIGFyZWEsIGFuZCBjb25maXJtIHRoYXQgeW91J3JlIGluIS4gSnVzdCB0eXBlIHlvdXIgcGxhY2UgYXQgdGhlIHNlYXJjaCBiYXIgYmVsb3csIGFuZCB0aGVuIHByZXNzIGVudGVyIG9yIGNsaWNrIHRoZSBidXR0b24gU2VhcmNoISwgdG8gc2VlIHRoZSByZXN1bHRzPC9wPlxuICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgIHsvKmlmKHdpbmRvdy5uYW1lKSByZXR1cm4oaG9sYSk7XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4oY2hhbyk7XG4gICAgICAgICAgICAqL31cbiAgICAgICAgICAgIHt3aW5kb3cubmFtZX1cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYnRuLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4tcHJpbWFyeSBidG5cIiBocmVmPVwiL2F1dGgvZmFjZWJvb2tcIj5Mb2cgd2l0aCBGYWNlYm9vazwvYT5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4tcHJpbWFyeSBidG5cIiBocmVmPVwiL2xvZ291dFwiPkxvZ291dDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNsYXNzIFJlc3VsdHMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IGFjdGl2ZTogZmFsc2UsIHBsYWNlczogW10sIGFycjogW10gfTtcbiAgICB9XG4gICAgLypcbiAgICBjb21wb25lbnRXaWxsTW91bnQoKXtcbiAgICAgICAgZmV0Y2goJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9zZWFyY2gvc2FudGlhZ28nKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChkYXRhMikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YTIpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IFxuICAgICAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgIH1cbiAgICAqL1xuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKXtcbiAgICAgICAgdGhpcy5mZXRjaERhdGEoKTtcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbE1vdW50KCl7XG4gICAgICAgICAgICAgICAgLy9mZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo4MDgwL3Rlc3QnKVxuICAgICAgICB0aGlzLmZldGNoRGF0YSgpO1xuICAgIH1cbiAgICBmZXRjaERhdGEoKXtcbiAgICAgICAgaWYod2luZG93LmlkKXtcbiAgICAgICAgICAgIGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpL2xvYWQvJyt3aW5kb3cuaWQpXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhMikgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhZiA9IGRhdGEyLnVzZXJkYXRhO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBwbGFjZXM6IGRhdGFmLnBsYWNlcyB9KTtcbiAgICAgICAgICAgICAgICB2YXIgdGhlYXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnJlc3VsdHMuYnVzaW5lc3Nlcy5tYXAoKGFzZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhc2QuYXNzaXN0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGFzZC5nb2luZyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFmLnBsYWNlcy5mb3JFYWNoKGZ1bmN0aW9uKHF3ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHF3ZXIgPT09IGFzZC5pZCkgYXNkLmFzc2lzdGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBkYXRhMi5wbGFjZWRhdGEuZm9yRWFjaCgoYXNkZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYXNkZi5wbGFjZV9pZCA9PT0gYXNkLmlkKSBhc2QuZ29pbmcgPSBhc2RmLmdvaW5nO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICB0aGVhcnJheS5wdXNoKGFzZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGFycjogdGhlYXJyYXkgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vIHVzZXIgdG8gZmV0Y2hcIik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9sb2FkMicpXG4gICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKChkYXRhMikgPT4ge1xuICAgICAgICAgICAgICAgIHZhciB0aGVhcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucmVzdWx0cy5idXNpbmVzc2VzLm1hcCgoYXNkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFzZC5hc3Npc3RpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYXNkLmdvaW5nID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZGF0YTIuZm9yRWFjaCgoYXNkZikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYXNkZi5wbGFjZV9pZCA9PT0gYXNkLmlkKSBhc2QuZ29pbmcgPSBhc2RmLmdvaW5nO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICB0aGVhcnJheS5wdXNoKGFzZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGFycjogdGhlYXJyYXkgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIEhhbmRsZUNsaWNrKGluZGV4LCBfaWQpe1xuICAgICAgICAvL2UucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYod2luZG93LmlkKXtcbiAgICAgICAgICAgIHZhciBhdXggPSB0aGlzLnN0YXRlLmFycjtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgICAgIHZhciBxd2VydHkgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICAgIHZhciBhdXgyID0geyBwbGFjZTogX2lkIH07XG4gICAgICAgICAgICBxd2VydHkuYXBwZW5kKFwicGxhY2VcIiwgX2lkKTtcblxuICAgICAgICAgICAgaWYoYXV4W2luZGV4XS5hc3Npc3RpbmcpeyAvL3RydWVcbiAgICAgICAgICAgICAgICBmZXRjaCgnaHR0cDovL2xvY2FsaG9zdDo4MDgwL2FwaS9wb3N0Lycrd2luZG93LmlkKycvJytfaWQse1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdkZWxldGUnLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShhdXgyKSxcbiAgICAgICAgICAgICAgICAgICAgYXNkOiBfaWRcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBhdXhbaW5kZXhdLmFzc2lzdGluZyBePSB0cnVlOyBcbiAgICAgICAgICAgICAgICAgICAgYXV4W2luZGV4XS5nb2luZyAtPSAxO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnNldFN0YXRlKHsgYXJyOiBhdXggfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGZldGNoKCdodHRwOi8vbG9jYWxob3N0OjgwODAvYXBpL3Bvc3QvJyt3aW5kb3cuaWQrJy8nK19pZCx7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiBxd2VydHkgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgYXV4W2luZGV4XS5hc3Npc3RpbmcgXj0gdHJ1ZTsgXG4gICAgICAgICAgICAgICAgICAgIGF1eFtpbmRleF0uZ29pbmcgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zZXRTdGF0ZSh7IGFycjogYXV4IH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIHJvd3MgPSBbXTtcbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZXN1bHRzXCI+XG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuYXJyLm1hcCgoYXNkLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmVzdWx0IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzaXN0PXthc2QuYXNzaXN0aW5nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg9e2luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ191cmw9e2FzZC5pbWFnZV91cmx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lXz17YXNkLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbmlwcGV0PXthc2Quc25pcHBldF90ZXh0fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2VfaWQ9e2FzZC5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdvaW5nPXthc2QuZ29pbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVDbGljaz17dGhpcy5IYW5kbGVDbGljay5iaW5kKHRoaXMsIGluZGV4LCBhc2QuaWQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSl9IFxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuY2xhc3MgUmVzdWx0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKXtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgYXNzaXN0OiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5oYW5kbGVDbGljay5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICBoYW5kbGVDbGljaygpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHsgYXNzaXN0OiAhdGhpcy5zdGF0ZS5hc3Npc3QgfSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgYXV4ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgYXNzaXN0YW5zID0gJyAoJyt0aGlzLnByb3BzLmdvaW5nKycgYXNzaXN0YW5zKSc7XG4gICAgICAgIGNvbnN0IGFzc2lzdGluZyA9IHRoaXMucHJvcHMuYXNzaXN0ID8gJ0dvaW5nISEnK2Fzc2lzdGFucyA6ICdHb2luZz8nK2Fzc2lzdGFucztcbiAgICAgICAgY29uc3QgdGhlY2xhc3MgPSB0aGlzLnByb3BzLmFzc2lzdCA/ICdidG4gYnRuLXN1Y2Nlc3MnIDogJ2J0biBidG4tcHJpbWFyeSc7XG5cbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIiBrZXk9e2F1eC5pbmRleH0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbWctY29udGFpbmVyIGNvbCBjb2wtc20tNFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoZWxwZXJcIiA+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz17YXV4LmltZ191cmx9Lz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRlc2NyaXAgY29sIGNvbC1zbS04XCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMz57YXV4Lm5hbWVffTwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxwPnthdXguc25pcHBldH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17dGhlY2xhc3N9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLnByb3BzLmhhbmRsZUNsaWNrfT57YXNzaXN0aW5nfTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG4iXX0=
