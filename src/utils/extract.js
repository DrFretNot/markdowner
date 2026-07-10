'use strict'

const { Readability } = require('@mozilla/readability')
const { JSDOM } = require('jsdom')

const extractArticle = (html, url) => {
	const dom = new JSDOM(html, { url })
	const article = new Readability(dom.window.document).parse()

	if (!article?.content) {
		return null
	}

	return {
		byline: article.byline,
		content: article.content,
		excerpt: article.excerpt,
		source: 'readability',
		title: article.title,
		url
	}
}

module.exports = {
	extractArticle
}
