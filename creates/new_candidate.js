const http = require('https'); // require('http') if your URL is not https

function converToLocalTime() {
  var dateStr = new Date();
  // dateStr = dateStr.toISOString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"); // this will return as just the server date format i.e., yyyy-MM-dd'T'HH:mm:ss.SSS'Z'
  dateStr = dateStr.toISOString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  return dateStr;
}


const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://{{bundle.authData.subdomain}}/api/v2/candidate',
    method: 'POST',
    body: {
      "candidate_source_id": bundle.inputData.candidate_source_id,
      "email": bundle.inputData.email,
      "first_name": bundle.inputData.first_name,
      "last_name": bundle.inputData.last_name,
      "registration_date": converToLocalTime()
      },  
    headers: {
        'id-token': '{{bundle.authData.id_token}}',
        'Content-Type': 'application/json',
        'x-api-key': '{{process.env.CLIENT_SECRET}}',
    },
  });
  return response.json;
};

module.exports = {
  key: 'new_candidate',
  noun: 'Candidate',
  display: {
    label: 'New Candidate',
    description: 'Adds a new candidate.',
  },
  operation: {
    inputFields: [
      { key: 'email', required: true, type: 'string', label: 'Email' },
      {
        key: 'candidate_source_id',
        required: false,
        label: 'ID of the candidate source in vincere',
        dynamic: 'source.value_search.description'
      },
      { key: 'first_name', required: true, type: 'string', label: 'First Name' },
      { key: 'last_name', required: false, type: 'string', label: 'Last Name' }
    ],
    perform,
    sample: {
      id: 1,
      title: 'Sample Title',
      content: 'Sample note.'      
    },
  },
};