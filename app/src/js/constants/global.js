
const API_PROD_URL = 'http://production.api.url/'
const API_LOCAL_URL = 'http://localhost:8000/assets/vendors/mock_json/'
const API_DEV_URL = 'http://localhost:8081/'

let current_url = API_DEV_URL
//*production
let current_env = 'development'
//*environment

if (process.env.NODE_ENV === 'production') {
  current_url = API_PROD_URL
  current_env = 'production'
}

export const API_ROOT = current_url;
// export const API_ROOT = API_DEV_URL;
export const ENVIRONMENT = current_env;
