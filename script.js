// Global variables
var currentDisplayStart = 0;
var currentDisplayEnd = 5;
var baseCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD'];
var allCurrencies = [
    'USD',
    'EUR',
    'GBP',
    'JPY',
    'AUD',
    'CAD',
    'CHF',
    'CNY',
    'SEK',
    'NZD',
    'MXN',
    'SGD',
    'HKD',
    'NOK',
    'KRW',
    'TRY',
    'INR',
    'RUB',
    'BRL',
    'ZAR',
    'ARS',
];
var data = [];

// On window load, set date, fetch initial data and start refresh interval
window.onload = function () {
    setDate(); // set the current date
    fetchCurrencyData().then(() => populateTable(0, 5)); // Fetch initial data and populate table
    setInterval(refreshData, 60000); // Refresh data every 60 seconds
};

// Function to set today's date
function setDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    document.getElementById('currentDate').innerText = today;
}

// Fetch currency data from the Frankfurter API
async function fetchCurrencyData() {
    var baseCurrency = document.getElementById('baseCurrency').value;
    // Filter out the base currency from the list of all currencies
    var currencies = allCurrencies.filter((currency) => currency !== baseCurrency);
    data = []; // Clear the old data

    // Initialize timeframes for comparison
    var today = new Date();
    var oneDayAgo = new Date(today);
    oneDayAgo.setDate(today.getDate() - 1);
    var sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    var oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);

    var timeFrames = [today, oneDayAgo, sevenDaysAgo, oneMonthAgo];
    var timeFrameData = {};

    // Fetch the rates for each timeframe
    for (let timeFrame of timeFrames) {
        await fetch(`https://api.frankfurter.app/${formatDate(timeFrame)}?from=${baseCurrency}`)
            .then((response) => response.json())
            .then((response) => {
                timeFrameData[formatDate(timeFrame)] = response.rates;
            });
    }

    // Populate the data array with the rates for each currency
    for (let currency of currencies) {
        var row = [
            currency,
            timeFrameData[formatDate(today)][currency]
                ? timeFrameData[formatDate(today)][currency].toFixed(2)
                : 'N/A',
            calculateDifference(timeFrameData, oneDayAgo, today, currency),
            calculateDifference(timeFrameData, sevenDaysAgo, today, currency),
            calculateDifference(timeFrameData, oneMonthAgo, today, currency),
        ];
        data.push(row);
    }
}

// Populate the HTML table
function populateTable(start, end, clearTable = true) {
    var tbody = document.getElementById('currencyTable');

    // Clear the previous rows if required
    if (clearTable) tbody.innerHTML = '';

    // Generate a row for each data item in the range
    for (var i = start; i < end; i++) {
        var tr = document.createElement('tr');

        // Create a new td for the flag
        var tdFlag = document.createElement('td');
        var img = document.createElement('img');

        // Set the source of the image to the corresponding flag based on the currency code
        img.src = `https://currencyfreaks.com/photos/flags/${data[i][0].toLowerCase()}.png`;

        // Set attributes flag display
        img.alt = data[i][0] + ' flag';
        img.width = 30;
        img.height = 20;

        // Add the image to the td, and the td to the row
        tdFlag.appendChild(img);
        tr.appendChild(tdFlag);

        // Now continue with the rest of the cells as before
        for (var j = 0; j < data[i].length; j++) {
            var td = document.createElement('td');
            td.innerHTML = data[i][j]; // Use innerHTML here
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }
}

// Show more rows in the table
function showMore() {
    currentDisplayStart = currentDisplayEnd; // Start from where we left off
    currentDisplayEnd = Math.min(currentDisplayEnd + 5, data.length);
    populateTable(currentDisplayStart, currentDisplayEnd, false);
}

// Show fewer rows in the table
function showLess() {
    if (currentDisplayEnd <= 5) return;
    currentDisplayEnd = currentDisplayStart; // End where we started
    currentDisplayStart = Math.max(0, currentDisplayStart - 5); // Go back 5
    populateTable(currentDisplayStart, currentDisplayEnd, true);
}

// Fetch new data and repopulate the table
async function refreshData() {
    await fetchCurrencyData();
    populateTable(0, currentDisplayEnd, true);
}

// format a date in the yyyy-mm-dd format required by the API
function formatDate(date) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// pad single digit numbers with leading zeros
function pad(num) {
    return num < 10 ? '0' + num : num;
}

// calculate and format the difference between two timeframes
function calculateDifference(data, past, present, currency) {
    if (!data[formatDate(past)][currency] || !data[formatDate(present)][currency]) {
        return 'N/A';
    }

    var difference = data[formatDate(present)][currency] - data[formatDate(past)][currency];
    var percentChange = (difference / data[formatDate(past)][currency]) * 100;
    var color = difference >= 0 ? 'green' : 'red';

    return `<span style="color:${color}">${percentChange.toFixed(2)}%</span>`;
}
