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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
        _this.iconCheck = '<i class="fas fa-check fa-2x"></i>';
        _this.btnListExit.addEventListener("click", function () {
            return _this.hideElement(_this.listSection);
        });

        _this.toVisitBtn.addEventListener("click", function () {
            _this.showSection(_this.listSection, '120%');
            _this.scrollIt(_this.listSection);
            _this.swichListItem(_this.wishList, _this.iconCheck);
            _this.viewCountry(event, _this.countryMap, _this.smallMap, _this.title.value, _this.attribute, 'notVisited');
            _this.changeList();
            _this.deleteItem();
        });

        _this.addVisitedBtn.addEventListener("click", function () {
            _this.showSection(_this.listSection, '120%');
            _this.scrollIt(_this.listSection);
            _this.swichListItem(_this.visitedList, " ");
            _this.viewCountry(event, _this.countryMap, _this.smallMap, _this.title.value, _this.attribute, 'visited');
            _this.deleteItem();
        });

        return _this;
    }

    _createClass(Lists, [{
        key: "swichListItem",
        value: function swichListItem(parent, icon) {
            var country = this.listEl[0].innerHTML;
            this.addItemToList(parent, country, icon);
            // saveDataToDB(country);  
        }
        // zmienić funkcję tak, żeby dodawała nowy element!

    }, {
        key: "changeList",
        value: function changeList() {
            var _this2 = this;

            var icons = this.listSection.querySelectorAll('li .fa-check');
            [].concat(_toConsumableArray(icons)).forEach(function (icon) {
                icon.addEventListener("click", function (e) {
                    var element = e.target.parentElement.innerText;
                    _this2.addItemToList(_this2.visitedList, element, " ");
                    e.target.parentElement.innerHTML = " ";
                });
            });
        }
    }, {
        key: "deleteItem",
        value: function deleteItem() {
            var deleteIcons = document.querySelectorAll("li .fa-times-circle");
            [].concat(_toConsumableArray(deleteIcons)).forEach(function (icon) {
                icon.addEventListener("click", function (e) {
                    console.log(e.target);
                    e.target.parentElement.innerHTML = " ";
                });
            });
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
        value: function addItemToList(parent, item, icon) {
            var newLi = document.createElement("li");
            newLi.classList.add("countryInfo");
            newLi.innerHTML = icon + '<i class="far fa-times-circle fa-2x"></i>' + item;
            parent.appendChild(newLi);
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

            this.list.classList.add("visible");
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
  myList.changeList();
  myList.deleteItem();
  console.log(myList);
  var fireBase = new _FireBase.FireBase();
  fireBase.newUserSign();
});

},{"./FireBase":1,"./List":2,"./Map.js":3,"./MapSetup.js":4,"./ToolTips":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9GaXJlQmFzZS5qcyIsInNyYy9zY3JpcHRzL0xpc3QuanMiLCJzcmMvc2NyaXB0cy9NYXAuanMiLCJzcmMvc2NyaXB0cy9NYXBTZXR1cC5qcyIsInNyYy9zY3JpcHRzL1Rvb2xUaXBzLmpzIiwic3JjL3NjcmlwdHMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBOztJQUVNLFE7QUFDRix3QkFBYTtBQUFBOztBQUFBOztBQUNULGFBQUssTUFBTCxHQUFjO0FBQ1Ysb0JBQVEseUNBREU7QUFFVix3QkFBWSx1Q0FGRjtBQUdWLHlCQUFhLDhDQUhIO0FBSVYsdUJBQVcsdUJBSkQ7QUFLViwyQkFBZSxtQ0FMTDtBQU1WLCtCQUFtQjtBQU5ULFNBQWQ7QUFRQSxhQUFLLFFBQUwsR0FBZ0IsU0FBUyxhQUFULENBQXVCLEtBQUssTUFBNUIsQ0FBaEI7QUFDQSxhQUFLLFFBQUwsR0FBZ0IsS0FBSyxRQUFMLENBQWMsUUFBZCxFQUFoQjs7QUFFQTtBQUNBLGFBQUssS0FBTCxHQUFhLFNBQVMsY0FBVCxDQUF3QixPQUF4QixDQUFiO0FBQ0EsYUFBSyxNQUFMLEdBQWMsU0FBUyxjQUFULENBQXdCLFFBQXhCLENBQWQ7QUFDQSxhQUFLLE1BQUwsR0FBYyxTQUFTLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBZDtBQUNBLGFBQUssV0FBTCxHQUFtQixTQUFTLGNBQVQsQ0FBd0IsWUFBeEIsQ0FBbkI7QUFDQSxhQUFLLFVBQUwsR0FBa0IsU0FBUyxjQUFULENBQXdCLFdBQXhCLENBQWxCO0FBQ0EsYUFBSyxJQUFMLEdBQVksU0FBUyxjQUFULENBQXdCLFlBQXhCLENBQVo7QUFDQSxhQUFLLEtBQUwsR0FBYSxFQUFiOztBQUdBO0FBQ0EsYUFBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBNEIsT0FBNUIsRUFBcUMsYUFBSTtBQUNyQyxxQkFBUyxjQUFULENB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QUFJSCxhQUxEO0FBTUg7Ozs7OztRQUdJLFEsR0FBQSxROzs7OztBQzdDVDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFHQyxTQUFTLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFVOztBQUVyRCxNQUFNLE1BQU0sd0JBQVo7QUFDQSxNQUFJLGlCQUFKO0FBQ0EsTUFBSSxtQkFBSjtBQUNBLE1BQUksZUFBSjtBQUNBLE1BQUksVUFBSjs7QUFHQSxNQUFNLFNBQVMsY0FBZjtBQUNBLFNBQU8sUUFBUDtBQUNBLFNBQU8sZUFBUDtBQUNBLFNBQU8sYUFBUDs7QUFJQSxNQUFNLFVBQVUsd0JBQWhCOztBQUdBLE1BQU0sU0FBUyxpQkFBZjtBQUNBLFNBQU8sVUFBUDtBQUNBLFNBQU8sVUFBUDtBQUNBLFVBQVEsR0FBUixDQUFZLE1BQVo7QUFDQSxNQUFNLFdBQVcsd0JBQWpCO0FBQ0EsV0FBUyxXQUFUO0FBSUgsQ0E1QkEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gZmlyZWJhc2UgaW50ZXJhY3RpdmUtbWFwXG5cbmNsYXNzIEZpcmVCYXNlIHtcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgICAgICAgIGFwaUtleTogXCJBSXphU3lBZFdLZ3JxdWl0VlBZVlphaWVWMlpaRkpLQzk1SWVsOThcIixcbiAgICAgICAgICAgIGF1dGhEb21haW46IFwiaW50ZXJhY3RpdmUtbWFwLWY1MDYwLmZpcmViYXNlYXBwLmNvbVwiLFxuICAgICAgICAgICAgZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly9pbnRlcmFjdGl2ZS1tYXAtZjUwNjAuZmlyZWJhc2Vpby5jb21cIixcbiAgICAgICAgICAgIHByb2plY3RJZDogXCJpbnRlcmFjdGl2ZS1tYXAtZjUwNjBcIixcbiAgICAgICAgICAgIHN0b3JhZ2VCdWNrZXQ6IFwiaW50ZXJhY3RpdmUtbWFwLWY1MDYwLmFwcHNwb3QuY29tXCIsXG4gICAgICAgICAgICBtZXNzYWdpbmdTZW5kZXJJZDogXCI1OTU4NjE2NTA2MzBcIlxuICAgICAgICAgIH07XG4gICAgICAgIHRoaXMuZmlyZWJhc2UgPSBmaXJlYmFzZS5pbml0aWFsaXplQXBwKHRoaXMuY29uZmlnKTtcbiAgICAgICAgdGhpcy5kYXRhYmFzZSA9IHRoaXMuZmlyZWJhc2UuZGF0YWJhc2UoKTtcblxuICAgICAgICAvL2VsZW1lbnR5IGRvIGxvZ293YW5pYVxuICAgICAgICB0aGlzLmxvZ0luID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dJblwiKTtcbiAgICAgICAgdGhpcy5zaWduSW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpZ25JblwiKTtcbiAgICAgICAgdGhpcy5sb2dPdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ091dFwiKTtcbiAgICAgICAgdGhpcy5idG5TZW5kU2lnbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VuZFNpZ25JblwiKTtcbiAgICAgICAgdGhpcy5idG5TZW5kTG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZW5kTG9nSW5cIik7XG4gICAgICAgIHRoaXMuZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lnbkluRm9ybVwiKTtcbiAgICAgICAgdGhpcy5hcnJheSA9IFtdO1xuXG4gICAgICAgICAgXG4gICAgICAgIC8vcG9rYXogZm9ybXVsYXJ6IGRvIGxvZ293YW5pYVxuICAgICAgICB0aGlzLmxvZ0luLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+e1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZ0luRm9ybScpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gdGhpcy5sb2dPdXQuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XG5cblxuICAgICAgICAvL3d5bG9nb3dhbmllIHNpZSB1enl0a293bmlrYVxuICAgICAgICB0aGlzLmxvZ091dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZpcmViYXNlLmF1dGgoKS5zaWduT3V0KClcbiAgICAgICAgfSlcblxuICAgICAgICAvL3Bva2F6IGZvcm11bGFyeiBkbyByZWplc3RyYWNqaVxuICAgICAgICB0aGlzLnNpZ25Jbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgIFxuICAgICAgICAgICAgdGhpcy5mb3JtLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy96YWxvZ293YW5pZSB1enl0a293bmlrYVxuICAgICAgICB0aGlzLmJ0blNlbmRMb2cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgcGFzc3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3N3b3JkXCIpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtYWlsXCIpLnZhbHVlXG4gICAgICAgICAgICBjb25zdCBhdXRoID0gdGhpcy5maXJlYmFzZS5hdXRoKCk7XG4gICAgXG4gICAgICAgICAgICBjb25zdCBwcm9taXNlID0gYXV0aC5zaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzc3cpO1xuICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChlID0+IGNvbnNvbGUubG9nKGUubWVzc2FnZSkpO1xuXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy9yZWplc3RyYWNqYSBub3dlZ28gdXp5dGtvd25pa2FcbiAgICAgICAgdGhpcy5idG5TZW5kU2lnbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBwYXNzdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFzc3dvcmRcIikudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW1haWxcIikudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBhdXRoID0gdGhpcy5maXJlYmFzZS5hdXRoKCk7XG4gICAgXG4gICAgICAgICAgICBjb25zdCBwcm9taXNlID0gYXV0aC5jcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWwsIHBhc3N3KTtcbiAgICAgICAgICAgIHByb21pc2UuY2F0Y2goZSA9PiBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpKTtcblxuXG4gICAgICAgICAgICBpZih0aGlzLmZvcm0uc3R5bGUuZGlzcGxheSAhPT0gXCJub25lXCIpe1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgIH0pXG4gICAgfVxuXG5cbiAgICBuZXdVc2VyU2lnbigpe1xuICAgICAgICB0aGlzLmZpcmViYXNlLmF1dGgoKS5vbkF1dGhTdGF0ZUNoYW5nZWQoIHVzZXIgPT57XG4gICAgICAgICAgICBpZih1c2VyKXsgICBcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1c2VyICsgXCJsb2dnZWQgaW5cIiArIHRoaXMuZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dPdXQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdub3QgbG9nZ2VkIGluJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dPdXQuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG5cbn1cblxuZXhwb3J0IHtGaXJlQmFzZX07IiwiaW1wb3J0IHsgTWFwU2V0dXAgfSBmcm9tIFwiLi9NYXBTZXR1cFwiO1xuXG5jbGFzcyBMaXN0cyBleHRlbmRzIE1hcFNldHVwe1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubGlzdFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxpc3RfX2JveFwiKTtcbiAgICAgICAgdGhpcy52aXNpdGVkTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGlzdFZpc2l0ZWRcIik7XG4gICAgICAgIHRoaXMud2lzaExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xpc3RXaXNoXCIpO1xuICAgICAgICB0aGlzLnRvVmlzaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZFRvVmlzaXRcIik7XG4gICAgICAgIHRoaXMuYWRkVmlzaXRlZEJ0biA9IHRoaXMudG9WaXNpdEJ0bi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICB0aGlzLmJ0bkxpc3RFeGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNleGl0TGlzdFwiKTtcbiAgICAgICAgdGhpcy5pY29uQ2hlY2sgPSAnPGkgY2xhc3M9XCJmYXMgZmEtY2hlY2sgZmEtMnhcIj48L2k+JztcbiAgICAgICAgdGhpcy5idG5MaXN0RXhpdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdGhpcy5oaWRlRWxlbWVudCh0aGlzLmxpc3RTZWN0aW9uKSk7XG5cbiAgICAgICAgdGhpcy50b1Zpc2l0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbih0aGlzLmxpc3RTZWN0aW9uLCAnMTIwJScpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxJdCh0aGlzLmxpc3RTZWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuc3dpY2hMaXN0SXRlbSh0aGlzLndpc2hMaXN0LCB0aGlzLmljb25DaGVjayk7XG4gICAgICAgICAgICB0aGlzLnZpZXdDb3VudHJ5KGV2ZW50LCB0aGlzLmNvdW50cnlNYXAsIHRoaXMuc21hbGxNYXAsIHRoaXMudGl0bGUudmFsdWUsIHRoaXMuYXR0cmlidXRlLCAnbm90VmlzaXRlZCcpO1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VMaXN0KCk7XG4gICAgICAgICAgICB0aGlzLmRlbGV0ZUl0ZW0oKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFkZFZpc2l0ZWRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLnNob3dTZWN0aW9uKHRoaXMubGlzdFNlY3Rpb24sICcxMjAlJyk7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEl0KHRoaXMubGlzdFNlY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5zd2ljaExpc3RJdGVtKHRoaXMudmlzaXRlZExpc3QsIFwiIFwiKTtcbiAgICAgICAgICAgIHRoaXMudmlld0NvdW50cnkoZXZlbnQsIHRoaXMuY291bnRyeU1hcCwgdGhpcy5zbWFsbE1hcCwgdGhpcy50aXRsZS52YWx1ZSwgdGhpcy5hdHRyaWJ1dGUsICd2aXNpdGVkJyk7XG4gICAgICAgICAgICB0aGlzLmRlbGV0ZUl0ZW0oKTtcbiAgICAgIFxuICAgICAgICB9KTtcblxuXG4gICAgfVxuXG4gICAgc3dpY2hMaXN0SXRlbShwYXJlbnQsIGljb24pe1xuICAgICAgICBsZXQgY291bnRyeSA9IHRoaXMubGlzdEVsWzBdLmlubmVySFRNTDtcbiAgICAgICAgdGhpcy5hZGRJdGVtVG9MaXN0KHBhcmVudCwgY291bnRyeSwgaWNvbik7XG4gICAgICAgIC8vIHNhdmVEYXRhVG9EQihjb3VudHJ5KTsgIFxuICAgIH1cbiAgICAvLyB6bWllbmnEhyBmdW5rY2rEmSB0YWssIMW8ZWJ5IGRvZGF3YcWCYSBub3d5IGVsZW1lbnQhXG4gICAgY2hhbmdlTGlzdCgpe1xuICAgICAgICBjb25zdCBpY29ucyA9IHRoaXMubGlzdFNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbCgnbGkgLmZhLWNoZWNrJyk7XG4gICAgICAgIFsuLi5pY29uc10uZm9yRWFjaCggaWNvbj0+e1xuICAgICAgICAgICAgaWNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpPT57XG4gICAgICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEl0ZW1Ub0xpc3QodGhpcy52aXNpdGVkTGlzdCwgZWxlbWVudCxcIiBcIilcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmlubmVySFRNTCA9IFwiIFwiO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBkZWxldGVJdGVtKCl7XG4gICAgICAgIGNvbnN0IGRlbGV0ZUljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcImxpIC5mYS10aW1lcy1jaXJjbGVcIik7XG4gICAgICAgIFsuLi5kZWxldGVJY29uc10uZm9yRWFjaChpY29uPT57XG4gICAgICAgICAgICBpY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSk9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlLnRhcmdldClcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmlubmVySFRNTCA9IFwiIFwiO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgIH1cblxuXG5cblxuLy8gZG9kYW5pZSBkbyBsaXN0eSDFvHljemXFhFxuICAgIFxuLy8gICAgICAgICAgZnVuY3Rpb24gc2F2ZURhdGFUb0RCKGl0ZW0sIHVzZXIpIHtcbi8vICAgICAgICAgICAgIGFycmF5LnB1c2goaXRlbSk7XG4gICAgICAgIFxuLy8gICAgICAgICAgICAgZGF0YWJhc2UucmVmKCdpdGVtJykuc2V0KHtcbi8vICAgICAgICAgICAgICAgICBjb3VudHJ5OiBhcnJheSxcbiAgICBcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICBkYXRhYmFzZS5yZWYoJ3VzZXInKS5zZXQoe1xuLy8gICAgICAgICAgICAgICAgIHVzZXI6IGZpcmViYXNlLmF1dGgoKS5jdXJyZW50VXNlci51aWQsXG4gICAgXG4vLyAgICAgICAgICAgICB9KVxuLy8gICB9XG4gICAgICAgXG5cbn1cblxuZXhwb3J0IHsgTGlzdHMgfSIsImltcG9ydCB7IE1hcFNldHVwIH0gZnJvbSBcIi4vTWFwU2V0dXBcIjtcblxuLy9kdcW8YSBtYXBhIGkgbWHFgmEgbWFwYVxuXG5jbGFzcyBNYXAgZXh0ZW5kcyBNYXBTZXR1cCB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zZWN0aW9uU2VjID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWNvbmRTZWNcIik7Ly8gc2VrY2phIHogbGlzdMSFIGluZm8gbnQga3JhasOzd1xuICAgICAgICB0aGlzLnNwYW5MaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb3VudHJ5SW5mb1wiKTtcbiAgICAgICAgdGhpcy5sZWZ0Qm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsZWZ0Qm94XCIpO1xuICAgICAgICB0aGlzLnRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBlID0+eyAvLyB3ecWbd2lldGxlbmllIGluZm9ybWFjamkgbmEgZW50ZXJcbiAgICAgICAgICAgIGlmKGUua2V5Q29kZSA9PT0gMTMpe1xuICAgICAgICAgICAgICAgIHRoaXMudmlld0NvdW50cnkoZXZlbnQsIHRoaXMuY291bnRyeU1hcCwgdGhpcy5zbWFsbE1hcCwgdGhpcy50aXRsZS52YWx1ZSwgdGhpcy5hdHRyaWJ1dGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0V2VhdGhlcigpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcbiAgICAgICAgLy93ecWbd2lldGxlbmllIGluZnJvbWFjamkgbmEgY2xpY2tcbiAgICAgICAgdGhpcy5idG5TZWFyY2guYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKT0+e1xuICAgICAgICAgICAgdGhpcy52aWV3Q291bnRyeShldmVudCwgdGhpcy5jb3VudHJ5TWFwLCB0aGlzLnNtYWxsTWFwLCB0aGlzLnRpdGxlLnZhbHVlLCB0aGlzLmF0dHJpYnV0ZSk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdFdlYXRoZXIoKVxuICAgICAgICB9KTsgXG4gICAgICBcbiAgICAgICAgLy8gd3lqxZtjaWUgeiBzZWtjamkgZHJ1Z2llaiAobGlzdGEpIGkgcHJ6ZcWCYWRvd2FuaWUgc3Ryb255XG4gICAgICAgIHRoaXMuZXhpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXhpdEJ0blwiKTtcbiAgICAgICAgdGhpcy5leGl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmhpZGVFbGVtZW50KHRoaXMuc2VjdGlvblNlYyk7XG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIHRoaXMudHVybk9mZlNlYXJjaEJ0bigpO1xuICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICBcbiAgICAgICAgLy8gcG8ga2xpa25pxJljaXUgbmEga3JhaiBuYSBtYXBpZSB3ecWbd2lldGxlbmllIHNla2NqaSAyIHogbGlzdMSFXG4gICAgICAgIFsuLi50aGlzLmNvdW50cnlNYXBdLm1hcChjb3VudHJ5ID0+IHtcbiAgICAgICAgICAgIGNvdW50cnkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0cmlidXRlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuaGlkZUVsZW1lbnQodGhpcy5saXN0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdENvdW50cmllcyh0aGlzLmF0dHJpYnV0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RXZWF0aGVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93U2VjdGlvbih0aGlzLnNlY3Rpb25TZWMsJzIwJScpO1xuICAgICAgICAgICAgICAgIHRoaXMudmlld0NvdW50cnkoZXZlbnQsIHRoaXMuY291bnRyeU1hcCwgdGhpcy5zbWFsbE1hcCwgdGhpcy50aXRsZS52YWx1ZSwgdGhpcy5hdHRyaWJ1dGUpO1xuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLndlYXRoZXJEYXRhID0gW107XG4gICAgICAgIHRoaXMud2VhdGhlckxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlYXRoZXJMaXN0XCIpO1xuICAgICAgICB0aGlzLmhlYWRlcldlYXRoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlV2VhdGhlclwiKTtcbiAgICAgICAgdGhpcy5lbGVtZW50V2VhdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZWxSaWdodExpc3RcIik7XG4gICAgICAgIHRoaXMudGltZVBhcmFncmFwaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGltZVwiKTtcbiAgICAgICAgdGhpcy5pbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmljb25cIik7XG4gICAgICAgIHRoaXMuYnRuV2VhdGhlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmJveFdlYXRoZXIuY2xhc3NMaXN0LnRvZ2dsZShcImhpZGVcIik7XG4gICAgICAgICAgICBpZiggZS50YXJnZXQuaW5uZXJUZXh0ID09PSBcIlNob3cgd2VhdGhlclwiKXtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5pbm5lclRleHQgPSBcIkhpZGUgd2VhdGhlclwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5pbm5lclRleHQgPSBcIlNob3cgd2VhdGhlclwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zY3JvbGxJdCh0aGlzLmJveFdlYXRoZXIpO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RDb3VudHJpZXMoKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd1dlYXRoZXIoKTtcbiAgICAgICAgICAgXG4gICAgICAgIFxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8vIHBvZMWbd2lldGxlbmllIGtyYWp1IG5hIG1hcGllXG4gICAgICAvLyBwb2TFm3dpZXRsZW5pZSBtYXB5IGkgcG9rYXphbmllIHRvb2x0aXAgeiBuYXp3xIVcbiAgICBibGlua01hcCgpe1xuICAgICAgICBbLi4udGhpcy5jb3VudHJ5TWFwXS5mb3JFYWNoKGNvdW50cnkgPT4ge1xuICAgICAgICAgICAgY291bnRyeS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLChlKSA9PntcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZUNvdW50cnlcIik7XG4gICAgICAgICAgICAgICAgdGhpcy50b29sVGlwLmlubmVyVGV4dCA9IGNvdW50cnkuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgICAgICAgICAgICAgdGhpcy50aXRsZS52YWx1ZSA9IGNvdW50cnkuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgXG4gICAgICAgICAgICAgICAgdGhpcy50b29sVGlwLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgdGhpcy50b29sVGlwLnN0eWxlLnRvcCA9IHRoaXMubW91c2VQb3NpdGlvbih3aW5kb3cuZXZlbnQpLnkgKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgdGhpcy50b29sVGlwLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlKDAsMTAwJSlcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnRvb2xUaXAuc3R5bGUubGVmdCA9IHRoaXMubW91c2VQb3NpdGlvbih3aW5kb3cuZXZlbnQpLnggKyBcInB4XCI7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY291bnRyeS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLChlKSA9PntcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZUNvdW50cnlcIik7XG4gICAgICAgICAgICAgICAgdGhpcy50b29sVGlwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pICBcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyBkb2RhbmllIGluZnJvbWFjamkgbyBkYW55bSBrcmFqdVxuICAgIHNlbGVjdENvdW50cmllcyhhdHRyKXtcbiAgICAgICAgc3VwZXIuc2VsZWN0Q291bnRyaWVzKCk7XG4gICAgICAgICAgICBbLi4udGhpcy5jb3VudHJpZXNCb3hdLm1hcChjb3VudHJ5ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB7bGFuZ3VhZ2VzLCBjdXJyZW5jaWVzfSA9IGNvdW50cnk7XG4gICAgICAgICAgICAgICAgaWYodGhpcy50aXRsZS52YWx1ZSA9PT0gY291bnRyeS5uYW1lIHx8IGF0dHIgPT09IGNvdW50cnkubmFtZSl7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RFbFswXS5pbm5lclRleHQgPSBgTmFtZSBvZiB0aGUgY291bnRyeTogJHtjb3VudHJ5Lm5hbWV9YFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RFbFsxXS5pbm5lclRleHQgPSBgQ2FwaXRhbDogJHtjb3VudHJ5LmNhcGl0YWx9YDtcblxuICAgICAgICAgICAgICAgICAgICBbLi4uY3VycmVuY2llc10uZm9yRWFjaChjdXJyZW5jeT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0RWxbMl0uaW5uZXJUZXh0ID0gYEN1cnJlbmN5OiAke2N1cnJlbmN5Lm5hbWV9YDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gIFxuICAgICAgICAgICAgICAgICAgICBbLi4ubGFuZ3VhZ2VzXS5mb3JFYWNoKGxhbmd1YWdlID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0RWxbM10uaW5uZXJUZXh0ID0gYExhbmd1YWdlOiAkeyBsYW5ndWFnZS5uYW1lfSBgO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RFbFs0XS5pbm5lclRleHQgPSBgUG9wdWxhdGlvbjogJHtjb3VudHJ5LnBvcHVsYXRpb259IGA7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZWZ0Qm94LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtjb3VudHJ5LmZsYWd9KWA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGVmdEJveC5jbGFzc0xpc3QuYWRkKFwibGVmdEJveEJhY2tncm91bmRcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgIH1cblxuICAgIHNlbGVjdFdlYXRoZXIoKXtcbiAgICAgICAgdGhpcy5nZXRDYXBpdGFsKCk7XG4gICAgICAgIFsuLi50aGlzLmNvdW50cmllc0JveF0ubWFwKGNvdW50cnkgPT4ge1xuICAgICAgICAgICAgaWYodGhpcy50aXRsZS52YWx1ZSA9PT0gY291bnRyeS5uYW1lKXtcbiAgICAgICAgICAgICAgICBmZXRjaChgaHR0cHM6Ly9hcGkuYXBpeHUuY29tL3YxL2N1cnJlbnQuanNvbj9rZXk9MzhkMjQ5N2ZkM2IyNDJlNzhmYjE4MjMxNDE4MTYwMSZxPSR7dGhpcy5jYXBpdGFsfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2VhdGhlckRhdGEgPSBkYXRhO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmFpbCcsIGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgc2hvd1dlYXRoZXIoKXtcbiAgICAgICAgdGhpcy5zZWxlY3RXZWF0aGVyKCk7XG4gICAgICAgIFt0aGlzLndlYXRoZXJEYXRhXS5tYXAoIGNvdW50cnkgPT57XG4gICAgICAgICAgICBjb25zdCB7IGxvY2F0aW9uLCBjdXJyZW50IH0gPSBjb3VudHJ5O1xuICAgICAgICAgICAgdGhpcy5oZWFkZXJXZWF0aGVyLmlubmVyVGV4dCA9IGBXZWF0aGVyIGluICR7bG9jYXRpb24ubmFtZX0gYCAgXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRXZWF0aGVyWzBdLmlubmVyVGV4dCA9IGBDdXJyZW50IHRlbXBlcmF0dXJlOiAke2N1cnJlbnQudGVtcF9jfWA7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRXZWF0aGVyWzFdLmlubmVyVGV4dCA9ICBgRmVlbHNsaWtlIHRlbXBlcmF0dXJlOiAke2N1cnJlbnQuZmVlbHNsaWtlX2N9IGA7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRXZWF0aGVyWzJdLmlubmVyVGV4dCA9ICBgSHVtaWRpdHk6ICR7Y3VycmVudC5odW1pZGl0eX0gYDtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudFdlYXRoZXJbM10uaW5uZXJUZXh0ID0gIGBQcmVzc3VyZTogJHtjdXJyZW50LnByZXNzdXJlX21ifSBgO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50V2VhdGhlcls0XS5pbm5lclRleHQgPSAgYFdpbmQga20vaDogJHtjdXJyZW50LndpbmRfa3BofSBgO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50V2VhdGhlcls1XS5pbm5lclRleHQgPSAgYCBXZWF0aGVyIGNvbmRpdGlvbjogJHsgY3VycmVudC5jb25kaXRpb24udGV4dH1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLmltZy5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgY3VycmVudC5jb25kaXRpb24uaWNvbik7XG4gICAgICAgICAgICB0aGlzLnRpbWVQYXJhZ3JhcGguaW5uZXJUZXh0ID0gY3VycmVudC5sYXN0X3VwZGF0ZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IG5ld1RpbWUgPSBjdXJyZW50Lmxhc3RfdXBkYXRlZC5zbGljZSgxMSwgMTYpO1xuICAgICAgICAgICAgaWYobmV3VGltZVswXSA+PSAyIHx8IG5ld1RpbWVbMF0gPT09ICcwJyAmJiBuZXdUaW1lWzFdIDw9IDUpe1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2Vjb25kLXBhZ2VfX2xpc3QtLW1vb25cIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmJveFdlYXRoZXIuY2xhc3NMaXN0LmFkZChcIm5pZ2h0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY29uZC1wYWdlX19saXN0LS1zdW5cIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmJveFdlYXRoZXIuY2xhc3NMaXN0LmFkZChcImRheVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIC8vIHNjaG93YW5pZSB0YWJsaWN5IHRpcHMsIHd5xZt3aWV0bGVuaWUgc2VrY2ppIDIsIHd5xZt3aWV0bGVuaWUgaW5mb3JtYWNqaSBvIGtyYWp1IGkgcG9kxZt3aWV0bGVuaWUgbmEgbWFwaWVcbiAgICB2aWV3Q291bnRyeShlLCBjb3VudHJpZXNBcnJheU9uZSwgY291bnRyaWVzQXJyYXlUd28sIGlucHV0LCBjbGlja2VkQ291bnRyeSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5oaWRlRWxlbWVudCh0aGlzLmxpc3QpO1xuICAgICAgICB0aGlzLnNlbGVjdENvdW50cmllcygpO1xuICAgICAgICB0aGlzLnNob3dTZWN0aW9uKHRoaXMuc2VjdGlvblNlYywnMjAlJyk7XG4gICAgICAgIHN1cGVyLnZpZXdDb3VudHJ5KGV2ZW50LCB0aGlzLmNvdW50cnlNYXAsIHRoaXMuc21hbGxNYXAsIHRoaXMudGl0bGUudmFsdWUsIHRoaXMuYXR0cmlidXRlKTtcbiAgICAgICAgWy4uLnRoaXMuY291bnRyaWVzQm94XS5mb3JFYWNoKGNvdW50cnk9PntcbiAgICAgICAgICAgIGlmKCB0aGlzLnRpdGxlLnZhbHVlID09PSBjb3VudHJ5Lm5hbWUpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2FwaXRhbCA9IGNvdW50cnkuY2FwaXRhbDtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdFdlYXRoZXIoIHRoaXMuY2FwaXRhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgLy8gdXN0YXdpZW5pZSBndXppa2Egc2VhcmNoXG4gICAgLy8gdHVybk9mZlNlYXJjaEJ0bigpe1xuICAgIC8vICAgICBpZih0aGlzLnNlY3Rpb25TZWMuc3R5bGUuZGlzcGxheSAhPT0gXCJub25lXCIpe1xuICAgIC8vICAgICAgICAgdGhpcy5idG5TZWFyY2guc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgIC8vICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgdGhpcy5idG5TZWFyY2guc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJmYWxzZVwiKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuXG59XG5cbmV4cG9ydCB7IE1hcCB9OyIsIi8vb2fDs2xuZSB1c3Rhd2llbmlhIHN0cm9ueVxuY2xhc3MgTWFwU2V0dXAge1xuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuY291bnRyeU1hcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFwXCIpLmNoaWxkcmVuO1xuICAgICAgICB0aGlzLnNtYWxsTWFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYXBTZWNcIikuY2hpbGRyZW47XG4gICAgICAgIHRoaXMubGlzdE9mQ291bnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY291bnRyeUxpc3RcIik7XG4gICAgICAgIHRoaXMubGlzdEVsID0gdGhpcy5saXN0T2ZDb3VudHJ5LmNoaWxkcmVuO1xuICAgICAgICB0aGlzLmxpc3RTcGFucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb3VudHJ5SW5mbycpO1xuICAgICAgICB0aGlzLnRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb3VudHJ5TmFtZVwiKTtcbiAgICAgICAgdGhpcy50b29sVGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0b29sVGlwXCIpO1xuICAgICAgICB0aGlzLmhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGVhZGVyXCIpO1xuICAgICAgICB0aGlzLmJ0bldlYXRoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bkFkZFwiKTtcbiAgICAgICAgdGhpcy5ib3hXZWF0aGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWF0aGVyQm94XCIpO1xuICAgICAgICB0aGlzLmJ0blNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYnRuXCIpO1xuICAgICAgICB0aGlzLmxpc3QgPSBoZWFkZXIucXVlcnlTZWxlY3RvcihcInVsXCIpO1xuICAgICAgICB0aGlzLmNvdW50cmllcyA9IFtdO1xuICAgICAgICB0aGlzLnNtYWxsQ291bnRyaWVzID0gW107XG4gICAgICAgIHRoaXMuY291bnRyaWVzQm94ID0gW107XG4gICAgICAgIHRoaXMuYXR0cmlidXRlID0gXCJcIjtcbiAgICAgICAgdGhpcy5jYXBpdGFsID0gXCJcIjtcblxuXG4gICAgfVxuXG4gICAgY3JlYXRlQXJyYXlCaWdNYXAoKXtcbiAgICAgICAgcmV0dXJuIFsuLi50aGlzLmNvdW50cnlNYXBdLmZvckVhY2goY291bnRyeSA9PiB7XG4gICAgICAgICAgICBpZih0eXBlb2YgY291bnRyeSAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgICAgIHRoaXMuY291bnRyaWVzLnB1c2goe2lkOiBjb3VudHJ5LmlkLCB0aXRsZTogY291bnRyeS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKX0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvdW50cmllc1xuICAgICAgICAgICAgfSAgICBcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjcmVhdGVBcnJheVNtYWxsTWFwKCl7XG4gICAgICAgIHJldHVybiBbLi4udGhpcy5zbWFsbE1hcF0uZm9yRWFjaChjb3VudHJ5ID0+IHtcbiAgICAgICAgICAgIGlmKHR5cGVvZiBjb3VudHJ5ICE9PSAndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICAgICAgdGhpcy5zbWFsbENvdW50cmllcy5wdXNoKHtpZDogY291bnRyeS5pZCwgdGl0bGU6IGNvdW50cnkuZ2V0QXR0cmlidXRlKFwidGl0bGVcIil9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zbWFsbENvdW50cmllc1xuICAgICAgICAgICAgfSAgICBcbiAgICAgICAgfSlcbiAgICB9XG4gICAgLy8gd3Nww7PFgnJ6xJlkbmUgbXlzemtpIC0+IGRvIHd5xZt3aWV0bGVuaWUgdG9vbHRpcFxuICAgIG1vdXNlUG9zaXRpb24oZSl7ICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICByZXR1cm4geyB4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WSB9XG4gICAgfSBcbiAgICBcbiAgICAvLyBwb2themFuaWUgZGFuZWogc2VrY2ppXG4gICAgc2hvd1NlY3Rpb24oc2VjdGlvbiwgcG9zaXRpb25Ub3Ape1xuICAgICAgICBzZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICBzZWN0aW9uLnN0eWxlLm9wYWNpdHkgPSAnMSc7XG4gICAgICAgIHNlY3Rpb24uc3R5bGUudG9wID0gcG9zaXRpb25Ub3A7XG4gICAgfVxuICAgIC8vc2Nob3dhbmllIGRhbmVqIHNla2NqaVxuICAgIGhpZGVFbGVtZW50KGVsZW1lbnQpe1xuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuXG4gICAgLy9wb8WCxIVjemVuaWUgeiBBUGkgaSBwb3JiYW5pZSBkYW55Y2ggd3N6eXN0a2ljaCBrcmFqw7N3XG4gICAgc2VsZWN0Q291bnRyaWVzKCl7XG4gICAgICAgIGZldGNoKGBodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9hbGxgKVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgIHRoaXMuY291bnRyaWVzQm94ID0gZGF0YTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+e3JldHVybiBjb25zb2xlLmxvZygnZmFpbCcsIGVycm9yKX0pXG5cbiAgICB9XG4gICAgXG4gICAgZ2V0Q2FwaXRhbCgpe1xuICAgICAgICB0aGlzLnNlbGVjdENvdW50cmllcygpO1xuICAgICAgICBbLi4udGhpcy5jb3VudHJpZXNCb3hdLm1hcChjb3VudHJ5ID0+e1xuICAgICAgICAgICAgaWYodGhpcy50aXRsZS52YWx1ZSA9PT0gY291bnRyeS5uYW1lKXtcbiAgICAgICAgICAgICAgICAgdGhpcy5jYXBpdGFsID0gY291bnRyeS5jYXBpdGFsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG5cblxuICAgIC8vIGZ1bmtjamEgdHdvcnplbmllIGVsZW1lbnR1IGxpc3R5XG4gICAgYWRkSXRlbVRvTGlzdChwYXJlbnQsIGl0ZW0sIGljb24pe1xuICAgICAgICBsZXQgbmV3TGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgIG5ld0xpLmNsYXNzTGlzdC5hZGQoXCJjb3VudHJ5SW5mb1wiKTtcbiAgICAgICAgbmV3TGkuaW5uZXJIVE1MID0gaWNvbiArICc8aSBjbGFzcz1cImZhciBmYS10aW1lcy1jaXJjbGUgZmEtMnhcIj48L2k+JyAraXRlbTtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKG5ld0xpKTtcbiAgICB9XG5cbiAgICAvLyB3c2themFuaWUgZGFuZWdvIGtyYWp1LCB3ecWbd2lldGxlbmllIHRhYmxpY3kgeiBpbmZvcm1hY2phbWksIGR1xbxhIG1hcGEgaSBtYcWCYSBtYXBhXG4gICAgdmlld0NvdW50cnkoZSwgY291bnRyaWVzQXJyYXlPbmUsIGNvdW50cmllc0FycmF5VHdvLCBpbnB1dCwgY2xpY2tlZENvdW50cnksIGNvdW50cnlDbGFzcyl7XG4gICAgICAgIFsuLi5jb3VudHJpZXNBcnJheU9uZV0uZm9yRWFjaChjb3VudHJ5ID0+IHtcbiAgICAgICAgICAgIGxldCB0aXRsZU9mQ291bnRyeSA9IGNvdW50cnkuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgICAgICAgICBpZih0aXRsZU9mQ291bnRyeSA9PT0gaW5wdXQgfHwgdGl0bGVPZkNvdW50cnkgPT09IGNsaWNrZWRDb3VudHJ5KXtcbiAgICAgICAgICAgICAgICBjb3VudHJ5LmNsYXNzTGlzdC50b2dnbGUoXCJ2aXNpYmxlQ291bnRyeVwiKTsgXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgWy4uLmNvdW50cmllc0FycmF5VHdvXS5mb3JFYWNoKGNvdW50cnkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB0aXRsZU9mQ291bnRyeSA9IGNvdW50cnkuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgICAgICAgICAgICAgaWYodGl0bGVPZkNvdW50cnkgPT09IGlucHV0IHx8IHRpdGxlT2ZDb3VudHJ5ID09PSBjbGlja2VkQ291bnRyeSl7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50cnkuY2xhc3NMaXN0LmFkZChjb3VudHJ5Q2xhc3MpOyBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICBcbiAgICB9XG5cbiAgICAvLyBzY3JvbGxvd2FuaWUgZG8gZGFuZWogc2VrY2ppXG4gICAgc2Nyb2xsSXQoZWxlbWVudCkge1xuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgJ2JlaGF2aW9yJzogJ3Ntb290aCcsXG4gICAgICAgICAgICAndG9wJzogZWxlbWVudC5vZmZzZXRUb3BcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbn1cblxuZXhwb3J0IHsgTWFwU2V0dXAgfTsiLCJpbXBvcnQgeyBNYXBTZXR1cCB9IGZyb20gXCIuL01hcFNldHVwXCI7XG5cbmNsYXNzIFRvb2xUaXBzIGV4dGVuZHMgTWFwU2V0dXB7XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50aXBzVGV4dCA9IFwiXCI7XG4gICAgICAgIHRoaXMuYXJyYXlPZkxpID0gW107XG4gICAgICAgIHRoaXMudGlwc0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGlwQnRuXCIpO1xuICAgICAgICAvLyBwbyBrbGlrbmnEmWNpdSBuYSBidG4gc2VyYWNoIHBva2F6YW5pZSBsaXN0eSB6IG5hendhbWkga3JhasOzd1xuICAgICAgICB0aGlzLnRpcHNCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT57XG4gICAgICAgICAgICBpZih0aGlzLmxpc3Quc3R5bGUuZGlzcGxheSA9PT0gXCJibG9ja1wiKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZVRhYmxlVGlwcygpO1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlRWxlbWVudCh0aGlzLmxpc3QpO1xuICAgICAgICAgICAgICAgIC8vIGUudGFyZ2V0LnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBzdHdvcnplbmllIHRhYmxpY3kgeiBuYXp3YW1pIGtyYWrDs3dcbiAgICBjcmVhdGVUYWJsZVRpcHMoKXtcbiAgICAgICAgdGhpcy5saXN0LmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpO1xuICAgICAgICBbLi4udGhpcy5jb3VudHJ5TWFwXS5tYXAoZWwgPT4ge1xuICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGUgPSBlbC5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKVxuICAgICAgICAgICAgbGV0IG5ld0xpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICAgICAgbmV3TGkuY2xhc3NMaXN0LmFkZChcInRpcHNFbGVtZW50XCIpO1xuICAgICAgICAgICAgdGhpcy5saXN0LmFwcGVuZENoaWxkKG5ld0xpKTtcbiAgICAgICAgICAgIG5ld0xpLmlubmVyVGV4dCA9IHRoaXMuYXR0cmlidXRlO1xuICAgICAgICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKHRoaXMubGlzdCk7IFxuXG4gICAgICAgICAgICB0aGlzLmFycmF5T2ZMaS5wdXNoKG5ld0xpKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0NvdW50cnlGcm9tVGFibGVUaXBzKHRoaXMuYXJyYXlPZkxpKVxuXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBwb2themFuaWUga3JhanUgd3licmFuZWdvIHogdGFibGljeSBUaXBzXG4gICAgc2hvd0NvdW50cnlGcm9tVGFibGVUaXBzKGFycmF5T2ZMaSl7XG4gICAgICAgIFsuLi5hcnJheU9mTGldLmZvckVhY2godGlwID0+e1xuICAgICAgICAgICAgdGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLChlKSA9PntcbiAgICAgICAgICAgICAgICB0aGlzLnRpcHNUZXh0ID0gZS50YXJnZXQuaW5uZXJUZXh0O1xuICAgICAgICAgICAgICAgIHRoaXMudGl0bGUudmFsdWUgPSB0aGlzLnRpcHNUZXh0O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBUb29sVGlwcyB9IiwiIFxuaW1wb3J0IHsgTWFwU2V0dXAgfSBmcm9tICcuL01hcFNldHVwLmpzJztcbmltcG9ydCB7IE1hcCB9IGZyb20gJy4vTWFwLmpzJztcbmltcG9ydCB7IFRvb2xUaXBzIH0gZnJvbSAnLi9Ub29sVGlwcyc7XG5pbXBvcnQgeyBMaXN0cyB9IGZyb20gJy4vTGlzdCdcbmltcG9ydCB7RmlyZUJhc2V9IGZyb20gJy4vRmlyZUJhc2UnXG5cblxuIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCl7XG5cbiAgICBjb25zdCBtYXAgPSBuZXcgTWFwU2V0dXAoKSA7XG4gICAgbWFwLmNyZWF0ZUFycmF5QmlnTWFwKCk7XG4gICAgbWFwLmNyZWF0ZUFycmF5U21hbGxNYXAoKVxuICAgIG1hcC5zZWxlY3RDb3VudHJpZXMoKTtcbiAgICBtYXAuZ2V0Q2FwaXRhbCgpO1xuXG5cbiAgICBjb25zdCBiaWdNYXAgPSBuZXcgTWFwKCk7XG4gICAgYmlnTWFwLmJsaW5rTWFwKCk7XG4gICAgYmlnTWFwLnNlbGVjdENvdW50cmllcygpXG4gICAgYmlnTWFwLnNlbGVjdFdlYXRoZXIoKTtcblxuXG5cbiAgICBjb25zdCB0b29sVGlwID0gbmV3IFRvb2xUaXBzKCk7XG5cblxuICAgIGNvbnN0IG15TGlzdCA9IG5ldyBMaXN0cygpO1xuICAgIG15TGlzdC5jaGFuZ2VMaXN0KCk7XG4gICAgbXlMaXN0LmRlbGV0ZUl0ZW0oKTtcbiAgICBjb25zb2xlLmxvZyhteUxpc3QpXG4gICAgY29uc3QgZmlyZUJhc2UgPSBuZXcgRmlyZUJhc2UoKTtcbiAgICBmaXJlQmFzZS5uZXdVc2VyU2lnbigpO1xuXG5cbiBcbn0pIl19
