'use strict'

const { fetchPage } = require('./fetch')
const { extractArticle } = require('./extract')
const { articleToMarkdown, htmlToMarkdown } = require('./markdown')
const { fetchSubstackPost } = require('./substack')

const pageToMarkdown = async (url) => {
	const substackArticle = await fetchSubstackPost(url)
	if (substackArticle) {
		return articleToMarkdown(substackArticle)
	}

	const html = await fetchPage(url)
	const article = extractArticle(html, url)

	if (article) {
		return articleToMarkdown(article)
	}

	return htmlToMarkdown(html)
}

module.exports = {
	pageToMarkdown
}
