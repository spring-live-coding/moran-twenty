// Placeholder figures taken from the design: they are not read from the workspace yet.
export const DASHBOARD_OVERVIEW_PATH = '/dashboard';

export const DASHBOARD_KPIS = [
  { key: 'companies', label: 'Companies', value: '1,284', delta: '+4.2%' },
  { key: 'people', label: 'People', value: '5,931', delta: '+2.8%' },
  {
    key: 'opportunities',
    label: 'Open opportunities',
    value: '86',
    delta: '+12',
  },
  { key: 'pipeline', label: 'Pipeline value', value: '$482k', delta: '+6.1%' },
] as const;

export const DASHBOARD_NEW_COMPANIES_PER_MONTH = [
  { month: 'Jan', count: 38 },
  { month: 'Feb', count: 46 },
  { month: 'Mar', count: 42 },
  { month: 'Apr', count: 58 },
  { month: 'May', count: 64 },
  { month: 'Jun', count: 61 },
  { month: 'Jul', count: 78 },
  { month: 'Aug', count: 86 },
];

export const DASHBOARD_LARGEST_COMPANIES = [
  { name: 'Splunk', employees: 8891 },
  { name: 'ZoomInfo', employees: 3875 },
  { name: 'Retired Life', employees: 3774 },
  { name: 'Odessa', employees: 1415 },
  { name: 'isolved', employees: 1261 },
];

export const DASHBOARD_RECENT_COMPANIES = [
  { name: 'Housecall Pro', city: 'Denver', owner: 'Phil Schiler' },
  { name: 'Odessa', city: 'Philadelphia', owner: 'Phil Schiler' },
  { name: 'airSlate', city: 'Brookline', owner: 'Jony Ive' },
  { name: 'Splunk', city: 'San Francisco', owner: 'Phil Schiler' },
];
