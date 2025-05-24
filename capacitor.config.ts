import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'greekom-angular',
  webDir: 'www',
  server: {
    hostname: '127.0.0.1',
    cleartext: true,
    allowNavigation: ['*']
  }
};

export default config;
