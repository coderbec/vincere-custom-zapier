const authentication = require('./authentication');
const updateCandidateCreate = require('./creates/update_candidate.js');
const fetchCandidateCreate = require('./creates/fetch_candidate.js');
const fetchUserCreate = require('./creates/fetch_user.js');
const uploadDocumentCreate = require('./creates/upload_document.js');
const candidateApplicationCreate = require('./creates/new_application.js');
const candidateGetApplications = require('./creates/candidate_applications.js');
const candidateFromCV = require('./creates/new_candidate_from_cv.js');
const getCandidateDocuments = require('./creates/fetch_candidate_documents.js');
const putCandidateLocation = require('./creates/put_candidate_location.js');
const getCompanyLocation = require('./creates/get_company_location.js');
const postCandidateNote = require('./creates/post_candidate_note.js');
const postCandidateTalentPool = require('./creates/post_candidate_talent_pool.js');

const documentTypeTrigger = require('./triggers/candidate_document_types.js');
const candidateSourceTrigger = require('./triggers/candidate_source_types.js');
const newJobTrigger = require('./triggers/new_jobs_trigger.js');
const talentPoolTrigger = require('./triggers/user_talent_pools.js');

const CandidateSearch = require('./searches/candidate_search.js');
const CandidateCreate = require('./creates/new_candidate.js');


const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,

  // beforeRequest & afterResponse are optional hooks into the provided HTTP client
  beforeRequest: [
  ],

  afterResponse: [
  ],

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
    [documentTypeTrigger.key]: documentTypeTrigger,
    [newJobTrigger.key]: newJobTrigger,
    [candidateSourceTrigger.key]: candidateSourceTrigger,
    [talentPoolTrigger.key]: talentPoolTrigger,
  },

  // If you want your searches to show up, you better include it here!
  searches: { [CandidateSearch.key]: CandidateSearch },

  // If you want your creates to show up, you better include it here!
  creates: {
    [updateCandidateCreate.key]: updateCandidateCreate,
    [fetchCandidateCreate.key]: fetchCandidateCreate,
    [fetchUserCreate.key]: fetchUserCreate,
    [uploadDocumentCreate.key]: uploadDocumentCreate,
    [CandidateCreate.key]: CandidateCreate,
    [candidateApplicationCreate.key]: candidateApplicationCreate,
    [candidateGetApplications.key]: candidateGetApplications,
    [candidateFromCV.key]: candidateFromCV,
    [getCandidateDocuments.key]: getCandidateDocuments,
    [putCandidateLocation.key]: putCandidateLocation,
    [getCompanyLocation.key]: getCompanyLocation,
    [postCandidateNote.key]: postCandidateNote,
    [postCandidateTalentPool.key]: postCandidateTalentPool
  },

  searchOrCreates: {
    [CandidateSearch.key]: { // the key must match the search
      key: CandidateSearch.key, // same as above
      display: {
        // the label goes up in sidebar
        // see: https://cdn.zapier.com/storage/photos/04f7951bda0c43dc80eb630251724336.png
        label: 'Label Goes Here',
        description: 'this is the description.' // this is ignored
      },
      search: CandidateSearch.key,
      create: CandidateCreate.key
    }
  }

};

// Finally, export the app.
module.exports = App;