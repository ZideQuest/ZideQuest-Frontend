import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function push(...args) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(...args));
  }
}

export function currentScreen(...args) {
  if (navigationRef.isReady()) {
    // console.log(navigationRef.current.getCurrentRoute().name)
    return navigationRef.current.getCurrentRoute().name
  }
}
