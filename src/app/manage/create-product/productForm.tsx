import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { getCategory } from '@/redux/features/category.slice';
import { Category } from '@/core/types/category';
import { Product } from '@/core/types/product';
import { ICategory } from '@/core/interface/category';
import { ProductStatus } from '@/constant/product';
import Loader from '@/components/loader/loader';

// schema
const schema = Yup.object().shape({
  name: Yup.string().required().label('Product name'),
  description: Yup.string().required().min(6).label('Description'),
  price: Yup.string().required().min(1).label('Price'),
  quantity: Yup.string().required().min(1).label('Quantity'),
  category: Yup.number().required().label('Category'),
  status: Yup.number().required().label('Status'),
  images: Yup.string().required().label('Images')
});

const ProductForm = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const dispatch = useAppDispatch();

  const { data: categories, isLoading } = useAppSelector(
    (state) => state.category
  );

  useEffect(() => {
    if (!categories) {
      dispatch(getCategory());
    } else {
      setValue('category', categories[0].id);
    }
  }, [categories]);

  const onSubmit = (data: Product) => {
    console.log('data', data);
  };
  console.log('err', errors);

  const productStatus = [
    { value: ProductStatus.available, label: 'Available', isChecked: true },
    { value: ProductStatus.unavailable, label: 'Unavailable' }
  ];

  const [prodImg, setProdImg] = useState([]);

  const onChangeImg = (e) => {
    console.log('e', e.target.files);
    console.log(FileList.prototype[Symbol.iterator]);
    const imgList = Array.from(e.target.files);
    console.log('imgList', imgList);
    console.log('url', URL.createObjectURL(e.target.files[0]));

    const avatarFile = e.target.files[0];
    // const { data, error } = await supabase.storage
    //   .from('avatars')
    //   .upload('public/avatar1.png', avatarFile, {
    //     cacheControl: '3600',
    //     upsert: false
    //   });
  };

  return (
    <>
      {isLoading ? (
        <Loader loading={isLoading} />
      ) : (
        <div>
          <div className="container">
            <section className="product-wrapper">
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
                            {errors.name?.message}
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
                            {errors.description?.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    control={control}
                    name="category"
                    defaultValue={-1}
                    render={({ field: { onChange, value } }) => (
                      <div className="form-group mb-3">
                        <label
                          htmlFor="category"
                          className="col-sm-3 control-label"
                        >
                          Category {value}
                        </label>
                        <div className="col-sm-6">
                          <select
                            className="form-control form-select"
                            value={value ?? ''}
                            onChange={(e) => onChange(e.target.value)}
                          >
                            {categories?.map(
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
                    defaultValue=""
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
                            {errors.quantity?.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    control={control}
                    name="price"
                    defaultValue=""
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
                            {errors.price?.message}
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
                    defaultValue=""
                    render={({ field: { onChange, onBlur, value } }) => (
                      <div className="form-group mb-3">
                        <div className="col-sm-3">
                          <label className="control-label" htmlFor="images">
                            Images (jpg/png):
                          </label>
                          <input
                            type="file"
                            name="images"
                            multiple
                            value={value}
                            onChange={onChangeImg}
                          />
                        </div>
                      </div>
                    )}
                  />
                  <div className="form-group mb-3">
                    <div className="col-sm-offset-3 col-sm-9">
                      <button type="submit" className="btn btn-primary">
                        Create product
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
