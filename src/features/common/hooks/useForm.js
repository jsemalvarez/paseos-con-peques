import { useEffect, useState } from 'react';

export const useForm = ( initialForm = {}) => {

    //TODO: implementar useRef
    const [ formState, setFormState ] = useState( initialForm );

    useEffect(() => {
        setFormState( initialForm );
    }, [ initialForm ])

    const onInputChange = ({ target }) => {
        const { name, type, checked, value, selectedOptions } = target

        let newValue;

        if (type === 'checkbox') {
          if (Array.isArray(formState[name])) {
            newValue = checked
              ? [...formState[name], value]
              : formState[name].filter((item) => item !== value);
          } else {
            newValue = checked;
          }
        } else if (selectedOptions) {
          newValue = Array.from(selectedOptions).map((option) => option.value);
        } else {
          newValue = value;
        }
      
        setFormState({
          ...formState,
          [name]: newValue,
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }


    return {
        ...formState,
        formState,
        setFormState,
        onInputChange,
        onResetForm,
    }
}