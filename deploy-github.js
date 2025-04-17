/**
 * Script to build and prepare the site for GitHub Pages deployment
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
  blue: '\x1b[34m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  reset: '\x1b[0m'
};

console.log(`${colors.blue}=== Building for GitHub Pages ===${colors.reset}`);

// Set GitHub Pages environment variable
process.env.GITHUB_PAGES = 'true';

try {
  // Build the project
  console.log(`${colors.yellow}Building project...${colors.reset}`);
  execSync('vite build', { stdio: 'inherit' });

  // Ensure the 404.html file is copied to the dist folder
  console.log(`${colors.yellow}Copying 404.html to dist folder...${colors.reset}`);
  fs.copyFileSync(
    path.resolve(__dirname, 'public', '404.html'),
    path.resolve(__dirname, 'dist', '404.html')
  );

  // Create a .nojekyll file to disable Jekyll processing
  console.log(`${colors.yellow}Creating .nojekyll file...${colors.reset}`);
  fs.writeFileSync(path.resolve(__dirname, 'dist', '.nojekyll'), '');

  console.log(`${colors.green}Build completed successfully!${colors.reset}`);
  console.log(`${colors.blue}To deploy:${colors.reset}`);
  console.log('1. Commit your changes');
  console.log('2. Run "npm run deploy" to publish to GitHub Pages');
  console.log('3. Ensure GitHub Pages is enabled in your repository settings');
} catch (error) {
  console.error(`${colors.red}Build failed:${colors.reset}`, error);
  process.exit(1);
} 