function scrollIndicator() {
    console.log(document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight));
    document.querySelector(".indicator__bar").style.width = `${100 * document.documentElement.scrollTop / (document.documentElement.scrollHeight - window.innerHeight)}%`;
}

getWorking = () => {
    //console.log(`body height: ${document.documentElement.scrollHeight}`);
    window.addEventListener('scroll', scrollIndicator);
}