//const sample = require('../samples/sample_issue');

const triggerIssue = async (z, bundle) => {
  const responsePromise = await z.request({
    method: 'GET',
    url: `https://{{bundle.authData.subdomain}}/api/v2/job/search/sort=created_date%20desc`,
    headers: {
      'id-token': '{{bundle.authData.id_token}}',
      'Content-Type': 'application/json',
      'x-api-key': '{{process.env.CLIENT_SECRET}}',
    }
  });

  const jobsArray = responsePromise.json;
  return jobsArray.result.items;
};

module.exports = {
  key: 'jobs',
  noun: 'Job',

  display: {
    label: 'Get Job',
    description: 'Triggers on a new job.'
  },

  operation: {
    inputFields: [
  /*     {key: 'repo', label:'Repo', required: true, dynamic: 'repo.full_name.full_name'},
      {key:'filter', required: false, label: 'Filter', choices: {assigned:'assigned',created:'created',mentioned:'mentioned',subscribed:'subscribed',all:'all'}, helpText:'Default is "assigned"'},
      {key:'state', required: false, label: 'State', choices: {open:'open',closed:'closed',all:'all'}, helpText:'Default is "open"'} */
    ],
    perform: triggerIssue,

    //sample: sample
  }
};
