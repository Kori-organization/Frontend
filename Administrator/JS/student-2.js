const popup = document.getElementById("popupMenu");
const buttons = document.querySelectorAll(".btn-observacoes");

buttons.forEach(btn => {
    btn.addEventListener("click", function(e) {
        e.stopPropagation();

        const rect = btn.getBoundingClientRect();

        popup.style.top = rect.bottom + window.scrollY + 10 + "px";
        popup.style.left = rect.left - 160 + "px";

        popup.classList.toggle("show");
    });
});

document.addEventListener("click", function() {
    popup.classList.remove("show");
});