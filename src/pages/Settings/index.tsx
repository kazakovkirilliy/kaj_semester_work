import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import MainLayout from '../../components/layout';
import { pathConstants } from '../../config/paths';
import { GeneralSettings } from './GeneralSettings';
import { PrivacySettings } from './PrivacySettings';
import { ThemeSettings } from './ThemeSettings';
import { UserSettings } from './UserSettings';

export const Settings: React.FC = () => {
  let { path } = useRouteMatch();
  return (
    <>
      <MainLayout subNav={<UserSettings />}>
        <Switch>
          <Route path={`${path}/general`}>
            <GeneralSettings />
          </Route>
          <Route path={`${path}/theme`}>
            <ThemeSettings />
          </Route>
          <Route path={`${path}/privacy`}>
            <PrivacySettings />
          </Route>
          <Route path="*">
            <Redirect to={pathConstants.notFound} />
          </Route>
        </Switch>
      </MainLayout>
    </>
  );
};
