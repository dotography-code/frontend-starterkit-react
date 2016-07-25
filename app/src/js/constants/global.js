const API_PROD_URL = 'http://production.api.url/'
const API_DEV_URL = 'http://localhost:8081/'

let current_url = API_DEV_URL
let current_env = 'development'

if (process.env.NODE_ENV === 'production') {
  current_url = API_PROD_URL
  current_env = 'production'
}

export const API_ROOT = current_url;
export const ENVIRONMENT = current_env;
