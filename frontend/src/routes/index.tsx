import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Dashboard from '../pages/Dashboard';
import Contacts from '../pages/Contacts';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'contacts',
        element: <Contacts />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);