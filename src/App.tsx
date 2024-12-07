import React from "react";
import AppRouter from "./routes/appRouter";
import ErrorBoundary from "./utils/error/errorBoundary";

const App: React.FC = () => {
  return (
    <div>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </div>
  );
};

export default App;
