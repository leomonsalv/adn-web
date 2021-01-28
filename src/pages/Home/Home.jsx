import React from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import SkelletonWeb from '../../components/Skelleton/SkelletonWeb';
import SkelletonMovil from '../../components/Skelleton/SkelletonMovil';
import Finder from '../../components/Finder/Finder';
import AllHeader from '../../components/AllHeader/AllHeader';

const Home = () => {
  const onlyWidth = useWindowWidth();
  return (
    <>
      <AllHeader />
      <Finder />
      {onlyWidth < 600 ? <SkelletonMovil /> : <SkelletonWeb /> }
    </>
  );
};

export default Home;
