const amountValue = document.getElementById("amountValue");
const chooseCurrency = document.getElementById("chooseCurrency");
const countResultBtn = document.getElementById("countResultBtn");
const amountConverted = document.getElementById("amountConverted");
const wrongValue = document.getElementById("wrongValue");

const getCurrency = () => {
  if (!amountValue.value) {
    document.getElementById("wrongValue");
    wrongValue.textContent = "Wprowadź kwotę";
    return;
  }
  if (amountValue.value <= 0) {
    document.getElementById("wrongValue");
    wrongValue.textContent = "Wartość musi być większa niż zero";
    return;
  }

  wrongValue.innerHTML = "";

  fetch(`https://api.nbp.pl/api/exchangerates/rates/A/${chooseCurrency.value}`)
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
