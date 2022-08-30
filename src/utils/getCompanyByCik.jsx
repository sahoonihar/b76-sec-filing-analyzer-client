import companies from '../data/companies.json';
import companiesOverview from '../data/companiesOverview.json';

export const getCompanyByCik = (cik) =>
  companies.find((_company) => _company.cik === cik) ?? {};

export const getCompanyOverviewByName = (name) => companiesOverview[name];
