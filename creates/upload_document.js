const http = require('https'); // require('http') if your URL is not https

const FormData = require('form-data');

// Getting a stream directly from http. This only works on core 10+. For core
// 9.x compatible code, see uploadFile_v9.js.
const makeDownloadStream = (url) =>
  new Promise((resolve, reject) => {
    http.request(url, resolve).on('error', reject).end();
  });

const perform = async (z, bundle) => {
  const form = new FormData();

  form.append('filename', bundle.inputData.filename);

  // bundle.inputData.file will in fact be an URL where the file data can be
  // downloaded from which we do via a stream
  const stream = await makeDownloadStream(bundle.inputData.file, z);
  form.append('file', stream);

  const response = await z.request({
    url: 'https://{{bundle.authData.subdomain}}/api/v2/candidate/{{bundle.inputData.id}}/file',
    method: 'POST',
    body: {
        "file_name": bundle.inputData.file_name,
        "document_type_id": bundle.inputData.document_type_id,
        "url": bundle.inputData.url,
        "original_cv": false
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
  key: 'uploadFile_v10',
  noun: 'File',
  display: {
    label: 'Upload File v10',
    description: 'Uploads a file. Only works on zapier-platform-core v10+.',
  },
  operation: {
    inputFields: [
      { key: 'id', required: true, type: 'string', label: 'Candidate ID' },
      { key: 'file_name', required: true, type: 'string', label: 'Name of the document' },
      {
        key: 'document_type_id',
        required: true,
        label: 'ID of the document type in vincere',
        dynamic: 'document.value.description'
      },
      { key: 'url', required: false, type: 'string', label: 'Url where the document is stored' },
      { key: 'base_64_content', required: false, type: 'string', label: 'Content of the document encoded with base64 encoding' },
      { key: 'original_cv', required: false, type: 'boolean', label: 'if true, this new document will be set as original CV' },
    ],
    perform,
    sample: {
      file_name: 'example.pdf',
      document_type_id: 1,
      url: 'SAMPLE FILE'      
    },
  },
};