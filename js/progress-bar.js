const element = document.documentElement;
const body = document.body;
const progress = document.querySelector('.progress-bar');

document.addEventListener('scroll', () => {
    const scroll =
        (element.scrollTop || body.scrollTop) /
        ((element.scrollHeight || body.scrollHeight) - element.clientHeight) *
        100;

    progress.style.setProperty('--scroll', `${scroll}%`);
});