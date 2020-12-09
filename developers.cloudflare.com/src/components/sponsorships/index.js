import React from "react"

import bootstrapIMG from "./logos/bootstrap.svg"
import cdnjsIMG from "./logos/cdnjs.svg"
import clickhouseIMG from "./logos/clickhouse.svg"
import d3IMG from "./logos/d3.svg"
import expressjsIMG from "./logos/expressjs.svg"
import freecodecampIMG from "./logos/freecodecamp.svg"
import gitIMG from "./logos/git.svg"
import gulpIMG from "./logos/gulp.svg"
import html5boilerplateIMG from "./logos/html5-boilerplate.svg"
import impressjsIMG from "./logos/impressjs.svg"
import jqueryIMG from "./logos/jquery.svg"
import jsdelivrIMG from "./logos/jsdelivr.svg"
import kaliIMG from "./logos/kali.svg"
import momentjsIMG from "./logos/momentjs.svg"
import nodejsIMG from "./logos/nodejs.svg"
import openaiIMG from "./logos/openai.svg"
import phalconIMG from "./logos/phalcon.svg"
import reactIMG from "./logos/react.svg"
import reduxIMG from "./logos/redux.svg"
import revealjsIMG from "./logos/revealjs.svg"
import select2IMG from "./logos/select2.svg"
import threejsIMG from "./logos/threejs.svg"
import unpkgIMG from "./logos/unpkg.svg"
import uppyIMG from "./logos/uppy.svg"
import webpackIMG from "./logos/webpack.svg"
import yarnIMG from "./logos/yarn.svg"

import "../../css/components/sponsorships.css"

const sponsorships = [{
    title:"Yarn",
    description:"A package manager for Node that creates a lockfile for dependencies and cache’s packages for future projects.",
    logo: yarnIMG,
    siteURL:"https://yarnpkg.com/en/",
    sourceURL:"https://github.com/yarnpkg/yarn"
  },
  {
    title:"Moment.js",
    description:"A library for Parsing, validating, manipulating, and displaying dates and times in JavaScript.",
    logo: momentjsIMG,
    siteURL:"https://momentjs.com/",
    sourceURL:"https://github.com/moment/moment/"
  },
  {
    title:"D3",
    description:"A way to bind data to the DOM, and then apply data-driven transformations to the document.",
    logo: d3IMG,
    siteURL:"https://d3js.org/",
    sourceURL:"https://github.com/d3/d3"
  },
  {
    title:"OpenAI",
    description:"A non-profit research company aiming to build safe Artificial General Intelligence (AGI), and ensure AGI's benefits are as widely and evenly distributed as possible.",
    logo: openaiIMG,
    siteURL:"https://openai.com/",
    sourceURL:"https://github.com/openai"
  },
  {
    title:"UNPKG",
    description:"A fast, global Content Delivery Network for everything on NPM.",
    logo: unpkgIMG,
    siteURL:"https://unpkg.com/",
    sourceURL:"https://github.com/unpkg/unpkg"
  },
  {
    title:"HTML5 Boilerplate",
    description:"A fast, robust, and adaptable way to create web apps or sites.",
    logo: html5boilerplateIMG,
    siteURL:"https://html5boilerplate.com/",
    sourceURL:"https://github.com/h5bp/html5-boilerplate"
  },
  {
    title:"cdnjs",
    description:"A free, public Content Delivery Network for popular libraries.",
    logo:cdnjsIMG,
    siteURL:"https://cdnjs.com/",
    sourceURL:"https://github.com/cdnjs/cdnjs"
  },
  {
    title:"Webpack",
    description:"A module bundler for combining JavaScript files.",
    logo:webpackIMG,
    siteURL:"https://webpack.js.org/",
    sourceURL:"https://github.com/webpack/webpack"
  },
  {
    title:"Node.js",
    description:"A JavaScript runtime built on Chrome’s V8 JavaScript engine.",
    logo:nodejsIMG,
    siteURL:"https://nodejs.org/",
    sourceURL:"https://github.com/nodejs/node"
  },
  {
    title:"React",
    description:"A JavaScript library for building user interfaces created by facebook.",
    logo:reactIMG,
    siteURL:"https://reactjs.org/",
    sourceURL:"https://github.com/facebook/react/"
  },
  {
    title:"git",
    description:"A version control system that allows millions people across the world to collaborate on coding projects.",
    logo:gitIMG,
    siteURL:"https://git-scm.com/",
    sourceURL:"https://github.com/git/git"
  },
  {
    title:"Kali Linux",
    description:"Kali Linux is an advanced penetration testing Linux distribution.",
    logo:kaliIMG,
    siteURL:"https://www.kali.org/",
    sourceURL:"https://github.com/offensive-security"
  },
  {
    title:"ClickHouse",
    description:"ClickHouse is a free analytics DBMS for big data",
    logo:clickhouseIMG,
    siteURL:"https://clickhouse.tech/",
    sourceURL:"https://github.com/ClickHouse/ClickHouse"
  },
  {
    title:"Phalcon",
    description:"Phalcon is a full-stack PHP framework delivered as a C-extension",
    logo:phalconIMG,
    siteURL:"https://phalcon.io/",
    sourceURL:"https://github.com/phalcon/cphalcon/"
  },
  {
    title:"JsDelivr",
    description:"JsDelivr is a public, open-source CDN (Content Delivery Network) developed by ProspectOne, focused on performance, reliability, and security.",
    logo:jsdelivrIMG,
    siteURL:"https://www.jsdelivr.com/",
    sourceURL:"https://github.com/jsdelivr/jsdelivr"
  },
  {
    title:"freeCodeCamp",
    description:"An online coding bootcamp that teaches you to code for free.",
    logo:freecodecampIMG,
    siteURL:"https://freecodecamp.org/",
    sourceURL:"https://github.com/freeCodeCamp/freeCodeCamp"
  },
  {
    title:"Uppy",
    description:"A sleek, modular file uploader that integrates seamlessly with any application.",
    logo:uppyIMG,
    siteURL:"https://uppy.io/",
    sourceURL:"https://github.com/transloadit/uppy"
  },
  {
    title:"Redux",
    description:"A predictable state container for JavaScript apps. It’s commonly used with React to make state management simple.",
    logo:reduxIMG,
    siteURL:"https://redux.js.org/",
    sourceURL:"https://github.com/reactjs/redux/"
  },
  {
    title:"jQuery",
    description:"The Write Less, Do More, JavaScript Library.",
    logo:jqueryIMG,
    siteURL:"https://jquery.com",
    sourceURL:"https://github.com/jquery/jquery"
  },
  {
    title:"Select2",
    description:"A jQuery based replacement for select boxes. It supports searching, remote data sets, and infinite scrolling of results.",
    logo:select2IMG,
    siteURL:"https://select2.org/",
    sourceURL:"https://github.com/select2/select2"
  },
  {
    title:"Gulp",
    description:"A toolkit for automating painful or time-consuming tasks in your development workflow, so you can stop messing around and build something.",
    logo:gulpIMG,
    siteURL:"https://gulpjs.com/",
    sourceURL:"https://github.com/gulpjs/gulp"
  },
  {
    title:"impress.js",
    description:"A presentation tool made to leverage the power of css3 transforms and transitions.",
    logo:impressjsIMG,
    siteURL:"https://impress.js.org/",
    sourceURL:"https://github.com/impress/impress.js"
  },
  {
    title:"Express",
    description:"A fast, minimalist web framework for Node.js.",
    logo:expressjsIMG,
    siteURL:"https://expressjs.com/",
    sourceURL:"https://github.com/expressjs/express"
  },
  {
    title:"REVEAL.JS",
    description:"A framework for making powerpoint-like presentations using HTML, CSS and JS.",
    logo:revealjsIMG,
    siteURL:"https://revealjs.com/#/",
    sourceURL:"https://github.com/hakimel/reveal.js"
  },
  {
    title:"three.js",
    description:"A JavaScript library used to create and display animated 3D computer graphics in a web browser.",
    logo:threejsIMG,
    siteURL:"https://threejs.org/",
    sourceURL:"https://github.com/mrdoob/three.js/"
  },
  {
    title: "Bootstrap",
    description: "A responsive, mobile-first HTML, CSS and JS styling library.",
    logo: bootstrapIMG,
    siteURL: "https://getbootstrap.com/",
    sourceURL: "https://github.com/twbs/bootstrap"
  }
]

export default () => (
  <div className="sponsorship-grid">
    {sponsorships.map((item, i) => {
      return (<div key={i} className="sponsorship">
      <a className="sponsorship-icon" target="_blank" rel="noopener noreferrer" href={item.siteURL}>
        <img src={item.logo} alt={item.title} />
      </a>
      <a className="sponsorship-title" target="_blank" rel="noopener noreferrer" href={item.siteURL}>
        <h3>{item.title}</h3>
      </a>
      <div className="sponsorship-description">
        <p>{item.description}</p>
      </div>
      <div className="sponsorship-links">
        <a className="sponsorship-link-site more" target="_blank" rel="noopener noreferrer" href={item.siteURL}>Visit site</a>
        <a className="sponsorship-link-github more" target="_blank" rel="noopener noreferrer" href={item.sourceURL}>Code on GitHub</a>
      </div>
    </div>)
    })}
  </div>
)
