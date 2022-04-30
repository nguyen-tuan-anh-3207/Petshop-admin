import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store } from './app/store';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
// components
import ScrollToTop from './components/ScrollToTop';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import Notification from './components/Notification';
import GlobalStyles from './theme/globalStyles';

export default function App() {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeConfig>
          <ScrollToTop />
          <GlobalStyles />
          <BaseOptionChartStyle />
          <Notification />
          <Router />
        </ThemeConfig>
      </PersistGate>
    </Provider>
  );
}
