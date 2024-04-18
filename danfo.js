const dataArray = require("./sData.js");
const { DataFrame } = require('danfojs-node');

function GroupbyStatus(dataArray) {
    const df = new DataFrame(dataArray);
    const counts = df
        .groupBy('status')
        .agg({ count: 'count', totalResponses: 'sum' })
        .rename({ count: 'count', totalResponses: 'totalResponses' })
        .renameIndex('status')
        .fillNa(0)
        .reindex(['Closed', 'Active', 'Hold'])
        .toDict();

    return counts;
}

function calculateParticipantsByMonth(dataArray) {
    const df = new DataFrame(dataArray);
    const participantsByMonth = df
        .apply((row) => {
            const createdDate = new Date(row.get('createdDate') * 1000);
            return createdDate.toLocaleString('default', { month: 'short', year: 'numeric' });
        }, axis=1, columns=['monthYear'])
        .groupBy('monthYear')
        .agg({ totalResponses: 'sum' })
        .toDict();

    return participantsByMonth;
}

module.exports = { GroupbyStatus, calculateParticipantsByMonth };
