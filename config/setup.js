#!/usr/bin/env node

/**
 * Frontend Environment Setup Script
 * Automatically configures the appropriate environment for Next.js
 */

const configManager = require('./config-manager');

function main() {
  const args = process.argv.slice(2);
  const environment = args[0] || 'development';

  console.log('🔧 Frontend Environment Setup');
  console.log('================================');
  
  try {
    // Setup the environment
    configManager.setup(environment);
    
    console.log('\n🎉 Setup complete!');
    console.log('\nNext steps:');
    console.log('  npm run dev     - Start development server');
    console.log('  npm run build   - Build for production');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { main };