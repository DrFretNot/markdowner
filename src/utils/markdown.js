'use strict'

const TurndownService = require('turndown')
const turndownPluginGfm = require('turndown-plugin-gfm')
const gfm = turndownPluginGfm.gfm

const REMOVED_ELEMENTS = [
	'script',
	'style',
	'noscript',
	'svg',
	'iframe',
	'meta',
	'link',
	'head'
]

const turndown = new TurndownService({
	bulletListMarker: '-',
	codeBlockStyle: 'fenced',
	headingStyle: 'atx'
}).use(gfm)

turndown.remove(REMOVED_ELEMENTS)

turndown.addRule('substackImages', {
	filter: (node) => {
		if (node.nodeName !== 'PICTURE') {
			return false
		}

		return Boolean(node.querySelector('img'))
	},
	replacement: (_content, node) => {
		const image = node.querySelector('img')
		const alt = image.getAttribute('alt') || ''
		const src = image.getAttribute('src') || image.getAttribute('data-src') || ''

		if (!src) {
			return ''
		}

		return `\n\n![${alt}](${src})\n\n`
	}
})

const htmlToMarkdown = (html) => turndown.turndown(html)

const formatDate = (dateValue) => {
	if (!dateValue) {
		return ''
	}

	const date = new Date(dateValue)
	if (Number.isNaN(date.getTime())) {
		return ''
	}

	return date.toLocaleDateString('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	})
}

const articleToMarkdown = (article) => {
	const sections = []

	if (article.title) {
		sections.push(`# ${article.title}`)
	}

	if (article.subtitle) {
		sections.push(article.subtitle)
	}

	const metadata = [article.byline, formatDate(article.date)].filter(Boolean)
	if (metadata.length) {
		sections.push(`*${metadata.join(' · ')}*`)
	}

	sections.push(htmlToMarkdown(article.content))

	return sections.join('\n\n').trim()
}

module.exports = {
	articleToMarkdown,
	htmlToMarkdown
}
