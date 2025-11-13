require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// System prompt for emoji generation
const EMOJI_SYSTEM_PROMPT = `You are generating a Slack emoji. Important requirements:
- Create a simple, clear, and recognizable icon
- Use bold colors and clear shapes
- Ensure the image works well at small sizes (128x128 pixels)
- The background should be transparent
- Make it fun and expressive
- Keep the design simple and focused on a single concept`;

// Endpoint to generate emoji
app.post('/api/generate-emoji', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('Generating emoji for prompt:', prompt);

    // Create enhanced prompt with emoji-specific instructions
    const enhancedPrompt = `Create a Slack emoji style icon: ${prompt}. Make it simple, bold, colorful, and perfect for use as a small emoji. IMPORTANT: Use a completely transparent background.`;

    // Call OpenAI GPT Image API with transparent background
    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: enhancedPrompt,
      size: "1024x1024",
      quality: "high",
      background: "transparent"
    });

    const imageBase64 = response.data[0].b64_json;

    console.log('Emoji generated successfully');

    res.json({
      success: true,
      imageData: imageBase64,
      revisedPrompt: response.data[0].revised_prompt
    });

  } catch (error) {
    console.error('Error generating emoji:', error);

    // Handle specific OpenAI errors
    if (error.status === 401) {
      return res.status(401).json({
        error: 'Invalid OpenAI API key. Please check your .env file.'
      });
    }

    if (error.status === 429) {
      return res.status(429).json({
        error: 'Rate limit exceeded. Please try again later.'
      });
    }

    res.status(500).json({
      error: error.message || 'Failed to generate emoji'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const hasApiKey = !!process.env.OPENAI_API_KEY;
  res.json({
    status: 'ok',
    apiKeyConfigured: hasApiKey
  });
});

// Start server with port fallback
let serverInstance = null;

function startServer(port) {
  const server = app.listen(port)
    .on('listening', () => {
      console.log(`\n🎨 Slack Emoji Generator is running!`);
      console.log(`📍 Server: http://localhost:${port}`);
      console.log(`🔑 API Key configured: ${process.env.OPENAI_API_KEY ? '✓' : '✗'}`);

      if (!process.env.OPENAI_API_KEY) {
        console.log('\n⚠️  WARNING: OPENAI_API_KEY not found in environment variables!');
        console.log('   Please copy .env.example to .env and add your OpenAI API key.\n');
      }

      serverInstance = server;
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`⚠️  Port ${port} is in use, trying ${port + 1}...`);
        startServer(port + 1);
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });
}

// Graceful shutdown handler
function gracefulShutdown(signal) {
  console.log(`\n\n${signal} received, closing server gracefully...`);

  if (serverInstance) {
    serverInstance.close(() => {
      console.log('Server closed. Port released.');
      process.exit(0);
    });

    // Force close after 5 seconds if graceful shutdown fails
    setTimeout(() => {
      console.error('Forced shutdown after timeout');
      process.exit(1);
    }, 5000);
  } else {
    process.exit(0);
  }
}

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

startServer(PORT);
