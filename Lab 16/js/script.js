/*eslint-env browser*/

var $ = function (id) {
    "use strict";
    return window.document.getElementById(id);
};

var calculateDays = function () {
    "use strict";
    var event, dt, year, date, today, oneDay, days;
    
    event = $("event").value;
    dt = $("date").value;
    
    //MAKE SURE EVENT AND DATE ARE ENTERED
    if (event.length === 0 || dt.length === 0) {
        $("message").innerHTML = "Please enter both an event name and date";
        return;
    }
    
    //MAKE SURE STRING HAS SLASHES
    if (dt.indexOf("/") === -1) {
        $("message").innerHTML = "Please enter the date in MM/DD/YYYY format";
        return;
    }
    
    //MAKE SURE DATE HAS 4-DIGIT YEAR
    year = dt.substring(dt.length - 4);
    if (isNaN(year)) {
        $("message").innerHTML = "Please enter the date in MM/DD/YYYY format";
        return;
    }
    
    //CONVERT THTE DATE TO A DATE OBJECT AND MAKE SURE IT IS VALID
    date = new Date(dt);
    if (date === "Invalid Date") {
        $("message").innerHTML = "Please enter the date in MM/DD/YYYY format";
        return;
    }
    
    // CALCULATE DAYS
    today = new Date();
    oneDay = 24 * 60 * 60 * 1000; //HOURS * MINUTES * SECONDS * MILLISECONDS
    days = (date.getTime() - today.getTime()) / oneDay;
    days = Math.ceil(days);
    
    
    //CREATE AND DISPLAY MESSAGE
    //IF DATE IS TODAY
    if (days === 0) {
        $("message").innerHTML = "Today is " + event + ". " + date.toDateString();
    }
    
    //IF DATE HAS PASSED
    if (days < 0) {
        $("message").innerHTML = event + " has already happened. " + Math.abs(days) + " ago." + date.toDateString();
    }
    
    //IF DATE IS IN THE FUTURE
    if (days > 0) {
        $("message").innerHTML = Math.abs(days) + " until " + event + ". " + date.toDateString();
    }
};

window.addEventListener("load", function () {
    "use strict";
    $("countdown").addEventListener("click", calculateDays);
});