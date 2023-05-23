export function getGitHubUrl (from) {
  const rootURl = 'https://github.com/login/oauth/authorize'

  const options = {
    client_id: '0095a8ab69b463544266',
    redirect_uri: 'http://127.0.0.1:9432/api/v1/redirect',
    scope: 'user:email',
    state: from
  }

  const qs = new URLSearchParams(options)

  return `${rootURl}?${qs.toString()}`
}
