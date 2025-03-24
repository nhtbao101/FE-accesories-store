import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { getCategory } from '@/redux/features/category.slice';
import { ICategory } from '@/core/interface/category';
import { ProductStatus } from '@/constant/product';
import Loader from '@/components/loader/loader';
import supabase from '@/config/database';
import { urlFriendlyName } from '@/utils';
import {
  clearAddProduct,
  createProduct
} from '@/redux/features/product/product.slice';
import { notifyError, notifySuccess } from '@/utils/toast';
import { useRouter } from 'next/navigation';

// schema
const schema = Yup.object().shape({
  name: Yup.string().required().label('Product name'),
  description: Yup.string().required().min(6).label('Description'),
  price: Yup.number()
    .typeError('Quantity must be a number')
    .integer()
    .required()
    .min(1)
    .label('Price'),
  quantity: Yup.number()
    .typeError('Quantity must be a number')
    .required()
    .integer()
    .min(1)
    .label('Quantity'),
  categoryId: Yup.number().required().label('Category'),
  status: Yup.number().required().label('Status'),
  images: Yup.array().required().label('Images')
});

type Props = {
  isUpdate?: boolean;
  data?: any;
};

const ProductForm = (props: Props) => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: props.data,
    resolver: yupResolver(schema)
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data: categories, isLoading } = useAppSelector(
    (state) => state.category
  );

  const {
    isLoading: isCreatingProduct,
    error,
    isSuccess
  } = useAppSelector((state) => state.product.add);

  // console.log('product form data prop', props.data);
  // console.log(
  //   'product form',
  //   useAppSelector((state) => state.product)
  // );

  useEffect(() => {
    // console.log('mount category');
    if (categories) {
      console.log('has category');
      // setValue('categoryId', (categories as any)[0].id);
    } else {
      console.log('get category');
      // dispatch(getCategory());
    }
    return () => {
      dispatch(clearAddProduct());
    };
  }, [categories]);

  const productStatus = [
    { value: ProductStatus.available, label: 'Available', isChecked: true },
    { value: ProductStatus.unavailable, label: 'Unavailable' }
  ];

  const [prodImg, setProdImg] = useState([]);
  const [imgURL, setImgURL] = useState<string[]>([]);

  useEffect(() => {
    if (isSuccess) {
      notifySuccess('Create product successfully!');
      // reset();
      dispatch(clearAddProduct());
      setTimeout(() => {
        router.push('/products');
      }, 1000);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (error?.length) {
      error.map((msg: string) => {
        return notifyError(msg);
      });
    }
  }, [error]);

  const onChangeImg = async (e: any) => {
    const imgList: any = Array.from(e.target.files);
    const imgURLList = imgList.map((img: File) => URL.createObjectURL(img));

    setProdImg(imgList);
    setImgURL(imgURLList);
  };

  const uploadImage = async (images: File[]) => {
    const timeStamp = new Date().getTime();

    const imageData = images.map(async (image: File) => {
      const { data, error } = await supabase.storage
        .from('prod-img')
        .upload(`${timeStamp}-${urlFriendlyName(image.name)}`, image, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        return error;
      }

      return data;
    });

    const res = await Promise.all(imageData);
    return res;
  };

  const onSubmit = async (productData: any) => {
    const imgUpload = await uploadImage(prodImg)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error('Upload error:', err);
        return err;
      });

    const bodyData = {
      ...productData,
      images: imgUpload.map((img: any, index: number) => {
        return {
          url: `${process.env.NEXT_PUBLIC_SUPABASE_DEV}/storage/v1/object/public/${img.fullPath}`,
          imageName: (prodImg[index] as File).name.split('.')[0]
        };
      }),
      price: +productData.price,
      quantity: +productData.quantity
    };

    await dispatch(createProduct(bodyData));
  };

  return (
    <>
      {isLoading ? (
        <Loader loading={isLoading} />
      ) : (
        <div>
          <div className="container">
            <section className="product-form">
              <div className="panel-heading">
                <h3 className="panel-title">Create a product</h3>
              </div>
              <div className="panel-body">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  // action=""
                  className="form-horizontal"
                  // role="form"
                >
                  <Controller
                    control={control}
                    name="name"
                    defaultValue=""
                    render={({ field: { onChange, onBlur, value } }) => (
                      <div className="form-group mb-3">
                        <label
                          htmlFor="name"
                          className="col-sm-3 control-label"
                        >
                          Product name
                        </label>
                        <div className="col-sm-12">
                          <input
                            type="text"
                            className="form-control"
                            name="productName"
                            id="productName"
                            placeholder="Vòng tay xao xác"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                          />
                        </div>
                        {errors.name?.message && (
                          <p className="error-msg mt-1">
                            {`${errors.name?.message}`}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <Controller
                    control={control}
                    name="description"
                    defaultValue=""
                    render={({ field: { onChange, onBlur, value } }) => (
                      <div className="form-group mb-3">
                        <label
                          htmlFor="about"
                          className="col-sm-3 control-label"
                        >
                          Product description
                        </label>
                        <div className="col-sm-12">
                          <textarea
                            className="form-control"
                            placeholder="The description about product"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                          ></textarea>
                        </div>
                        {errors.description?.message && (
                          <p className="error-msg mt-1">
                            {`${errors.description?.message}`}
                          </p>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    control={control}
                    name="categoryId"
                    defaultValue={-1}
                    render={({ field: { onChange, value } }) => (
                      <div className="form-group mb-3">
                        <label
                          htmlFor="category"
                          className="col-sm-3 control-label"
                        >
                          Category
                        </label>
                        <div className="col-sm-6">
                          <select
                            className="form-control form-select"
                            value={value ?? ''}
                            onChange={(e) => onChange(e.target.value)}
                          >
                            {(categories as any)?.map(
                              (category: ICategory, i: number) => (
                                <option value={category.id} key={i}>
                                  {category.name}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    )}
                  />
                  <Controller
                    control={control}
                    name="quantity"
                    defaultValue={0}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <div className="form-group mb-3">
                        <label className="col-sm-3 control-label">
                          Quantity
                        </label>
                        <div className="col-sm-6">
                          <input
                            type="text"
                            className="form-control"
                            name="quantity"
                            id="quantity"
                            placeholder="20"
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                          />
                        </div>
                        {errors.quantity?.message && (
                          <p className="error-msg mt-1">
                            {`${errors.quantity?.message}`}
                          </p>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    control={control}
                    name="price"
                    defaultValue={0}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <div className="form-group col-sm-6 mb-3">
                        <label className="control-label" htmlFor="price">
                          Price
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="price"
                          id="price"
                          placeholder="990000"
                          onChange={onChange}
                          onBlur={onBlur}
                          value={value}
                        />
                        {errors.price?.message && (
                          <p className="error-msg mt-1">
                            {`${errors.price?.message}`}
                          </p>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    control={control}
                    name="status"
                    defaultValue={productStatus[0].value}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <div className="form-group mb-3">
                        <label className="col-sm-3 control-label">Status</label>
                        {productStatus.map((status, i: number) => (
                          <div className="form-check" key={i}>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="status"
                              value={status.value ?? ''}
                              id={status.label}
                              onChange={(e) => {
                                onChange(e.target.value);
                              }}
                              defaultChecked={status.isChecked || false}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={status.label}
                            >
                              {status.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  />
                  <Controller
                    control={control}
                    name="images"
                    defaultValue={[]}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <div className="form-group mb-3">
                        <div className="d-flex align-items-center">
                          <label className="control-label" htmlFor="images">
                            Images (jpg/png):
                          </label>
                          <input
                            type="file"
                            name="file-input"
                            id="file-input"
                            className="file-input__input"
                            onChange={onChangeImg}
                            multiple
                          />
                          <label
                            className="file-input__label ml-20"
                            htmlFor="file-input"
                          >
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="upload"
                              className="svg-inline--fa fa-upload fa-w-16"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path
                                fill="currentColor"
                                d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                              ></path>
                            </svg>
                            <span>Upload file</span>
                          </label>
                        </div>
                        <div className="img-list row">
                          {imgURL.map((img: string, index: number) => (
                            <div
                              className="col-xl-6 col-md-6 col-sm-6"
                              key={index}
                            >
                              <img
                                className="product-img my-4"
                                src={img}
                                alt="product-img"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  />
                  <div className="form-group mb-3">
                    <div className="col-sm-offset-3 col-sm-9 mt-40">
                      {/* <button type="submit" className="btn btn-primary">
                        Create product
                      </button> */}
                      <button
                        type="submit"
                        className="btn btn-primary btn-create-prod"
                        disabled={isCreatingProduct}
                      >
                        {isCreatingProduct ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            <span className="visually-hidden">Loading...</span>
                          </>
                        ) : (
                          <>Create product</>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductForm;
