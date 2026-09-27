import ReactDOM from 'react-dom/client';

import { App } from '@/app/components/App';
import 'react-loading-skeleton/dist/skeleton.css';
import 'twenty-ui/style.css';
import 'twenty-ui/theme-light.css';
import 'twenty-ui/theme-dark.css';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') ?? document.body,
);

const renderApp = () => root.render(<App />);

if (
  import.meta.env.DEV &&
  import.meta.env.REACT_APP_SPRING_BACKENDLESS === 'true'
) {
  import('./testing/startBackendlessPreview').then(
    async ({ startBackendlessPreview }) => {
      await startBackendlessPreview();
      renderApp();
    },
  );
} else {
  renderApp();
}
