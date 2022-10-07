import { Suspense } from 'react'
import { useRoutes, Link } from 'react-router-dom';
import './App.css'
import { routes } from './routes'


function App() {
  const router = useRoutes(routes);
  return (
    <Suspense fallback={<p>Global Loading</p>}>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      {router}
    </Suspense>
  );
}

export default App
