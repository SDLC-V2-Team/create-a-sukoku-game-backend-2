import React from 'react';
import App from './App';

const mockRender = jest.fn();
const mockCreateRoot = jest.fn((container: Element | null) => {
  if (!container) throw new Error('createRoot(...): Target container is not a DOM element.');
  return { render: mockRender };
});

jest.mock('react-dom/client', () => ({
  createRoot: mockCreateRoot,
}));

jest.mock('./App', () => {
  return jest.fn(() => <div>Mock App</div>);
});

jest.mock('./index.css', () => ({}));

describe('main.tsx entry point', () => {
  let rootElement: HTMLDivElement;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    rootElement = document.createElement('div');
    jest.spyOn(document, 'getElementById').mockReturnValue(rootElement);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render App inside StrictMode into the root element', () => {
    require('./main');

    expect(mockCreateRoot).toHaveBeenCalledWith(rootElement);
    expect(mockRender).toHaveBeenCalledTimes(1);
    expect(mockRender).toHaveBeenCalledWith(
      React.createElement(React.StrictMode, null, React.createElement(App, null))
    );
  });

  it('should throw an error if the root element is not found', () => {
    jest.spyOn(document, 'getElementById').mockReturnValue(null);
    expect(() => require('./main')).toThrow(
      'createRoot(...): Target container is not a DOM element.'
    );
  });

  it('should ensure createRoot is called with the expected element', () => {
    require('./main');
    expect(mockCreateRoot).toHaveBeenCalledWith(rootElement);
  });

  it('should render only once', () => {
    require('./main');
    expect(mockRender).toHaveBeenCalledTimes(1);
  });
});