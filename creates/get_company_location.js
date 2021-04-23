const perform = async (z, bundle) => {
  const request = {
    url:
    'https://{{bundle.authData.subdomain}}/api/v2/company/{{bundle.inputData.id}}/locations',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'id-token': '{{bundle.authData.id_token}}',
        'x-api-key': '{{process.env.CLIENT_SECRET}}',
      },
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
    key: 'get_company_applications',
    noun: 'Location',
    display: {
      label: 'Fetch Company Location by ID',
      description: 'Gets the location of a company by company ID',
      hidden: false,
      important: true,
    },
  };
  