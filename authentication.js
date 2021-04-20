module.exports = {
  type: 'oauth2',
  test: {
    url: 'https://id.vincere.io/oauth2/user',
    method: 'GET',
    params: {},
    headers: {
      Authorization: 'Bearer {{bundle.authData.access_token}}',
      'id-token': '{{bundle.authData.id_token}}',
    },
    body: {},
    removeMissingValuesFrom: {},
  },
  oauth2Config: {
    authorizeUrl: {
      method: 'GET',
      url: 'https://id.vincere.io/oauth2/authorize',
      params: {
        client_id: '{{process.env.CLIENT_ID}}',
        state: '{{bundle.inputData.state}}',
        redirect_uri: '{{bundle.inputData.redirect_uri}}',
        response_type: 'code',
      },
    },
    getAccessToken: {
      url: 'https://id.vincere.io/oauth2/token',
      method: 'POST',
      params: { client_id: '{{process.env.CLIENT_ID}}' },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        accept: 'application/json',
      },
      body: {
        code: '{{bundle.inputData.code}}',
        grant_type: 'authorization_code',
        redirect_uri: '{{bundle.inputData.redirect_uri}}',
      },
      removeMissingValuesFrom: { params: true, body: true },
    },
    refreshAccessToken: {
      url: 'https://id.vincere.io/oauth2/token',
      method: 'POST',
      params: { client_id: '{{process.env.CLIENT_ID}}' },
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        accept: 'application/json',
      },
      body: {
        refresh_token: '{{bundle.authData.refresh_token}}',
        grant_type: 'refresh_token',
      },
      removeMissingValuesFrom: { params: true, body: true },
    },
    scope: '',
    autoRefresh: true,
  },
  fields: [
    { key: 'subdomain', type: 'string', required: true, default: 'app' },
    // For OAuth2 we store `access_token` and `refresh_token` automatically
    // in `bundle.authData` for future use. If you need to save/use something
    // that the user shouldn't need to type/choose, add a "computed" field, like:
    // {key: 'user_id': type: 'string', required: false, computed: true}
    // And remember to return it in oauth2Config.getAccessToken/refreshAccessToken
  ]
};
