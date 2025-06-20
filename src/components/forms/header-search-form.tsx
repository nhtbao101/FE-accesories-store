import { useState } from 'react';
// internal
import { Search } from '@/assets/svg';
import NiceSelect from '@/ui/nice-select';
import useSearchFormSubmit from '@/hooks/use-search-form-submit';
import { setPriority } from 'os';

const HeaderSearchForm = () => {
  const { productName, handleSubmit, setProductName } = useSearchFormSubmit();

  // selectHandle
  const selectCategoryHandle = (e: any) => {
    setPriority(e.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="tp-header-search-wrapper d-flex align-items-center">
        <div className="tp-header-search-box">
          <input
            onChange={(e) => setProductName(e.target.value)}
            value={productName}
            type="text"
            placeholder="Search for Products..."
          />
        </div>
        <div className="tp-header-search-category">
          <NiceSelect
            options={[
              { value: 'Select Category', text: 'Select Category' },
              { value: 'electronics', text: 'electronics' },
              { value: 'fashion', text: 'fashion' },
              { value: 'beauty', text: 'beauty' },
              { value: 'jewelry', text: 'jewelry' }
            ]}
            defaultCurrent={0}
            onChange={selectCategoryHandle}
            name="Select Category"
          />
        </div>
        <div className="tp-header-search-btn">
          <button type="submit">
            <Search />
          </button>
        </div>
      </div>
    </form>
  );
};

export default HeaderSearchForm;
