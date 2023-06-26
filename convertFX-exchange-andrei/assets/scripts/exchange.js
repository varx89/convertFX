const getCurrencies = async () => {
    const host = 'api.frankfurter.app';
    const response = await fetch(`https://${host}/currencies`);
    body = await response.json();
    return body;
};
const getCurrencyFrom = async (currency) => {
    const host = 'api.frankfurter.app';
    const response = await fetch(`https://${host}/latest?from=${currency}`);
    const body = await response.json();
    return body;
};

const baseEX = 'EUR';
const baseCONV = 'CAD';
const getValueRate = async (base = baseEX, convx = baseCONV) => {
    const apiAll = Object.assign({}, await getCurrencyFrom(base));

    if (base === apiAll.base) {
        return apiAll.rates[convx];
    } else {
        return 0;
    }
};

const imgFlagURL = (currency) => {
    const imgUrl = `https://currencyfreaks.com/photos/flags/${currency.toLowerCase()}.png`;
    return imgUrl;
};
// calculate

const showPairs = async (first, second, value = 1000) => {
    first = first.toString();
    second = second.toString();

    const baseAmImg = document.getElementById('ex-image-flag');
    baseAmImg.setAttribute('src', imgFlagURL(first));
    const baseExCurrency = document.getElementById('ex-currency');
    baseExCurrency.textContent = first;

    const baseConvImg = document.getElementById('conv-image-flag');
    baseConvImg.setAttribute('src', imgFlagURL(second));
    const baseConvCurrency = document.getElementById('conv-currency');
    baseConvCurrency.textContent = second;

    const currentRateValue = document.getElementById('current-rate-value');
    currentRateValue.textContent = `1 = ${await getValueRate(first, second)}`;

    const exInput = document.getElementById('ex-amount');
    exInput.value = value;
    const convInput = document.getElementById('conv-amount');
    convInput.value = (value * (await getValueRate(first, second))).toFixed(2);
};
showPairs(baseEX, baseCONV);

const renderShowPairs = () => {
    const baseExCurrency = document.getElementById('ex-currency');
    const baseConvCurrency = document.getElementById('conv-currency');

    showPairs(
        baseExCurrency.textContent,
        baseConvCurrency.textContent,
        document.getElementById('ex-amount').value
    );
};

document.getElementById('ex-amount').addEventListener('keyup', () => {
    const baseExCurrency = document.getElementById('ex-currency');
    const baseConvCurrency = document.getElementById('conv-currency');
    showPairs(
        baseExCurrency.textContent,
        baseConvCurrency.textContent,
        document.getElementById('ex-amount').value
    );
});

const dropExList = async () => {
    const listEX = document.getElementsByClassName('list-amount')[0];
    let apiObj = Object.assign({}, await getCurrencies());

    for (obj in apiObj) {
        const li = document.createElement('li');
        li.setAttribute('class', 'currency-item-am');
        li.setAttribute('onclick', `showCurr('${obj}')`);
        const img = document.createElement('img');
        img.setAttribute('class', 'list-img');
        img.setAttribute('src', imgFlagURL(obj));
        const spanCurr = document.createElement('span');
        spanCurr.setAttribute('class', 'list-currency');
        spanCurr.textContent = ` ${obj}`;
        const spanDot = document.createElement('span');
        spanDot.textContent = '-';
        const spanCurrName = document.createElement('span');
        // spanCurrName.setAttribute('class', 'ex-name');
        spanCurrName.textContent = ` ${apiObj[obj]}`;

        li.append(img, spanCurr, spanDot, spanCurrName);
        listEX.appendChild(li);
    }
};
const dropConvList = async () => {
    const listConv = document.getElementsByClassName('list-convert')[0];
    const listWithout = document.getElementById('ex-currency');

    let apiObj = Object.assign({}, await getCurrencies());
    delete apiObj[listWithout.textContent];

    for (obj in apiObj) {
        const li = document.createElement('li');
        li.setAttribute('class', 'currency-item-conv');
        li.setAttribute('onclick', `showConvCurr('${obj}')`);
        const img = document.createElement('img');
        img.setAttribute('class', 'list-img');
        img.setAttribute('src', imgFlagURL(obj));
        const spanCurr = document.createElement('span');
        spanCurr.setAttribute('class', 'list-currency');
        spanCurr.textContent = ` ${obj}`;
        const spanDot = document.createElement('span');
        spanDot.textContent = '-';
        const spanCurrName = document.createElement('span');
        // spanCurrName.setAttribute('class', 'ex-name');
        spanCurrName.textContent = ` ${apiObj[obj]}`;

        li.append(img, spanCurr, spanDot, spanCurrName);
        listConv.appendChild(li);
    }
};

const dropdownAmount = () => {
    const listAmount = document.getElementsByClassName('list-amount')[0];
    const listConvert = document.getElementsByClassName('list-convert')[0];
    listAmount.classList.remove('list-amount-show-none');
    dropExList();
    listAmount.classList.toggle('list-amount-show');
    listConvert.classList.add('list-convert-show-none');
};

const dropdownConvert = () => {
    const listAmount = document.getElementsByClassName('list-amount')[0];
    const listConvert = document.getElementsByClassName('list-convert')[0];
    listConvert.classList.remove('list-convert-show-none');
    dropConvList();
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
    renderShowPairs();
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
    renderShowPairs();
};
