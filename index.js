const timezone = document.querySelector('.timezone');
const currentTime = document.querySelector('.current-time');
const currentDate = document.querySelector('.current-date');

const timezoneDetermined = Intl.DateTimeFormat().resolvedOptions().timeZone;
timezone.innerHTML = timezoneDetermined;

function clockMaster() {
    const now = dayjs();
    const formatedCurrentTime = now.format(`HH:mm:ss`);
    const formatedCurrentDate = now.format(`dddd, D MMMM, YYYY`);

    currentDate.innerHTML = formatedCurrentDate;
    currentTime.innerHTML = formatedCurrentTime;
}

clockMaster();

setInterval(()=> {
    clockMaster();
}, 1000);



