import './App.css';
import Home from './pages/home';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'react-bootstrap';

function App() {
  return (
    <ThemeProvider
      breakpoints={['lg', 'xs']}
    >
      <div className="">
        <Home></Home>
      </div>
    </ThemeProvider> 

  );
}

export default App;
