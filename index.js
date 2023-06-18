const amountValue = document.getElementById("amountValue");
const chooseCurrency = document.getElementById("chooseCurrency");
const countResultBtn = document.getElementById("countResultBtn");
const amountConverted = document.getElementById("amountConverted");

const getCurrency = () => {
  if (chooseCurrency.value && amountValue.value) {
    fetch(`http://api.nbp.pl/api/exchangerates/rates/A/${chooseCurrency.value}`)
      .then((response) => response.json())
      .then((data) => {
        const rates = data.rates[0].mid;
        currencyExchange(rates);
      })
      .catch((err) => console.log(err));
  } else {
    alert("Wybierz walutę");
  }
};

function currencyExchange(currency) {
  const userInput = amountValue.value;
  amountConverted.innerText = (userInput * currency).toFixed(2);
}

countResultBtn.addEventListener("click", getCurrency);
