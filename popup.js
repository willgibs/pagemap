function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportToCSV(sitemap, pageTitle) {
  const csvContent = [
    ['Link Title', 'URL'],
    ...sitemap.map(({ title, url }) => [title, url]),
  ]
    .map((row) => row.map((cell) => JSON.stringify(cell)).join(','))
    .join('\n');
  downloadCSV(csvContent, `PM - ${pageTitle}.csv`);
}

document.getElementById('generate-sitemap').addEventListener('click', async () => {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const pageTitle = tabs[0].title;
    await chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['contentScript.js'],
    });
    chrome.tabs.sendMessage(tabs[0].id, { action: 'generateSitemap' });

    const generateButton = document.getElementById('generate-sitemap');
    generateButton.style.display = 'none';

    const exportButton = document.getElementById('export');
    exportButton.style.display = 'inline-block'; // Show export button
    exportButton.addEventListener('click', () => exportToCSV(sitemapData, pageTitle));
  } catch (error) {
    console.error(error);
  }
});

let sitemapData = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'sitemapGenerated') {
    const sitemapContainer = document.getElementById('links-container');
    sitemapContainer.innerHTML = request.sitemap;
    sitemapData = request.sitemapData;
  }
});
