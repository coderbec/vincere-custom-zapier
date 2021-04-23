
const perform = async (z, bundle) => {
  const request = await {
    url: 'https://{{bundle.authData.subdomain}}/api/v2/resume/parse',
    method: 'POST',
    body: {
      "url": bundle.inputData.url,
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
  key: 'new_candidate_resume',
  noun: 'Candidate',
  display: {
    label: 'Parse CV',
    description: 'Adds a new candidate from a Resume.',
  },
  operation: {
    inputFields: [
      { key: 'url', required: true, type: 'string', label: 'URL' },
    ],
    perform,
    sample: {
      id: 1,
      title: 'Sample Title',
      content: 'Sample note.'      
    },
  },
};