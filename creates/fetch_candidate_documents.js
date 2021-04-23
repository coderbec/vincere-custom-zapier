const perform = async (z, bundle) => {
  const request = {
        url:
        'https://{{bundle.authData.subdomain}}/api/v2/candidate/{{bundle.inputData.id}}/files',
        method: 'GET',
        params: {
          original_cv: true
        },
        headers: {
          'Content-Type': 'application/json',
          'id-token': '{{bundle.authData.id_token}}',
          'x-api-key': '{{process.env.CLIENT_SECRET}}',
        },
        body: { id: '{{bundle.inputData.id}}' },
        removeMissingValuesFrom: {},
    };

    const response = await z.request(request);
    const documentTypeArray = JSON.parse(response.content);
    // documentTypeArray.forEach(document => {
    //   // copy the "url" field into an "id" field
    //   document.id = document.value;
    // });
    return documentTypeArray[0];
};

module.exports = {
    operation: {
      perform,
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
    noun: 'Documents',
    display: {
      label: 'Fetch Candidate documents By ID',
      description: 'Fetches a Candidate documents by candidate ID',
      hidden: false,
      important: true,
    },
  };
  