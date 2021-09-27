import './App.css';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import StudentsPage from './pages/students';
import ComputersPage from './pages/computers';
import LoansPage from './pages/loans';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
          <Header />

          <Switch>

          <Route exact path="/" component={StudentsPage} />
          <Route exact path="/students" component={StudentsPage} />
          <Route exact path="/computers" component={ComputersPage} />
          <Route exact path="/loans" component={LoansPage} />
          </Switch>

          <Footer />
        </BrowserRouter>  
    </div>
  );
}

export default App;
