/* WanderWise | Shared JavaScript interactions */

document.addEventListener("DOMContentLoaded", function () {
    // Keep the copyright year current without requiring a server.
    document.querySelectorAll("[data-year]").forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });

    // Mobile navigation menu.
    var menuButton = document.querySelector(".menu-toggle");
    var navigation = document.querySelector(".main-nav");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", function () {
            var isOpen = navigation.classList.toggle("open");
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.textContent = isOpen ? "×" : "☰";
        });
    }

    // Destination category filter.
    var filterButtons = document.querySelectorAll("[data-filter]");
    var placeCards = document.querySelectorAll(".place-card");
    var emptyState = document.querySelector(".empty-state");

    if (filterButtons.length > 0 && placeCards.length > 0) {
        filterButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                var selectedCategory = button.dataset.filter;
                var visibleCount = 0;

                filterButtons.forEach(function (item) {
                    item.classList.remove("active");
                });
                button.classList.add("active");

                placeCards.forEach(function (card) {
                    var shouldShow = selectedCategory === "all" ||
                        card.dataset.category === selectedCategory;

                    card.hidden = !shouldShow;
                    if (shouldShow) {
                        visibleCount += 1;
                    }
                });

                if (emptyState) {
                    emptyState.hidden = visibleCount !== 0;
                }
            });
        });
    }

    // Pre-fill destination when the planner is opened from a destination card.
    var destinationInput = document.getElementById("destination");
    if (destinationInput) {
        var queryParameters = new URLSearchParams(window.location.search);
        var suggestedDestination = queryParameters.get("destination");

        if (suggestedDestination) {
            destinationInput.value = suggestedDestination;
        }
    }

    // Trip planner: validate, render and save the latest plan in localStorage.
    var tripForm = document.getElementById("trip-form");
    var savedSection = document.getElementById("saved-section");
    var savedTrip = document.getElementById("saved-trip");
    var plannerMessage = document.getElementById("planner-message");
    var clearTripButton = document.getElementById("clear-trip");
    var storageKey = "wanderwise-latest-trip";

    function displayTrip(trip) {
        if (!savedSection || !savedTrip || !trip) {
            return;
        }

        savedTrip.replaceChildren();

        var heading = document.createElement("h3");
        heading.textContent = trip.destination;
        savedTrip.appendChild(heading);

        var details = [
            "Traveller: " + trip.name,
            "Dates: " + trip.startDate + " to " + trip.endDate,
            "Number of travellers: " + trip.travellers,
            "Approx. budget per person: " + trip.budget,
            "Travel style: " + trip.style
        ];

        details.forEach(function (detail) {
            var paragraph = document.createElement("p");
            paragraph.textContent = detail;
            savedTrip.appendChild(paragraph);
        });

        if (trip.notes) {
            var notes = document.createElement("p");
            notes.textContent = "Notes: " + trip.notes;
            savedTrip.appendChild(notes);
        }

        savedSection.hidden = false;
    }

    if (tripForm) {
        var previouslySavedTrip = localStorage.getItem(storageKey);

        if (previouslySavedTrip) {
            try {
                displayTrip(JSON.parse(previouslySavedTrip));
            } catch (error) {
                localStorage.removeItem(storageKey);
            }
        }

        tripForm.addEventListener("submit", function (event) {
            event.preventDefault();

            var formData = new FormData(tripForm);
            var trip = {
                name: formData.get("name").trim(),
                destination: formData.get("destination").trim(),
                startDate: formData.get("startDate"),
                endDate: formData.get("endDate"),
                travellers: formData.get("travellers"),
                budget: formData.get("budget"),
                style: formData.get("style"),
                notes: formData.get("notes").trim()
            };

            if (new Date(trip.endDate) < new Date(trip.startDate)) {
                plannerMessage.textContent = "End date must be the same as or later than the start date.";
                plannerMessage.style.color = "#b34d3c";
                return;
            }

            localStorage.setItem(storageKey, JSON.stringify(trip));
            displayTrip(trip);
            plannerMessage.textContent = "Your trip plan has been saved in this browser.";
            plannerMessage.style.color = "";
            savedSection.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }

    if (clearTripButton) {
        clearTripButton.addEventListener("click", function () {
            localStorage.removeItem(storageKey);
            if (savedSection) {
                savedSection.hidden = true;
            }
            if (plannerMessage) {
                plannerMessage.textContent = "Saved trip plan cleared.";
            }
        });
    }

    // Contact form demonstration. No information is transmitted to a server.
    var contactForm = document.getElementById("contact-form");
    var contactStatus = document.getElementById("contact-message-status");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            var senderName = document.getElementById("contact-name").value.trim();
            contactStatus.textContent = "Thanks, " + senderName +
                "! Your message passed the demo form validation. No email was sent.";
            contactForm.reset();
        });
    }
});
