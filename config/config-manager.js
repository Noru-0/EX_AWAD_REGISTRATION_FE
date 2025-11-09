const fs = require('fs');
const path = require('path');

/**
 * Frontend Configuration Manager
 * Handles loading environment variables from organized config files
 * Similar to backend config manager but for Next.js
 */
class FrontendConfigManager {
  constructor() {
    this.configDir = path.join(__dirname, 'environments');
    this.loadedConfig = null;
  }

  /**
   * Load environment configuration for Next.js
   * @param {string} environment - 'development', 'production', 'local', or 'auto'
   */
  loadConfig(environment = 'auto') {
    try {
      // Auto-detect environment if not specified
      if (environment === 'auto') {
        environment = process.env.NODE_ENV || 'development';
      }

      const configFile = `.env.${environment}`;
      const configPath = path.join(this.configDir, configFile);

      // Check if config file exists
      if (!fs.existsSync(configPath)) {
        console.warn(`⚠️  Frontend config file not found: ${configFile}`);
        console.warn(`📂 Looking in: ${this.configDir}`);
        console.warn(`🔄 Falling back to development config`);
        
        // Fallback to development
        const fallbackPath = path.join(this.configDir, '.env.development');
        if (fs.existsSync(fallbackPath)) {
          this.copyConfigFile(fallbackPath, '.env.local');
        }
        return;
      }

      // Copy the appropriate config to .env.local (Next.js convention)
      this.copyConfigFile(configPath, '.env.local');

      this.loadedConfig = {
        environment,
        configFile,
        configPath,
        loadedAt: new Date().toISOString()
      };

      console.log(`✅ Frontend config loaded: ${configFile}`);
      console.log(`📂 From: ${configPath}`);
      console.log(`📝 Copied to: .env.local`);
      
    } catch (error) {
      console.error('❌ Failed to load frontend configuration:', error.message);
      throw error;
    }
  }

  /**
   * Copy config file to .env.local
   */
  copyConfigFile(sourcePath, targetFile) {
    const targetPath = path.join(process.cwd(), targetFile);
    const content = fs.readFileSync(sourcePath, 'utf8');
    fs.writeFileSync(targetPath, content);
  }

  /**
   * Get configuration info
   */
  getConfigInfo() {
    return this.loadedConfig;
  }

  /**
   * List available environment files
   */
  listAvailableConfigs() {
    try {
      const files = fs.readdirSync(this.configDir)
        .filter(file => file.startsWith('.env.'))
        .map(file => file.replace('.env.', ''));
      
      return files;
    } catch (error) {
      console.error('Failed to list frontend config files:', error.message);
      return [];
    }
  }

  /**
   * Validate required environment variables for frontend
   */
  validateConfig() {
    // Read from .env.local since that's what Next.js will use
    const envLocalPath = path.join(process.cwd(), '.env.local');
    
    if (!fs.existsSync(envLocalPath)) {
      console.error('❌ .env.local file not found');
      return false;
    }

    const content = fs.readFileSync(envLocalPath, 'utf8');
    const required = ['NEXT_PUBLIC_API_URL', 'NEXT_PUBLIC_ENVIRONMENT'];
    const missing = [];

    for (const key of required) {
      if (!content.includes(`${key}=`)) {
        missing.push(key);
      }
    }

    if (missing.length > 0) {
      console.error('❌ Missing required frontend environment variables:', missing);
      return false;
    }

    console.log('✅ All required frontend environment variables are set');
    return true;
  }

  /**
   * Display current configuration (safe)
   */
  displayConfig() {
    const envLocalPath = path.join(process.cwd(), '.env.local');
    
    if (!fs.existsSync(envLocalPath)) {
      console.log('❌ No .env.local file found');
      return;
    }

    const content = fs.readFileSync(envLocalPath, 'utf8');
    const config = {};

    // Parse key environment variables
    const lines = content.split('\n');
    lines.forEach(line => {
      if (line.trim() && !line.startsWith('#')) {
        const [key, value] = line.split('=');
        if (key && value) {
          config[key.trim()] = value.trim();
        }
      }
    });

    console.log('📋 Frontend Configuration:');
    console.table(config);
  }

  /**
   * Setup script for different environments
   */
  setup(environment = 'development') {
    console.log(`🔧 Setting up frontend for ${environment} environment...`);
    this.loadConfig(environment);
    this.validateConfig();
    this.displayConfig();
    console.log(`✅ Frontend setup complete for ${environment}!`);
  }
}

module.exports = new FrontendConfigManager();