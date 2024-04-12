// import data 
const dataArray = require("./sData.js");
const counts = dataArray.reduce((acc, obj) => {
    acc[obj.status] = (acc[obj.status] || 0) + 1;
    return acc;
  }, {});
  
  const result = Object.keys(counts).map(status => ({ status, count: counts[status] }));
  
  console.log(result);