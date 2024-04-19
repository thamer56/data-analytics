const pds = require("./sData");
const dataForge = require("data-forge");
const dfd = require("danfojs-node");
const moment = require("moment");
const dateTransformer = (dt) => moment.unix(dt).format("YYYY-MM");

function countSurveyGroupByStatusDataFoge(data) {
  const defaultStatus = {
    count: 0,
    totalResponses: 0,
  };

  if (!data) {
    return {
      hold: { ...defaultStatus },
      closed: { ...defaultStatus },
      active: { ...defaultStatus },
    };
  }

  const gds = dataForge
    .fromJSON(JSON.stringify(data))
    .groupBy((row) => row.status)
    .select((group) => ({
      status: group.first().status,
      count: group.count(),
      totalResponses: group.deflate((row) => row.numberOfResponses).sum(),
    }))
    .inflate()
    .toArray();

  const transformed = {
    hold: { ...defaultStatus },
    closed: { ...defaultStatus },
    active: { ...defaultStatus },
  };

  gds.forEach((item) => {
    const { status, count, totalResponses } = item;
    transformed[status.toLowerCase()] = { count, totalResponses };
  });

  return transformed;
}
function countSurveyGroupByStatusDanfoJs(data) {
  const defaultStatus = {
    count: 0,
    totalResponses: 0,
  };

  if (!data) {
    return {
      hold: { ...defaultStatus },
      closed: { ...defaultStatus },
      active: { ...defaultStatus },
    };
  }
  const df = new dfd.DataFrame(data);
  //const df_rep = df["createdDate"].apply(dateTransformer)
  //df.addColumn("month", df_rep, { inplace: true });
  const grp = df
    .groupby(["status"])
    .agg({ status: "count", numberOfResponses: "sum" });
  //grp.sortValues("month", { inplace: true })
  const jsonObj = dfd.toJSON(grp);
  // console.log(jsonObj)

  const transformed = {
    hold: { ...defaultStatus },
    closed: { ...defaultStatus },
    active: { ...defaultStatus },
  };

  jsonObj.forEach((item) => {
    const { status, status_count, numberOfResponses_sum } = item;
    transformed[status.toLowerCase()] = {
      count: status_count,
      totalResponses: numberOfResponses_sum,
    };
  });

  return transformed;
}

console.time("countSurveyGroupByStatusDanfoJs");
const y = countSurveyGroupByStatusDanfoJs(pds);
console.timeEnd("countSurveyGroupByStatusDanfoJs");
console.log(y);

console.time("countSurveyGroupByStatusDataFoge");
const x = countSurveyGroupByStatusDataFoge(pds);
console.timeEnd("countSurveyGroupByStatusDataFoge",);
console.log(x);
