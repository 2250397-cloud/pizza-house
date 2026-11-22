document.addEventListener("DOMContentLoaded", () => {
    const dateInput = document.querySelector("#date");
    const form = document.querySelector("#contactForm");
    const status = document.querySelector("#formStatus");
    const pizzaOptions = document.querySelectorAll("#pizzaOptions input[type='checkbox']");
    const receiptModal = document.querySelector("#receiptModal");
    const receiptDetails = document.querySelector("#receiptDetails");
    const closeReceiptButtons = document.querySelectorAll("#closeReceipt");
    const confirmReceiptButton = document.querySelector("#receiptConfirm");
    const cancelReceiptButton = document.querySelector("#receiptCancel");

    const pizzaPrices = {
        Margherita: 20,
        Pepperoni: 25,
        "Garden Veggie": 23,
        "Chicken BBQ": 25,
        "Chicken Mushroom": 25,
        "Spicy Tuna": 23,
        Seafood: 28,
        "Beef Blackpepper": 30,
        Wagyu: 50
    };

    closeReceiptButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (receiptModal) receiptModal.hidden = true;
        });
    });

    if (confirmReceiptButton) {
        confirmReceiptButton.addEventListener("click", () => {
            if (receiptModal) receiptModal.hidden = true;
            if (form) form.reset();
            alert("Your order has been confirmed. Thank you for choosing Pizza House!");
        });
    }

    if (cancelReceiptButton) {
        cancelReceiptButton.addEventListener("click", () => {
            if (receiptModal) receiptModal.hidden = true;
        });
    }

    const orderSummary = document.querySelector("#orderSummary");
    if (orderSummary) {
        const savedOrder = sessionStorage.getItem("pizzaHouseOrder");
        orderSummary.textContent = savedOrder
            ? JSON.parse(savedOrder).summary
            : "Your order details are not available. Please return to the order page.";
    }

    pizzaOptions.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const quantity = checkbox.closest(".pizza-option")?.querySelector(".pizza-quantity");
            if (quantity) quantity.disabled = !checkbox.checked;
        });
    });

    if (form && status) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            const selectedPizzas = Array.from(document.querySelectorAll("#pizzaOptions input[type='checkbox']:checked"));
            if (selectedPizzas.length === 0) {
                alert("Please select at least one pizza.");
                return;
            }
            const selectedDate = dateInput ? dateInput.value : "";
            const selectedTime = document.querySelector("#time")?.value || "";
            let total = 0;
            const receiptLines = selectedPizzas.map((pizza) => {
                const quantity = pizza.closest(".pizza-option")?.querySelector(".pizza-quantity")?.value || "1";
                const subtotal = pizzaPrices[pizza.value] * Number(quantity);
                total += subtotal;
                return `<div class="receipt-line"><span>${pizza.value} x${quantity}</span><strong>RM${subtotal}</strong></div>`;
            }).join("");
            const orderType = document.querySelector("#orderType")?.selectedOptions[0]?.textContent || "";
            receiptDetails.innerHTML = `${receiptLines}
                <div class="receipt-line"><span>Date</span><strong>${selectedDate}</strong></div>
                <div class="receipt-line"><span>Time</span><strong>${selectedTime}</strong></div>
                <div class="receipt-line"><span>Order type</span><strong>${orderType}</strong></div>
                <div class="receipt-line receipt-total"><span>Total</span><strong>RM${total}</strong></div>`;
            receiptModal.hidden = false;
        });
    }

});
