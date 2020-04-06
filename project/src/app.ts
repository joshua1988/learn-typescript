// utils
function $(selector: string): Element {
  return document.querySelector(selector);
}
function getUnixTimestamp(date): number {
  return new Date(date).getTime();
}

function createSpinnerElement(id): HTMLDivElement {
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
const confirmedTotal = $('.confirmed-total');
const deathsTotal = $('.deaths');
const recoveredTotal = $('.recovered');
const lastUpdatedTime = $('.last-updated-time');
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

function fetchCountryInfo(countryCode, status): any {
  // params: confirmed, recovered, deaths
  const url = `https://api.covid19api.com/country/${countryCode}/status/${status}`;
  return axios.get(url);
}

// events
function setDeathsList(data): void {
  const sorted = data.sort(
    (a, b) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date)
  );
  sorted.forEach(value => {
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

function setTotalDeathsByCountry(data): void {
  deathsTotal.innerText = data[0].Cases;
}

function setRecoveredList(data): void {
  const sorted = data.sort(
    (a, b) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date)
  );
  sorted.forEach(value => {
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

function setTotalRecoveredByCountry(data): void {
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

function renderChart(data, labels): void {
  const ctx = $('#lineChart').getContext('2d');
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

function setChartData(data): void {
  const chartData = data.slice(-14).map(value => value.Cases);
  const chartLabel = data
    .slice(-14)
    .map(value => new Date(value.Date).toLocaleDateString().slice(5, -1));
  renderChart(chartData, chartLabel);
}

function setTotalConfirmedNumber(data): void {
  confirmedTotal.innerText = data.Countries.reduce(
    (total, current) => (total += current.TotalConfirmed),
    0
  );
}

function setTotalDeathsByWorld(data): void {
  deathsTotal.innerText = data.Countries.reduce(
    (total, current) => (total += current.TotalDeaths),
    0
  );
}

function setTotalRecoveredByWorld(data): void {
  recoveredTotal.innerText = data.Countries.reduce(
    (total, current) => (total += current.TotalRecovered),
    0
  );
}

function setCountryRanksByConfirmedCases(data): void {
  const sorted = data.Countries.sort(
    (a, b) => b.TotalConfirmed - a.TotalConfirmed
  );
  sorted.forEach(value => {
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

function setLastUpdatedTimestamp(data): void {
  lastUpdatedTime.innerText = new Date(data.Date).toLocaleString();
}

async function handleListClick(event): Promise<void> {
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
