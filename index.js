dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

const timezoneDisplay = document.querySelector('.timezone');
const currentTime = document.querySelector('.current-time p');
const currentDate = document.querySelector('.current-date');
const selectTimezone = document.querySelector('#choose-timezone');

let timezoneDetermined = Intl.DateTimeFormat().resolvedOptions().timeZone;
timezoneDisplay.innerHTML = timezoneDetermined;

function clockMaster() {
    const nowInCertainPlace = dayjs().tz(timezoneDetermined);
    const formattedCurrentTime = nowInCertainPlace.format(`HH:mm:ss`);
    const formattedCurrentDate = nowInCertainPlace.format(`dddd, D MMMM, YYYY`);

    currentDate.innerHTML = formattedCurrentDate;
    currentTime.innerHTML = formattedCurrentTime;
}


clockMaster();
setInterval(() => {
    clockMaster();
}, 1000);

MicroModal.init();

function setupSelect() {
    const timezones = Intl.supportedValuesOf('timeZone');
    
    selectTimezone.innerHTML = '';

    const placeholder = document.createElement('option');
    placeholder.textContent = "Pick a timezone";
    placeholder.value = "";
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.hidden = true; 
    selectTimezone.appendChild(placeholder);

    
    timezones.forEach(timezone => {
        const option = document.createElement('option');
        option.value = timezone;
        
        const city = timezone.split('/').pop();
        const formatedCity = city.replace('_', ' ')
        option.textContent = formatedCity;

        selectTimezone.appendChild(option);
    });
}

setupSelect();


function changeTimezone(e) {
    const newTimezone = e.target.value;
    if (newTimezone) {
        timezoneDetermined = newTimezone;
        timezoneDisplay.innerHTML = newTimezone;
        clockMaster(); 
        
        MicroModal.close('modal-1');
        
        setTimeout(() => {
            selectTimezone.value = "";
        }, 500);
    }
}

selectTimezone.addEventListener('change', changeTimezone);


