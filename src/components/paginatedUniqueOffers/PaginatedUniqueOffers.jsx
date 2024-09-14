import { isMobile } from 'constants/useMediaQueries';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import s from '../uniqueOffers/UniqueOffers.module.css';
import { useTranslation } from 'react-i18next';

const PaginatedUniqueOffers = ({
  itemsPerPage,
  items,
  Items,
  handleClick,
  handleSectionFocus,
  sectionRef,
  page,
  selectedCategory,
}) => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const { t } = useTranslation();
  const isMobileScreen = isMobile();
  const currentItems = items?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    selectedCategory ? setItemOffset(0) : setItemOffset(newOffset);
    handleSectionFocus && handleSectionFocus();
  };

  useEffect(() => {
    if (selectedCategory) {
      setItemOffset(0);
    }
    return;
  }, [selectedCategory]);

  return (
    <>
      <Items
        currentItems={currentItems}
        t={t}
        isMobileScreen={isMobileScreen}
        handleClick={handleClick}
        sectionRef={sectionRef}
        page={page}
      />
      <div style={{ position: 'relative' }}>
        <ReactPaginate
          breakLabel="..."
          nextLabel="&rarr;"
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          pageCount={pageCount}
          previousLabel=" &larr;"
          renderOnZeroPageCount={null}
          containerClassName={s.paginationContainer}
          pageClassName={s.pageClassName}
          activeClassName={s.activePage}
          pageLinkClassName={s.breakLinkClassName}
        />
      </div>
    </>
  );
};

export default PaginatedUniqueOffers;
