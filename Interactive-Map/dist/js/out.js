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
        _this.toVisitBtn = document.querySelector("#addToVisit");
        _this.addVisitedBtn = _this.toVisitBtn.previousElementSibling;
        _this.btnListExit = document.querySelector("#exitList");
        _this.btnListExit.addEventListener("click", function () {
            return _this.hideElement(_this.listSection);
        });

        _this.toVisitBtn.addEventListener("click", function () {
            _this.showSection(_this.listSection, '120%');
            _this.scrollIt(_this.listSection);
            _this.swichListItem(_this.wishList);
            _this.viewCountry(event, _this.countryMap, _this.smallMap, _this.title.value, _this.attribute, 'notVisited');
        });

        _this.addVisitedBtn.addEventListener("click", function () {
            _this.showSection(_this.listSection, '120%');
            _this.scrollIt(_this.listSection);
            _this.swichListItem(_this.visitedList);
            _this.viewCountry(event, _this.countryMap, _this.smallMap, _this.title.value, _this.attribute, 'visited');
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

//duża mapa i mała mapa

var Map = function (_MapSetup) {
    _inherits(Map, _MapSetup);

    function Map() {
        _classCallCheck(this, Map);

        var _this = _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).call(this));

        _this.sectionSec = document.querySelector("#secondSec"); // sekcja z listą info nt krajów
        _this.spanList = document.querySelector(".countryInfo");
        _this.leftBox = document.querySelector("#leftBox");
        _this.title.addEventListener("keyup", function (e) {
            // wyświetlenie informacji na enter
            if (e.keyCode === 13) {
                _this.viewCountry(event, _this.countryMap, _this.smallMap, _this.title.value, _this.attribute);
                _this.selectWeather();
            }
        });
        //wyświetlenie infromacji na click
        _this.btnSearch.addEventListener("click", function (e) {
            _this.viewCountry(event, _this.countryMap, _this.smallMap, _this.title.value, _this.attribute);
            _this.selectWeather();
        });

        // wyjście z sekcji drugiej (lista) i przeładowanie strony
        _this.exit = document.querySelector("#exitBtn");
        _this.exit.addEventListener("click", function () {
            _this.hideElement(_this.sectionSec);
            location.reload();
            _this.turnOffSearchBtn();
        });

        // po kliknięciu na kraj na mapie wyświetlenie sekcji 2 z listą
        [].concat(_toConsumableArray(_this.countryMap)).map(function (country) {
            country.addEventListener("click", function (e) {
                _this.attribute = e.target.getAttribute("title");
                e.preventDefault();
                _this.hideElement(_this.list);
                _this.selectCountries(_this.attribute);
                _this.selectWeather();
                _this.showSection(_this.sectionSec, '20%');
                _this.viewCountry(event, _this.countryMap, _this.smallMap, _this.title.value, _this.attribute);
            });
        });
        _this.weatherData = [];
        _this.weatherList = document.querySelector("#weatherList");
        _this.headerWeather = document.querySelector("#titleWeather");
        _this.elementWeather = document.querySelectorAll(".elRightList");
        _this.timeParagraph = document.querySelector(".time");
        _this.img = document.querySelector(".icon");
        _this.btnWeather.addEventListener('click', function (e) {
            _this.boxWeather.classList.toggle("hide");
            if (e.target.innerText === "Show weather") {
                e.target.innerText = "Hide weather";
            } else {
                e.target.innerText = "Show weather";
            }
            _this.scrollIt(_this.boxWeather);
            _this.selectCountries();
            _this.showWeather();
        });

        return _this;
    }

    // podświetlenie kraju na mapie
    // podświetlenie mapy i pokazanie tooltip z nazwą


    _createClass(Map, [{
        key: "blinkMap",
        value: function blinkMap() {
            var _this2 = this;

            [].concat(_toConsumableArray(this.countryMap)).forEach(function (country) {
                country.addEventListener("mouseenter", function (e) {
                    e.target.classList.add("visibleCountry");
                    _this2.toolTip.innerText = country.getAttribute("title");
                    _this2.title.value = country.getAttribute("title");

                    _this2.toolTip.style.display = "block";
                    _this2.toolTip.style.top = _this2.mousePosition(window.event).y + "px";
                    _this2.toolTip.style.transform = "translate(0,100%)";
                    _this2.toolTip.style.left = _this2.mousePosition(window.event).x + "px";
                });
                country.addEventListener("mouseleave", function (e) {
                    e.target.classList.remove("visibleCountry");
                    _this2.toolTip.style.display = "none";
                });
            });
        }

        // dodanie infromacji o danym kraju

    }, {
        key: "selectCountries",
        value: function selectCountries(attr) {
            var _this3 = this;

            _get(Map.prototype.__proto__ || Object.getPrototypeOf(Map.prototype), "selectCountries", this).call(this);
            [].concat(_toConsumableArray(this.countriesBox)).map(function (country) {
                var languages = country.languages,
                    currencies = country.currencies;

                if (_this3.title.value === country.name || attr === country.name) {

                    _this3.listEl[0].innerText = "Name of the country: " + country.name;
                    _this3.listEl[1].innerText = "Capital: " + country.capital;

                    [].concat(_toConsumableArray(currencies)).forEach(function (currency) {
                        _this3.listEl[2].innerText = "Currency: " + currency.name;
                    });

                    [].concat(_toConsumableArray(languages)).forEach(function (language) {
                        _this3.listEl[3].innerText = "Language: " + language.name + " ";
                    });

                    _this3.listEl[4].innerText = "Population: " + country.population + " ";

                    _this3.leftBox.style.backgroundImage = "url(" + country.flag + ")";
                    _this3.leftBox.classList.add("leftBoxBackground");
                }
            });
        }
    }, {
        key: "selectWeather",
        value: function selectWeather() {
            var _this4 = this;

            this.getCapital();
            [].concat(_toConsumableArray(this.countriesBox)).map(function (country) {
                if (_this4.title.value === country.name) {
                    fetch("https://api.apixu.com/v1/current.json?key=38d2497fd3b242e78fb182314181601&q=" + _this4.capital).then(function (res) {
                        return res.json();
                    }).then(function (data) {
                        _this4.weatherData = data;
                    }).catch(function (error) {
                        console.log('fail', error);
                    });
                }
            });
        }
    }, {
        key: "showWeather",
        value: function showWeather() {
            var _this5 = this;

            this.selectWeather();
            [this.weatherData].map(function (country) {
                var location = country.location,
                    current = country.current;

                _this5.headerWeather.innerText = "Weather in " + location.name + " ";
                _this5.elementWeather[0].innerText = "Current temperature: " + current.temp_c;
                _this5.elementWeather[1].innerText = "Feelslike temperature: " + current.feelslike_c + " ";
                _this5.elementWeather[2].innerText = "Humidity: " + current.humidity + " ";
                _this5.elementWeather[3].innerText = "Pressure: " + current.pressure_mb + " ";
                _this5.elementWeather[4].innerText = "Wind km/h: " + current.wind_kph + " ";
                _this5.elementWeather[5].innerText = " Weather condition: " + current.condition.text;

                _this5.img.setAttribute("src", current.condition.icon);
                _this5.timeParagraph.innerText = current.last_updated;

                var newTime = current.last_updated.slice(11, 16);
                if (newTime[0] >= 2 || newTime[0] === '0' && newTime[1] <= 5) {
                    document.querySelector(".second-page__list--moon").style.display = "block";
                    _this5.boxWeather.classList.add("night");
                } else {
                    document.querySelector(".second-page__list--sun").style.display = "block";
                    _this5.boxWeather.classList.add("day");
                }
            });
        }

        // schowanie tablicy tips, wyświetlenie sekcji 2, wyświetlenie informacji o kraju i podświetlenie na mapie

    }, {
        key: "viewCountry",
        value: function viewCountry(e, countriesArrayOne, countriesArrayTwo, input, clickedCountry) {
            var _this6 = this;

            e.preventDefault();
            this.hideElement(this.list);
            this.selectCountries();
            this.showSection(this.sectionSec, '20%');
            _get(Map.prototype.__proto__ || Object.getPrototypeOf(Map.prototype), "viewCountry", this).call(this, event, this.countryMap, this.smallMap, this.title.value, this.attribute);
            [].concat(_toConsumableArray(this.countriesBox)).forEach(function (country) {
                if (_this6.title.value === country.name) {
                    _this6.capital = country.capital;
                    _this6.selectWeather(_this6.capital);
                }
            });
        }
        // ustawienie guzika search
        // turnOffSearchBtn(){
        //     if(this.sectionSec.style.display !== "none"){
        //         this.btnSearch.setAttribute("disabled", "true");
        //     } else {
        //         this.btnSearch.setAttribute("disabled", "false");
        //     }
        // }


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

//ogólne ustawienia strony
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
        this.btnWeather = document.querySelector(".btnAdd");
        this.boxWeather = document.querySelector("#weatherBox");
        this.btnSearch = document.querySelector("#btn");
        this.list = header.querySelector("ul");
        this.countries = [];
        this.smallCountries = [];
        this.countriesBox = [];
        this.attribute = "";
        this.capital = "";
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
        // współrzędne myszki -> do wyświetlenie tooltip

    }, {
        key: "mousePosition",
        value: function mousePosition(e) {
            return { x: e.clientX, y: e.clientY };
        }

        // pokazanie danej sekcji

    }, {
        key: "showSection",
        value: function showSection(section, positionTop) {
            section.style.display = 'block';
            section.style.opacity = '1';
            section.style.top = positionTop;
        }
        //schowanie danej sekcji

    }, {
        key: "hideElement",
        value: function hideElement(element) {
            element.style.display = 'none';
        }

        //połączenie z APi i porbanie danych wszystkich krajów

    }, {
        key: "selectCountries",
        value: function selectCountries() {
            var _this3 = this;

            fetch("https://restcountries.eu/rest/v2/all").then(function (res) {
                return res.json();
            }).then(function (data) {
                _this3.countriesBox = data;
            }).catch(function (error) {
                return console.log('fail', error);
            });
        }
    }, {
        key: "getCapital",
        value: function getCapital() {
            var _this4 = this;

            this.selectCountries();
            [].concat(_toConsumableArray(this.countriesBox)).map(function (country) {
                if (_this4.title.value === country.name) {
                    _this4.capital = country.capital;
                }
            });
        }

        // funkcja tworzenie elementu listy

    }, {
        key: "addItemToList",
        value: function addItemToList(parent, item) {
            var newSpan = document.createElement("span");
            newSpan.classList.add("countryInfo");
            newSpan.innerText = item;
            parent.appendChild(newSpan);
        }

        // wskazanie danego kraju, wyświetlenie tablicy z informacjami, duża mapa i mała mapa

    }, {
        key: "viewCountry",
        value: function viewCountry(e, countriesArrayOne, countriesArrayTwo, input, clickedCountry, countryClass) {
            [].concat(_toConsumableArray(countriesArrayOne)).forEach(function (country) {
                var titleOfCountry = country.getAttribute("title");
                if (titleOfCountry === input || titleOfCountry === clickedCountry) {
                    country.classList.toggle("visibleCountry");
                };
            });
            [].concat(_toConsumableArray(countriesArrayTwo)).forEach(function (country) {
                var titleOfCountry = country.getAttribute("title");
                if (titleOfCountry === input || titleOfCountry === clickedCountry) {
                    country.classList.add(countryClass);
                }
            });
        }

        // scrollowanie do danej sekcji

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

        _this.tipsText = "";
        _this.arrayOfLi = [];
        _this.tipsBtn = document.querySelector("#tipBtn");
        // po kliknięciu na btn serach pokazanie listy z nazwami krajów
        _this.tipsBtn.addEventListener("click", function (e) {
            _this.list.classList.add("visible");
            if (_this.list.style.display === "block") {
                _this.createTableTips();
                _this.list.classList.add("hide");
            } else {
                _this.hideElement(_this.list);
                // e.target.setAttribute("disabled", "true");
            }
        });
        return _this;
    }
    // stworzenie tablicy z nazwami krajów


    _createClass(ToolTips, [{
        key: "createTableTips",
        value: function createTableTips() {
            var _this2 = this;

            this.list.classList.remove("tips");
            [].concat(_toConsumableArray(this.countryMap)).map(function (el) {
                _this2.attribute = el.getAttribute("title");
                var newLi = document.createElement("li");
                newLi.classList.add("tipsElement");
                _this2.list.appendChild(newLi);
                newLi.innerText = _this2.attribute;
                header.appendChild(_this2.list);

                _this2.arrayOfLi.push(newLi);
                _this2.showCountryFromTableTips(_this2.arrayOfLi);
            });
        }
        // pokazanie kraju wybranego z tablicy Tips

    }, {
        key: "showCountryFromTableTips",
        value: function showCountryFromTableTips(arrayOfLi) {
            var _this3 = this;

            [].concat(_toConsumableArray(arrayOfLi)).forEach(function (tip) {
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
'use strict';

var _MapSetup = require('./MapSetup.js');

var _Map = require('./Map.js');

var _ToolTips = require('./ToolTips');

var _List = require('./List');

var _FireBase = require('./FireBase');

document.addEventListener("DOMContentLoaded", function () {

  var map = new _MapSetup.MapSetup();
  map.createArrayBigMap();
  map.createArraySmallMap();
  map.selectCountries();
  map.getCapital();

  var bigMap = new _Map.Map();
  bigMap.blinkMap();
  bigMap.selectCountries();
  bigMap.selectWeather();

  var toolTip = new _ToolTips.ToolTips();

  var myList = new _List.Lists();
  var fireBase = new _FireBase.FireBase();
  fireBase.newUserSign();
});

},{"./FireBase":1,"./List":2,"./Map.js":3,"./MapSetup.js":4,"./ToolTips":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9GaXJlQmFzZS5qcyIsInNyYy9zY3JpcHRzL0xpc3QuanMiLCJzcmMvc2NyaXB0cy9NYXAuanMiLCJzcmMvc2NyaXB0cy9NYXBTZXR1cC5qcyIsInNyYy9zY3JpcHRzL1Rvb2xUaXBzLmpzIiwic3JjL3NjcmlwdHMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBOztJQUVNLFE7QUFDRix3QkFBYTtBQUFBOztBQUFBOztBQUNULGFBQUssTUFBTCxHQUFjO0FBQ1Ysb0JBQVEseUNBREU7QUFFVix3QkFBWSx1Q0FGRjtBQUdWLHlCQUFhLDhDQUhIO0FBSVYsdUJBQVcsdUJBSkQ7QUFLViwyQkFBZSxtQ0FMTDtBQU1WLCtCQUFtQjtBQU5ULFNBQWQ7QUFRQSxhQUFLLFFBQUwsR0FBZ0IsU0FBUyxhQUFULENBQXVCLEtBQUssTUFBNUIsQ0FBaEI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsS0FBSyxRQUFMLENBQWMsUUFBZCxFQUFoQjs7QUFFQTtBQUNBLGFBQUssS0FBTCxHQUFhLFNBQVMsY0FBVCxDQUF3QixPQUF4QixDQUFiO0FBQ0EsYUFBSyxNQUFMLEdBQWMsU0FBUyxjQUFULENBQXdCLFFBQXhCLENBQWQ7QUFDQSxhQUFLLE1BQUwsR0FBYyxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBZDtBQUNBLGFBQUssV0FBTCxHQUFtQixTQUFTLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBbkI7QUFDQSxhQUFLLFVBQUwsR0FBa0IsU0FBUyxjQUFULENBQXdCLFdBQXhCLENBQWxCO0FBQ0EsYUFBSyxJQUFMLEdBQVksU0FBUyxjQUFULENBQXdCLFlBQXhCLENBQVo7QUFDQSxhQUFLLEtBQUwsR0FBYSxFQUFiOztBQUdBO0FBQ0EsYUFBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBNEIsT0FBNUIsRUFBcUMsYUFBSTtBQUNyQyxxQkFBUyxjQUFULENBQXdCLFdBQXhCLEVBQXFDLEtBQXJDLENBQTJDLE9BQTNDLEdBQXFELE9BQXJEO0FBRUgsU0FIRDtBQUlBOzs7QUFHQTtBQUNBLGFBQUssTUFBTCxDQUFZLGdCQUFaLENBQTZCLE9BQTdCLEVBQXNDLGFBQUs7QUFDdkMsa0JBQUssUUFBTCxDQUFjLElBQWQsR0FBcUIsT0FBckI7QUFDSCxTQUZEOztBQUlBO0FBQ0EsYUFBSyxNQUFMLENBQVksZ0JBQVosQ0FBNkIsT0FBN0IsRUFBc0MsYUFBSzs7QUFFdkMsa0JBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsT0FBaEIsR0FBMEIsT0FBMUI7QUFFSCxTQUpEOztBQU1BO0FBQ0EsYUFBSyxVQUFMLENBQWdCLGdCQUFoQixDQUFpQyxPQUFqQyxFQUEwQyxhQUFLO0FBQzNDLGNBQUUsY0FBRjtBQUNBLGdCQUFNLFFBQVEsU0FBUyxjQUFULENBQXdCLFVBQXhCLEVBQW9DLEtBQWxEO0FBQ0EsZ0JBQU0sUUFBUSxTQUFTLGNBQVQsQ0FBd0IsT0FBeEIsRUFBaUMsS0FBL0M7QUFDQSxnQkFBTSxPQUFPLE1BQUssUUFBTCxDQUFjLElBQWQsRUFBYjs7QUFFQSxnQkFBTSxVQUFVLEtBQUssMEJBQUwsQ0FBZ0MsS0FBaEMsRUFBdUMsS0FBdkMsQ0FBaEI7QUFDQSxvQkFBUSxLQUFSLENBQWM7QUFBQSx1QkFBSyxRQUFRLEdBQVIsQ0FBWSxFQUFFLE9BQWQsQ0FBTDtBQUFBLGFBQWQ7QUFFSCxTQVREOztBQVdBO0FBQ0EsYUFBSyxXQUFMLENBQWlCLGdCQUFqQixDQUFrQyxPQUFsQyxFQUEyQyxhQUFLO0FBQzVDLGNBQUUsY0FBRjtBQUNBLGdCQUFNLFFBQVEsU0FBUyxjQUFULENBQXdCLFVBQXhCLEVBQW9DLEtBQWxEO0FBQ0EsZ0JBQU0sUUFBUSxTQUFTLGNBQVQsQ0FBd0IsT0FBeEIsRUFBaUMsS0FBL0M7QUFDQSxnQkFBTSxPQUFPLE1BQUssUUFBTCxDQUFjLElBQWQsRUFBYjs7QUFFQSxnQkFBTSxVQUFVLEtBQUssOEJBQUwsQ0FBb0MsS0FBcEMsRUFBMkMsS0FBM0MsQ0FBaEI7QUFDQSxvQkFBUSxLQUFSLENBQWM7QUFBQSx1QkFBSyxRQUFRLEdBQVIsQ0FBWSxFQUFFLE9BQWQsQ0FBTDtBQUFBLGFBQWQ7O0FBR0EsZ0JBQUcsTUFBSyxJQUFMLENBQVUsS0FBVixDQUFnQixPQUFoQixLQUE0QixNQUEvQixFQUFzQztBQUNsQyxzQkFBSyxJQUFMLENBQVUsS0FBVixDQUFnQixPQUFoQixHQUEwQixNQUExQjtBQUNIO0FBRUosU0FkRDtBQWVIOzs7O3NDQUdZO0FBQUE7O0FBQ1QsaUJBQUssUUFBTCxDQUFjLElBQWQsR0FBcUIsa0JBQXJCLENBQXlDLGdCQUFPO0FBQzVDLG9CQUFHLElBQUgsRUFBUTtBQUNKLDRCQUFRLEdBQVIsQ0FBWSxPQUFPLFdBQVAsR0FBcUIsT0FBSyxRQUFMLENBQWMsSUFBZCxHQUFxQixXQUFyQixDQUFpQyxHQUFsRTtBQUNBLDJCQUFLLE1BQUwsQ0FBWSxTQUFaLENBQXNCLE1BQXRCLENBQTZCLE1BQTdCO0FBQ0gsaUJBSEQsTUFHTztBQUNILDRCQUFRLEdBQVIsQ0FBWSxlQUFaO0FBQ0EsMkJBQUssTUFBTCxDQUFZLFNBQVosQ0FBc0IsR0FBdEIsQ0FBMEIsTUFBMUI7QUFDSDtBQUNKLGFBUkQ7QUFTSDs7Ozs7O1FBS0csUSxHQUFBLFE7Ozs7Ozs7Ozs7OztBQzNGUjs7Ozs7Ozs7SUFFTSxLOzs7QUFDRixxQkFBYTtBQUFBOztBQUFBOztBQUVULGNBQUssV0FBTCxHQUFtQixTQUFTLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBbkI7QUFDQSxjQUFLLFdBQUwsR0FBbUIsU0FBUyxhQUFULENBQXVCLGNBQXZCLENBQW5CO0FBQ0EsY0FBSyxRQUFMLEdBQWdCLFNBQVMsYUFBVCxDQUF1QixXQUF2QixDQUFoQjtBQUNBLGNBQUssVUFBTCxHQUFrQixTQUFTLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBbEI7QUFDQSxjQUFLLGFBQUwsR0FBcUIsTUFBSyxVQUFMLENBQWdCLHNCQUFyQztBQUNBLGNBQUssV0FBTCxHQUFtQixTQUFTLGFBQVQsQ0FBdUIsV0FBdkIsQ0FBbkI7QUFDQSxjQUFLLFdBQUwsQ0FBaUIsZ0JBQWpCLENBQWtDLE9BQWxDLEVBQTJDO0FBQUEsbUJBQU0sTUFBSyxXQUFMLENBQWlCLE1BQUssV0FBdEIsQ0FBTjtBQUFBLFNBQTNDOztBQUVBLGNBQUssVUFBTCxDQUFnQixnQkFBaEIsQ0FBaUMsT0FBakMsRUFBMEMsWUFBSTtBQUMxQyxrQkFBSyxXQUFMLENBQWlCLE1BQUssV0FBdEIsRUFBbUMsTUFBbkM7QUFDQSxrQkFBSyxRQUFMLENBQWMsTUFBSyxXQUFuQjtBQUNBLGtCQUFLLGFBQUwsQ0FBbUIsTUFBSyxRQUF4QjtBQUNBLGtCQUFLLFdBQUwsQ0FBaUIsS0FBakIsRUFBd0IsTUFBSyxVQUE3QixFQUF5QyxNQUFLLFFBQTlDLEVBQXdELE1BQUssS0FBTCxDQUFXLEtBQW5FLEVBQTBFLE1BQUssU0FBL0UsRUFBMEYsWUFBMUY7QUFFSCxTQU5EOztBQVFBLGNBQUssYUFBTCxDQUFtQixnQkFBbkIsQ0FBb0MsT0FBcEMsRUFBNkMsWUFBSTtBQUM3QyxrQkFBSyxXQUFMLENBQWlCLE1BQUssV0FBdEIsRUFBbUMsTUFBbkM7QUFDQSxrQkFBSyxRQUFMLENBQWMsTUFBSyxXQUFuQjtBQUNBLGtCQUFLLGFBQUwsQ0FBbUIsTUFBSyxXQUF4QjtBQUNBLGtCQUFLLFdBQUwsQ0FBaUIsS0FBakIsRUFBd0IsTUFBSyxVQUE3QixFQUF5QyxNQUFLLFFBQTlDLEVBQXdELE1BQUssS0FBTCxDQUFXLEtBQW5FLEVBQTBFLE1BQUssU0FBL0UsRUFBMEYsU0FBMUY7QUFDSCxTQUxEO0FBbEJTO0FBd0JaOzs7O3NDQUVhLE0sRUFBTztBQUNqQixnQkFBSSxVQUFVLEtBQUssTUFBTCxDQUFZLENBQVosRUFBZSxTQUE3QjtBQUNBLGlCQUFLLGFBQUwsQ0FBbUIsTUFBbkIsRUFBMkIsT0FBM0IsRUFBb0MsRUFBcEM7O0FBRUE7QUFFSDs7QUFHTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O1FBS1MsSyxHQUFBLEs7Ozs7Ozs7Ozs7Ozs7O0FDeERUOzs7Ozs7Ozs7O0FBRUE7O0lBRU0sRzs7O0FBQ0YsbUJBQWE7QUFBQTs7QUFBQTs7QUFFVCxjQUFLLFVBQUwsR0FBa0IsU0FBUyxhQUFULENBQXVCLFlBQXZCLENBQWxCLENBRlMsQ0FFOEM7QUFDdkQsY0FBSyxRQUFMLEdBQWdCLFNBQVMsYUFBVCxDQUF1QixjQUF2QixDQUFoQjtBQUNBLGNBQUssT0FBTCxHQUFlLFNBQVMsYUFBVCxDQUF1QixVQUF2QixDQUFmO0FBQ0EsY0FBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBNEIsT0FBNUIsRUFBcUMsYUFBSTtBQUFFO0FBQ3ZDLGdCQUFHLEVBQUUsT0FBRixLQUFjLEVBQWpCLEVBQW9CO0FBQ2hCLHNCQUFLLFdBQUwsQ0FBaUIsS0FBakIsRUFBd0IsTUFBSyxVQUE3QixFQUF5QyxNQUFLLFFBQTlDLEVBQXdELE1BQUssS0FBTCxDQUFXLEtBQW5FLEVBQTBFLE1BQUssU0FBL0U7QUFDQSxzQkFBSyxhQUFMO0FBQ0g7QUFFSixTQU5EO0FBT0E7QUFDQSxjQUFLLFNBQUwsQ0FBZSxnQkFBZixDQUFnQyxPQUFoQyxFQUF5QyxVQUFDLENBQUQsRUFBSztBQUMxQyxrQkFBSyxXQUFMLENBQWlCLEtBQWpCLEVBQXdCLE1BQUssVUFBN0IsRUFBeUMsTUFBSyxRQUE5QyxFQUF3RCxNQUFLLEtBQUwsQ0FBVyxLQUFuRSxFQUEwRSxNQUFLLFNBQS9FO0FBQ0Esa0JBQUssYUFBTDtBQUNILFNBSEQ7O0FBS0E7QUFDQSxjQUFLLElBQUwsR0FBWSxTQUFTLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBWjtBQUNBLGNBQUssSUFBTCxDQUFVLGdCQUFWLENBQTJCLE9BQTNCLEVBQW9DLFlBQU07QUFDdEMsa0JBQUssV0FBTCxDQUFpQixNQUFLLFVBQXRCO0FBQ0EscUJBQVMsTUFBVDtBQUNBLGtCQUFLLGdCQUFMO0FBRUgsU0FMRDs7QUFPQTtBQUNBLHFDQUFJLE1BQUssVUFBVCxHQUFxQixHQUFyQixDQUF5QixtQkFBVztBQUNoQyxvQkFBUSxnQkFBUixDQUF5QixPQUF6QixFQUFrQyxhQUFLO0FBQ25DLHNCQUFLLFNBQUwsR0FBaUIsRUFBRSxNQUFGLENBQVMsWUFBVCxDQUFzQixPQUF0QixDQUFqQjtBQUNBLGtCQUFFLGNBQUY7QUFDQSxzQkFBSyxXQUFMLENBQWlCLE1BQUssSUFBdEI7QUFDQSxzQkFBSyxlQUFMLENBQXFCLE1BQUssU0FBMUI7QUFDQSxzQkFBSyxhQUFMO0FBQ0Esc0JBQUssV0FBTCxDQUFpQixNQUFLLFVBQXRCLEVBQWlDLEtBQWpDO0FBQ0Esc0JBQUssV0FBTCxDQUFpQixLQUFqQixFQUF3QixNQUFLLFVBQTdCLEVBQXlDLE1BQUssUUFBOUMsRUFBd0QsTUFBSyxLQUFMLENBQVcsS0FBbkUsRUFBMEUsTUFBSyxTQUEvRTtBQUVILGFBVEQ7QUFVSCxTQVhEO0FBWUEsY0FBSyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsY0FBSyxXQUFMLEdBQW1CLFNBQVMsYUFBVCxDQUF1QixjQUF2QixDQUFuQjtBQUNBLGNBQUssYUFBTCxHQUFxQixTQUFTLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBckI7QUFDQSxjQUFLLGNBQUwsR0FBc0IsU0FBUyxnQkFBVCxDQUEwQixjQUExQixDQUF0QjtBQUNBLGNBQUssYUFBTCxHQUFxQixTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBckI7QUFDQSxjQUFLLEdBQUwsR0FBVyxTQUFTLGFBQVQsQ0FBdUIsT0FBdkIsQ0FBWDtBQUNBLGNBQUssVUFBTCxDQUFnQixnQkFBaEIsQ0FBaUMsT0FBakMsRUFBMEMsVUFBQyxDQUFELEVBQU87QUFDN0Msa0JBQUssVUFBTCxDQUFnQixTQUFoQixDQUEwQixNQUExQixDQUFpQyxNQUFqQztBQUNBLGdCQUFJLEVBQUUsTUFBRixDQUFTLFNBQVQsS0FBdUIsY0FBM0IsRUFBMEM7QUFDdEMsa0JBQUUsTUFBRixDQUFTLFNBQVQsR0FBcUIsY0FBckI7QUFDSCxhQUZELE1BRU87QUFDSCxrQkFBRSxNQUFGLENBQVMsU0FBVCxHQUFxQixjQUFyQjtBQUNIO0FBQ0Qsa0JBQUssUUFBTCxDQUFjLE1BQUssVUFBbkI7QUFDQSxrQkFBSyxlQUFMO0FBQ0Esa0JBQUssV0FBTDtBQUdILFNBWkQ7O0FBOUNTO0FBNERaOztBQUVEO0FBQ0U7Ozs7O21DQUNRO0FBQUE7O0FBQ04seUNBQUksS0FBSyxVQUFULEdBQXFCLE9BQXJCLENBQTZCLG1CQUFXO0FBQ3BDLHdCQUFRLGdCQUFSLENBQXlCLFlBQXpCLEVBQXNDLFVBQUMsQ0FBRCxFQUFNO0FBQ3hDLHNCQUFFLE1BQUYsQ0FBUyxTQUFULENBQW1CLEdBQW5CLENBQXVCLGdCQUF2QjtBQUNBLDJCQUFLLE9BQUwsQ0FBYSxTQUFiLEdBQXlCLFFBQVEsWUFBUixDQUFxQixPQUFyQixDQUF6QjtBQUNBLDJCQUFLLEtBQUwsQ0FBVyxLQUFYLEdBQW1CLFFBQVEsWUFBUixDQUFxQixPQUFyQixDQUFuQjs7QUFFQSwyQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixPQUFuQixHQUE2QixPQUE3QjtBQUNBLDJCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLEdBQW5CLEdBQXlCLE9BQUssYUFBTCxDQUFtQixPQUFPLEtBQTFCLEVBQWlDLENBQWpDLEdBQXFDLElBQTlEO0FBQ0EsMkJBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsU0FBbkIsR0FBK0IsbUJBQS9CO0FBQ0EsMkJBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsSUFBbkIsR0FBMEIsT0FBSyxhQUFMLENBQW1CLE9BQU8sS0FBMUIsRUFBaUMsQ0FBakMsR0FBcUMsSUFBL0Q7QUFDSCxpQkFURDtBQVVBLHdCQUFRLGdCQUFSLENBQXlCLFlBQXpCLEVBQXNDLFVBQUMsQ0FBRCxFQUFNO0FBQ3hDLHNCQUFFLE1BQUYsQ0FBUyxTQUFULENBQW1CLE1BQW5CLENBQTBCLGdCQUExQjtBQUNBLDJCQUFLLE9BQUwsQ0FBYSxLQUFiLENBQW1CLE9BQW5CLEdBQTZCLE1BQTdCO0FBRUgsaUJBSkQ7QUFLSCxhQWhCRDtBQWlCSDs7QUFFRDs7Ozt3Q0FDZ0IsSSxFQUFLO0FBQUE7O0FBQ2pCO0FBQ0kseUNBQUksS0FBSyxZQUFULEdBQXVCLEdBQXZCLENBQTJCLG1CQUFXO0FBQUEsb0JBQzNCLFNBRDJCLEdBQ0YsT0FERSxDQUMzQixTQUQyQjtBQUFBLG9CQUNoQixVQURnQixHQUNGLE9BREUsQ0FDaEIsVUFEZ0I7O0FBRWxDLG9CQUFHLE9BQUssS0FBTCxDQUFXLEtBQVgsS0FBcUIsUUFBUSxJQUE3QixJQUFxQyxTQUFTLFFBQVEsSUFBekQsRUFBOEQ7O0FBRTFELDJCQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsU0FBZiw2QkFBbUQsUUFBUSxJQUEzRDtBQUNBLDJCQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsU0FBZixpQkFBdUMsUUFBUSxPQUEvQzs7QUFFQSxpREFBSSxVQUFKLEdBQWdCLE9BQWhCLENBQXdCLG9CQUFVO0FBQzlCLCtCQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsU0FBZixrQkFBd0MsU0FBUyxJQUFqRDtBQUNILHFCQUZEOztBQUlBLGlEQUFJLFNBQUosR0FBZSxPQUFmLENBQXVCLG9CQUFXO0FBQzlCLCtCQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsU0FBZixrQkFBeUMsU0FBUyxJQUFsRDtBQUNILHFCQUZEOztBQUlBLDJCQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsU0FBZixvQkFBMEMsUUFBUSxVQUFsRDs7QUFFQSwyQkFBSyxPQUFMLENBQWEsS0FBYixDQUFtQixlQUFuQixZQUE0QyxRQUFRLElBQXBEO0FBQ0EsMkJBQUssT0FBTCxDQUFhLFNBQWIsQ0FBdUIsR0FBdkIsQ0FBMkIsbUJBQTNCO0FBQ0g7QUFDSixhQXBCRDtBQXNCUDs7O3dDQUVjO0FBQUE7O0FBQ1gsaUJBQUssVUFBTDtBQUNBLHlDQUFJLEtBQUssWUFBVCxHQUF1QixHQUF2QixDQUEyQixtQkFBVztBQUNsQyxvQkFBRyxPQUFLLEtBQUwsQ0FBVyxLQUFYLEtBQXFCLFFBQVEsSUFBaEMsRUFBcUM7QUFDakMsMkdBQXFGLE9BQUssT0FBMUYsRUFDQyxJQURELENBQ007QUFBQSwrQkFBTyxJQUFJLElBQUosRUFBUDtBQUFBLHFCQUROLEVBRUMsSUFGRCxDQUVNLGdCQUFRO0FBQ1YsK0JBQUssV0FBTCxHQUFtQixJQUFuQjtBQUNILHFCQUpELEVBSUcsS0FKSCxDQUlTLGlCQUFTO0FBQ2xCLGdDQUFRLEdBQVIsQ0FBWSxNQUFaLEVBQW9CLEtBQXBCO0FBQ0MscUJBTkQ7QUFPSDtBQUNKLGFBVkQ7QUFXSDs7O3NDQUdZO0FBQUE7O0FBQ1QsaUJBQUssYUFBTDtBQUNBLGFBQUMsS0FBSyxXQUFOLEVBQW1CLEdBQW5CLENBQXdCLG1CQUFVO0FBQUEsb0JBQ3RCLFFBRHNCLEdBQ0EsT0FEQSxDQUN0QixRQURzQjtBQUFBLG9CQUNaLE9BRFksR0FDQSxPQURBLENBQ1osT0FEWTs7QUFFOUIsdUJBQUssYUFBTCxDQUFtQixTQUFuQixtQkFBNkMsU0FBUyxJQUF0RDtBQUNBLHVCQUFLLGNBQUwsQ0FBb0IsQ0FBcEIsRUFBdUIsU0FBdkIsNkJBQTJELFFBQVEsTUFBbkU7QUFDQSx1QkFBSyxjQUFMLENBQW9CLENBQXBCLEVBQXVCLFNBQXZCLCtCQUE4RCxRQUFRLFdBQXRFO0FBQ0EsdUJBQUssY0FBTCxDQUFvQixDQUFwQixFQUF1QixTQUF2QixrQkFBaUQsUUFBUSxRQUF6RDtBQUNBLHVCQUFLLGNBQUwsQ0FBb0IsQ0FBcEIsRUFBdUIsU0FBdkIsa0JBQWlELFFBQVEsV0FBekQ7QUFDQSx1QkFBSyxjQUFMLENBQW9CLENBQXBCLEVBQXVCLFNBQXZCLG1CQUFrRCxRQUFRLFFBQTFEO0FBQ0EsdUJBQUssY0FBTCxDQUFvQixDQUFwQixFQUF1QixTQUF2Qiw0QkFBNEQsUUFBUSxTQUFSLENBQWtCLElBQTlFOztBQUdBLHVCQUFLLEdBQUwsQ0FBUyxZQUFULENBQXNCLEtBQXRCLEVBQTZCLFFBQVEsU0FBUixDQUFrQixJQUEvQztBQUNBLHVCQUFLLGFBQUwsQ0FBbUIsU0FBbkIsR0FBK0IsUUFBUSxZQUF2Qzs7QUFHQSxvQkFBSSxVQUFVLFFBQVEsWUFBUixDQUFxQixLQUFyQixDQUEyQixFQUEzQixFQUErQixFQUEvQixDQUFkO0FBQ0Esb0JBQUcsUUFBUSxDQUFSLEtBQWMsQ0FBZCxJQUFtQixRQUFRLENBQVIsTUFBZSxHQUFmLElBQXNCLFFBQVEsQ0FBUixLQUFjLENBQTFELEVBQTREO0FBQ3hELDZCQUFTLGFBQVQsQ0FBdUIsMEJBQXZCLEVBQW1ELEtBQW5ELENBQXlELE9BQXpELEdBQW1FLE9BQW5FO0FBQ0EsMkJBQUssVUFBTCxDQUFnQixTQUFoQixDQUEwQixHQUExQixDQUE4QixPQUE5QjtBQUVILGlCQUpELE1BSU87QUFDSCw2QkFBUyxhQUFULENBQXVCLHlCQUF2QixFQUFrRCxLQUFsRCxDQUF3RCxPQUF4RCxHQUFrRSxPQUFsRTtBQUNBLDJCQUFLLFVBQUwsQ0FBZ0IsU0FBaEIsQ0FBMEIsR0FBMUIsQ0FBOEIsS0FBOUI7QUFDSDtBQUNKLGFBeEJEO0FBMEJIOztBQUVEOzs7O29DQUNZLEMsRUFBRyxpQixFQUFtQixpQixFQUFtQixLLEVBQU8sYyxFQUFlO0FBQUE7O0FBQ3ZFLGNBQUUsY0FBRjtBQUNBLGlCQUFLLFdBQUwsQ0FBaUIsS0FBSyxJQUF0QjtBQUNBLGlCQUFLLGVBQUw7QUFDQSxpQkFBSyxXQUFMLENBQWlCLEtBQUssVUFBdEIsRUFBaUMsS0FBakM7QUFDQSxrSEFBa0IsS0FBbEIsRUFBeUIsS0FBSyxVQUE5QixFQUEwQyxLQUFLLFFBQS9DLEVBQXlELEtBQUssS0FBTCxDQUFXLEtBQXBFLEVBQTJFLEtBQUssU0FBaEY7QUFDQSx5Q0FBSSxLQUFLLFlBQVQsR0FBdUIsT0FBdkIsQ0FBK0IsbUJBQVM7QUFDcEMsb0JBQUksT0FBSyxLQUFMLENBQVcsS0FBWCxLQUFxQixRQUFRLElBQWpDLEVBQXNDO0FBQ2xDLDJCQUFLLE9BQUwsR0FBZSxRQUFRLE9BQXZCO0FBQ0EsMkJBQUssYUFBTCxDQUFvQixPQUFLLE9BQXpCO0FBQ0g7QUFDSixhQUxEO0FBTUg7QUFDRjtBQUNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztRQUtLLEcsR0FBQSxHOzs7Ozs7Ozs7Ozs7Ozs7QUM1TFQ7SUFDTSxRO0FBQ0Ysd0JBQWE7QUFBQTs7QUFDVCxhQUFLLFVBQUwsR0FBa0IsU0FBUyxhQUFULENBQXVCLE1BQXZCLEVBQStCLFFBQWpEO0FBQ0EsYUFBSyxRQUFMLEdBQWdCLFNBQVMsYUFBVCxDQUF1QixTQUF2QixFQUFrQyxRQUFsRDtBQUNBLGFBQUssYUFBTCxHQUFxQixTQUFTLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBckI7QUFDQSxhQUFLLE1BQUwsR0FBYyxLQUFLLGFBQUwsQ0FBbUIsUUFBakM7QUFDQSxhQUFLLFNBQUwsR0FBaUIsU0FBUyxnQkFBVCxDQUEwQixjQUExQixDQUFqQjtBQUNBLGFBQUssS0FBTCxHQUFhLFNBQVMsYUFBVCxDQUF1QixjQUF2QixDQUFiO0FBQ0EsYUFBSyxPQUFMLEdBQWUsU0FBUyxhQUFULENBQXVCLFVBQXZCLENBQWY7QUFDQSxhQUFLLE1BQUwsR0FBYyxTQUFTLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBZDtBQUNBLGFBQUssVUFBTCxHQUFrQixTQUFTLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBbEI7QUFDQSxhQUFLLFVBQUwsR0FBa0IsU0FBUyxhQUFULENBQXVCLGFBQXZCLENBQWxCO0FBQ0EsYUFBSyxTQUFMLEdBQWlCLFNBQVMsYUFBVCxDQUF1QixNQUF2QixDQUFqQjtBQUNBLGFBQUssSUFBTCxHQUFZLE9BQU8sYUFBUCxDQUFxQixJQUFyQixDQUFaO0FBQ0EsYUFBSyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsYUFBSyxjQUFMLEdBQXNCLEVBQXRCO0FBQ0EsYUFBSyxZQUFMLEdBQW9CLEVBQXBCO0FBQ0EsYUFBSyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsYUFBSyxPQUFMLEdBQWUsRUFBZjtBQUdIOzs7OzRDQUVrQjtBQUFBOztBQUNmLG1CQUFPLDZCQUFJLEtBQUssVUFBVCxHQUFxQixPQUFyQixDQUE2QixtQkFBVztBQUMzQyxvQkFBRyxPQUFPLE9BQVAsS0FBbUIsV0FBdEIsRUFBa0M7QUFDOUIsMEJBQUssU0FBTCxDQUFlLElBQWYsQ0FBb0IsRUFBQyxJQUFJLFFBQVEsRUFBYixFQUFpQixPQUFPLFFBQVEsWUFBUixDQUFxQixPQUFyQixDQUF4QixFQUFwQjtBQUNBLDJCQUFPLE1BQUssU0FBWjtBQUNIO0FBQ0osYUFMTSxDQUFQO0FBTUg7Ozs4Q0FFb0I7QUFBQTs7QUFDakIsbUJBQU8sNkJBQUksS0FBSyxRQUFULEdBQW1CLE9BQW5CLENBQTJCLG1CQUFXO0FBQ3pDLG9CQUFHLE9BQU8sT0FBUCxLQUFtQixXQUF0QixFQUFrQztBQUM5QiwyQkFBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLEVBQUMsSUFBSSxRQUFRLEVBQWIsRUFBaUIsT0FBTyxRQUFRLFlBQVIsQ0FBcUIsT0FBckIsQ0FBeEIsRUFBekI7QUFDQSwyQkFBTyxPQUFLLGNBQVo7QUFDSDtBQUNKLGFBTE0sQ0FBUDtBQU1IO0FBQ0Q7Ozs7c0NBQ2MsQyxFQUFFO0FBQ1osbUJBQU8sRUFBRSxHQUFHLEVBQUUsT0FBUCxFQUFnQixHQUFHLEVBQUUsT0FBckIsRUFBUDtBQUNIOztBQUVEOzs7O29DQUNZLE8sRUFBUyxXLEVBQVk7QUFDN0Isb0JBQVEsS0FBUixDQUFjLE9BQWQsR0FBd0IsT0FBeEI7QUFDQSxvQkFBUSxLQUFSLENBQWMsT0FBZCxHQUF3QixHQUF4QjtBQUNBLG9CQUFRLEtBQVIsQ0FBYyxHQUFkLEdBQW9CLFdBQXBCO0FBQ0g7QUFDRDs7OztvQ0FDWSxPLEVBQVE7QUFDaEIsb0JBQVEsS0FBUixDQUFjLE9BQWQsR0FBd0IsTUFBeEI7QUFDSDs7QUFFRDs7OzswQ0FDaUI7QUFBQTs7QUFDYiwwREFDSyxJQURMLENBQ1U7QUFBQSx1QkFBTyxJQUFJLElBQUosRUFBUDtBQUFBLGFBRFYsRUFFSyxJQUZMLENBRVUsZ0JBQVE7QUFDWCx1QkFBSyxZQUFMLEdBQW9CLElBQXBCO0FBQ0YsYUFKTCxFQUlPLEtBSlAsQ0FJYSxpQkFBUTtBQUFDLHVCQUFPLFFBQVEsR0FBUixDQUFZLE1BQVosRUFBb0IsS0FBcEIsQ0FBUDtBQUFrQyxhQUp4RDtBQU1IOzs7cUNBRVc7QUFBQTs7QUFDUixpQkFBSyxlQUFMO0FBQ0EseUNBQUksS0FBSyxZQUFULEdBQXVCLEdBQXZCLENBQTJCLG1CQUFVO0FBQ2pDLG9CQUFHLE9BQUssS0FBTCxDQUFXLEtBQVgsS0FBcUIsUUFBUSxJQUFoQyxFQUFxQztBQUNoQywyQkFBSyxPQUFMLEdBQWUsUUFBUSxPQUF2QjtBQUNKO0FBQ0osYUFKRDtBQUtIOztBQUlEOzs7O3NDQUNjLE0sRUFBUSxJLEVBQUs7QUFDdkIsZ0JBQUksVUFBVSxTQUFTLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBZDtBQUNBLG9CQUFRLFNBQVIsQ0FBa0IsR0FBbEIsQ0FBc0IsYUFBdEI7QUFDQSxvQkFBUSxTQUFSLEdBQW9CLElBQXBCO0FBQ0EsbUJBQU8sV0FBUCxDQUFtQixPQUFuQjtBQUNIOztBQUVEOzs7O29DQUNZLEMsRUFBRyxpQixFQUFtQixpQixFQUFtQixLLEVBQU8sYyxFQUFnQixZLEVBQWE7QUFDckYseUNBQUksaUJBQUosR0FBdUIsT0FBdkIsQ0FBK0IsbUJBQVc7QUFDdEMsb0JBQUksaUJBQWlCLFFBQVEsWUFBUixDQUFxQixPQUFyQixDQUFyQjtBQUNBLG9CQUFHLG1CQUFtQixLQUFuQixJQUE0QixtQkFBbUIsY0FBbEQsRUFBaUU7QUFDN0QsNEJBQVEsU0FBUixDQUFrQixNQUFsQixDQUF5QixnQkFBekI7QUFDSDtBQUNKLGFBTEQ7QUFNQSx5Q0FBSSxpQkFBSixHQUF1QixPQUF2QixDQUErQixtQkFBVztBQUNsQyxvQkFBSSxpQkFBaUIsUUFBUSxZQUFSLENBQXFCLE9BQXJCLENBQXJCO0FBQ0Esb0JBQUcsbUJBQW1CLEtBQW5CLElBQTRCLG1CQUFtQixjQUFsRCxFQUFpRTtBQUM3RCw0QkFBUSxTQUFSLENBQWtCLEdBQWxCLENBQXNCLFlBQXRCO0FBQ0g7QUFDSixhQUxMO0FBT0g7O0FBRUQ7Ozs7aUNBQ1MsTyxFQUFTO0FBQ2QsbUJBQU8sUUFBUCxDQUFnQjtBQUNaLDRCQUFZLFFBREE7QUFFWix1QkFBTyxRQUFRO0FBRkgsYUFBaEI7QUFJSDs7Ozs7O1FBS0ksUSxHQUFBLFE7Ozs7Ozs7Ozs7OztBQ2xIVDs7Ozs7Ozs7OztJQUVNLFE7OztBQUNGLHdCQUFhO0FBQUE7O0FBQUE7O0FBRVQsY0FBSyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsY0FBSyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsY0FBSyxPQUFMLEdBQWUsU0FBUyxhQUFULENBQXVCLFNBQXZCLENBQWY7QUFDQTtBQUNBLGNBQUssT0FBTCxDQUFhLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDLGFBQUk7QUFDdkMsa0JBQUssSUFBTCxDQUFVLFNBQVYsQ0FBb0IsR0FBcEIsQ0FBd0IsU0FBeEI7QUFDQSxnQkFBRyxNQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLE9BQWhCLEtBQTRCLE9BQS9CLEVBQXVDO0FBQ25DLHNCQUFLLGVBQUw7QUFDQSxzQkFBSyxJQUFMLENBQVUsU0FBVixDQUFvQixHQUFwQixDQUF3QixNQUF4QjtBQUNILGFBSEQsTUFHTztBQUNILHNCQUFLLFdBQUwsQ0FBaUIsTUFBSyxJQUF0QjtBQUNBO0FBQ0g7QUFDSixTQVREO0FBTlM7QUFnQlo7QUFDRDs7Ozs7MENBQ2lCO0FBQUE7O0FBQ2IsaUJBQUssSUFBTCxDQUFVLFNBQVYsQ0FBb0IsTUFBcEIsQ0FBMkIsTUFBM0I7QUFDQSx5Q0FBSSxLQUFLLFVBQVQsR0FBcUIsR0FBckIsQ0FBeUIsY0FBTTtBQUMzQix1QkFBSyxTQUFMLEdBQWlCLEdBQUcsWUFBSCxDQUFnQixPQUFoQixDQUFqQjtBQUNBLG9CQUFJLFFBQVEsU0FBUyxhQUFULENBQXVCLElBQXZCLENBQVo7QUFDQSxzQkFBTSxTQUFOLENBQWdCLEdBQWhCLENBQW9CLGFBQXBCO0FBQ0EsdUJBQUssSUFBTCxDQUFVLFdBQVYsQ0FBc0IsS0FBdEI7QUFDQSxzQkFBTSxTQUFOLEdBQWtCLE9BQUssU0FBdkI7QUFDQSx1QkFBTyxXQUFQLENBQW1CLE9BQUssSUFBeEI7O0FBRUEsdUJBQUssU0FBTCxDQUFlLElBQWYsQ0FBb0IsS0FBcEI7QUFDQSx1QkFBSyx3QkFBTCxDQUE4QixPQUFLLFNBQW5DO0FBRUgsYUFYRDtBQVlIO0FBQ0Q7Ozs7aURBQ3lCLFMsRUFBVTtBQUFBOztBQUMvQix5Q0FBSSxTQUFKLEdBQWUsT0FBZixDQUF1QixlQUFNO0FBQ3pCLG9CQUFJLGdCQUFKLENBQXFCLE9BQXJCLEVBQTZCLFVBQUMsQ0FBRCxFQUFNO0FBQy9CLDJCQUFLLFFBQUwsR0FBZ0IsRUFBRSxNQUFGLENBQVMsU0FBekI7QUFDQSwyQkFBSyxLQUFMLENBQVcsS0FBWCxHQUFtQixPQUFLLFFBQXhCO0FBQ0gsaUJBSEQ7QUFJSCxhQUxEO0FBTUg7Ozs7OztRQUdJLFEsR0FBQSxROzs7OztBQzlDVDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQyxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFVOztBQUVyRCxNQUFNLE1BQU0sd0JBQVo7QUFDQSxNQUFJLGlCQUFKO0FBQ0EsTUFBSSxtQkFBSjtBQUNBLE1BQUksZUFBSjtBQUNBLE1BQUksVUFBSjs7QUFHQSxNQUFNLFNBQVMsY0FBZjtBQUNBLFNBQU8sUUFBUDtBQUNBLFNBQU8sZUFBUDtBQUNBLFNBQU8sYUFBUDs7QUFJQSxNQUFNLFVBQVUsd0JBQWhCOztBQUdBLE1BQU0sU0FBUyxpQkFBZjtBQUNBLE1BQU0sV0FBVyx3QkFBakI7QUFDQSxXQUFTLFdBQVQ7QUFJSCxDQXpCQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBmaXJlYmFzZSBpbnRlcmFjdGl2ZS1tYXBcblxuY2xhc3MgRmlyZUJhc2Uge1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgICAgICAgYXBpS2V5OiBcIkFJemFTeUFkV0tncnF1aXRWUFlWWmFpZVYyWlpGSktDOTVJZWw5OFwiLFxuICAgICAgICAgICAgYXV0aERvbWFpbjogXCJpbnRlcmFjdGl2ZS1tYXAtZjUwNjAuZmlyZWJhc2VhcHAuY29tXCIsXG4gICAgICAgICAgICBkYXRhYmFzZVVSTDogXCJodHRwczovL2ludGVyYWN0aXZlLW1hcC1mNTA2MC5maXJlYmFzZWlvLmNvbVwiLFxuICAgICAgICAgICAgcHJvamVjdElkOiBcImludGVyYWN0aXZlLW1hcC1mNTA2MFwiLFxuICAgICAgICAgICAgc3RvcmFnZUJ1Y2tldDogXCJpbnRlcmFjdGl2ZS1tYXAtZjUwNjAuYXBwc3BvdC5jb21cIixcbiAgICAgICAgICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjU5NTg2MTY1MDYzMFwiXG4gICAgICAgICAgfTtcbiAgICAgICAgdGhpcy5maXJlYmFzZSA9IGZpcmViYXNlLmluaXRpYWxpemVBcHAodGhpcy5jb25maWcpO1xuICAgICAgICB0aGlzLmRhdGFiYXNlID0gdGhpcy5maXJlYmFzZS5kYXRhYmFzZSgpO1xuXG4gICAgICAgIC8vZWxlbWVudHkgZG8gbG9nb3dhbmlhXG4gICAgICAgIHRoaXMubG9nSW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ0luXCIpO1xuICAgICAgICB0aGlzLnNpZ25JbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lnbkluXCIpO1xuICAgICAgICB0aGlzLmxvZ091dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nT3V0XCIpO1xuICAgICAgICB0aGlzLmJ0blNlbmRTaWduID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZW5kU2lnbkluXCIpO1xuICAgICAgICB0aGlzLmJ0blNlbmRMb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbmRMb2dJblwiKTtcbiAgICAgICAgdGhpcy5mb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWduSW5Gb3JtXCIpO1xuICAgICAgICB0aGlzLmFycmF5ID0gW107XG5cbiAgICAgICAgICBcbiAgICAgICAgLy9wb2theiBmb3JtdWxhcnogZG8gbG9nb3dhbmlhXG4gICAgICAgIHRoaXMubG9nSW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT57XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9nSW5Gb3JtJykuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgXG4gICAgICAgIH0pO1xuICAgICAgICAvLyB0aGlzLmxvZ091dC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcblxuXG4gICAgICAgIC8vd3lsb2dvd2FuaWUgc2llIHV6eXRrb3duaWthXG4gICAgICAgIHRoaXMubG9nT3V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmlyZWJhc2UuYXV0aCgpLnNpZ25PdXQoKVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vcG9rYXogZm9ybXVsYXJ6IGRvIHJlamVzdHJhY2ppXG4gICAgICAgIHRoaXMuc2lnbkluLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmZvcm0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblxuICAgICAgICB9KTtcblxuICAgICAgICAvL3phbG9nb3dhbmllIHV6eXRrb3duaWthXG4gICAgICAgIHRoaXMuYnRuU2VuZExvZy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBwYXNzdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFzc3dvcmRcIikudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW1haWxcIikudmFsdWVcbiAgICAgICAgICAgIGNvbnN0IGF1dGggPSB0aGlzLmZpcmViYXNlLmF1dGgoKTtcbiAgICBcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBhdXRoLnNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKGVtYWlsLCBwYXNzdyk7XG4gICAgICAgICAgICBwcm9taXNlLmNhdGNoKGUgPT4gY29uc29sZS5sb2coZS5tZXNzYWdlKSk7XG5cbiAgICAgICAgfSlcblxuICAgICAgICAvL3JlamVzdHJhY2phIG5vd2VnbyB1enl0a293bmlrYVxuICAgICAgICB0aGlzLmJ0blNlbmRTaWduLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHBhc3N3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzd29yZFwiKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbWFpbFwiKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGF1dGggPSB0aGlzLmZpcmViYXNlLmF1dGgoKTtcbiAgICBcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBhdXRoLmNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzc3cpO1xuICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChlID0+IGNvbnNvbGUubG9nKGUubWVzc2FnZSkpO1xuXG5cbiAgICAgICAgICAgIGlmKHRoaXMuZm9ybS5zdHlsZS5kaXNwbGF5ICE9PSBcIm5vbmVcIil7XG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgfSlcbiAgICB9XG5cblxuICAgIG5ld1VzZXJTaWduKCl7XG4gICAgICAgIHRoaXMuZmlyZWJhc2UuYXV0aCgpLm9uQXV0aFN0YXRlQ2hhbmdlZCggdXNlciA9PntcbiAgICAgICAgICAgIGlmKHVzZXIpeyAgIFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXIgKyBcImxvZ2dlZCBpblwiICsgdGhpcy5maXJlYmFzZS5hdXRoKCkuY3VycmVudFVzZXIudWlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ091dC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ25vdCBsb2dnZWQgaW4nKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ091dC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cblxufVxuXG5leHBvcnQge0ZpcmVCYXNlfTsiLCJpbXBvcnQgeyBNYXBTZXR1cCB9IGZyb20gXCIuL01hcFNldHVwXCI7XG5cbmNsYXNzIExpc3RzIGV4dGVuZHMgTWFwU2V0dXB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5saXN0U2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGlzdF9fYm94XCIpO1xuICAgICAgICB0aGlzLnZpc2l0ZWRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsaXN0VmlzaXRlZFwiKTtcbiAgICAgICAgdGhpcy53aXNoTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGlzdFdpc2hcIik7XG4gICAgICAgIHRoaXMudG9WaXNpdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkVG9WaXNpdFwiKTtcbiAgICAgICAgdGhpcy5hZGRWaXNpdGVkQnRuID0gdGhpcy50b1Zpc2l0QnRuLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgICAgIHRoaXMuYnRuTGlzdEV4aXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V4aXRMaXN0XCIpO1xuICAgICAgICB0aGlzLmJ0bkxpc3RFeGl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmhpZGVFbGVtZW50KHRoaXMubGlzdFNlY3Rpb24pKTtcblxuICAgICAgICB0aGlzLnRvVmlzaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uKHRoaXMubGlzdFNlY3Rpb24sICcxMjAlJyk7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEl0KHRoaXMubGlzdFNlY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5zd2ljaExpc3RJdGVtKHRoaXMud2lzaExpc3QpO1xuICAgICAgICAgICAgdGhpcy52aWV3Q291bnRyeShldmVudCwgdGhpcy5jb3VudHJ5TWFwLCB0aGlzLnNtYWxsTWFwLCB0aGlzLnRpdGxlLnZhbHVlLCB0aGlzLmF0dHJpYnV0ZSwgJ25vdFZpc2l0ZWQnKVxuICAgICAgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWRkVmlzaXRlZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuc2hvd1NlY3Rpb24odGhpcy5saXN0U2VjdGlvbiwgJzEyMCUnKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSXQodGhpcy5saXN0U2VjdGlvbik7XG4gICAgICAgICAgICB0aGlzLnN3aWNoTGlzdEl0ZW0odGhpcy52aXNpdGVkTGlzdCk7XG4gICAgICAgICAgICB0aGlzLnZpZXdDb3VudHJ5KGV2ZW50LCB0aGlzLmNvdW50cnlNYXAsIHRoaXMuc21hbGxNYXAsIHRoaXMudGl0bGUudmFsdWUsIHRoaXMuYXR0cmlidXRlLCAndmlzaXRlZCcpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgc3dpY2hMaXN0SXRlbShwYXJlbnQpe1xuICAgICAgICBsZXQgY291bnRyeSA9IHRoaXMubGlzdEVsWzBdLmlubmVyVGV4dDtcbiAgICAgICAgdGhpcy5hZGRJdGVtVG9MaXN0KHBhcmVudCwgY291bnRyeSwgJycgKTtcblxuICAgICAgICAvLyBzYXZlRGF0YVRvREIoY291bnRyeSk7XG4gICAgICAgICAgIFxuICAgIH1cblxuXG4vLyBkb2RhbmllIGRvIGxpc3R5IMW8eWN6ZcWEXG4gICAgXG4vLyAgICAgICAgICBmdW5jdGlvbiBzYXZlRGF0YVRvREIoaXRlbSwgdXNlcikge1xuLy8gICAgICAgICAgICAgYXJyYXkucHVzaChpdGVtKTtcbiAgICAgICAgXG4vLyAgICAgICAgICAgICBkYXRhYmFzZS5yZWYoJ2l0ZW0nKS5zZXQoe1xuLy8gICAgICAgICAgICAgICAgIGNvdW50cnk6IGFycmF5LFxuICAgIFxuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgIGRhdGFiYXNlLnJlZigndXNlcicpLnNldCh7XG4vLyAgICAgICAgICAgICAgICAgdXNlcjogZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZCxcbiAgICBcbi8vICAgICAgICAgICAgIH0pXG4vLyAgIH1cbiAgICAgICBcblxufVxuXG5leHBvcnQgeyBMaXN0cyB9IiwiaW1wb3J0IHsgTWFwU2V0dXAgfSBmcm9tIFwiLi9NYXBTZXR1cFwiO1xuXG4vL2R1xbxhIG1hcGEgaSBtYcWCYSBtYXBhXG5cbmNsYXNzIE1hcCBleHRlbmRzIE1hcFNldHVwIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNlY3Rpb25TZWMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlY29uZFNlY1wiKTsvLyBzZWtjamEgeiBsaXN0xIUgaW5mbyBudCBrcmFqw7N3XG4gICAgICAgIHRoaXMuc3Bhbkxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvdW50cnlJbmZvXCIpO1xuICAgICAgICB0aGlzLmxlZnRCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xlZnRCb3hcIik7XG4gICAgICAgIHRoaXMudGl0bGUuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGUgPT57IC8vIHd5xZt3aWV0bGVuaWUgaW5mb3JtYWNqaSBuYSBlbnRlclxuICAgICAgICAgICAgaWYoZS5rZXlDb2RlID09PSAxMyl7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Q291bnRyeShldmVudCwgdGhpcy5jb3VudHJ5TWFwLCB0aGlzLnNtYWxsTWFwLCB0aGlzLnRpdGxlLnZhbHVlLCB0aGlzLmF0dHJpYnV0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RXZWF0aGVyKClcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgICAgICAvL3d5xZt3aWV0bGVuaWUgaW5mcm9tYWNqaSBuYSBjbGlja1xuICAgICAgICB0aGlzLmJ0blNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpPT57XG4gICAgICAgICAgICB0aGlzLnZpZXdDb3VudHJ5KGV2ZW50LCB0aGlzLmNvdW50cnlNYXAsIHRoaXMuc21hbGxNYXAsIHRoaXMudGl0bGUudmFsdWUsIHRoaXMuYXR0cmlidXRlKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0V2VhdGhlcigpXG4gICAgICAgIH0pOyBcbiAgICAgIFxuICAgICAgICAvLyB3eWrFm2NpZSB6IHNla2NqaSBkcnVnaWVqIChsaXN0YSkgaSBwcnplxYJhZG93YW5pZSBzdHJvbnlcbiAgICAgICAgdGhpcy5leGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNleGl0QnRuXCIpO1xuICAgICAgICB0aGlzLmV4aXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaGlkZUVsZW1lbnQodGhpcy5zZWN0aW9uU2VjKTtcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgdGhpcy50dXJuT2ZmU2VhcmNoQnRuKCk7XG4gICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgIFxuICAgICAgICAvLyBwbyBrbGlrbmnEmWNpdSBuYSBrcmFqIG5hIG1hcGllIHd5xZt3aWV0bGVuaWUgc2VrY2ppIDIgeiBsaXN0xIVcbiAgICAgICAgWy4uLnRoaXMuY291bnRyeU1hcF0ubWFwKGNvdW50cnkgPT4ge1xuICAgICAgICAgICAgY291bnRyeS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGUgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlRWxlbWVudCh0aGlzLmxpc3QpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0Q291bnRyaWVzKHRoaXMuYXR0cmlidXRlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFdlYXRoZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uKHRoaXMuc2VjdGlvblNlYywnMjAlJyk7XG4gICAgICAgICAgICAgICAgdGhpcy52aWV3Q291bnRyeShldmVudCwgdGhpcy5jb3VudHJ5TWFwLCB0aGlzLnNtYWxsTWFwLCB0aGlzLnRpdGxlLnZhbHVlLCB0aGlzLmF0dHJpYnV0ZSk7XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMud2VhdGhlckRhdGEgPSBbXTtcbiAgICAgICAgdGhpcy53ZWF0aGVyTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2VhdGhlckxpc3RcIik7XG4gICAgICAgIHRoaXMuaGVhZGVyV2VhdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVXZWF0aGVyXCIpO1xuICAgICAgICB0aGlzLmVsZW1lbnRXZWF0aGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5lbFJpZ2h0TGlzdFwiKTtcbiAgICAgICAgdGhpcy50aW1lUGFyYWdyYXBoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aW1lXCIpO1xuICAgICAgICB0aGlzLmltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaWNvblwiKTtcbiAgICAgICAgdGhpcy5idG5XZWF0aGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYm94V2VhdGhlci5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZVwiKTtcbiAgICAgICAgICAgIGlmKCBlLnRhcmdldC5pbm5lclRleHQgPT09IFwiU2hvdyB3ZWF0aGVyXCIpe1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmlubmVyVGV4dCA9IFwiSGlkZSB3ZWF0aGVyXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmlubmVyVGV4dCA9IFwiU2hvdyB3ZWF0aGVyXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEl0KHRoaXMuYm94V2VhdGhlcik7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdENvdW50cmllcygpO1xuICAgICAgICAgICAgdGhpcy5zaG93V2VhdGhlcigpO1xuICAgICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLy8gcG9kxZt3aWV0bGVuaWUga3JhanUgbmEgbWFwaWVcbiAgICAgIC8vIHBvZMWbd2lldGxlbmllIG1hcHkgaSBwb2themFuaWUgdG9vbHRpcCB6IG5henfEhVxuICAgIGJsaW5rTWFwKCl7XG4gICAgICAgIFsuLi50aGlzLmNvdW50cnlNYXBdLmZvckVhY2goY291bnRyeSA9PiB7XG4gICAgICAgICAgICBjb3VudHJ5LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsKGUpID0+e1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlQ291bnRyeVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2xUaXAuaW5uZXJUZXh0ID0gY291bnRyeS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRpdGxlLnZhbHVlID0gY291bnRyeS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgICBcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2xUaXAuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2xUaXAuc3R5bGUudG9wID0gdGhpcy5tb3VzZVBvc2l0aW9uKHdpbmRvdy5ldmVudCkueSArIFwicHhcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2xUaXAuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoMCwxMDAlKVwiO1xuICAgICAgICAgICAgICAgIHRoaXMudG9vbFRpcC5zdHlsZS5sZWZ0ID0gdGhpcy5tb3VzZVBvc2l0aW9uKHdpbmRvdy5ldmVudCkueCArIFwicHhcIjtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb3VudHJ5LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsKGUpID0+e1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlQ291bnRyeVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2xUaXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSkgIFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vIGRvZGFuaWUgaW5mcm9tYWNqaSBvIGRhbnltIGtyYWp1XG4gICAgc2VsZWN0Q291bnRyaWVzKGF0dHIpe1xuICAgICAgICBzdXBlci5zZWxlY3RDb3VudHJpZXMoKTtcbiAgICAgICAgICAgIFsuLi50aGlzLmNvdW50cmllc0JveF0ubWFwKGNvdW50cnkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHtsYW5ndWFnZXMsIGN1cnJlbmNpZXN9ID0gY291bnRyeTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnRpdGxlLnZhbHVlID09PSBjb3VudHJ5Lm5hbWUgfHwgYXR0ciA9PT0gY291bnRyeS5uYW1lKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdEVsWzBdLmlubmVyVGV4dCA9IGBOYW1lIG9mIHRoZSBjb3VudHJ5OiAke2NvdW50cnkubmFtZX1gXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdEVsWzFdLmlubmVyVGV4dCA9IGBDYXBpdGFsOiAke2NvdW50cnkuY2FwaXRhbH1gO1xuXG4gICAgICAgICAgICAgICAgICAgIFsuLi5jdXJyZW5jaWVzXS5mb3JFYWNoKGN1cnJlbmN5PT57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RFbFsyXS5pbm5lclRleHQgPSBgQ3VycmVuY3k6ICR7Y3VycmVuY3kubmFtZX1gO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgXG4gICAgICAgICAgICAgICAgICAgIFsuLi5sYW5ndWFnZXNdLmZvckVhY2gobGFuZ3VhZ2UgPT57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RFbFszXS5pbm5lclRleHQgPSBgTGFuZ3VhZ2U6ICR7IGxhbmd1YWdlLm5hbWV9IGA7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdEVsWzRdLmlubmVyVGV4dCA9IGBQb3B1bGF0aW9uOiAke2NvdW50cnkucG9wdWxhdGlvbn0gYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxlZnRCb3guc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2NvdW50cnkuZmxhZ30pYDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZWZ0Qm94LmNsYXNzTGlzdC5hZGQoXCJsZWZ0Qm94QmFja2dyb3VuZFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgc2VsZWN0V2VhdGhlcigpe1xuICAgICAgICB0aGlzLmdldENhcGl0YWwoKTtcbiAgICAgICAgWy4uLnRoaXMuY291bnRyaWVzQm94XS5tYXAoY291bnRyeSA9PiB7XG4gICAgICAgICAgICBpZih0aGlzLnRpdGxlLnZhbHVlID09PSBjb3VudHJ5Lm5hbWUpe1xuICAgICAgICAgICAgICAgIGZldGNoKGBodHRwczovL2FwaS5hcGl4dS5jb20vdjEvY3VycmVudC5qc29uP2tleT0zOGQyNDk3ZmQzYjI0MmU3OGZiMTgyMzE0MTgxNjAxJnE9JHt0aGlzLmNhcGl0YWx9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53ZWF0aGVyRGF0YSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmYWlsJywgZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG5cbiAgICBzaG93V2VhdGhlcigpe1xuICAgICAgICB0aGlzLnNlbGVjdFdlYXRoZXIoKTtcbiAgICAgICAgW3RoaXMud2VhdGhlckRhdGFdLm1hcCggY291bnRyeSA9PntcbiAgICAgICAgICAgIGNvbnN0IHsgbG9jYXRpb24sIGN1cnJlbnQgfSA9IGNvdW50cnk7XG4gICAgICAgICAgICB0aGlzLmhlYWRlcldlYXRoZXIuaW5uZXJUZXh0ID0gYFdlYXRoZXIgaW4gJHtsb2NhdGlvbi5uYW1lfSBgICBcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFdlYXRoZXJbMF0uaW5uZXJUZXh0ID0gYEN1cnJlbnQgdGVtcGVyYXR1cmU6ICR7Y3VycmVudC50ZW1wX2N9YDtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFdlYXRoZXJbMV0uaW5uZXJUZXh0ID0gIGBGZWVsc2xpa2UgdGVtcGVyYXR1cmU6ICR7Y3VycmVudC5mZWVsc2xpa2VfY30gYDtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFdlYXRoZXJbMl0uaW5uZXJUZXh0ID0gIGBIdW1pZGl0eTogJHtjdXJyZW50Lmh1bWlkaXR5fSBgO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50V2VhdGhlclszXS5pbm5lclRleHQgPSAgYFByZXNzdXJlOiAke2N1cnJlbnQucHJlc3N1cmVfbWJ9IGA7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRXZWF0aGVyWzRdLmlubmVyVGV4dCA9ICBgV2luZCBrbS9oOiAke2N1cnJlbnQud2luZF9rcGh9IGA7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRXZWF0aGVyWzVdLmlubmVyVGV4dCA9ICBgIFdlYXRoZXIgY29uZGl0aW9uOiAkeyBjdXJyZW50LmNvbmRpdGlvbi50ZXh0fWA7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuaW1nLnNldEF0dHJpYnV0ZShcInNyY1wiLCBjdXJyZW50LmNvbmRpdGlvbi5pY29uKTtcbiAgICAgICAgICAgIHRoaXMudGltZVBhcmFncmFwaC5pbm5lclRleHQgPSBjdXJyZW50Lmxhc3RfdXBkYXRlZDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgbmV3VGltZSA9IGN1cnJlbnQubGFzdF91cGRhdGVkLnNsaWNlKDExLCAxNik7XG4gICAgICAgICAgICBpZihuZXdUaW1lWzBdID49IDIgfHwgbmV3VGltZVswXSA9PT0gJzAnICYmIG5ld1RpbWVbMV0gPD0gNSl7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWNvbmQtcGFnZV9fbGlzdC0tbW9vblwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgIHRoaXMuYm94V2VhdGhlci5jbGFzc0xpc3QuYWRkKFwibmlnaHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2Vjb25kLXBhZ2VfX2xpc3QtLXN1blwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgIHRoaXMuYm94V2VhdGhlci5jbGFzc0xpc3QuYWRkKFwiZGF5XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgLy8gc2Nob3dhbmllIHRhYmxpY3kgdGlwcywgd3nFm3dpZXRsZW5pZSBzZWtjamkgMiwgd3nFm3dpZXRsZW5pZSBpbmZvcm1hY2ppIG8ga3JhanUgaSBwb2TFm3dpZXRsZW5pZSBuYSBtYXBpZVxuICAgIHZpZXdDb3VudHJ5KGUsIGNvdW50cmllc0FycmF5T25lLCBjb3VudHJpZXNBcnJheVR3bywgaW5wdXQsIGNsaWNrZWRDb3VudHJ5KXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmhpZGVFbGVtZW50KHRoaXMubGlzdCk7XG4gICAgICAgIHRoaXMuc2VsZWN0Q291bnRyaWVzKCk7XG4gICAgICAgIHRoaXMuc2hvd1NlY3Rpb24odGhpcy5zZWN0aW9uU2VjLCcyMCUnKTtcbiAgICAgICAgc3VwZXIudmlld0NvdW50cnkoZXZlbnQsIHRoaXMuY291bnRyeU1hcCwgdGhpcy5zbWFsbE1hcCwgdGhpcy50aXRsZS52YWx1ZSwgdGhpcy5hdHRyaWJ1dGUpO1xuICAgICAgICBbLi4udGhpcy5jb3VudHJpZXNCb3hdLmZvckVhY2goY291bnRyeT0+e1xuICAgICAgICAgICAgaWYoIHRoaXMudGl0bGUudmFsdWUgPT09IGNvdW50cnkubmFtZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5jYXBpdGFsID0gY291bnRyeS5jYXBpdGFsO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0V2VhdGhlciggdGhpcy5jYXBpdGFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAvLyB1c3Rhd2llbmllIGd1emlrYSBzZWFyY2hcbiAgICAvLyB0dXJuT2ZmU2VhcmNoQnRuKCl7XG4gICAgLy8gICAgIGlmKHRoaXMuc2VjdGlvblNlYy5zdHlsZS5kaXNwbGF5ICE9PSBcIm5vbmVcIil7XG4gICAgLy8gICAgICAgICB0aGlzLmJ0blNlYXJjaC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcInRydWVcIik7XG4gICAgLy8gICAgIH0gZWxzZSB7XG4gICAgLy8gICAgICAgICB0aGlzLmJ0blNlYXJjaC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcImZhbHNlXCIpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG5cbn1cblxuZXhwb3J0IHsgTWFwIH07IiwiLy9vZ8OzbG5lIHVzdGF3aWVuaWEgc3Ryb255XG5jbGFzcyBNYXBTZXR1cCB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5jb3VudHJ5TWFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYXBcIikuY2hpbGRyZW47XG4gICAgICAgIHRoaXMuc21hbGxNYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21hcFNlY1wiKS5jaGlsZHJlbjtcbiAgICAgICAgdGhpcy5saXN0T2ZDb3VudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb3VudHJ5TGlzdFwiKTtcbiAgICAgICAgdGhpcy5saXN0RWwgPSB0aGlzLmxpc3RPZkNvdW50cnkuY2hpbGRyZW47XG4gICAgICAgIHRoaXMubGlzdFNwYW5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvdW50cnlJbmZvJyk7XG4gICAgICAgIHRoaXMudGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvdW50cnlOYW1lXCIpO1xuICAgICAgICB0aGlzLnRvb2xUaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rvb2xUaXBcIik7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNoZWFkZXJcIik7XG4gICAgICAgIHRoaXMuYnRuV2VhdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuQWRkXCIpO1xuICAgICAgICB0aGlzLmJveFdlYXRoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlYXRoZXJCb3hcIik7XG4gICAgICAgIHRoaXMuYnRuU2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG5cIik7XG4gICAgICAgIHRoaXMubGlzdCA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKFwidWxcIik7XG4gICAgICAgIHRoaXMuY291bnRyaWVzID0gW107XG4gICAgICAgIHRoaXMuc21hbGxDb3VudHJpZXMgPSBbXTtcbiAgICAgICAgdGhpcy5jb3VudHJpZXNCb3ggPSBbXTtcbiAgICAgICAgdGhpcy5hdHRyaWJ1dGUgPSBcIlwiO1xuICAgICAgICB0aGlzLmNhcGl0YWwgPSBcIlwiO1xuXG5cbiAgICB9XG5cbiAgICBjcmVhdGVBcnJheUJpZ01hcCgpe1xuICAgICAgICByZXR1cm4gWy4uLnRoaXMuY291bnRyeU1hcF0uZm9yRWFjaChjb3VudHJ5ID0+IHtcbiAgICAgICAgICAgIGlmKHR5cGVvZiBjb3VudHJ5ICE9PSAndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICAgICAgdGhpcy5jb3VudHJpZXMucHVzaCh7aWQ6IGNvdW50cnkuaWQsIHRpdGxlOiBjb3VudHJ5LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY291bnRyaWVzXG4gICAgICAgICAgICB9ICAgIFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNyZWF0ZUFycmF5U21hbGxNYXAoKXtcbiAgICAgICAgcmV0dXJuIFsuLi50aGlzLnNtYWxsTWFwXS5mb3JFYWNoKGNvdW50cnkgPT4ge1xuICAgICAgICAgICAgaWYodHlwZW9mIGNvdW50cnkgIT09ICd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNtYWxsQ291bnRyaWVzLnB1c2goe2lkOiBjb3VudHJ5LmlkLCB0aXRsZTogY291bnRyeS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKX0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNtYWxsQ291bnRyaWVzXG4gICAgICAgICAgICB9ICAgIFxuICAgICAgICB9KVxuICAgIH1cbiAgICAvLyB3c3DDs8WCcnrEmWRuZSBteXN6a2kgLT4gZG8gd3nFm3dpZXRsZW5pZSB0b29sdGlwXG4gICAgbW91c2VQb3NpdGlvbihlKXsgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIHJldHVybiB7IHg6IGUuY2xpZW50WCwgeTogZS5jbGllbnRZIH1cbiAgICB9IFxuICAgIFxuICAgIC8vIHBva2F6YW5pZSBkYW5laiBzZWtjamlcbiAgICBzaG93U2VjdGlvbihzZWN0aW9uLCBwb3NpdGlvblRvcCl7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUub3BhY2l0eSA9ICcxJztcbiAgICAgICAgc2VjdGlvbi5zdHlsZS50b3AgPSBwb3NpdGlvblRvcDtcbiAgICB9XG4gICAgLy9zY2hvd2FuaWUgZGFuZWogc2VrY2ppXG4gICAgaGlkZUVsZW1lbnQoZWxlbWVudCl7XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG5cbiAgICAvL3BvxYLEhWN6ZW5pZSB6IEFQaSBpIHBvcmJhbmllIGRhbnljaCB3c3p5c3RraWNoIGtyYWrDs3dcbiAgICBzZWxlY3RDb3VudHJpZXMoKXtcbiAgICAgICAgZmV0Y2goYGh0dHBzOi8vcmVzdGNvdW50cmllcy5ldS9yZXN0L3YyL2FsbGApXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgdGhpcy5jb3VudHJpZXNCb3ggPSBkYXRhO1xuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT57cmV0dXJuIGNvbnNvbGUubG9nKCdmYWlsJywgZXJyb3IpfSlcblxuICAgIH1cbiAgICBcbiAgICBnZXRDYXBpdGFsKCl7XG4gICAgICAgIHRoaXMuc2VsZWN0Q291bnRyaWVzKCk7XG4gICAgICAgIFsuLi50aGlzLmNvdW50cmllc0JveF0ubWFwKGNvdW50cnkgPT57XG4gICAgICAgICAgICBpZih0aGlzLnRpdGxlLnZhbHVlID09PSBjb3VudHJ5Lm5hbWUpe1xuICAgICAgICAgICAgICAgICB0aGlzLmNhcGl0YWwgPSBjb3VudHJ5LmNhcGl0YWxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cblxuXG4gICAgLy8gZnVua2NqYSB0d29yemVuaWUgZWxlbWVudHUgbGlzdHlcbiAgICBhZGRJdGVtVG9MaXN0KHBhcmVudCwgaXRlbSl7XG4gICAgICAgIGxldCBuZXdTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIG5ld1NwYW4uY2xhc3NMaXN0LmFkZChcImNvdW50cnlJbmZvXCIpO1xuICAgICAgICBuZXdTcGFuLmlubmVyVGV4dCA9IGl0ZW07XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChuZXdTcGFuKTtcbiAgICB9XG5cbiAgICAvLyB3c2themFuaWUgZGFuZWdvIGtyYWp1LCB3ecWbd2lldGxlbmllIHRhYmxpY3kgeiBpbmZvcm1hY2phbWksIGR1xbxhIG1hcGEgaSBtYcWCYSBtYXBhXG4gICAgdmlld0NvdW50cnkoZSwgY291bnRyaWVzQXJyYXlPbmUsIGNvdW50cmllc0FycmF5VHdvLCBpbnB1dCwgY2xpY2tlZENvdW50cnksIGNvdW50cnlDbGFzcyl7XG4gICAgICAgIFsuLi5jb3VudHJpZXNBcnJheU9uZV0uZm9yRWFjaChjb3VudHJ5ID0+IHtcbiAgICAgICAgICAgIGxldCB0aXRsZU9mQ291bnRyeSA9IGNvdW50cnkuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgICAgICAgICBpZih0aXRsZU9mQ291bnRyeSA9PT0gaW5wdXQgfHwgdGl0bGVPZkNvdW50cnkgPT09IGNsaWNrZWRDb3VudHJ5KXtcbiAgICAgICAgICAgICAgICBjb3VudHJ5LmNsYXNzTGlzdC50b2dnbGUoXCJ2aXNpYmxlQ291bnRyeVwiKTsgXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgWy4uLmNvdW50cmllc0FycmF5VHdvXS5mb3JFYWNoKGNvdW50cnkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB0aXRsZU9mQ291bnRyeSA9IGNvdW50cnkuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgICAgICAgICAgICAgaWYodGl0bGVPZkNvdW50cnkgPT09IGlucHV0IHx8IHRpdGxlT2ZDb3VudHJ5ID09PSBjbGlja2VkQ291bnRyeSl7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50cnkuY2xhc3NMaXN0LmFkZChjb3VudHJ5Q2xhc3MpOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICBcbiAgICB9XG5cbiAgICAvLyBzY3JvbGxvd2FuaWUgZG8gZGFuZWogc2VrY2ppXG4gICAgc2Nyb2xsSXQoZWxlbWVudCkge1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgJ2JlaGF2aW9yJzogJ3Ntb290aCcsXG4gICAgICAgICAgICAndG9wJzogZWxlbWVudC5vZmZzZXRUb3BcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbn1cblxuZXhwb3J0IHsgTWFwU2V0dXAgfTsiLCJpbXBvcnQgeyBNYXBTZXR1cCB9IGZyb20gXCIuL01hcFNldHVwXCI7XG5cbmNsYXNzIFRvb2xUaXBzIGV4dGVuZHMgTWFwU2V0dXB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50aXBzVGV4dCA9IFwiXCI7XG4gICAgICAgIHRoaXMuYXJyYXlPZkxpID0gW107XG4gICAgICAgIHRoaXMudGlwc0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGlwQnRuXCIpO1xuICAgICAgICAvLyBwbyBrbGlrbmnEmWNpdSBuYSBidG4gc2VyYWNoIHBva2F6YW5pZSBsaXN0eSB6IG5hendhbWkga3JhasOzd1xuICAgICAgICB0aGlzLnRpcHNCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT57XG4gICAgICAgICAgICB0aGlzLmxpc3QuY2xhc3NMaXN0LmFkZChcInZpc2libGVcIik7XG4gICAgICAgICAgICBpZih0aGlzLmxpc3Quc3R5bGUuZGlzcGxheSA9PT0gXCJibG9ja1wiKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVRhYmxlVGlwcygpO1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlRWxlbWVudCh0aGlzLmxpc3QpO1xuICAgICAgICAgICAgICAgIC8vIGUudGFyZ2V0LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBzdHdvcnplbmllIHRhYmxpY3kgeiBuYXp3YW1pIGtyYWrDs3dcbiAgICBjcmVhdGVUYWJsZVRpcHMoKXtcbiAgICAgICAgdGhpcy5saXN0LmNsYXNzTGlzdC5yZW1vdmUoXCJ0aXBzXCIpO1xuICAgICAgICBbLi4udGhpcy5jb3VudHJ5TWFwXS5tYXAoZWwgPT4ge1xuICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGUgPSBlbC5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKVxuICAgICAgICAgICAgbGV0IG5ld0xpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICAgICAgbmV3TGkuY2xhc3NMaXN0LmFkZChcInRpcHNFbGVtZW50XCIpO1xuICAgICAgICAgICAgdGhpcy5saXN0LmFwcGVuZENoaWxkKG5ld0xpKTtcbiAgICAgICAgICAgIG5ld0xpLmlubmVyVGV4dCA9IHRoaXMuYXR0cmlidXRlO1xuICAgICAgICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMubGlzdCk7IFxuXG4gICAgICAgICAgICB0aGlzLmFycmF5T2ZMaS5wdXNoKG5ld0xpKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0NvdW50cnlGcm9tVGFibGVUaXBzKHRoaXMuYXJyYXlPZkxpKVxuXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBwb2themFuaWUga3JhanUgd3licmFuZWdvIHogdGFibGljeSBUaXBzXG4gICAgc2hvd0NvdW50cnlGcm9tVGFibGVUaXBzKGFycmF5T2ZMaSl7XG4gICAgICAgIFsuLi5hcnJheU9mTGldLmZvckVhY2godGlwID0+e1xuICAgICAgICAgICAgdGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLChlKSA9PntcbiAgICAgICAgICAgICAgICB0aGlzLnRpcHNUZXh0ID0gZS50YXJnZXQuaW5uZXJUZXh0O1xuICAgICAgICAgICAgICAgIHRoaXMudGl0bGUudmFsdWUgPSB0aGlzLnRpcHNUZXh0O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBUb29sVGlwcyB9IiwiIFxuaW1wb3J0IHsgTWFwU2V0dXAgfSBmcm9tICcuL01hcFNldHVwLmpzJztcbmltcG9ydCB7IE1hcCB9IGZyb20gJy4vTWFwLmpzJztcbmltcG9ydCB7IFRvb2xUaXBzIH0gZnJvbSAnLi9Ub29sVGlwcyc7XG5pbXBvcnQgeyBMaXN0cyB9IGZyb20gJy4vTGlzdCdcbmltcG9ydCB7RmlyZUJhc2V9IGZyb20gJy4vRmlyZUJhc2UnXG5cblxuIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCl7XG5cbiAgICBjb25zdCBtYXAgPSBuZXcgTWFwU2V0dXAoKSA7XG4gICAgbWFwLmNyZWF0ZUFycmF5QmlnTWFwKCk7XG4gICAgbWFwLmNyZWF0ZUFycmF5U21hbGxNYXAoKVxuICAgIG1hcC5zZWxlY3RDb3VudHJpZXMoKTtcbiAgICBtYXAuZ2V0Q2FwaXRhbCgpO1xuXG5cbiAgICBjb25zdCBiaWdNYXAgPSBuZXcgTWFwKCk7XG4gICAgYmlnTWFwLmJsaW5rTWFwKCk7XG4gICAgYmlnTWFwLnNlbGVjdENvdW50cmllcygpXG4gICAgYmlnTWFwLnNlbGVjdFdlYXRoZXIoKTtcblxuXG5cbiAgICBjb25zdCB0b29sVGlwID0gbmV3IFRvb2xUaXBzKCk7XG5cblxuICAgIGNvbnN0IG15TGlzdCA9IG5ldyBMaXN0cygpO1xuICAgIGNvbnN0IGZpcmVCYXNlID0gbmV3IEZpcmVCYXNlKCk7XG4gICAgZmlyZUJhc2UubmV3VXNlclNpZ24oKTtcblxuXG4gXG59KSJdfQ==
