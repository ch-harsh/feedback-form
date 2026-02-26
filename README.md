## Feedback Form Website

This is a simple **Next.js feedback website** that collects a customer's **name**, **email**, and **phone number** using a clean, modern CSS design.

### Run the app locally

1. Install dependencies (already done if you followed the setup):
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser.

### How it works

- The main page (`pages/index.js`) shows a centered card with a feedback form.
- The form requires **name**, **email**, and **phone number**.
- On submit, it prevents the default page reload, shows a simple thank-you alert, and clears the fields.
- Styles are defined in `styles/globals.css` and applied globally via `pages/_app.js`.

