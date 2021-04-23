
const perform = async (z, bundle) => {
    const request = await {
      url: 'https://{{bundle.authData.subdomain}}/api/v2/candidate/{{bundle.inputData.id}}/currentlocation',
      method: 'PUT',
      body: {
        "address": bundle.inputData.address,
        "address_line1": bundle.inputData.address_line1,
        "address_line2": bundle.inputData.address_line2,
        "city": bundle.inputData.city,
        "country": bundle.inputData.country,
        "country_code": bundle.inputData.country_code,
        "district": bundle.inputData.district,
        "latitude": bundle.inputData.latitude,
        "location_name": bundle.inputData.location_name,
        "longitude": bundle.inputData.longitude,
        "nearest_train_station": bundle.inputData.nearest_train_station,
        "post_code": bundle.inputData.post_code,
        "state": bundle.inputData.state
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
    key: 'new_candidate_location',
    noun: 'Candidate',
    display: {
      label: 'Candidate Location Update',
      description: 'Puts a candidate location.',
    },
    operation: {
      inputFields: [
        { key: 'id', required: false, type: 'string', label: 'Candidate ID' },
        { key: 'address', required: false, type: 'string', label: 'address' },
        { key: 'address_line1', required: false, type: 'string', label: 'address_line1' },
        { key: 'address_line2', required: false, type: 'string', label: 'address_line2' },
        { key: 'city', required: false, type: 'string', label: 'city' },
        { key: 'country', required: false, type: 'string', label: 'country' },
        { key: 'country_code', required: false, type: 'string', label: 'country_code' },
        { key: 'district', required: false, type: 'string', label: 'district' },
        { key: 'latitude', required: false, type: 'number', label: 'latitude' },
        { key: 'location_name', required: true, type: 'string', label: 'location_name' },
        { key: 'longitude', required: false, type: 'number', label: 'longitude' },
        { key: 'nearest_train_station', required: false, type: 'string', label: 'nearest_train_station' },
        { key: 'post_code', required: false, type: 'string', label: 'post_code' },
        { key: 'state', required: false, type: 'string', label: 'state' },
      ],
      perform,
      sample: {
        id: 1,
        title: 'Sample Title',
        content: 'Sample note.'      
      },
    },
  };