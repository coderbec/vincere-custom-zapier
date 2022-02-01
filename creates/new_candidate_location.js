const http = require('https'); // require('http') if your URL is not https

function converToLocalTime() {
  var dateStr = new Date();
  // dateStr = dateStr.toISOString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"); // this will return as just the server date format i.e., yyyy-MM-dd'T'HH:mm:ss.SSS'Z'
  dateStr = dateStr.toISOString("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  return dateStr;
}


const perform = async (z, bundle) => {
  const response = await z.request({
    url: 'https://{{bundle.authData.subdomain}}/api/v2/candidate/{{bundle.inputData.id}}/currentlocation',
    method: 'PUT',
    body: {
      "address_line1": bundle.inputData.address_line1,
      "address_line2": bundle.inputData.address_line2,
      "city": bundle.inputData.city,
      "state": bundle.inputData.state,
      "post_code": bundle.inputData.post_code,
      "location_name": bundle.inputData.location_name
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
  key: 'new_candidate_location',
  noun: 'Location',
  display: {
    label: 'New Candidate Current Location',
    description: 'Adds a new candidate current location.',
  },
  operation: {
    inputFields: [
      { key: 'id', required: true, type: 'string', label: 'Candidate ID' },
      { key: 'address_line1', required: false, type: 'string', label: 'Address 1' },
      { key: 'address_line2', required: false, type: 'string', label: 'Address 2' },
      { key: 'city', required: false, type: 'string', label: 'City' },
      { key: 'location_name', required: true, type: 'string', label: 'Location Name' },
      { key: 'post_code', required: false, type: 'string', label: 'Post Code' },
      { key: 'state', required: false, type: 'string', label: 'State' }
    ],
    perform,
    sample: {
      id: 1,
      title: 'Sample Title',
      content: 'Sample note.'      
    },
  },
};