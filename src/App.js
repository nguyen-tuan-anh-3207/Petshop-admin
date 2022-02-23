import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';

// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

import { store } from './app/store';
// ----------------------------------------------------------------------

export default function App() {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeConfig>
          <ScrollToTop />
          <GlobalStyles />
          <BaseOptionChartStyle />
          <Router />
        </ThemeConfig>
      </PersistGate>
    </Provider>
  );
}
