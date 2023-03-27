document.getElementById('generate-sitemap').addEventListener('click', async () => {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['contentScript.js']
    });
    chrome.tabs.sendMessage(tabs[0].id, { action: 'generateSitemap' });
  } catch (error) {
    console.error(error);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'sitemapGenerated') {
    const sitemapContainer = document.getElementById('sitemap-container');
    sitemapContainer.innerHTML = request.sitemap;
  }
});
