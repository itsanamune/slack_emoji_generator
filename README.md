# 🎨 Slack Emoji Generator

Generate custom Slack emojis using AI! This tool uses OpenAI's DALL-E 3 to create unique, fun emojis based on your text descriptions. Perfect for adding personality to your Slack workspace.

## ✨ Features

- **AI-Powered Generation**: Uses OpenAI's DALL-E 3 for high-quality image generation
- **Transparent Backgrounds**: Automatically generates emojis optimized for Slack
- **Simple Interface**: Clean, intuitive UI for easy emoji creation
- **Local Deployment**: Runs entirely on your local machine
- **Instant Download**: Download generated emojis with one click
- **No CORS Issues**: Backend handles all API calls securely

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd slack_emoji_generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your API key**
   ```bash
   # Copy the example environment file
   cp .env.example .env

   # Edit .env and add your OpenAI API key
   # Replace 'your_openai_api_key_here' with your actual key
   ```

   Your `.env` file should look like:
   ```
   OPENAI_API_KEY=sk-...your-key-here...
   PORT=3000
   ```

4. **Start the application**
   ```bash
   npm start
   ```

5. **Open your browser**

   Navigate to: `http://localhost:3000`

## 🎯 Usage

1. **Describe your emoji**: Enter a description of the emoji you want to create
   - Examples: "a happy taco", "a developer coding at night", "a rocket ship blasting off"

2. **Click "Generate Emoji"**: The AI will create your custom emoji

3. **Download**: Click the download button to save your emoji

4. **Upload to Slack**:
   - Go to your Slack workspace
   - Click on your workspace name → Settings & administration → Customize workspace
   - Click "Add Custom Emoji"
   - Upload your generated image (consider resizing to 128x128 for best results)
   - Give it a name and save!

## 🎨 Tips for Better Emojis

- **Keep it simple**: Simple concepts work best for emoji-sized images
- **Be specific**: "a happy cat wearing sunglasses" is better than just "cat"
- **Use vivid language**: Descriptive words help the AI understand your vision
- **Consider emoji size**: Remember these will be small, so avoid overly complex scenes

### Example Prompts

- "a sparkly diamond"
- "a slice of pizza with heart-shaped pepperoni"
- "a laptop with code on the screen"
- "a coffee cup with steam forming a heart"
- "a thumbs up made of rainbows"

## 📁 Project Structure

```
slack_emoji_generator/
├── server.js              # Express backend with OpenAI integration
├── package.json           # Node.js dependencies
├── .env.example           # Environment variables template
├── .env                   # Your API keys (not in git)
├── public/                # Frontend files
│   ├── index.html        # Main HTML page
│   ├── style.css         # Styling
│   └── app.js            # Frontend JavaScript
└── README.md             # This file
```

## 🔧 Development

To run the application in development mode with auto-restart on file changes:

```bash
npm run dev
```

## 💰 Cost Considerations

- Each emoji generation uses OpenAI's DALL-E 3 API
- Standard quality (1024x1024): ~$0.04 per image
- Check [OpenAI's pricing page](https://openai.com/pricing) for current rates
- Your API key usage can be monitored in your OpenAI dashboard

## 🔒 Security Notes

- **Never commit your `.env` file** - it contains your API key
- The `.gitignore` file is configured to prevent this
- Your API key stays on your local machine and is never exposed to the browser
- The backend handles all OpenAI API calls

## 🐛 Troubleshooting

### "API key not configured" error
- Make sure you've created a `.env` file (not just `.env.example`)
- Verify your API key is correct and active in your OpenAI dashboard
- Restart the server after updating your `.env` file

### Generation fails or takes too long
- Check your OpenAI API key has available credits
- Verify your internet connection
- Try a simpler prompt
- Check the console for specific error messages

### Image download not working
- Try right-clicking the image and selecting "Save Image As..."
- Check your browser's download settings

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📝 License

MIT License - feel free to use this project however you'd like!

## 🙏 Acknowledgments

- Built with [OpenAI's DALL-E 3](https://openai.com/dall-e-3)
- Inspired by the need for more custom Slack emojis

---

**Happy emoji generating!** 🚀

If you create something awesome, share it with your team!
