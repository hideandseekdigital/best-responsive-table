# The best responsive table on this planet

Good UX for tables on mobile doesn't exist... Until now!


## Why

- Great ux
- Accessible
- Easily customisable
- Work out of the box with wysiwyg editors
- IE friedly

## Mark-up

No special treatment needed on the mark-up, this library is built to work with the default `table` mark-up generated from wysiwyg editors such as [CKEditor](https://ckeditor.com/) and [TinyMCE](https://www.tiny.cloud/), so that it can be easily applied to your content management system.


## How to use

Reference `brt.css` and `brt.js` in your html

```Html
<link rel="stylesheet" href="path/to/brt.css">
<script src="brt.js"></script>
```
Then initiate it when DOM is ready

```JavaScript
resTable.init({
    table: document.getElementById('table'),
})
```

## Dev

1. clone this repo
1. `npm i` this bad boy
1. `gulp start` this gorgeous baby
1. see magic happen inside browser

## Todos
 - Transpile JS with babel
 - Refactor to handle responsiveness inside js
 - Seperation of table styles
 - Add refresh() function to handle ajax content.
 - Make npm package.