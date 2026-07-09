'use strict'

const axios = require('axios')
const { version } = require('../../package.json')

const DEFAULT_USER_AGENT = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 markdowner/${version}`

const DEFAULT_HEADERS = {
	Accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
	'Accept-Language': 'en-US,en;q=0.9',
	'User-Agent': DEFAULT_USER_AGENT
}

const fetchPage = async (url) => {
	const response = await axios.get(url, {
		headers: DEFAULT_HEADERS,
		maxRedirects: 5,
		timeout: 30000,
		validateStatus: (status) => status >= 200 && status < 400
	})

	return response.data
}

module.exports = {
	DEFAULT_HEADERS,
	DEFAULT_USER_AGENT,
	fetchPage
}
