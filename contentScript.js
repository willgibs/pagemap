chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'generateSitemap') {
    const links = document.querySelectorAll('a');
    const sitemap = [];

    for (const link of links) {
      const title = link.innerText || link.textContent || 'undefined';
      const url = link.href;
      sitemap.push({
        title,
        url
      });
    }

    const sitemapHTML = sitemap
      .map(
        (entry) =>
          `<a href="${entry.url}" target="_blank" class="link">
            <div class="link_title">${entry.title}</div>
            <div class="link_url">${entry.url}</div>
          </a>`
      )
      .join('');

    chrome.runtime.sendMessage({
      action: 'sitemapGenerated',
      sitemap: sitemapHTML,
      sitemapData: sitemap // Send sitemap data with sitemap HTML
    });
  }
});
