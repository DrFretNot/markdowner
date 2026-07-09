#!/usr/bin/env node
'use strict'

const { Command } = require('commander')
const { version } = require('../package.json')
const { pageToMarkdown } = require('./utils/convert')
const logger = require('./utils/logger')

const program = new Command()
program
	.name('markdowner')
	.description('Download a website as markdown')
	.version(version)
	.requiredOption('-u, --url <url>', 'the url to process')
	.option('-d, --debug', 'print out extra information')
	.option('-c, --clipboard', 'pass markdown to the system clipboard instead of stdout')

program.parse(process.argv)

const main = async () => {
	const { clipboard, debug, url } = program.opts()

	if (debug) {
		logger.setLogLevel('debug')
	}

	logger.debug('url specified', { url })

	let markdown = ''

	try {
		logger.debug('converting page to markdown', { url })
		markdown = await pageToMarkdown(url)
	} catch (error) {
		logger.error('there was an error converting the page to markdown', { error })
		// eslint-disable-next-line no-process-exit
		process.exit(1)
	}

	if (clipboard) {
		const { default: clipboardy } = await import('clipboardy')
		clipboardy.writeSync(markdown)
	} else {
		logger.log(markdown)
	}
}

main()
