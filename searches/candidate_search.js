// find a particular recipe by name
const searchCandidate = async (z, bundle) => {
    const request = {
      url: 'https://{{bundle.authData.subdomain}}/api/v2/candidate/search/fl=id,name,created_date,industry,current_city,current_location?q=primary_email:{{bundle.inputData.email}}#',
      method: 'GET',
      headers: {
        'id-token': '{{bundle.authData.id_token}}',
        'Content-Type': 'application/json',
        'x-api-key': '{{process.env.CLIENT_SECRET}}',
      },
    //   params: {
    //     name: bundle.inputData.name
    //   }
    };

    const response = await z.request(request);

    const documentTypeObject = response.json;
  
    // documentTypeArray.forEach(document => {
    //  // copy the "url" field into an "id" field
    //  document.id = document.value;
    // });
    return documentTypeObject.result.items;
  };
  
  module.exports = {
    key: 'candidate',
    noun: 'Candidate',
  
    display: {
      label: 'Find a Candidate',
      description: 'Finds a Candidate.'
    },
  
    operation: {
      inputFields: [
        {key: 'email', required: false, helpText: 'Main email of the candidate.'}
      ],
      perform: searchCandidate,
  
      sample: {
        id: 1,
        name: 'Test'
      },
    },
  };