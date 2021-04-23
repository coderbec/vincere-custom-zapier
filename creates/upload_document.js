const http = require('https'); // require('http') if your URL is not https

function converToLocalTime() {
  var dateStr = new Date();
  // dateStr = dateStr.toISOString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"); // this will return as just the server date format i.e., yyyy-MM-dd'T'HH:mm:ss.SSS'Z'
  dateStr = dateStr.toISOString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  return dateStr;
}


const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://{{bundle.authData.subdomain}}/api/v2/candidate/{{bundle.inputData.id}}/file',
    method: 'POST',
    body: {
      "file_name": bundle.inputData.file_name,
      "document_type_id": bundle.inputData.document_type_id,
//      "url": bundle.inputData.url,
      "base_64_content": bundle.inputData.base_64_content,
      "original_cv": bundle.inputData.original_cv
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
  key: 'new_candidate_document',
  noun: 'Document',
  display: {
    label: 'Upload Candidate Document/CV',
    description: 'Adds a new candidate document.',
  },
  operation: {
    inputFields: [
      { key: 'id', required: true, type: 'string', label: 'Candidate ID' },
      { key: 'file_name', required: true, type: 'string', label: 'File Name' },
      {
        key: 'document_type_id',
        required: false,
        label: 'ID of the document type in vincere',
        dynamic: 'document.value_search.description'
      },
      { key: 'base_64_content', required: true, type: 'string', label: 'Document' },
      {
        key: 'original_cv',
        label: 'Register this as the candidate\'s original VC', 
        required: true,
        choices: { true: 'true', false: 'false' },
      }
    ],
    perform,
    sample: {
      id: 1,
      title: 'Sample Title',
      content: 'Sample note.'      
    },
  },
};