const apiCurrencies = {
    AUD: 'Australian Dollar',
    BGN: 'Bulgarian Lev',
    BRL: 'Brazilian Real',
    CAD: 'Canadian Dollar',
    CHF: 'Swiss Franc',
    CNY: 'Chinese Renminbi Yuan',
    CZK: 'Czech Koruna',
    DKK: 'Danish Krone',
    EUR: 'Euro',
    GBP: 'British Pound',
    HKD: 'Hong Kong Dollar',
    HUF: 'Hungarian Forint',
    IDR: 'Indonesian Rupiah',
    ILS: 'Israeli New Sheqel',
    INR: 'Indian Rupee',
    ISK: 'Icelandic Króna',
    JPY: 'Japanese Yen',
    KRW: 'South Korean Won',
    MXN: 'Mexican Peso',
    MYR: 'Malaysian Ringgit',
    NOK: 'Norwegian Krone',
    NZD: 'New Zealand Dollar',
    PHP: 'Philippine Peso',
    PLN: 'Polish Złoty',
    RON: 'Romanian Leu',
    SEK: 'Swedish Krona',
    SGD: 'Singapore Dollar',
    THB: 'Thai Baht',
    TRY: 'Turkish Lira',
    USD: 'United States Dollar',
    ZAR: 'South African Rand',
};

const apiEuro = {
    amount: 1.0,
    base: 'EUR',
    date: '2023-06-22',
    rates: {
        AUD: 1.6194,
        BGN: 1.9558,
        BRL: 5.2331,
        CAD: 1.4463,
        CHF: 0.9825,
        CNY: 7.8866,
        CZK: 23.683,
        DKK: 7.4486,
        GBP: 0.86115,
        HKD: 8.5987,
        HUF: 369.43,
        IDR: 16426,
        ILS: 3.9847,
        INR: 90.03,
        ISK: 148.5,
        JPY: 156.05,
        KRW: 1424.62,
        MXN: 18.8431,
        MYR: 5.1091,
        NOK: 11.599,
        NZD: 1.7698,
        PHP: 61.133,
        PLN: 4.4253,
        RON: 4.9631,
        SEK: 11.7224,
        SGD: 1.4741,
        THB: 38.535,
        TRY: 26.625,
        USD: 1.0985,
        ZAR: 20.258,
    },
};

const apiAll = {
    amount: 1.0,
    base: 'EUR',
    date: '2023-06-22',
    rates: {
        AUD: 1.6194,
        BGN: 1.9558,
        BRL: 5.2331,
        CAD: 1.4463,
        CHF: 0.9825,
        CNY: 7.8866,
        CZK: 23.683,
        DKK: 7.4486,
        GBP: 0.86115,
        HKD: 8.5987,
        HUF: 369.43,
        IDR: 16426,
        ILS: 3.9847,
        INR: 90.03,
        ISK: 148.5,
        JPY: 156.05,
        KRW: 1424.62,
        MXN: 18.8431,
        MYR: 5.1091,
        NOK: 11.599,
        NZD: 1.7698,
        PHP: 61.133,
        PLN: 4.4253,
        RON: 4.9631,
        SEK: 11.7224,
        SGD: 1.4741,
        THB: 38.535,
        TRY: 26.625,
        USD: 1.0985,
        ZAR: 20.258,
    },
};

const baseEX = 'EUR';
const baseCONV = 'USD';
const getValueRate = (base, convx) => {
    if (base === apiAll.base) {
        return apiAll.rates[convx];
    } else {
        return 0;
    }
};

const imgFlagURL = (currency) => {
    const imgUrl = `https://currencyfreaks.com/photos/flags/${currency}.png`;
    return imgUrl;
};

const showPairs = (first, second) => {
    first = first.toString();
    second = second.toString();

    const baseAmImg = document.getElementById('ex-image-flag');
    baseAmImg.setAttribute('src', imgFlagURL(first.toLowerCase()));
    const baseExCurrency = document.getElementById('ex-currency');
    baseExCurrency.textContent = first;

    const baseConvImg = document.getElementById('conv-image-flag');
    baseConvImg.setAttribute('src', imgFlagURL(second.toLowerCase()));
    const baseConvCurrency = document.getElementById('conv-currency');
    baseConvCurrency.textContent = second;

    const currentRateValue = document.getElementById('current-rate-value');
    currentRateValue.textContent = `1 = ${getValueRate(first, second)}`;
};
showPairs(baseEX, baseCONV);

const dropExList = () => {
    const li = document.createElement('li');
    li.setAttribute('class', 'currency-item-am');
    li.setAttribute('onclick', `showCurr('${baseEX}')`);
};

const dropdownAmount = () => {
    const listAmount = document.getElementsByClassName('list-amount')[0];
    const listConvert = document.getElementsByClassName('list-convert')[0];
    listAmount.classList.remove('list-amount-show-none');
    listAmount.classList.toggle('list-amount-show');
    listConvert.classList.add('list-convert-show-none');
};

const dropdownConvert = () => {
    const listAmount = document.getElementsByClassName('list-amount')[0];
    const listConvert = document.getElementsByClassName('list-convert')[0];
    listConvert.classList.remove('list-convert-show-none');
    listConvert.classList.toggle('list-convert-show');
    listAmount.classList.add('list-amount-show-none');
};

const showCurr = (param) => {
    const listAmount = document.getElementsByClassName('list-amount')[0];

    const exImgFlag = document.getElementById('ex-image-flag');
    const exCurrency = document.getElementById('ex-currency');
    const listOptionAm = document.getElementsByClassName('currency-item-am');

    for (let i = 0; i < listOptionAm.length; i++) {
        if (listOptionAm[i].children[1].textContent.trim() === param) {
            exImgFlag.setAttribute('src', listOptionAm[i].children[0].src);
            exCurrency.textContent = param;
            // listOptionAm[i].children[1].textContent.trim();
            listAmount.classList.toggle('list-amount-show-none');
        }
    }
};

const showConvCurr = (param) => {
    const listConvert = document.getElementsByClassName('list-convert')[0];

    const convImgFlag = document.getElementById('conv-image-flag');
    const convCurrency = document.getElementById('conv-currency');
    const listOptionConv =
        document.getElementsByClassName('currency-item-conv');

    for (let i = 0; i < listOptionConv.length; i++) {
        if (listOptionConv[i].children[1].textContent.trim() === param) {
            convImgFlag.setAttribute('src', listOptionConv[i].children[0].src);
            convCurrency.textContent = param;
            // listOptionConv[i].children[1].textContent.trim();
            listConvert.classList.toggle('list-convert-show-none');
        }
    }
};
