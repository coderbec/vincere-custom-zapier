const http = require('https'); // require('http') if your URL is not https

const FormData = require('form-data');

// Getting a stream directly from http. This only works on core 10+. For core
// 9.x compatible code, see uploadFile_v9.js.
const makeDownloadStream = (url) =>
  new Promise((resolve, reject) => {
    http.request(url, resolve).on('error', reject).end();
  });

const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://{{bundle.authData.subdomain}}/api/v2/candidate/{{bundle.inputData.id}}/notes',
    method: 'POST',
    body: {
        "title": bundle.inputData.title,
        "content": bundle.inputData.content
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
  key: 'new_note',
  noun: 'Note',
  display: {
    label: 'New Candidate Note',
    description: 'Adds a new note for a candidate.',
  },
  operation: {
    inputFields: [
      { key: 'id', required: true, type: 'integer', label: 'Candidate ID' },
      { key: 'title', required: true, type: 'string', label: 'Title of the note' },
      { key: 'content', required: false, type: 'string', label: 'Content of the note' }
    ],
    perform,
    sample: {
      id: 1,
      title: 'Sample Title',
      content: 'Sample note.'      
    },
  },
};