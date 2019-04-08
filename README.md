# The best responsive table on this planet

Good UX for tables on mobile doesn't exist... Until now!


## Why

- Great ux
- Accessible
- Easily customisable
- Work out of the box with wysiwyg editors
- IE friedly

## Mark-up: 

No special treatment needed on the mark-up, this library is built to work with the default `table` mark-up generated from wysiwyg editors such as [CKEditor](https://ckeditor.com/) and [TinyMCE](https://www.tiny.cloud/), so that it can be easily applied to your content management system.


## How to use

Reference `brt.js` in your html

```Html
<script src="brt.js"></script>
```
Then initiate it when DOM is ready

```JavaScript
resTable.init({
    table: document.getElementById('table'),
})
```


## Todos

 - Refactor to handle responsiveness inside js
 - Add refresh() function to handle ajax content.
 - Make npm package.