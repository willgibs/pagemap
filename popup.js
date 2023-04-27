// Create and download a CSV file
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

// Convert sitemap data to CSV content and trigger download
function exportToCSV(sitemap, pageTitle) {
  const csvContent = [
    ['Link Title', 'URL'],
    ...sitemap.map(({ title, url }) => [title, url]),
  ]
    .map((row) => row.map((cell) => JSON.stringify(cell)).join(','))
    .join('\n');
  downloadCSV(csvContent, `PM - ${pageTitle}.csv`);
}

// Handle generate button click event
async function onGenerateButtonClick() {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const pageTitle = tabs[0].title;
    await chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ['contentScript.js'],
    });
    chrome.tabs.sendMessage(tabs[0].id, { action: 'generateSitemap' });

    document.getElementById('container_generate').style.display = 'none';
    document.getElementById('container_links').style.display = 'block';

    const exportButton = document.getElementById('export');
    exportButton.style.display = 'inline-block'; // Show export button
    exportButton.addEventListener('click', () => exportToCSV(sitemapData, pageTitle));

  } catch (error) {
    console.error(error);
  }
}

// Handle sitemap data messages from content script
function onSitemapGenerated(request, sender, sendResponse) {
  const sitemapContainer = document.getElementById('links');
  sitemapContainer.innerHTML = request.sitemap;
  sitemapData = request.sitemapData;
}

// Close the extension popup
function closePopup() {
  window.close();
}

// Initialize event listeners
function init() {
  document.getElementById('generate').addEventListener('click', onGenerateButtonClick);
  document.getElementById('close_icon').addEventListener('click', closePopup);
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'sitemapGenerated') {
      onSitemapGenerated(request, sender, sendResponse);
    }
  });
}

// Initialize the extension popup
init();
