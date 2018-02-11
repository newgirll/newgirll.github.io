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

        _this.btnSearch.addEventListener("click", function (e) {
            _this.viewCountry(event);
            _this.turnOffSearchBtn();
        });

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
    }, {
        key: "turnOffSearchBtn",
        value: function turnOffSearchBtn() {
            if (this.sectionSec.style.display !== "none") {
                this.btnSearch.setAttribute("disabled", "true");
            } else {
                this.btnSearch.setAttribute("disabled", "false");
            }
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

   var map = new _MapSetup.MapSetup();
   map.createArrayBigMap();
   map.createArraySmallMap();
   map.mousePosition();
   map.selectCountries();

   var bigMap = new _Map.Map();
   bigMap.blinkMap();
   bigMap.selectCountries();

   var toolTip = new _ToolTips.ToolTips();
   toolTip.showCountryFromTableTips();

   var weatherMap = new _WeatherMap.WeatherMap();
   weatherMap.showWeather();

   var myList = new _List.Lists();

   var fireBase = new _FireBase.FireBase();
   fireBase.newUserSign();
});

},{"./FireBase":1,"./List":2,"./Map.js":3,"./MapSetup.js":4,"./ToolTips":5,"./WeatherMap":6}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9GaXJlQmFzZS5qcyIsInNyYy9zY3JpcHRzL0xpc3QuanMiLCJzcmMvc2NyaXB0cy9NYXAuanMiLCJzcmMvc2NyaXB0cy9NYXBTZXR1cC5qcyIsInNyYy9zY3JpcHRzL1Rvb2xUaXBzLmpzIiwic3JjL3NjcmlwdHMvV2VhdGhlck1hcC5qcyIsInNyYy9zY3JpcHRzL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQTs7SUFFTSxRO0FBQ0Ysd0JBQWE7QUFBQTs7QUFBQTs7QUFDVCxhQUFLLE1BQUwsR0FBYztBQUNWLG9CQUFRLHlDQURFO0FBRVYsd0JBQVksdUNBRkY7QUFHVix5QkFBYSw4Q0FISDtBQUlWLHVCQUFXLHVCQUpEO0FBS1YsMkJBQWUsbUNBTEw7QUFNViwrQkFBbUI7QUFOVCxTQUFkO0FBUUEsYUFBSyxRQUFMLEdBQWdCLFNBQVMsYUFBVCxDQUF1QixLQUFLLE1BQTVCLENBQWhCO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLEtBQUssUUFBTCxDQUFjLFFBQWQsRUFBaEI7O0FBRUE7QUFDQSxhQUFLLEtBQUwsR0FBYSxTQUFTLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBYjtBQUNBLGFBQUssTUFBTCxHQUFjLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFkO0FBQ0EsYUFBSyxNQUFMLEdBQWMsU0FBUyxjQUFULENBQXdCLFFBQXhCLENBQWQ7QUFDQSxhQUFLLFdBQUwsR0FBbUIsU0FBUyxjQUFULENBQXdCLFlBQXhCLENBQW5CO0FBQ0EsYUFBSyxVQUFMLEdBQWtCLFNBQVMsY0FBVCxDQUF3QixXQUF4QixDQUFsQjtBQUNBLGFBQUssSUFBTCxHQUFZLFNBQVMsY0FBVCxDQUF3QixZQUF4QixDQUFaO0FBQ0EsYUFBSyxLQUFMLEdBQWEsRUFBYjs7QUFHQTtBQUNBLGFBQUssS0FBTCxDQUFXLGdCQUFYLENBQTRCLE9BQTVCLEVB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QUFDQSxPQUFJLGVBQUo7O0FBR0EsT0FBTSxTQUFTLGNBQWY7QUFDQSxVQUFPLFFBQVA7QUFDQSxVQUFPLGVBQVA7O0FBSUEsT0FBTSxVQUFVLHdCQUFoQjtBQUNBLFdBQVEsd0JBQVI7O0FBR0EsT0FBTSxhQUFhLDRCQUFuQjtBQUNBLGNBQVcsV0FBWDs7QUFHQSxPQUFNLFNBQVMsaUJBQWY7O0FBR0EsT0FBTSxXQUFXLHdCQUFqQjtBQUNBLFlBQVMsV0FBVDtBQUlILENBL0JBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIGZpcmViYXNlIGludGVyYWN0aXZlLW1hcFxuXG5jbGFzcyBGaXJlQmFzZSB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5jb25maWcgPSB7XG4gICAgICAgICAgICBhcGlLZXk6IFwiQUl6YVN5QWRXS2dycXVpdFZQWVZaYWllVjJaWkZKS0M5NUllbDk4XCIsXG4gICAgICAgICAgICBhdXRoRG9tYWluOiBcImludGVyYWN0aXZlLW1hcC1mNTA2MC5maXJlYmFzZWFwcC5jb21cIixcbiAgICAgICAgICAgIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vaW50ZXJhY3RpdmUtbWFwLWY1MDYwLmZpcmViYXNlaW8uY29tXCIsXG4gICAgICAgICAgICBwcm9qZWN0SWQ6IFwiaW50ZXJhY3RpdmUtbWFwLWY1MDYwXCIsXG4gICAgICAgICAgICBzdG9yYWdlQnVja2V0OiBcImludGVyYWN0aXZlLW1hcC1mNTA2MC5hcHBzcG90LmNvbVwiLFxuICAgICAgICAgICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiNTk1ODYxNjUwNjMwXCJcbiAgICAgICAgICB9O1xuICAgICAgICB0aGlzLmZpcmViYXNlID0gZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcCh0aGlzLmNvbmZpZyk7XG4gICAgICAgIHRoaXMuZGF0YWJhc2UgPSB0aGlzLmZpcmViYXNlLmRhdGFiYXNlKCk7XG5cbiAgICAgICAgLy9lbGVtZW50eSBkbyBsb2dvd2FuaWFcbiAgICAgICAgdGhpcy5sb2dJbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nSW5cIik7XG4gICAgICAgIHRoaXMuc2lnbkluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWduSW5cIik7XG4gICAgICAgIHRoaXMubG9nT3V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dPdXRcIik7XG4gICAgICAgIHRoaXMuYnRuU2VuZFNpZ24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbmRTaWduSW5cIik7XG4gICAgICAgIHRoaXMuYnRuU2VuZExvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VuZExvZ0luXCIpO1xuICAgICAgICB0aGlzLmZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZ25JbkZvcm1cIik7XG4gICAgICAgIHRoaXMuYXJyYXkgPSBbXTtcblxuICAgICAgICAgIFxuICAgICAgICAvL3Bva2F6IGZvcm11bGFyeiBkbyBsb2dvd2FuaWFcbiAgICAgICAgdGhpcy5sb2dJbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PntcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dJbkZvcm0nKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIHRoaXMubG9nT3V0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuXG5cbiAgICAgICAgLy93eWxvZ293YW5pZSBzaWUgdXp5dGtvd25pa2FcbiAgICAgICAgdGhpcy5sb2dPdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICAgICAgdGhpcy5maXJlYmFzZS5hdXRoKCkuc2lnbk91dCgpXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy9wb2theiBmb3JtdWxhcnogZG8gcmVqZXN0cmFjamlcbiAgICAgICAgdGhpcy5zaWduSW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuZm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vemFsb2dvd2FuaWUgdXp5dGtvd25pa2FcbiAgICAgICAgdGhpcy5idG5TZW5kTG9nLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHBhc3N3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzd29yZFwiKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbWFpbFwiKS52YWx1ZVxuICAgICAgICAgICAgY29uc3QgYXV0aCA9IHRoaXMuZmlyZWJhc2UuYXV0aCgpO1xuICAgIFxuICAgICAgICAgICAgY29uc3QgcHJvbWlzZSA9IGF1dGguc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWwsIHBhc3N3KTtcbiAgICAgICAgICAgIHByb21pc2UuY2F0Y2goZSA9PiBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpKTtcblxuICAgICAgICB9KVxuXG4gICAgICAgIC8vcmVqZXN0cmFjamEgbm93ZWdvIHV6eXRrb3duaWthXG4gICAgICAgIHRoaXMuYnRuU2VuZFNpZ24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgcGFzc3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3N3b3JkXCIpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtYWlsXCIpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgYXV0aCA9IHRoaXMuZmlyZWJhc2UuYXV0aCgpO1xuICAgIFxuICAgICAgICAgICAgY29uc3QgcHJvbWlzZSA9IGF1dGguY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsLCBwYXNzdyk7XG4gICAgICAgICAgICBwcm9taXNlLmNhdGNoKGUgPT4gY29uc29sZS5sb2coZS5tZXNzYWdlKSk7XG5cblxuICAgICAgICAgICAgaWYodGhpcy5mb3JtLnN0eWxlLmRpc3BsYXkgIT09IFwibm9uZVwiKXtcbiAgICAgICAgICAgICAgICB0aGlzLmZvcm0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgbmV3VXNlclNpZ24oKXtcbiAgICAgICAgdGhpcy5maXJlYmFzZS5hdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKCB1c2VyID0+e1xuICAgICAgICAgICAgaWYodXNlcil7ICAgXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codXNlciArIFwibG9nZ2VkIGluXCIgKyB0aGlzLmZpcmViYXNlLmF1dGgoKS5jdXJyZW50VXNlci51aWQpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nT3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbm90IGxvZ2dlZCBpbicpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nT3V0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuXG59XG5cbmV4cG9ydCB7RmlyZUJhc2V9OyIsImltcG9ydCB7IE1hcFNldHVwIH0gZnJvbSBcIi4vTWFwU2V0dXBcIjtcblxuY2xhc3MgTGlzdHMgZXh0ZW5kcyBNYXBTZXR1cHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmxpc3RTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0X19ib3hcIik7XG4gICAgICAgIHRoaXMudmlzaXRlZExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xpc3RWaXNpdGVkXCIpO1xuICAgICAgICB0aGlzLndpc2hMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsaXN0V2lzaFwiKTtcbiAgICAgICAgdGhpcy52aXNpdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkVG9WaXNpdFwiKTtcbiAgICAgICAgdGhpcy5hZGRWaXNpdGVkQnRuID0gdGhpcy52aXNpdEJ0bi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICB0aGlzLmJ0bkxpc3RFeGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNleGl0TGlzdFwiKTtcbiAgICAgICAgdGhpcy5saXN0RWwgPSB0aGlzLmxpc3RPZkNvdW50cnkuY2hpbGRyZW47XG4gICAgICBcblxuICAgICAgICB0aGlzLmJ0bkxpc3RFeGl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmhpZGVFbGVtZW50KHRoaXMubGlzdFNlY3Rpb24pKTtcblxuICAgICAgICB0aGlzLnZpc2l0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbih0aGlzLmxpc3RTZWN0aW9uLCAnMTIwJScpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxJdCh0aGlzLmxpc3RTZWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuc3dpY2hMaXN0SXRlbSh0aGlzLndpc2hMaXN0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRWaXNpdGVkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbih0aGlzLmxpc3RTZWN0aW9uLCAnMTIwJScpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxJdCh0aGlzLmxpc3RTZWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuc3dpY2hMaXN0SXRlbSh0aGlzLnZpc2l0ZWRMaXN0KTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBzd2ljaExpc3RJdGVtKHBhcmVudCl7XG4gICAgICAgIGxldCBjb3VudHJ5ID0gdGhpcy5saXN0RWxbMF0uaW5uZXJUZXh0O1xuICAgICAgICB0aGlzLmFkZEl0ZW1Ub0xpc3QocGFyZW50LCBjb3VudHJ5LCAnJyApO1xuXG4gICAgICAgIC8vIHNhdmVEYXRhVG9EQihjb3VudHJ5KTtcbiAgICAgICAgICAgXG4gICAgfVxuXG4vLyBkb2RhbmllIGRvIGxpc3R5IMW8eWN6ZcWEXG4gICAgXG4vLyAgICAgICAgICBmdW5jdGlvbiBzYXZlRGF0YVRvREIoaXRlbSwgdXNlcikge1xuLy8gICAgICAgICAgICAgYXJyYXkucHVzaChpdGVtKTtcbiAgICAgICAgXG4vLyAgICAgICAgICAgICBkYXRhYmFzZS5yZWYoJ2l0ZW0nKS5zZXQoe1xuLy8gICAgICAgICAgICAgICAgIGNvdW50cnk6IGFycmF5LFxuICAgIFxuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgIGRhdGFiYXNlLnJlZigndXNlcicpLnNldCh7XG4vLyAgICAgICAgICAgICAgICAgdXNlcjogZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZCxcbiAgICBcbi8vICAgICAgICAgICAgIH0pXG4vLyAgIH1cbiAgICAgICBcblxufVxuXG5leHBvcnQgeyBMaXN0cyB9IiwiaW1wb3J0IHsgTWFwU2V0dXAgfSBmcm9tIFwiLi9NYXBTZXR1cFwiO1xuXG5cbmNsYXNzIE1hcCBleHRlbmRzIE1hcFNldHVwIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNlY3Rpb25TZWMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlY29uZFNlY1wiKTtcbiAgICAgICAgdGhpcy5sZWZ0Qm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsZWZ0Qm94XCIpO1xuICAgICAgICB0aGlzLnRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBlID0+e1xuICAgICAgICAgICAgaWYoZS5rZXlDb2RlID09PSAxMyl7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Q291bnRyeShldmVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy50dXJuT2ZmU2VhcmNoQnRuKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmJ0blNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PntcbiAgICAgICAgICAgIHRoaXMudmlld0NvdW50cnkoZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy50dXJuT2ZmU2VhcmNoQnRuKCk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy5leGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNleGl0QnRuXCIpO1xuICAgICAgICB0aGlzLmV4aXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGlkZUVsZW1lbnQodGhpcy5zZWN0aW9uU2VjKTtcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgdGhpcy50dXJuT2ZmU2VhcmNoQnRuKCk7XG4gICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgIFxuXG4gICAgICAgIFsuLi50aGlzLmNvdW50cnlNYXBdLm1hcChjb3VudHJ5ID0+IHtcbiAgICAgICAgICAgIGNvdW50cnkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0cmlidXRlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZUVsZW1lbnQodGhpcy5saXN0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdENvdW50cmllcyh0aGlzLmF0dHJpYnV0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbih0aGlzLnNlY3Rpb25TZWMsJzIwJScpO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld0NvdW50cnkoZXZlbnQsIHRoaXMuY291bnRyeU1hcCwgdGhpcy5zbWFsbE1hcCwgdGhpcy50aXRsZS52YWx1ZSwgdGhpcy5hdHRyaWJ1dGUpO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgfVxuICAgIFxuICAgIGJsaW5rTWFwKCl7XG4gICAgICAgIHN1cGVyLmJsaW5rTWFwKHRoaXMuY291bnRyeU1hcCk7XG4gICAgfVxuXG4gICAgc2VsZWN0Q291bnRyaWVzKGF0dHIpe1xuICAgICAgICBzdXBlci5zZWxlY3RDb3VudHJpZXMoKTtcbiAgICAgICAgICAgIFsuLi50aGlzLmNvdW50cmllc0JveF0ubWFwKGNvdW50cnkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMudGl0bGUudmFsdWUgPT09IGNvdW50cnkubmFtZSB8fCBhdHRyID09PSBjb3VudHJ5Lm5hbWUpe1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7bGFuZ3VhZ2VzLCBjdXJyZW5jaWVzfSA9IGNvdW50cnk7XG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbVRvTGlzdCh0aGlzLmxpc3RPZkNvdW50cnksIGNvdW50cnkubmFtZSwgJ05hbWUgb2YgdGhlIGNvdW50cnk6ICcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW1Ub0xpc3QodGhpcy5saXN0T2ZDb3VudHJ5LCBjb3VudHJ5LmNhcGl0YWwsICdDYXBpdGFsOiAnKTtcblxuICAgICAgICAgICAgICAgICAgICBbLi4uY3VycmVuY2llc10uZm9yRWFjaChjdXJyZW5jeT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtVG9MaXN0KHRoaXMubGlzdE9mQ291bnRyeSwgY3VycmVuY3kubmFtZSwgJ0N1cnJlbmN5OiAnKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gIFxuICAgICAgICAgICAgICAgICAgICBbLi4ubGFuZ3VhZ2VzXS5mb3JFYWNoKGxhbmd1YWdlID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtVG9MaXN0KHRoaXMubGlzdE9mQ291bnRyeSwgbGFuZ3VhZ2UubmFtZSwgJ0xhbmd1YWdlOiAnKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtVG9MaXN0KHRoaXMubGlzdE9mQ291bnRyeSwgY291bnRyeS5wb3B1bGF0aW9uLCAnUG9wdWxhdGlvbjogJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZWZ0Qm94LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtjb3VudHJ5LmZsYWd9KWA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGVmdEJveC5jbGFzc0xpc3QuYWRkKFwibGVmdEJveEJhY2tncm91bmRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgIH1cblxuICAgIHZpZXdDb3VudHJ5KGUsIGNvdW50cmllc0FycmF5T25lLCBjb3VudHJpZXNBcnJheVR3bywgaW5wdXQsIGNsaWNrZWRDb3VudHJ5KXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmhpZGVFbGVtZW50KHRoaXMubGlzdCk7XG4gICAgICAgIHRoaXMuc2VsZWN0Q291bnRyaWVzKCk7XG4gICAgICAgIHRoaXMuc2hvd1NlY3Rpb24odGhpcy5zZWN0aW9uU2VjLCcyMCUnKTtcbiAgICAgICAgc3VwZXIudmlld0NvdW50cnkoZXZlbnQsIHRoaXMuY291bnRyeU1hcCwgdGhpcy5zbWFsbE1hcCwgdGhpcy50aXRsZS52YWx1ZSwgdGhpcy5hdHRyaWJ1dGUpICAgICAgICBcbiAgICB9XG5cbiAgICB0dXJuT2ZmU2VhcmNoQnRuKCl7XG4gICAgICAgIGlmKHRoaXMuc2VjdGlvblNlYy5zdHlsZS5kaXNwbGF5ICE9PSBcIm5vbmVcIil7XG4gICAgICAgICAgICB0aGlzLmJ0blNlYXJjaC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcInRydWVcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJ0blNlYXJjaC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcImZhbHNlXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydCB7IE1hcCB9OyIsIlxuY2xhc3MgTWFwU2V0dXAge1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuY291bnRyeU1hcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFwXCIpLmNoaWxkcmVuO1xuICAgICAgICB0aGlzLnNtYWxsTWFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYXBTZWNcIikuY2hpbGRyZW47XG4gICAgICAgIHRoaXMubGlzdE9mQ291bnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY291bnRyeUxpc3RcIik7XG4gICAgICAgIHRoaXMudGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvdW50cnlOYW1lXCIpO1xuICAgICAgICB0aGlzLnRvb2xUaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rvb2xUaXBcIik7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoZWFkZXJcIik7XG4gICAgICAgIHRoaXMuYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG5BZGRcIik7XG4gICAgICAgIHRoaXMuYnRuU2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG5cIik7XG4gICAgICAgIHRoaXMubGlzdCA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKFwidWxcIik7XG4gICAgICAgIHRoaXMuY291bnRyaWVzID0gW107XG4gICAgICAgIHRoaXMuc21hbGxDb3VudHJpZXMgPSBbXTtcbiAgICAgICAgdGhpcy5jb3VudHJpZXNCb3ggPSBbXTtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGUgPSBcIlwiO1xuXG4gICAgfVxuXG4gICAgY3JlYXRlQXJyYXlCaWdNYXAoKXtcbiAgICAgICAgcmV0dXJuIFsuLi50aGlzLmNvdW50cnlNYXBdLmZvckVhY2goY291bnRyeSA9PiB7XG4gICAgICAgICAgICBpZih0eXBlb2YgY291bnRyeSAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnRyaWVzLnB1c2goe2lkOiBjb3VudHJ5LmlkLCB0aXRsZTogY291bnRyeS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKX0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvdW50cmllc1xuICAgICAgICAgICAgfSAgICBcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjcmVhdGVBcnJheVNtYWxsTWFwKCl7XG4gICAgICAgIHJldHVybiBbLi4udGhpcy5zbWFsbE1hcF0uZm9yRWFjaChjb3VudHJ5ID0+IHtcbiAgICAgICAgICAgIGlmKHR5cGVvZiBjb3VudHJ5ICE9PSAndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICAgICAgdGhpcy5zbWFsbENvdW50cmllcy5wdXNoKHtpZDogY291bnRyeS5pZCwgdGl0bGU6IGNvdW50cnkuZ2V0QXR0cmlidXRlKFwidGl0bGVcIil9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zbWFsbENvdW50cmllc1xuICAgICAgICAgICAgfSAgICBcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBtb3VzZVBvc2l0aW9uKGUpe1xuICAgICAgICByZXR1cm4gd2luZG93Lm9ubW91c2Vtb3ZlID0gZnVuY3Rpb24oZSl7XG4gICAgICAgICAgIHJldHVybiB7IHg6IGUuY2xpZW50WCwgeTogZS5jbGllbnRZIH1cbiAgICAgICAgfVxuICAgIH0gXG4gICAgXG5cbiAgICBzaG93U2VjdGlvbihzZWN0aW9uLCBwb3NpdGlvblRvcCl7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgc2VjdGlvbi5zdHlsZS50b3AgPSBwb3NpdGlvblRvcDtcbiAgICB9XG5cbiAgICBoaWRlRWxlbWVudChlbGVtZW50KXtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuXG4gICAgc2VsZWN0Q291bnRyaWVzKCl7XG4gICAgICAgcmV0dXJuIGZldGNoKGBodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9hbGxgKVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBkYXRhLm1hcChpdGVtID0+e1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnRyaWVzQm94LnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICB0aGlzLmNvdW50cmllc0JveDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PntyZXR1cm4gY29uc29sZS5sb2coJ2ZhaWwnLCBlcnJvcil9KVxuXG4gICAgfVxuXG4gICAgYmxpbmtNYXAoY291bnRyaWVzQXJyYXkpe1xuICAgICAgICBbLi4uY291bnRyaWVzQXJyYXldLmZvckVhY2goY291bnRyeSA9PiB7XG4gICAgICAgICAgICBjb3VudHJ5LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsKGUpID0+e1xuXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcInZpc2libGVDb3VudHJ5XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMudG9vbFRpcC5pbm5lclRleHQgPSBjb3VudHJ5LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMudGl0bGUuaW5uZXJUZXh0ID0gY291bnRyeS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2xUaXAuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2xUaXAuc3R5bGUudG9wID0gdGhpcy5tb3VzZVBvc2l0aW9uKHdpbmRvdy5ldmVudCkueSArIFwicHhcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2xUaXAuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoMCwxMDAlKVwiO1xuICAgICAgICAgICAgICAgIHRoaXMudG9vbFRpcC5zdHlsZS5sZWZ0ID0gdGhpcy5tb3VzZVBvc2l0aW9uKHdpbmRvdy5ldmVudCkueCArIFwicHhcIjtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb3VudHJ5LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsKGUpID0+e1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlQ291bnRyeVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2xUaXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSkgIFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGFkZEl0ZW1Ub0xpc3QocGFyZW50LCBpdGVtLCB0ZXh0KXtcbiAgICAgICAgbGV0IG5ld0xpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICBuZXdMaS5jbGFzc0xpc3QuYWRkKFwiZWxJbmZvXCIpO1xuICAgICAgICBuZXdMaS5pbm5lclRleHQgPSB0ZXh0ICsgaXRlbTtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKG5ld0xpKTtcbiAgICB9XG4gICAgXG4gICAgdmlld0NvdW50cnkoZSwgY291bnRyaWVzQXJyYXlPbmUsIGNvdW50cmllc0FycmF5VHdvLCBpbnB1dCwgY2xpY2tlZENvdW50cnkpe1xuICAgICAgICBbLi4uY291bnRyaWVzQXJyYXlPbmVdLmZvckVhY2goY291bnRyeSA9PiB7XG4gICAgICAgICAgICBsZXQgdGl0bGVPZkNvdW50cnkgPSBjb3VudHJ5LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICAgICAgICAgICAgaWYodGl0bGVPZkNvdW50cnkgPT09IGlucHV0IHx8IHRpdGxlT2ZDb3VudHJ5ID09PSBjbGlja2VkQ291bnRyeSl7XG4gICAgICAgICAgICAgICAgY291bnRyeS5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZUNvdW50cnlcIik7IFxuICAgICAgICAgICAgfSAgXG4gICAgICAgIH0pO1xuICAgICAgICBbLi4uY291bnRyaWVzQXJyYXlUd29dLmZvckVhY2goY291bnRyeSA9PiB7XG4gICAgICAgICAgICBsZXQgdGl0bGVPZkNvdW50cnkgPSBjb3VudHJ5LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICAgICAgICAgICAgaWYodGl0bGVPZkNvdW50cnkgPT09IGlucHV0IHx8IHRpdGxlT2ZDb3VudHJ5ID09PSBjbGlja2VkQ291bnRyeSl7XG4gICAgICAgICAgICAgICAgY291bnRyeS5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZUNvdW50cnlcIik7IFxuICAgICAgICAgICAgfSAgXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNjcm9sbEl0KGVsZW1lbnQpIHtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgICAgICAgICdiZWhhdmlvcic6ICdzbW9vdGgnLFxuICAgICAgICAgICAgJ3RvcCc6IGVsZW1lbnQub2Zmc2V0VG9wXG4gICAgICAgIH0pO1xuICAgIH1cblxuXG59XG5cbmV4cG9ydCB7IE1hcFNldHVwIH07IiwiaW1wb3J0IHsgTWFwU2V0dXAgfSBmcm9tIFwiLi9NYXBTZXR1cFwiO1xuXG5jbGFzcyBUb29sVGlwcyBleHRlbmRzIE1hcFNldHVwe1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYXJyYXlPZkxpID0gW107XG4gICAgICAgIHRoaXMudGlwc0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGlwQnRuXCIpO1xuICAgICAgICB0aGlzLnRpcHNUZXh0ID0gXCJcIjtcblxuXG4gICAgICAgIHRoaXMudGlwc0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PntcbiAgICAgICAgICAgIGlmKHRoaXMubGlzdC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSAhPT0gXCJ0aXBzXCIpe1xuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlVGFibGVUaXBzKClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlRWxlbWVudCh0aGlzLmxpc3QpO1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcblxuICAgIH1cbiAgICBjcmVhdGVUYWJsZVRpcHMoKXtcbiAgICAgICAgdGhpcy5saXN0LmNsYXNzTGlzdC5hZGQoXCJ0aXBzXCIpO1xuICAgICAgICBbLi4udGhpcy5jb3VudHJ5TWFwXS5tYXAoZWwgPT4ge1xuICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGUgPSBlbC5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKVxuICAgICAgICAgICAgbGV0IG5ld0xpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICAgICAgbmV3TGkuY2xhc3NMaXN0LmFkZChcInRpcHNFbGVtZW50XCIpO1xuICAgICAgICAgICAgdGhpcy5saXN0LmFwcGVuZENoaWxkKG5ld0xpKTtcbiAgICAgICAgICAgIG5ld0xpLmlubmVyVGV4dCA9IHRoaXMuYXR0cmlidXRlO1xuICAgICAgICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMubGlzdCk7IFxuICAgICAgICAgICAgdGhpcy5hcnJheU9mTGkucHVzaChuZXdMaSk7XG4gICAgICAgICBcbiAgICAgICAgfSlcbiAgICB9XG4gICAgc2hvd0NvdW50cnlGcm9tVGFibGVUaXBzKCl7XG4gICAgICAgIFsuLi50aGlzLmFycmF5T2ZMaV0uZm9yRWFjaCh0aXAgPT57XG4gICAgICAgICAgICB0aXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKGUpID0+e1xuICAgICAgICAgICAgICAgIHRoaXMudGlwc1RleHQgPSBlLnRhcmdldC5pbm5lclRleHQ7XG4gICAgICAgICAgICAgICAgdGhpcy50aXRsZS52YWx1ZSA9IHRoaXMudGlwc1RleHQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IFRvb2xUaXBzIH0iLCJpbXBvcnQgeyBNYXBTZXR1cCB9IGZyb20gXCIuL01hcFNldHVwXCI7XG5cbmNsYXNzIFdlYXRoZXJNYXAgZXh0ZW5kcyBNYXBTZXR1cHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLndlYXRoZXJMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWF0aGVyTGlzdFwiKTtcbiAgICAgICAgdGhpcy5oZWFkZXJXZWF0aGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aXRsZVdlYXRoZXJcIik7XG4gICAgICAgIHRoaXMuYm94V2VhdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2VhdGhlckJveFwiKTtcbiAgICAgICAgdGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuYnV0dG9uLmlubmVyVGV4dCA9PT0gXCJTaG93IHdlYXRoZXJcIil7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1dlYXRoZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3hXZWF0aGVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm94V2VhdGhlci5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsSXQodGhpcy5ib3hXZWF0aGVyKTtcbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuaW5uZXJUZXh0ID0gXCJIaWRlIHdlYXRoZXJcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJveFdlYXRoZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC5pbm5lclRleHQgPSBcIlNob3cgd2VhdGhlclwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG5cbiAgICB9XG4gICAgYWRkSXRlbVRvV2VhdGhlckxpc3QocGFyZW50LCBpdGVtLCB0ZXh0KXtcbiAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICBsaS5pbm5lclRleHQgPSB0ZXh0ICsgaXRlbTtcbiAgICAgICAgbGkuY2xhc3NMaXN0LmFkZChcImVsUmlnaHRMaXN0XCIpO1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQobGkpOyAgIFxuICAgIH1cblxuICAgIHNob3dXZWF0aGVyKCl7XG4gICAgICAgIHN1cGVyLnNlbGVjdENvdW50cmllcygpO1xuICAgICAgICBbLi4udGhpcy5jb3VudHJpZXNCb3hdLm1hcChjb3VudHJ5ID0+IHtcbiAgICAgICAgICAgIGlmKGNvdW50cnkubmFtZSA9PT0gdGhpcy50aXRsZS52YWx1ZSl7XG4gICAgICAgICAgICAgICAgZmV0Y2goYGh0dHBzOi8vYXBpLmFwaXh1LmNvbS92MS9jdXJyZW50Lmpzb24/a2V5PTM4ZDI0OTdmZDNiMjQyZTc4ZmIxODIzMTQxODE2MDEmcT0ke2NvdW50cnkuY2FwaXRhbH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGxvY2F0aW9uLCBjdXJyZW50IH0gPSBkYXRhO1xuICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyV2VhdGhlci5pbm5lclRleHQgPSBgV2VhdGhlciBpbiAke2xvY2F0aW9uLm5hbWV9IGAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbVRvV2VhdGhlckxpc3QodGhpcy53ZWF0aGVyTGlzdCwgY3VycmVudC50ZW1wX2MsIFwiQ3VycmVudCB0ZW1wZXJhdHVyZTogXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW1Ub1dlYXRoZXJMaXN0KHRoaXMud2VhdGhlckxpc3QsIGN1cnJlbnQuZmVlbHNsaWtlX2MsIFwiRmVlbHNsaWtlIHRlbXBlcmF0dXJlOiAgXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW1Ub1dlYXRoZXJMaXN0KHRoaXMud2VhdGhlckxpc3QsIGN1cnJlbnQuaHVtaWRpdHksIFwiSHVtaWRpdHk6ICBcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkSXRlbVRvV2VhdGhlckxpc3QodGhpcy53ZWF0aGVyTGlzdCwgY3VycmVudC5wcmVzc3VyZV9tYiwgXCJQcmVzc3VyZTogIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtVG9XZWF0aGVyTGlzdCh0aGlzLndlYXRoZXJMaXN0LCBjdXJyZW50LndpbmRfa3BoLCBcIldpbmQga20vaDogIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRJdGVtVG9XZWF0aGVyTGlzdCh0aGlzLndlYXRoZXJMaXN0LCBjdXJyZW50LmNvbmRpdGlvbi50ZXh0LFwiV2VhdGhlciBjb25kaXRpb246ICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZShcInNyY1wiLCBjdXJyZW50LmNvbmRpdGlvbi5pY29uKTtcbiAgICAgICAgICAgICAgICAgICAgaW1nLmNsYXNzTGlzdC5hZGQoXCJpY29uXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJveFdlYXRoZXIuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWVQYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGltZVBhcmFncmFwaC5pbm5lclRleHQgPSBjdXJyZW50Lmxhc3RfdXBkYXRlZDtcbiAgICAgICAgICAgICAgICAgICAgdGltZVBhcmFncmFwaC5jbGFzc0xpc3QuYWRkKFwidGltZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib3hXZWF0aGVyLmluc2VydEJlZm9yZSh0aW1lUGFyYWdyYXBoLCBzdW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VGltZSA9IGN1cnJlbnQubGFzdF91cGRhdGVkLnNsaWNlKDExLCAxNik7XG4gICAgICAgICAgICAgICAgICAgIGlmKG5ld1RpbWVbMF0gPj0gMiB8fCBuZXdUaW1lWzBdID09PSAnMCcgJiYgbmV3VGltZVsxXSA8PSA1KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2Vjb25kLXBhZ2VfX2xpc3QtLW1vb25cIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYm94V2VhdGhlci5jbGFzc0xpc3QuYWRkKFwibmlnaHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWNvbmQtcGFnZV9fbGlzdC0tc3VuXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJveFdlYXRoZXIuY2xhc3NMaXN0LmFkZChcImRheVwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmYWlsJywgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICBcbiAgICB9XG59XG5cbmV4cG9ydCB7IFdlYXRoZXJNYXAgfTsiLCIgXG5pbXBvcnQgeyBNYXBTZXR1cCB9IGZyb20gJy4vTWFwU2V0dXAuanMnO1xuaW1wb3J0IHsgTWFwIH0gZnJvbSAnLi9NYXAuanMnO1xuaW1wb3J0IHsgVG9vbFRpcHMgfSBmcm9tICcuL1Rvb2xUaXBzJztcbmltcG9ydCB7IFdlYXRoZXJNYXAgfSBmcm9tICcuL1dlYXRoZXJNYXAnO1xuaW1wb3J0IHsgTGlzdHMgfSBmcm9tICcuL0xpc3QnXG5pbXBvcnQge0ZpcmVCYXNlfSBmcm9tICcuL0ZpcmVCYXNlJ1xuXG5cbiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbigpe1xuXG4gICAgY29uc3QgbWFwID0gbmV3IE1hcFNldHVwKCkgO1xuICAgIG1hcC5jcmVhdGVBcnJheUJpZ01hcCgpO1xuICAgIG1hcC5jcmVhdGVBcnJheVNtYWxsTWFwKClcbiAgICBtYXAubW91c2VQb3NpdGlvbigpXG4gICAgbWFwLnNlbGVjdENvdW50cmllcygpO1xuIFxuXG4gICAgY29uc3QgYmlnTWFwID0gbmV3IE1hcCgpO1xuICAgIGJpZ01hcC5ibGlua01hcCgpO1xuICAgIGJpZ01hcC5zZWxlY3RDb3VudHJpZXMoKVxuIFxuXG5cbiAgICBjb25zdCB0b29sVGlwID0gbmV3IFRvb2xUaXBzKCk7XG4gICAgdG9vbFRpcC5zaG93Q291bnRyeUZyb21UYWJsZVRpcHMoKVxuXG5cbiAgICBjb25zdCB3ZWF0aGVyTWFwID0gbmV3IFdlYXRoZXJNYXAoKTtcbiAgICB3ZWF0aGVyTWFwLnNob3dXZWF0aGVyKCk7XG4gXG5cbiAgICBjb25zdCBteUxpc3QgPSBuZXcgTGlzdHMoKTtcbiAgXG5cbiAgICBjb25zdCBmaXJlQmFzZSA9IG5ldyBGaXJlQmFzZSgpO1xuICAgIGZpcmVCYXNlLm5ld1VzZXJTaWduKCk7XG5cblxuIFxufSkiXX0=
