#!/usr/bin/env node

'use strict';

//////////////////////////// EXECUTE with "./11.js" ////////////////////////////
////// ran "chmod +x 11.js" from TERMINAL to allow execution capabilities //////
///////////////////////  npm install request (for "GET") ///////////////////////
///////////////////////  npm install cheerio (for "LOAD") //////////////////////

const { createServer } = require('http')
const { get } = require('request')
const { load } = require('cheerio')

const server = createServer()

server.on('request', (req, res) => {
  get('https://reddit.com', (err, _, body) => {

    const $ = load(body)

    const topStories = $('a.title')
      .toArray()
      .map($)                     // .map((el) => $(el))
      .map(el => ({
        title: el.text(),
        link: el.attr('href')
      }))

    res.end(JSON.stringify(topStories))
  })
})

server.listen(8080)
