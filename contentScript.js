chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'generateSitemap') {
    const links = document.querySelectorAll('a');
    const sitemap = [];

    for (const link of links) {
      const title = link.innerText || link.textContent || 'undefined';
      const url = link.href;
      sitemap.push({ title, url });
    }

    const sitemapHTML = sitemap
      .map(
        (entry) =>
          `<a class="page-link" href="${entry.url}" target="_blank">
            <div class="page-title-wrapper">
              <div class="page-title-icon"></div>
              <div class="page-title">${entry.title}</div>
            </div>
            <div class="page-url">${entry.url}</div>
          </a>`
      )
      .join('');

    chrome.runtime.sendMessage({
      action: 'sitemapGenerated',
      sitemap: sitemapHTML
    });
  }
});
