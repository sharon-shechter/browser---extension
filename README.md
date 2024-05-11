# AIEverywhere Chrome Extension

## Description
The AIEverywhere Chrome extension integrates the power of OpenAI's ChatGPT directly into your browser. It provides various context menu options to enhance your interaction with text on any webpage. This includes improving English, creatively editing text, adding comments to code, summarizing content, and generating an AI-driven quiz based on the selected text.

## Installation

### Prerequisites
Before installing the AIEverywhere extension, ensure you have:
- Google Chrome Browser installed on your computer.
- An active OpenAI API key. (See below on how to obtain one)

### Steps to Install
1. Clone this repository using git clone or download it as a zip. 
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" at the top right corner of the page.
4. Click on "Load unpacked" and select the unzipped extension folder.
5. The AIEverywhere extension should now appear in your list of installed extensions and is ready for use.

## Configuration

### Obtaining an OpenAI API Key
To use this extension, you need an API key from OpenAI. Here's how to get one:
1. Visit [OpenAI's API Platform](https://platform.openai.com/signup).
2. Sign up and follow the instructions to obtain an API key.

### Setting Up Your API Key
After obtaining your API key, you need to configure the extension:
1. Navigate to the extension's folder on your computer.
2. Open the file named `config.js`.
3. Find the placeholder text that says "PUT YOUR API KEY HERE."
4. Replace this placeholder with your actual OpenAI API key, ensuring to keep it within the quotes.

## Features

### Improve English
Right-click on selected text and choose "Improve English" to enhance the English quality to a more professional level.

### Improve English - Creative
Select this option to transform the text into a more creative or unusual version of the original content.

### Add Comments to Code
Right-click on selected code snippets and use this feature to automatically add explanatory comments.

### Summarize to a Single Paragraph
This option condenses the selected text into a concise paragraph.

### AI Quiz
Generates a quiz with 10 multiple-choice questions based on the selected text. Each question will have four choices, with the correct answer highlighted in green and bold.

## Support
For support, feature requests, or bug reports, please open an issue in the GitHub repository associated with this extension.

## License
Distributed under the MIT License. See `LICENSE` for more information.
