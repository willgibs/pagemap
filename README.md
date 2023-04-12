<img src="icon128.png" alt="Pagemap Icon">

# Pagemap

[![Twitter](https://img.shields.io/twitter/url/https/twitter.com/willgibs.svg?style=social&label=Follow%20%40willgibs)](https://twitter.com/willgibs)

Pagemap is a Chrome extension that generates a visual sitemap of the current page with a single click, and allows you to export the gathered links as a CSV file. This tool is designed for users who need a quick and easy way to obtain a list of all links on a webpage.

## Features

- Generates a visual sitemap of the current page, including link titles and URLs
- Exports the sitemap as a CSV file with two columns (Link Title and URL)
- Customizable appearance and functionality
- One-click button to generate the sitemap

## Download

To download Pagemap from the Chrome Web Store, click [here](https://chrome.google.com/webstore/detail/dummy-link).

## Local Installation Guide

To install Pagemap locally:

1. Download the ZIP file of this repository and extract it to a folder on your computer.
2. Open Google Chrome, and navigate to `chrome://extensions`.
3. Enable "Developer mode" by clicking the toggle switch in the top-right corner.
4. Click "Load unpacked" and select the folder where you extracted the Pagemap extension files.
5. Pagemap should now be installed and visible in your extensions list.

## Usage

1. Visit any webpage in Google Chrome.
2. Click the Pagemap icon in your toolbar.
3. Click the "Generate Pagemap" button in the popup to generate the visual sitemap.
4. Once the sitemap is generated, an "Export to CSV" button will appear. Click it to download the sitemap as a CSV file.

## Customization

To customize the appearance or functionality of Pagemap, you can edit the files within the extension folder:

- `popup.html`: Defines the structure of the popup window.
- `popup.css`: Defines the styles and appearance of the popup window and its elements.
- `popup.js`: Contains the JavaScript code that controls the popup's behavior.
- `contentScript.js`: Executes on the target web page to gather the links and generate the sitemap.

Feel free to modify these files as needed to create your own customized version of Pagemap.
