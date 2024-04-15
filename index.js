const dataArray = require("./sData.js");
const { GroupbyStatus, calculateParticipantsByMonth } = require("./functions.js");

const counts = GroupbyStatus(dataArray);
console.log(counts);


const countsByMonth = calculateParticipantsByMonth(dataArray);
console.log(countsByMonth);
