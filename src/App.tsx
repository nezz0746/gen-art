import React, { useEffect, useState } from 'react';
import { RefreshIcon } from '@heroicons/react/outline';
import { Route, Switch, useHistory } from 'react-router-dom';
import Landing from './pages/Landing';
import Other from './pages/Other';
import SolarSystem from './pages/Snake';
import Face from './pages/Face';
import NFTPage from './pages/NFT';

const routes = [
  {
    path: '/0',
    component: Landing,
  },
  {
    path: '/1',
    component: Other,
  },
  {
    path: '/2',
    component: SolarSystem,
  },
  {
    path: '/3',
    component: Face,
  },
  {
    path: '/4',
    component: NFTPage,
  },
];

const App: React.FC = () => {
  const history = useHistory();

  const [currentPath, setCurrentPath] = useState(
    routes[Math.floor(Math.random() * routes.length)].path,
  );

  useEffect(() => {
    history.push('/4');
  }, [currentPath, history]);

  return (
    <div className="bg-white">
      <button
        type="button"
        onClick={() => {
          setCurrentPath(
            routes.filter((route) => route.path !== currentPath)[
              Math.floor(Math.random() * (routes.length - 1))
            ].path,
          );
        }}
        className="absolute top-6 left-6 items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
      >
        <RefreshIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <Switch>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Switch>
    </div>
  );
};

export default App;
