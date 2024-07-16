import { ComponentType, lazy, Suspense } from "react";

import { Loader } from "../components/Loader";

// Defined a function that takes a component and returns a lazy loaded version of it
function LazyLoad<T>(
  importComponent: () => Promise<{ default: ComponentType<T> }>
) {
  const LazyLoadedComponent = lazy(importComponent);

  return function LazyLoader(props: any) {
    return (
      <Suspense fallback={<Loader />}>
        <LazyLoadedComponent {...props} />
      </Suspense>
    );
  };
}

export default LazyLoad;
