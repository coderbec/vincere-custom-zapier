module.exports = {
  operation: {
    perform: {
      url:
        'https://{{bundle.authData.subdomain}}/api/v2/candidate/{{bundle.inputData.id}}',
      method: 'GET',
      params: {},
      headers: {
        'Content-Type': 'application/json',
        'id-token': '{{bundle.authData.id_token}}',
        'x-api-key': '{{process.env.CLIENT_SECRET}}',
      },
      body: { id: '{{bundle.inputData.id}}' },
      removeMissingValuesFrom: {},
    },
    inputFields: [
      {
        key: 'id',
        label: 'ID',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
  },
  key: 'fetch_candidate',
  noun: 'Candidate',
  display: {
    label: 'Fetch Candidate By ID',
    description: 'Fetches a Candidate By ID',
    hidden: false,
    important: true,
  },
};
