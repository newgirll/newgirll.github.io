(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// firebase interactive-map

var FireBase = function () {
    function FireBase() {
        var _this = this;

        _classCallCheck(this, FireBase);

        this.config = {
            apiKey: "AIzaSyAdWKgrquitVPYVZaieV2ZZFJKC95Iel98",
            authDomain: "interactive-map-f5060.firebaseapp.com",
            databaseURL: "https://interactive-map-f5060.firebaseio.com",
            projectId: "interactive-map-f5060",
            storageBucket: "interactive-map-f5060.appspot.com",
            messagingSenderId: "595861650630"
        };
        this.firebase = firebase.initializeApp(this.config);
        this.database = this.firebase.database();

        //elementy do logowania
        this.logIn = document.getElementById("logIn");
        this.signIn = document.getElementById("signIn");
        this.logOut = document.getElementById("logOut");
        this.btnSendSign = document.getElementById("sendSignIn");
        this.btnSendLog = document.getElementById("sendLogIn");
        this.form = document.getElementById("signInForm");
        this.array = [];

        //pokaz formularz do logowania
        this.logIn.addEventListener("click", function (e) {
            document.getElementById('logInForm').style.display = "block";
        });
        // this.logOut.classList.add("hide");


        //wylogowanie sie uzytkownika
        this.logOut.addEventListener("click", function (e) {
            _this.firebase.auth().signOut();
        });

        //pokaz formularz do rejestracji
        this.signIn.addEventListener("click", function (e) {

            _this.form.style.display = "block";
        });

        //zalogowanie uzytkownika
        this.btnSendLog.addEventListener("click", function (e) {
            e.preventDefault();
            var passw = document.getElementById("password").value;
            var email = document.getElementById("email").value;
            var auth = _this.firebase.auth();

            var promise = auth.signInWithEmailAndPassword(email, passw);
            promise.catch(function (e) {
                return console.log(e.message);
            });
        });

        //rejestracja nowego uzytkownika
        this.btnSendSign.addEventListener("click", function (e) {
            e.preventDefault();
            var passw = document.getElementById("password").value;
            var email = document.getElementById("email").value;
            var auth = _this.firebase.auth();

            var promise = auth.createUserWithEmailAndPassword(email, passw);
            promise.catch(function (e) {
                return console.log(e.message);
            });

            if (_this.form.style.display !== "none") {
                _this.form.style.display = "none";
            }
        });
    }

    _createClass(FireBase, [{
        key: "newUserSign",
        value: function newUserSign() {
            var _this2 = this;

            this.firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    console.log(user + "logged in" + _this2.firebase.auth().currentUser.uid);
                    _this2.logOut.classList.remove("hide");
                } else {
                    console.log('not logged in');
                    _this2.logOut.classList.add("hide");
                }
            });
        }
    }]);

    return FireBase;
}();

exports.FireBase = FireBase;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Lists = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MapSetup2 = require("./MapSetup");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Lists = function (_MapSetup) {
    _inherits(Lists, _MapSetup);

    function Lists() {
        _classCallCheck(this, Lists);

        var _this = _possibleConstructorReturn(this, (Lists.__proto__ || Object.getPrototypeOf(Lists)).call(this));

        _this.listSection = document.querySelector(".list__box");
        _this.visitedList = document.querySelector("#listVisited");
        _this.wishList = document.querySelector("#listWish");
        _this.visitBtn = document.querySelector("#addToVisit");
        _this.addVisitedBtn = _this.visitBtn.previousElementSibling;
        _this.btnListExit = document.querySelector("#exitList");

        _this.btnListExit.addEventListener("click", function () {
            return _this.hideElement(_this.listSection);
        });

        _this.visitBtn.addEventListener("click", function () {
            _this.showSection(_this.listSection, '120%');
            _this.scrollIt(_this.listSection);
            _this.swichListItem(_this.wishList);
        });

        _this.addVisitedBtn.addEventListener("click", function () {
            _this.showSection(_this.listSection, '120%');
            _this.scrollIt(_this.listSection);
            _this.swichListItem(_this.visitedList);
        });
        return _this;
    }

    _createClass(Lists, [{
        key: "swichListItem",
        value: function swichListItem(parent) {
            var country = this.listEl[0].innerText;
            this.addItemToList(parent, country, '');

            // saveDataToDB(country);
        }

        // dodanie do listy życzeń

        //          function saveDataToDB(item, user) {
        //             array.push(item);

        //             database.ref('item').set({
        //                 country: array,

        //             })
        //             database.ref('user').set({
        //                 user: firebase.auth().currentUser.uid,

        //             })
        //   }


    }]);

    return Lists;
}(_MapSetup2.MapSetup);

exports.Lists = Lists;

},{"./MapSetup":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Map = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _MapSetup2 = require("./MapSetup");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Map = function (_MapSetup) {
    _inherits(Map, _MapSetup);

    function Map() {
        _classCallCheck(this, Map);

        var _this = _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).call(this));

        _this.sectionSec = document.querySelector("#secondSec");
        _this.leftBox = document.querySelector("#leftBox");
        _this.title.addEventListener("keyup", function (e) {
            if (e.keyCode === 13) {
                _this.viewCountry(event);
                _this.turnOffSearchBtn();
            }
        });

        if (_this.sectionSec.style.display !== "none") {
            _this.title.addEventListener("input", function () {
                // this.resetListElements(this.listSpans)
            });
        }

        _this.exit = document.querySelector("#exitBtn");
        _this.exit.addEventListener("click", function () {
            _this.hideElement(_this.sectionSec);
            location.reload();
            _this.turnOffSearchBtn();
        });

        [].concat(_toConsumableArray(_this.countryMap)).map(function (country) {
            country.addEventListener("click", function (e) {
                _this.attribute = e.target.getAttribute("title");
                e.preventDefault();
                _this.hideElement(_this.list);
                _this.selectCountries(_this.attribute);
                _this.showSection(_this.sectionSec, '5%');
                _this.viewCountry(event, _this.countryMap, _this.smallMap, _this.title.value, _this.attribute);
            });
        });

        return _this;
    }

    _createClass(Map, [{
        key: "blinkMap",
        value: function blinkMap() {
            _get(Map.prototype.__proto__ || Object.getPrototypeOf(Map.prototype), "blinkMap", this).call(this, this.countryMap);
        }
    }, {
        key: "selectCountries",
        value: function selectCountries(attr) {
            var _this2 = this;

            _get(Map.prototype.__proto__ || Object.getPrototypeOf(Map.prototype), "selectCountries", this).call(this);
            [].concat(_toConsumableArray(this.countriesBox)).map(function (country) {
                if (_this2.title.value === country.name || attr === country.name) {
                    var languages = country.languages,
                        currencies = country.currencies;


                    _this2.addItemToList(_this2.listEl[0], country.name);
                    _this2.addItemToList(_this2.listEl[1], country.capital);

                    [].concat(_toConsumableArray(currencies)).forEach(function (currency) {
                        _this2.addItemToList(_this2.listEl[2], currency.name);
                    });

                    [].concat(_toConsumableArray(languages)).forEach(function (language) {
                        _this2.addItemToList(_this2.listEl[3], language.name);
                    });

                    _this2.addItemToList(_this2.listEl[4], country.population);

                    _this2.leftBox.style.backgroundImage = "url(" + country.flag + ")";
                    _this2.leftBox.classList.add("leftBoxBackground");
                }
            });
        }
    }, {
        key: "viewCountry",
        value: function viewCountry(e, countriesArrayOne, countriesArrayTwo, input, clickedCountry) {
            e.preventDefault();
            this.hideElement(this.list);
            this.selectCountries();
            this.showSection(this.sectionSec, '5%');
            _get(Map.prototype.__proto__ || Object.getPrototypeOf(Map.prototype), "viewCountry", this).call(this, event, this.countryMap, this.smallMap, this.title.value, this.attribute);
        }
    }, {
        key: "turnOffSearchBtn",
        value: function turnOffSearchBtn() {
            if (this.sectionSec.style.display !== "none") {
                this.btnSearch.setAttribute("disabled", "true");
            } else {
                this.btnSearch.setAttribute("disabled", "false");
            }
        }
    }, {
        key: "resetListElements",
        value: function resetListElements(element) {
            [].concat(_toConsumableArray(element)).forEach(function (el) {
                el.innerText = " ";
            });
        }
    }]);

    return Map;
}(_MapSetup2.MapSetup);

exports.Map = Map;

},{"./MapSetup":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapSetup = function () {
    function MapSetup() {
        _classCallCheck(this, MapSetup);

        this.countryMap = document.querySelector("#map").children;
        this.smallMap = document.querySelector("#mapSec").children;
        this.listOfCountry = document.querySelector("#countryList");
        this.listEl = this.listOfCountry.children;
        this.listSpans = document.querySelectorAll('.countryInfo');
        this.title = document.querySelector("#countryName");
        this.toolTip = document.querySelector("#toolTip");
        this.header = document.querySelector("#header");
        this.button = document.querySelector(".btnAdd");
        this.btnSearch = document.querySelector("#btn");
        this.list = header.querySelector("ul");
        this.countries = [];
        this.smallCountries = [];
        this.countriesBox = [];
        this.attribute = "";
    }

    _createClass(MapSetup, [{
        key: "createArrayBigMap",
        value: function createArrayBigMap() {
            var _this = this;

            return [].concat(_toConsumableArray(this.countryMap)).forEach(function (country) {
                if (typeof country !== 'undefined') {
                    _this.countries.push({ id: country.id, title: country.getAttribute("title") });
                    return _this.countries;
                }
            });
        }
    }, {
        key: "createArraySmallMap",
        value: function createArraySmallMap() {
            var _this2 = this;

            return [].concat(_toConsumableArray(this.smallMap)).forEach(function (country) {
                if (typeof country !== 'undefined') {
                    _this2.smallCountries.push({ id: country.id, title: country.getAttribute("title") });
                    return _this2.smallCountries;
                }
            });
        }
    }, {
        key: "mousePosition",
        value: function mousePosition(e) {
            return window.onmousemove = function (e) {
                return { x: e.clientX, y: e.clientY };
            };
        }
    }, {
        key: "showSection",
        value: function showSection(section, positionTop) {
            section.style.display = 'block';
            section.style.opacity = '1';
            section.style.top = positionTop;
        }
    }, {
        key: "hideElement",
        value: function hideElement(element) {
            element.style.display = 'none';
        }
    }, {
        key: "selectCountries",
        value: function selectCountries() {
            var _this3 = this;

            return fetch("https://restcountries.eu/rest/v2/all").then(function (res) {
                return res.json();
            }).then(function (data) {
                data.map(function (item) {
                    _this3.countriesBox.push(item);
                    return _this3.countriesBox;
                });
            }).catch(function (error) {
                return console.log('fail', error);
            });
        }
    }, {
        key: "blinkMap",
        value: function blinkMap(countriesArray) {
            var _this4 = this;

            [].concat(_toConsumableArray(countriesArray)).forEach(function (country) {
                country.addEventListener("mouseenter", function (e) {

                    e.target.classList.add("visibleCountry");
                    _this4.toolTip.innerText = country.getAttribute("title");
                    _this4.title.innerText = country.getAttribute("title");

                    _this4.toolTip.style.display = "block";
                    _this4.toolTip.style.top = _this4.mousePosition(window.event).y + "px";
                    _this4.toolTip.style.transform = "translate(0,100%)";
                    _this4.toolTip.style.left = _this4.mousePosition(window.event).x + "px";
                });
                country.addEventListener("mouseleave", function (e) {
                    e.target.classList.remove("visibleCountry");
                    _this4.toolTip.style.display = "none";
                });
            });
        }
    }, {
        key: "addItemToList",
        value: function addItemToList(parent, item) {
            var newSpan = document.createElement("span");
            newSpan.classList.add("countryInfo");
            newSpan.innerText = item;
            parent.appendChild(newSpan);
        }
    }, {
        key: "viewCountry",
        value: function viewCountry(e, countriesArrayOne, countriesArrayTwo, input, clickedCountry) {
            [].concat(_toConsumableArray(countriesArrayOne)).forEach(function (country) {
                var titleOfCountry = country.getAttribute("title");
                if (titleOfCountry === input || titleOfCountry === clickedCountry) {
                    country.classList.add("visibleCountry");
                }
            });
            [].concat(_toConsumableArray(countriesArrayTwo)).forEach(function (country) {
                var titleOfCountry = country.getAttribute("title");
                if (titleOfCountry === input || titleOfCountry === clickedCountry) {
                    country.classList.add("visibleCountry");
                }
            });
        }
    }, {
        key: "scrollIt",
        value: function scrollIt(element) {
            window.scrollTo({
                'behavior': 'smooth',
                'top': element.offsetTop
            });
        }
    }]);

    return MapSetup;
}();

exports.MapSetup = MapSetup;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ToolTips = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MapSetup2 = require("./MapSetup");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToolTips = function (_MapSetup) {
    _inherits(ToolTips, _MapSetup);

    function ToolTips() {
        _classCallCheck(this, ToolTips);

        var _this = _possibleConstructorReturn(this, (ToolTips.__proto__ || Object.getPrototypeOf(ToolTips)).call(this));

        _this.arrayOfLi = [];
        _this.tipsBtn = document.querySelector("#tipBtn");
        _this.tipsText = "";

        _this.tipsBtn.addEventListener("click", function (e) {
            if (_this.list.getAttribute("class") !== "tips") {
                _this.createTableTips();
            } else {
                _this.hideElement(_this.list);
                e.target.setAttribute("disabled", "true");
            }
        });

        return _this;
    }

    _createClass(ToolTips, [{
        key: "createTableTips",
        value: function createTableTips() {
            var _this2 = this;

            this.list.classList.add("tips");
            [].concat(_toConsumableArray(this.countryMap)).map(function (el) {
                _this2.attribute = el.getAttribute("title");
                var newLi = document.createElement("li");
                newLi.classList.add("tipsElement");
                _this2.list.appendChild(newLi);
                newLi.innerText = _this2.attribute;
                header.appendChild(_this2.list);
                _this2.arrayOfLi.push(newLi);
            });
        }
    }, {
        key: "showCountryFromTableTips",
        value: function showCountryFromTableTips() {
            var _this3 = this;

            [].concat(_toConsumableArray(this.arrayOfLi)).forEach(function (tip) {
                tip.addEventListener("click", function (e) {
                    _this3.tipsText = e.target.innerText;
                    _this3.title.value = _this3.tipsText;
                });
            });
        }
    }]);

    return ToolTips;
}(_MapSetup2.MapSetup);

exports.ToolTips = ToolTips;

},{"./MapSetup":4}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WeatherMap = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _MapSetup2 = require("./MapSetup");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WeatherMap = function (_MapSetup) {
    _inherits(WeatherMap, _MapSetup);

    function WeatherMap() {
        _classCallCheck(this, WeatherMap);

        var _this = _possibleConstructorReturn(this, (WeatherMap.__proto__ || Object.getPrototypeOf(WeatherMap)).call(this));

        _this.weatherList = document.querySelector("#weatherList");
        _this.headerWeather = document.querySelector("#titleWeather");
        _this.boxWeather = document.querySelector("#weatherBox");
        _this.button.addEventListener('click', function (e) {
            if (_this.button.innerText === "Show weather") {
                _this.showWeather();
                _this.boxWeather.style.display = "block";
                _this.boxWeather.style.opacity = "1";
                _this.scrollIt(_this.boxWeather);
                e.target.innerText = "Hide weather";
            } else {
                _this.boxWeather.style.display = "none";
                e.target.innerText = "Show weather";
            }
        });

        return _this;
    }

    _createClass(WeatherMap, [{
        key: "addItemToWeatherList",
        value: function addItemToWeatherList(parent, item, text) {
            var li = document.createElement("li");
            li.innerText = text + item;
            li.classList.add("elRightList");
            parent.appendChild(li);
        }
    }, {
        key: "showWeather",
        value: function showWeather() {
            var _this2 = this;

            _get(WeatherMap.prototype.__proto__ || Object.getPrototypeOf(WeatherMap.prototype), "selectCountries", this).call(this);
            [].concat(_toConsumableArray(this.countriesBox)).map(function (country) {
                if (country.name === _this2.title.value) {
                    fetch("https://api.apixu.com/v1/current.json?key=38d2497fd3b242e78fb182314181601&q=" + country.capital).then(function (res) {
                        return res.json();
                    }).then(function (data) {
                        var location = data.location,
                            current = data.current;


                        _this2.headerWeather.innerText = "Weather in " + location.name + " ";
                        _this2.addItemToWeatherList(_this2.weatherList, current.temp_c, "Current temperature: ");
                        _this2.addItemToWeatherList(_this2.weatherList, current.feelslike_c, "Feelslike temperature:  ");
                        _this2.addItemToWeatherList(_this2.weatherList, current.humidity, "Humidity:  ");
                        _this2.addItemToWeatherList(_this2.weatherList, current.pressure_mb, "Pressure:  ");
                        _this2.addItemToWeatherList(_this2.weatherList, current.wind_kph, "Wind km/h:  ");
                        _this2.addItemToWeatherList(_this2.weatherList, current.condition.text, "Weather condition:  ");

                        var img = document.createElement("img");
                        img.setAttribute("src", current.condition.icon);
                        img.classList.add("icon");
                        _this2.boxWeather.appendChild(img);

                        var timeParagraph = document.createElement("p");
                        timeParagraph.innerText = current.last_updated;
                        timeParagraph.classList.add("time");
                        _this2.boxWeather.insertBefore(timeParagraph, sun);

                        var newTime = current.last_updated.slice(11, 16);
                        if (newTime[0] >= 2 || newTime[0] === '0' && newTime[1] <= 5) {
                            document.querySelector(".second-page__list--moon").style.display = "block";
                            _this2.boxWeather.classList.add("night");
                        } else {
                            document.querySelector(".second-page__list--sun").style.display = "block";
                            _this2.boxWeather.classList.add("day");
                        }
                    }).catch(function (error) {
                        console.log('fail', error);
                    });
                }
            });
        }
    }]);

    return WeatherMap;
}(_MapSetup2.MapSetup);

exports.WeatherMap = WeatherMap;

},{"./MapSetup":4}],7:[function(require,module,exports){
'use strict';

var _MapSetup = require('./MapSetup.js');

var _Map = require('./Map.js');

var _ToolTips = require('./ToolTips');

var _WeatherMap = require('./WeatherMap');

var _List = require('./List');

var _FireBase = require('./FireBase');

document.addEventListener("DOMContentLoaded", function () {

   var map = new _MapSetup.MapSetup();
   map.createArrayBigMap();
   map.createArraySmallMap();
   map.mousePosition();
   map.selectCountries();

   var bigMap = new _Map.Map();
   bigMap.blinkMap();
   bigMap.selectCountries();
   console.log(bigMap);

   var toolTip = new _ToolTips.ToolTips();
   toolTip.showCountryFromTableTips();

   var weatherMap = new _WeatherMap.WeatherMap();
   weatherMap.showWeather();

   var myList = new _List.Lists();

   var fireBase = new _FireBase.FireBase();
   fireBase.newUserSign();
});

},{"./FireBase":1,"./List":2,"./Map.js":3,"./MapSetup.js":4,"./ToolTips":5,"./WeatherMap":6}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9GaXJlQmFzZS5qcyIsInNyYy9zY3JpcHRzL0xpc3QuanMiLCJzcmMvc2NyaXB0cy9NYXAuanMiLCJzcmMvc2NyaXB0cy9NYXBTZXR1cC5qcyIsInNyYy9zY3JpcHRzL1Rvb2xUaXBzLmpzIiwic3JjL3NjcmlwdHMvV2VhdGhlck1hcC5qcyIsInNyYy9zY3JpcHRzL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQTs7SUFFTSxRO0FBQ0Ysd0JBQWE7QUFBQTs7QUFBQTs7QUFDVCxhQUFLLE1BQUwsR0FBYztBQUNWLG9CQUFRLHlDQURFO0FBRVYsd0JBQVksdUNBRkY7QUFHVix5QkFBYSw4Q0FISDtBQUlWLHVCQUFXLHVCQUpEO0FBS1YsMkJBQWUsbUNBTEw7QUFNViwrQkFBbUI7QUFOVCxTQUFkO0FBUUEsYUFBSyxRQUFMLEdBQWdCLFNBQVMsYUFBVCxDQUF1QixLQUFLLE1BQTVCLENBQWhCO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLEtBQUssUUFBTCxDQUFjLFFBQWQsRUFBaEI7O0FBRUE7QUFDQSxhQUFLLEtBQUwsR0FBYSxTQUFTLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBYjtBQUNBLGFBQUssTUFBTCxHQUFjLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFkO0FBQ0EsYUFBSyxNQUFMLEdBQWMsU0FBUyxjQUFULENBQXdCLFFBQXhCLENBQWQ7QUFDQSxhQUFLLFdBQUwsR0FBbUIsU0FBUyxjQUFULENBQXdCLFlBQXhCLENBQW5CO0FBQ0EsYUFBSyxVQUFMLEdBQWtCLFNBQVMsY0FBVCxDQUF3QixXQUF4QixDQUFsQjtBQUNBLGFBQUssSUFBTCxHQUFZLFNBQVMsY0FBVCxDQUF3QixZQUF4QixDQUFaO0FBQ0EsYUFBSyxLQUFMLEdBQWEsRUFBYjs7QUFHQTtBQUNBLGFBQUssS0FBTCxDQUFXLGdCQUFYLENBQTRCLE9BQTVCLEVB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O0FBNkNIOzs7Ozs7UUFHSSxVLEdBQUEsVTs7Ozs7QUMvRVQ7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBR0MsU0FBUyxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBVTs7QUFFckQsT0FBTSxNQUFNLHdCQUFaO0FBQ0EsT0FBSSxpQkFBSjtBQUNBLE9BQUksbUJBQUo7QUFDQSxPQUFJLGFBQUo7QUFDQSxPQUFJLGVBQUo7O0FBR0EsT0FBTSxTQUFTLGNBQWY7QUFDQSxVQUFPLFFBQVA7QUFDQSxVQUFPLGVBQVA7QUFDQSxXQUFRLEdBQVIsQ0FBWSxNQUFaOztBQUdBLE9BQU0sVUFBVSx3QkFBaEI7QUFDQSxXQUFRLHdCQUFSOztBQUdBLE9BQU0sYUFBYSw0QkFBbkI7QUFDQSxjQUFXLFdBQVg7O0FBR0EsT0FBTSxTQUFTLGlCQUFmOztBQUdBLE9BQU0sV0FBVyx3QkFBakI7QUFDQSxZQUFTLFdBQVQ7QUFJSCxDQS9CQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBmaXJlYmFzZSBpbnRlcmFjdGl2ZS1tYXBcblxuY2xhc3MgRmlyZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgICAgICAgYXBpS2V5OiBcIkFJemFTeUFkV0tncnF1aXRWUFlWWmFpZVYyWlpGSktDOTVJZWw5OFwiLFxuICAgICAgICAgICAgYXV0aERvbWFpbjogXCJpbnRlcmFjdGl2ZS1tYXAtZjUwNjAuZmlyZWJhc2VhcHAuY29tXCIsXG4gICAgICAgICAgICBkYXRhYmFzZVVSTDogXCJodHRwczovL2ludGVyYWN0aXZlLW1hcC1mNTA2MC5maXJlYmFzZWlvLmNvbVwiLFxuICAgICAgICAgICAgcHJvamVjdElkOiBcImludGVyYWN0aXZlLW1hcC1mNTA2MFwiLFxuICAgICAgICAgICAgc3RvcmFnZUJ1Y2tldDogXCJpbnRlcmFjdGl2ZS1tYXAtZjUwNjAuYXBwc3BvdC5jb21cIixcbiAgICAgICAgICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjU5NTg2MTY1MDYzMFwiXG4gICAgICAgICAgfTtcbiAgICAgICAgdGhpcy5maXJlYmFzZSA9IGZpcmViYXNlLmluaXRpYWxpemVBcHAodGhpcy5jb25maWcpO1xuICAgICAgICB0aGlzLmRhdGFiYXNlID0gdGhpcy5maXJlYmFzZS5kYXRhYmFzZSgpO1xuXG4gICAgICAgIC8vZWxlbWVudHkgZG8gbG9nb3dhbmlhXG4gICAgICAgIHRoaXMubG9nSW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ0luXCIpO1xuICAgICAgICB0aGlzLnNpZ25JbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lnbkluXCIpO1xuICAgICAgICB0aGlzLmxvZ091dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nT3V0XCIpO1xuICAgICAgICB0aGlzLmJ0blNlbmRTaWduID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZW5kU2lnbkluXCIpO1xuICAgICAgICB0aGlzLmJ0blNlbmRMb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbmRMb2dJblwiKTtcbiAgICAgICAgdGhpcy5mb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWduSW5Gb3JtXCIpO1xuICAgICAgICB0aGlzLmFycmF5ID0gW107XG5cbiAgICAgICAgICBcbiAgICAgICAgLy9wb2theiBmb3JtdWxhcnogZG8gbG9nb3dhbmlhXG4gICAgICAgIHRoaXMubG9nSW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT57XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9nSW5Gb3JtJykuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgICAgICAvLyB0aGlzLmxvZ091dC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcblxuXG4gICAgICAgIC8vd3lsb2dvd2FuaWUgc2llIHV6eXRrb3duaWthXG4gICAgICAgIHRoaXMubG9nT3V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmlyZWJhc2UuYXV0aCgpLnNpZ25PdXQoKVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vcG9rYXogZm9ybXVsYXJ6IGRvIHJlamVzdHJhY2ppXG4gICAgICAgIHRoaXMuc2lnbkluLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmZvcm0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblxuICAgICAgICB9KTtcblxuICAgICAgICAvL3phbG9nb3dhbmllIHV6eXRrb3duaWthXG4gICAgICAgIHRoaXMuYnRuU2VuZExvZy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBwYXNzdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFzc3dvcmRcIikudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW1haWxcIikudmFsdWVcbiAgICAgICAgICAgIGNvbnN0IGF1dGggPSB0aGlzLmZpcmViYXNlLmF1dGgoKTtcbiAgICBcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBhdXRoLnNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsLCBwYXNzdyk7XG4gICAgICAgICAgICBwcm9taXNlLmNhdGNoKGUgPT4gY29uc29sZS5sb2coZS5tZXNzYWdlKSk7XG5cbiAgICAgICAgfSlcblxuICAgICAgICAvL3JlamVzdHJhY2phIG5vd2VnbyB1enl0a293bmlrYVxuICAgICAgICB0aGlzLmJ0blNlbmRTaWduLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHBhc3N3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzd29yZFwiKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbWFpbFwiKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGF1dGggPSB0aGlzLmZpcmViYXNlLmF1dGgoKTtcbiAgICBcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBhdXRoLmNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzc3cpO1xuICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChlID0+IGNvbnNvbGUubG9nKGUubWVzc2FnZSkpO1xuXG5cbiAgICAgICAgICAgIGlmKHRoaXMuZm9ybS5zdHlsZS5kaXNwbGF5ICE9PSBcIm5vbmVcIil7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgfSlcbiAgICB9XG5cblxuICAgIG5ld1VzZXJTaWduKCl7XG4gICAgICAgIHRoaXMuZmlyZWJhc2UuYXV0aCgpLm9uQXV0aFN0YXRlQ2hhbmdlZCggdXNlciA9PntcbiAgICAgICAgICAgIGlmKHVzZXIpeyAgIFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXIgKyBcImxvZ2dlZCBpblwiICsgdGhpcy5maXJlYmFzZS5hdXRoKCkuY3VycmVudFVzZXIudWlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ091dC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25vdCBsb2dnZWQgaW4nKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ091dC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cblxufVxuXG5leHBvcnQge0ZpcmVCYXNlfTsiLCJpbXBvcnQgeyBNYXBTZXR1cCB9IGZyb20gXCIuL01hcFNldHVwXCI7XG5cbmNsYXNzIExpc3RzIGV4dGVuZHMgTWFwU2V0dXB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5saXN0U2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGlzdF9fYm94XCIpO1xuICAgICAgICB0aGlzLnZpc2l0ZWRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsaXN0VmlzaXRlZFwiKTtcbiAgICAgICAgdGhpcy53aXNoTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGlzdFdpc2hcIik7XG4gICAgICAgIHRoaXMudmlzaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZFRvVmlzaXRcIik7XG4gICAgICAgIHRoaXMuYWRkVmlzaXRlZEJ0biA9IHRoaXMudmlzaXRCdG4ucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgdGhpcy5idG5MaXN0RXhpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXhpdExpc3RcIik7XG4gXG4gICAgICBcblxuICAgICAgICB0aGlzLmJ0bkxpc3RFeGl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmhpZGVFbGVtZW50KHRoaXMubGlzdFNlY3Rpb24pKTtcblxuICAgICAgICB0aGlzLnZpc2l0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbih0aGlzLmxpc3RTZWN0aW9uLCAnMTIwJScpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxJdCh0aGlzLmxpc3RTZWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuc3dpY2hMaXN0SXRlbSh0aGlzLndpc2hMaXN0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRWaXNpdGVkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbih0aGlzLmxpc3RTZWN0aW9uLCAnMTIwJScpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxJdCh0aGlzLmxpc3RTZWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuc3dpY2hMaXN0SXRlbSh0aGlzLnZpc2l0ZWRMaXN0KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzd2ljaExpc3RJdGVtKHBhcmVudCl7XG4gICAgICAgIGxldCBjb3VudHJ5ID0gdGhpcy5saXN0RWxbMF0uaW5uZXJUZXh0O1xuICAgICAgICB0aGlzLmFkZEl0ZW1Ub0xpc3QocGFyZW50LCBjb3VudHJ5LCAnJyApO1xuXG4gICAgICAgIC8vIHNhdmVEYXRhVG9EQihjb3VudHJ5KTtcbiAgICAgICAgICAgXG4gICAgfVxuXG4vLyBkb2RhbmllIGRvIGxpc3R5IMW8eWN6ZcWEXG4gICAgXG4vLyAgICAgICAgICBmdW5jdGlvbiBzYXZlRGF0YVRvREIoaXRlbSwgdXNlcikge1xuLy8gICAgICAgICAgICAgYXJyYXkucHVzaChpdGVtKTtcbiAgICAgICAgXG4vLyAgICAgICAgICAgICBkYXRhYmFzZS5yZWYoJ2l0ZW0nKS5zZXQoe1xuLy8gICAgICAgICAgICAgICAgIGNvdW50cnk6IGFycmF5LFxuICAgIFxuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgIGRhdGFiYXNlLnJlZigndXNlcicpLnNldCh7XG4vLyAgICAgICAgICAgICAgICAgdXNlcjogZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZCxcbiAgICBcbi8vICAgICAgICAgICAgIH0pXG4vLyAgIH1cbiAgICAgICBcblxufVxuXG5leHBvcnQgeyBMaXN0cyB9IiwiaW1wb3J0IHsgTWFwU2V0dXAgfSBmcm9tIFwiLi9NYXBTZXR1cFwiO1xuXG5cbmNsYXNzIE1hcCBleHRlbmRzIE1hcFNldHVwIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNlY3Rpb25TZWMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlY29uZFNlY1wiKTtcbiAgICAgICAgdGhpcy5sZWZ0Qm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsZWZ0Qm94XCIpO1xuICAgICAgICB0aGlzLnRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBlID0+e1xuICAgICAgICAgICAgaWYoZS5rZXlDb2RlID09PSAxMyl7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Q291bnRyeShldmVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy50dXJuT2ZmU2VhcmNoQnRuKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuICAgICAgICBpZih0aGlzLnNlY3Rpb25TZWMuc3R5bGUuZGlzcGxheSAhPT0gXCJub25lXCIpe1xuICAgICAgICAgICAgdGhpcy50aXRsZS5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgKCk9PntcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnJlc2V0TGlzdEVsZW1lbnRzKHRoaXMubGlzdFNwYW5zKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZXhpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXhpdEJ0blwiKTtcbiAgICAgICAgdGhpcy5leGl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhpZGVFbGVtZW50KHRoaXMuc2VjdGlvblNlYyk7XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIHRoaXMudHVybk9mZlNlYXJjaEJ0bigpO1xuICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICBcblxuICAgICAgICBbLi4udGhpcy5jb3VudHJ5TWFwXS5tYXAoY291bnRyeSA9PiB7XG4gICAgICAgICAgICBjb3VudHJ5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJpYnV0ZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVFbGVtZW50KHRoaXMubGlzdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RDb3VudHJpZXModGhpcy5hdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24odGhpcy5zZWN0aW9uU2VjLCc1JScpO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld0NvdW50cnkoZXZlbnQsIHRoaXMuY291bnRyeU1hcCwgdGhpcy5zbWFsbE1hcCwgdGhpcy50aXRsZS52YWx1ZSwgdGhpcy5hdHRyaWJ1dGUpO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG5cblxuICAgIH1cbiAgICBcbiAgICBibGlua01hcCgpe1xuICAgICAgICBzdXBlci5ibGlua01hcCh0aGlzLmNvdW50cnlNYXApO1xuICAgIH1cblxuICAgIHNlbGVjdENvdW50cmllcyhhdHRyKXtcbiAgICAgICAgc3VwZXIuc2VsZWN0Q291bnRyaWVzKCk7XG4gICAgICAgICAgICBbLi4udGhpcy5jb3VudHJpZXNCb3hdLm1hcChjb3VudHJ5ID0+IHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnRpdGxlLnZhbHVlID09PSBjb3VudHJ5Lm5hbWUgfHwgYXR0ciA9PT0gY291bnRyeS5uYW1lKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge2xhbmd1YWdlcywgY3VycmVuY2llc30gPSBjb3VudHJ5O1xuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW1Ub0xpc3QodGhpcy5saXN0RWxbMF0sIGNvdW50cnkubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbVRvTGlzdCh0aGlzLmxpc3RFbFsxXSwgY291bnRyeS5jYXBpdGFsKTtcblxuICAgICAgICAgICAgICAgICAgICBbLi4uY3VycmVuY2llc10uZm9yRWFjaChjdXJyZW5jeT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtVG9MaXN0KHRoaXMubGlzdEVsWzJdLCBjdXJyZW5jeS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gIFxuICAgICAgICAgICAgICAgICAgICBbLi4ubGFuZ3VhZ2VzXS5mb3JFYWNoKGxhbmd1YWdlID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtVG9MaXN0KHRoaXMubGlzdEVsWzNdLCBsYW5ndWFnZS5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtVG9MaXN0KHRoaXMubGlzdEVsWzRdLCBjb3VudHJ5LnBvcHVsYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGVmdEJveC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7Y291bnRyeS5mbGFnfSlgO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxlZnRCb3guY2xhc3NMaXN0LmFkZChcImxlZnRCb3hCYWNrZ3JvdW5kXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICB2aWV3Q291bnRyeShlLCBjb3VudHJpZXNBcnJheU9uZSwgY291bnRyaWVzQXJyYXlUd28sIGlucHV0LCBjbGlja2VkQ291bnRyeSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5oaWRlRWxlbWVudCh0aGlzLmxpc3QpO1xuICAgICAgICB0aGlzLnNlbGVjdENvdW50cmllcygpO1xuICAgICAgICB0aGlzLnNob3dTZWN0aW9uKHRoaXMuc2VjdGlvblNlYywnNSUnKTtcbiAgICAgICAgc3VwZXIudmlld0NvdW50cnkoZXZlbnQsIHRoaXMuY291bnRyeU1hcCwgdGhpcy5zbWFsbE1hcCwgdGhpcy50aXRsZS52YWx1ZSwgdGhpcy5hdHRyaWJ1dGUpICAgICAgICBcbiAgICB9XG5cbiAgICB0dXJuT2ZmU2VhcmNoQnRuKCl7XG4gICAgICAgIGlmKHRoaXMuc2VjdGlvblNlYy5zdHlsZS5kaXNwbGF5ICE9PSBcIm5vbmVcIil7XG4gICAgICAgICAgICB0aGlzLmJ0blNlYXJjaC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcInRydWVcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJ0blNlYXJjaC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcImZhbHNlXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXRMaXN0RWxlbWVudHMoZWxlbWVudCl7XG4gICAgICAgIFsuLi5lbGVtZW50XS5mb3JFYWNoKGVsPT57XG4gICAgICAgICAgICBlbC5pbm5lclRleHQgPSBcIiBcIlxuICAgICAgICB9KVxuXG4gICAgfVxufVxuXG5leHBvcnQgeyBNYXAgfTsiLCJcbmNsYXNzIE1hcFNldHVwIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLmNvdW50cnlNYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21hcFwiKS5jaGlsZHJlbjtcbiAgICAgICAgdGhpcy5zbWFsbE1hcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFwU2VjXCIpLmNoaWxkcmVuO1xuICAgICAgICB0aGlzLmxpc3RPZkNvdW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvdW50cnlMaXN0XCIpO1xuICAgICAgICB0aGlzLmxpc3RFbCA9IHRoaXMubGlzdE9mQ291bnRyeS5jaGlsZHJlbjtcbiAgICAgICAgdGhpcy5saXN0U3BhbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY291bnRyeUluZm8nKTtcbiAgICAgICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY291bnRyeU5hbWVcIik7XG4gICAgICAgIHRoaXMudG9vbFRpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9vbFRpcFwiKTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hlYWRlclwiKTtcbiAgICAgICAgdGhpcy5idXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bkFkZFwiKTtcbiAgICAgICAgdGhpcy5idG5TZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J0blwiKTtcbiAgICAgICAgdGhpcy5saXN0ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKTtcbiAgICAgICAgdGhpcy5jb3VudHJpZXMgPSBbXTtcbiAgICAgICAgdGhpcy5zbWFsbENvdW50cmllcyA9IFtdO1xuICAgICAgICB0aGlzLmNvdW50cmllc0JveCA9IFtdO1xuICAgICAgICB0aGlzLmF0dHJpYnV0ZSA9IFwiXCI7XG5cbiAgICB9XG5cbiAgICBjcmVhdGVBcnJheUJpZ01hcCgpe1xuICAgICAgICByZXR1cm4gWy4uLnRoaXMuY291bnRyeU1hcF0uZm9yRWFjaChjb3VudHJ5ID0+IHtcbiAgICAgICAgICAgIGlmKHR5cGVvZiBjb3VudHJ5ICE9PSAndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudHJpZXMucHVzaCh7aWQ6IGNvdW50cnkuaWQsIHRpdGxlOiBjb3VudHJ5LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY291bnRyaWVzXG4gICAgICAgICAgICB9ICAgIFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNyZWF0ZUFycmF5U21hbGxNYXAoKXtcbiAgICAgICAgcmV0dXJuIFsuLi50aGlzLnNtYWxsTWFwXS5mb3JFYWNoKGNvdW50cnkgPT4ge1xuICAgICAgICAgICAgaWYodHlwZW9mIGNvdW50cnkgIT09ICd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNtYWxsQ291bnRyaWVzLnB1c2goe2lkOiBjb3VudHJ5LmlkLCB0aXRsZTogY291bnRyeS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKX0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNtYWxsQ291bnRyaWVzXG4gICAgICAgICAgICB9ICAgIFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIG1vdXNlUG9zaXRpb24oZSl7XG4gICAgICAgIHJldHVybiB3aW5kb3cub25tb3VzZW1vdmUgPSBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgcmV0dXJuIHsgeDogZS5jbGllbnRYLCB5OiBlLmNsaWVudFkgfVxuICAgICAgICB9XG4gICAgfSBcbiAgICBcblxuICAgIHNob3dTZWN0aW9uKHNlY3Rpb24sIHBvc2l0aW9uVG9wKXtcbiAgICAgICAgc2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgc2VjdGlvbi5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICBzZWN0aW9uLnN0eWxlLnRvcCA9IHBvc2l0aW9uVG9wO1xuICAgIH1cblxuICAgIGhpZGVFbGVtZW50KGVsZW1lbnQpe1xuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuXG5cbiAgICBzZWxlY3RDb3VudHJpZXMoKXtcbiAgICAgICByZXR1cm4gZmV0Y2goYGh0dHBzOi8vcmVzdGNvdW50cmllcy5ldS9yZXN0L3YyL2FsbGApXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGRhdGEubWFwKGl0ZW0gPT57XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudHJpZXNCb3gucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gIHRoaXMuY291bnRyaWVzQm94O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+e3JldHVybiBjb25zb2xlLmxvZygnZmFpbCcsIGVycm9yKX0pXG5cbiAgICB9XG5cbiAgICBibGlua01hcChjb3VudHJpZXNBcnJheSl7XG4gICAgICAgIFsuLi5jb3VudHJpZXNBcnJheV0uZm9yRWFjaChjb3VudHJ5ID0+IHtcbiAgICAgICAgICAgIGNvdW50cnkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwoZSkgPT57XG5cbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZUNvdW50cnlcIik7XG4gICAgICAgICAgICAgICAgdGhpcy50b29sVGlwLmlubmVyVGV4dCA9IGNvdW50cnkuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgICAgICAgICAgICAgdGhpcy50aXRsZS5pbm5lclRleHQgPSBjb3VudHJ5LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICAgIFxuICAgICAgICAgICAgICAgIHRoaXMudG9vbFRpcC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgIHRoaXMudG9vbFRpcC5zdHlsZS50b3AgPSB0aGlzLm1vdXNlUG9zaXRpb24od2luZG93LmV2ZW50KS55ICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIHRoaXMudG9vbFRpcC5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZSgwLDEwMCUpXCI7XG4gICAgICAgICAgICAgICAgdGhpcy50b29sVGlwLnN0eWxlLmxlZnQgPSB0aGlzLm1vdXNlUG9zaXRpb24od2luZG93LmV2ZW50KS54ICsgXCJweFwiO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvdW50cnkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwoZSkgPT57XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVDb3VudHJ5XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMudG9vbFRpcC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KSAgXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgYWRkSXRlbVRvTGlzdChwYXJlbnQsIGl0ZW0pe1xuICAgICAgICBsZXQgbmV3U3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBuZXdTcGFuLmNsYXNzTGlzdC5hZGQoXCJjb3VudHJ5SW5mb1wiKTtcbiAgICAgICAgbmV3U3Bhbi5pbm5lclRleHQgPSBpdGVtO1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQobmV3U3Bhbik7XG4gICAgfVxuICAgIFxuICAgIHZpZXdDb3VudHJ5KGUsIGNvdW50cmllc0FycmF5T25lLCBjb3VudHJpZXNBcnJheVR3bywgaW5wdXQsIGNsaWNrZWRDb3VudHJ5KXtcbiAgICAgICAgWy4uLmNvdW50cmllc0FycmF5T25lXS5mb3JFYWNoKGNvdW50cnkgPT4ge1xuICAgICAgICAgICAgbGV0IHRpdGxlT2ZDb3VudHJ5ID0gY291bnRyeS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgICAgICAgICAgIGlmKHRpdGxlT2ZDb3VudHJ5ID09PSBpbnB1dCB8fCB0aXRsZU9mQ291bnRyeSA9PT0gY2xpY2tlZENvdW50cnkpe1xuICAgICAgICAgICAgICAgIGNvdW50cnkuY2xhc3NMaXN0LmFkZChcInZpc2libGVDb3VudHJ5XCIpOyBcbiAgICAgICAgICAgIH0gIFxuICAgICAgICB9KTtcbiAgICAgICAgWy4uLmNvdW50cmllc0FycmF5VHdvXS5mb3JFYWNoKGNvdW50cnkgPT4ge1xuICAgICAgICAgICAgbGV0IHRpdGxlT2ZDb3VudHJ5ID0gY291bnRyeS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgICAgICAgICAgIGlmKHRpdGxlT2ZDb3VudHJ5ID09PSBpbnB1dCB8fCB0aXRsZU9mQ291bnRyeSA9PT0gY2xpY2tlZENvdW50cnkpe1xuICAgICAgICAgICAgICAgIGNvdW50cnkuY2xhc3NMaXN0LmFkZChcInZpc2libGVDb3VudHJ5XCIpOyBcbiAgICAgICAgICAgIH0gIFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzY3JvbGxJdChlbGVtZW50KSB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgICAgICAnYmVoYXZpb3InOiAnc21vb3RoJyxcbiAgICAgICAgICAgICd0b3AnOiBlbGVtZW50Lm9mZnNldFRvcFxuICAgICAgICB9KTtcbiAgICB9XG5cblxufVxuXG5leHBvcnQgeyBNYXBTZXR1cCB9OyIsImltcG9ydCB7IE1hcFNldHVwIH0gZnJvbSBcIi4vTWFwU2V0dXBcIjtcblxuY2xhc3MgVG9vbFRpcHMgZXh0ZW5kcyBNYXBTZXR1cHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmFycmF5T2ZMaSA9IFtdO1xuICAgICAgICB0aGlzLnRpcHNCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpcEJ0blwiKTtcbiAgICAgICAgdGhpcy50aXBzVGV4dCA9IFwiXCI7XG5cblxuICAgICAgICB0aGlzLnRpcHNCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT57XG4gICAgICAgICAgICBpZih0aGlzLmxpc3QuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgIT09IFwidGlwc1wiKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVRhYmxlVGlwcygpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZUVsZW1lbnQodGhpcy5saXN0KTtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcInRydWVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG5cbiAgICB9XG4gICAgY3JlYXRlVGFibGVUaXBzKCl7XG4gICAgICAgIHRoaXMubGlzdC5jbGFzc0xpc3QuYWRkKFwidGlwc1wiKTtcbiAgICAgICAgWy4uLnRoaXMuY291bnRyeU1hcF0ubWFwKGVsID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXR0cmlidXRlID0gZWwuZ2V0QXR0cmlidXRlKFwidGl0bGVcIilcbiAgICAgICAgICAgIGxldCBuZXdMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgICAgIG5ld0xpLmNsYXNzTGlzdC5hZGQoXCJ0aXBzRWxlbWVudFwiKTtcbiAgICAgICAgICAgIHRoaXMubGlzdC5hcHBlbmRDaGlsZChuZXdMaSk7XG4gICAgICAgICAgICBuZXdMaS5pbm5lclRleHQgPSB0aGlzLmF0dHJpYnV0ZTtcbiAgICAgICAgICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLmxpc3QpOyBcbiAgICAgICAgICAgIHRoaXMuYXJyYXlPZkxpLnB1c2gobmV3TGkpO1xuICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHNob3dDb3VudHJ5RnJvbVRhYmxlVGlwcygpe1xuICAgICAgICBbLi4udGhpcy5hcnJheU9mTGldLmZvckVhY2godGlwID0+e1xuICAgICAgICAgICAgdGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLChlKSA9PntcbiAgICAgICAgICAgICAgICB0aGlzLnRpcHNUZXh0ID0gZS50YXJnZXQuaW5uZXJUZXh0O1xuICAgICAgICAgICAgICAgIHRoaXMudGl0bGUudmFsdWUgPSB0aGlzLnRpcHNUZXh0O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBUb29sVGlwcyB9IiwiaW1wb3J0IHsgTWFwU2V0dXAgfSBmcm9tIFwiLi9NYXBTZXR1cFwiO1xuXG5jbGFzcyBXZWF0aGVyTWFwIGV4dGVuZHMgTWFwU2V0dXB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy53ZWF0aGVyTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2VhdGhlckxpc3RcIik7XG4gICAgICAgIHRoaXMuaGVhZGVyV2VhdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVXZWF0aGVyXCIpO1xuICAgICAgICB0aGlzLmJveFdlYXRoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlYXRoZXJCb3hcIik7XG4gICAgICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmJ1dHRvbi5pbm5lclRleHQgPT09IFwiU2hvdyB3ZWF0aGVyXCIpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dXZWF0aGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm94V2VhdGhlci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJveFdlYXRoZXIuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEl0KHRoaXMuYm94V2VhdGhlcik7XG4gICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LmlubmVyVGV4dCA9IFwiSGlkZSB3ZWF0aGVyXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3hXZWF0aGVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuaW5uZXJUZXh0ID0gXCJTaG93IHdlYXRoZXJcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfVxuICAgIGFkZEl0ZW1Ub1dlYXRoZXJMaXN0KHBhcmVudCwgaXRlbSwgdGV4dCl7XG4gICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgbGkuaW5uZXJUZXh0ID0gdGV4dCArIGl0ZW07XG4gICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoXCJlbFJpZ2h0TGlzdFwiKTtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGxpKTsgICBcbiAgICB9XG5cbiAgICBzaG93V2VhdGhlcigpe1xuICAgICAgICBzdXBlci5zZWxlY3RDb3VudHJpZXMoKTtcbiAgICAgICAgWy4uLnRoaXMuY291bnRyaWVzQm94XS5tYXAoY291bnRyeSA9PiB7XG4gICAgICAgICAgICBpZihjb3VudHJ5Lm5hbWUgPT09IHRoaXMudGl0bGUudmFsdWUpe1xuICAgICAgICAgICAgICAgIGZldGNoKGBodHRwczovL2FwaS5hcGl4dS5jb20vdjEvY3VycmVudC5qc29uP2tleT0zOGQyNDk3ZmQzYjI0MmU3OGZiMTgyMzE0MTgxNjAxJnE9JHtjb3VudHJ5LmNhcGl0YWx9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBsb2NhdGlvbiwgY3VycmVudCB9ID0gZGF0YTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlcldlYXRoZXIuaW5uZXJUZXh0ID0gYFdlYXRoZXIgaW4gJHtsb2NhdGlvbi5uYW1lfSBgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW1Ub1dlYXRoZXJMaXN0KHRoaXMud2VhdGhlckxpc3QsIGN1cnJlbnQudGVtcF9jLCBcIkN1cnJlbnQgdGVtcGVyYXR1cmU6IFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtVG9XZWF0aGVyTGlzdCh0aGlzLndlYXRoZXJMaXN0LCBjdXJyZW50LmZlZWxzbGlrZV9jLCBcIkZlZWxzbGlrZSB0ZW1wZXJhdHVyZTogIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtVG9XZWF0aGVyTGlzdCh0aGlzLndlYXRoZXJMaXN0LCBjdXJyZW50Lmh1bWlkaXR5LCBcIkh1bWlkaXR5OiAgXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW1Ub1dlYXRoZXJMaXN0KHRoaXMud2VhdGhlckxpc3QsIGN1cnJlbnQucHJlc3N1cmVfbWIsIFwiUHJlc3N1cmU6ICBcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbVRvV2VhdGhlckxpc3QodGhpcy53ZWF0aGVyTGlzdCwgY3VycmVudC53aW5kX2twaCwgXCJXaW5kIGttL2g6ICBcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbVRvV2VhdGhlckxpc3QodGhpcy53ZWF0aGVyTGlzdCwgY3VycmVudC5jb25kaXRpb24udGV4dCxcIldlYXRoZXIgY29uZGl0aW9uOiAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgICAgICAgICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgY3VycmVudC5jb25kaXRpb24uaWNvbik7XG4gICAgICAgICAgICAgICAgICAgIGltZy5jbGFzc0xpc3QuYWRkKFwiaWNvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3hXZWF0aGVyLmFwcGVuZENoaWxkKGltZyk7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aW1lUGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVQYXJhZ3JhcGguaW5uZXJUZXh0ID0gY3VycmVudC5sYXN0X3VwZGF0ZWQ7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVQYXJhZ3JhcGguY2xhc3NMaXN0LmFkZChcInRpbWVcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm94V2VhdGhlci5pbnNlcnRCZWZvcmUodGltZVBhcmFncmFwaCwgc3VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1RpbWUgPSBjdXJyZW50Lmxhc3RfdXBkYXRlZC5zbGljZSgxMSwgMTYpO1xuICAgICAgICAgICAgICAgICAgICBpZihuZXdUaW1lWzBdID49IDIgfHwgbmV3VGltZVswXSA9PT0gJzAnICYmIG5ld1RpbWVbMV0gPD0gNSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY29uZC1wYWdlX19saXN0LS1tb29uXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJveFdlYXRoZXIuY2xhc3NMaXN0LmFkZChcIm5pZ2h0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2Vjb25kLXBhZ2VfX2xpc3QtLXN1blwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3hXZWF0aGVyLmNsYXNzTGlzdC5hZGQoXCJkYXlcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmFpbCcsIGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgXG4gICAgfVxufVxuXG5leHBvcnQgeyBXZWF0aGVyTWFwIH07IiwiIFxuaW1wb3J0IHsgTWFwU2V0dXAgfSBmcm9tICcuL01hcFNldHVwLmpzJztcbmltcG9ydCB7IE1hcCB9IGZyb20gJy4vTWFwLmpzJztcbmltcG9ydCB7IFRvb2xUaXBzIH0gZnJvbSAnLi9Ub29sVGlwcyc7XG5pbXBvcnQgeyBXZWF0aGVyTWFwIH0gZnJvbSAnLi9XZWF0aGVyTWFwJztcbmltcG9ydCB7IExpc3RzIH0gZnJvbSAnLi9MaXN0J1xuaW1wb3J0IHtGaXJlQmFzZX0gZnJvbSAnLi9GaXJlQmFzZSdcblxuXG4gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKXtcblxuICAgIGNvbnN0IG1hcCA9IG5ldyBNYXBTZXR1cCgpIDtcbiAgICBtYXAuY3JlYXRlQXJyYXlCaWdNYXAoKTtcbiAgICBtYXAuY3JlYXRlQXJyYXlTbWFsbE1hcCgpXG4gICAgbWFwLm1vdXNlUG9zaXRpb24oKVxuICAgIG1hcC5zZWxlY3RDb3VudHJpZXMoKTtcbiBcblxuICAgIGNvbnN0IGJpZ01hcCA9IG5ldyBNYXAoKTtcbiAgICBiaWdNYXAuYmxpbmtNYXAoKTtcbiAgICBiaWdNYXAuc2VsZWN0Q291bnRyaWVzKClcbiAgICBjb25zb2xlLmxvZyhiaWdNYXApO1xuXG5cbiAgICBjb25zdCB0b29sVGlwID0gbmV3IFRvb2xUaXBzKCk7XG4gICAgdG9vbFRpcC5zaG93Q291bnRyeUZyb21UYWJsZVRpcHMoKVxuXG5cbiAgICBjb25zdCB3ZWF0aGVyTWFwID0gbmV3IFdlYXRoZXJNYXAoKTtcbiAgICB3ZWF0aGVyTWFwLnNob3dXZWF0aGVyKCk7XG4gXG5cbiAgICBjb25zdCBteUxpc3QgPSBuZXcgTGlzdHMoKTtcbiAgXG5cbiAgICBjb25zdCBmaXJlQmFzZSA9IG5ldyBGaXJlQmFzZSgpO1xuICAgIGZpcmVCYXNlLm5ld1VzZXJTaWduKCk7XG5cblxuIFxufSkiXX0=
