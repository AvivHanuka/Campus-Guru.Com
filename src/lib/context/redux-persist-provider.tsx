"use client";

import store from "@/store";
import React from "react";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export default function ReduxPersistProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    persistStore(store);

    return (
        <Provider store={store}>
            {/*<PersistGate persistor={persistor}>*/}
                {children}
            {/*</PersistGate>*/}
        </Provider>
    );
}
