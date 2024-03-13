'use client';

import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { parse } from "isbn3";
import FormTextField from "../UI/FormTextField";

const AddBookForm = ({
  userId
}: {
  userId: string;
}) => {

  const methods = useForm({
    defaultValues: {
      isbn: ""
    }
  });

  const {
    formState: { errors },
    handleSubmit
  } = methods;

  const validateIsbn = async (data: any) => {
    console.log(data['isbn']);
  };

  return (
    <div className="form-container">
      <form onChange={handleSubmit(validateIsbn)}>
        <FormProvider {...methods}>
          <div className="input-container">
            <FormTextField
              error={errors.isbn}
              name="isbn"
              label="ISBN"
              required={true}
            />
          </div>
        </FormProvider>
      </form>
    </div>
  )
}

export default AddBookForm;