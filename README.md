# ⚠️ Deprecation notice ⚠️

This repository has been deprecated in favor of [Testing Playground](http://github.com/testing-library/testing-playground). Testing Playground contains the functionality provided here and can be downloaded through [chrome web store](https://chrome.google.com/webstore/detail/testing-playground/hejbmebodbijjdhflfknehhcgaklhano).


<div align="center">
<h1>@testing-library/which-query</h1>
<a href="https://www.joypixels.com/profiles/emoji/flamingo">
    <img
    height="80"
    width="80"
    alt="flamingo"
    src="https://raw.githubusercontent.com/testing-library/which-query/master/other/flamingo.png"
  />
</a>
<p>🦩 Which query should I use: the chrome extension</p>
</div>

---

<!-- prettier-ignore-start -->
[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]
[![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
[![PRs Welcome][prs-badge]][prs]
[![Code of Conduct][coc-badge]][coc]
<!-- prettier-ignore-end -->

## The problem

When using testing-library, some developers may not be aware of
[which query to use](https://testing-library.com/docs/guide-which-query). As a
result, folks will jump to using escape hatches like `*ByTestId` or
`querySelector`.

## This solution

This chrome extension aims to enable developers to find a better query when writing tests. Right click on an element on any web page and it will copy the best possible query for that element into your clipboard.  Then simply paste into your test code.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
- [Inspiration](#inspiration)
- [Other Solutions](#other-solutions)
- [Issues](#issues)
  - [🐛 Bugs](#-bugs)
  - [💡 Feature Requests](#-feature-requests)
- [Contributors ✨](#contributors-)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

[Install from the chrome web store](https://chrome.google.com/webstore/detail/testing-library-which-que/olmmagdolfehlpjmbkmondggbebeimoh)

### From github releases (for previous versions)

1. Download a release from the [releases](https://github.com/testing-library/which-query/releases) page.
2. Unzip the file 
3. make sure developer mode is on

4. Click "Load Unpacked"

5. Browse to '/path/to/where/you/unzipped

6. click select

### From source:

1. clone & install:

```bash
git clone git@github.com:testing-library/which-query.git
cd which-query
npm i
npm run build:chrome:dev
```

2. in chrome navigate to chrome://extensions

3. make sure developer mode is on

4. Click "Load Unpacked"

5. Browse to '/path/to/where/you/cloned/chrome/build/unpacked'

6. click select

## Usage

<img
 alt="demo of which query extension"
 src="https://raw.githubusercontent.com/testing-library/which-query/master/other/demo.gif" />

[Use Testing Library in the browser console](https://youtu.be/g4i8k_Hue84)

[Get a Query by inspecting elements in devtools](https://www.youtube.com/watch?v=bt8RGZB6Yyw)

## Inspiration

[This tweet thread](https://twitter.com/benmonro/status/1264551204127780870?s=20)

## Other Solutions

I'm not aware of any, if you are please [make a pull request][prs] and add it
here!

## Issues

_Looking to contribute? Look for the [Good First Issue][good-first-issue]
label._

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**][bugs]

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

[**See Feature Requests**][requests]

## Contributors ✨

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/benmonro"><img src="https://avatars3.githubusercontent.com/u/399236?v=4" width="100px;" alt=""/><br /><sub><b>Ben Monro</b></sub></a><br /><a href="https://github.com/testing-library/which-query/commits?author=benmonro" title="Code">💻</a> <a href="https://github.com/testing-library/which-query/commits?author=benmonro" title="Tests">⚠️</a> <a href="#ideas-benmonro" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/testing-library/which-query/commits?author=benmonro" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/smeijer"><img src="https://avatars1.githubusercontent.com/u/1196524?v=4" width="100px;" alt=""/><br /><sub><b>Stephan Meijer</b></sub></a><br /><a href="#ideas-smeijer" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://kentcdodds.com"><img src="https://avatars0.githubusercontent.com/u/1500684?v=4" width="100px;" alt=""/><br /><sub><b>Kent C. Dodds</b></sub></a><br /><a href="#ideas-kentcdodds" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://nickmccurdy.com/"><img src="https://avatars0.githubusercontent.com/u/927220?v=4" width="100px;" alt=""/><br /><sub><b>Nick McCurdy</b></sub></a><br /><a href="https://github.com/testing-library/which-query/commits?author=nickmccurdy" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

## LICENSE

MIT

<!-- prettier-ignore-start -->
[npm]: https://www.npmjs.com
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/travis/com/testing-library/which-query.svg?style=flat-square
[build]: https://travis-ci.com/testing-library/which-query
[coverage-badge]: https://img.shields.io/codecov/c/github/testing-library/which-query.svg?style=flat-square
[coverage]: https://codecov.io/github/testing-library/which-query
[version-badge]: https://img.shields.io/npm/v/@testing-library/which-query.svg?style=flat-square
[package]: https://www.npmjs.com/package/@testing-library/which-query
[downloads-badge]: https://img.shields.io/npm/dm/@testing-library/which-query.svg?style=flat-square
[npmtrends]: http://www.npmtrends.com/@testing-library/which-query
[license-badge]: https://img.shields.io/npm/l/@testing-library/which-query.svg?style=flat-square
[license]: https://github.com/testing-library/which-query/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/testing-library/which-query/blob/master/other/CODE_OF_CONDUCT.md
[emojis]: https://github.com/all-contributors/all-contributors#emoji-key
[all-contributors]: https://github.com/all-contributors/all-contributors
[bugs]: https://github.com/testing-library/which-query/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Acreated-desc+label%3Abug
[requests]: https://github.com/testing-library/which-query/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3Aenhancement
[good-first-issue]: https://github.com/testing-library/which-query/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3Aenhancement+label%3A%22good+first+issue%22
<!-- prettier-ignore-end -->
