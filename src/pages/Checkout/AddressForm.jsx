import React from 'react';
import './AddressForm.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const AddressForm = ({ onSubmit }) => {
  const validationSchema = Yup.object({
    fullName: Yup.string().required('Required'),
email: Yup.string().email('Invalid email address').required('Required'),
    phone: Yup.string().required('Required'),
    house: Yup.string().required('Required'),
    street: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    pincode: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
  });

  return (
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        house: '',
        street: '',
        city: '',
        pincode: '',
        country: '',
        addressType: 'Home',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form className="address-form">
          <h3>Shipping Address</h3>

          <Field name="fullName" placeholder="Full Name" />
          <ErrorMessage name="fullName" component="div" className="error" />
<Field name="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" className="error" />

          <PhoneInput
            country={'in'}
            value={values.phone}
            onChange={(phone) => setFieldValue('phone', phone)}
            inputProps={{ required: true }}
          />
          <ErrorMessage name="phone" component="div" className="error" />

          <Field name="house" placeholder="House No / Area" />
          <ErrorMessage name="house" component="div" className="error" />

          <Field name="street" placeholder="Street Address" />
          <ErrorMessage name="street" component="div" className="error" />

          <Field name="city" placeholder="City" />
          <ErrorMessage name="city" component="div" className="error" />

          <Field name="pincode" placeholder="Pincode" />
          <ErrorMessage name="pincode" component="div" className="error" />

          <Field as="select" name="country">
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </Field>
          <ErrorMessage name="country" component="div" className="error" />

          <div className="type-buttons">
            {['Home', 'Work', 'Other'].map((type) => (
              <button
                type="button"
                key={type}
                className={values.addressType === type ? 'selected' : ''}
                onClick={() => setFieldValue('addressType', type)}
              >
                {type}
              </button>
            ))}
          </div>

          <button type="submit" className="submit-btn">Continue</button>
        </Form>
      )}
    </Formik>
  );
};

export default AddressForm;
