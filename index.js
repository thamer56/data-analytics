const dataArray = require("./sData.js");
const { GroupbyStatus, participantsByMonth } = require("./functions.js");

const counts = GroupbyStatus(dataArray);
console.log(counts);

const countsByMonth = participantsByMonth(dataArray);
console.log(countsByMonth);
