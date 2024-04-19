const pds = require('./pollDataSet');
const dataForge = require('data-forge');
const moment = require('moment');

// Convert JSON string to a DataFrame
const df = dataForge.fromJSON(JSON.stringify(pds));

// Transform the 'createdDate' field to the correct format
const transformed = df.select(row => { 
    const clone = Object.assign({}, row); 
    clone['createdDate'] = moment.unix(clone.createdDate.seconds).format('YYYY-MM'); 
    return clone;
});
// console.log(transformed.head(5).toString());
// Group surveys by month and count the number of surveys for each month
const surveyCounts = transformed
    .groupBy(row => row.createdDate)
    .select(group => ({
        Month: group.first().createdDate,
        Count: group.count()
    }));
//    console.log(surveyCounts.head(5).toArray());
// Generate the last 12 months
const currentYear = moment().year();
const twelveMonths =  Array.from({ length: 12 }, (_, i) => moment(`${currentYear}-${i + 1}`, 'YYYY-MM').format('YYYY-MM'));

//console.log(twelveMonths);
// Fill in missing months with zero counts
const finalResult = twelveMonths.map(month => {
    const countSeries = surveyCounts.where(row => row.Month === month);
    const countValue = countSeries.count() > 0 ? countSeries.first().Count : 0;
    return {
        Month: month,
        Count: countValue
    };
});

console.log(finalResult);
