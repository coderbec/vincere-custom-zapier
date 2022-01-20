
const perform = async (z, bundle) => {
    const request = {
      url: 'https://{{bundle.authData.subdomain}}/api/v2/talentpools/candidate/{{bundle.inputData.id}}/user/{{bundle.inputData.user_id}}',
      method: 'PUT',
      body: ['{{bundle.inputData.pool_id}}'],  
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
    key: 'new_candidate_talent_pool',
    noun: 'Pool',
    display: {
      label: 'New Candidate Talent Pool',
      description: 'Adds the candidate to an additional talent pool',
    },
    operation: {
      inputFields: [
        { key: 'id', required: true, type: 'string', label: 'Candidate ID' },
        { key: 'user_id', required: true, type: 'string', label: 'Current User ID' },
        { key: 'pool_id', required: true, dynamic: 'pool.id.name', label: 'Talent Pool' }
      ],
      perform,
      sample: {
        id: 1,
        title: 'Sample Title',
        content: 'Sample note.'      
      },
    },
  };