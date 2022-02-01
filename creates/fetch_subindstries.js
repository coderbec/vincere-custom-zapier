const perform = async (z, bundle) => {
  const request = {
        url:
        'https://{{bundle.authData.subdomain}}/api/v2/subindustries',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'id-token': '{{bundle.authData.id_token}}',
          'x-api-key': '{{process.env.CLIENT_SECRET}}',
        },
        removeMissingValuesFrom: {},
    };

    const response = await z.request(request);
    const documentTypeArray = response.data;
    documentTypeArray.forEach(document => {
      // copy the "url" field into an "id" field
      document.id = document.value;
    });
    return {documentTypeArray};
};

module.exports = {
  operation: {
    perform, 
  },
  key: 'fetch_subindustries',
  noun: 'Industry',
  display: {
    label: 'Fetch All Sub Industry',
    description: 'Fetch All Sub Industry',
    hidden: false,
    important: true,
  },
};
