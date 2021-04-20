// find a particular recipe by name
const searchCandidate = async (z, bundle) => {
    const request = z.request({
      url: 'https://{{bundle.authData.subdomain}}/api/v2/candidate/search/fl=id,name,created_date,industry,current_city,current_location;sort=created_date desc?q=candidate_source_id:29134#',
      headers: {
        'id-token': '{{bundle.authData.id_token}}',
        'Content-Type': 'application/json',
        'x-api-key': '{{process.env.CLIENT_SECRET}}',
      },
    //   params: {
    //     name: bundle.inputData.name
    //   }
    });

    const response = await z.request(request);

    const documentTypeArray = JSON.parse(response.content.result.items);
  
  //   documentTypeArray.forEach(document => {
  //   // copy the "url" field into an "id" field
  //   document.id = document.value;
  // });
  return documentTypeArray;
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
        {key: 'name', required: false, helpText: 'Find the Candidate with this name.'},
        {
            key: 'candidate_source_id',
            required: false,
            label: 'ID of the candidate source in vincere',
            dynamic: 'source.value_search.description'
          }
      ],
      perform: searchCandidate,
  
      sample: {
        id: 1,
        name: 'Test'
      },
  
      outputFields: [
        {key: 'id', label: 'ID'},
        {key: 'name', label: 'Name'}
      ]
    }
  };