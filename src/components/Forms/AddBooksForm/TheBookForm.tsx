import { Dispatch, SetStateAction } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { parse } from "isbn3";
import FormTextField from "@components/UI/FormTextField";

interface BookFormProps {
  isbnList: string[];
  setIsbnList: Dispatch<SetStateAction<string[]>>;
}

const TheBookForm = ({
  isbnList,
  setIsbnList
}: BookFormProps) => {
  const methods = useForm({
    defaultValues: {
      isbn: ""
    }
  });
  
  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    setError,
  } = methods;

  const validateIsbn = async (data: any) => {
    const isbn = data['isbn'];

    if (isbnList.includes(isbn)) {
      setError('isbn', {
        type: 'manual',
        message: 'This ISBN is already in the list'
      });
    }

    if (parse(isbn)) {
      clearErrors('isbn');
      setIsbnList([...isbnList, isbn]);
    }

    if (!parse(isbn)) {
      setError('isbn', {
        type: 'manual',
        message: 'Invalid ISBN'
      });
    }
  };

  return (
    <div className="form-container">
      <form onChange={handleSubmit(validateIsbn)}>
        <FormProvider {...methods}>
          <div className="input-container">
            <FormTextField
              error={errors.isbn}
              helperText={errors.isbn ? errors.isbn.message : ""}
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

export default TheBookForm;