import React from 'react';
import CommuColCategory from '../components/CommuColCategory';
import PagesHeader from '../components/PagesHeader';
import Footer from '../components/Footer';

function CommuCollectionPage() {
  return (
    <>
      <PagesHeader title={'내 커뮤니티 활동'} />
      <CommuColCategory />
      <Footer />
    </>
  );
}

export default CommuCollectionPage;
