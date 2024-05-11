let selectedRange = null;

document.addEventListener('mouseup', () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        selectedRange = selection.getRangeAt(0);
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "processText") {
        handleText(request.menuItemId, request.text);
    }
});

async function handleText(menuItemId, text) {

    if (menuItemId === "summarizeText") {
        displayCenterPopup("loading...");
        const transformedText = await processText(text, menuItemId);
        displayCenterPopup(transformedText);
    } else if (menuItemId === "aiQuiz") {
        displayQuizPopup("loading...");
        const transformedText = await processText(text, menuItemId);
        displayQuizPopup(transformedText);
    } else if (menuItemId === "addCommentsToCode") {
        displayCenterPopup("loading...");
        const transformedText = await processText(text, menuItemId);
        displayCenterPopup(transformedText);
    } else {
        const transformedText = await processText(text, menuItemId);
        console.log(transformedText);
        if (selectedRange && transformedText) {
            try {
                // Attempt to replace the selected text with the transformed text
                replaceSelectedText(transformedText);
            }catch (e) {
                displayCenterPopup(transformedText); // Show result or fallback text if not replaceable
            }
        } else {
            displayCenterPopup("try again"); // Show result or fallback text if not replaceable
        }
    }
}
function replaceSelectedText(newText) {
    const range = selectedRange;
    if (!range) return;

    // Create a container for the new text that replicates the current styling context
    const replacementNode = document.createElement('span'); // Using span to maintain inline behavior
    const originalElement = range.startContainer.parentNode;

    // Clone the styles from the original parent element
    replicateStyles(originalElement, replacementNode);

    // Set the new text
    replacementNode.textContent = newText;

    // Replace the content in the range
    range.deleteContents();
    range.insertNode(replacementNode);
    window.getSelection().removeAllRanges();
}

function replicateStyles(sourceElement, targetElement) {
    const computedStyles = window.getComputedStyle(sourceElement);

    // Apply relevant styles to maintain width and formatting
    targetElement.style.width = computedStyles.width;
    targetElement.style.maxWidth = computedStyles.maxWidth;
    targetElement.style.fontFamily = computedStyles.fontFamily;
    targetElement.style.fontSize = computedStyles.fontSize;
    targetElement.style.fontWeight = computedStyles.fontWeight;
    targetElement.style.color = computedStyles.color;
    targetElement.style.lineHeight = computedStyles.lineHeight;
    targetElement.style.textAlign = computedStyles.textAlign;
    // Add other properties as necessary
}
function displayCenterPopup(text) {
    const popup = document.createElement('div');

    popup.style.position = 'fixed';
    popup.style.top = '50%'; // Center vertically
    popup.style.left = '50%'; // Center horizontally
    popup.style.transform = 'translate(-50%, -50%)'; // Adjust for exact centering
    popup.style.padding = '20px';
    popup.style.backgroundColor = '#f9f9f9'; // Light gray background for better contrast
    popup.style.color = '#333'; // Dark text for readability
    popup.style.border = '1px solid #ccc'; // Subtle border
    popup.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'; // Soft shadow for 3D effect
    popup.style.width = '80%'; // Width relative to viewport
    popup.style.whiteSpace = 'pre-wrap'; // Preserve line breaks
    popup.style.maxWidth = '90%'; // Maximum width
    popup.style.maxHeight = '90vh';
    popup.style.overflow = 'auto'; // Allow scrolling
    popup.style.zIndex = '10000'; // High z-index to ensure it's on top
    popup.style.fontSize = '16px'; // Adequate font size for readability
    popup.style.fontFamily = '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'; // User-friendly font
    popup.textContent = text; // Text content



    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '5px';
    closeButton.style.right = '10px';
    closeButton.style.padding = '5px 10px';
    closeButton.style.fontSize = '16px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.border = '1px solid #ccc';
    closeButton.onclick = function () {
        document.body.removeChild(popup);
    };

    popup.appendChild(closeButton);
    document.body.appendChild(popup);
}

function displayPopup(text) {
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.bottom = '10px'; // Position popup at the bottom
    popup.style.right = '10px';  // Right align popup
    popup.style.padding = '20px';
    popup.style.background = 'white';
    popup.style.border = '1px solid black';
    popup.style.zIndex = '2147483647'; // Set z-index to a high value
    popup.textContent = text;

    const exitButton = document.createElement('button');
    exitButton.textContent = 'Exit';
    exitButton.style.marginLeft = '10px';
    exitButton.onclick = function () {
        document.body.removeChild(popup);
    };

    popup.appendChild(exitButton);
    document.body.appendChild(popup);
}

function displayQuizPopup(quizContent) {
    console.log(quizContent);
    const windowHeight = window.innerHeight;
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.bottom = '1px'; // Position popup at the bottom
    popup.style.left = '10px';   // Left align popup
    popup.style.top = '0%'; // Position popup at the bottom
    popup.style.width = '400px';
    popup.style.maxHeight = `${windowHeight - 20}px`; // Account for padding
    popup.style.overflowY = 'auto';
    popup.style.padding = '20px';
    popup.style.background = 'white';
    popup.style.border = '1px solid black';
    popup.style.zIndex = '2147483647'; // Set z-index to a high value

    const questions = quizContent.split('\n').filter(line => line.trim() !== '');
    questions.forEach(question => {
        const questionDiv = document.createElement('div');
        questionDiv.textContent = question;
        questionDiv.style.marginBottom = '5px';

        /// Check if the question contains the correct answer marked with '*'
        const correctAnswerIndex = question.indexOf('*');
        if (correctAnswerIndex !== -1) {
            // Get the correct answer
            const correctAnswer = question.substring(correctAnswerIndex + 1);

            // Remove the '*' and the correct answer from the question
            const questionText = question.substring(0, correctAnswerIndex);

            // Create a <span> element for the correct answer with inline CSS to style it as bold and green
            const styledAnswer = `<span style="color: green; font-weight: bold;">${correctAnswer}</span>`;

            // Replace the correct answer in the question text with the styled answer
            questionDiv.innerHTML = `${questionText}${styledAnswer}`;
        } else {
            // If no correct answer marker is found, simply append the question text
            popup.appendChild(questionDiv);
            return;
        }


        popup.appendChild(questionDiv);
    });

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.marginTop = '10px';
    closeButton.onclick = function () {
        document.body.removeChild(popup);
    };
    popup.appendChild(closeButton);

    document.body.appendChild(popup);
}


async function processText(text, type) {
    const apiKey = PUT_HERE_YOUR_OPENAI_API_KEY;
    let temperature;
    let prompt;
    let model = "gpt-3.5-turbo";
    if (type === "improveEnglish") {
        temperature = 0.3;
        prompt = `write this text in better english:${text}`;
    } else if (type === "improveEnglishCreative") {
        temperature = 0.9;
        prompt = `write this text in better english:${text}`;
    } else if (type === "addCommentsToCode") {
        temperature = 0.15;
        prompt = `write comments for this code ,return the full code with comments , if the text isnt code write only the words "this in not code":\n${text}`;
    } else if (type === "summarizeText") {
        temperature = 0.3;
        prompt = `Summarize this text to a single paragraph:\n${text}`;
    } else if (type === "aiQuiz") {
        temperature = 0.3;
        prompt = `Generate a simple text-based quiz with 10 multiple-choice questions about this text:\n${text}
        Each question should have four choices, and only the correct answer should be marked with * at the beginning . Provide the plain text quiz content suitable for display within a popup`
    }
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: [{role: "user", content: prompt}],
            temperature: temperature
        })
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
}
