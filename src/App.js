/*
 * @Author: CuongHx
 * @Date: 2018-07-08 17:11:46
 * @Last Modified by: 
 * @Last Modified time: 2018-09-01 10:39:50
 */
import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import routesConfig from './constants/routes-config';

const _$ = window.jQuery;
_$.validator.addMethod(
  'phoneVN',
  value => {
    return value.match(/((\+?84|0)[1-9])+([0-9]{8,9})\b/);
  },
  'Định dạng số điện thoại không đúng.'
);

export default class App extends Component {
  render() {
    return (
      <Switch>
        {Object.keys(routesConfig).map(pathName => {
          let routeConf = { ...routesConfig[pathName] };
          const routeComponent = routesConfig[pathName].component;
          delete routeConf.component;

          return (
            <Route
              {...routeConf}
              key={`route-${pathName}`}
              render={props => {
                const { title, requiredAuth, parents, showSidebar } = routeConf;
                return React.createElement(routeComponent, {
                  ...props,
                  title,
                  parentRoutes: parents,
                  requiredAuth,
                  showSidebar
                });
              }}
            />
          );
        })}
      </Switch>
    );
  }
}
