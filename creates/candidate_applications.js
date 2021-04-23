module.exports = {
  operation: {
    perform: {
      url:
        'https://{{bundle.authData.subdomain}}/api/v2/candidate/{{bundle.inputData.id}}/applications',
      method: 'GET',
      params: {
        index: '{{bundle.inputData.index}}'
      },
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
      {
        key: 'index',
        label: 'Index of the slice to get',
        type: 'string',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
  },
  key: 'fetch_candidate_applications',
  noun: 'Applications',
  display: {
    label: 'Fetch Candidate Application by ID',
    description: 'Fetches a Candidate Applications By ID',
    hidden: false,
    important: true,
  },
};
