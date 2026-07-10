#!/usr/bin/env node
'use strict'

const fs = require('fs')
const path = require('path')
const { pageToMarkdown } = require('../src/utils/convert')

const SAMPLES = [
	{
		file: 'the-price-of-staying-on-trumps-good-side-walmart.md',
		url: 'https://www.thebulwark.com/p/the-price-of-staying-on-trumps-good-side-walmart'
	},
	{
		file: 'a-season-of-death-and-fear-immigration-mass-deportation-springfield-haitians-texas-ice.md',
		url: 'https://www.thebulwark.com/p/a-season-of-death-and-fear-immigration-mass-deportation-springfield-haitians-texas-ice'
	},
	{
		file: 'this-july-4th-ignore-trump-listen-to-gerald-ford-nation-of-immigrants-independence-day.md',
		url: 'https://www.thebulwark.com/p/this-july-4th-ignore-trump-listen-to-gerald-ford-nation-of-immigrants-independence-day'
	}
]

const samplesDir = path.join(__dirname, '..', 'samples')

const main = async () => {
	fs.mkdirSync(samplesDir, { recursive: true })

	for (const sample of SAMPLES) {
		process.stderr.write(`Fetching ${sample.url}\n`)
		const markdown = await pageToMarkdown(sample.url)
		const outputPath = path.join(samplesDir, sample.file)
		fs.writeFileSync(outputPath, `${markdown}\n`, 'utf8')
		process.stderr.write(`Wrote ${outputPath}\n`)
	}
}

main().catch((error) => {
	process.stderr.write(`${error.stack || error.message}\n`)
	process.exit(1)
})
