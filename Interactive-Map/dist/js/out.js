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

    //funkcja chowająca element 
    function hideElement(element) {

        element.className = "hide";
    }

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
        hideElement(list);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9hcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLFNBQVMsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVU7O0FBR2hEO0FBQ0EsUUFBTSxTQUFTO0FBQ1gsZ0JBQVEseUNBREc7QUFFWCxvQkFBWSx1Q0FGRDtBQUdYLHFCQUFhLDhDQUhGO0FBSVgsbUJBQVcsdUJBSkE7QUFLWCx1QkFBZSxtQ0FMSjtBQU1YLDJCQUFtQjtBQU5SLEtBQWY7QUFRQSxhQUFTLGFBQVQsQ0FBdUIsTUFBdkI7QUFDQSxRQUFNLFdBQVcsU0FBUyxRQUFULEVBQWpCOztBQUVBO0FBQ0EsUUFBTSxRQUFRLFNBQVMsY0FBVCxDQUF3QixPQUF4QixDQUFkO0FBQ0EsUUFBTSxTQUFTLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFmO0FBQ0EsUUFBTSxTQUFTLFNBQVMsY0FBVCxDQUF3QixRQUF4QixDQUFmO0FBQ0EsUUFBTSxjQUFjLFNBQVMsY0FBVCxDQUF3QixZQUF4QixDQUFwQjtBQUNBLFFBQU0sYUFBYSxTQUFTLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBbkI7QUFDQSxRQUFNLE9BQU8sU0FBUyxjQUFULENBQXdCLFlBQXhCLENBQWI7QUFDQSxRQUFNLFFBQVEsRUFBZDs7QUFFQTs7QUFFQTtBQUNBLFVBQU0sZ0JBQU4sQ0FBdUIsT0FBdkIsRUFBZ0MsYUFBSTtBQUNoQyxpQkFBUyxjQUFULENBQXdCLFdBQXhCLEVBQXFDLEtBQXJDLENBQTJDLE9BQTNDLEdBQXFELE9BQXJEO0FBRUgsS0FIRDs7QUFLQTs7QUFFQSxXQUFPLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLGFBQUs7QUFDbEMsaUJBQVMsSUFBVCxHQUFnQixPQUFoQjtBQUNILEtBRkQ7QUFHQTtBQUNBLFdBQU8sZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsYUFBSztBQUNsQyxpQkFBUyxjQUFULENBQXdC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QUF6QjtBQUNBLGlCQUFTLFdBQVQ7QUFDQSxzQkFBYyxXQUFkO0FBQ0gsS0FKRDtBQVFILENBbmNMIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGZ1bmN0aW9uKCl7XG4gICAgXG4gICAgXG4gICAgICAgIC8vZmlyZWJhc2UgaW50ZXJhY3RpdmUtbWFwXG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgICAgIGFwaUtleTogXCJBSXphU3lBZFdLZ3JxdWl0VlBZVlphaWVWMlpaRkpLQzk1SWVsOThcIixcbiAgICAgICAgICAgIGF1dGhEb21haW46IFwiaW50ZXJhY3RpdmUtbWFwLWY1MDYwLmZpcmViYXNlYXBwLmNvbVwiLFxuICAgICAgICAgICAgZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly9pbnRlcmFjdGl2ZS1tYXAtZjUwNjAuZmlyZWJhc2Vpby5jb21cIixcbiAgICAgICAgICAgIHByb2plY3RJZDogXCJpbnRlcmFjdGl2ZS1tYXAtZjUwNjBcIixcbiAgICAgICAgICAgIHN0b3JhZ2VCdWNrZXQ6IFwiaW50ZXJhY3RpdmUtbWFwLWY1MDYwLmFwcHNwb3QuY29tXCIsXG4gICAgICAgICAgICBtZXNzYWdpbmdTZW5kZXJJZDogXCI1OTU4NjE2NTA2MzBcIlxuICAgICAgICAgIH07XG4gICAgICAgIGZpcmViYXNlLmluaXRpYWxpemVBcHAoY29uZmlnKTtcbiAgICAgICAgY29uc3QgZGF0YWJhc2UgPSBmaXJlYmFzZS5kYXRhYmFzZSgpO1xuICAgIFxuICAgICAgICAvL2VsZW1lbnR5IGRvIGxvZ293YW5pYVxuICAgICAgICBjb25zdCBsb2dJbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9nSW5cIik7XG4gICAgICAgIGNvbnN0IHNpZ25JbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lnbkluXCIpO1xuICAgICAgICBjb25zdCBsb2dPdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ091dFwiKTtcbiAgICAgICAgY29uc3QgYnRuU2VuZFNpZ24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbmRTaWduSW5cIik7XG4gICAgICAgIGNvbnN0IGJ0blNlbmRMb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlbmRMb2dJblwiKTtcbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lnbkluRm9ybVwiKTtcbiAgICAgICAgY29uc3QgYXJyYXkgPSBbXTtcbiAgICAgICBcbiAgICAgICAgLy9wb2theiBmb3JtdWxhcnogZG8gbG9nb3dhbmlhXG4gICAgICBcbiAgICAgICAgLy8gbG9nT3V0LmNsYXNzTGlzdC5hZGQoXCJoaWRlXCIpO1xuICAgICAgICBsb2dJbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PntcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dJbkZvcm0nKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgXG4gICAgICAgIC8vd3lsb2dvd2FuaWUgc2llIHV6eXRrb3duaWthXG4gICAgXG4gICAgICAgIGxvZ091dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgICAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbk91dCgpXG4gICAgICAgIH0pXG4gICAgICAgIC8vcG9rYXogZm9ybXVsYXJ6IGRvIHJlamVzdHJhY2ppXG4gICAgICAgIHNpZ25Jbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2lnbkluRm9ybScpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgLy96YWxvZ293YW5pZSB1enl0a293bmlrYVxuICAgICAgXG4gICAgICAgIGJ0blNlbmRMb2cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgcGFzc3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhc3N3b3JkXCIpLnZhbHVlO1xuICAgICAgICAgICAgY29uc3QgZW1haWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVtYWlsXCIpLnZhbHVlXG4gICAgICAgICAgICBjb25zdCBhdXRoID0gZmlyZWJhc2UuYXV0aCgpO1xuICAgIFxuICAgICAgICAgICAgY29uc3QgcHJvbWlzZSA9IGF1dGguc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWwsIHBhc3N3KTtcbiAgICAgICAgICAgIHByb21pc2UuY2F0Y2goZSA9PiBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpKTtcbiAgICBcbiAgICAgXG4gICAgICAgIH0pXG4gICAgXG4gICAgICAgIC8vcmVqZXN0cmFjamEgbm93ZWdvIHV6eXRrb3duaWthXG4gICAgICAgIGJ0blNlbmRTaWduLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHBhc3N3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXNzd29yZFwiKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbWFpbFwiKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGF1dGggPSBmaXJlYmFzZS5hdXRoKCk7XG4gICAgXG4gICAgICAgICAgICBjb25zdCBwcm9taXNlID0gYXV0aC5jcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWwsIHBhc3N3KTtcbiAgICAgICAgICAgIHByb21pc2UuY2F0Y2goZSA9PiBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpKTtcbiAgICBcbiAgICAgICAgfSlcbiAgICBcbiAgICBcbiAgICAgICAgZmlyZWJhc2UuYXV0aCgpLm9uQXV0aFN0YXRlQ2hhbmdlZChmdW5jdGlvbih1c2VyKXtcbiAgICAgICAgICAgIGlmKHVzZXIpeyAgIFxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVzZXIgKyBcImxvZ2dlZCBpblwiICsgZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZCk7XG4gICAgICAgICAgICAgICAgbG9nT3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbm90IGxvZ2dlZCBpbicpO1xuICAgICAgICAgICAgICAgIGxvZ091dC5jbGFzc0xpc3QuYWRkKFwiaGlkZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgLy96bWllbm5lXG4gICAgICAgIGxldCBpbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21hcFwiKTtcbiAgICAgICAgbGV0IGNvdW50cnlNYXAgPSBpbWcucXVlcnlTZWxlY3RvckFsbChcInBhdGhcIik7XG4gICAgICAgIGxldCBpbWdTbWFsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFwU2VjXCIpO1xuICAgICAgICBsZXQgc21hbGxNYXAgPSBpbWdTbWFsbC5xdWVyeVNlbGVjdG9yQWxsKFwicGF0aFwiKTtcbiAgICAgICAgbGV0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb3VudHJ5TmFtZVwiKTtcbiAgICAgICAgbGV0IHRvb2xUaXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rvb2xUaXBcIik7XG4gICAgICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2hlYWRlclwiKTtcbiAgICBcbiAgICAgICAgbGV0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYnRuXCIpO1xuICAgICAgICBsZXQgdGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGlwQnRuXCIpO1xuICAgICAgICBsZXQgbGlzdEJ0biA9IGJ0bi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgIFxuICAgIFxuICAgICAgICBsZXQgbGlzdCA9IGhlYWRlci5xdWVyeVNlbGVjdG9yKFwidWxcIik7XG4gICAgICAgIGxldCBzZWN0aW9uU2VjID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhYm92ZVNlY1wiKTtcbiAgICAgICAgbGV0IGFwaUtleVdldCA9ICdmNDc3OWM4NWYxNzNiYzY5YTUyOWRkZDNhYjZlOTc3MCc7XG4gICAgICAgIGxldCBhcGlLZXlUaW1lID0gJ0FMUUE3MEg4OFRCNyc7XG4gICAgICAgIGxldCBleGl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNleGl0QnRuXCIpO1xuICAgICAgIFxuICAgICAgICBsZXQgYm94V2VhdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2VhdGhlckJveFwiKTtcbiAgICAgICAgbGV0IGNvdW50cnlJbmZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb3VudHJ5TGlzdFwiKTtcbiAgICAgICAgbGV0IHN1biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3VuXCIpO1xuICAgICAgICBsZXQgbW9vbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9vblwiKTtcbiAgICAgICAgbGV0IGxpdHRsZU1vb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xpdHRsZU1vb25cIik7XG4gICAgICAgIGxldCBsb2NhdGlvbiA9IG51bGw7XG4gICAgICAgIGxldCBjb3VudHJ5ID0gbnVsbDtcbiAgICAgICAgbGV0IGRhdGFDb3VudHJ5ID0gbnVsbDtcbiAgICAgICBcbiAgICAgICAgbGV0IGxpc3RTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0X19ib3hcIik7XG4gICAgICAgIGxldCB2aXNpdGVkTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGlzdFZpc2l0ZWRcIik7XG4gICAgICAgIGxldCB3aXNoTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGlzdFdpc2hcIik7XG4gICAgICAgIGxldCB2aXNpdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkVG9WaXNpdFwiKTtcbiAgICAgICAgbGV0IGFkZFZpc2l0ZWRCdG4gPSB2aXNpdEJ0bi5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgIFxuICAgIFxuICAgICAgICAvL2Z1bmtjamEgY2hvd2FqxIVjYSBlbGVtZW50IFxuICAgICAgICBmdW5jdGlvbiBoaWRlRWxlbWVudChlbGVtZW50KXtcbiAgICAgICAgICAgIFxuICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IFwiaGlkZVwiO1xuICAgICAgICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgXG4gICAgICAgIC8vIHRhYmxpY2Egb2JpZWt0b3cga3JhamUgaWQgaSBuYXp3eVxuICAgICAgICBsZXQgY291bnRyaWVzID0gW11cbiAgICBcbiAgICAgICAgY291bnRyeU1hcC5mb3JFYWNoKGNvdW50cnkgPT4ge1xuICAgICAgICAgICAgaWYodHlwZW9mIGNvdW50cnkgIT09ICcnKXtcbiAgICAgICAgICAgICAgICBjb3VudHJpZXMucHVzaCh7aWQ6IGNvdW50cnkuaWQsIHRpdGxlOiBjb3VudHJ5LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvdW50cmllcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgLy9zbWFsbCBtYXAgLSBwb2Rzd2lldGxlbmllIHd5YnJhbmVnbyBrcmFqdVxuICAgICAgICBsZXQgc21hbGxDb3VudHJpZXMgPSBbXVxuICAgICAgICBcbiAgICAgICAgICAgIHNtYWxsTWFwLmZvckVhY2goY291bnRyeSA9PiB7XG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIGNvdW50cnkgIT09ICcnKXtcbiAgICAgICAgICAgICAgICAgICAgc21hbGxDb3VudHJpZXMucHVzaCh7aWQ6IGNvdW50cnkuaWQsIHRpdGxlOiBjb3VudHJ5LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNtYWxsQ291bnRyaWVzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgXG4gICAgICAgIC8vcG96eWNqYSBrdXJzb3JhXG4gICAgICAgIHdpbmRvdy5vbm1vdXNlbW92ZSA9IG1vdXNlUG9zaXRpb247XG4gICAgICAgIGZ1bmN0aW9uIG1vdXNlUG9zaXRpb24oZSl7XG4gICAgICAgICAgICByZXR1cm4geyB4OiBlLmNsaWVudFgsIHk6IGUuY2xpZW50WSB9OyAgXG4gICAgICAgIH0gIFxuICAgIFxuICAgICAgICAvL25hamVjaGFuaWUgbmEgbWFwZSBpIHBvZHN3aWV0bGVuaWVcbiAgICAgICAgY291bnRyeU1hcC5mb3JFYWNoKGNvdW50cnkgPT4ge1xuICAgICAgICAgICAgY291bnRyeS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChcInZpc2libGVDb3VudHJ5XCIpO1xuICAgICAgICAgICAgICAgIHRvb2xUaXAuaW5uZXJUZXh0ID0gY291bnRyeS5nZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiKTtcbiAgICAgICAgICAgICAgICB0aXRsZS5pbm5lclRleHQgPSBjb3VudHJ5LmdldEF0dHJpYnV0ZShcInRpdGxlXCIpO1xuICAgIFxuICAgICAgICAgICAgICAgIHRvb2xUaXAuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICB0b29sVGlwLnN0eWxlLnRvcCA9IG1vdXNlUG9zaXRpb24od2luZG93LmV2ZW50KS55ICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIHRvb2xUaXAuc3R5bGUudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoMCwxMDAlKVwiO1xuICAgICAgICAgICAgICAgIHRvb2xUaXAuc3R5bGUubGVmdCA9IG1vdXNlUG9zaXRpb24od2luZG93LmV2ZW50KS54ICsgXCJweFwiO1xuICAgICAgXG4gICAgICAgICAgICB9KVxuICAgIFxuICAgICAgICAgICAgY291bnRyeS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVDb3VudHJ5XCIpO1xuICAgICAgICAgICAgICAgIHRvb2xUaXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgICBcbiAgICAgICAgfSlcbiAgICBcbiAgICAgICAgLy93aWRvY3pub3NjIHNla2NqaVxuICAgIFxuICAgICAgICBmdW5jdGlvbiBzaG93U2VjdGlvbihzZWN0aW9uLCBwb3NpdGlvblRvcCl7XG4gICAgICAgICAgICBzZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgc2VjdGlvbi5zdHlsZS5vcGFjaXR5ID0gJzEnO1xuICAgICAgICAgICAgc2VjdGlvbi5zdHlsZS50b3AgPSBwb3NpdGlvblRvcDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gc2VjdGlvbi5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlKC01MCUsLTUwJSknO1xuICAgIFxuICAgICAgICB9XG4gICAgXG4gICAgICAgXG4gICAgICAgIC8vcG9icmFuaWUgaW5wdXRhIGkgcG9kc3dpZXRsZW5pZSBtYXB5XG4gICAgXG4gICAgICAgIGZ1bmN0aW9uIHZpZXdDb3VudHJ5KGV2ZW50LCBuYW1lKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBoaWRlRWxlbWVudChsaXN0KTtcbiAgICAgICAgICAgIHNob3dTZWN0aW9uKHNlY3Rpb25TZWMsICcwJyk7XG4gICAgICAgICAgICBjb25uZWN0VG9Db3VudHJpZXMoY291bnRyaWVzKTtcbiAgICAgICAgICAgIGNvdW50cnlNYXAuZm9yRWFjaChjb3VudHJ5ID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgYXR0ciA9IGNvdW50cnkuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgICAgICAgICAgICAgaWYoYXR0ciA9PT0gbmFtZS52YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50cnkuY2xhc3NMaXN0LmFkZChcInZpc2libGVDb3VudHJ5XCIpOyBcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBzbWFsbE1hcC5mb3JFYWNoKHNtYWxsID0+e1xuICAgICAgICAgICAgICAgIGxldCBhdHRyID0gc21hbGwuZ2V0QXR0cmlidXRlKFwidGl0bGVcIik7XG4gICAgICAgICAgICAgICAgaWYoYXR0ciA9PT0gbmFtZS52YWx1ZSl7XG4gICAgICAgICAgICAgICAgICAgIHNtYWxsLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlQ291bnRyeVwiKTsgXG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIGJ0bi5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcInRydWVcIik7XG4gICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB2aWV3Q291bnRyeShldmVudCwgdGl0bGUpKTtcbiAgICAgIFxuXG4gICAgXG4gICAgICAgIC8vIGRvZGF3YW5pZSBsaSBkbyBsaXN0IGluZm8gaSB3ZWF0aGVyXG4gICAgICAgIGZ1bmN0aW9uIGFkZEl0ZW1Ub1dlYXRoZXJMaXN0KHBhcmVudCwgaXRlbSwgdGV4dCl7XG4gICAgICAgICAgICBsZXQgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgICAgICBsaS5pbm5lclRleHQgPSB0ZXh0ICsgaXRlbTtcbiAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoXCJlbFJpZ2h0TGlzdFwiKTtcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChsaSk7ICAgXG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgZnVuY3Rpb24gYWRkSXRlbVRvTGlzdCggcGFyZW50LCBpdGVtLCB0ZXh0LCBtYXBDb3VudHJ5ICl7XG4gICAgICAgICAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG5BZGRcIik7XG4gICAgICAgICAgICBsZXQgbmV3TGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgICAgICBuZXdMaS5jbGFzc0xpc3QuYWRkKFwiZWxJbmZvXCIpO1xuICAgICAgICAgICAgbmV3TGkuaW5uZXJUZXh0ID0gdGV4dCArIGl0ZW07XG4gICAgICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQobmV3TGkpO1xuICAgICAgICBcbiAgICBcbiAgICAgICAgICAgIC8vIHBvZGxhY3plbmllIGRvIGFwaSBwb2dvZHkgaSBkb2RhbmllIGVsZW1lbnRvdyBkbyBib3hXZWF0aGVyXG4gICAgICAgICAgICBmdW5jdGlvbiBzaG93V2VhdGhlcigpe1xuICAgICAgICAgICAgICAgIGNvdW50cnkubWFwKGVsID0+IHtcbiAgICAgICAgICAgICAgICAgICBpZihlbC5uYW1lID09PSBpdGVtKXtcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2goYGh0dHA6Ly9hcGkuYXBpeHUuY29tL3YxL2N1cnJlbnQuanNvbj9rZXk9MzhkMjQ5N2ZkM2IyNDJlNzhmYjE4MjMxNDE4MTYwMSZxPSR7ZWwuY2FwaXRhbH1gKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBsb2NhdGlvbiwgY3VycmVudCB9ID0gZGF0YTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVXZWF0aGVyXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlci5pbm5lclRleHQgPSBgV2VhdGhlciBpbiAke2xvY2F0aW9uLm5hbWV9IGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgd2VhdGhlckxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlYXRoZXJMaXN0XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRJdGVtVG9XZWF0aGVyTGlzdCh3ZWF0aGVyTGlzdCwgY3VycmVudC50ZW1wX2MsIFwiQ3VycmVudCB0ZW1wZXJhdHVyZTogXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEl0ZW1Ub1dlYXRoZXJMaXN0KHdlYXRoZXJMaXN0LCBjdXJyZW50LmZlZWxzbGlrZV9jLCBcIkZlZWxzbGlrZSB0ZW1wZXJhdHVyZTogIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRJdGVtVG9XZWF0aGVyTGlzdCh3ZWF0aGVyTGlzdCwgY3VycmVudC5odW1pZGl0eSwgXCJIdW1pZGl0eTogIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRJdGVtVG9XZWF0aGVyTGlzdCh3ZWF0aGVyTGlzdCwgY3VycmVudC5wcmVzc3VyZV9tYiwgXCJQcmVzc3VyZTogIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRJdGVtVG9XZWF0aGVyTGlzdCh3ZWF0aGVyTGlzdCwgY3VycmVudC53aW5kX2twaCwgXCJXaW5kIGttL2g6ICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkSXRlbVRvV2VhdGhlckxpc3Qod2VhdGhlckxpc3QsIGN1cnJlbnQuY29uZGl0aW9uLnRleHQsXCJXZWF0aGVyIGNvbmRpdGlvbjogIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZShcInNyY1wiLCBjdXJyZW50LmNvbmRpdGlvbi5pY29uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWcuY2xhc3NMaXN0LmFkZChcImljb25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94V2VhdGhlci5hcHBlbmRDaGlsZChpbWcpO1xuICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aW1lUGFyYWdyYXBoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZVBhcmFncmFwaC5pbm5lclRleHQgPSBjdXJyZW50Lmxhc3RfdXBkYXRlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lUGFyYWdyYXBoLmNsYXNzTGlzdC5hZGQoXCJ0aW1lXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveFdlYXRoZXIuaW5zZXJ0QmVmb3JlKHRpbWVQYXJhZ3JhcGgsIHN1bik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1RpbWUgPSBjdXJyZW50Lmxhc3RfdXBkYXRlZC5zbGljZSgxMSwgMTYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ld1RpbWVbMF0gPj0gMiB8fCBuZXdUaW1lWzBdID09PSAnMCcgJiYgbmV3VGltZVsxXSA8PSA1KXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWNvbmQtcGFnZV9fbGlzdC0tbW9vblwiKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hXZWF0aGVyLmNsYXNzTGlzdC5hZGQoXCJuaWdodFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWNvbmQtcGFnZV9fbGlzdC0tc3VuXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveFdlYXRoZXIuY2xhc3NMaXN0LmFkZChcImRheVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZhaWwnLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gcG8ga2xpa25pxJljaXUgcG9rYXp1amUgc2llIG9rbm8geiBwb2dvZMSFXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2hvd1dlYXRoZXIoKTtcbiAgICAgICAgICAgICAgICBib3hXZWF0aGVyLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcbiAgICAgICAgICAgICAgICBidXR0b24uaW5uZXJUZXh0ID0gXCJIaWRlIHdlYXRoZXJcIjtcbiAgICAgICAgICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJ0cnVlXCIpO1xuICAgICAgICAgICAgICAgIHNjcm9sbEl0KGJveFdlYXRoZXIpXG4gICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICBcbiAgICBcbiAgICBcbiAgICAgICAgfVxuICAgIFxuICAgIFxuICAgICAgICAvLyBmdW5rY2phIHNjcm9sbCB0byBkYW5laiBzZWtjamlcbiAgICAgICAgZnVuY3Rpb24gc2Nyb2xsSXQoZWxlbWVudCkge1xuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcbiAgICAgICAgICAgICAgICAnYmVoYXZpb3InOiAnc21vb3RoJyxcbiAgICAgICAgICAgICAgICAndG9wJzogZWxlbWVudC5vZmZzZXRUb3BcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgXG4gICAgXG4gICAgICAgIC8vcG9kbGFjemVuaWUgc2llIGRvIGFwaSBjb3VudHJpZXMgaSBwb2JyYW5pZSBkYW55Y2ggKyBkb2xhY3plbmllIGRvIGxpc3R5XG4gICAgXG4gICAgICAgIGZ1bmN0aW9uIGNvbm5lY3RUb0NvdW50cmllcyhjb3VudHJpZXMpe1xuICAgICAgICAgICAgZmV0Y2goJ2h0dHBzOi8vcmVzdGNvdW50cmllcy5ldS9yZXN0L3YyL2FsbCcpXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgICAgIGRhdGFDb3VudHJ5ID0gZGF0YTtcbiAgICAgICAgICAgICAgICBsZXQgYXJyID0gW107XG4gICAgICAgICAgICAgICAgZGF0YS5tYXAoaXRlbSA9PntcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgbmFtZSwgY2FwaXRhbCwgY3VycmVuY2llcywgbGFuZ3VhZ2VzLCBwb3B1bGF0aW9uIH0gPSBpdGVtO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uID0gY2FwaXRhbDtcbiAgICAgICAgICAgICAgICAgICAgY291bnRyeSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbmN5ID0gY3VycmVuY2llcy5tYXAoY3VyciA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJyLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhbmd1YWdlID0gbGFuZ3VhZ2VzLm1hcChsYW5nID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxhbmcubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxpc3RPZkNvdW50cnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvdW50cnlMaXN0XCIpO1xuICAgIFxuICAgICAgICAgICAgICAgICAgICBpZih0aXRsZS52YWx1ZSA9PT0gbmFtZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRJdGVtVG9MaXN0KGxpc3RPZkNvdW50cnksIG5hbWUsICdOYW1lIG9mIHRoZSBjb3VudHJ5OiAnLCBjb3VudHJpZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkSXRlbVRvTGlzdChsaXN0T2ZDb3VudHJ5LCBjYXBpdGFsLCAnQ2FwaXRhbDogJywgY291bnRyaWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZEl0ZW1Ub0xpc3QobGlzdE9mQ291bnRyeSwgY3VycmVuY3ksICdDdXJyZW5jeTogJywgY291bnRyaWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZEl0ZW1Ub0xpc3QobGlzdE9mQ291bnRyeSwgbGFuZ3VhZ2UsICdMYW5ndWFnZTogJywgY291bnRyaWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZEl0ZW1Ub0xpc3QobGlzdE9mQ291bnRyeSwgcG9wdWxhdGlvbiwgJ1BvcHVsYXRpb246ICcsIGNvdW50cmllcyk7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbGVmdEJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbGVmdEJveFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRCb3guc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2l0ZW0uZmxhZ30pYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRCb3guY2xhc3NMaXN0LmFkZChcImxlZnRCb3hCYWNrZ3JvdW5kXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYXJyOyBcbiAgICAgICAgICAgICAgICAgICAgfSAgXG4gICAgICAgICAgICAgICAgfSkgIFxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZhaWwnLCBlcnJvcik7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgXG4gICAgXG4gICAgXG4gICAgICAgIC8vIGJ0biB0aXBzIHd5c3dpZXRsYSB0YWJsaWNlIHogbmF6d2FtaSBrcmFqw7N3IGkgY2hvd2FcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlVGFibGVUaXBzKCl7ICAgICBcbiAgICAgICAgICAgIGxpc3QuY2xhc3NMaXN0LmFkZChcInRpcHNcIik7XG4gICAgICAgICAgICBsZXQgYXJyYXlPZkxpID0gW107XG4gICAgICAgICAgICBjb25zdCB0aXBzQXJyYXkgPSBjb3VudHJpZXMubWFwKGVsID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3TGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgICAgICAgICAgbmV3TGkuY2xhc3NMaXN0LmFkZChcInRpcHNFbGVtZW50XCIpO1xuICAgICAgICAgICAgICAgIGxpc3QuYXBwZW5kQ2hpbGQobmV3TGkpO1xuICAgICAgICAgICAgICAgIG5ld0xpLmlubmVyVGV4dCA9IGVsLnRpdGxlO1xuICAgICAgICAgICAgICAgIGhlYWRlci5hcHBlbmRDaGlsZChsaXN0KTsgXG4gICAgXG4gICAgICAgICAgICAgICAgYXJyYXlPZkxpLnB1c2gobmV3TGkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhcnJheU9mTGk7XG4gICAgICAgICAgICB9KVxuICAgIFxuICAgICAgICAgICAgYXJyYXlPZkxpLmZvckVhY2goZWwgPT57XG4gICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRleHQgPSB0aGlzLmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGUudmFsdWUgPSB0ZXh0O1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRpcHNBcnJheTtcbiAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgIC8vcG8ga2xpa25pxJljaXUgbmEgYnRuIHBva2F6YW5pZSB0YWJsaWN5IHRpcHMgaSB3ecWCxIVjemVuaWUgZ3V6aWthXG4gICAgICAgIHRpcHMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmKGxpc3QuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgIT09IFwidGlwc1wiKXtcbiAgICAgICAgICAgICAgICBjcmVhdGVUYWJsZVRpcHMoKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBoaWRlRWxlbWVudChsaXN0KTtcbiAgICAgICAgICAgICAgICB0aXBzLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwidHJ1ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9KVxuICAgICAgICAgICAgXG5cbiAgICAgICAgLy93eWrFm2NpZSB6IGRydWdpZWogc2VrY2ppXG4gICAgXG4gICAgICAgIGV4aXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGhpZGVFbGVtZW50KHNlY3Rpb25TZWMpKTtcbiAgICBcbiAgICBcbiAgICBcbiAgICAgICAgLy8gcHJ6ZWrFm2NpZSBkbyBzZWtjamkgLSAgbGlzdGEgaSB3eWrFm2NpZSB6IHNla2NqaVxuICAgIFxuICAgIFxuICAgICAgICAvLyBsaXN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICAvLyAgICAgc2hvd1NlY3Rpb24obGlzdFNlY3Rpb24sICcxMjAlJyk7XG4gICAgICAgIC8vICAgICBzY3JvbGxJdChsaXN0U2VjdGlvbik7XG4gICAgICAgIC8vIH0pO1xuICAgIFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V4aXRMaXN0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoaWRlRWxlbWVudChsaXN0U2VjdGlvbikpO1xuICAgIFxuICAgIFxuICAgICAgICAvLyBkb2RhbmllIGRvIGxpc3R5IMW8eWN6ZcWEXG4gICAgXG4gICAgICAgICBmdW5jdGlvbiBzYXZlRGF0YVRvREIoaXRlbSwgdXNlcikge1xuICAgICAgICAgICAgYXJyYXkucHVzaChpdGVtKTtcbiAgICAgICAgXG4gICAgICAgICAgICBkYXRhYmFzZS5yZWYoJ2l0ZW0nKS5zZXQoe1xuICAgICAgICAgICAgICAgIGNvdW50cnk6IGFycmF5LFxuICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGRhdGFiYXNlLnJlZigndXNlcicpLnNldCh7XG4gICAgICAgICAgICAgICAgdXNlcjogZmlyZWJhc2UuYXV0aCgpLmN1cnJlbnRVc2VyLnVpZCxcbiAgICBcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgZnVuY3Rpb24gc3dpY2hMaXN0SXRlbShwYXJlbnQpe1xuICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGxpc3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZWxJbmZvXCIpO1xuICAgICAgICAgICAgbGV0IGNvdW50cnkgPSBsaXN0RWxbMF0uaW5uZXJUZXh0O1xuICAgICAgICAgICAgYWRkSXRlbVRvTGlzdChwYXJlbnQsIGNvdW50cnksICcnICk7XG4gICAgICAgICAgICBzYXZlRGF0YVRvREIoY291bnRyeSk7XG4gICAgICAgICAgIFxuICAgICAgICB9XG4gICAgXG4gICAgICAgXG4gICAgICAgIHZpc2l0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgc2hvd1NlY3Rpb24obGlzdFNlY3Rpb24sICcxMjAlJyk7XG4gICAgICAgICAgICBzY3JvbGxJdChsaXN0U2VjdGlvbik7XG4gICAgICAgICAgICBzd2ljaExpc3RJdGVtKHdpc2hMaXN0KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGFycmF5KTtcbiAgICAgICAgfSk7XG4gICAgICAgXG4gICAgICAgIGFkZFZpc2l0ZWRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzaG93U2VjdGlvbihsaXN0U2VjdGlvbiwgJzEyMCUnKTtcbiAgICAgICAgICAgIHNjcm9sbEl0KGxpc3RTZWN0aW9uKTtcbiAgICAgICAgICAgIHN3aWNoTGlzdEl0ZW0odmlzaXRlZExpc3QpO1xuICAgICAgICB9KVxuICAgIFxuICAgIFxuICAgIFxuICAgIH0pIl19
