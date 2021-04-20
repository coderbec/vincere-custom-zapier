require('should');

const zapier = require('zapier-platform-core');

const App = require('../../index');
const appTester = zapier.createAppTester(App);

const ID = '131111' // CHANGE THIS

describe('Create - fetch_candidate', () => {
  zapier.tools.env.inject();

  it('should create an object', async () => {
    const bundle = {
      authData: {
        access_token: process.env.ACCESS_TOKEN,
        refresh_token: process.env.REFRESH_TOKEN,
      },

      inputData: {
        id: ID
      },
    };

    const result = await appTester(
      App.creates['fetch_candidate'].operation.perform,
      bundle
    );
    result.should.not.be.an.Array();
  });
});
