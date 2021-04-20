const candidateFields = async (z, bundle) => {
  const httpOptions = {
    headers: {
      'id-token': '{{bundle.authData.id_token}}',
      'Content-Type': 'application/json',
      'x-api-key': '{{process.env.CLIENT_SECRET}}',
    },
    method: 'GET'
  };
  const response = await z.request(
    'https://{{bundle.authData.subdomain}}/api/v2/candidate/{{bundle.inputData.id}}',
    httpOptions
  );

  // response.throwForStatus() if you're using core v9 or older

  return response.data; // or response.json if you're using core v9 or older
};

module.exports = {
  operation: {
    perform: {
      url:
        'https://addstaff.vincere.io/api/v2/candidate/{{bundle.inputData.id}}',
      method: 'PUT',
      headers: {
        'id-token': '{{bundle.authData.id_token}}',
        'Content-Type': 'application/json',
        'x-api-key': '{{process.env.CLIENT_SECRET}}',
      },
      body: {
        phone: '{{bundle.inputData.phone}}',
        candidate_source_id: '{{bundle.inputData.candidate_source_id}}',
        email: '{{bundle.inputData.email}}',
        first_name: '{{bundle.inputData.first_name}}',
        last_name: '{{bundle.inputData.last_name}}',
        registration_date: '{{bundle.inputData.registration_date}}',
      },
      removeMissingValuesFrom: {},
    },
    inputFields: [
      {
        key: 'phone',
        label: 'Candidate Phone',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'id',
        label: 'Candidate ID',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: true,
      },
      {
        key: 'candidate_source_id',
        label: 'Candidate Source Id',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'email',
        label: 'Email',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'first_name',
        label: 'First Name',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'last_name',
        label: 'Last Name',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'registration_date',
        label: 'Registration Date',
        type: 'string',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
  },
  key: 'update_candidate',
  noun: 'Candidate',
  display: {
    label: 'Update Candidate',
    description:
      "Updates a candidate's details - use to reformate phone number, etc. ",
    hidden: false,
    important: true,
  },
};
