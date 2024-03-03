import React, { useState, useEffect } from 'react';
import './popupOffer.css';
import { selectTranslations } from '../../../slices/languageSlice';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../../component/loader/Loader2';
import { updateUcOffer } from '../../../slices/profileSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EditUcOffer = ({ isOpen, onClose, offerInfo, onSuccessfulSubmit }) => {
  const translations = useSelector(selectTranslations);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ucAmount, setUcAmount] = useState('');
  const [workhours, setWorkhours] = useState('');
  const [workminutes, setWorkminutes] = useState('');
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (offerInfo) {
      setUcAmount(offerInfo.quantity?.toString() || '');
      setWorkhours(offerInfo.available_time?.toString() || '');
      setWorkminutes(offerInfo.transfer_time?.toString() || '');
      setCost(offerInfo.cost?.toString() || '');
      setDescription(offerInfo.description || '');
    }
  }, [offerInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const offerData = {
      cost: parseInt(cost, 10),
      quantity: parseInt(ucAmount, 10),
      available_time: workhours,
      transfer_time: workminutes,
      description,
    };

    try {
      await dispatch(
        updateUcOffer({
          offerId: offerInfo.id,
          offerData,
        })
      );
      toast.success(translations.ucoffer.successMessage);
      onSuccessfulSubmit();
      onClose();
    } catch (error) {
      console.error('Error updating offer:', error);
      toast.error(translations.ucoffer.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  if (loading) {
    return <Loader />;
  }

  return (
    <section className='edit-offer-uc edit-containe'>
      <div className='offer-container'>
        <button className='close-edit-offer' onClick={onClose}>
          <ion-icon name='close-circle-outline'></ion-icon>
        </button>
        <h1>{translations.ucoffer.title}</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <div className='form-input'>
              <label htmlFor='ucamount'>{translations.ucoffer.ucamount}</label>
              <input
                type='number'
                name='ucamount'
                id='ucamount'
                value={ucAmount}
                onChange={(e) => setUcAmount(e.target.value)}
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
              <label htmlFor='workminutes'>
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
            {translations.ucoffer.update}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditUcOffer;
