import React from 'react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import WelcomePage from '../components/Welcome/WelcomePage';
import RoleSelectionPage from '../components/RoleSelection/RoleSelectionPage';
import ServiceSelectionPage from '../components/ServiceSelection/ServiceSelectionPage';
import FeedbackFormPage from '../components/FeedbackForm/FeedbackFormPage';
import ThankYouPage from '../components/ThankYou/ThankYouPage';
import OfficialAuthPage from '../components/Official/OfficialAuthPage';
import OfficialDashboardPage from '../components/Official/Dashboard/OfficialDashboardPage';

const Router: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // If no hash is set, redirect to home
  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = '#/';
    }
  }, []);

  const renderRoute = () => {
    switch (currentRoute) {
      case '#/':
        return <WelcomePage />;
      case '#/role-selection':
        return <RoleSelectionPage />;
      case '#/service-selection':
        return <ServiceSelectionPage />;
      case '#/feedback-form':
        return <FeedbackFormPage />;
      case '#/thank-you':
        return <ThankYouPage />;
      case '#/official-auth':
        return <OfficialAuthPage />;
      case '#/official-dashboard':
        return <OfficialDashboardPage />;
      default:
        return <WelcomePage />;
    }
  };

  return (
    <Layout>
      {renderRoute()}
    </Layout>
  );
};

export default Router;