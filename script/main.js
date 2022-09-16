let activeSection = 1;
/*let verifiedFieldName = false;
let verifiedFieldEmail = false;
let verifiedFieldConsent = false;*/

function getWorking () {
    //console.log(`body height: ${document.documentElement.scrollHeight}`);
    window.addEventListener('scroll', scrollIndicator);
    document.querySelector(".nav-div__toggle").addEventListener('click', toggleNav);
    document.getElementById("return-to-top").addEventListener('click', returnToTop);
    document.getElementById("name").addEventListener('change', checkName);
    document.getElementById("email").addEventListener('change', checkEmail);
    document.getElementById("consent").addEventListener('change', checkConsent);
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
    /*if (document.getElementById("name").value.length < 2 || document.getElementById("name").value.length > 100) {
        console.log("Name set to wrong.");
        document.getElementById("name").classList.toggle("redfield", !document.getElementById("name").classList.contains("redfield"));
    } else {
        console.log("Name set to right.");
        document.getElementById("name").classList.toggle("redfield", document.getElementById("name").classList.contains("redfield"));
    }*/ // checks if name's length is adecuate
}

function checkEmail() {
    console.log("Email field changed!");
    const myReg = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    document.getElementById("email").classList.toggle("redfield", !myReg.test(document.getElementById("email").value.length));
    /*if (!myReg.test(document.getElementById("email").value.length)) {
        console.log("Name set to wrong.");
        document.getElementById("email").classList.toggle("redfield", !document.getElementById("email").classList.contains("redfield"));
    } else {
        console.log("Name set to wrong.");
        document.getElementById("email").classList.toggle("redfield", document.getElementById("email").classList.contains("redfield"));
    }*/ // checks if email matches email regex
}

function checkConsent() {
    console.log("Consent field changed!");
    document.getElementById("consent").classList.toggle("redfield", !document.getElementById("consent").checked);
    /*if (!document.getElementById("consent").checked) {
        console.log("Name set to wrong.");
        document.getElementById("consent").classList.toggle("redfield", !document.getElementById("consent").classList.contains("redfield"))
    } else {
        console.log("Name set to wrong.");
        document.getElementById("consent").classList.toggle("redfield", document.getElementById("consent").classList.contains("redfield"));
    }*/ // checks if email matches email regex
}