let fallbackHost: string | undefined = 'localhost:3001'
let host = "api.campus-guru.com" || fallbackHost

let schemeForHttp = 'https://'

if (host === 'localhost:3001') {
	schemeForHttp = 'http://'
}

export const apiHost = /* schemeForHttp + host + */'/api'
