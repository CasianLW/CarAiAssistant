import React, { FC } from "react";
import { Provider } from "react-redux";
import store from "../stores/main-store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../helpers/query-client";
import RootLayout from "./_layout";
import { registerRootComponent } from "expo";

const App: FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RootLayout />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
registerRootComponent(App);
