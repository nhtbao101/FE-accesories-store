import Image from 'next/image';

const DetailsThumbWrapper = (props: any) => {
  const {
    imageURLs,
    handleImageActive,
    activeImg,
    imgWidth = 416,
    imgHeight = 480
  } = props;
  return (
    <>
      <div className="tp-product-details-thumb-wrapper tp-tab d-sm-flex">
        <nav>
          <div className="nav nav-tabs flex-sm-column">
            {imageURLs?.map((item, i) => (
              <button
                key={i}
                className={`nav-link ${item.img === activeImg ? 'active' : ''}`}
                onClick={() => handleImageActive(item)}
              >
                <Image
                  src={item.url}
                  alt="image"
                  width={78}
                  height={100}
                  style={{ width: '100%', height: '100%' }}
                />
              </button>
            ))}
          </div>
        </nav>
        <div className="tab-content m-img">
          <div className="tab-pane fade show active">
            <div className="tp-product-details-nav-main-thumb p-relative">
              <Image
                src={activeImg?.url}
                alt="product img"
                width={imgWidth}
                height={imgHeight}
              />
              {/* <div className="tp-product-badge">
                {status === 'out-of-stock' && (
                  <span className="product-hot">out-stock</span>
                )}
              </div> */}
              {/* {videoId && (
                <div
                  onClick={() => setIsVideoOpen(true)}
                  className="tp-product-details-thumb-video"
                >
                  <a className="tp-product-details-thumb-video-btn cursor-pointer popup-video">
                    <i className="fas fa-play"></i>
                  </a>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
      {/* modal popup start */}

      {/* modal popup end */}
    </>
  );
};

export default DetailsThumbWrapper;
