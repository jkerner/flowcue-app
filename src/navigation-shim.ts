// Web navigation shim — replaces @react-navigation hooks on web
// The web RootNavigator passes navigation functions via context

import React from 'react';

type NavigateFn = (screen: string, params?: any) => void;
type GoBackFn = () => void;

interface WebNavigationContext {
  navigate: NavigateFn;
  goBack: GoBackFn;
  params: any;
}

export const WebNavContext = React.createContext<WebNavigationContext>({
  navigate: () => {},
  goBack: () => {},
  params: {},
});

export const useNavigation = () => {
  const ctx = React.useContext(WebNavContext);
  return {
    navigate: ctx.navigate,
    goBack: ctx.goBack,
    canGoBack: () => true,
  };
};

export const useRoute = () => {
  const ctx = React.useContext(WebNavContext);
  return {
    params: ctx.params || {},
  };
};
