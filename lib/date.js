const regexformatYYYYMMDD = /^(\d{4})-(\d{2})-(\d{2})$/;

export function getProperDate(dateString) {
    if (!dateString) {
        return null;
    }

    let isFormatYYYYMMDD = dateString.match(regexformatYYYYMMDD);

    if (isFormatYYYYMMDD) {
        let year = isFormatYYYYMMDD[1];
        let month = isFormatYYYYMMDD[2];
        let day = isFormatYYYYMMDD[3];

        if (month === '00' || day === '00') {
            return `${year} ${month === '00' ? '' : month} ${day === '00' ? '' : day}`;
        }
    }

    return new Date(dateString).toLocaleDateString(undefined, {
        day: 'numeric',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

export function formatDateToDisplay(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}

export function getYear(date) {
    if (!date) return null;
    var d = new Date(date),
        year = d.getFullYear();

    return year;
}
