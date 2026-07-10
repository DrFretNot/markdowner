'use strict'

const axios = require('axios')
const { DEFAULT_HEADERS } = require('./fetch')

const SUBSTACK_POST_PATTERN = /\/p\/([a-z0-9-]+)/i

const parseSubstackPostUrl = (url) => {
	let parsedUrl

	try {
		parsedUrl = new URL(url)
	} catch {
		return null
	}

	const match = parsedUrl.pathname.match(SUBSTACK_POST_PATTERN)
	if (!match) {
		return null
	}

	return {
		origin: parsedUrl.origin,
		slug: match[1]
	}
}

const formatAuthors = (publishedBylines = []) => publishedBylines
	.map((byline) => byline.name)
	.filter(Boolean)
	.join(', ')

const fetchSubstackPost = async (url) => {
	const postInfo = parseSubstackPostUrl(url)
	if (!postInfo) {
		return null
	}

	try {
		const response = await axios.get(
			`${postInfo.origin}/api/v1/posts/${postInfo.slug}`,
			{
				headers: DEFAULT_HEADERS,
				timeout: 30000,
				validateStatus: (status) => status >= 200 && status < 400
			}
		)

		const post = response.data
		if (!post?.body_html) {
			return null
		}

		return {
			byline: formatAuthors(post.publishedBylines),
			content: post.body_html,
			date: post.post_date,
			excerpt: post.subtitle || post.description,
			source: 'substack',
			subtitle: post.subtitle,
			title: post.title,
			url: post.canonical_url || url
		}
	} catch {
		return null
	}
}

module.exports = {
	fetchSubstackPost,
	parseSubstackPostUrl
}
