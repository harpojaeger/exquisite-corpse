# Exquisite Corpse
<a href="http://exquisitecorpse.io/" target="_blank">exquisitecorpse.io</a>

An online collective Surrealist poetry generator.  See <a href="http://www.harpojaeger.com/2017/05/10/exquisite-corpse">this blog post</a> for more info on the history of the game and of this Internet adaptation.

# Fine print/disclaimer
<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" /></a><br />All poems are licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.  Anyone can contribute to exquisitecorpse.io.  I do my best to remove content that's blatantly inappropriate or obviously a violation of someone else's copyright.

Source code for this project (which is different from the content of the poems themselves) is (c) 2008-2023 Rafael Harpo Marchand Jaeger and licensed under the [GPL v3](https://www.gnu.org/licenses/gpl.txt). Pull requests are welcome.

# Specs
Frontend built with React and <a href="https://github.com/facebookincubator/create-react-app">create-react-app</a>.  Backend built with Node.js and Express.  <a href="http://exquisitecorpse.io">exquisitecorpse.io</a> runs on Heroku.  Thanks to <a href="https://github.com/tylermcginnis">@tylermcginness</a> for <a href="https://reacttraining.com/online/react-fundamentals">a terrific React tutorial</a>, and thanks to a million different Stack Exchange answers and commenters.

# Changelog
Additional contributors are credited.

- 2023-01-02 Whew, it's been a while :). Upgraded numerous dependencies. Swapped out outdated `<Glyphyicon>` for supported fontawesome components.
- 2018-11-03 Upgrade to react-scripts 2.1.1 to address [CVE-2017-16138](https://nvd.nist.gov/vuln/detail/CVE-2017-16138) and another vulnerability. Some minor refactoring to comply with 2.1.1's stricter import ordering rules, and warnings related to a11y and an `<a rel>` vulnerability.
- 2018-10-07, v1.2.2: fixed CSS incompatibilities resulting from including Bootstrap v4 instead of v3, as react-bootstrap requires.
- 2017-10-23, v1.2.1: added indentation when wrapping lines of poems (nmorduch).
- 2017-10-21, v1.2.0: added sorting controls.
- 2017-10-17, v1.1.2: display a completed poem in a modal dialog when user ends it.
- 2017-10-13, v1.1.1: removed link to self in completed poem modal.
- 2017-10-13, v1.1.0: updated to use Redux state management, plus some UI changes. More details [here](http://www.harpojaeger.com/2017/10/13/exquisite-corpse-110).
- for older versions, read about the [history of the project](http://www.harpojaeger.com/2017/05/10/exquisite-corpse).
