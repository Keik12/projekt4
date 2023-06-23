const amountValue = document.getElementById("amountValue");
const chooseCurrency = document.getElementById("chooseCurrency");
const countResultBtn = document.getElementById("countResultBtn");
const amountConverted = document.getElementById("amountConverted");
const wrongValue = document.getElementById("wrongValue");
const wrongCurrency = document.getElementById("wrongCurrency");

const getCurrency = () => {
  if (!chooseCurrency.value) {
    document.getElementById("wrongCurrency");
    return (wrongCurrency.innerHTML = "Wybierz walutę");
  }
  if (!amountValue.value) {
    document.getElementById("wrongValue");
    return (wrongValue.innerHTML = "Wprowadź kwotę");
  }
  if (amountValue.value <= 0) {
    document.getElementById("wrongValue");
    return (wrongValue.innerHTML = "Wartośc musi być większa niż zero");
  }

  wrongValue.innerHTML = "";
  wrongCurrency.innerHTML = "";

  fetch(`http://api.nbp.pl/api/exchangerates/rates/A/${chooseCurrency.value}`)
    .then((response) => response.json())
    .then((data) => {
      const rates = data.rates?.[0]?.mid;
      if (rates) {
        currencyExchange(rates);
      }
    })
    .catch((err) => console.log(err));
};

function currencyExchange(currency) {
  const userInput = amountValue.value;
  amountConverted.innerText = (userInput * currency).toFixed(2);
}

countResultBtn.addEventListener("click", getCurrency);
