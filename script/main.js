let activeSection = 1;

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

function getWorking () {
    //console.log(`body height: ${document.documentElement.scrollHeight}`);
    window.addEventListener('scroll', scrollIndicator);
    document.querySelector(".nav-div__toggle").addEventListener('click', toggleNav);
}

function toggleNav() {
    document.querySelector(".nav-div__toggle").classList.toggle('navtoggle--active');
    document.querySelector(".nav").classList.toggle('nav--active');
}