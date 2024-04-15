const dataArray = require("./sData.js");
const dataForge = require('data-forge');
require('data-forge-fs');

async function GroupbyStatus(dataArray) {
    const df = new dataForge.DataFrame(dataArray);
    const grouped = df
        .groupBy(row => row.status)
        .select(group => ({
            status: group.first().status,
            count: group.count(),
            totalResponses: group.deflate(row => row.numberOfResponses).sum(),
        }))
        .inflate();

    const result = {};
    grouped.forEach(row => {
        result[row.status] = {
            count: row.count,
            totalResponses: row.totalResponses
        };
    });

    ['Closed', 'Active', 'Hold'].forEach(status => {
        if (!(status in result)) {
            result[status] = { count: 0, totalResponses: 0 };
        }
    });

    return result;
}

async function calculateParticipantsByMonth(dataArray) {
    const df = new dataForge.DataFrame(dataArray);
    const participantsByMonth = df
        .select(row => ({
            createdDate: new Date(row.createdDate * 1000),
            numberOfResponses: row.numberOfResponses
        }))
        .groupBy(row => row.createdDate.toLocaleString('default', { month: 'short', year: 'numeric' }))
        .select(group => ({
            monthYear: group.first().createdDate.toLocaleString('default', { month: 'short', year: 'numeric' }),
            totalResponses: group.deflate(row => row.numberOfResponses).sum()
        }))
        .inflate();

    const result = {};
    participantsByMonth.forEach(row => {
        result[row.monthYear] = row.totalResponses;
    });

    return result;
}

module.exports = { GroupbyStatus, calculateParticipantsByMonth };
