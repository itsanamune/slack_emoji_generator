// DOM Elements
const promptInput = document.getElementById('prompt');
const generateBtn = document.getElementById('generateBtn');
const btnText = document.querySelector('.btn-text');
const spinner = document.querySelector('.spinner');
const errorDiv = document.getElementById('error');
const resultSection = document.getElementById('resultSection');
const generatedImage = document.getElementById('generatedImage');
const revisedPrompt = document.getElementById('revisedPrompt');
const downloadBtn = document.getElementById('downloadBtn');
const newEmojiBtn = document.getElementById('newEmojiBtn');

let currentImageUrl = null;

// Check API health on load
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/health');
        const data = await response.json();

        if (!data.apiKeyConfigured) {
            showError('⚠️ OpenAI API key not configured. Please check your .env file.');
            generateBtn.disabled = true;
        }
    } catch (error) {
        console.error('Health check failed:', error);
    }
});

// Generate emoji
generateBtn.addEventListener('click', async () => {
    const prompt = promptInput.value.trim();

    if (!prompt) {
        showError('Please enter a description for your emoji.');
        return;
    }

    // Reset UI
    hideError();
    resultSection.classList.add('hidden');

    // Show loading state
    generateBtn.disabled = true;
    btnText.classList.add('hidden');
    spinner.classList.remove('hidden');

    try {
        const response = await fetch('/api/generate-emoji', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to generate emoji');
        }

        // Display the generated emoji
        currentImageUrl = data.imageUrl;
        generatedImage.src = currentImageUrl;

        if (data.revisedPrompt) {
            revisedPrompt.textContent = `AI interpretation: "${data.revisedPrompt}"`;
        }

        resultSection.classList.remove('hidden');

        // Scroll to result
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } catch (error) {
        showError(error.message);
    } finally {
        // Reset button state
        generateBtn.disabled = false;
        btnText.classList.remove('hidden');
        spinner.classList.add('hidden');
    }
});

// Download emoji
downloadBtn.addEventListener('click', async () => {
    if (!currentImageUrl) return;

    try {
        // Fetch the image
        const response = await fetch(currentImageUrl);
        const blob = await response.blob();

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `slack-emoji-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

    } catch (error) {
        showError('Failed to download image. Please try right-clicking the image and selecting "Save Image As..."');
    }
});

// Generate new emoji
newEmojiBtn.addEventListener('click', () => {
    promptInput.value = '';
    resultSection.classList.add('hidden');
    currentImageUrl = null;
    hideError();
    promptInput.focus();
});

// Allow Enter key to submit (with Shift+Enter for new line)
promptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        generateBtn.click();
    }
});

// Error handling
function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

function hideError() {
    errorDiv.classList.add('hidden');
    errorDiv.textContent = '';
}
