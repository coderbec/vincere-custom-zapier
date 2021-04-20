//const { extractID } = require('../utils');

// Fetches a list of records from the endpoint
const perform = async (z, bundle) => {
  const request = {
    url: 'https://{{bundle.authData.subdomain}}/api/v2/def/candidate/documenttypes',
    params: {},
    headers: {
       'id-token': '{{bundle.authData.id_token}}',
       'x-api-key': '{{process.env.CLIENT_SECRET}}'
    },
  };

  // This API returns things in "pages" of results
  // if (bundle.meta.page) {
  //   request.params.page = 1 + bundle.meta.page;
  // }

  const response = await z.request(request);
  const documentTypeArray = JSON.parse(response.content);
  documentTypeArray.forEach(document => {
    // copy the "url" field into an "id" field
    document.id = document.value;
  });
  return documentTypeArray;
};

module.exports = {
  key: 'document',
  noun: 'Document',
  display: {
    label: 'List of Document Types',
    description:
      'This is a hidden trigger, and is used in a Dynamic Dropdown of the create.',
    hidden: true,
  },

  operation: {
    // Since this is a "hidden" trigger, there aren't any inputFields needed
    perform,
    // The folowing is a "hint" to the Zap Editor that this trigger returns data
    // "in pages", and that the UI should display an option to "load more" to
    // the human.
    canPaginate: false,
  },
};