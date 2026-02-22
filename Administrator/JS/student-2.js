// Get popup element
const popupMenu = document.getElementById("popupMenu");

// Get all observation buttons
const observationButtons = document.querySelectorAll(".btn-observacoes");


// ==========================
// OPEN POPUP WHEN BUTTON CLICKED
// ==========================
observationButtons.forEach(button => {
    button.addEventListener("click", function(event) {
        // Prevent row click redirect
        event.stopPropagation();
        // Get button position
        const rect = button.getBoundingClientRect();
        // Position popup near button
        popupMenu.style.top = rect.bottom + window.scrollY + 10 + "px";
        popupMenu.style.left = rect.left - 160 + "px";
        // Toggle popup visibility
        popupMenu.classList.toggle("show");
    });
});


// ==========================
// CLOSE POPUP WHEN CLICKING OUTSIDE
// ==========================
document.addEventListener("click", function() {
    popupMenu.classList.remove("show");
});


// ==========================
// REDIRECT ACTIONS
// ==========================

// Redirect to bulletin page
document.getElementById("popupBulletin").addEventListener("click", function() {
    window.location.href = "student-3.html";
});


// Redirect to observations page
document.getElementById("popupObservations").addEventListener("click", function() {
    window.location.href = "student-3b.html";
});
