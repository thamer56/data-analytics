// import data 
const dataArray = require("./sData.js");
function GroupbyStatus(dataArray){
    const counts = dataArray.reduce((acc, obj) => {
        acc[obj.status] = (acc[obj.status] || 0) + 1;
        return acc;
    }, {});

    // Assurez-vous que toutes les valeurs possibles sont incluses
    ['Closed', 'Active', 'Hold'].forEach(status => {
        if (!(status in counts)) {
            counts[status] = 0;
        }
    });

    return counts;
}

const counts = GroupbyStatus(dataArray);

// Affiche le décompte de chaque statut
console.log(counts);



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
  
  const participantsByMonth = calculateParticipantsByMonth(dataArray);
  console.log(participantsByMonth);
  