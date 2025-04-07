import React, {lazy} from "react";


const User = lazy(() => import('user/User').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
);

const ListCard = lazy(() => import('card/ListCard').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
 })
);

function Main({onAddPlace}) {
  return (
    <main className="content">
      <User />
      <ListCard />
    </main>
  );
}

export default Main;
