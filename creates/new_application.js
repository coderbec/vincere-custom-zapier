const http = require('https'); // require('http') if your URL is not https

function converToLocalTime() {
  var dateStr = new Date();
  // dateStr = dateStr.toISOString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"); // this will return as just the server date format i.e., yyyy-MM-dd'T'HH:mm:ss.SSS'Z'
  dateStr = dateStr.toISOString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  return dateStr;
}


const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://{{bundle.authData.subdomain}}/api/v2/application',
    method: 'POST',
    body: {
      "candidate_id": bundle.inputData.candidate_id,
      "job_id": bundle.inputData.job_id,
      "registration_date": converToLocalTime(),
      "stage": "SHORTLISTED"
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
  key: 'new_application',
  noun: 'Application',
  display: {
    label: 'New Application',
    description: 'Adds a new candidate application for a job.',
  },
  operation: {
    inputFields: [
      { key: 'candidate_id', required: true, type: 'string', label: 'Candidate ID' },
      { key: 'job_id', required: true, type: 'string', label: 'Job ID' }
    ],
    perform,
    sample: {
      id: 1,
      title: 'Sample Title',
      content: 'Sample note.'      
    },
  },
};