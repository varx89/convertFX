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

const exImgFlag = document.getElementById('ex-image-flag');
