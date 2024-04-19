const dfd = require("danfojs-node");
const dataArray = require("./sData.js");
const moment = require('moment');
const dateTransformer = dt => (moment.unix(dt).format('YYYY-MM'))
const df = new  dfd.DataFrame(dataArray);
const df_rep = df["createdDate"].apply(dateTransformer)
df.addColumn("month", df_rep, { inplace: true });
const grp = df.groupby(["month"]).agg({"numberOfResponses":"sum","status":"count"})
//grp.sortValues("month", { inplace: true })
const jsonObj = dfd.toJSON(grp); //column format
// const result = {
//     month: jsonObj.map(item => item.month),
//     numberOfResponses_sum: jsonObj.map(item => item.numberOfResponses_sum),
//     status_count: jsonObj.map(item => item.status_count)
//   };
  
// console.log(result);
console.log(jsonObj);

   