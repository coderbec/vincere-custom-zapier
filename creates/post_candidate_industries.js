
const perform = async (z, bundle) => {
    const request = {
      url: 'https://{{bundle.authData.subdomain}}/api/v2/candidate/{{bundle.inputData.id}}/subindustries',
      method: 'PUT',
      body: '{{bundle.inputData.jsonBody}}',  
      headers: {
          'id-token': '{{bundle.authData.id_token}}',
          'Content-Type': 'application/json',
          'x-api-key': '{{process.env.CLIENT_SECRET}}',
      },
    };
  
    const response = await z.request(request);
    return response;
  };
  
  module.exports = {
    key: 'new_candidate_industries',
    noun: 'Industry',
    display: {
      label: 'New Candidate Industries',
      description: 'Set all industry and child sub-industry values for a candidate.',
    },
    operation: {
      inputFields: [
        { key: 'id', required: true, type: 'string', label: 'Candidate ID' },
        { key: 'jsonBody', required: true, type: 'string', label: 'Input full JSON String' },
      ],
      perform,
      sample: {
        id: 1,
        title: 'Sample Title',
        content: 'Sample note.'      
      },
    },
  };