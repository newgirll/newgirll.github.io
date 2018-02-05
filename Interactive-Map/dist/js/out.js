(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

document.addEventListener("DOMContentLoaded", function () {

    //firebase interactive-map
    var config = {
        apiKey: "AIzaSyAdWKgrquitVPYVZaieV2ZZFJKC95Iel98",
        authDomain: "interactive-map-f5060.firebaseapp.com",
        databaseURL: "https://interactive-map-f5060.firebaseio.com",
        projectId: "interactive-map-f5060",
        storageBucket: "interactive-map-f5060.appspot.com",
        messagingSenderId: "595861650630"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    //elementy do logowania
    var logIn = document.getElementById("logIn");
    var signIn = document.getElementById("signIn");
    var logOut = document.getElementById("logOut");
    var btnSendSign = document.getElementById("sendSignIn");
    var btnSendLog = document.getElementById("sendLogIn");
    var form = document.getElementById("signInForm");
    var array = [];

    //pokaz formularz do logowania

    // logOut.classList.add("hide");
    logIn.addEventListener("click", function (e) {
        document.getElementById('logInForm').style.display = "block";
    });

    //wylogowanie sie uzytkownika

    logOut.addEventListener("click", function (e) {
        firebase.auth().signOut();
    });
    //pokaz formularz do rejestracji
    signIn.addEventListener("click", function (e) {
        document.getElementById('signInForm').style.display = "block";
    });

    //zalogowanie uzytkownika

    btnSendLog.addEventListener("click", function (e) {
        e.preventDefault();
        var passw = document.getElementById("password").value;
        var email = document.getElementById("email").value;
        var auth = firebase.auth();

        var promise = auth.signInWithEmailAndPassword(email, passw);
        promise.catch(function (e) {
            return console.log(e.message);
        });
    });

    //rejestracja nowego uzytkownika
    btnSendSign.addEventListener("click", function (e) {
        e.preventDefault();
        var passw = document.getElementById("password").value;
        var email = document.getElementById("email").value;
        var auth = firebase.auth();

        var promise = auth.createUserWithEmailAndPassword(email, passw);
        promise.catch(function (e) {
            return console.log(e.message);
        });
    });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user + "logged in" + firebase.auth().currentUser.uid);
            logOut.classList.remove("hide");
        } else {
            console.log('not logged in');
            logOut.classList.add("hide");
        }
    });

    //zmienne
    var img = document.querySelector("#map");
    var countryMap = img.querySelectorAll("path");
    var imgSmall = document.querySelector("#mapSec");
    var smallMap = imgSmall.querySelectorAll("path");
    var title = document.querySelector("#countryName");
    var toolTip = document.querySelector("#toolTip");
    var header = document.querySelector("#header");

    var btn = document.querySelector("#btn");
    var tips = document.querySelector("#tipBtn");
    var listBtn = btn.previousElementSibling;

    var list = header.querySelector("ul");
    var sectionSec = document.querySelector("#secondSec");
    var apiKeyWet = 'f4779c85f173bc69a529ddd3ab6e9770';
    var apiKeyTime = 'ALQA70H88TB7';
    var exit = document.querySelector("#exitBtn");

    var boxWeather = document.querySelector("#weatherBox");
    // let countryInfo = document.querySelector("#countryList");
    var sun = document.querySelector("#sun");
    var moon = document.querySelector("#moon");
    var littleMoon = document.querySelector("#littleMoon");
    var location = null;
    var country = null;
    var dataCountry = null;

    var listSection = document.querySelector(".list__box");
    var visitedList = document.querySelector("#listVisited");
    var wishList = document.querySelector("#listWish");
    var visitBtn = document.querySelector("#addToVisit");
    var addVisitedBtn = visitBtn.previousElementSibling;

    // tablica obiektow kraje id i nazwy
    var countries = [];

    countryMap.forEach(function (country) {
        if (typeof country !== '') {
            countries.push({ id: country.id, title: country.getAttribute("title") });
            return countries;
        }
    });

    //small map - podswietlenie wybranego kraju
    var smallCountries = [];

    smallMap.forEach(function (country) {
        if (typeof country !== '') {
            smallCountries.push({ id: country.id, title: country.getAttribute("title") });

            return smallCountries;
        }
    });

    //pozycja kursora
    window.onmousemove = mousePosition;
    function mousePosition(e) {
        return { x: e.clientX, y: e.clientY };
    }

    //najechanie na mape i podswietlenie
    countryMap.forEach(function (country) {
        country.addEventListener("mouseenter", function () {
            this.classList.add("visibleCountry");
            toolTip.innerText = country.getAttribute("title");
            title.innerText = country.getAttribute("title");

            toolTip.style.display = "block";
            toolTip.style.top = mousePosition(window.event).y + "px";
            toolTip.style.transform = "translate(0,100%)";
            toolTip.style.left = mousePosition(window.event).x + "px";
        });

        country.addEventListener("mouseleave", function () {
            this.classList.remove("visibleCountry");
            toolTip.style.display = "none";
        });
    });

    //widocznosc sekcji

    function showSection(section, positionTop) {
        section.style.display = 'block';
        section.style.opacity = '1';
        section.style.top = positionTop;
    }

    //funkcja chowająca element 
    function hideElement(element) {
        element.style.display = 'none';
    }

    //pobranie inputa i podswietlenie mapy

    function viewCountry(event, name) {
        event.preventDefault();
        hideElement(list);
        showSection(sectionSec, '20%');
        connectToCountries(countries);
        countryMap.forEach(function (country) {
            var attr = country.getAttribute("title");
            if (attr === name.value) {
                country.classList.add("visibleCountry");
            }
        });
        smallMap.forEach(function (small) {
            var attr = small.getAttribute("title");
            if (attr === name.value) {
                small.classList.add("visibleCountry");
            }
        });
        // btn.setAttribute("disabled", "true");
    }

    // zdarzenie na btn search
    btn.addEventListener("click", function () {
        return viewCountry(event, title);
    });

    // zdarzenie na enter
    title.addEventListener("keyup", function (e) {
        if (e.keyCode === 13) {
            viewCountry(event, title);
        }
    });

    // dodawanie li do list info i weather
    function addItemToWeatherList(parent, item, text) {
        var li = document.createElement("li");
        li.innerText = text + item;
        li.classList.add("elRightList");
        parent.appendChild(li);
    }

    function addItemToList(parent, item, text, mapCountry) {
        var button = document.querySelector(".btnAdd");
        var newLi = document.createElement("li");
        newLi.classList.add("elInfo");
        newLi.innerText = text + item;
        parent.appendChild(newLi);

        // podlaczenie do api pogody i dodanie elementow do boxWeather
        function showWeather() {
            country.map(function (el) {
                if (el.name === item) {
                    fetch("http://api.apixu.com/v1/current.json?key=38d2497fd3b242e78fb182314181601&q=" + el.capital).then(function (res) {
                        return res.json();
                    }).then(function (data) {
                        console.log(data);
                        var location = data.location,
                            current = data.current;


                        var header = document.querySelector("#titleWeather");
                        header.innerText = "Weather in " + location.name + " ";
                        var weatherList = document.querySelector("#weatherList");

                        addItemToWeatherList(weatherList, current.temp_c, "Current temperature: ");
                        addItemToWeatherList(weatherList, current.feelslike_c, "Feelslike temperature:  ");
                        addItemToWeatherList(weatherList, current.humidity, "Humidity:  ");
                        addItemToWeatherList(weatherList, current.pressure_mb, "Pressure:  ");
                        addItemToWeatherList(weatherList, current.wind_kph, "Wind km/h:  ");
                        addItemToWeatherList(weatherList, current.condition.text, "Weather condition:  ");

                        var img = document.createElement("img");
                        img.setAttribute("src", current.condition.icon);
                        img.classList.add("icon");
                        boxWeather.appendChild(img);

                        var timeParagraph = document.createElement("p");
                        timeParagraph.innerText = current.last_updated;
                        timeParagraph.classList.add("time");
                        boxWeather.insertBefore(timeParagraph, sun);

                        var newTime = current.last_updated.slice(11, 16);
                        if (newTime[0] >= 2 || newTime[0] === '0' && newTime[1] <= 5) {
                            document.querySelector(".second-page__list--moon").style.display = "block";
                            boxWeather.classList.add("night");
                        } else {
                            document.querySelector(".second-page__list--sun").style.display = "block";
                            boxWeather.classList.add("day");
                        }
                    }).catch(function (error) {
                        console.log('fail', error);
                    });
                }
            });
        }
        // po kliknięciu pokazuje sie okno z pogodą
        button.addEventListener('click', function () {
            showWeather();
            boxWeather.style.display = "block";
            boxWeather.style.opacity = "1";
            button.innerText = "Hide weather";
            button.setAttribute("disabled", "true");
            scrollIt(boxWeather);
        });
    }

    // funkcja scroll to danej sekcji
    function scrollIt(element) {
        window.scrollTo({
            'behavior': 'smooth',
            'top': element.offsetTop
        });
    }

    //podlaczenie sie do api countries i pobranie danych + dolaczenie do listy

    function connectToCountries(countries) {
        fetch('https://restcountries.eu/rest/v2/all').then(function (res) {
            return res.json();
        }).then(function (data) {
            dataCountry = data;
            var arr = [];
            data.map(function (item) {
                arr.push(item);
                var name = item.name,
                    capital = item.capital,
                    currencies = item.currencies,
                    languages = item.languages,
                    population = item.population;


                location = capital;
                country = data;

                var currency = currencies.map(function (curr) {
                    return curr.name;
                });

                var language = languages.map(function (lang) {
                    return lang.name;
                });

                var listOfCountry = document.querySelector("#countryList");

                if (title.value === name) {
                    addItemToList(listOfCountry, name, 'Name of the country: ', countries);
                    addItemToList(listOfCountry, capital, 'Capital: ', countries);
                    addItemToList(listOfCountry, currency, 'Currency: ', countries);
                    addItemToList(listOfCountry, language, 'Language: ', countries);
                    addItemToList(listOfCountry, population, 'Population: ', countries);

                    var leftBox = document.querySelector("#leftBox");
                    leftBox.style.backgroundImage = "url(" + item.flag + ")";
                    leftBox.classList.add("leftBoxBackground");

                    return arr;
                }
            });
        }).catch(function (error) {
            console.log('fail', error);
        });
    }

    // btn tips wyswietla tablice z nazwami krajów i chowa
    function createTableTips() {
        list.classList.add("tips");
        var arrayOfLi = [];
        var tipsArray = countries.map(function (el) {
            var newLi = document.createElement("li");
            newLi.classList.add("tipsElement");
            list.appendChild(newLi);
            newLi.innerText = el.title;
            header.appendChild(list);

            arrayOfLi.push(newLi);
            return arrayOfLi;
        });

        arrayOfLi.forEach(function (el) {
            el.addEventListener("click", function () {
                var text = this.innerText;
                title.value = text;
            });
        });

        return tipsArray;
    }

    //po kliknięciu na btn pokazanie tablicy tips i wyłączenie guzika
    tips.addEventListener("click", function () {
        if (list.getAttribute("class") !== "tips") {
            createTableTips();
        } else {
            hideElement(list);
            tips.setAttribute("disabled", "true");
        }
    });

    //wyjście z drugiej sekcji

    exit.addEventListener("click", function () {
        return hideElement(sectionSec);
    });

    // przejście do sekcji -  lista i wyjście z sekcji


    // listBtn.addEventListener("click", function(){
    //     showSection(listSection, '120%');
    //     scrollIt(listSection);
    // });

    document.querySelector("#exitList").addEventListener("click", function () {
        return hideElement(listSection);
    });

    // dodanie do listy życzeń

    function saveDataToDB(item, user) {
        array.push(item);

        database.ref('item').set({
            country: array

        });
        database.ref('user').set({
            user: firebase.auth().currentUser.uid

        });
    }

    function swichListItem(parent) {

        var listEl = document.querySelectorAll(".elInfo");
        var country = listEl[0].innerText;
        addItemToList(parent, country, '');
        saveDataToDB(country);
    }

    visitBtn.addEventListener("click", function () {
        showSection(listSection, '120%');
        scrollIt(listSection);
        swichListItem(wishList);
        console.log(array);
    });

    addVisitedBtn.addEventListener("click", function () {
        showSection(listSection, '120%');
        scrollIt(listSection);
        swichListItem(visitedList);
    });
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVU7O0FBR2hEO0FBQ0EsUUFBTSxTQUFTO0FBQ1gsZ0JBQVEseUNBREc7QUFFWCxvQkFBWSx1Q0FGRDtBQUdYLHFCQUFhLDhDQUhGO0FBSVgsbUJBQVcsdUJBSkE7QUFLWCx1QkFBZSxtQ0FMSjtBQU1YLDJCQUFtQjtBQU5SLEtBQWY7QUFRQSxhQUFTLGFBQVQsQ0FBdUIsTUFBdkI7QUFDQSxRQUFNLFdBQVcsU0FBUyxRQUFULEVBQWpCOztBQUVBO0FBQ0EsUUFBTSxRQUFRLFNBQVMsY0FBVCxDQUF3QixPQUF4QixDQUFkO0FBQ0EsUUFBTSxTQUFTLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFmO0FBQ0EsUUFBTSxTQUFTLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFmO0FBQ0EsUUFBTSxjQUFjLFNBQVMsY0FBVCxDQUF3QixZQUF4QixDQUFwQjtBQUNBLFFBQU0sYUFBYSxTQUFTLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBbkI7QUFDQSxRQUFNLE9BQU8sU0FBUyxjQUFULENBQXdCLFlBQXhCLENBQWI7QUFDQSxRQUFNLFFBQVEsRUFBZDs7QUFFQTs7QUFFQTtBQUNBLFVBQU0sZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsYUFBSTtBQUNoQyxpQkFBUyxjQUFULENBQXdCLFdBQXhCLEVBQXFDLEtBQXJDLENBQTJDLE9BQTNDLEdBQXFELE9BQXJEO0FBRUgsS0FIRDs7QUFLQTs7QUFFQSxXQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLGFBQUs7QUFDbEMsaUJBQVMsSUFBVCxHQUFnQixPQUFoQjtBQUNILEtBRkQ7QUFHQTtBQUNBLFdBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsYUFBSztBQUNsQyxpQkFBUyxjQUFULENBQXdC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RUFBbUMsWUFBVTtBQUN6QyxvQkFBWSxXQUFaLEVBQXlCLE1BQXpCO0FBQ0EsaUJBQVMsV0FBVDtBQUNBLHNCQUFjLFFBQWQ7QUFDQSxnQkFBUSxHQUFSLENBQVksS0FBWjtBQUNILEtBTEQ7O0FBT0Esa0JBQWMsZ0JBQWQsQ0FBK0IsT0FBL0IsRUFBd0MsWUFBVTtBQUM5QyxvQkFBWSxXQUFaLEVBQXlCLE1BQXpCO0FBQ0EsaUJBQVMsV0FBVDtBQUNBLHNCQUFjLFdBQWQ7QUFDSCxLQUpEO0FBUUgsQ0FyY0wiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKXtcbiAgICBcbiAgICBcbiAgICAgICAgLy9maXJlYmFzZSBpbnRlcmFjdGl2ZS1tYXBcbiAgICAgICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICAgICAgYXBpS2V5OiBcIkFJemFTeUFkV0tncnF1aXRWUFlWWmFpZVYyWlpGSktDOTVJZWw5OFwiLFxuICAgICAgICAgICAgYXV0aERvbWFpbjogXCJpbnRlcmFjdGl2ZS1tYXAtZjUwNjAuZmlyZWJhc2VhcHAuY29tXCIsXG4gICAgICAgICAgICBkYXRhYmFzZVVSTDogXCJodHRwczovL2ludGVyYWN0aXZlLW1hcC1mNTA2MC5maXJlYmFzZWlvLmNvbVwiLFxuICAgICAgICAgICAgcHJvamVjdElkOiBcImludGVyYWN0aXZlLW1hcC1mNTA2MFwiLFxuICAgICAgICAgICAgc3RvcmFnZUJ1Y2tldDogXCJpbnRlcmFjdGl2ZS1tYXAtZjUwNjAuYXBwc3BvdC5jb21cIixcbiAgICAgICAgICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjU5NTg2MTY1MDYzMFwiXG4gICAgICAgICAgfTtcbiAgICAgICAgZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChjb25maWcpO1xuICAgICAgICBjb25zdCBkYXRhYmFzZSA9IGZpcmViYXNlLmRhdGFiYXNlKCk7XG4gICAgXG4gICAgICAgIC8vZWxlbWVudHkgZG8gbG9nb3dhbmlhXG4gICAgICAgIGNvbnN0IGxvZ0luID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dJblwiKTtcbiAgICAgICAgY29uc3Qgc2lnbkluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWduSW5cIik7XG4gICAgICAgIGNvbnN0IGxvZ091dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nT3V0XCIpO1xuICAgICAgICBjb25zdCBidG5TZW5kU2lnbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VuZFNpZ25JblwiKTtcbiAgICAgICAgY29uc3QgYnRuU2VuZExvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VuZExvZ0luXCIpO1xuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWduSW5Gb3JtXCIpO1xuICAgICAgICBjb25zdCBhcnJheSA9IFtdO1xuICAgICAgIFxuICAgICAgICAvL3Bva2F6IGZvcm11bGFyeiBkbyBsb2dvd2FuaWFcbiAgICAgIFxuICAgICAgICAvLyBsb2dPdXQuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XG4gICAgICAgIGxvZ0luLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+e1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZ0luRm9ybScpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgLy93eWxvZ293YW5pZSBzaWUgdXp5dGtvd25pa2FcbiAgICBcbiAgICAgICAgbG9nT3V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgIGZpcmViYXNlLmF1dGgoKS5zaWduT3V0KClcbiAgICAgICAgfSlcbiAgICAgICAgLy9wb2theiBmb3JtdWxhcnogZG8gcmVqZXN0cmFjamlcbiAgICAgICAgc2lnbkluLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduSW5Gb3JtJykuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvL3phbG9nb3dhbmllIHV6eXRrb3duaWthXG4gICAgICBcbiAgICAgICAgYnRuU2VuZExvZy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBwYXNzdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFzc3dvcmRcIikudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW1haWxcIikudmFsdWVcbiAgICAgICAgICAgIGNvbnN0IGF1dGggPSBmaXJlYmFzZS5hdXRoKCk7XG4gICAgXG4gICAgICAgICAgICBjb25zdCBwcm9taXNlID0gYXV0aC5zaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzc3cpO1xuICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChlID0+IGNvbnNvbGUubG9nKGUubWVzc2FnZSkpO1xuICAgIFxuICAgICBcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgLy9yZWplc3RyYWNqYSBub3dlZ28gdXp5dGtvd25pa2FcbiAgICAgICAgYnRuU2VuZFNpZ24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgcGFzc3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3N3b3JkXCIpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtYWlsXCIpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgYXV0aCA9IGZpcmViYXNlLmF1dGgoKTtcbiAgICBcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBhdXRoLmNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzc3cpO1xuICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChlID0+IGNvbnNvbGUubG9nKGUubWVzc2FnZSkpO1xuICAgIFxuICAgICAgICB9KVxuICAgIFxuICAgIFxuICAgICAgICBmaXJlYmFzZS5hdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKGZ1bmN0aW9uKHVzZXIpe1xuICAgICAgICAgICAgaWYodXNlcil7ICAgXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codXNlciArIFwibG9nZ2VkIGluXCIgKyBmaXJlYmFzZS5hdXRoKCkuY3VycmVudFVzZXIudWlkKTtcbiAgICAgICAgICAgICAgICBsb2dPdXQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdub3QgbG9nZ2VkIGluJyk7XG4gICAgICAgICAgICAgICAgbG9nT3V0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIFxuICAgICAgICAvL3ptaWVubmVcbiAgICAgICAgbGV0IGltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFwXCIpO1xuICAgICAgICBsZXQgY291bnRyeU1hcCA9IGltZy5xdWVyeVNlbGVjdG9yQWxsKFwicGF0aFwiKTtcbiAgICAgICAgbGV0IGltZ1NtYWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYXBTZWNcIik7XG4gICAgICAgIGxldCBzbWFsbE1hcCA9IGltZ1NtYWxsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJwYXRoXCIpO1xuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvdW50cnlOYW1lXCIpO1xuICAgICAgICBsZXQgdG9vbFRpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9vbFRpcFwiKTtcbiAgICAgICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGVhZGVyXCIpO1xuICAgIFxuICAgICAgICBsZXQgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG5cIik7XG4gICAgICAgIGxldCB0aXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aXBCdG5cIik7XG4gICAgICAgIGxldCBsaXN0QnRuID0gYnRuLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgXG4gICAgXG4gICAgICAgIGxldCBsaXN0ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKTtcbiAgICAgICAgbGV0IHNlY3Rpb25TZWMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlY29uZFNlY1wiKTtcbiAgICAgICAgbGV0IGFwaUtleVdldCA9ICdmNDc3OWM4NWYxNzNiYzY5YTUyOWRkZDNhYjZlOTc3MCc7XG4gICAgICAgIGxldCBhcGlLZXlUaW1lID0gJ0FMUUE3MEg4OFRCNyc7XG4gICAgICAgIGxldCBleGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNleGl0QnRuXCIpO1xuIFxuICAgICAgICBsZXQgYm94V2VhdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2VhdGhlckJveFwiKTtcbiAgICAgICAgLy8gbGV0IGNvdW50cnlJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb3VudHJ5TGlzdFwiKTtcbiAgICAgICAgbGV0IHN1biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3VuXCIpO1xuICAgICAgICBsZXQgbW9vbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9vblwiKTtcbiAgICAgICAgbGV0IGxpdHRsZU1vb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xpdHRsZU1vb25cIik7XG4gICAgICAgIGxldCBsb2NhdGlvbiA9IG51bGw7XG4gICAgICAgIGxldCBjb3VudHJ5ID0gbnVsbDtcbiAgICAgICAgbGV0IGRhdGFDb3VudHJ5ID0gbnVsbDtcbiAgICAgICBcbiAgICAgICAgbGV0IGxpc3RTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0X19ib3hcIik7XG4gICAgICAgIGxldCB2aXNpdGVkTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGlzdFZpc2l0ZWRcIik7XG4gICAgICAgIGxldCB3aXNoTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGlzdFdpc2hcIik7XG4gICAgICAgIGxldCB2aXNpdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkVG9WaXNpdFwiKTtcbiAgICAgICAgbGV0IGFkZFZpc2l0ZWRCdG4gPSB2aXNpdEJ0bi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgIFxuICAgIFxuXG4gICAgXG4gICAgICAgIC8vIHRhYmxpY2Egb2JpZWt0b3cga3JhamUgaWQgaSBuYXp3eVxuICAgICAgICBsZXQgY291bnRyaWVzID0gW11cbiAgICBcbiAgICAgICAgY291bnRyeU1hcC5mb3JFYWNoKGNvdW50cnkgPT4ge1xuICAgICAgICAgICAgaWYodHlwZW9mIGNvdW50cnkgIT09ICcnKXtcbiAgICAgICAgICAgICAgICBjb3VudHJpZXMucHVzaCh7aWQ6IGNvdW50cnkuaWQsIHRpdGxlOiBjb3VudHJ5LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvdW50cmllcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgLy9zbWFsbCBtYXAgLSBwb2Rzd2lldGxlbmllIHd5YnJhbmVnbyBrcmFqdVxuICAgICAgICBsZXQgc21hbGxDb3VudHJpZXMgPSBbXVxuICAgICAgICBcbiAgICAgICAgICAgIHNtYWxsTWFwLmZvckVhY2goY291bnRyeSA9PiB7XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIGNvdW50cnkgIT09ICcnKXtcbiAgICAgICAgICAgICAgICAgICAgc21hbGxDb3VudHJpZXMucHVzaCh7aWQ6IGNvdW50cnkuaWQsIHRpdGxlOiBjb3VudHJ5LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNtYWxsQ291bnRyaWVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgXG4gICAgICAgIC8vcG96eWNqYSBrdXJzb3JhXG4gICAgICAgIHdpbmRvdy5vbm1vdXNlbW92ZSA9IG1vdXNlUG9zaXRpb247XG4gICAgICAgIGZ1bmN0aW9uIG1vdXNlUG9zaXRpb24oZSl7XG4gICAgICAgICAgICByZXR1cm4geyB4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WSB9OyAgXG4gICAgICAgIH0gIFxuICAgIFxuICAgICAgICAvL25hamVjaGFuaWUgbmEgbWFwZSBpIHBvZHN3aWV0bGVuaWVcbiAgICAgICAgY291bnRyeU1hcC5mb3JFYWNoKGNvdW50cnkgPT4ge1xuICAgICAgICAgICAgY291bnRyeS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChcInZpc2libGVDb3VudHJ5XCIpO1xuICAgICAgICAgICAgICAgIHRvb2xUaXAuaW5uZXJUZXh0ID0gY291bnRyeS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgICAgICAgICAgICAgICB0aXRsZS5pbm5lclRleHQgPSBjb3VudHJ5LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICAgIFxuICAgICAgICAgICAgICAgIHRvb2xUaXAuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICB0b29sVGlwLnN0eWxlLnRvcCA9IG1vdXNlUG9zaXRpb24od2luZG93LmV2ZW50KS55ICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIHRvb2xUaXAuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoMCwxMDAlKVwiO1xuICAgICAgICAgICAgICAgIHRvb2xUaXAuc3R5bGUubGVmdCA9IG1vdXNlUG9zaXRpb24od2luZG93LmV2ZW50KS54ICsgXCJweFwiO1xuICAgICAgXG4gICAgICAgICAgICB9KVxuICAgIFxuICAgICAgICAgICAgY291bnRyeS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVDb3VudHJ5XCIpO1xuICAgICAgICAgICAgICAgIHRvb2xUaXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgICBcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgLy93aWRvY3pub3NjIHNla2NqaVxuICAgIFxuICAgICAgICBmdW5jdGlvbiBzaG93U2VjdGlvbihzZWN0aW9uLCBwb3NpdGlvblRvcCl7XG4gICAgICAgICAgICBzZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgc2VjdGlvbi5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICAgICAgc2VjdGlvbi5zdHlsZS50b3AgPSBwb3NpdGlvblRvcDtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICAvL2Z1bmtjamEgY2hvd2FqxIVjYSBlbGVtZW50IFxuICAgICAgICBmdW5jdGlvbiBoaWRlRWxlbWVudChlbGVtZW50KXtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICBcbiAgICAgICAgLy9wb2JyYW5pZSBpbnB1dGEgaSBwb2Rzd2lldGxlbmllIG1hcHlcbiAgICBcbiAgICAgICAgZnVuY3Rpb24gdmlld0NvdW50cnkoZXZlbnQsIG5hbWUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGhpZGVFbGVtZW50KGxpc3QpO1xuICAgICAgICAgICAgc2hvd1NlY3Rpb24oc2VjdGlvblNlYywgJzIwJScpO1xuICAgICAgICAgICAgY29ubmVjdFRvQ291bnRyaWVzKGNvdW50cmllcyk7XG4gICAgICAgICAgICBjb3VudHJ5TWFwLmZvckVhY2goY291bnRyeSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGF0dHIgPSBjb3VudHJ5LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICAgICAgICAgICAgICAgIGlmKGF0dHIgPT09IG5hbWUudmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICBjb3VudHJ5LmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlQ291bnRyeVwiKTsgXG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgc21hbGxNYXAuZm9yRWFjaChzbWFsbCA9PntcbiAgICAgICAgICAgICAgICBsZXQgYXR0ciA9IHNtYWxsLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICAgICAgICAgICAgICAgIGlmKGF0dHIgPT09IG5hbWUudmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICBzbWFsbC5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZUNvdW50cnlcIik7IFxuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyBidG4uc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIHpkYXJ6ZW5pZSBuYSBidG4gc2VhcmNoXG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdmlld0NvdW50cnkoZXZlbnQsIHRpdGxlKSk7XG5cbiAgICAgICAgLy8gemRhcnplbmllIG5hIGVudGVyXG4gICAgICAgIHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKGUua2V5Q29kZSA9PT0gMTMpe1xuICAgICAgICAgICAgICAgIHZpZXdDb3VudHJ5KGV2ZW50LCB0aXRsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICBcbiAgICAgICAgLy8gZG9kYXdhbmllIGxpIGRvIGxpc3QgaW5mbyBpIHdlYXRoZXJcbiAgICAgICAgZnVuY3Rpb24gYWRkSXRlbVRvV2VhdGhlckxpc3QocGFyZW50LCBpdGVtLCB0ZXh0KXtcbiAgICAgICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgICAgIGxpLmlubmVyVGV4dCA9IHRleHQgKyBpdGVtO1xuICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZChcImVsUmlnaHRMaXN0XCIpO1xuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGxpKTsgICBcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBmdW5jdGlvbiBhZGRJdGVtVG9MaXN0KCBwYXJlbnQsIGl0ZW0sIHRleHQsIG1hcENvdW50cnkgKXtcbiAgICAgICAgICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bkFkZFwiKTtcbiAgICAgICAgICAgIGxldCBuZXdMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgICAgIG5ld0xpLmNsYXNzTGlzdC5hZGQoXCJlbEluZm9cIik7XG4gICAgICAgICAgICBuZXdMaS5pbm5lclRleHQgPSB0ZXh0ICsgaXRlbTtcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChuZXdMaSk7XG4gICAgICAgIFxuICAgIFxuICAgICAgICAgICAgLy8gcG9kbGFjemVuaWUgZG8gYXBpIHBvZ29keSBpIGRvZGFuaWUgZWxlbWVudG93IGRvIGJveFdlYXRoZXJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNob3dXZWF0aGVyKCl7XG4gICAgICAgICAgICAgICAgY291bnRyeS5tYXAoZWwgPT4ge1xuICAgICAgICAgICAgICAgICAgIGlmKGVsLm5hbWUgPT09IGl0ZW0pe1xuICAgICAgICAgICAgICAgICAgICBmZXRjaChgaHR0cDovL2FwaS5hcGl4dS5jb20vdjEvY3VycmVudC5qc29uP2tleT0zOGQyNDk3ZmQzYjI0MmU3OGZiMTgyMzE0MTgxNjAxJnE9JHtlbC5jYXBpdGFsfWApXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbG9jYXRpb24sIGN1cnJlbnQgfSA9IGRhdGE7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlV2VhdGhlclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXIuaW5uZXJUZXh0ID0gYFdlYXRoZXIgaW4gJHtsb2NhdGlvbi5uYW1lfSBgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHdlYXRoZXJMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWF0aGVyTGlzdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkSXRlbVRvV2VhdGhlckxpc3Qod2VhdGhlckxpc3QsIGN1cnJlbnQudGVtcF9jLCBcIkN1cnJlbnQgdGVtcGVyYXR1cmU6IFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRJdGVtVG9XZWF0aGVyTGlzdCh3ZWF0aGVyTGlzdCwgY3VycmVudC5mZWVsc2xpa2VfYywgXCJGZWVsc2xpa2UgdGVtcGVyYXR1cmU6ICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkSXRlbVRvV2VhdGhlckxpc3Qod2VhdGhlckxpc3QsIGN1cnJlbnQuaHVtaWRpdHksIFwiSHVtaWRpdHk6ICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkSXRlbVRvV2VhdGhlckxpc3Qod2VhdGhlckxpc3QsIGN1cnJlbnQucHJlc3N1cmVfbWIsIFwiUHJlc3N1cmU6ICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkSXRlbVRvV2VhdGhlckxpc3Qod2VhdGhlckxpc3QsIGN1cnJlbnQud2luZF9rcGgsIFwiV2luZCBrbS9oOiAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEl0ZW1Ub1dlYXRoZXJMaXN0KHdlYXRoZXJMaXN0LCBjdXJyZW50LmNvbmRpdGlvbi50ZXh0LFwiV2VhdGhlciBjb25kaXRpb246ICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgY3VycmVudC5jb25kaXRpb24uaWNvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nLmNsYXNzTGlzdC5hZGQoXCJpY29uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveFdlYXRoZXIuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGltZVBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVQYXJhZ3JhcGguaW5uZXJUZXh0ID0gY3VycmVudC5sYXN0X3VwZGF0ZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZVBhcmFncmFwaC5jbGFzc0xpc3QuYWRkKFwidGltZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hXZWF0aGVyLmluc2VydEJlZm9yZSh0aW1lUGFyYWdyYXBoLCBzdW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdUaW1lID0gY3VycmVudC5sYXN0X3VwZGF0ZWQuc2xpY2UoMTEsIDE2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihuZXdUaW1lWzBdID49IDIgfHwgbmV3VGltZVswXSA9PT0gJzAnICYmIG5ld1RpbWVbMV0gPD0gNSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2Vjb25kLXBhZ2VfX2xpc3QtLW1vb25cIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94V2VhdGhlci5jbGFzc0xpc3QuYWRkKFwibmlnaHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2Vjb25kLXBhZ2VfX2xpc3QtLXN1blwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hXZWF0aGVyLmNsYXNzTGlzdC5hZGQoXCJkYXlcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmYWlsJywgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHBvIGtsaWtuacSZY2l1IHBva2F6dWplIHNpZSBva25vIHogcG9nb2TEhVxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNob3dXZWF0aGVyKCk7XG4gICAgICAgICAgICAgICAgYm94V2VhdGhlci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgIGJveFdlYXRoZXIuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5pbm5lclRleHQgPSBcIkhpZGUgd2VhdGhlclwiO1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcInRydWVcIik7XG4gICAgICAgICAgICAgICAgc2Nyb2xsSXQoYm94V2VhdGhlcilcbiAgICBcbiAgICAgICAgICAgIH0pO1xuICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZnVua2NqYSBzY3JvbGwgdG8gZGFuZWogc2VrY2ppXG4gICAgICAgIGZ1bmN0aW9uIHNjcm9sbEl0KGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICAgICAgICAgICAgJ2JlaGF2aW9yJzogJ3Ntb290aCcsXG4gICAgICAgICAgICAgICAgJ3RvcCc6IGVsZW1lbnQub2Zmc2V0VG9wXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIFxuICAgIFxuICAgICAgICAvL3BvZGxhY3plbmllIHNpZSBkbyBhcGkgY291bnRyaWVzIGkgcG9icmFuaWUgZGFueWNoICsgZG9sYWN6ZW5pZSBkbyBsaXN0eVxuICAgIFxuICAgICAgICBmdW5jdGlvbiBjb25uZWN0VG9Db3VudHJpZXMoY291bnRyaWVzKXtcbiAgICAgICAgICAgIGZldGNoKCdodHRwczovL3Jlc3Rjb3VudHJpZXMuZXUvcmVzdC92Mi9hbGwnKVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICBkYXRhQ291bnRyeSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgbGV0IGFyciA9IFtdO1xuICAgICAgICAgICAgICAgIGRhdGEubWFwKGl0ZW0gPT57XG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IG5hbWUsIGNhcGl0YWwsIGN1cnJlbmNpZXMsIGxhbmd1YWdlcywgcG9wdWxhdGlvbiB9ID0gaXRlbTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbiA9IGNhcGl0YWw7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50cnkgPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW5jeSA9IGN1cnJlbmNpZXMubWFwKGN1cnIgPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3Vyci5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgIFxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsYW5ndWFnZSA9IGxhbmd1YWdlcy5tYXAobGFuZyA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsYW5nLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGxldCBsaXN0T2ZDb3VudHJ5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb3VudHJ5TGlzdFwiKTtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYodGl0bGUudmFsdWUgPT09IG5hbWUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkSXRlbVRvTGlzdChsaXN0T2ZDb3VudHJ5LCBuYW1lLCAnTmFtZSBvZiB0aGUgY291bnRyeTogJywgY291bnRyaWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZEl0ZW1Ub0xpc3QobGlzdE9mQ291bnRyeSwgY2FwaXRhbCwgJ0NhcGl0YWw6ICcsIGNvdW50cmllcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRJdGVtVG9MaXN0KGxpc3RPZkNvdW50cnksIGN1cnJlbmN5LCAnQ3VycmVuY3k6ICcsIGNvdW50cmllcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRJdGVtVG9MaXN0KGxpc3RPZkNvdW50cnksIGxhbmd1YWdlLCAnTGFuZ3VhZ2U6ICcsIGNvdW50cmllcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRJdGVtVG9MaXN0KGxpc3RPZkNvdW50cnksIHBvcHVsYXRpb24sICdQb3B1bGF0aW9uOiAnLCBjb3VudHJpZXMpO1xuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxlZnRCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xlZnRCb3hcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0Qm94LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtpdGVtLmZsYWd9KWA7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0Qm94LmNsYXNzTGlzdC5hZGQoXCJsZWZ0Qm94QmFja2dyb3VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFycjsgXG4gICAgICAgICAgICAgICAgICAgIH0gIFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KSAgXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmFpbCcsIGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICBcbiAgICBcbiAgICBcbiAgICAgICAgLy8gYnRuIHRpcHMgd3lzd2lldGxhIHRhYmxpY2UgeiBuYXp3YW1pIGtyYWrDs3cgaSBjaG93YVxuICAgICAgICBmdW5jdGlvbiBjcmVhdGVUYWJsZVRpcHMoKXsgICAgIFxuICAgICAgICAgICAgbGlzdC5jbGFzc0xpc3QuYWRkKFwidGlwc1wiKTtcbiAgICAgICAgICAgIGxldCBhcnJheU9mTGkgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHRpcHNBcnJheSA9IGNvdW50cmllcy5tYXAoZWwgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBuZXdMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgICAgICAgICBuZXdMaS5jbGFzc0xpc3QuYWRkKFwidGlwc0VsZW1lbnRcIik7XG4gICAgICAgICAgICAgICAgbGlzdC5hcHBlbmRDaGlsZChuZXdMaSk7XG4gICAgICAgICAgICAgICAgbmV3TGkuaW5uZXJUZXh0ID0gZWwudGl0bGU7XG4gICAgICAgICAgICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKGxpc3QpOyBcbiAgICBcbiAgICAgICAgICAgICAgICBhcnJheU9mTGkucHVzaChuZXdMaSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFycmF5T2ZMaTtcbiAgICAgICAgICAgIH0pXG4gICAgXG4gICAgICAgICAgICBhcnJheU9mTGkuZm9yRWFjaChlbCA9PntcbiAgICAgICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBsZXQgdGV4dCA9IHRoaXMuaW5uZXJUZXh0O1xuICAgICAgICAgICAgICAgICAgICB0aXRsZS52YWx1ZSA9IHRleHQ7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgXG4gICAgICAgICAgICByZXR1cm4gdGlwc0FycmF5O1xuICAgICAgIFxuICAgICAgICB9XG5cbiAgICAgICAgLy9wbyBrbGlrbmnEmWNpdSBuYSBidG4gcG9rYXphbmllIHRhYmxpY3kgdGlwcyBpIHd5xYLEhWN6ZW5pZSBndXppa2FcbiAgICAgICAgdGlwcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYobGlzdC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSAhPT0gXCJ0aXBzXCIpe1xuICAgICAgICAgICAgICAgIGNyZWF0ZVRhYmxlVGlwcygpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhpZGVFbGVtZW50KGxpc3QpO1xuICAgICAgICAgICAgICAgIHRpcHMuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICAgICAgICBcblxuICAgICAgICAvL3d5asWbY2llIHogZHJ1Z2llaiBzZWtjamlcbiAgICBcbiAgICAgICAgZXhpdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gaGlkZUVsZW1lbnQoc2VjdGlvblNlYykpO1xuICAgIFxuICAgIFxuICAgIFxuICAgICAgICAvLyBwcnplasWbY2llIGRvIHNla2NqaSAtICBsaXN0YSBpIHd5asWbY2llIHogc2VrY2ppXG4gICAgXG4gICAgXG4gICAgICAgIC8vIGxpc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vICAgICBzaG93U2VjdGlvbihsaXN0U2VjdGlvbiwgJzEyMCUnKTtcbiAgICAgICAgLy8gICAgIHNjcm9sbEl0KGxpc3RTZWN0aW9uKTtcbiAgICAgICAgLy8gfSk7XG4gICAgXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXhpdExpc3RcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGhpZGVFbGVtZW50KGxpc3RTZWN0aW9uKSk7XG4gICAgXG4gICAgXG4gICAgICAgIC8vIGRvZGFuaWUgZG8gbGlzdHkgxbx5Y3plxYRcbiAgICBcbiAgICAgICAgIGZ1bmN0aW9uIHNhdmVEYXRhVG9EQihpdGVtLCB1c2VyKSB7XG4gICAgICAgICAgICBhcnJheS5wdXNoKGl0ZW0pO1xuICAgICAgICBcbiAgICAgICAgICAgIGRhdGFiYXNlLnJlZignaXRlbScpLnNldCh7XG4gICAgICAgICAgICAgICAgY291bnRyeTogYXJyYXksXG4gICAgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZGF0YWJhc2UucmVmKCd1c2VyJykuc2V0KHtcbiAgICAgICAgICAgICAgICB1c2VyOiBmaXJlYmFzZS5hdXRoKCkuY3VycmVudFVzZXIudWlkLFxuICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBmdW5jdGlvbiBzd2ljaExpc3RJdGVtKHBhcmVudCl7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgbGlzdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5lbEluZm9cIik7XG4gICAgICAgICAgICBsZXQgY291bnRyeSA9IGxpc3RFbFswXS5pbm5lclRleHQ7XG4gICAgICAgICAgICBhZGRJdGVtVG9MaXN0KHBhcmVudCwgY291bnRyeSwgJycgKTtcbiAgICAgICAgICAgIHNhdmVEYXRhVG9EQihjb3VudHJ5KTtcbiAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICBcbiAgICAgICBcbiAgICAgICAgdmlzaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzaG93U2VjdGlvbihsaXN0U2VjdGlvbiwgJzEyMCUnKTtcbiAgICAgICAgICAgIHNjcm9sbEl0KGxpc3RTZWN0aW9uKTtcbiAgICAgICAgICAgIHN3aWNoTGlzdEl0ZW0od2lzaExpc3QpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYXJyYXkpO1xuICAgICAgICB9KTtcbiAgICAgICBcbiAgICAgICAgYWRkVmlzaXRlZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNob3dTZWN0aW9uKGxpc3RTZWN0aW9uLCAnMTIwJScpO1xuICAgICAgICAgICAgc2Nyb2xsSXQobGlzdFNlY3Rpb24pO1xuICAgICAgICAgICAgc3dpY2hMaXN0SXRlbSh2aXNpdGVkTGlzdCk7XG4gICAgICAgIH0pXG4gICAgXG4gICAgXG4gICAgXG4gICAgfSkiXX0=
