import axios from 'axios';
import Chart from 'chart.js';

// utils
function $(selector: string): Element {
  return document.querySelector(selector);
}
function getUnixTimestamp(date: string): number {
  return new Date(date).getTime();
}

function createSpinnerElement(id: string): HTMLDivElement {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.setAttribute('id', id);
  wrapperDiv.setAttribute(
    'class',
    'spinner-wrapper flex justify-center align-center'
  );
  const spinnerDiv = document.createElement('div');
  spinnerDiv.setAttribute('class', 'ripple-spinner');
  spinnerDiv.appendChild(document.createElement('div'));
  spinnerDiv.appendChild(document.createElement('div'));
  wrapperDiv.appendChild(spinnerDiv);
  return wrapperDiv;
}

// DOM
const confirmedTotal = $('.confirmed-total') as HTMLDivElement;
const deathsTotal = $('.deaths') as HTMLDivElement;
const recoveredTotal = $('.recovered') as HTMLDivElement;
const lastUpdatedTime = $('.last-updated-time') as HTMLDivElement;
const rankList = $('.rank-list');
const deathsList = $('.deaths-list');
const recoveredList = $('.recovered-list');
const deathSpinner = createSpinnerElement('deaths-spinner');
const recoveredSpinner = createSpinnerElement('recovered-spinner');

// state
let isDeathLoading = false;
// const isRecoveredLoading = false;

// api
function fetchCovidSummary(): any {
  const url = 'https://api.covid19api.com/summary';
  return axios.get(url);
}

function fetchCountryInfo(countryCode: string, status: string): any {
  // params: confirmed, recovered, deaths
  const url = `https://api.covid19api.com/country/${countryCode}/status/${status}`;
  return axios.get(url);
}

// events
function setDeathsList(data: any): void {
  const sorted = data.sort(
    (a: any, b: any) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date)
  );
  sorted.forEach((value: any) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item-b flex align-center');
    const span = document.createElement('span');
    span.textContent = value.Cases;
    span.setAttribute('class', 'deaths');
    const p = document.createElement('p');
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
    li.appendChild(span);
    li.appendChild(p);
    deathsList.appendChild(li);
  });
}

function clearDeathList(): void {
  deathsList.innerHTML = null;
}

function setTotalDeathsByCountry(data: any): void {
  deathsTotal.innerText = data[0].Cases;
}

function setRecoveredList(data: any): void {
  const sorted = data.sort(
    (a: any, b: any) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date)
  );
  sorted.forEach((value: any) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item-b flex align-center');
    const span = document.createElement('span');
    span.textContent = value.Cases;
    span.setAttribute('class', 'recovered');
    const p = document.createElement('p');
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
    li.appendChild(span);
    li.appendChild(p);
    recoveredList.appendChild(li);
  });
}

function clearRecoveredList(): void {
  recoveredList.innerHTML = null;
}

function setTotalRecoveredByCountry(data: any): void {
  recoveredTotal.innerText = data[0].Cases;
}

function startLoadingAnimation(): void {
  deathsList.appendChild(deathSpinner);
  recoveredList.appendChild(recoveredSpinner);
}

function endLoadingAnimation(): void {
  deathsList.removeChild(deathSpinner);
  recoveredList.removeChild(recoveredSpinner);
}

function renderChart(data: any, labels: any): void {
  const ctx = ($('#lineChart') as HTMLCanvasElement).getContext('2d');
  // const defaultLabel = [
  //   'January',
  //   'February',
  //   'March',
  //   'April',
  //   'May',
  //   'June',
  //   'July',
  // ];
  // const defaultData = [0, 10, 5, 2, 20, 30, 45];
  Chart.defaults.global.defaultFontColor = '#f5eaea';
  Chart.defaults.global.defaultFontFamily = 'Exo 2';
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Confirmed for the last two weeks',
          backgroundColor: '#feb72b',
          borderColor: '#feb72b',
          data,
        },
      ],
    },
    options: {},
  });
}

function setChartData(data: any): void {
  const chartData = data.slice(-14).map((value: any) => value.Cases);
  const chartLabel = data
    .slice(-14)
    .map((value: any) =>
      new Date(value.Date).toLocaleDateString().slice(5, -1)
    );
  renderChart(chartData, chartLabel);
}

function setTotalConfirmedNumber(data: any): void {
  confirmedTotal.innerText = data.Countries.reduce(
    (total: any, current: any) => (total += current.TotalConfirmed),
    0
  );
}

function setTotalDeathsByWorld(data: any): void {
  deathsTotal.innerText = data.Countries.reduce(
    (total: any, current: any) => (total += current.TotalDeaths),
    0
  );
}

function setTotalRecoveredByWorld(data: any): void {
  recoveredTotal.innerText = data.Countries.reduce(
    (total: any, current: any) => (total += current.TotalRecovered),
    0
  );
}

function setCountryRanksByConfirmedCases(data: any): void {
  const sorted = data.Countries.sort(
    (a: any, b: any) => b.TotalConfirmed - a.TotalConfirmed
  );
  sorted.forEach((value: any) => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item flex align-center');
    li.setAttribute('id', value.Slug);
    const span = document.createElement('span');
    span.textContent = value.TotalConfirmed;
    span.setAttribute('class', 'cases');
    const p = document.createElement('p');
    p.setAttribute('class', 'country');
    p.textContent = value.Country;
    li.appendChild(span);
    li.appendChild(p);
    rankList.appendChild(li);
  });
}

function setLastUpdatedTimestamp(data: any): void {
  lastUpdatedTime.innerText = new Date(data.Date).toLocaleString();
}

async function handleListClick(event: any): Promise<void> {
  let selectedId;
  if (
    event.target instanceof HTMLParagraphElement ||
    event.target instanceof HTMLSpanElement
  ) {
    selectedId = event.target.parentElement.id;
  }
  if (event.target instanceof HTMLLIElement) {
    selectedId = event.target.id;
  }
  if (isDeathLoading) {
    return;
  }
  clearDeathList();
  clearRecoveredList();
  startLoadingAnimation();
  isDeathLoading = true;
  const { data: deathResponse } = await fetchCountryInfo(selectedId, 'deaths');
  const { data: recoveredResponse } = await fetchCountryInfo(
    selectedId,
    'recovered'
  );
  const { data: confirmedResponse } = await fetchCountryInfo(
    selectedId,
    'confirmed'
  );
  console.log(confirmedResponse);
  endLoadingAnimation();
  setDeathsList(deathResponse);
  setTotalDeathsByCountry(deathResponse);
  setRecoveredList(recoveredResponse);
  setTotalRecoveredByCountry(recoveredResponse);
  setChartData(confirmedResponse);
  isDeathLoading = false;
  // console.log(data);
}

async function setupData(): Promise<void> {
  const { data } = await fetchCovidSummary();
  console.log(data);
  setTotalConfirmedNumber(data);
  setTotalDeathsByWorld(data);
  setTotalRecoveredByWorld(data);
  setCountryRanksByConfirmedCases(data);
  setLastUpdatedTimestamp(data);
  // renderChart();
}

function initEvents(): void {
  rankList.addEventListener('click', handleListClick);
}

// methods
function startApp(): void {
  setupData();
  initEvents();
}

startApp();
