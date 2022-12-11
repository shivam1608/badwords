let DOC = undefined;
let parser = undefined;

window.onload = () => {
  DOC = document.getElementById("docs");
  parser = window.markdownit({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre class="hljs"><code>' +
            hljs.highlight(str, { language: lang, ignoreIllegals: true })
              .value +
            "</code></pre>"
          );
        } catch (__) {}
      }

      return (
        '<pre class="hljs"><code>' +
        parser.utils.escapeHtml(str) +
        "</code></pre>"
      );
    },
    html: true,
    linkify: true,
    typographer: true,
  });
  lazyLoadDoc(window.location.hash);
};

const lazyLoadDoc = async (hash) => {
  if (!DOC || !parser) {
    return;
  }

  if (!hash) {
    hash = "#intro";
  }

  hash = hash.replace("#", "");
  let response = await fetch(`/docs/mds/${hash}.md`);
  if (response.status === 404) {
    DOC.innerHTML =
      "<h1 class='heading text-center mt-6'>Documentation not found on server!</h1>";
    return;
  }
  let markdown = await response.text();
  DOC.innerHTML = parser.render(markdown);
};

const openGithub = () => {
  window.location = "https://github.com/shivam1608/badwords";
};
