import React from 'react';
import { Provider } from '@shopify/app-bridge-react';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import Dashboard from './components/Dashboard';

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const host = queryParams.get('host');

  if (!host) {
    console.error('No host parameter'); // Debug
    return <div>Error: Host parameter is missing. Please access the app through Shopify admin.</div>;
  }

  const config = {
    apiKey: process.env.REACT_APP_SHOPIFY_API_KEY,
    host: host,
    forceRedirect: true,
  };

  return (
    <Provider config={config}>
      <AppProvider i18n={enTranslations}>
        <Dashboard />
      </AppProvider>
    </Provider>
  );
}

export default App;