const moment = require('moment');

const getMonthInString = (value) => {
    let curMonth = moment().month() + 1

    switch(true){
        case curMonth = 1:
            return '01'
            break
        case curMonth = 2:
            return '02'
            break
        case curMonth = 3:
            return '03'
            break
        case curMonth = 4:
            return '04'
            break
        case curMonth = 5:
            return '05'
            break
        case curMonth = 6:
            return '06'
            break
        case curMonth = 7:
            return '07'
            break
        case curMonth = 8:
            return '08'
            break
        case curMonth = 9:
            return '09'
            break
        case curMonth = 10:
            return '10'
            break
        case curMonth = 11:
            return '11'
            break
        case curMonth = 12:
            return '12'
            break

        default:
            return '01'
    }
}

module.exports = {
    getMonthInString
}