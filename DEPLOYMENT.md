# Deployment Strategy & Action Required

## Current Setup
The project uses **Netlify** for hosting and deployment, driven by the `netlify.toml` file in the root directory.
- **Build Command**: `npm run build` (vite build)
- **Publish Directory**: `dist`
- **Routing**: `/*` rewrites to `/index.html` with a 200 status code for SPA navigation.

## ACTION REQUIRED: Custom Domain & Production Deployment
Since I (the AI) do not have access to your DNS provider or your Netlify account, you must perform the following manual steps to link the custom domain.

### 1. What you need to do
Configure your custom domain (`sabrinsingh.com.np`) on Netlify and update your DNS records at your domain registrar.

### 2. Where you need to do it
1. Log in to your **Netlify** Dashboard.
2. Select the site for this portfolio.
3. Go to **Site Configuration** > **Domain Management**.
4. Log in to your **DNS Registrar** (e.g., Cloudflare, Namecheap, Route53, or the local `.np` registry).

### 3. Exactly what value/configuration you need
- **In Netlify**: Click "Add custom domain" and enter `sabrinsingh.com.np`.
- **In your DNS Registrar**:
  - Add an **A Record** pointing `@` to Netlify's load balancer IP (typically `75.2.60.5`).
  - Add a **CNAME Record** pointing `www` to your Netlify site URL (e.g., `your-site-name.netlify.app`).
  *(Alternatively, you can change your nameservers to Netlify's custom nameservers provided in the dashboard).*

### 4. How to verify it
- Open your terminal and run: `curl -I https://sabrinsingh.com.np`
- Look for `HTTP/2 200` and `Server: Netlify`.
- Ensure the SSL certificate is provisioned automatically (Netlify uses Let's Encrypt). The site should load securely with the padlock icon.

---
*Note: The production build (`npm run build`) has been successfully verified locally without any errors.*
