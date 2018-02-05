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
                    fetch("https://api.apixu.com/v1/current.json?key=38d2497fd3b242e78fb182314181601&q=" + el.capital).then(function (res) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVU7O0FBR2hEO0FBQ0EsUUFBTSxTQUFTO0FBQ1gsZ0JBQVEseUNBREc7QUFFWCxvQkFBWSx1Q0FGRDtBQUdYLHFCQUFhLDhDQUhGO0FBSVgsbUJBQVcsdUJBSkE7QUFLWCx1QkFBZSxtQ0FMSjtBQU1YLDJCQUFtQjtBQU5SLEtBQWY7QUFRQSxhQUFTLGFBQVQsQ0FBdUIsTUFBdkI7QUFDQSxRQUFNLFdBQVcsU0FBUyxRQUFULEVBQWpCOztBQUVBO0FBQ0EsUUFBTSxRQUFRLFNBQVMsY0FBVCxDQUF3QixPQUF4QixDQUFkO0FBQ0EsUUFBTSxTQUFTLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFmO0FBQ0EsUUFBTSxTQUFTLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFmO0FBQ0EsUUFBTSxjQUFjLFNBQVMsY0FBVCxDQUF3QixZQUF4QixDQUFwQjtBQUNBLFFBQU0sYUFBYSxTQUFTLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBbkI7QUFDQSxRQUFNLE9BQU8sU0FBUyxjQUFULENBQXdCLFlBQXhCLENBQWI7QUFDQSxRQUFNLFFBQVEsRUFBZDs7QUFFQTs7QUFFQTtBQUNBLFVBQU0sZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsYUFBSTtBQUNoQyxpQkFBUyxjQUFULENBQXdCLFdBQXhCLEVBQXFDLEtBQXJDLENBQTJDLE9BQTNDLEdBQXFELE9BQXJEO0FBRUgsS0FIRDs7QUFLQTs7QUFFQSxXQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLGFBQUs7QUFDbEMsaUJBQVMsSUFBVCxHQUFnQixPQUFoQjtBQUNILEtBRkQ7QUFHQTtBQUNBLFdBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsYUFBSztBQUNsQyxpQkFBUyxjQUFULENBQXdC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RUFBbUMsWUFBVTtBQUN6QyxvQkFBWSxXQUFaLEVBQXlCLE1BQXpCO0FBQ0EsaUJBQVMsV0FBVDtBQUNBLHNCQUFjLFFBQWQ7QUFDQSxnQkFBUSxHQUFSLENBQVksS0FBWjtBQUNILEtBTEQ7O0FBT0Esa0JBQWMsZ0JBQWQsQ0FBK0IsT0FBL0IsRUFBd0MsWUFBVTtBQUM5QyxvQkFBWSxXQUFaLEVBQXlCLE1BQXpCO0FBQ0EsaUJBQVMsV0FBVDtBQUNBLHNCQUFjLFdBQWQ7QUFDSCxLQUpEO0FBUUgsQ0FyY0wiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKXtcbiAgICBcbiAgICBcbiAgICAgICAgLy9maXJlYmFzZSBpbnRlcmFjdGl2ZS1tYXBcbiAgICAgICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICAgICAgYXBpS2V5OiBcIkFJemFTeUFkV0tncnF1aXRWUFlWWmFpZVYyWlpGSktDOTVJZWw5OFwiLFxuICAgICAgICAgICAgYXV0aERvbWFpbjogXCJpbnRlcmFjdGl2ZS1tYXAtZjUwNjAuZmlyZWJhc2VhcHAuY29tXCIsXG4gICAgICAgICAgICBkYXRhYmFzZVVSTDogXCJodHRwczovL2ludGVyYWN0aXZlLW1hcC1mNTA2MC5maXJlYmFzZWlvLmNvbVwiLFxuICAgICAgICAgICAgcHJvamVjdElkOiBcImludGVyYWN0aXZlLW1hcC1mNTA2MFwiLFxuICAgICAgICAgICAgc3RvcmFnZUJ1Y2tldDogXCJpbnRlcmFjdGl2ZS1tYXAtZjUwNjAuYXBwc3BvdC5jb21cIixcbiAgICAgICAgICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjU5NTg2MTY1MDYzMFwiXG4gICAgICAgICAgfTtcbiAgICAgICAgZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChjb25maWcpO1xuICAgICAgICBjb25zdCBkYXRhYmFzZSA9IGZpcmViYXNlLmRhdGFiYXNlKCk7XG4gICAgXG4gICAgICAgIC8vZWxlbWVudHkgZG8gbG9nb3dhbmlhXG4gICAgICAgIGNvbnN0IGxvZ0luID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dJblwiKTtcbiAgICAgICAgY29uc3Qgc2lnbkluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWduSW5cIik7XG4gICAgICAgIGNvbnN0IGxvZ091dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nT3V0XCIpO1xuICAgICAgICBjb25zdCBidG5TZW5kU2lnbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VuZFNpZ25JblwiKTtcbiAgICAgICAgY29uc3QgYnRuU2VuZExvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VuZExvZ0luXCIpO1xuICAgICAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaWduSW5Gb3JtXCIpO1xuICAgICAgICBjb25zdCBhcnJheSA9IFtdO1xuICAgICAgIFxuICAgICAgICAvL3Bva2F6IGZvcm11bGFyeiBkbyBsb2dvd2FuaWFcbiAgICAgIFxuICAgICAgICAvLyBsb2dPdXQuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XG4gICAgICAgIGxvZ0luLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+e1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZ0luRm9ybScpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgLy93eWxvZ293YW5pZSBzaWUgdXp5dGtvd25pa2FcbiAgICBcbiAgICAgICAgbG9nT3V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgIGZpcmViYXNlLmF1dGgoKS5zaWduT3V0KClcbiAgICAgICAgfSlcbiAgICAgICAgLy9wb2theiBmb3JtdWxhcnogZG8gcmVqZXN0cmFjamlcbiAgICAgICAgc2lnbkluLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduSW5Gb3JtJykuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvL3phbG9nb3dhbmllIHV6eXRrb3duaWthXG4gICAgICBcbiAgICAgICAgYnRuU2VuZExvZy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBwYXNzdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFzc3dvcmRcIikudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW1haWxcIikudmFsdWVcbiAgICAgICAgICAgIGNvbnN0IGF1dGggPSBmaXJlYmFzZS5hdXRoKCk7XG4gICAgXG4gICAgICAgICAgICBjb25zdCBwcm9taXNlID0gYXV0aC5zaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzc3cpO1xuICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChlID0+IGNvbnNvbGUubG9nKGUubWVzc2FnZSkpO1xuICAgIFxuICAgICBcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgLy9yZWplc3RyYWNqYSBub3dlZ28gdXp5dGtvd25pa2FcbiAgICAgICAgYnRuU2VuZFNpZ24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgcGFzc3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3N3b3JkXCIpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtYWlsXCIpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgYXV0aCA9IGZpcmViYXNlLmF1dGgoKTtcbiAgICBcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBhdXRoLmNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzc3cpO1xuICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChlID0+IGNvbnNvbGUubG9nKGUubWVzc2FnZSkpO1xuICAgIFxuICAgICAgICB9KVxuICAgIFxuICAgIFxuICAgICAgICBmaXJlYmFzZS5hdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKGZ1bmN0aW9uKHVzZXIpe1xuICAgICAgICAgICAgaWYodXNlcil7ICAgXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codXNlciArIFwibG9nZ2VkIGluXCIgKyBmaXJlYmFzZS5hdXRoKCkuY3VycmVudFVzZXIudWlkKTtcbiAgICAgICAgICAgICAgICBsb2dPdXQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdub3QgbG9nZ2VkIGluJyk7XG4gICAgICAgICAgICAgICAgbG9nT3V0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIFxuICAgICAgICAvL3ptaWVubmVcbiAgICAgICAgbGV0IGltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFwXCIpO1xuICAgICAgICBsZXQgY291bnRyeU1hcCA9IGltZy5xdWVyeVNlbGVjdG9yQWxsKFwicGF0aFwiKTtcbiAgICAgICAgbGV0IGltZ1NtYWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYXBTZWNcIik7XG4gICAgICAgIGxldCBzbWFsbE1hcCA9IGltZ1NtYWxsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJwYXRoXCIpO1xuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvdW50cnlOYW1lXCIpO1xuICAgICAgICBsZXQgdG9vbFRpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9vbFRpcFwiKTtcbiAgICAgICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGVhZGVyXCIpO1xuICAgIFxuICAgICAgICBsZXQgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG5cIik7XG4gICAgICAgIGxldCB0aXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aXBCdG5cIik7XG4gICAgICAgIGxldCBsaXN0QnRuID0gYnRuLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgXG4gICAgXG4gICAgICAgIGxldCBsaXN0ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKTtcbiAgICAgICAgbGV0IHNlY3Rpb25TZWMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlY29uZFNlY1wiKTtcbiAgICAgICAgbGV0IGFwaUtleVdldCA9ICdmNDc3OWM4NWYxNzNiYzY5YTUyOWRkZDNhYjZlOTc3MCc7XG4gICAgICAgIGxldCBhcGlLZXlUaW1lID0gJ0FMUUE3MEg4OFRCNyc7XG4gICAgICAgIGxldCBleGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNleGl0QnRuXCIpO1xuIFxuICAgICAgICBsZXQgYm94V2VhdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2VhdGhlckJveFwiKTtcbiAgICAgICAgLy8gbGV0IGNvdW50cnlJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb3VudHJ5TGlzdFwiKTtcbiAgICAgICAgbGV0IHN1biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3VuXCIpO1xuICAgICAgICBsZXQgbW9vbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9vblwiKTtcbiAgICAgICAgbGV0IGxpdHRsZU1vb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xpdHRsZU1vb25cIik7XG4gICAgICAgIGxldCBsb2NhdGlvbiA9IG51bGw7XG4gICAgICAgIGxldCBjb3VudHJ5ID0gbnVsbDtcbiAgICAgICAgbGV0IGRhdGFDb3VudHJ5ID0gbnVsbDtcbiAgICAgICBcbiAgICAgICAgbGV0IGxpc3RTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0X19ib3hcIik7XG4gICAgICAgIGxldCB2aXNpdGVkTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGlzdFZpc2l0ZWRcIik7XG4gICAgICAgIGxldCB3aXNoTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGlzdFdpc2hcIik7XG4gICAgICAgIGxldCB2aXNpdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkVG9WaXNpdFwiKTtcbiAgICAgICAgbGV0IGFkZFZpc2l0ZWRCdG4gPSB2aXNpdEJ0bi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgIFxuICAgIFxuXG4gICAgXG4gICAgICAgIC8vIHRhYmxpY2Egb2JpZWt0b3cga3JhamUgaWQgaSBuYXp3eVxuICAgICAgICBsZXQgY291bnRyaWVzID0gW11cbiAgICBcbiAgICAgICAgY291bnRyeU1hcC5mb3JFYWNoKGNvdW50cnkgPT4ge1xuICAgICAgICAgICAgaWYodHlwZW9mIGNvdW50cnkgIT09ICcnKXtcbiAgICAgICAgICAgICAgICBjb3VudHJpZXMucHVzaCh7aWQ6IGNvdW50cnkuaWQsIHRpdGxlOiBjb3VudHJ5LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvdW50cmllcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgLy9zbWFsbCBtYXAgLSBwb2Rzd2lldGxlbmllIHd5YnJhbmVnbyBrcmFqdVxuICAgICAgICBsZXQgc21hbGxDb3VudHJpZXMgPSBbXVxuICAgICAgICBcbiAgICAgICAgICAgIHNtYWxsTWFwLmZvckVhY2goY291bnRyeSA9PiB7XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIGNvdW50cnkgIT09ICcnKXtcbiAgICAgICAgICAgICAgICAgICAgc21hbGxDb3VudHJpZXMucHVzaCh7aWQ6IGNvdW50cnkuaWQsIHRpdGxlOiBjb3VudHJ5LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNtYWxsQ291bnRyaWVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgXG4gICAgICAgIC8vcG96eWNqYSBrdXJzb3JhXG4gICAgICAgIHdpbmRvdy5vbm1vdXNlbW92ZSA9IG1vdXNlUG9zaXRpb247XG4gICAgICAgIGZ1bmN0aW9uIG1vdXNlUG9zaXRpb24oZSl7XG4gICAgICAgICAgICByZXR1cm4geyB4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WSB9OyAgXG4gICAgICAgIH0gIFxuICAgIFxuICAgICAgICAvL25hamVjaGFuaWUgbmEgbWFwZSBpIHBvZHN3aWV0bGVuaWVcbiAgICAgICAgY291bnRyeU1hcC5mb3JFYWNoKGNvdW50cnkgPT4ge1xuICAgICAgICAgICAgY291bnRyeS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChcInZpc2libGVDb3VudHJ5XCIpO1xuICAgICAgICAgICAgICAgIHRvb2xUaXAuaW5uZXJUZXh0ID0gY291bnRyeS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgICAgICAgICAgICAgICB0aXRsZS5pbm5lclRleHQgPSBjb3VudHJ5LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICAgIFxuICAgICAgICAgICAgICAgIHRvb2xUaXAuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICB0b29sVGlwLnN0eWxlLnRvcCA9IG1vdXNlUG9zaXRpb24od2luZG93LmV2ZW50KS55ICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIHRvb2xUaXAuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoMCwxMDAlKVwiO1xuICAgICAgICAgICAgICAgIHRvb2xUaXAuc3R5bGUubGVmdCA9IG1vdXNlUG9zaXRpb24od2luZG93LmV2ZW50KS54ICsgXCJweFwiO1xuICAgICAgXG4gICAgICAgICAgICB9KVxuICAgIFxuICAgICAgICAgICAgY291bnRyeS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVDb3VudHJ5XCIpO1xuICAgICAgICAgICAgICAgIHRvb2xUaXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgICBcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgLy93aWRvY3pub3NjIHNla2NqaVxuICAgIFxuICAgICAgICBmdW5jdGlvbiBzaG93U2VjdGlvbihzZWN0aW9uLCBwb3NpdGlvblRvcCl7XG4gICAgICAgICAgICBzZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgc2VjdGlvbi5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICAgICAgc2VjdGlvbi5zdHlsZS50b3AgPSBwb3NpdGlvblRvcDtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICAvL2Z1bmtjamEgY2hvd2FqxIVjYSBlbGVtZW50IFxuICAgICAgICBmdW5jdGlvbiBoaWRlRWxlbWVudChlbGVtZW50KXtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICBcbiAgICAgICAgLy9wb2JyYW5pZSBpbnB1dGEgaSBwb2Rzd2lldGxlbmllIG1hcHlcbiAgICBcbiAgICAgICAgZnVuY3Rpb24gdmlld0NvdW50cnkoZXZlbnQsIG5hbWUpe1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGhpZGVFbGVtZW50KGxpc3QpO1xuICAgICAgICAgICAgc2hvd1NlY3Rpb24oc2VjdGlvblNlYywgJzIwJScpO1xuICAgICAgICAgICAgY29ubmVjdFRvQ291bnRyaWVzKGNvdW50cmllcyk7XG4gICAgICAgICAgICBjb3VudHJ5TWFwLmZvckVhY2goY291bnRyeSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGF0dHIgPSBjb3VudHJ5LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICAgICAgICAgICAgICAgIGlmKGF0dHIgPT09IG5hbWUudmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICBjb3VudHJ5LmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlQ291bnRyeVwiKTsgXG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgc21hbGxNYXAuZm9yRWFjaChzbWFsbCA9PntcbiAgICAgICAgICAgICAgICBsZXQgYXR0ciA9IHNtYWxsLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICAgICAgICAgICAgICAgIGlmKGF0dHIgPT09IG5hbWUudmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICBzbWFsbC5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZUNvdW50cnlcIik7IFxuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyBidG4uc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIHpkYXJ6ZW5pZSBuYSBidG4gc2VhcmNoXG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gdmlld0NvdW50cnkoZXZlbnQsIHRpdGxlKSk7XG5cbiAgICAgICAgLy8gemRhcnplbmllIG5hIGVudGVyXG4gICAgICAgIHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKGUua2V5Q29kZSA9PT0gMTMpe1xuICAgICAgICAgICAgICAgIHZpZXdDb3VudHJ5KGV2ZW50LCB0aXRsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICBcbiAgICAgICAgLy8gZG9kYXdhbmllIGxpIGRvIGxpc3QgaW5mbyBpIHdlYXRoZXJcbiAgICAgICAgZnVuY3Rpb24gYWRkSXRlbVRvV2VhdGhlckxpc3QocGFyZW50LCBpdGVtLCB0ZXh0KXtcbiAgICAgICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgICAgIGxpLmlubmVyVGV4dCA9IHRleHQgKyBpdGVtO1xuICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZChcImVsUmlnaHRMaXN0XCIpO1xuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGxpKTsgICBcbiAgICAgICAgfVxuICAgIFxuICAgICAgICBmdW5jdGlvbiBhZGRJdGVtVG9MaXN0KCBwYXJlbnQsIGl0ZW0sIHRleHQsIG1hcENvdW50cnkgKXtcbiAgICAgICAgICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bkFkZFwiKTtcbiAgICAgICAgICAgIGxldCBuZXdMaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgICAgIG5ld0xpLmNsYXNzTGlzdC5hZGQoXCJlbEluZm9cIik7XG4gICAgICAgICAgICBuZXdMaS5pbm5lclRleHQgPSB0ZXh0ICsgaXRlbTtcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChuZXdMaSk7XG4gICAgICAgIFxuICAgIFxuICAgICAgICAgICAgLy8gcG9kbGFjemVuaWUgZG8gYXBpIHBvZ29keSBpIGRvZGFuaWUgZWxlbWVudG93IGRvIGJveFdlYXRoZXJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNob3dXZWF0aGVyKCl7XG4gICAgICAgICAgICAgICAgY291bnRyeS5tYXAoZWwgPT4ge1xuICAgICAgICAgICAgICAgICAgIGlmKGVsLm5hbWUgPT09IGl0ZW0pe1xuICAgICAgICAgICAgICAgICAgICBmZXRjaChgaHR0cHM6Ly9hcGkuYXBpeHUuY29tL3YxL2N1cnJlbnQuanNvbj9rZXk9MzhkMjQ5N2ZkM2IyNDJlNzhmYjE4MjMxNDE4MTYwMSZxPSR7ZWwuY2FwaXRhbH1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGxvY2F0aW9uLCBjdXJyZW50IH0gPSBkYXRhO1xuICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aXRsZVdlYXRoZXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyLmlubmVyVGV4dCA9IGBXZWF0aGVyIGluICR7bG9jYXRpb24ubmFtZX0gYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3ZWF0aGVyTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2VhdGhlckxpc3RcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEl0ZW1Ub1dlYXRoZXJMaXN0KHdlYXRoZXJMaXN0LCBjdXJyZW50LnRlbXBfYywgXCJDdXJyZW50IHRlbXBlcmF0dXJlOiBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkSXRlbVRvV2VhdGhlckxpc3Qod2VhdGhlckxpc3QsIGN1cnJlbnQuZmVlbHNsaWtlX2MsIFwiRmVlbHNsaWtlIHRlbXBlcmF0dXJlOiAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEl0ZW1Ub1dlYXRoZXJMaXN0KHdlYXRoZXJMaXN0LCBjdXJyZW50Lmh1bWlkaXR5LCBcIkh1bWlkaXR5OiAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEl0ZW1Ub1dlYXRoZXJMaXN0KHdlYXRoZXJMaXN0LCBjdXJyZW50LnByZXNzdXJlX21iLCBcIlByZXNzdXJlOiAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEl0ZW1Ub1dlYXRoZXJMaXN0KHdlYXRoZXJMaXN0LCBjdXJyZW50LndpbmRfa3BoLCBcIldpbmQga20vaDogIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRJdGVtVG9XZWF0aGVyTGlzdCh3ZWF0aGVyTGlzdCwgY3VycmVudC5jb25kaXRpb24udGV4dCxcIldlYXRoZXIgY29uZGl0aW9uOiAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKFwic3JjXCIsIGN1cnJlbnQuY29uZGl0aW9uLmljb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZy5jbGFzc0xpc3QuYWRkKFwiaWNvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hXZWF0aGVyLmFwcGVuZENoaWxkKGltZyk7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWVQYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lUGFyYWdyYXBoLmlubmVyVGV4dCA9IGN1cnJlbnQubGFzdF91cGRhdGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVQYXJhZ3JhcGguY2xhc3NMaXN0LmFkZChcInRpbWVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94V2VhdGhlci5pbnNlcnRCZWZvcmUodGltZVBhcmFncmFwaCwgc3VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VGltZSA9IGN1cnJlbnQubGFzdF91cGRhdGVkLnNsaWNlKDExLCAxNik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3VGltZVswXSA+PSAyIHx8IG5ld1RpbWVbMF0gPT09ICcwJyAmJiBuZXdUaW1lWzFdIDw9IDUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY29uZC1wYWdlX19saXN0LS1tb29uXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveFdlYXRoZXIuY2xhc3NMaXN0LmFkZChcIm5pZ2h0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY29uZC1wYWdlX19saXN0LS1zdW5cIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94V2VhdGhlci5jbGFzc0xpc3QuYWRkKFwiZGF5XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmFpbCcsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBwbyBrbGlrbmnEmWNpdSBwb2thenVqZSBzaWUgb2tubyB6IHBvZ29kxIVcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzaG93V2VhdGhlcigpO1xuICAgICAgICAgICAgICAgIGJveFdlYXRoZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICBib3hXZWF0aGVyLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgICAgICAgICAgICBidXR0b24uaW5uZXJUZXh0ID0gXCJIaWRlIHdlYXRoZXJcIjtcbiAgICAgICAgICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgICAgICAgICAgICAgIHNjcm9sbEl0KGJveFdlYXRoZXIpXG4gICAgXG4gICAgICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZ1bmtjamEgc2Nyb2xsIHRvIGRhbmVqIHNla2NqaVxuICAgICAgICBmdW5jdGlvbiBzY3JvbGxJdChlbGVtZW50KSB7XG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgICAgICdiZWhhdmlvcic6ICdzbW9vdGgnLFxuICAgICAgICAgICAgICAgICd0b3AnOiBlbGVtZW50Lm9mZnNldFRvcFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICBcbiAgICBcbiAgICAgICAgLy9wb2RsYWN6ZW5pZSBzaWUgZG8gYXBpIGNvdW50cmllcyBpIHBvYnJhbmllIGRhbnljaCArIGRvbGFjemVuaWUgZG8gbGlzdHlcbiAgICBcbiAgICAgICAgZnVuY3Rpb24gY29ubmVjdFRvQ291bnRyaWVzKGNvdW50cmllcyl7XG4gICAgICAgICAgICBmZXRjaCgnaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvYWxsJylcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgZGF0YUNvdW50cnkgPSBkYXRhO1xuICAgICAgICAgICAgICAgIGxldCBhcnIgPSBbXTtcbiAgICAgICAgICAgICAgICBkYXRhLm1hcChpdGVtID0+e1xuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBuYW1lLCBjYXBpdGFsLCBjdXJyZW5jaWVzLCBsYW5ndWFnZXMsIHBvcHVsYXRpb24gfSA9IGl0ZW07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24gPSBjYXBpdGFsO1xuICAgICAgICAgICAgICAgICAgICBjb3VudHJ5ID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVuY3kgPSBjdXJyZW5jaWVzLm1hcChjdXJyID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnIubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFuZ3VhZ2UgPSBsYW5ndWFnZXMubWFwKGxhbmcgPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGFuZy5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgbGlzdE9mQ291bnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY291bnRyeUxpc3RcIik7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKHRpdGxlLnZhbHVlID09PSBuYW1lKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZEl0ZW1Ub0xpc3QobGlzdE9mQ291bnRyeSwgbmFtZSwgJ05hbWUgb2YgdGhlIGNvdW50cnk6ICcsIGNvdW50cmllcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRJdGVtVG9MaXN0KGxpc3RPZkNvdW50cnksIGNhcGl0YWwsICdDYXBpdGFsOiAnLCBjb3VudHJpZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkSXRlbVRvTGlzdChsaXN0T2ZDb3VudHJ5LCBjdXJyZW5jeSwgJ0N1cnJlbmN5OiAnLCBjb3VudHJpZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkSXRlbVRvTGlzdChsaXN0T2ZDb3VudHJ5LCBsYW5ndWFnZSwgJ0xhbmd1YWdlOiAnLCBjb3VudHJpZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkSXRlbVRvTGlzdChsaXN0T2ZDb3VudHJ5LCBwb3B1bGF0aW9uLCAnUG9wdWxhdGlvbjogJywgY291bnRyaWVzKTtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsZWZ0Qm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsZWZ0Qm94XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEJveC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7aXRlbS5mbGFnfSlgO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEJveC5jbGFzc0xpc3QuYWRkKFwibGVmdEJveEJhY2tncm91bmRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhcnI7IFxuICAgICAgICAgICAgICAgICAgICB9ICBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSkgIFxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZhaWwnLCBlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgXG4gICAgXG4gICAgXG4gICAgICAgIC8vIGJ0biB0aXBzIHd5c3dpZXRsYSB0YWJsaWNlIHogbmF6d2FtaSBrcmFqw7N3IGkgY2hvd2FcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlVGFibGVUaXBzKCl7ICAgICBcbiAgICAgICAgICAgIGxpc3QuY2xhc3NMaXN0LmFkZChcInRpcHNcIik7XG4gICAgICAgICAgICBsZXQgYXJyYXlPZkxpID0gW107XG4gICAgICAgICAgICBjb25zdCB0aXBzQXJyYXkgPSBjb3VudHJpZXMubWFwKGVsID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3TGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgICAgICAgICAgbmV3TGkuY2xhc3NMaXN0LmFkZChcInRpcHNFbGVtZW50XCIpO1xuICAgICAgICAgICAgICAgIGxpc3QuYXBwZW5kQ2hpbGQobmV3TGkpO1xuICAgICAgICAgICAgICAgIG5ld0xpLmlubmVyVGV4dCA9IGVsLnRpdGxlO1xuICAgICAgICAgICAgICAgIGhlYWRlci5hcHBlbmRDaGlsZChsaXN0KTsgXG4gICAgXG4gICAgICAgICAgICAgICAgYXJyYXlPZkxpLnB1c2gobmV3TGkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhcnJheU9mTGk7XG4gICAgICAgICAgICB9KVxuICAgIFxuICAgICAgICAgICAgYXJyYXlPZkxpLmZvckVhY2goZWwgPT57XG4gICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRleHQgPSB0aGlzLmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUudmFsdWUgPSB0ZXh0O1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRpcHNBcnJheTtcbiAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIC8vcG8ga2xpa25pxJljaXUgbmEgYnRuIHBva2F6YW5pZSB0YWJsaWN5IHRpcHMgaSB3ecWCxIVjemVuaWUgZ3V6aWthXG4gICAgICAgIHRpcHMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmKGxpc3QuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgIT09IFwidGlwc1wiKXtcbiAgICAgICAgICAgICAgICBjcmVhdGVUYWJsZVRpcHMoKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoaWRlRWxlbWVudChsaXN0KTtcbiAgICAgICAgICAgICAgICB0aXBzLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAgICAgXG5cbiAgICAgICAgLy93eWrFm2NpZSB6IGRydWdpZWogc2VrY2ppXG4gICAgXG4gICAgICAgIGV4aXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGhpZGVFbGVtZW50KHNlY3Rpb25TZWMpKTtcbiAgICBcbiAgICBcbiAgICBcbiAgICAgICAgLy8gcHJ6ZWrFm2NpZSBkbyBzZWtjamkgLSAgbGlzdGEgaSB3eWrFm2NpZSB6IHNla2NqaVxuICAgIFxuICAgIFxuICAgICAgICAvLyBsaXN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICAvLyAgICAgc2hvd1NlY3Rpb24obGlzdFNlY3Rpb24sICcxMjAlJyk7XG4gICAgICAgIC8vICAgICBzY3JvbGxJdChsaXN0U2VjdGlvbik7XG4gICAgICAgIC8vIH0pO1xuICAgIFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V4aXRMaXN0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoaWRlRWxlbWVudChsaXN0U2VjdGlvbikpO1xuICAgIFxuICAgIFxuICAgICAgICAvLyBkb2RhbmllIGRvIGxpc3R5IMW8eWN6ZcWEXG4gICAgXG4gICAgICAgICBmdW5jdGlvbiBzYXZlRGF0YVRvREIoaXRlbSwgdXNlcikge1xuICAgICAgICAgICAgYXJyYXkucHVzaChpdGVtKTtcbiAgICAgICAgXG4gICAgICAgICAgICBkYXRhYmFzZS5yZWYoJ2l0ZW0nKS5zZXQoe1xuICAgICAgICAgICAgICAgIGNvdW50cnk6IGFycmF5LFxuICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGRhdGFiYXNlLnJlZigndXNlcicpLnNldCh7XG4gICAgICAgICAgICAgICAgdXNlcjogZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZCxcbiAgICBcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgZnVuY3Rpb24gc3dpY2hMaXN0SXRlbShwYXJlbnQpe1xuICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGxpc3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZWxJbmZvXCIpO1xuICAgICAgICAgICAgbGV0IGNvdW50cnkgPSBsaXN0RWxbMF0uaW5uZXJUZXh0O1xuICAgICAgICAgICAgYWRkSXRlbVRvTGlzdChwYXJlbnQsIGNvdW50cnksICcnICk7XG4gICAgICAgICAgICBzYXZlRGF0YVRvREIoY291bnRyeSk7XG4gICAgICAgICAgIFxuICAgICAgICB9XG4gICAgXG4gICAgICAgXG4gICAgICAgIHZpc2l0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2hvd1NlY3Rpb24obGlzdFNlY3Rpb24sICcxMjAlJyk7XG4gICAgICAgICAgICBzY3JvbGxJdChsaXN0U2VjdGlvbik7XG4gICAgICAgICAgICBzd2ljaExpc3RJdGVtKHdpc2hMaXN0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFycmF5KTtcbiAgICAgICAgfSk7XG4gICAgICAgXG4gICAgICAgIGFkZFZpc2l0ZWRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzaG93U2VjdGlvbihsaXN0U2VjdGlvbiwgJzEyMCUnKTtcbiAgICAgICAgICAgIHNjcm9sbEl0KGxpc3RTZWN0aW9uKTtcbiAgICAgICAgICAgIHN3aWNoTGlzdEl0ZW0odmlzaXRlZExpc3QpO1xuICAgICAgICB9KVxuICAgIFxuICAgIFxuICAgIFxuICAgIH0pIl19
