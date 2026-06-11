import config from './vite.config';

describe('vite.config', () => {
  it('should export a defined object', () => {
    expect(config).toBeDefined();
    expect(typeof config).toBe('object');
  });

  it('should include the @vitejs/plugin-react plugin as the first plugin', () => {
    expect(config.plugins).toBeDefined();
    expect(Array.isArray(config.plugins)).toBe(true);
    expect(config.plugins.length).toBe(1);
    // The plugin returned by react() is an object
    expect(typeof config.plugins[0]).toBe('object');
  });

  it('should set the dev server port to 3000', () => {
    expect(config.server).toBeDefined();
    expect(config.server.port).toBe(3000);
  });

  it('should proxy /api to http://localhost:5000', () => {
    expect(config.server.proxy).toBeDefined();
    expect(config.server.proxy).toMatchObject({
      '/api': 'http://localhost:5000',
    });
  });

  it('should only proxy the /api path', () => {
    const proxyKeys = Object.keys(config.server.proxy);
    expect(proxyKeys).toEqual(['/api']);
  });
});