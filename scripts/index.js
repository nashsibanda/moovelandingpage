function toggleScrollClass() {
    var nav = document.querySelectorAll(".navbar")[0];
    var goUpSvg = document.querySelector("#go-up > .svg-icon");
    var offset = 100;
    window.pageYOffset > offset
        ? nav.classList.add("display")
        : nav.classList.remove("display");
    window.pageYOffset > offset
        ? goUpSvg.classList.add("display")
        : goUpSvg.classList.remove("display");
}
window.addEventListener("scroll", function () {
    toggleScrollClass();
});
toggleScrollClass();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
        });
    });
});

document.querySelector("#menu-toggle").addEventListener("click", function () {
    this.classList.toggle("open");
    document.querySelector("#nav-menu").classList.toggle("menu-toggle-open");
    document.querySelector(".navbar").classList.toggle("menu-toggle-open");
});

document.querySelectorAll("img.svg-icon").forEach(el => {
    const imgID = el.getAttribute("id");
    const imgClass = el.getAttribute("class");
    const imgURL = el.getAttribute("src");
    const xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
            const data = xhttp.response;
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/html");
            let svg = xmlDoc.querySelector("svg");

            if (typeof imgID !== "undefined") {
                svg.setAttribute("id", imgID);
            }

            if (typeof imgClass !== "undefined") {
                svg.setAttribute("class", imgClass + " replaced-svg");
            }

            svg.removeAttribute("xmlns:a");

            el.parentNode.replaceChild(svg, el);
        }
    };

    xhttp.open("GET", imgURL, true);
    xhttp.send();
});
