(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//         //firebase interactive-map

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

        // logOut.classList.add("hide");


        //wylogowanie sie uzytkownika

        this.logOut.addEventListener("click", function (e) {
            _this.firebase.auth().signOut();
        });

        //pokaz formularz do rejestracji
        this.signIn.addEventListener("click", function (e) {
            document.getElementById('signInForm').style.display = "block";
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
        _this.listEl = _this.listOfCountry.children;

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
            }
        });
        _this.btnSearch.addEventListener("click", function () {
            _this.viewCountry(event);
        });
        _this.exit = document.querySelector("#exitBtn");
        _this.exit.addEventListener("click", function () {
            return _this.hideElement(_this.sectionSec);
        });

        [].concat(_toConsumableArray(_this.countryMap)).map(function (country) {
            country.addEventListener("click", function (e) {
                _this.attribute = e.target.getAttribute("title");
                e.preventDefault();
                _this.hideElement(_this.list);
                _this.selectCountries(_this.attribute);
                _this.showSection(_this.sectionSec, '20%');
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


                    _this2.addItemToList(_this2.listOfCountry, country.name, 'Name of the country: ');
                    _this2.addItemToList(_this2.listOfCountry, country.capital, 'Capital: ');

                    [].concat(_toConsumableArray(currencies)).forEach(function (currency) {
                        _this2.addItemToList(_this2.listOfCountry, currency.name, 'Currency: ');
                    });

                    [].concat(_toConsumableArray(languages)).forEach(function (language) {
                        _this2.addItemToList(_this2.listOfCountry, language.name, 'Language: ');
                    });

                    _this2.addItemToList(_this2.listOfCountry, country.population, 'Population: ');

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
            this.showSection(this.sectionSec, '20%');
            _get(Map.prototype.__proto__ || Object.getPrototypeOf(Map.prototype), "viewCountry", this).call(this, event, this.countryMap, this.smallMap, this.title.value, this.attribute);
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
        this.title = document.querySelector("#countryName");
        this.toolTip = document.querySelector("#toolTip");
        this.header = document.querySelector("#header");
        this.button = document.querySelector(".btnAdd");
        this.btnSearch = document.querySelector("#btn");
        this.list = header.querySelector("ul");
        this.countries = [];
        this.smallCountries = [];
        this.mouse = null;
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
            window.onmousemove = this.mouse;
            return this.mouse = function (e) {
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
        value: function addItemToList(parent, item, text) {
            var newLi = document.createElement("li");
            newLi.classList.add("elInfo");
            newLi.innerText = text + item;
            parent.appendChild(newLi);
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
    var btn = document.querySelector("#btn");
    var title = document.querySelector("#countryName");
    var map = new _MapSetup.MapSetup();
    map.createArrayBigMap();
    map.createArraySmallMap();
    map.mousePosition();
    map.selectCountries();
    console.log(map);

    var bigMap = new _Map.Map();
    bigMap.blinkMap();
    bigMap.selectCountries();

    console.log(bigMap);

    var toolTip = new _ToolTips.ToolTips();
    toolTip.showCountryFromTableTips();
    console.log(toolTip);

    var weatherMap = new _WeatherMap.WeatherMap();
    weatherMap.showWeather();
    console.log(weatherMap);

    var myList = new _List.Lists();
    console.log(myList);

    var fireBase = new _FireBase.FireBase();
    fireBase.newUserSign();
    console.log(fireBase);
    //         //firebase interactive-map
    //         const config = {
    //             apiKey: "AIzaSyAdWKgrquitVPYVZaieV2ZZFJKC95Iel98",
    //             authDomain: "interactive-map-f5060.firebaseapp.com",
    //             databaseURL: "https://interactive-map-f5060.firebaseio.com",
    //             projectId: "interactive-map-f5060",
    //             storageBucket: "interactive-map-f5060.appspot.com",
    //             messagingSenderId: "595861650630"
    //           };
    //         firebase.initializeApp(config);
    //         const database = firebase.database();

    //         //elementy do logowania
    //         const logIn = document.getElementById("logIn");
    //         const signIn = document.getElementById("signIn");
    //         const logOut = document.getElementById("logOut");
    //         const btnSendSign = document.getElementById("sendSignIn");
    //         const btnSendLog = document.getElementById("sendLogIn");
    //         const form = document.getElementById("signInForm");
    //         const array = [];

    //         //pokaz formularz do logowania

    //         // logOut.classList.add("hide");
    //         logIn.addEventListener("click", e =>{
    //             document.getElementById('logInForm').style.display = "block";

    //         });

    //         //wylogowanie sie uzytkownika

    //         logOut.addEventListener("click", e => {
    //             firebase.auth().signOut()
    //         })
    //         //pokaz formularz do rejestracji
    //         signIn.addEventListener("click", e => {
    //             document.getElementById('signInForm').style.display = "block";
    //         });

    //         //zalogowanie uzytkownika

    //         btnSendLog.addEventListener("click", e => {
    //             e.preventDefault();
    //             const passw = document.getElementById("password").value;
    //             const email = document.getElementById("email").value
    //             const auth = firebase.auth();

    //             const promise = auth.signInWithEmailAndPassword(email, passw);
    //             promise.catch(e => console.log(e.message));


    //         })

    //         //rejestracja nowego uzytkownika
    //         btnSendSign.addEventListener("click", e => {
    //             e.preventDefault();
    //             const passw = document.getElementById("password").value;
    //             const email = document.getElementById("email").value;
    //             const auth = firebase.auth();

    //             const promise = auth.createUserWithEmailAndPassword(email, passw);
    //             promise.catch(e => console.log(e.message));

    //         })


    //         firebase.auth().onAuthStateChanged(function(user){
    //             if(user){   
    //                 console.log(user + "logged in" + firebase.auth().currentUser.uid);
    //                 logOut.classList.remove("hide");
    //             } else {
    //                 console.log('not logged in');
    //                 logOut.classList.add("hide");
    //             }
    //         })

    //         //zmienne
    //         let img = document.querySelector("#map");
    //         let countryMap = img.querySelectorAll("path");
    //         let imgSmall = document.querySelector("#mapSec");
    //         let smallMap = imgSmall.querySelectorAll("path");
    //         let title = document.querySelector("#countryName");
    //         let toolTip = document.querySelector("#toolTip");
    //         let header = document.querySelector("#header");

    //         let btn = document.querySelector("#btn");
    //         let tips = document.querySelector("#tipBtn");
    //         let listBtn = btn.previousElementSibling;


    //         let list = header.querySelector("ul");
    //         let sectionSec = document.querySelector("#secondSec");
    //         let apiKeyWet = 'f4779c85f173bc69a529ddd3ab6e9770';
    //         let apiKeyTime = 'ALQA70H88TB7';
    //         let exit = document.querySelector("#exitBtn");

    //         let boxWeather = document.querySelector("#weatherBox");
    //         // let countryInfo = document.querySelector("#countryList");
    //         let sun = document.querySelector("#sun");
    //         let moon = document.querySelector("#moon");
    //         let littleMoon = document.querySelector("#littleMoon");
    //         let location = null;
    //         let country = null;
    //         let dataCountry = null;

    //         let listSection = document.querySelector(".list__box");
    //         let visitedList = document.querySelector("#listVisited");
    //         let wishList = document.querySelector("#listWish");
    //         let visitBtn = document.querySelector("#addToVisit");
    //         let addVisitedBtn = visitBtn.previousElementSibling;


    //         // tablica obiektow kraje id i nazwy
    //         let countries = []

    //         countryMap.forEach(country => {
    //             if(typeof country !== 'undefined'){
    //                 countries.push({id: country.id, title: country.getAttribute("title")});
    //                 return countries;
    //             }


    //         })

    //         //small map - podswietlenie wybranego kraju
    //         let smallCountries = []

    //             smallMap.forEach(country => {
    //                 if(typeof country !== 'undefined'){
    //                     smallCountries.push({id: country.id, title: country.getAttribute("title")});

    //                     return smallCountries;
    //                 }

    //         })

    //         //pozycja kursora
    //         window.onmousemove = mousePosition;
    //         function mousePosition(e){
    //             return { x: e.clientX, y: e.clientY };  
    //         }  

    //         //najechanie na mape i podswietlenie
    //         countryMap.forEach(country => {
    //             country.addEventListener("mouseenter", function(){
    //                 this.classList.add("visibleCountry");
    //                 toolTip.innerText = country.getAttribute("title");
    //                 title.innerText = country.getAttribute("title");

    //                 toolTip.style.display = "block";
    //                 toolTip.style.top = mousePosition(window.event).y + "px";
    //                 toolTip.style.transform = "translate(0,100%)";
    //                 toolTip.style.left = mousePosition(window.event).x + "px";

    //             })

    //             country.addEventListener("mouseleave", function(){
    //                 this.classList.remove("visibleCountry");
    //                 toolTip.style.display = "none";

    //             })


    //         })

    //         //widocznosc sekcji

    //         function showSection(section, positionTop){
    //             section.style.display = 'block';
    //             section.style.opacity = '1';
    //             section.style.top = positionTop;
    //         }

    //         //funkcja chowająca element 
    //         function hideElement(element){
    //             element.style.display = 'none';
    //         }


    //         //pobranie inputa i podswietlenie mapy

    //         function viewCountry(event, name){
    //             event.preventDefault();
    //             hideElement(list);
    //             showSection(sectionSec, '20%');
    //             connectToCountries(countries);
    //             countryMap.forEach(country => {
    //                 let attr = country.getAttribute("title");
    //                 if(attr === name.value){
    //                     country.classList.add("visibleCountry"); 

    //                 }

    //             })
    //             smallMap.forEach(small =>{
    //                 let attr = small.getAttribute("title");
    //                 if(attr === name.value){
    //                     small.classList.add("visibleCountry"); 

    //                 }
    //             })
    //             btn.setAttribute("disabled", "true");

    //         }

    //         // zdarzenie na btn search
    //         btn.addEventListener("click", () => viewCountry(event, title));

    //         // zdarzenie na enter
    //         title.addEventListener("keyup", function(e){
    //             if(e.keyCode === 13){
    //                 viewCountry(event, title);
    //             }
    //         })


    //         // dodawanie li do list info i weather
    //         function addItemToWeatherList(parent, item, text){
    //             let li = document.createElement("li");
    //             li.innerText = text + item;
    //             li.classList.add("elRightList");
    //             parent.appendChild(li);   
    //         }

    //         function addItemToList( parent, item, text, mapCountry ){
    //             let button = document.querySelector(".btnAdd");
    //             let newLi = document.createElement("li");
    //             newLi.classList.add("elInfo");
    //             newLi.innerText = text + item;
    //             parent.appendChild(newLi);


    //             // podlaczenie do api pogody i dodanie elementow do boxWeather
    //             function showWeather(){
    //                 country.map(el => {
    //                    if(el.name === item){
    //                     fetch(`https://api.apixu.com/v1/current.json?key=38d2497fd3b242e78fb182314181601&q=${el.capital}`)
    //                         .then(res => res.json())
    //                         .then(data => {
    //                             console.log(data);
    //                             const { location, current } = data;

    //                             let header = document.querySelector("#titleWeather");
    //                             header.innerText = `Weather in ${location.name} `
    //                             let weatherList = document.querySelector("#weatherList");

    //                             addItemToWeatherList(weatherList, current.temp_c, "Current temperature: ");
    //                             addItemToWeatherList(weatherList, current.feelslike_c, "Feelslike temperature:  ");
    //                             addItemToWeatherList(weatherList, current.humidity, "Humidity:  ");
    //                             addItemToWeatherList(weatherList, current.pressure_mb, "Pressure:  ");
    //                             addItemToWeatherList(weatherList, current.wind_kph, "Wind km/h:  ");
    //                             addItemToWeatherList(weatherList, current.condition.text,"Weather condition:  ");


    //                             let img = document.createElement("img");
    //                             img.setAttribute("src", current.condition.icon);
    //                             img.classList.add("icon");
    //                             boxWeather.appendChild(img);

    //                             let timeParagraph = document.createElement("p");
    //                             timeParagraph.innerText = current.last_updated;
    //                             timeParagraph.classList.add("time");
    //                             boxWeather.insertBefore(timeParagraph, sun);

    //                             let newTime = current.last_updated.slice(11, 16);
    //                             if(newTime[0] >= 2 || newTime[0] === '0' && newTime[1] <= 5){
    //                                 document.querySelector(".second-page__list--moon").style.display = "block";
    //                                 boxWeather.classList.add("night");

    //                             } else {
    //                                 document.querySelector(".second-page__list--sun").style.display = "block";
    //                                 boxWeather.classList.add("day");
    //                             }


    //                         }).catch(error => {
    //                             console.log('fail', error);
    //                         })
    //                     }
    //                 })


    //             }
    //             // po kliknięciu pokazuje sie okno z pogodą
    //             button.addEventListener('click', () => {
    //                 showWeather();
    //                 boxWeather.style.display = "block";
    //                 boxWeather.style.opacity = "1";
    //                 button.innerText = "Hide weather";
    //                 button.setAttribute("disabled", "true");
    //                 scrollIt(boxWeather)

    //             });

    //         }

    //         // funkcja scroll to danej sekcji
    //         function scrollIt(element) {
    //             window.scrollTo({
    //                 'behavior': 'smooth',
    //                 'top': element.offsetTop
    //             });
    //         }


    //         //podlaczenie sie do api countries i pobranie danych + dolaczenie do listy

    //         function connectToCountries(countries){
    //             fetch('https://restcountries.eu/rest/v2/all')
    //             .then(res => res.json())
    //             .then(data => {
    //                 dataCountry = data;
    //                 let arr = [];
    //                 data.map(item =>{
    //                     arr.push(item);
    //                     const { name, capital, currencies, languages, population } = item;

    //                     location = capital;
    //                     country = data;

    //                     const currency = currencies.map(curr =>{
    //                         return curr.name;
    //                     })

    //                     const language = languages.map(lang =>{
    //                         return lang.name;
    //                     })

    //                     let listOfCountry = document.querySelector("#countryList");

    //                     if(title.value === name){
    //                         addItemToList(listOfCountry, name, 'Name of the country: ', countries);
    //                         addItemToList(listOfCountry, capital, 'Capital: ', countries);
    //                         addItemToList(listOfCountry, currency, 'Currency: ', countries);
    //                         addItemToList(listOfCountry, language, 'Language: ', countries);
    //                         addItemToList(listOfCountry, population, 'Population: ', countries);

    //                         let leftBox = document.querySelector("#leftBox");
    //                         leftBox.style.backgroundImage = `url(${item.flag})`;
    //                         leftBox.classList.add("leftBoxBackground");

    //                         return arr; 
    //                     }  

    //                 })  
    //                 }).catch(error => {
    //                     console.log('fail', error);
    //             })
    //         }


    //         // btn tips wyswietla tablice z nazwami krajów i chowa
    //         function createTableTips(){     
    //             list.classList.add("tips");
    //             let arrayOfLi = [];
    //             const tipsArray = countries.map(el => {
    //                 let newLi = document.createElement("li");
    //                 newLi.classList.add("tipsElement");
    //                 list.appendChild(newLi);
    //                 newLi.innerText = el.title;
    //                 header.appendChild(list); 

    //                 arrayOfLi.push(newLi);
    //                 return arrayOfLi;
    //             })

    //             arrayOfLi.forEach(el =>{
    //                 el.addEventListener("click",function(){
    //                     let text = this.innerText;
    //                     title.value = text;
    //                 })
    //             })

    //             return tipsArray;

    //         }

    //         //po kliknięciu na btn pokazanie tablicy tips i wyłączenie guzika
    //         tips.addEventListener("click",function(){
    //             if(list.getAttribute("class") !== "tips"){
    //                 createTableTips()
    //             } else {
    //                 hideElement(list);
    //                 tips.setAttribute("disabled", "true");
    //             }

    //         })


    //         //wyjście z drugiej sekcji

    //         exit.addEventListener("click", () => hideElement(sectionSec));


    //         // przejście do sekcji -  lista i wyjście z sekcji


    //         // listBtn.addEventListener("click", function(){
    //         //     showSection(listSection, '120%');
    //         //     scrollIt(listSection);
    //         // });

    //         document.querySelector("#exitList").addEventListener("click", () => hideElement(listSection));


    //         // dodanie do listy życzeń

    //          function saveDataToDB(item, user) {
    //             array.push(item);

    //             database.ref('item').set({
    //                 country: array,

    //             })
    //             database.ref('user').set({
    //                 user: firebase.auth().currentUser.uid,

    //             })
    //         }

    //         function swichListItem(parent){

    //             const listEl = document.querySelectorAll(".elInfo");
    //             let country = listEl[0].innerText;
    //             addItemToList(parent, country, '' );
    //             saveDataToDB(country);

    //         }


    //         visitBtn.addEventListener("click", function(){
    //             showSection(listSection, '120%');
    //             scrollIt(listSection);
    //             swichListItem(wishList);
    //             console.log(array);
    //         });

    //         addVisitedBtn.addEventListener("click", function(){
    //             showSection(listSection, '120%');
    //             scrollIt(listSection);
    //             swichListItem(visitedList);
    //         })

});

},{"./FireBase":1,"./List":2,"./Map.js":3,"./MapSetup.js":4,"./ToolTips":5,"./WeatherMap":6}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9GaXJlQmFzZS5qcyIsInNyYy9zY3JpcHRzL0xpc3QuanMiLCJzcmMvc2NyaXB0cy9NYXAuanMiLCJzcmMvc2NyaXB0cy9NYXBTZXR1cC5qcyIsInNyYy9zY3JpcHRzL1Rvb2xUaXBzLmpzIiwic3JjL3NjcmlwdHMvV2VhdGhlck1hcC5qcyIsInNyYy9zY3JpcHRzL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQTs7SUFFTSxRO0FBQ0Ysd0JBQWE7QUFBQTs7QUFBQTs7QUFDVCxhQUFLLE1BQUwsR0FBYztBQUNWLG9CQUFRLHlDQURFO0FBRVYsd0JBQVksdUNBRkY7QUFHVix5QkFBYSw4Q0FISDtBQUlWLHVCQUFXLHVCQUpEO0FBS1YsMkJBQWUsbUNBTEw7QUFNViwrQkFBbUI7QUFOVCxTQUFkO0FBUUEsYUFBSyxRQUFMLEdBQWdCLFNBQVMsYUFBVCxDQUF1QixLQUFLLE1BQTVCLENBQWhCO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLEtBQUssUUFBTCxDQUFjLFFBQWQsRUFBaEI7O0FBRUE7QUFDQSxhQUFLLEtBQUwsR0FBYSxTQUFTLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBYjtBQUNBLGFBQUssTUFBTCxHQUFjLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFkO0FBQ0EsYUFBSyxNQUFMLEdBQWMsU0FBUyxjQUFULENBQXdCLFFBQXhCLENBQWQ7QUFDQSxhQUFLLFdBQUwsR0FBbUIsU0FBUyxjQUFULENBQXdCLFlBQXhCLENBQW5CO0FBQ0EsYUFBSyxVQUFMLEdBQWtCLFNBQVMsY0FBVCxDQUF3QixXQUF4QixDQUFsQjtBQUNBLGFBQUssSUFBTCxHQUFZLFNBQVMsY0FBVCxDQUF3QixZQUF4QixDQUFaO0FBQ0EsYUFBSyxLQUFMLEdBQWEsRUFBYjs7QUFHQTtBQUNBLGFBQUssS0FBTCxDQUFXLGdCQUFYLENBQTRCLE9BQTVCLEVB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QUFNLFNBQVMsaUJBQWY7QUFDQSxZQUFRLEdBQVIsQ0FBWSxNQUFaOztBQUVBLFFBQU0sV0FBVyx3QkFBakI7QUFDQSxhQUFTLFdBQVQ7QUFDQSxZQUFRLEdBQVIsQ0FBWSxRQUFaO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFLQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUlBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVJO0FBQ0E7QUFDQTs7QUFFSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7O0FBRUE7OztBQUlBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFJSyxDQWhlSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyAgICAgICAgIC8vZmlyZWJhc2UgaW50ZXJhY3RpdmUtbWFwXG5cbmNsYXNzIEZpcmVCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgICAgICAgIGFwaUtleTogXCJBSXphU3lBZFdLZ3JxdWl0VlBZVlphaWVWMlpaRkpLQzk1SWVsOThcIixcbiAgICAgICAgICAgIGF1dGhEb21haW46IFwiaW50ZXJhY3RpdmUtbWFwLWY1MDYwLmZpcmViYXNlYXBwLmNvbVwiLFxuICAgICAgICAgICAgZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly9pbnRlcmFjdGl2ZS1tYXAtZjUwNjAuZmlyZWJhc2Vpby5jb21cIixcbiAgICAgICAgICAgIHByb2plY3RJZDogXCJpbnRlcmFjdGl2ZS1tYXAtZjUwNjBcIixcbiAgICAgICAgICAgIHN0b3JhZ2VCdWNrZXQ6IFwiaW50ZXJhY3RpdmUtbWFwLWY1MDYwLmFwcHNwb3QuY29tXCIsXG4gICAgICAgICAgICBtZXNzYWdpbmdTZW5kZXJJZDogXCI1OTU4NjE2NTA2MzBcIlxuICAgICAgICAgIH07XG4gICAgICAgIHRoaXMuZmlyZWJhc2UgPSBmaXJlYmFzZS5pbml0aWFsaXplQXBwKHRoaXMuY29uZmlnKTtcbiAgICAgICAgdGhpcy5kYXRhYmFzZSA9IHRoaXMuZmlyZWJhc2UuZGF0YWJhc2UoKTtcblxuICAgICAgICAvL2VsZW1lbnR5IGRvIGxvZ293YW5pYVxuICAgICAgICB0aGlzLmxvZ0luID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dJblwiKTtcbiAgICAgICAgdGhpcy5zaWduSW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZ25JblwiKTtcbiAgICAgICAgdGhpcy5sb2dPdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ091dFwiKTtcbiAgICAgICAgdGhpcy5idG5TZW5kU2lnbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VuZFNpZ25JblwiKTtcbiAgICAgICAgdGhpcy5idG5TZW5kTG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZW5kTG9nSW5cIik7XG4gICAgICAgIHRoaXMuZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lnbkluRm9ybVwiKTtcbiAgICAgICAgdGhpcy5hcnJheSA9IFtdO1xuXG4gICAgICAgICAgXG4gICAgICAgIC8vcG9rYXogZm9ybXVsYXJ6IGRvIGxvZ293YW5pYVxuICAgICAgICB0aGlzLmxvZ0luLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+e1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZ0luRm9ybScpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgIFxuICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gbG9nT3V0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuXG4gICAgXG4gICAgICAgIC8vd3lsb2dvd2FuaWUgc2llIHV6eXRrb3duaWthXG4gICAgXG4gICAgICAgIHRoaXMubG9nT3V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmlyZWJhc2UuYXV0aCgpLnNpZ25PdXQoKVxuICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgLy9wb2theiBmb3JtdWxhcnogZG8gcmVqZXN0cmFjamlcbiAgICAgICAgdGhpcy5zaWduSW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZ25JbkZvcm0nKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL3phbG9nb3dhbmllIHV6eXRrb3duaWthXG4gICAgICBcbiAgICAgICAgdGhpcy5idG5TZW5kTG9nLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHBhc3N3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzd29yZFwiKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbWFpbFwiKS52YWx1ZVxuICAgICAgICAgICAgY29uc3QgYXV0aCA9IHRoaXMuZmlyZWJhc2UuYXV0aCgpO1xuICAgIFxuICAgICAgICAgICAgY29uc3QgcHJvbWlzZSA9IGF1dGguc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWwsIHBhc3N3KTtcbiAgICAgICAgICAgIHByb21pc2UuY2F0Y2goZSA9PiBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpKTtcbiAgICBcbiAgICAgXG4gICAgICAgIH0pXG5cbiAgICAgICAgICAgIFxuICAgICAgICAvL3JlamVzdHJhY2phIG5vd2VnbyB1enl0a293bmlrYVxuICAgICAgICB0aGlzLmJ0blNlbmRTaWduLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHBhc3N3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzd29yZFwiKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbWFpbFwiKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGF1dGggPSB0aGlzLmZpcmViYXNlLmF1dGgoKTtcbiAgICBcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBhdXRoLmNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzc3cpO1xuICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChlID0+IGNvbnNvbGUubG9nKGUubWVzc2FnZSkpO1xuICAgIFxuICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgbmV3VXNlclNpZ24oKXtcbiAgICAgICAgdGhpcy5maXJlYmFzZS5hdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKCB1c2VyID0+e1xuICAgICAgICAgICAgaWYodXNlcil7ICAgXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codXNlciArIFwibG9nZ2VkIGluXCIgKyB0aGlzLmZpcmViYXNlLmF1dGgoKS5jdXJyZW50VXNlci51aWQpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nT3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbm90IGxvZ2dlZCBpbicpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nT3V0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuXG59XG5cbmV4cG9ydCB7RmlyZUJhc2V9OyIsImltcG9ydCB7IE1hcFNldHVwIH0gZnJvbSBcIi4vTWFwU2V0dXBcIjtcblxuY2xhc3MgTGlzdHMgZXh0ZW5kcyBNYXBTZXR1cHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmxpc3RTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0X19ib3hcIik7XG4gICAgICAgIHRoaXMudmlzaXRlZExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xpc3RWaXNpdGVkXCIpO1xuICAgICAgICB0aGlzLndpc2hMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsaXN0V2lzaFwiKTtcbiAgICAgICAgdGhpcy52aXNpdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkVG9WaXNpdFwiKTtcbiAgICAgICAgdGhpcy5hZGRWaXNpdGVkQnRuID0gdGhpcy52aXNpdEJ0bi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICB0aGlzLmJ0bkxpc3RFeGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNleGl0TGlzdFwiKTtcbiAgICAgICAgdGhpcy5saXN0RWwgPSB0aGlzLmxpc3RPZkNvdW50cnkuY2hpbGRyZW47XG4gICAgICBcblxuICAgICAgICB0aGlzLmJ0bkxpc3RFeGl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmhpZGVFbGVtZW50KHRoaXMubGlzdFNlY3Rpb24pKTtcblxuICAgICAgICB0aGlzLnZpc2l0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbih0aGlzLmxpc3RTZWN0aW9uLCAnMTIwJScpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxJdCh0aGlzLmxpc3RTZWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuc3dpY2hMaXN0SXRlbSh0aGlzLndpc2hMaXN0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRWaXNpdGVkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbih0aGlzLmxpc3RTZWN0aW9uLCAnMTIwJScpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxJdCh0aGlzLmxpc3RTZWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuc3dpY2hMaXN0SXRlbSh0aGlzLnZpc2l0ZWRMaXN0KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzd2ljaExpc3RJdGVtKHBhcmVudCl7XG4gICAgICAgIGxldCBjb3VudHJ5ID0gdGhpcy5saXN0RWxbMF0uaW5uZXJUZXh0O1xuICAgICAgICB0aGlzLmFkZEl0ZW1Ub0xpc3QocGFyZW50LCBjb3VudHJ5LCAnJyApO1xuXG4gICAgICAgIC8vIHNhdmVEYXRhVG9EQihjb3VudHJ5KTtcbiAgICAgICAgICAgXG4gICAgfVxuICAgICAgIFxuXG59XG5cbmV4cG9ydCB7IExpc3RzIH0iLCJpbXBvcnQgeyBNYXBTZXR1cCB9IGZyb20gXCIuL01hcFNldHVwXCI7XG5cblxuY2xhc3MgTWFwIGV4dGVuZHMgTWFwU2V0dXAge1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc2VjdGlvblNlYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2Vjb25kU2VjXCIpO1xuICAgICAgICB0aGlzLmxlZnRCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xlZnRCb3hcIik7XG4gICAgICAgIHRoaXMudGl0bGUuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PntcbiAgICAgICAgICAgIGlmKGUua2V5Q29kZSA9PT0gMTMpe1xuICAgICAgICAgICAgICAgIHRoaXMudmlld0NvdW50cnkoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLmJ0blNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT57dGhpcy52aWV3Q291bnRyeShldmVudCl9IClcbiAgICAgICAgdGhpcy5leGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNleGl0QnRuXCIpO1xuICAgICAgICB0aGlzLmV4aXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuaGlkZUVsZW1lbnQodGhpcy5zZWN0aW9uU2VjKSk7XG4gICBcblxuICAgICAgICBbLi4udGhpcy5jb3VudHJ5TWFwXS5tYXAoY291bnRyeSA9PiB7XG4gICAgICAgICAgICBjb3VudHJ5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0cmlidXRlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZUVsZW1lbnQodGhpcy5saXN0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdENvdW50cmllcyh0aGlzLmF0dHJpYnV0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbih0aGlzLnNlY3Rpb25TZWMsJzIwJScpO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld0NvdW50cnkoZXZlbnQsIHRoaXMuY291bnRyeU1hcCwgdGhpcy5zbWFsbE1hcCwgdGhpcy50aXRsZS52YWx1ZSwgdGhpcy5hdHRyaWJ1dGUpO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgfVxuICAgIFxuICAgIGJsaW5rTWFwKCl7XG4gICAgICAgIHN1cGVyLmJsaW5rTWFwKHRoaXMuY291bnRyeU1hcCk7XG4gICAgfVxuXG4gICAgc2VsZWN0Q291bnRyaWVzKGF0dHIpe1xuICAgICAgICBzdXBlci5zZWxlY3RDb3VudHJpZXMoKTtcbiAgICAgICAgICAgIFsuLi50aGlzLmNvdW50cmllc0JveF0ubWFwKGNvdW50cnkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMudGl0bGUudmFsdWUgPT09IGNvdW50cnkubmFtZSB8fCBhdHRyID09PSBjb3VudHJ5Lm5hbWUpe1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7bGFuZ3VhZ2VzLCBjdXJyZW5jaWVzfSA9IGNvdW50cnk7XG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbVRvTGlzdCh0aGlzLmxpc3RPZkNvdW50cnksIGNvdW50cnkubmFtZSwgJ05hbWUgb2YgdGhlIGNvdW50cnk6ICcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW1Ub0xpc3QodGhpcy5saXN0T2ZDb3VudHJ5LCBjb3VudHJ5LmNhcGl0YWwsICdDYXBpdGFsOiAnKTtcblxuICAgICAgICAgICAgICAgICAgICBbLi4uY3VycmVuY2llc10uZm9yRWFjaChjdXJyZW5jeT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtVG9MaXN0KHRoaXMubGlzdE9mQ291bnRyeSwgY3VycmVuY3kubmFtZSwgJ0N1cnJlbmN5OiAnKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gIFxuICAgICAgICAgICAgICAgICAgICBbLi4ubGFuZ3VhZ2VzXS5mb3JFYWNoKGxhbmd1YWdlID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtVG9MaXN0KHRoaXMubGlzdE9mQ291bnRyeSwgbGFuZ3VhZ2UubmFtZSwgJ0xhbmd1YWdlOiAnKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtVG9MaXN0KHRoaXMubGlzdE9mQ291bnRyeSwgY291bnRyeS5wb3B1bGF0aW9uLCAnUG9wdWxhdGlvbjogJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZWZ0Qm94LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtjb3VudHJ5LmZsYWd9KWA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGVmdEJveC5jbGFzc0xpc3QuYWRkKFwibGVmdEJveEJhY2tncm91bmRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgIH1cblxuICAgIHZpZXdDb3VudHJ5KGUsIGNvdW50cmllc0FycmF5T25lLCBjb3VudHJpZXNBcnJheVR3bywgaW5wdXQsIGNsaWNrZWRDb3VudHJ5KXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmhpZGVFbGVtZW50KHRoaXMubGlzdCk7XG4gICAgICAgIHRoaXMuc2VsZWN0Q291bnRyaWVzKCk7XG4gICAgICAgIHRoaXMuc2hvd1NlY3Rpb24odGhpcy5zZWN0aW9uU2VjLCcyMCUnKTtcbiAgICAgICAgc3VwZXIudmlld0NvdW50cnkoZXZlbnQsIHRoaXMuY291bnRyeU1hcCwgdGhpcy5zbWFsbE1hcCwgdGhpcy50aXRsZS52YWx1ZSwgdGhpcy5hdHRyaWJ1dGUpICAgICAgICBcbiAgICB9XG5cbn1cblxuZXhwb3J0IHsgTWFwIH07IiwiXG5jbGFzcyBNYXBTZXR1cCB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5jb3VudHJ5TWFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYXBcIikuY2hpbGRyZW47XG4gICAgICAgIHRoaXMuc21hbGxNYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21hcFNlY1wiKS5jaGlsZHJlbjtcbiAgICAgICAgdGhpcy5saXN0T2ZDb3VudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb3VudHJ5TGlzdFwiKTtcbiAgICAgICAgdGhpcy50aXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY291bnRyeU5hbWVcIik7XG4gICAgICAgIHRoaXMudG9vbFRpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9vbFRpcFwiKTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hlYWRlclwiKTtcbiAgICAgICAgdGhpcy5idXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bkFkZFwiKTtcbiAgICAgICAgdGhpcy5idG5TZWFyY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J0blwiKTtcbiAgICAgICAgdGhpcy5saXN0ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKTtcbiAgICAgICAgdGhpcy5jb3VudHJpZXMgPSBbXTtcbiAgICAgICAgdGhpcy5zbWFsbENvdW50cmllcyA9IFtdO1xuICAgICAgICB0aGlzLm1vdXNlID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb3VudHJpZXNCb3ggPSBbXTtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGUgPSBcIlwiO1xuXG4gICAgfVxuXG4gICAgY3JlYXRlQXJyYXlCaWdNYXAoKXtcbiAgICAgICAgcmV0dXJuIFsuLi50aGlzLmNvdW50cnlNYXBdLmZvckVhY2goY291bnRyeSA9PiB7XG4gICAgICAgICAgICBpZih0eXBlb2YgY291bnRyeSAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnRyaWVzLnB1c2goe2lkOiBjb3VudHJ5LmlkLCB0aXRsZTogY291bnRyeS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKX0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvdW50cmllc1xuICAgICAgICAgICAgfSAgICBcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjcmVhdGVBcnJheVNtYWxsTWFwKCl7XG4gICAgICAgIHJldHVybiBbLi4udGhpcy5zbWFsbE1hcF0uZm9yRWFjaChjb3VudHJ5ID0+IHtcbiAgICAgICAgICAgIGlmKHR5cGVvZiBjb3VudHJ5ICE9PSAndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICAgICAgdGhpcy5zbWFsbENvdW50cmllcy5wdXNoKHtpZDogY291bnRyeS5pZCwgdGl0bGU6IGNvdW50cnkuZ2V0QXR0cmlidXRlKFwidGl0bGVcIil9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zbWFsbENvdW50cmllc1xuICAgICAgICAgICAgfSAgICBcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBtb3VzZVBvc2l0aW9uKGUpe1xuICAgICAgICB3aW5kb3cub25tb3VzZW1vdmUgPSB0aGlzLm1vdXNlO1xuICAgICAgICByZXR1cm4gdGhpcy5tb3VzZSA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICByZXR1cm4geyB4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WSB9XG4gICAgICAgIH1cbiAgICB9IFxuICAgIFxuXG4gICAgc2hvd1NlY3Rpb24oc2VjdGlvbiwgcG9zaXRpb25Ub3Ape1xuICAgICAgICBzZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICBzZWN0aW9uLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUudG9wID0gcG9zaXRpb25Ub3A7XG4gICAgfVxuXG4gICAgaGlkZUVsZW1lbnQoZWxlbWVudCl7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG5cblxuICAgIHNlbGVjdENvdW50cmllcygpe1xuICAgICAgIHJldHVybiBmZXRjaChgaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvYWxsYClcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgZGF0YS5tYXAoaXRlbSA9PntcbiAgICAgICAgICAgICAgICB0aGlzLmNvdW50cmllc0JveC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIHJldHVybiAgdGhpcy5jb3VudHJpZXNCb3g7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT57cmV0dXJuIGNvbnNvbGUubG9nKCdmYWlsJywgZXJyb3IpfSlcblxuICAgIH1cblxuICAgIGJsaW5rTWFwKGNvdW50cmllc0FycmF5KXtcbiAgICAgICAgWy4uLmNvdW50cmllc0FycmF5XS5mb3JFYWNoKGNvdW50cnkgPT4ge1xuICAgICAgICAgICAgY291bnRyeS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLChlKSA9PntcblxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlQ291bnRyeVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2xUaXAuaW5uZXJUZXh0ID0gY291bnRyeS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRpdGxlLmlubmVyVGV4dCA9IGNvdW50cnkuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgXG4gICAgICAgICAgICAgICAgdGhpcy50b29sVGlwLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgdGhpcy50b29sVGlwLnN0eWxlLnRvcCA9IHRoaXMubW91c2VQb3NpdGlvbih3aW5kb3cuZXZlbnQpLnkgKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgdGhpcy50b29sVGlwLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlKDAsMTAwJSlcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2xUaXAuc3R5bGUubGVmdCA9IHRoaXMubW91c2VQb3NpdGlvbih3aW5kb3cuZXZlbnQpLnggKyBcInB4XCI7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY291bnRyeS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLChlKSA9PntcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZUNvdW50cnlcIik7XG4gICAgICAgICAgICAgICAgdGhpcy50b29sVGlwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pICBcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBhZGRJdGVtVG9MaXN0KHBhcmVudCwgaXRlbSwgdGV4dCl7XG4gICAgICAgIGxldCBuZXdMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgbmV3TGkuY2xhc3NMaXN0LmFkZChcImVsSW5mb1wiKTtcbiAgICAgICAgbmV3TGkuaW5uZXJUZXh0ID0gdGV4dCArIGl0ZW07XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChuZXdMaSk7XG4gICAgfVxuICAgIFxuICAgIHZpZXdDb3VudHJ5KGUsIGNvdW50cmllc0FycmF5T25lLCBjb3VudHJpZXNBcnJheVR3bywgaW5wdXQsIGNsaWNrZWRDb3VudHJ5KXtcbiAgICAgICAgWy4uLmNvdW50cmllc0FycmF5T25lXS5mb3JFYWNoKGNvdW50cnkgPT4ge1xuICAgICAgICAgICAgbGV0IHRpdGxlT2ZDb3VudHJ5ID0gY291bnRyeS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgICAgICAgICAgIGlmKHRpdGxlT2ZDb3VudHJ5ID09PSBpbnB1dCB8fCB0aXRsZU9mQ291bnRyeSA9PT0gY2xpY2tlZENvdW50cnkpe1xuICAgICAgICAgICAgICAgIGNvdW50cnkuY2xhc3NMaXN0LmFkZChcInZpc2libGVDb3VudHJ5XCIpOyBcbiAgICAgICAgICAgIH0gIFxuICAgICAgICB9KTtcbiAgICAgICAgWy4uLmNvdW50cmllc0FycmF5VHdvXS5mb3JFYWNoKGNvdW50cnkgPT4ge1xuICAgICAgICAgICAgbGV0IHRpdGxlT2ZDb3VudHJ5ID0gY291bnRyeS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgICAgICAgICAgIGlmKHRpdGxlT2ZDb3VudHJ5ID09PSBpbnB1dCB8fCB0aXRsZU9mQ291bnRyeSA9PT0gY2xpY2tlZENvdW50cnkpe1xuICAgICAgICAgICAgICAgIGNvdW50cnkuY2xhc3NMaXN0LmFkZChcInZpc2libGVDb3VudHJ5XCIpOyBcbiAgICAgICAgICAgIH0gIFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzY3JvbGxJdChlbGVtZW50KSB7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgICAgICAnYmVoYXZpb3InOiAnc21vb3RoJyxcbiAgICAgICAgICAgICd0b3AnOiBlbGVtZW50Lm9mZnNldFRvcFxuICAgICAgICB9KTtcbiAgICB9XG5cblxufVxuXG5leHBvcnQgeyBNYXBTZXR1cCB9OyIsImltcG9ydCB7IE1hcFNldHVwIH0gZnJvbSBcIi4vTWFwU2V0dXBcIjtcblxuY2xhc3MgVG9vbFRpcHMgZXh0ZW5kcyBNYXBTZXR1cHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmFycmF5T2ZMaSA9IFtdO1xuICAgICAgICB0aGlzLnRpcHNCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpcEJ0blwiKTtcbiAgICAgICAgdGhpcy50aXBzVGV4dCA9IFwiXCI7XG5cblxuICAgICAgICB0aGlzLnRpcHNCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKGUpPT57XG4gICAgICAgICAgICBpZih0aGlzLmxpc3QuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgIT09IFwidGlwc1wiKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVRhYmxlVGlwcygpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZUVsZW1lbnQodGhpcy5saXN0KTtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcInRydWVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG5cbiAgICB9XG4gICAgY3JlYXRlVGFibGVUaXBzKCl7XG4gICAgICAgIHRoaXMubGlzdC5jbGFzc0xpc3QuYWRkKFwidGlwc1wiKTtcbiAgICAgICAgWy4uLnRoaXMuY291bnRyeU1hcF0ubWFwKGVsID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXR0cmlidXRlID0gZWwuZ2V0QXR0cmlidXRlKFwidGl0bGVcIilcbiAgICAgICAgICAgIGxldCBuZXdMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgICAgIG5ld0xpLmNsYXNzTGlzdC5hZGQoXCJ0aXBzRWxlbWVudFwiKTtcbiAgICAgICAgICAgIHRoaXMubGlzdC5hcHBlbmRDaGlsZChuZXdMaSk7XG4gICAgICAgICAgICBuZXdMaS5pbm5lclRleHQgPSB0aGlzLmF0dHJpYnV0ZTtcbiAgICAgICAgICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0aGlzLmxpc3QpOyBcbiAgICAgICAgICAgIHRoaXMuYXJyYXlPZkxpLnB1c2gobmV3TGkpO1xuICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHNob3dDb3VudHJ5RnJvbVRhYmxlVGlwcygpe1xuICAgICAgICBbLi4udGhpcy5hcnJheU9mTGldLmZvckVhY2godGlwID0+e1xuICAgICAgICAgICAgdGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLChlKSA9PntcbiAgICAgICAgICAgICAgICB0aGlzLnRpcHNUZXh0ID0gZS50YXJnZXQuaW5uZXJUZXh0O1xuICAgICAgICAgICAgICAgIHRoaXMudGl0bGUudmFsdWUgPSB0aGlzLnRpcHNUZXh0O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBUb29sVGlwcyB9IiwiaW1wb3J0IHsgTWFwU2V0dXAgfSBmcm9tIFwiLi9NYXBTZXR1cFwiO1xuXG5jbGFzcyBXZWF0aGVyTWFwIGV4dGVuZHMgTWFwU2V0dXB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy53ZWF0aGVyTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2VhdGhlckxpc3RcIik7XG4gICAgICAgIHRoaXMuaGVhZGVyV2VhdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVXZWF0aGVyXCIpO1xuICAgICAgICB0aGlzLmJveFdlYXRoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlYXRoZXJCb3hcIik7XG4gICAgICAgIHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmJ1dHRvbi5pbm5lclRleHQgPT09IFwiU2hvdyB3ZWF0aGVyXCIpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dXZWF0aGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm94V2VhdGhlci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJveFdlYXRoZXIuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEl0KHRoaXMuYm94V2VhdGhlcik7XG4gICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LmlubmVyVGV4dCA9IFwiSGlkZSB3ZWF0aGVyXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3hXZWF0aGVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuaW5uZXJUZXh0ID0gXCJTaG93IHdlYXRoZXJcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgfVxuICAgIGFkZEl0ZW1Ub1dlYXRoZXJMaXN0KHBhcmVudCwgaXRlbSwgdGV4dCl7XG4gICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgbGkuaW5uZXJUZXh0ID0gdGV4dCArIGl0ZW07XG4gICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoXCJlbFJpZ2h0TGlzdFwiKTtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGxpKTsgICBcbiAgICB9XG5cbiAgICBzaG93V2VhdGhlcigpe1xuICAgICAgICBzdXBlci5zZWxlY3RDb3VudHJpZXMoKTtcbiAgICAgICAgWy4uLnRoaXMuY291bnRyaWVzQm94XS5tYXAoY291bnRyeSA9PiB7XG4gICAgICAgICAgICBpZihjb3VudHJ5Lm5hbWUgPT09IHRoaXMudGl0bGUudmFsdWUpe1xuICAgICAgICAgICAgICAgIGZldGNoKGBodHRwczovL2FwaS5hcGl4dS5jb20vdjEvY3VycmVudC5qc29uP2tleT0zOGQyNDk3ZmQzYjI0MmU3OGZiMTgyMzE0MTgxNjAxJnE9JHtjb3VudHJ5LmNhcGl0YWx9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBsb2NhdGlvbiwgY3VycmVudCB9ID0gZGF0YTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlcldlYXRoZXIuaW5uZXJUZXh0ID0gYFdlYXRoZXIgaW4gJHtsb2NhdGlvbi5uYW1lfSBgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW1Ub1dlYXRoZXJMaXN0KHRoaXMud2VhdGhlckxpc3QsIGN1cnJlbnQudGVtcF9jLCBcIkN1cnJlbnQgdGVtcGVyYXR1cmU6IFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtVG9XZWF0aGVyTGlzdCh0aGlzLndlYXRoZXJMaXN0LCBjdXJyZW50LmZlZWxzbGlrZV9jLCBcIkZlZWxzbGlrZSB0ZW1wZXJhdHVyZTogIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtVG9XZWF0aGVyTGlzdCh0aGlzLndlYXRoZXJMaXN0LCBjdXJyZW50Lmh1bWlkaXR5LCBcIkh1bWlkaXR5OiAgXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW1Ub1dlYXRoZXJMaXN0KHRoaXMud2VhdGhlckxpc3QsIGN1cnJlbnQucHJlc3N1cmVfbWIsIFwiUHJlc3N1cmU6ICBcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbVRvV2VhdGhlckxpc3QodGhpcy53ZWF0aGVyTGlzdCwgY3VycmVudC53aW5kX2twaCwgXCJXaW5kIGttL2g6ICBcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbVRvV2VhdGhlckxpc3QodGhpcy53ZWF0aGVyTGlzdCwgY3VycmVudC5jb25kaXRpb24udGV4dCxcIldlYXRoZXIgY29uZGl0aW9uOiAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgICAgICAgICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgY3VycmVudC5jb25kaXRpb24uaWNvbik7XG4gICAgICAgICAgICAgICAgICAgIGltZy5jbGFzc0xpc3QuYWRkKFwiaWNvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3hXZWF0aGVyLmFwcGVuZENoaWxkKGltZyk7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aW1lUGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVQYXJhZ3JhcGguaW5uZXJUZXh0ID0gY3VycmVudC5sYXN0X3VwZGF0ZWQ7XG4gICAgICAgICAgICAgICAgICAgIHRpbWVQYXJhZ3JhcGguY2xhc3NMaXN0LmFkZChcInRpbWVcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm94V2VhdGhlci5pbnNlcnRCZWZvcmUodGltZVBhcmFncmFwaCwgc3VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1RpbWUgPSBjdXJyZW50Lmxhc3RfdXBkYXRlZC5zbGljZSgxMSwgMTYpO1xuICAgICAgICAgICAgICAgICAgICBpZihuZXdUaW1lWzBdID49IDIgfHwgbmV3VGltZVswXSA9PT0gJzAnICYmIG5ld1RpbWVbMV0gPD0gNSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY29uZC1wYWdlX19saXN0LS1tb29uXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJveFdlYXRoZXIuY2xhc3NMaXN0LmFkZChcIm5pZ2h0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2Vjb25kLXBhZ2VfX2xpc3QtLXN1blwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3hXZWF0aGVyLmNsYXNzTGlzdC5hZGQoXCJkYXlcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmFpbCcsIGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgXG4gICAgfVxufVxuXG5leHBvcnQgeyBXZWF0aGVyTWFwIH07IiwiIFxuIFxuIGltcG9ydCB7IE1hcFNldHVwIH0gZnJvbSAnLi9NYXBTZXR1cC5qcyc7XG4gaW1wb3J0IHsgTWFwIH0gZnJvbSAnLi9NYXAuanMnO1xuIGltcG9ydCB7IFRvb2xUaXBzIH0gZnJvbSAnLi9Ub29sVGlwcyc7XG5pbXBvcnQgeyBXZWF0aGVyTWFwIH0gZnJvbSAnLi9XZWF0aGVyTWFwJztcbmltcG9ydCB7IExpc3RzIH0gZnJvbSAnLi9MaXN0J1xuaW1wb3J0IHtGaXJlQmFzZX0gZnJvbSAnLi9GaXJlQmFzZSdcblxuXG4gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKXtcbiAgICBsZXQgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG5cIik7XG4gICAgbGV0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb3VudHJ5TmFtZVwiKTtcbiAgICBjb25zdCBtYXAgPSBuZXcgTWFwU2V0dXAoKSA7XG4gICAgbWFwLmNyZWF0ZUFycmF5QmlnTWFwKCk7XG4gICAgbWFwLmNyZWF0ZUFycmF5U21hbGxNYXAoKVxuICAgIG1hcC5tb3VzZVBvc2l0aW9uKClcbiAgICBtYXAuc2VsZWN0Q291bnRyaWVzKCk7XG4gICAgY29uc29sZS5sb2cobWFwKVxuXG4gICAgY29uc3QgYmlnTWFwID0gbmV3IE1hcCgpO1xuICAgIGJpZ01hcC5ibGlua01hcCgpO1xuICAgIGJpZ01hcC5zZWxlY3RDb3VudHJpZXMoKVxuXG4gICAgY29uc29sZS5sb2coYmlnTWFwKVxuXG4gICAgY29uc3QgdG9vbFRpcCA9IG5ldyBUb29sVGlwcygpO1xuICAgIHRvb2xUaXAuc2hvd0NvdW50cnlGcm9tVGFibGVUaXBzKClcbiAgICBjb25zb2xlLmxvZyh0b29sVGlwKTtcblxuICAgIGNvbnN0IHdlYXRoZXJNYXAgPSBuZXcgV2VhdGhlck1hcCgpO1xuICAgIHdlYXRoZXJNYXAuc2hvd1dlYXRoZXIoKTtcbiAgICBjb25zb2xlLmxvZyh3ZWF0aGVyTWFwKTtcblxuICAgIGNvbnN0IG15TGlzdCA9IG5ldyBMaXN0cygpO1xuICAgIGNvbnNvbGUubG9nKG15TGlzdClcblxuICAgIGNvbnN0IGZpcmVCYXNlID0gbmV3IEZpcmVCYXNlKCk7XG4gICAgZmlyZUJhc2UubmV3VXNlclNpZ24oKTtcbiAgICBjb25zb2xlLmxvZyhmaXJlQmFzZSk7XG4vLyAgICAgICAgIC8vZmlyZWJhc2UgaW50ZXJhY3RpdmUtbWFwXG4vLyAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcbi8vICAgICAgICAgICAgIGFwaUtleTogXCJBSXphU3lBZFdLZ3JxdWl0VlBZVlphaWVWMlpaRkpLQzk1SWVsOThcIixcbi8vICAgICAgICAgICAgIGF1dGhEb21haW46IFwiaW50ZXJhY3RpdmUtbWFwLWY1MDYwLmZpcmViYXNlYXBwLmNvbVwiLFxuLy8gICAgICAgICAgICAgZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly9pbnRlcmFjdGl2ZS1tYXAtZjUwNjAuZmlyZWJhc2Vpby5jb21cIixcbi8vICAgICAgICAgICAgIHByb2plY3RJZDogXCJpbnRlcmFjdGl2ZS1tYXAtZjUwNjBcIixcbi8vICAgICAgICAgICAgIHN0b3JhZ2VCdWNrZXQ6IFwiaW50ZXJhY3RpdmUtbWFwLWY1MDYwLmFwcHNwb3QuY29tXCIsXG4vLyAgICAgICAgICAgICBtZXNzYWdpbmdTZW5kZXJJZDogXCI1OTU4NjE2NTA2MzBcIlxuLy8gICAgICAgICAgIH07XG4vLyAgICAgICAgIGZpcmViYXNlLmluaXRpYWxpemVBcHAoY29uZmlnKTtcbi8vICAgICAgICAgY29uc3QgZGF0YWJhc2UgPSBmaXJlYmFzZS5kYXRhYmFzZSgpO1xuICAgIFxuLy8gICAgICAgICAvL2VsZW1lbnR5IGRvIGxvZ293YW5pYVxuLy8gICAgICAgICBjb25zdCBsb2dJbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nSW5cIik7XG4vLyAgICAgICAgIGNvbnN0IHNpZ25JbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lnbkluXCIpO1xuLy8gICAgICAgICBjb25zdCBsb2dPdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ091dFwiKTtcbi8vICAgICAgICAgY29uc3QgYnRuU2VuZFNpZ24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbmRTaWduSW5cIik7XG4vLyAgICAgICAgIGNvbnN0IGJ0blNlbmRMb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbmRMb2dJblwiKTtcbi8vICAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lnbkluRm9ybVwiKTtcbi8vICAgICAgICAgY29uc3QgYXJyYXkgPSBbXTtcbiAgICAgICBcbi8vICAgICAgICAgLy9wb2theiBmb3JtdWxhcnogZG8gbG9nb3dhbmlhXG4gICAgICBcbi8vICAgICAgICAgLy8gbG9nT3V0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuLy8gICAgICAgICBsb2dJbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9Pntcbi8vICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dJbkZvcm0nKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICBcbi8vICAgICAgICAgfSk7XG4gICAgXG4vLyAgICAgICAgIC8vd3lsb2dvd2FuaWUgc2llIHV6eXRrb3duaWthXG4gICAgXG4vLyAgICAgICAgIGxvZ091dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4vLyAgICAgICAgICAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbk91dCgpXG4vLyAgICAgICAgIH0pXG4vLyAgICAgICAgIC8vcG9rYXogZm9ybXVsYXJ6IGRvIHJlamVzdHJhY2ppXG4vLyAgICAgICAgIHNpZ25Jbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4vLyAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbkluRm9ybScpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4vLyAgICAgICAgIH0pO1xuICAgICAgICBcbi8vICAgICAgICAgLy96YWxvZ293YW5pZSB1enl0a293bmlrYVxuICAgICAgXG4vLyAgICAgICAgIGJ0blNlbmRMb2cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuLy8gICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuLy8gICAgICAgICAgICAgY29uc3QgcGFzc3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3N3b3JkXCIpLnZhbHVlO1xuLy8gICAgICAgICAgICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtYWlsXCIpLnZhbHVlXG4vLyAgICAgICAgICAgICBjb25zdCBhdXRoID0gZmlyZWJhc2UuYXV0aCgpO1xuICAgIFxuLy8gICAgICAgICAgICAgY29uc3QgcHJvbWlzZSA9IGF1dGguc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWwsIHBhc3N3KTtcbi8vICAgICAgICAgICAgIHByb21pc2UuY2F0Y2goZSA9PiBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpKTtcbiAgICBcbiAgICAgXG4vLyAgICAgICAgIH0pXG4gICAgXG4vLyAgICAgICAgIC8vcmVqZXN0cmFjamEgbm93ZWdvIHV6eXRrb3duaWthXG4vLyAgICAgICAgIGJ0blNlbmRTaWduLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbi8vICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbi8vICAgICAgICAgICAgIGNvbnN0IHBhc3N3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzd29yZFwiKS52YWx1ZTtcbi8vICAgICAgICAgICAgIGNvbnN0IGVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbWFpbFwiKS52YWx1ZTtcbi8vICAgICAgICAgICAgIGNvbnN0IGF1dGggPSBmaXJlYmFzZS5hdXRoKCk7XG4gICAgXG4vLyAgICAgICAgICAgICBjb25zdCBwcm9taXNlID0gYXV0aC5jcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWwsIHBhc3N3KTtcbi8vICAgICAgICAgICAgIHByb21pc2UuY2F0Y2goZSA9PiBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpKTtcbiAgICBcbi8vICAgICAgICAgfSlcbiAgICBcbiAgICBcbi8vICAgICAgICAgZmlyZWJhc2UuYXV0aCgpLm9uQXV0aFN0YXRlQ2hhbmdlZChmdW5jdGlvbih1c2VyKXtcbi8vICAgICAgICAgICAgIGlmKHVzZXIpeyAgIFxuLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXIgKyBcImxvZ2dlZCBpblwiICsgZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZCk7XG4vLyAgICAgICAgICAgICAgICAgbG9nT3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xuLy8gICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbm90IGxvZ2dlZCBpbicpO1xuLy8gICAgICAgICAgICAgICAgIGxvZ091dC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSlcbiAgICBcbi8vICAgICAgICAgLy96bWllbm5lXG4vLyAgICAgICAgIGxldCBpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21hcFwiKTtcbi8vICAgICAgICAgbGV0IGNvdW50cnlNYXAgPSBpbWcucXVlcnlTZWxlY3RvckFsbChcInBhdGhcIik7XG4vLyAgICAgICAgIGxldCBpbWdTbWFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFwU2VjXCIpO1xuLy8gICAgICAgICBsZXQgc21hbGxNYXAgPSBpbWdTbWFsbC5xdWVyeVNlbGVjdG9yQWxsKFwicGF0aFwiKTtcbi8vICAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb3VudHJ5TmFtZVwiKTtcbi8vICAgICAgICAgbGV0IHRvb2xUaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rvb2xUaXBcIik7XG4vLyAgICAgICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hlYWRlclwiKTtcbiAgICBcbi8vICAgICAgICAgbGV0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYnRuXCIpO1xuLy8gICAgICAgICBsZXQgdGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGlwQnRuXCIpO1xuLy8gICAgICAgICBsZXQgbGlzdEJ0biA9IGJ0bi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgIFxuICAgIFxuLy8gICAgICAgICBsZXQgbGlzdCA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKFwidWxcIik7XG4vLyAgICAgICAgIGxldCBzZWN0aW9uU2VjID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWNvbmRTZWNcIik7XG4vLyAgICAgICAgIGxldCBhcGlLZXlXZXQgPSAnZjQ3NzljODVmMTczYmM2OWE1MjlkZGQzYWI2ZTk3NzAnO1xuLy8gICAgICAgICBsZXQgYXBpS2V5VGltZSA9ICdBTFFBNzBIODhUQjcnO1xuLy8gICAgICAgICBsZXQgZXhpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXhpdEJ0blwiKTtcbiBcbi8vICAgICAgICAgbGV0IGJveFdlYXRoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlYXRoZXJCb3hcIik7XG4vLyAgICAgICAgIC8vIGxldCBjb3VudHJ5SW5mbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY291bnRyeUxpc3RcIik7XG4vLyAgICAgICAgIGxldCBzdW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1blwiKTtcbi8vICAgICAgICAgbGV0IG1vb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vb25cIik7XG4vLyAgICAgICAgIGxldCBsaXR0bGVNb29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsaXR0bGVNb29uXCIpO1xuLy8gICAgICAgICBsZXQgbG9jYXRpb24gPSBudWxsO1xuLy8gICAgICAgICBsZXQgY291bnRyeSA9IG51bGw7XG4vLyAgICAgICAgIGxldCBkYXRhQ291bnRyeSA9IG51bGw7XG4gICAgICAgXG4vLyAgICAgICAgIGxldCBsaXN0U2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGlzdF9fYm94XCIpO1xuLy8gICAgICAgICBsZXQgdmlzaXRlZExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xpc3RWaXNpdGVkXCIpO1xuLy8gICAgICAgICBsZXQgd2lzaExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xpc3RXaXNoXCIpO1xuLy8gICAgICAgICBsZXQgdmlzaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZFRvVmlzaXRcIik7XG4vLyAgICAgICAgIGxldCBhZGRWaXNpdGVkQnRuID0gdmlzaXRCdG4ucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICBcbiAgICBcblxuICAgIFxuLy8gICAgICAgICAvLyB0YWJsaWNhIG9iaWVrdG93IGtyYWplIGlkIGkgbmF6d3lcbi8vICAgICAgICAgbGV0IGNvdW50cmllcyA9IFtdXG4gICAgXG4vLyAgICAgICAgIGNvdW50cnlNYXAuZm9yRWFjaChjb3VudHJ5ID0+IHtcbi8vICAgICAgICAgICAgIGlmKHR5cGVvZiBjb3VudHJ5ICE9PSAndW5kZWZpbmVkJyl7XG4vLyAgICAgICAgICAgICAgICAgY291bnRyaWVzLnB1c2goe2lkOiBjb3VudHJ5LmlkLCB0aXRsZTogY291bnRyeS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKX0pO1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiBjb3VudHJpZXM7XG4vLyAgICAgICAgICAgICB9XG4gICAgICAgICAgIFxuICAgICAgICAgICAgXG4vLyAgICAgICAgIH0pXG4gICAgXG4vLyAgICAgICAgIC8vc21hbGwgbWFwIC0gcG9kc3dpZXRsZW5pZSB3eWJyYW5lZ28ga3JhanVcbi8vICAgICAgICAgbGV0IHNtYWxsQ291bnRyaWVzID0gW11cbiAgICAgICAgXG4vLyAgICAgICAgICAgICBzbWFsbE1hcC5mb3JFYWNoKGNvdW50cnkgPT4ge1xuLy8gICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBjb3VudHJ5ICE9PSAndW5kZWZpbmVkJyl7XG4vLyAgICAgICAgICAgICAgICAgICAgIHNtYWxsQ291bnRyaWVzLnB1c2goe2lkOiBjb3VudHJ5LmlkLCB0aXRsZTogY291bnRyeS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKX0pO1xuXG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzbWFsbENvdW50cmllcztcbi8vICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICB9KVxuICAgIFxuLy8gICAgICAgICAvL3BvenljamEga3Vyc29yYVxuLy8gICAgICAgICB3aW5kb3cub25tb3VzZW1vdmUgPSBtb3VzZVBvc2l0aW9uO1xuLy8gICAgICAgICBmdW5jdGlvbiBtb3VzZVBvc2l0aW9uKGUpe1xuLy8gICAgICAgICAgICAgcmV0dXJuIHsgeDogZS5jbGllbnRYLCB5OiBlLmNsaWVudFkgfTsgIFxuLy8gICAgICAgICB9ICBcbiAgICBcbi8vICAgICAgICAgLy9uYWplY2hhbmllIG5hIG1hcGUgaSBwb2Rzd2lldGxlbmllXG4vLyAgICAgICAgIGNvdW50cnlNYXAuZm9yRWFjaChjb3VudHJ5ID0+IHtcbi8vICAgICAgICAgICAgIGNvdW50cnkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgZnVuY3Rpb24oKXtcbi8vICAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlQ291bnRyeVwiKTtcbi8vICAgICAgICAgICAgICAgICB0b29sVGlwLmlubmVyVGV4dCA9IGNvdW50cnkuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4vLyAgICAgICAgICAgICAgICAgdGl0bGUuaW5uZXJUZXh0ID0gY291bnRyeS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgICBcbi8vICAgICAgICAgICAgICAgICB0b29sVGlwLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4vLyAgICAgICAgICAgICAgICAgdG9vbFRpcC5zdHlsZS50b3AgPSBtb3VzZVBvc2l0aW9uKHdpbmRvdy5ldmVudCkueSArIFwicHhcIjtcbi8vICAgICAgICAgICAgICAgICB0b29sVGlwLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlKDAsMTAwJSlcIjtcbi8vICAgICAgICAgICAgICAgICB0b29sVGlwLnN0eWxlLmxlZnQgPSBtb3VzZVBvc2l0aW9uKHdpbmRvdy5ldmVudCkueCArIFwicHhcIjtcbiAgICAgIFxuLy8gICAgICAgICAgICAgfSlcbiAgICBcbi8vICAgICAgICAgICAgIGNvdW50cnkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZnVuY3Rpb24oKXtcbi8vICAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlQ291bnRyeVwiKTtcbi8vICAgICAgICAgICAgICAgICB0b29sVGlwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICBcbi8vICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICAgXG4vLyAgICAgICAgIH0pXG4gICAgXG4vLyAgICAgICAgIC8vd2lkb2N6bm9zYyBzZWtjamlcbiAgICBcbi8vICAgICAgICAgZnVuY3Rpb24gc2hvd1NlY3Rpb24oc2VjdGlvbiwgcG9zaXRpb25Ub3Ape1xuLy8gICAgICAgICAgICAgc2VjdGlvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbi8vICAgICAgICAgICAgIHNlY3Rpb24uc3R5bGUub3BhY2l0eSA9ICcxJztcbi8vICAgICAgICAgICAgIHNlY3Rpb24uc3R5bGUudG9wID0gcG9zaXRpb25Ub3A7XG4vLyAgICAgICAgIH1cbiAgICBcbi8vICAgICAgICAgLy9mdW5rY2phIGNob3dhasSFY2EgZWxlbWVudCBcbi8vICAgICAgICAgZnVuY3Rpb24gaGlkZUVsZW1lbnQoZWxlbWVudCl7XG4vLyAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4vLyAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgXG4vLyAgICAgICAgIC8vcG9icmFuaWUgaW5wdXRhIGkgcG9kc3dpZXRsZW5pZSBtYXB5XG4gICAgXG4vLyAgICAgICAgIGZ1bmN0aW9uIHZpZXdDb3VudHJ5KGV2ZW50LCBuYW1lKXtcbi8vICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4vLyAgICAgICAgICAgICBoaWRlRWxlbWVudChsaXN0KTtcbi8vICAgICAgICAgICAgIHNob3dTZWN0aW9uKHNlY3Rpb25TZWMsICcyMCUnKTtcbi8vICAgICAgICAgICAgIGNvbm5lY3RUb0NvdW50cmllcyhjb3VudHJpZXMpO1xuLy8gICAgICAgICAgICAgY291bnRyeU1hcC5mb3JFYWNoKGNvdW50cnkgPT4ge1xuLy8gICAgICAgICAgICAgICAgIGxldCBhdHRyID0gY291bnRyeS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbi8vICAgICAgICAgICAgICAgICBpZihhdHRyID09PSBuYW1lLnZhbHVlKXtcbi8vICAgICAgICAgICAgICAgICAgICAgY291bnRyeS5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZUNvdW50cnlcIik7IFxuICAgICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgIHNtYWxsTWFwLmZvckVhY2goc21hbGwgPT57XG4vLyAgICAgICAgICAgICAgICAgbGV0IGF0dHIgPSBzbWFsbC5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbi8vICAgICAgICAgICAgICAgICBpZihhdHRyID09PSBuYW1lLnZhbHVlKXtcbi8vICAgICAgICAgICAgICAgICAgICAgc21hbGwuY2xhc3NMaXN0LmFkZChcInZpc2libGVDb3VudHJ5XCIpOyBcbiAgICAgICAgICAgICAgICAgICBcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgYnRuLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgIFxuLy8gICAgICAgICB9XG4gICAgICAgIFxuLy8gICAgICAgICAvLyB6ZGFyemVuaWUgbmEgYnRuIHNlYXJjaFxuLy8gICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHZpZXdDb3VudHJ5KGV2ZW50LCB0aXRsZSkpO1xuXG4vLyAgICAgICAgIC8vIHpkYXJ6ZW5pZSBuYSBlbnRlclxuLy8gICAgICAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24oZSl7XG4vLyAgICAgICAgICAgICBpZihlLmtleUNvZGUgPT09IDEzKXtcbi8vICAgICAgICAgICAgICAgICB2aWV3Q291bnRyeShldmVudCwgdGl0bGUpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9KVxuXG4gICAgXG4vLyAgICAgICAgIC8vIGRvZGF3YW5pZSBsaSBkbyBsaXN0IGluZm8gaSB3ZWF0aGVyXG4vLyAgICAgICAgIGZ1bmN0aW9uIGFkZEl0ZW1Ub1dlYXRoZXJMaXN0KHBhcmVudCwgaXRlbSwgdGV4dCl7XG4vLyAgICAgICAgICAgICBsZXQgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4vLyAgICAgICAgICAgICBsaS5pbm5lclRleHQgPSB0ZXh0ICsgaXRlbTtcbi8vICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoXCJlbFJpZ2h0TGlzdFwiKTtcbi8vICAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChsaSk7ICAgXG4vLyAgICAgICAgIH1cbiAgICBcbi8vICAgICAgICAgZnVuY3Rpb24gYWRkSXRlbVRvTGlzdCggcGFyZW50LCBpdGVtLCB0ZXh0LCBtYXBDb3VudHJ5ICl7XG4vLyAgICAgICAgICAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG5BZGRcIik7XG4vLyAgICAgICAgICAgICBsZXQgbmV3TGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4vLyAgICAgICAgICAgICBuZXdMaS5jbGFzc0xpc3QuYWRkKFwiZWxJbmZvXCIpO1xuLy8gICAgICAgICAgICAgbmV3TGkuaW5uZXJUZXh0ID0gdGV4dCArIGl0ZW07XG4vLyAgICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQobmV3TGkpO1xuICAgICAgICBcbiAgICBcbi8vICAgICAgICAgICAgIC8vIHBvZGxhY3plbmllIGRvIGFwaSBwb2dvZHkgaSBkb2RhbmllIGVsZW1lbnRvdyBkbyBib3hXZWF0aGVyXG4vLyAgICAgICAgICAgICBmdW5jdGlvbiBzaG93V2VhdGhlcigpe1xuLy8gICAgICAgICAgICAgICAgIGNvdW50cnkubWFwKGVsID0+IHtcbi8vICAgICAgICAgICAgICAgICAgICBpZihlbC5uYW1lID09PSBpdGVtKXtcbi8vICAgICAgICAgICAgICAgICAgICAgZmV0Y2goYGh0dHBzOi8vYXBpLmFwaXh1LmNvbS92MS9jdXJyZW50Lmpzb24/a2V5PTM4ZDI0OTdmZDNiMjQyZTc4ZmIxODIzMTQxODE2MDEmcT0ke2VsLmNhcGl0YWx9YClcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBsb2NhdGlvbiwgY3VycmVudCB9ID0gZGF0YTtcbiAgICAgICAgICAgXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVXZWF0aGVyXCIpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlci5pbm5lclRleHQgPSBgV2VhdGhlciBpbiAke2xvY2F0aW9uLm5hbWV9IGBcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2VhdGhlckxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlYXRoZXJMaXN0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRJdGVtVG9XZWF0aGVyTGlzdCh3ZWF0aGVyTGlzdCwgY3VycmVudC50ZW1wX2MsIFwiQ3VycmVudCB0ZW1wZXJhdHVyZTogXCIpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEl0ZW1Ub1dlYXRoZXJMaXN0KHdlYXRoZXJMaXN0LCBjdXJyZW50LmZlZWxzbGlrZV9jLCBcIkZlZWxzbGlrZSB0ZW1wZXJhdHVyZTogIFwiKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRJdGVtVG9XZWF0aGVyTGlzdCh3ZWF0aGVyTGlzdCwgY3VycmVudC5odW1pZGl0eSwgXCJIdW1pZGl0eTogIFwiKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRJdGVtVG9XZWF0aGVyTGlzdCh3ZWF0aGVyTGlzdCwgY3VycmVudC5wcmVzc3VyZV9tYiwgXCJQcmVzc3VyZTogIFwiKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRJdGVtVG9XZWF0aGVyTGlzdCh3ZWF0aGVyTGlzdCwgY3VycmVudC53aW5kX2twaCwgXCJXaW5kIGttL2g6ICBcIik7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkSXRlbVRvV2VhdGhlckxpc3Qod2VhdGhlckxpc3QsIGN1cnJlbnQuY29uZGl0aW9uLnRleHQsXCJXZWF0aGVyIGNvbmRpdGlvbjogIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZShcInNyY1wiLCBjdXJyZW50LmNvbmRpdGlvbi5pY29uKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWcuY2xhc3NMaXN0LmFkZChcImljb25cIik7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94V2VhdGhlci5hcHBlbmRDaGlsZChpbWcpO1xuICAgIFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aW1lUGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZVBhcmFncmFwaC5pbm5lclRleHQgPSBjdXJyZW50Lmxhc3RfdXBkYXRlZDtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lUGFyYWdyYXBoLmNsYXNzTGlzdC5hZGQoXCJ0aW1lXCIpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveFdlYXRoZXIuaW5zZXJ0QmVmb3JlKHRpbWVQYXJhZ3JhcGgsIHN1bik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1RpbWUgPSBjdXJyZW50Lmxhc3RfdXBkYXRlZC5zbGljZSgxMSwgMTYpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ld1RpbWVbMF0gPj0gMiB8fCBuZXdUaW1lWzBdID09PSAnMCcgJiYgbmV3VGltZVsxXSA8PSA1KXtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWNvbmQtcGFnZV9fbGlzdC0tbW9vblwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hXZWF0aGVyLmNsYXNzTGlzdC5hZGQoXCJuaWdodFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWNvbmQtcGFnZV9fbGlzdC0tc3VuXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveFdlYXRoZXIuY2xhc3NMaXN0LmFkZChcImRheVwiKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZhaWwnLCBlcnJvcik7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgIFxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgLy8gcG8ga2xpa25pxJljaXUgcG9rYXp1amUgc2llIG9rbm8geiBwb2dvZMSFXG4vLyAgICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgc2hvd1dlYXRoZXIoKTtcbi8vICAgICAgICAgICAgICAgICBib3hXZWF0aGVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4vLyAgICAgICAgICAgICAgICAgYm94V2VhdGhlci5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4vLyAgICAgICAgICAgICAgICAgYnV0dG9uLmlubmVyVGV4dCA9IFwiSGlkZSB3ZWF0aGVyXCI7XG4vLyAgICAgICAgICAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbi8vICAgICAgICAgICAgICAgICBzY3JvbGxJdChib3hXZWF0aGVyKVxuICAgIFxuLy8gICAgICAgICAgICAgfSk7XG4gICAgXG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICAvLyBmdW5rY2phIHNjcm9sbCB0byBkYW5laiBzZWtjamlcbi8vICAgICAgICAgZnVuY3Rpb24gc2Nyb2xsSXQoZWxlbWVudCkge1xuLy8gICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcbi8vICAgICAgICAgICAgICAgICAnYmVoYXZpb3InOiAnc21vb3RoJyxcbi8vICAgICAgICAgICAgICAgICAndG9wJzogZWxlbWVudC5vZmZzZXRUb3Bcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9XG4gICAgXG4gICAgXG4vLyAgICAgICAgIC8vcG9kbGFjemVuaWUgc2llIGRvIGFwaSBjb3VudHJpZXMgaSBwb2JyYW5pZSBkYW55Y2ggKyBkb2xhY3plbmllIGRvIGxpc3R5XG4gICAgXG4vLyAgICAgICAgIGZ1bmN0aW9uIGNvbm5lY3RUb0NvdW50cmllcyhjb3VudHJpZXMpe1xuLy8gICAgICAgICAgICAgZmV0Y2goJ2h0dHBzOi8vcmVzdGNvdW50cmllcy5ldS9yZXN0L3YyL2FsbCcpXG4vLyAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbi8vICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuLy8gICAgICAgICAgICAgICAgIGRhdGFDb3VudHJ5ID0gZGF0YTtcbi8vICAgICAgICAgICAgICAgICBsZXQgYXJyID0gW107XG4vLyAgICAgICAgICAgICAgICAgZGF0YS5tYXAoaXRlbSA9Pntcbi8vICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbSk7XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbmFtZSwgY2FwaXRhbCwgY3VycmVuY2llcywgbGFuZ3VhZ2VzLCBwb3B1bGF0aW9uIH0gPSBpdGVtO1xuICAgICAgICAgICAgXG4vLyAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uID0gY2FwaXRhbDtcbi8vICAgICAgICAgICAgICAgICAgICAgY291bnRyeSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgXG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbmN5ID0gY3VycmVuY2llcy5tYXAoY3VyciA9Pntcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJyLm5hbWU7XG4vLyAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgXG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhbmd1YWdlID0gbGFuZ3VhZ2VzLm1hcChsYW5nID0+e1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxhbmcubmFtZTtcbi8vICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICBcbi8vICAgICAgICAgICAgICAgICAgICAgbGV0IGxpc3RPZkNvdW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvdW50cnlMaXN0XCIpO1xuICAgIFxuLy8gICAgICAgICAgICAgICAgICAgICBpZih0aXRsZS52YWx1ZSA9PT0gbmFtZSl7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBhZGRJdGVtVG9MaXN0KGxpc3RPZkNvdW50cnksIG5hbWUsICdOYW1lIG9mIHRoZSBjb3VudHJ5OiAnLCBjb3VudHJpZXMpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgYWRkSXRlbVRvTGlzdChsaXN0T2ZDb3VudHJ5LCBjYXBpdGFsLCAnQ2FwaXRhbDogJywgY291bnRyaWVzKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEl0ZW1Ub0xpc3QobGlzdE9mQ291bnRyeSwgY3VycmVuY3ksICdDdXJyZW5jeTogJywgY291bnRyaWVzKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEl0ZW1Ub0xpc3QobGlzdE9mQ291bnRyeSwgbGFuZ3VhZ2UsICdMYW5ndWFnZTogJywgY291bnRyaWVzKTtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEl0ZW1Ub0xpc3QobGlzdE9mQ291bnRyeSwgcG9wdWxhdGlvbiwgJ1BvcHVsYXRpb246ICcsIGNvdW50cmllcyk7XG4gICAgXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxlZnRCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xlZnRCb3hcIik7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEJveC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7aXRlbS5mbGFnfSlgO1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRCb3guY2xhc3NMaXN0LmFkZChcImxlZnRCb3hCYWNrZ3JvdW5kXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJyOyBcbi8vICAgICAgICAgICAgICAgICAgICAgfSAgXG4gICAgICAgICAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgICAgIH0pICBcbi8vICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmYWlsJywgZXJyb3IpO1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgfVxuICAgIFxuICAgIFxuICAgIFxuLy8gICAgICAgICAvLyBidG4gdGlwcyB3eXN3aWV0bGEgdGFibGljZSB6IG5hendhbWkga3JhasOzdyBpIGNob3dhXG4vLyAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZVRhYmxlVGlwcygpeyAgICAgXG4vLyAgICAgICAgICAgICBsaXN0LmNsYXNzTGlzdC5hZGQoXCJ0aXBzXCIpO1xuLy8gICAgICAgICAgICAgbGV0IGFycmF5T2ZMaSA9IFtdO1xuLy8gICAgICAgICAgICAgY29uc3QgdGlwc0FycmF5ID0gY291bnRyaWVzLm1hcChlbCA9PiB7XG4vLyAgICAgICAgICAgICAgICAgbGV0IG5ld0xpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuLy8gICAgICAgICAgICAgICAgIG5ld0xpLmNsYXNzTGlzdC5hZGQoXCJ0aXBzRWxlbWVudFwiKTtcbi8vICAgICAgICAgICAgICAgICBsaXN0LmFwcGVuZENoaWxkKG5ld0xpKTtcbi8vICAgICAgICAgICAgICAgICBuZXdMaS5pbm5lclRleHQgPSBlbC50aXRsZTtcbi8vICAgICAgICAgICAgICAgICBoZWFkZXIuYXBwZW5kQ2hpbGQobGlzdCk7IFxuICAgIFxuLy8gICAgICAgICAgICAgICAgIGFycmF5T2ZMaS5wdXNoKG5ld0xpKTtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gYXJyYXlPZkxpO1xuLy8gICAgICAgICAgICAgfSlcbiAgICBcbi8vICAgICAgICAgICAgIGFycmF5T2ZMaS5mb3JFYWNoKGVsID0+e1xuLy8gICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgICAgICAgICAgICAgIGxldCB0ZXh0ID0gdGhpcy5pbm5lclRleHQ7XG4vLyAgICAgICAgICAgICAgICAgICAgIHRpdGxlLnZhbHVlID0gdGV4dDtcbi8vICAgICAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgfSlcbiAgICBcbi8vICAgICAgICAgICAgIHJldHVybiB0aXBzQXJyYXk7XG4gICAgICAgXG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICAvL3BvIGtsaWtuacSZY2l1IG5hIGJ0biBwb2themFuaWUgdGFibGljeSB0aXBzIGkgd3nFgsSFY3plbmllIGd1emlrYVxuLy8gICAgICAgICB0aXBzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgICAgICBpZihsaXN0LmdldEF0dHJpYnV0ZShcImNsYXNzXCIpICE9PSBcInRpcHNcIil7XG4vLyAgICAgICAgICAgICAgICAgY3JlYXRlVGFibGVUaXBzKClcbi8vICAgICAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICAgICAgaGlkZUVsZW1lbnQobGlzdCk7XG4vLyAgICAgICAgICAgICAgICAgdGlwcy5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcInRydWVcIik7XG4vLyAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbi8vICAgICAgICAgfSlcbiAgICAgICAgICAgIFxuXG4vLyAgICAgICAgIC8vd3lqxZtjaWUgeiBkcnVnaWVqIHNla2NqaVxuICAgIFxuLy8gICAgICAgICBleGl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoaWRlRWxlbWVudChzZWN0aW9uU2VjKSk7XG4gICAgXG4gICAgXG4gICAgXG4vLyAgICAgICAgIC8vIHByemVqxZtjaWUgZG8gc2VrY2ppIC0gIGxpc3RhIGkgd3lqxZtjaWUgeiBzZWtjamlcbiAgICBcbiAgICBcbi8vICAgICAgICAgLy8gbGlzdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbi8vICAgICAgICAgLy8gICAgIHNob3dTZWN0aW9uKGxpc3RTZWN0aW9uLCAnMTIwJScpO1xuLy8gICAgICAgICAvLyAgICAgc2Nyb2xsSXQobGlzdFNlY3Rpb24pO1xuLy8gICAgICAgICAvLyB9KTtcbiAgICBcbi8vICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNleGl0TGlzdFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gaGlkZUVsZW1lbnQobGlzdFNlY3Rpb24pKTtcbiAgICBcbiAgICBcbi8vICAgICAgICAgLy8gZG9kYW5pZSBkbyBsaXN0eSDFvHljemXFhFxuICAgIFxuLy8gICAgICAgICAgZnVuY3Rpb24gc2F2ZURhdGFUb0RCKGl0ZW0sIHVzZXIpIHtcbi8vICAgICAgICAgICAgIGFycmF5LnB1c2goaXRlbSk7XG4gICAgICAgIFxuLy8gICAgICAgICAgICAgZGF0YWJhc2UucmVmKCdpdGVtJykuc2V0KHtcbi8vICAgICAgICAgICAgICAgICBjb3VudHJ5OiBhcnJheSxcbiAgICBcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICBkYXRhYmFzZS5yZWYoJ3VzZXInKS5zZXQoe1xuLy8gICAgICAgICAgICAgICAgIHVzZXI6IGZpcmViYXNlLmF1dGgoKS5jdXJyZW50VXNlci51aWQsXG4gICAgXG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICB9XG4gICAgXG4vLyAgICAgICAgIGZ1bmN0aW9uIHN3aWNoTGlzdEl0ZW0ocGFyZW50KXtcbiAgICAgICAgICAgXG4vLyAgICAgICAgICAgICBjb25zdCBsaXN0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmVsSW5mb1wiKTtcbi8vICAgICAgICAgICAgIGxldCBjb3VudHJ5ID0gbGlzdEVsWzBdLmlubmVyVGV4dDtcbi8vICAgICAgICAgICAgIGFkZEl0ZW1Ub0xpc3QocGFyZW50LCBjb3VudHJ5LCAnJyApO1xuLy8gICAgICAgICAgICAgc2F2ZURhdGFUb0RCKGNvdW50cnkpO1xuICAgICAgICAgICBcbi8vICAgICAgICAgfVxuICAgIFxuICAgICAgIFxuLy8gICAgICAgICB2aXNpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbi8vICAgICAgICAgICAgIHNob3dTZWN0aW9uKGxpc3RTZWN0aW9uLCAnMTIwJScpO1xuLy8gICAgICAgICAgICAgc2Nyb2xsSXQobGlzdFNlY3Rpb24pO1xuLy8gICAgICAgICAgICAgc3dpY2hMaXN0SXRlbSh3aXNoTGlzdCk7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhhcnJheSk7XG4vLyAgICAgICAgIH0pO1xuICAgICAgIFxuLy8gICAgICAgICBhZGRWaXNpdGVkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuLy8gICAgICAgICAgICAgc2hvd1NlY3Rpb24obGlzdFNlY3Rpb24sICcxMjAlJyk7XG4vLyAgICAgICAgICAgICBzY3JvbGxJdChsaXN0U2VjdGlvbik7XG4vLyAgICAgICAgICAgICBzd2ljaExpc3RJdGVtKHZpc2l0ZWRMaXN0KTtcbi8vICAgICAgICAgfSlcbiAgICBcbiAgICBcbiAgICBcbiAgICB9KSJdfQ==
