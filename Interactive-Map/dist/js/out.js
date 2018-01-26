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
    var sectionSec = document.querySelector("#aboveSec");
    var apiKeyWet = 'f4779c85f173bc69a529ddd3ab6e9770';
    var apiKeyTime = 'ALQA70H88TB7';
    var exit = document.querySelector("#exitBtn");

    var boxWeather = document.querySelector("#weatherBox");
    var countryInfo = document.querySelector("#countryList");
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

        // section.style.transform = 'translate(-50%,-50%)';
    }

    //pobranie inputa i podswietlenie mapy


    function viewCountry(event, name) {
        event.preventDefault();
        hideTableTips(list);
        showSection(sectionSec, '0');
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

    btn.addEventListener("click", function () {
        return viewCountry(event, title);
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
                    // let box = document.querySelector(".second-page__list");
                    // let img = document.createElement("img");
                    // img.setAttribute("src", item.flag);
                    // img.classList.add("flags");
                    // box.appendChild(img);
                }
                return arr;
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

    tips.addEventListener("click", function () {
        if (list.getAttribute("class") !== "tips") {
            createTableTips();
        } else {
            hideTableTips();
            tips.setAttribute("disabled", "true");
        }
    });

    function hideTableTips() {

        list.style.display = "none";
    }

    //wyjście z drugiej sekcji

    exit.addEventListener("click", function () {

        sectionSec.style.display = "none";
    });

    // przejście do sekcji -  lista i wyjście z sekcji


    // listBtn.addEventListener("click", function(){
    //     showSection(listSection, '120%');
    //     scrollIt(listSection);
    // });

    document.querySelector("#exitList").addEventListener("click", function () {
        listSection.style.display = "none";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVU7O0FBR2hEO0FBQ0EsUUFBTSxTQUFTO0FBQ1gsZ0JBQVEseUNBREc7QUFFWCxvQkFBWSx1Q0FGRDtBQUdYLHFCQUFhLDhDQUhGO0FBSVgsbUJBQVcsdUJBSkE7QUFLWCx1QkFBZSxtQ0FMSjtBQU1YLDJCQUFtQjtBQU5SLEtBQWY7QUFRRSxhQUFTLGFBQVQsQ0FBdUIsTUFBdkI7QUFDQSxRQUFNLFdBQVcsU0FBUyxRQUFULEVBQWpCOztBQUVJO0FBQ04sUUFBTSxRQUFRLFNBQVMsY0FBVCxDQUF3QixPQUF4QixDQUFkO0FBQ0EsUUFBTSxTQUFTLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFmO0FBQ0EsUUFBTSxTQUFTLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFmO0FBQ0EsUUFBTSxjQUFjLFNBQVMsY0FBVCxDQUF3QixZQUF4QixDQUFwQjtBQUNBLFFBQU0sYUFBYSxTQUFTLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBbkI7QUFDQSxRQUFNLE9BQU8sU0FBUyxjQUFULENBQXdCLFlBQXhCLENBQWI7QUFDQSxRQUFNLFFBQVEsRUFBZDs7QUFFRTs7QUFFRjtBQUNBLFVBQU0sZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsYUFBSTtBQUNoQyxpQkFBUyxjQUFULENBQXdCLFdBQXhCLEVBQXFDLEtBQXJDLENBQTJDLE9BQTNDLEdBQXFELE9BQXJEO0FBRUgsS0FIRDs7QUFLQTs7QUFFQSxXQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLGFBQUs7QUFDbEMsaUJBQVMsSUFBVCxHQUFnQixPQUFoQjtBQUNILEtBRkQ7QUFHQTtBQUNBLFdBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsYUFBSztBQUNsQyxpQkFBUyxjQUFULENBQXdC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Q0FBK0IsT0FBL0IsRUFBd0MsWUFBVTtBQUM5QyxvQkFBWSxXQUFaLEVBQXlCLE1BQXpCO0FBQ0EsaUJBQVMsV0FBVDtBQUNBLHNCQUFjLFdBQWQ7QUFDSCxLQUpEO0FBUUgsQ0EvZEwiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgZnVuY3Rpb24oKXtcbiAgICBcbiAgICBcbiAgICAgICAgLy9maXJlYmFzZSBpbnRlcmFjdGl2ZS1tYXBcbiAgICAgICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICAgICAgYXBpS2V5OiBcIkFJemFTeUFkV0tncnF1aXRWUFlWWmFpZVYyWlpGSktDOTVJZWw5OFwiLFxuICAgICAgICAgICAgYXV0aERvbWFpbjogXCJpbnRlcmFjdGl2ZS1tYXAtZjUwNjAuZmlyZWJhc2VhcHAuY29tXCIsXG4gICAgICAgICAgICBkYXRhYmFzZVVSTDogXCJodHRwczovL2ludGVyYWN0aXZlLW1hcC1mNTA2MC5maXJlYmFzZWlvLmNvbVwiLFxuICAgICAgICAgICAgcHJvamVjdElkOiBcImludGVyYWN0aXZlLW1hcC1mNTA2MFwiLFxuICAgICAgICAgICAgc3RvcmFnZUJ1Y2tldDogXCJpbnRlcmFjdGl2ZS1tYXAtZjUwNjAuYXBwc3BvdC5jb21cIixcbiAgICAgICAgICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjU5NTg2MTY1MDYzMFwiXG4gICAgICAgICAgfTtcbiAgICAgICAgICBmaXJlYmFzZS5pbml0aWFsaXplQXBwKGNvbmZpZyk7XG4gICAgICAgICAgY29uc3QgZGF0YWJhc2UgPSBmaXJlYmFzZS5kYXRhYmFzZSgpO1xuICAgIFxuICAgICAgICAgICAgICAvL2VsZW1lbnR5IGRvIGxvZ293YW5pYVxuICAgICAgICBjb25zdCBsb2dJbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nSW5cIik7XG4gICAgICAgIGNvbnN0IHNpZ25JbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lnbkluXCIpO1xuICAgICAgICBjb25zdCBsb2dPdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ091dFwiKTtcbiAgICAgICAgY29uc3QgYnRuU2VuZFNpZ24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbmRTaWduSW5cIik7XG4gICAgICAgIGNvbnN0IGJ0blNlbmRMb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbmRMb2dJblwiKTtcbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lnbkluRm9ybVwiKTtcbiAgICAgICAgY29uc3QgYXJyYXkgPSBbXTtcbiAgICAgICBcbiAgICAgICAgICAvL3Bva2F6IGZvcm11bGFyeiBkbyBsb2dvd2FuaWFcbiAgICAgIFxuICAgICAgICAvLyBsb2dPdXQuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XG4gICAgICAgIGxvZ0luLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+e1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZ0luRm9ybScpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgIFxuICAgICAgICB9KTtcbiAgICBcbiAgICAgICAgLy93eWxvZ293YW5pZSBzaWUgdXp5dGtvd25pa2FcbiAgICBcbiAgICAgICAgbG9nT3V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgIGZpcmViYXNlLmF1dGgoKS5zaWduT3V0KClcbiAgICAgICAgfSlcbiAgICAgICAgLy9wb2theiBmb3JtdWxhcnogZG8gcmVqZXN0cmFjamlcbiAgICAgICAgc2lnbkluLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduSW5Gb3JtJykuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAvL3phbG9nb3dhbmllIHV6eXRrb3duaWthXG4gICAgICBcbiAgICAgICAgYnRuU2VuZExvZy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBwYXNzdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFzc3dvcmRcIikudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW1haWxcIikudmFsdWVcbiAgICAgICAgICAgIGNvbnN0IGF1dGggPSBmaXJlYmFzZS5hdXRoKCk7XG4gICAgXG4gICAgICAgICAgICBjb25zdCBwcm9taXNlID0gYXV0aC5zaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzc3cpO1xuICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChlID0+IGNvbnNvbGUubG9nKGUubWVzc2FnZSkpO1xuICAgIFxuICAgICBcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgLy9yZWplc3RyYWNqYSBub3dlZ28gdXp5dGtvd25pa2FcbiAgICAgICAgYnRuU2VuZFNpZ24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgcGFzc3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3N3b3JkXCIpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtYWlsXCIpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgYXV0aCA9IGZpcmViYXNlLmF1dGgoKTtcbiAgICBcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBhdXRoLmNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzc3cpO1xuICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChlID0+IGNvbnNvbGUubG9nKGUubWVzc2FnZSkpO1xuICAgIFxuICAgICAgICB9KVxuICAgIFxuICAgIFxuICAgICAgICBmaXJlYmFzZS5hdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKGZ1bmN0aW9uKHVzZXIpe1xuICAgICAgICAgICAgaWYodXNlcil7ICAgXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codXNlciArIFwibG9nZ2VkIGluXCIgKyBmaXJlYmFzZS5hdXRoKCkuY3VycmVudFVzZXIudWlkKTtcbiAgICAgICAgICAgICAgICBsb2dPdXQuY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdub3QgbG9nZ2VkIGluJyk7XG4gICAgICAgICAgICAgICAgbG9nT3V0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIFxuICAgICAgICAvL3ptaWVubmVcbiAgICAgICAgbGV0IGltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFwXCIpO1xuICAgICAgICBsZXQgY291bnRyeU1hcCA9IGltZy5xdWVyeVNlbGVjdG9yQWxsKFwicGF0aFwiKTtcbiAgICAgICAgbGV0IGltZ1NtYWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYXBTZWNcIik7XG4gICAgICAgIGxldCBzbWFsbE1hcCA9IGltZ1NtYWxsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJwYXRoXCIpO1xuICAgICAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvdW50cnlOYW1lXCIpO1xuICAgICAgICBsZXQgdG9vbFRpcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9vbFRpcFwiKTtcbiAgICAgICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaGVhZGVyXCIpO1xuICAgIFxuICAgICAgICBsZXQgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG5cIik7XG4gICAgICAgIGxldCB0aXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aXBCdG5cIik7XG4gICAgICAgIGxldCBsaXN0QnRuID0gYnRuLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgXG4gICAgXG4gICAgICAgIGxldCBsaXN0ID0gaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKTtcbiAgICAgICAgbGV0IHNlY3Rpb25TZWMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Fib3ZlU2VjXCIpO1xuICAgICAgICBsZXQgYXBpS2V5V2V0ID0gJ2Y0Nzc5Yzg1ZjE3M2JjNjlhNTI5ZGRkM2FiNmU5NzcwJztcbiAgICAgICAgbGV0IGFwaUtleVRpbWUgPSAnQUxRQTcwSDg4VEI3JztcbiAgICAgICAgbGV0IGV4aXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V4aXRCdG5cIik7XG4gICAgICAgXG4gICAgICAgIGxldCBib3hXZWF0aGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWF0aGVyQm94XCIpO1xuICAgICAgICBsZXQgY291bnRyeUluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvdW50cnlMaXN0XCIpO1xuICAgICAgICBsZXQgc3VuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdW5cIik7XG4gICAgICAgIGxldCBtb29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb29uXCIpO1xuICAgICAgICBsZXQgbGl0dGxlTW9vbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGl0dGxlTW9vblwiKTtcbiAgICAgICAgbGV0IGxvY2F0aW9uID0gbnVsbDtcbiAgICAgICAgbGV0IGNvdW50cnkgPSBudWxsO1xuICAgICAgICBsZXQgZGF0YUNvdW50cnkgPSBudWxsO1xuICAgICAgIFxuICAgICAgICBsZXQgbGlzdFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxpc3RfX2JveFwiKTtcbiAgICAgICAgbGV0IHZpc2l0ZWRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsaXN0VmlzaXRlZFwiKTtcbiAgICAgICAgbGV0IHdpc2hMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsaXN0V2lzaFwiKTtcbiAgICAgICAgbGV0IHZpc2l0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGRUb1Zpc2l0XCIpO1xuICAgICAgICBsZXQgYWRkVmlzaXRlZEJ0biA9IHZpc2l0QnRuLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG4gICAgXG4gICAgXG4gICAgXG4gICAgXG4gICAgXG4gICAgXG4gICAgXG4gICAgXG4gICAgICAgIC8vIHRhYmxpY2Egb2JpZWt0b3cga3JhamUgaWQgaSBuYXp3eVxuICAgICAgICBsZXQgY291bnRyaWVzID0gW11cbiAgICBcbiAgICAgICAgY291bnRyeU1hcC5mb3JFYWNoKGNvdW50cnkgPT4ge1xuICAgICAgICAgICAgaWYodHlwZW9mIGNvdW50cnkgIT09ICcnKXtcbiAgICAgICAgICAgICAgICBjb3VudHJpZXMucHVzaCh7aWQ6IGNvdW50cnkuaWQsIHRpdGxlOiBjb3VudHJ5LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvdW50cmllcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgLy9zbWFsbCBtYXAgLSBwb2Rzd2lldGxlbmllIHd5YnJhbmVnbyBrcmFqdVxuICAgICAgICBsZXQgc21hbGxDb3VudHJpZXMgPSBbXVxuICAgICAgICBcbiAgICAgICAgICAgIHNtYWxsTWFwLmZvckVhY2goY291bnRyeSA9PiB7XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIGNvdW50cnkgIT09ICcnKXtcbiAgICAgICAgICAgICAgICAgICAgc21hbGxDb3VudHJpZXMucHVzaCh7aWQ6IGNvdW50cnkuaWQsIHRpdGxlOiBjb3VudHJ5LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzbWFsbENvdW50cmllcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICBcbiAgICBcbiAgICBcbiAgICAgICAgLy9wb3p5Y2phIGt1cnNvcmFcbiAgICAgICAgd2luZG93Lm9ubW91c2Vtb3ZlID0gbW91c2VQb3NpdGlvbjtcbiAgICAgICAgZnVuY3Rpb24gbW91c2VQb3NpdGlvbihlKXtcbiAgICBcbiAgICAgICAgICAgIHJldHVybiB7IHg6IGUuY2xpZW50WCwgeTogZS5jbGllbnRZIH07ICBcbiAgICAgICAgICAgIFxuICAgICAgICB9ICBcbiAgICBcbiAgICAgICAgLy9uYWplY2hhbmllIG5hIG1hcGUgaSBwb2Rzd2lldGxlbmllXG4gICAgICAgIGNvdW50cnlNYXAuZm9yRWFjaChjb3VudHJ5ID0+IHtcbiAgICAgICAgICAgIGNvdW50cnkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlQ291bnRyeVwiKTtcbiAgICAgICAgICAgICAgICB0b29sVGlwLmlubmVyVGV4dCA9IGNvdW50cnkuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgICAgICAgICAgICAgdGl0bGUuaW5uZXJUZXh0ID0gY291bnRyeS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgICBcbiAgICAgICAgICAgICAgICB0b29sVGlwLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgdG9vbFRpcC5zdHlsZS50b3AgPSBtb3VzZVBvc2l0aW9uKHdpbmRvdy5ldmVudCkueSArIFwicHhcIjtcbiAgICAgICAgICAgICAgICB0b29sVGlwLnN0eWxlLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlKDAsMTAwJSlcIjtcbiAgICAgICAgICAgICAgICB0b29sVGlwLnN0eWxlLmxlZnQgPSBtb3VzZVBvc2l0aW9uKHdpbmRvdy5ldmVudCkueCArIFwicHhcIjtcbiAgICAgIFxuICAgICAgICAgICAgfSlcbiAgICBcbiAgICAgICAgICAgIGNvdW50cnkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVDb3VudHJ5XCIpO1xuICAgICAgICAgICAgICAgIHRvb2xUaXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgICBcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgLy93aWRvY3pub3NjIHNla2NqaVxuICAgIFxuICAgICAgICBmdW5jdGlvbiBzaG93U2VjdGlvbihzZWN0aW9uLCBwb3NpdGlvblRvcCl7XG4gICAgICAgICAgICBzZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgc2VjdGlvbi5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICAgICAgc2VjdGlvbi5zdHlsZS50b3AgPSBwb3NpdGlvblRvcDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gc2VjdGlvbi5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKC01MCUsLTUwJSknO1xuICAgIFxuICAgICAgICB9XG4gICAgXG4gICAgICAgXG4gICAgICAgIC8vcG9icmFuaWUgaW5wdXRhIGkgcG9kc3dpZXRsZW5pZSBtYXB5XG4gICAgICAgIFxuICAgIFxuICAgICAgICBmdW5jdGlvbiB2aWV3Q291bnRyeShldmVudCwgbmFtZSl7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgaGlkZVRhYmxlVGlwcyhsaXN0KTtcbiAgICAgICAgICAgIHNob3dTZWN0aW9uKHNlY3Rpb25TZWMsICcwJyk7XG4gICAgICAgICAgICBjb25uZWN0VG9Db3VudHJpZXMoY291bnRyaWVzKTtcbiAgICAgICAgICAgIGNvdW50cnlNYXAuZm9yRWFjaChjb3VudHJ5ID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYXR0ciA9IGNvdW50cnkuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgICAgICAgICAgICAgaWYoYXR0ciA9PT0gbmFtZS52YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50cnkuY2xhc3NMaXN0LmFkZChcInZpc2libGVDb3VudHJ5XCIpOyBcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBzbWFsbE1hcC5mb3JFYWNoKHNtYWxsID0+e1xuICAgICAgICAgICAgICAgIGxldCBhdHRyID0gc21hbGwuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgICAgICAgICAgICAgaWYoYXR0ciA9PT0gbmFtZS52YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgIHNtYWxsLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlQ291bnRyeVwiKTsgXG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIGJ0bi5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcInRydWVcIik7XG4gICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB2aWV3Q291bnRyeShldmVudCwgdGl0bGUpKTtcbiAgICAgIFxuICAgIFxuICAgIFxuICAgIFxuICAgICAgICAvLyBkb2Rhd2FuaWUgbGkgZG8gbGlzdCBpbmZvIGkgd2VhdGhlclxuICAgICAgICBmdW5jdGlvbiBhZGRJdGVtVG9XZWF0aGVyTGlzdChwYXJlbnQsIGl0ZW0sIHRleHQpe1xuICAgICAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICAgICAgbGkuaW5uZXJUZXh0ID0gdGV4dCArIGl0ZW07XG4gICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKFwiZWxSaWdodExpc3RcIik7XG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQobGkpOyAgIFxuICAgICAgICB9XG4gICAgXG4gICAgICAgIGZ1bmN0aW9uIGFkZEl0ZW1Ub0xpc3QoIHBhcmVudCwgaXRlbSwgdGV4dCwgbWFwQ291bnRyeSApe1xuICAgICAgICAgICAgbGV0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuQWRkXCIpO1xuICAgICAgICAgICAgbGV0IG5ld0xpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICAgICAgbmV3TGkuY2xhc3NMaXN0LmFkZChcImVsSW5mb1wiKTtcbiAgICAgICAgICAgIG5ld0xpLmlubmVyVGV4dCA9IHRleHQgKyBpdGVtO1xuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKG5ld0xpKTtcbiAgICAgICAgXG4gICAgXG4gICAgICAgXG4gICAgLy8gcG9kbGFjemVuaWUgZG8gYXBpIHBvZ29keSBpIGRvZGFuaWUgZWxlbWVudG93IGRvIGJveFdlYXRoZXJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHNob3dXZWF0aGVyKCl7XG4gICAgICAgICAgICAgICAgY291bnRyeS5tYXAoZWwgPT4ge1xuICAgICAgICAgICAgICAgICAgIGlmKGVsLm5hbWUgPT09IGl0ZW0pe1xuICAgICAgICAgICAgICAgICAgICBmZXRjaChgaHR0cDovL2FwaS5hcGl4dS5jb20vdjEvY3VycmVudC5qc29uP2tleT0zOGQyNDk3ZmQzYjI0MmU3OGZiMTgyMzE0MTgxNjAxJnE9JHtlbC5jYXBpdGFsfWApXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IGxvY2F0aW9uLCBjdXJyZW50IH0gPSBkYXRhO1xuICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aXRsZVdlYXRoZXJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyLmlubmVyVGV4dCA9IGBXZWF0aGVyIGluICR7bG9jYXRpb24ubmFtZX0gYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB3ZWF0aGVyTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2VhdGhlckxpc3RcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEl0ZW1Ub1dlYXRoZXJMaXN0KHdlYXRoZXJMaXN0LCBjdXJyZW50LnRlbXBfYywgXCJDdXJyZW50IHRlbXBlcmF0dXJlOiBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkSXRlbVRvV2VhdGhlckxpc3Qod2VhdGhlckxpc3QsIGN1cnJlbnQuZmVlbHNsaWtlX2MsIFwiRmVlbHNsaWtlIHRlbXBlcmF0dXJlOiAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEl0ZW1Ub1dlYXRoZXJMaXN0KHdlYXRoZXJMaXN0LCBjdXJyZW50Lmh1bWlkaXR5LCBcIkh1bWlkaXR5OiAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEl0ZW1Ub1dlYXRoZXJMaXN0KHdlYXRoZXJMaXN0LCBjdXJyZW50LnByZXNzdXJlX21iLCBcIlByZXNzdXJlOiAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEl0ZW1Ub1dlYXRoZXJMaXN0KHdlYXRoZXJMaXN0LCBjdXJyZW50LndpbmRfa3BoLCBcIldpbmQga20vaDogIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRJdGVtVG9XZWF0aGVyTGlzdCh3ZWF0aGVyTGlzdCwgY3VycmVudC5jb25kaXRpb24udGV4dCxcIldlYXRoZXIgY29uZGl0aW9uOiAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKFwic3JjXCIsIGN1cnJlbnQuY29uZGl0aW9uLmljb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZy5jbGFzc0xpc3QuYWRkKFwiaWNvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hXZWF0aGVyLmFwcGVuZENoaWxkKGltZyk7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRpbWVQYXJhZ3JhcGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lUGFyYWdyYXBoLmlubmVyVGV4dCA9IGN1cnJlbnQubGFzdF91cGRhdGVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVQYXJhZ3JhcGguY2xhc3NMaXN0LmFkZChcInRpbWVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94V2VhdGhlci5pbnNlcnRCZWZvcmUodGltZVBhcmFncmFwaCwgc3VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbmV3VGltZSA9IGN1cnJlbnQubGFzdF91cGRhdGVkLnNsaWNlKDExLCAxNik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3VGltZVswXSA+PSAyIHx8IG5ld1RpbWVbMF0gPT09ICcwJyAmJiBuZXdUaW1lWzFdIDw9IDUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY29uZC1wYWdlX19saXN0LS1tb29uXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveFdlYXRoZXIuY2xhc3NMaXN0LmFkZChcIm5pZ2h0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY29uZC1wYWdlX19saXN0LS1zdW5cIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94V2VhdGhlci5jbGFzc0xpc3QuYWRkKFwiZGF5XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmFpbCcsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBwbyBrbGlrbmnEmWNpdSBwb2thenVqZSBzaWUgb2tubyB6IHBvZ29kxIVcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzaG93V2VhdGhlcigpO1xuICAgICAgICAgICAgICAgIGJveFdlYXRoZXIuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5pbm5lclRleHQgPSBcIkhpZGUgd2VhdGhlclwiO1xuICAgICAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcInRydWVcIik7XG4gICAgICAgICAgICAgICAgc2Nyb2xsSXQoYm94V2VhdGhlcilcbiAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgIFxuICAgIFxuICAgIFxuICAgICAgICB9XG4gICAgXG4gICAgXG4gICAgICAgICAgICAgICAgICAgLy8gZnVua2NqYSBzY3JvbGwgdG8gZGFuZWogc2VrY2ppXG4gICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gc2Nyb2xsSXQoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xuICAgICAgICAgICAgICAgICAgICAnYmVoYXZpb3InOiAnc21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgJ3RvcCc6IGVsZW1lbnQub2Zmc2V0VG9wXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICBcbiAgICAgICAgLy9wb2RsYWN6ZW5pZSBzaWUgZG8gYXBpIGNvdW50cmllcyBpIHBvYnJhbmllIGRhbnljaCArIGRvbGFjemVuaWUgZG8gbGlzdHlcbiAgICBcbiAgICAgICAgZnVuY3Rpb24gY29ubmVjdFRvQ291bnRyaWVzKGNvdW50cmllcyl7XG4gICAgICAgICAgICBmZXRjaCgnaHR0cHM6Ly9yZXN0Y291bnRyaWVzLmV1L3Jlc3QvdjIvYWxsJylcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgZGF0YUNvdW50cnkgPSBkYXRhO1xuICAgICAgICAgICAgICAgIGxldCBhcnIgPSBbXTtcbiAgICAgICAgICAgICAgICBkYXRhLm1hcChpdGVtID0+e1xuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBuYW1lLCBjYXBpdGFsLCBjdXJyZW5jaWVzLCBsYW5ndWFnZXMsIHBvcHVsYXRpb24gfSA9IGl0ZW07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24gPSBjYXBpdGFsO1xuICAgICAgICAgICAgICAgICAgICBjb3VudHJ5ID0gZGF0YTtcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVuY3kgPSBjdXJyZW5jaWVzLm1hcChjdXJyID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnIubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFuZ3VhZ2UgPSBsYW5ndWFnZXMubWFwKGxhbmcgPT57XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGFuZy5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgIFxuICAgICAgICAgICAgICAgICAgICBsZXQgbGlzdE9mQ291bnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY291bnRyeUxpc3RcIik7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKHRpdGxlLnZhbHVlID09PSBuYW1lKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZEl0ZW1Ub0xpc3QobGlzdE9mQ291bnRyeSwgbmFtZSwgJ05hbWUgb2YgdGhlIGNvdW50cnk6ICcsIGNvdW50cmllcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRJdGVtVG9MaXN0KGxpc3RPZkNvdW50cnksIGNhcGl0YWwsICdDYXBpdGFsOiAnLCBjb3VudHJpZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkSXRlbVRvTGlzdChsaXN0T2ZDb3VudHJ5LCBjdXJyZW5jeSwgJ0N1cnJlbmN5OiAnLCBjb3VudHJpZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkSXRlbVRvTGlzdChsaXN0T2ZDb3VudHJ5LCBsYW5ndWFnZSwgJ0xhbmd1YWdlOiAnLCBjb3VudHJpZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkSXRlbVRvTGlzdChsaXN0T2ZDb3VudHJ5LCBwb3B1bGF0aW9uLCAnUG9wdWxhdGlvbjogJywgY291bnRyaWVzKTtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsZWZ0Qm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsZWZ0Qm94XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEJveC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7aXRlbS5mbGFnfSlgO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdEJveC5jbGFzc0xpc3QuYWRkKFwibGVmdEJveEJhY2tncm91bmRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWNvbmQtcGFnZV9fbGlzdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW1nLnNldEF0dHJpYnV0ZShcInNyY1wiLCBpdGVtLmZsYWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW1nLmNsYXNzTGlzdC5hZGQoXCJmbGFnc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJveC5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcnJcbiAgICAgICAgICAgICAgICB9KSAgXG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZmFpbCcsIGVycm9yKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICBcbiAgICBcbiAgICBcbiAgICAgICAgLy8gYnRuIHRpcHMgd3lzd2lldGxhIHRhYmxpY2UgeiBuYXp3YW1pIGtyYWrDs3cgaSBjaG93YVxuICAgIFxuICAgICAgICAgICAgZnVuY3Rpb24gY3JlYXRlVGFibGVUaXBzKCl7ICAgICBcbiAgICAgICAgICAgICAgICBsaXN0LmNsYXNzTGlzdC5hZGQoXCJ0aXBzXCIpO1xuICAgICAgICAgICAgICAgIGxldCBhcnJheU9mTGkgPSBbXTtcbiAgICAgICAgICAgICAgICBjb25zdCB0aXBzQXJyYXkgPSBjb3VudHJpZXMubWFwKGVsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld0xpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICAgICAgICAgICAgICBuZXdMaS5jbGFzc0xpc3QuYWRkKFwidGlwc0VsZW1lbnRcIik7XG4gICAgICAgICAgICAgICAgICAgIGxpc3QuYXBwZW5kQ2hpbGQobmV3TGkpO1xuICAgICAgICAgICAgICAgICAgICBuZXdMaS5pbm5lclRleHQgPSBlbC50aXRsZTtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKGxpc3QpOyBcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBhcnJheU9mTGkucHVzaChuZXdMaSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcnJheU9mTGk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICBcbiAgICAgICAgICAgICAgICBhcnJheU9mTGkuZm9yRWFjaChlbCA9PntcbiAgICAgICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRleHQgPSB0aGlzLmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlLnZhbHVlID0gdGV4dDtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiB0aXBzQXJyYXk7XG4gICAgXG4gICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICB0aXBzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgaWYobGlzdC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSAhPT0gXCJ0aXBzXCIpe1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVUYWJsZVRpcHMoKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGhpZGVUYWJsZVRpcHMoKTtcbiAgICAgICAgICAgICAgICAgICAgdGlwcy5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcInRydWVcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgXG4gICAgICAgICAgICBmdW5jdGlvbiBoaWRlVGFibGVUaXBzKCl7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGlzdC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICBcbiAgICBcbiAgICAgICAgLy93eWrFm2NpZSB6IGRydWdpZWogc2VrY2ppXG4gICAgXG4gICAgICAgIGV4aXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgXG4gICAgICAgICAgICBzZWN0aW9uU2VjLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgXG4gICAgXG4gICAgXG4gICAgICAgIC8vIHByemVqxZtjaWUgZG8gc2VrY2ppIC0gIGxpc3RhIGkgd3lqxZtjaWUgeiBzZWtjamlcbiAgICBcbiAgICBcbiAgICAgICAgLy8gbGlzdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gICAgIHNob3dTZWN0aW9uKGxpc3RTZWN0aW9uLCAnMTIwJScpO1xuICAgICAgICAvLyAgICAgc2Nyb2xsSXQobGlzdFNlY3Rpb24pO1xuICAgICAgICAvLyB9KTtcbiAgICBcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNleGl0TGlzdFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGxpc3RTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgfSlcbiAgICBcbiAgICBcbiAgICAgICAgLy8gZG9kYW5pZSBkbyBsaXN0eSDFvHljemXFhFxuICAgIFxuICAgICAgICAgZnVuY3Rpb24gc2F2ZURhdGFUb0RCKGl0ZW0sIHVzZXIpIHtcbiAgICAgICAgICAgIGFycmF5LnB1c2goaXRlbSk7XG4gICAgICAgIFxuICAgICAgICAgICAgZGF0YWJhc2UucmVmKCdpdGVtJykuc2V0KHtcbiAgICAgICAgICAgICAgICBjb3VudHJ5OiBhcnJheSxcbiAgICBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBkYXRhYmFzZS5yZWYoJ3VzZXInKS5zZXQoe1xuICAgICAgICAgICAgICAgIHVzZXI6IGZpcmViYXNlLmF1dGgoKS5jdXJyZW50VXNlci51aWQsXG4gICAgXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIGZ1bmN0aW9uIHN3aWNoTGlzdEl0ZW0ocGFyZW50KXtcbiAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBsaXN0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmVsSW5mb1wiKTtcbiAgICAgICAgICAgIGxldCBjb3VudHJ5ID0gbGlzdEVsWzBdLmlubmVyVGV4dDtcbiAgICAgICAgICAgIGFkZEl0ZW1Ub0xpc3QocGFyZW50LCBjb3VudHJ5LCAnJyApO1xuICAgICAgICAgICAgc2F2ZURhdGFUb0RCKGNvdW50cnkpO1xuICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIFxuICAgICAgIFxuICAgICAgICB2aXNpdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHNob3dTZWN0aW9uKGxpc3RTZWN0aW9uLCAnMTIwJScpO1xuICAgICAgICAgICAgc2Nyb2xsSXQobGlzdFNlY3Rpb24pO1xuICAgICAgICAgICAgc3dpY2hMaXN0SXRlbSh3aXNoTGlzdCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhcnJheSk7XG4gICAgICAgIH0pO1xuICAgICAgIFxuICAgICAgICBhZGRWaXNpdGVkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2hvd1NlY3Rpb24obGlzdFNlY3Rpb24sICcxMjAlJyk7XG4gICAgICAgICAgICBzY3JvbGxJdChsaXN0U2VjdGlvbik7XG4gICAgICAgICAgICBzd2ljaExpc3RJdGVtKHZpc2l0ZWRMaXN0KTtcbiAgICAgICAgfSlcbiAgICBcbiAgICBcbiAgICBcbiAgICB9KSJdfQ==
