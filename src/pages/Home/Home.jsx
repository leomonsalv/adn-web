import React from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import SkelletonWeb from '../../components/Skelleton/SkelletonWeb';
import SkelletonMovil from '../../components/Skelleton/SkelletonMovil';
import Finder from '../../components/Finder/Finder';

const Home = () => {
  const onlyWidth = useWindowWidth();
  return (
    <>
      <Finder />
      {onlyWidth < 600 ? <SkelletonMovil /> : <SkelletonWeb /> }
    </>
  );
};

export default Home;
