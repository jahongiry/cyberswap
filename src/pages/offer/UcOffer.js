import React, { useState, useEffect } from 'react';
import './offer.css';
import { selectTranslations } from '../../slices/languageSlice';
import defaultImage from '../../img/pubg.jpeg';
import { createPubgUcOffer } from '../../slices/offerSlice';
import { useSelector, useDispatch } from 'react-redux';
import { json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loader from '../../component/loader/Loader2';
import { toast } from 'react-toastify';

const UcOffer = () => {
  const translations = useSelector(selectTranslations);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [ucAmount, setUcAmount] = useState('');
  const [workhours, setWorkhours] = useState('');
  const [workminutes, setWorkminutes] = useState('');
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [isImageRequired, setIsImageRequired] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files);
      setImages((prevImages) => [...prevImages, ...newImages]);

      const newImagePreviews = newImages.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prevPreviews) => [
        ...prevPreviews,
        ...newImagePreviews,
      ]);
    }
  };

  const removeImage = (index) => {
    setImagePreviews((prevImages) => prevImages.filter((_, i) => i !== index));
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const offerData = {
      images,
      cost,
      quantity: ucAmount,
      available_time: workhours,
      transfer_time: workminutes,
      description,
    };

    try {
      await dispatch(createPubgUcOffer(offerData)).unwrap();
      navigate('/profile');
    } catch (error) {
      toast.error(<p className='red-text-important'>Error while creating</p>);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className='offer container'>
      <div className='offer-container'>
        <h1>{translations.ucoffer.title}</h1>
        <p>{translations.ucoffer.subtitle}</p>

        <form onSubmit={handleSubmit}>
          <div className='image-upload-container'>
            {imagePreviews.map((image, index) => (
              <div key={index} className='image-preview'>
                <img src={image} alt={`upload-preview-${index}`} />
                <button onClick={() => removeImage(index)}>X</button>
              </div>
            ))}
            {imagePreviews.length < 5 && (
              <label className='image-uploader'>
                <input
                  type='file'
                  onChange={handleImageChange}
                  multiple
                  accept='image/*'
                  style={{ display: 'none' }}
                  required
                />
                <div className='plus-sign'>+</div>
              </label>
            )}
          </div>
          <div className='form-group'>
            <div className='form-input'>
              <label htmlFor='ucamount'>{translations.ucoffer.ucamount}</label>
              <input
                type='number'
                name='ucamount'
                value={ucAmount}
                onChange={(e) => setUcAmount(e.target.value)}
                id='ucamount'
                min={0}
                placeholder={translations.ucoffer.ucamountPlaceholder}
                required
              />
            </div>
            <div className='form-input'>
              <label htmlFor='workhours'>
                {translations.ucoffer.workhours}
              </label>
              <input
                type='text'
                name='workhours'
                id='workhours'
                value={workhours}
                onChange={(e) => setWorkhours(e.target.value)}
                placeholder={translations.ucoffer.workhoursPlaceholder}
                required
              />
            </div>
            <div className='form-input'>
              <label htmlFor='workhours'>
                {translations.ucoffer.workminutes}
              </label>
              <input
                type='text'
                name='workminutes'
                id='workminutes'
                value={workminutes}
                onChange={(e) => setWorkminutes(e.target.value)}
                placeholder={translations.ucoffer.workminutesPlaceholder}
                required
              />
            </div>
          </div>
          <div className='form-input'>
            <label htmlFor='cost'>{translations.ucoffer.price}</label>
            <input
              type='number'
              name='cost'
              id='cost'
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              min={0}
              placeholder={translations.ucoffer.pricePlaceholder}
              required
            />
          </div>
          <div className='form-input'>
            <label htmlFor='description'>{translations.ucoffer.message}:</label>
            <textarea
              name='description'
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={translations.ucoffer.messagePlaceholder}
              required
            ></textarea>
          </div>
          <button className='form-btn' type='submit'>
            {translations.ucoffer.create}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UcOffer;
