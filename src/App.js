import "./App.css"
import CodeConverter from "./components/CodeConverter";

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>CodeConverter App</h1>
      </header>
      <main className="app-main">
        <CodeConverter />
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} CodeConverter App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App