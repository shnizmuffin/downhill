# View Transition API Examples

This technology is *super new*. It reached most major browsers in September 2024 and *just* hit Chrome for Android February 24th. [Browser support](https://caniuse.com/view-transitions) is at 84.7% which is not great, but not horrible. That's okay, though, because View Transitions are strictly presentational and therefore absolutely optional. Or, to put it another way, users on browsers that don't yet support View Transitions won't know that they're missing anything.

## Show me examples

Yeah, here's the thing: they're so new (to regular browsers on stable release channels) that no sane developer has put them into production on major sites. I'm going to put a pair of lists together, *Dev Blogs with Examples* and *Novel Implementations*. The former will be full of the nuts and bolts meant for other developers with examples sprinkled throughout, and the other will be deployments of varying quality that are almost always proofs of concept.

### Dev Blogs with Examples

- [Early Days Examples of View Transitions](https://chriscoyier.net/2023/05/18/early-days-examples-of-view-transitions/) by Chris Coyier
- [Toe Dipping Into View Transitions](https://css-tricks.com/toe-dipping-into-view-transitions/) by Geoff Graham
- [Animating View Transitions](https://www.patterns.dev/vanilla/view-transitions) by Dom Christie
- [Cross-document view transitions for multi-page applications](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document) (aka "websites") by Bramus
- [Getting started with View Transitions on multi-page apps](https://daverupert.com/2023/05/getting-started-view-transitions/) by Dave Rupert
- [View Transition API](https://iamschulz.com/view-transition-api/) by Daniel Schulz

### Novel Implementations

- [HTTP 203](https://http203-playlist.netlify.app) (a vlog) by the Google Chrome Developer Team
- [A Photo Gallery](https://charming-crumble-af45ba.netlify.app) by Dom Christie
- [Stack Navigator Demo](https://view-transitions.chrome.dev/stack-navigator/mpa/) by the Google Chrome Developer Team
- [DaveRupert.com](https://daverupert.com) by Dave Rupert (simple fade)
- [Holy Animations, Batman!](https://iamschulz.github.io/batman-transition/index.html) by Daniel Schulz

## But can you do that?

Yeah, I've got a demo but nowhere to put it at the moment.

## Designing a website

I figure we need a **Home View** with a splashy cover image, maybe a letter, and sections dedicated to each department. We'll need a **Department View** to hold a description and article previews. We'll need an **Article View** for full bodies of article text. Inside of those views, we can have a couple jazzy components - maybe some cool SVG filters to mimic the jumbo script overlay or the squiggles of color that I see in the PDF. We'll flow large bodies of text more or less like a traditional blog with extremely basic 3-col and 2-col layouts for images and text.

As far as the animations and transitions, there's really only one big rule: I need aspects of the parent view present in their children. So if the Home View has a bunch of "cards" for each department, those cards should show up as thumbnails off to the side in the Department View. If the Department View has a big, bold title, maybe it remains off to the side or stuck to an edge on the Article View. That way, we can ground the motion of the transition in "reality." Otherwise we're just making a Powerpoint, and no one really wants that.

Also, the animations, whatever they wind up being, need to be **fast**. A slow, complex animation is cool exactly once. If the user is clicking, they want something, and you've got about 400ms to give it to them.