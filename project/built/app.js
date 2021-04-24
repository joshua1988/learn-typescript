var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// utils
function $(selector) {
    return document.querySelector(selector);
}
function getUnixTimestamp(date) {
    return new Date(date).getTime();
}
// DOM
var confirmedTotal = $(".confirmed-total");
var deathsTotal = $(".deaths");
var recoveredTotal = $(".recovered");
var lastUpdatedTime = $(".last-updated-time");
var rankList = $(".rank-list");
var deathsList = $(".deaths-list");
var recoveredList = $(".recovered-list");
var deathSpinner = createSpinnerElement("deaths-spinner");
var recoveredSpinner = createSpinnerElement("recovered-spinner");
function createSpinnerElement(id) {
    var wrapperDiv = document.createElement("div");
    wrapperDiv.setAttribute("id", id);
    wrapperDiv.setAttribute("class", "spinner-wrapper flex justify-center align-center");
    var spinnerDiv = document.createElement("div");
    spinnerDiv.setAttribute("class", "ripple-spinner");
    spinnerDiv.appendChild(document.createElement("div"));
    spinnerDiv.appendChild(document.createElement("div"));
    wrapperDiv.appendChild(spinnerDiv);
    return wrapperDiv;
}
// state
var isDeathLoading = false;
var isRecoveredLoading = false;
// api
function fetchCovidSummary() {
    var url = "https://api.covid19api.com/summary";
    return axios.get(url);
}
function fetchCountryInfo(countryCode, status) {
    // params: confirmed, recovered, deaths
    var url = "https://api.covid19api.com/country/" + countryCode + "/status/" + status;
    return axios.get(url);
}
// methods
function startApp() {
    setupData();
    initEvents();
}
// events
function initEvents() {
    rankList.addEventListener("click", handleListClick);
}
function handleListClick(event) {
    return __awaiter(this, void 0, void 0, function () {
        var selectedId, deathResponse, recoveredResponse, confirmedResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (event.target instanceof HTMLParagraphElement ||
                        event.target instanceof HTMLSpanElement) {
                        selectedId = event.target.parentElement.id;
                    }
                    if (event.target instanceof HTMLLIElement) {
                        selectedId = event.target.id;
                    }
                    if (isDeathLoading) {
                        return [2 /*return*/];
                    }
                    clearDeathList();
                    clearRecoveredList();
                    startLoadingAnimation();
                    isDeathLoading = true;
                    return [4 /*yield*/, fetchCountryInfo(selectedId, "deaths")];
                case 1:
                    deathResponse = (_a.sent()).data;
                    return [4 /*yield*/, fetchCountryInfo(selectedId, "recovered")];
                case 2:
                    recoveredResponse = (_a.sent()).data;
                    return [4 /*yield*/, fetchCountryInfo(selectedId, "confirmed")];
                case 3:
                    confirmedResponse = (_a.sent()).data;
                    endLoadingAnimation();
                    setDeathsList(deathResponse);
                    setTotalDeathsByCountry(deathResponse);
                    setRecoveredList(recoveredResponse);
                    setTotalRecoveredByCountry(recoveredResponse);
                    setChartData(confirmedResponse);
                    isDeathLoading = false;
                    return [2 /*return*/];
            }
        });
    });
}
function setDeathsList(data) {
    var sorted = data.sort(function (a, b) { return getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date); });
    sorted.forEach(function (value) {
        var li = document.createElement("li");
        li.setAttribute("class", "list-item-b flex align-center");
        var span = document.createElement("span");
        span.textContent = value.Cases;
        span.setAttribute("class", "deaths");
        var p = document.createElement("p");
        p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
        li.appendChild(span);
        li.appendChild(p);
        deathsList.appendChild(li);
    });
}
function clearDeathList() {
    deathsList.innerHTML = null;
}
function setTotalDeathsByCountry(data) {
    deathsTotal.innerText = data[0].Cases;
}
function setRecoveredList(data) {
    var sorted = data.sort(function (a, b) { return getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date); });
    sorted.forEach(function (value) {
        var li = document.createElement("li");
        li.setAttribute("class", "list-item-b flex align-center");
        var span = document.createElement("span");
        span.textContent = value.Cases;
        span.setAttribute("class", "recovered");
        var p = document.createElement("p");
        p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
        li.appendChild(span);
        li.appendChild(p);
        recoveredList.appendChild(li);
    });
}
function clearRecoveredList() {
    recoveredList.innerHTML = null;
}
function setTotalRecoveredByCountry(data) {
    recoveredTotal.innerText = data[0].Cases;
}
function startLoadingAnimation() {
    deathsList.appendChild(deathSpinner);
    recoveredList.appendChild(recoveredSpinner);
}
function endLoadingAnimation() {
    deathsList.removeChild(deathSpinner);
    recoveredList.removeChild(recoveredSpinner);
}
function setupData() {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchCovidSummary()];
                case 1:
                    data = (_a.sent()).data;
                    setTotalConfirmedNumber(data);
                    setTotalDeathsByWorld(data);
                    setTotalRecoveredByWorld(data);
                    setCountryRanksByConfirmedCases(data);
                    setLastUpdatedTimestamp(data);
                    return [2 /*return*/];
            }
        });
    });
}
function renderChart(data, labels) {
    var ctx = $("#lineChart").getContext("2d");
    Chart.defaults.global.defaultFontColor = "#f5eaea";
    Chart.defaults.global.defaultFontFamily = "Exo 2";
    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                    label: "Confirmed for the last two weeks",
                    backgroundColor: "#feb72b",
                    borderColor: "#feb72b",
                    data: data,
                },],
        },
        options: {},
    });
}
function setChartData(data) {
    var chartData = data.slice(-14).map(function (value) { return value.Cases; });
    var chartLabel = data
        .slice(-14)
        .map(function (value) { return new Date(value.Date).toLocaleDateString().slice(5, -1); });
    renderChart(chartData, chartLabel);
}
function setTotalConfirmedNumber(data) {
    confirmedTotal.innerText = data.Countries.reduce(function (total, current) { return (total += current.TotalConfirmed); }, 0);
}
function setTotalDeathsByWorld(data) {
    deathsTotal.innerText = data.Countries.reduce(function (total, current) { return (total += current.TotalDeaths); }, 0);
}
function setTotalRecoveredByWorld(data) {
    recoveredTotal.innerText = data.Countries.reduce(function (total, current) { return (total += current.TotalRecovered); }, 0);
}
function setCountryRanksByConfirmedCases(data) {
    var sorted = data.Countries.sort(function (a, b) { return b.TotalConfirmed - a.TotalConfirmed; });
    sorted.forEach(function (value) {
        var li = document.createElement("li");
        li.setAttribute("class", "list-item flex align-center");
        li.setAttribute("id", value.Slug);
        var span = document.createElement("span");
        span.textContent = value.TotalConfirmed;
        span.setAttribute("class", "cases");
        var p = document.createElement("p");
        p.setAttribute("class", "country");
        p.textContent = value.Country;
        li.appendChild(span);
        li.appendChild(p);
        rankList.appendChild(li);
    });
}
function setLastUpdatedTimestamp(data) {
    lastUpdatedTime.innerText = new Date(data.Date).toLocaleString();
}
startApp();
