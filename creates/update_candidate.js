const http = require('https'); // require('http') if your URL is not https

function converToLocalTime(date) {
  var dateStr = new Date(date);
  // dateStr = dateStr.toISOString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"); // this will return as just the server date format i.e., yyyy-MM-dd'T'HH:mm:ss.SSS'Z'
  dateStr = dateStr.toISOString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  return dateStr;
}

function converToLocalTime() {
  var dateStr = new Date();
  // dateStr = dateStr.toISOString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"); // this will return as just the server date format i.e., yyyy-MM-dd'T'HH:mm:ss.SSS'Z'
  dateStr = dateStr.toISOString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  return dateStr;
}


const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://{{bundle.authData.subdomain}}/api/v2/candidate/{{bundle.inputData.id}}',
    method: 'PUT',
    body: {
      "candidate_source_id": bundle.inputData.candidate_source_id,
      "email": bundle.inputData.email,
      "first_name": bundle.inputData.first_name,
      "last_name": bundle.inputData.last_name,
      "phone": bundle.inputData.phone,
      "registration_date": converToLocalTime(),
      "date_of_birth": converToLocalTime(bundle.inputData.date_of_birth),
      "emergency_name": bundle.inputData.emergency_name,
      "emergency_phone": bundle.inputData.emergency_phone,
      "emergency_relationship": bundle.inputData.emergency_relationship,
      "emergency_email": bundle.inputData.emergency_email,
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
  key: 'update_candidate',
  noun: 'Candidate',
  display: {
    label: 'Update Candidate',
    description: 'Updates all candidate core details.',
  },
  operation: {
    inputFields: [
      { key: 'id', required: true, type: 'string', label: 'Candidate ID' },
      { key: 'email', required: true, type: 'string', label: 'Email' },
      {
        key: 'candidate_source_id',
        required: false,
        label: 'ID of the candidate source in vincere',
        dynamic: 'source.value_search.description'
      },
      { key: 'first_name', required: true, type: 'string', label: 'First Name' },
      { key: 'last_name', required: false, type: 'string', label: 'Last Name' },
      { key: 'phone', required: false, type: 'string', label: 'Primary Phone' },
      { key: 'date_of_birth', required: false, type: 'string', label: 'Date of Birth' },
      { key: 'emergency_name', required: false, type: 'string', label: 'Emergency Name' },
      { key: 'emergency_phone', required: false, type: 'string', label: 'Emergency Phone' },
      { key: 'emergency_relationship', required: false, type: 'string', label: 'Emergency Relationship' },
      { key: 'emergency_email', required: false, type: 'string', label: 'Emergency Email' },
    ],
    perform,
    sample: {
      id: 1,
      title: 'Sample Title',
      content: 'Sample note.'      
    },
  },
};