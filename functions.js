const dataArray = require("./sData.js");
function GroupbyStatus(dataArray){
    const counts = dataArray.reduce((acc, obj) => {
        acc[obj.status] = (acc[obj.status] || { count: 0, totalResponses: 0 });
        acc[obj.status].count += 1;
        acc[obj.status].totalResponses += obj.numberOfResponses;
        return acc;
    }, {});

    // Assurez-vous que toutes les valeurs possibles sont incluses
    ['Closed', 'Active', 'Hold'].forEach(status => {
        if (!(status in counts)) {
            counts[status] = { count: 0, totalResponses: 0 };
        }
    });

    return counts;
}




function calculateParticipantsByMonth(dataArray) {
  const participantsByMonth = {};

  dataArray.forEach(survey => {
    const createdDate = new Date(survey.createdDate * 1000);
    const monthYear = createdDate.toLocaleString('default', { month: 'short', year: 'numeric' });

    if (participantsByMonth[monthYear]) {
      participantsByMonth[monthYear] += survey.numberOfResponses;
    } else {
      participantsByMonth[monthYear] = survey.numberOfResponses;
    }
  });

  return participantsByMonth;
}

  
  module.exports = { GroupbyStatus, calculateParticipantsByMonth };
  