const adjustMapping = (company, obj) => {
  const result = {};
  if (!company) return result;

  Object.keys(obj).forEach((key) => {
    result[key] = obj[key]
      .filter((item) => item[Object.keys(item)[0]] !== null)
      .map((item) => {
        const [date] = Object.keys(item);
        const ddate = new Date(date);

        return {
          date: ddate.toJSON(),
          value: parseFloat(item[date]),
          company,
        };
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  });

  return result;
};

export const preprocessData = (data) => ({
  IncomeStatement: adjustMapping(data.Name, data.StatementsOfIncome),
  BalanceSheet: adjustMapping(data.Name, data.BalanceSheets),
  CashFlow: adjustMapping(data.Name, data.StatementsOfCashFlows),
  Name: data.Name,
  Analytics: data.Analytics,
  Sentiment: data.Sentiment,
  Filings: data.Filings,
  'Q&A': data['Q&A'],
});

const combine = (...datas) => {
  const combinedData = {};

  datas.forEach((data) => {
    Object.keys(data).forEach((key) => {
      if (!(key in combinedData)) combinedData[key] = [];
      combinedData[key] = combinedData[key].concat(data[key]);
    });
  });

  return combinedData;
};

export const combineData = (...datas) => {
  const result = {};
  const types = ['IncomeStatement', 'BalanceSheet', 'CashFlow'];

  types.forEach((type) => {
    result[type] = combine(...datas.map((item) => item[type]));
  });

  return result;
};

export const processSimilarity = (data, company) => {
  const result = {};
  const dates = JSON.parse(data.date.replace(/'/g, '"'));
  const simIndex = JSON.parse(data.sim_index.replace(/'/g, '"'));

  Object.keys(simIndex).forEach((type) => {
    result[type] = simIndex[type].map((value, idx) => ({
      value: parseFloat(value),
      date: dates[idx],
      company,
    }));
  });

  return result;
};

export const processLexical = (data, company) => {
  const dates = Object.keys(data).sort();
  const latestData = data[dates[dates.length - 1]];

  return Object.keys(latestData)
    .filter((key) => key !== 'fog_idx')
    .map((metric) => ({
      value: parseFloat(latestData[metric]),
      metric,
      company,
    }));
};
