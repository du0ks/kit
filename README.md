# ❤️ Romantic Interactive Memory Box

This is a secure, interactive website to share memories with your special someone. The content is encrypted and only unlocks with the correct answers to your riddles.

## 🚀 How to Add Your Memories
1.  **Prepare your images**: Put your romantic photos in `raw_data/images/`.
2.  **Edit the configuration**: Open `raw_data/config.json`.
    -   Add new blocks for each level.
    -   `riddle`: The question she sees.
    -   `answer`: The password to unlock the next memory (case-insensitive).
    -   `content`: The text and image filename she will see when unlocked.
    -   `isFinal`: Set to `true` for the last page.

    **Example**:
    ```json
    {
      "riddle": "Where did you spill coffee on me?",
      "answer": "Central Park",
      "content": {
        "text": "Technically it was hot chocolate, but you looked so cute trying to clean it up!",
        "image": "park_date.jpg"
      }
    }
    ```

3.  **Encrypt**: Run the following command to securely lock your memories:
    ```bash
    npm run encrypt
    ```
    *This creates encrypted files in the `public/data` folder. THESE are safe to upload.*

## 🎨 Deployment (GitHub Pages)

### First Time Setup
1.  Create a repository on GitHub.
2.  Open `vite.config.js` and add your repo name as the base path:
    ```javascript
    export default defineConfig({
      base: '/your-repo-name/', // <--- CHANGE THIS
      plugins: [react()],
    })
    ```
3.  Push your code to GitHub.

### Deploying Updates
Whenever you change memories or code, run:
```bash
npm run build
npm run deploy
```
This will publish the site to `https://<your-username>.github.io/<your-repo-name>/`.

## 🔒 Security Note
The images and text are encrypted using AES. The keys are the answers to the riddles.
-   **Safe**: The raw files in `raw_data` are ignored by git (check `.gitignore`).
-   **Public**: The files in `public/data` are uploaded, but they are just random gibberish without the password.

## 📱 Features
-   **Mobile First**: Designed to look beautiful on phones.
-   **Dark Mode**: Elegant slate & rose theme.
-   **Animations**: Smooth transitions and effects.
