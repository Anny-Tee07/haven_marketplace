
// ========================================
// HAVEN PROPERTY SEARCH
// ========================================


// Get search elements
const locationInput = document.getElementById("locationInput");
const propertyTypeBtn = document.getElementById("propertyTypeBtn");
const priceRangeBtn = document.getElementById("priceRangeBtn");
const searchBtn = document.getElementById("searchBtn");


// Get all property cards
const propertyCards = document.querySelectorAll(".property-card");


// Get no-results message
const noResults = document.getElementById("noResults");


// Store selected filters
let selectedPropertyType = "";
let selectedPriceRange = "";


// ========================================
// PROPERTY TYPE
// ========================================

document.querySelectorAll(".property-type-option").forEach(option => {

    option.addEventListener("click", function (event) {

        event.preventDefault();

        selectedPropertyType = this.dataset.type;

        propertyTypeBtn.textContent = selectedPropertyType;

    });

});


// ========================================
// PRICE RANGE
// ========================================

document.querySelectorAll(".price-option").forEach(option => {

    option.addEventListener("click", function (event) {

        event.preventDefault();

        selectedPriceRange = this.dataset.price;

        priceRangeBtn.textContent = this.textContent;

    });

});


// ========================================
// SEARCH
// ========================================

searchBtn.addEventListener("click", function () {

    const location = locationInput.value
        .toLowerCase()
        .trim();

    let visibleProperties = 0;


    // Check every property
    propertyCards.forEach(card => {

        const cardLocation =
            card.dataset.location.toLowerCase();

        const cardType =
            card.dataset.type;

        const cardPrice =
            Number(card.dataset.price);


        // ----------------------------
        // LOCATION FILTER
        // ----------------------------

        const locationMatch =
            location === "" ||
            cardLocation.includes(location);


        // ----------------------------
        // PROPERTY TYPE FILTER
        // ----------------------------

        const typeMatch =
            selectedPropertyType === "" ||
            cardType === selectedPropertyType;


        // ----------------------------
        // PRICE FILTER
        // ----------------------------

        let priceMatch = true;


        if (selectedPriceRange === "under50") {

            priceMatch = cardPrice < 50;

        }


        else if (selectedPriceRange === "50-150") {

            priceMatch =
                cardPrice >= 50 &&
                cardPrice <= 150;

        }


        else if (selectedPriceRange === "150-300") {

            priceMatch =
                cardPrice >= 150 &&
                cardPrice <= 300;

        }


        else if (selectedPriceRange === "over300") {

            priceMatch = cardPrice > 300;

        }


        // ----------------------------
        // SHOW / HIDE CARD
        // ----------------------------

        if (
            locationMatch &&
            typeMatch &&
            priceMatch
        ) {

            card.classList.remove("d-none");

            visibleProperties++;

        } else {

            card.classList.add("d-none");

        }

    });


    // ========================================
    // NO RESULTS
    // ========================================

    if (visibleProperties === 0) {

        noResults.classList.remove("d-none");

    } else {

        noResults.classList.add("d-none");

    }

});

