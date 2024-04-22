const dataArray = require("./sData.js");
const { GroupbyStatus, calculateParticipantsByMonth } = require("./danfo.js");
console.time()
const counts = GroupbyStatus(dataArray);
console.log(counts);
console.timeEnd()
console.time()
const countsByMonth = calculateParticipantsByMonth(dataArray);
console.log(countsByMonth);
console.timeEnd()
//firebase -> firestore (no sql)