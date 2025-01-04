document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const amountInput = document.querySelector(".amount input");
    const fromCurrency = document.querySelector("select[name='from']");
    const toCurrency = document.querySelector("select[name='to']");
    const message = document.querySelector(".msg");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent form submission

        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (isNaN(amount) || amount <= 0) {
            message.textContent = "Please enter a valid amount.";
            return;
        }

        try {
            // Replace 'YOUR_API_KEY' with your actual API key
            const apiKey = "YOUR_API_KEY";
            const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;
            
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Failed to fetch exchange rates");

            const data = await response.json();
            const rate = data.conversion_rates[to];

            if (!rate) {
                message.textContent = "Conversion rate not available.";
                return;
            }

            const convertedAmount = (amount * rate).toFixed(2);
            message.textContent = `${amount} ${from} = ${convertedAmount} ${to} (1 ${from} = ${rate} ${to})`;
        } catch (error) {
            console.error("Error fetching exchange rates:", error);
            message.textContent = "Failed to get exchange rate. Try again later.";
        }
    });
});
