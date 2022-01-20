const perform = async (z, bundle) => {
  const request = {
        url:
        'https://{{bundle.authData.subdomain}}/api/v2/user/me',
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
    return documentTypeArray;
};

module.exports = {
    operation: {
      perform
    },
    key: 'fetch_user',
    noun: 'User',
    display: {
      label: 'Fetch current user',
      description: 'Fetches information about the current user',
      hidden: false,
      important: true,
    },
  };
  