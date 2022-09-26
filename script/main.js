let activeSection = 1;
let activeModal = false;
const emailReg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const pricetag1 = 0;
const pricetag2 = 25;
const pricetag3 = 60;

function getWorking () {
    //console.log(`body height: ${document.documentElement.scrollHeight}`);
    window.addEventListener('scroll', scrollIndicator);
    document.querySelector(".nav-div__toggle").addEventListener('click', toggleNav);
    document.getElementById("return-to-top").addEventListener('click', returnToTop);
    document.getElementById("name").addEventListener('change', checkName);
    document.getElementById("email").addEventListener('change', checkEmail);
    document.getElementById("consent").addEventListener('change', checkConsent);
    document.querySelector(".contact-button").addEventListener('click', sendContactJSON);
    document.querySelector(".modal").addEventListener('click', hideModalByClick);
    document.querySelector(".modal-x").addEventListener('click', hideModal);
    document.querySelector(".modal-send").addEventListener('click', sendSubscriptionJSON);
    window.addEventListener("keydown", (ev) => {
        if (ev.key === "Escape") {
            hideModal();
        }
    })
    if (window.localStorage.getItem("modal_shown") !== "yes") {
        setInterval(showModal, 5000);
    }
    document.getElementById("currency").addEventListener('change', changeCurrency);
}

function scrollIndicator() {
    //console.log(document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight));
    document.querySelector(".indicator__bar").style.width = `${100 * document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight)}%`;
    const scrollPoint = document.documentElement.scrollTop + (window.innerHeight * 0.30);
    const whyusEnd = document.querySelector(".whyus").scrollHeight;
    const benefitsEnd = whyusEnd + document.querySelector(".benefits").scrollHeight;
    const pricesEnd = benefitsEnd + document.querySelector(".prices").scrollHeight;
    /* console.log(`scrollPoint: ${scrollPoint}`);
    console.log(`whyusEnd: ${whyusEnd}`);
    console.log(`benefitsEnd: ${benefitsEnd}`);
    console.log(`pricesEnd: ${pricesEnd}`);
    console.log(`activeSection: ${activeSection}`); */
    const toggleNavTextHighlight = (nowAt) => {
        document.getElementById(`nav-text-${activeSection}`).classList.toggle("nav-text--highlighted");
        activeSection = nowAt;
        document.getElementById(`nav-text-${activeSection}`).classList.toggle("nav-text--highlighted");
    }
    if (scrollPoint <= whyusEnd && activeSection !== 1) {
        toggleNavTextHighlight(1);
        // active section is whyus
    } else if (scrollPoint <= benefitsEnd && scrollPoint > whyusEnd && activeSection !== 2) {
        toggleNavTextHighlight(2);
        // active section is benefits
    } else if (scrollPoint <= pricesEnd && scrollPoint > benefitsEnd && activeSection !== 3) {
        toggleNavTextHighlight(3);
        // active section is prices
    } else if (scrollPoint > pricesEnd && activeSection !== 4) {
        toggleNavTextHighlight(4);
        // active section is contact
    }
    if (document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight) > 0.25) {
        showModal();
    }
}

function toggleNav() {
    document.querySelector(".nav-div__toggle").classList.toggle('navtoggle--active');
    document.querySelector(".nav").classList.toggle('nav--active');
}

function returnToTop() {
    setTimeout(() => {
        document.querySelector(".whyus").scrollIntoView({behavior: "smooth"});
    }, 200);
}

function checkName() {
    console.log("Name field changed!");
    document.getElementById("name").classList.toggle("redfield", document.getElementById("name").value.length < 2 || document.getElementById("name").value.length > 100);
}

function checkEmail() {
    console.log("Email field changed!");
    document.getElementById("email").classList.toggle("redfield", !emailReg.test(document.getElementById("email").value));
}

function checkConsent() {
    console.log("Consent field changed!");
    document.querySelector(".consent-div").classList.toggle("redfield", !document.getElementById("consent").checked);
}

function sendContactJSON() {
    if (emailReg.test(document.getElementById("email").value) && (document.getElementById("name").value.length < 2 || document.getElementById("name").value.length > 100)) {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                name: document.getElementById("name").value,
                email: document.getElementById("email").value
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }
}

function showModal() {
    if (window.localStorage.getItem("modal_shown") !== "yes" && activeModal === false) {
        document.querySelector(".modal").classList.toggle("hidden", false);
        window.localStorage.setItem("modal_shown", "yes");
        activeModal = true;
    }
}

function hideModal() {
    if (activeModal) {
        document.querySelector(".modal").classList.toggle("hidden", true);
        activeModal = false;
    }
}

function hideModalByClick(e) {
    if (e.target === e.currentTarget) {
        hideModal();
    }
}

function sendSubscriptionJSON() {
    if (emailReg.test(document.getElementById("modal-text").value)) {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                email: document.getElementById("modal-text").value
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
        .then((response) => response.json())
        .then((json) => console.log(json));
    }
    hideModal();
}

function changeCurrency() {
    console.log(document.getElementById("currency").value);
    if (document.getElementById("currency").value === "eur") {
        const changeToEur = async () => {
            try {
                let response = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/eur.json', {
                    cache: "no-cache",
                    }
                );
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                let object = await response.json();
                const exchangeRate = object['eur'];
                document.getElementById("pricetag-1").innerText = `€${(pricetag1 * exchangeRate).toFixed(2)}`;
                document.getElementById("pricetag-2").innerText = `€${(pricetag2 * exchangeRate).toFixed(2)}`;
                document.getElementById("pricetag-3").innerText = `€${(pricetag3 * exchangeRate).toFixed(2)}`;
            }
            catch(error) {
                console.error(error.message);
            }
        }
        changeToEur();
    }
    else if (document.getElementById("currency").value === "gbp") {
        const changeToGbp = async () => {
            try {
                let response = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/gbp.json', {
                    cache: "no-cache",
                    }
                );
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                let object = await response.json();
                const exchangeRate = object['gbp'];
                document.getElementById("pricetag-1").innerText = `£${(pricetag1 * exchangeRate).toFixed(2)}`;
                document.getElementById("pricetag-2").innerText = `£${(pricetag2 * exchangeRate).toFixed(2)}`;
                document.getElementById("pricetag-3").innerText = `£${(pricetag3 * exchangeRate).toFixed(2)}`;
            }
            catch(error) {
                console.error(error.message);
            }
        }
        changeToGbp();
    }
    else {
        console.log(`Currency changed to bucks`);
        document.getElementById("pricetag-1").innerText = `$${pricetag1}`;
        document.getElementById("pricetag-2").innerText = `$${pricetag2}`;
        document.getElementById("pricetag-3").innerText = `$${pricetag3}`;
    }
}