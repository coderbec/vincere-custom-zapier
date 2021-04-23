
const perform = async (z, bundle) => {
    const request = await {
      url: 'https://{{bundle.authData.subdomain}}/api/v2/candidate/{{bundle.inputData.id}}/notes',
      method: 'PUT',
      body: {
        "title": bundle.inputData.address,
        "content": bundle.inputData.address_line1,
      },  
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
    key: 'new_candidate_note',
    noun: 'Note',
    display: {
      label: 'New Candidate Note',
      description: 'Adds a note to the candidate by ID',
    },
    operation: {
      inputFields: [
        { key: 'id', required: false, type: 'string', label: 'Candidate ID' },
        { key: 'title', required: false, type: 'string', label: 'Title' },
        { key: 'content', required: false, type: 'string', label: 'Content' },
      ],
      perform,
      sample: {
        id: 1,
        title: 'Sample Title',
        content: 'Sample note.'      
      },
    },
  };