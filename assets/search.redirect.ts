// (function () {
//   let $ = document.querySelector.bind(document);
//   let element = $('#DocsSearch--input') || $('#SiteSearch--input');
//   let productGroup = $('meta[name="pcx_content_group"]')
//   let searchTab = '&t=Docs'

//   addEventListener('keydown', ev => {
//     let key = ev.which;

//     // inside search input element
//     if (ev.target === element) {
//       if (key !== 13) return;

//       // ENTER ~> redirect
//       let redirect = '/search/';
//       let text = (element.value || '').trim();

//       if (text.length > 0) {
//         redirect += '#q=' + encodeURIComponent(text) + searchTab;
//         if (productGroup) {
//           redirect += '&product_group=' + encodeURIComponent(productGroup.content);
//         }
//       }

//       return location.assign(redirect);
//     }

//     // is '/' or SHIFT+'s' or COMMAND/CTRL + 'k'
//     if (ev.key === '/' || (ev.shiftKey && key === 83) || (ev.key === 'k' && (ev.metaKey || ev.ctrlKey))) {
//       ev.preventDefault();
//       window.scrollTo(0, 0);
//       element.focus();
//     }
//   });
// })();