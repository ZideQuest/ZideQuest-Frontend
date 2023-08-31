import { StackActions } from "@react-navigation/routers";

import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    // navigationRef.navigate(name, params)
    navigationRef.current?.dispatch(StackActions.replace(name, params));
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export function push(...args) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(...args));
  }
}

export function currentScreen(...args) {
  if (navigationRef.isReady()) {
    return navigationRef.current.getCurrentRoute().name;
  }
}
