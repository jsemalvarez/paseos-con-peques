import { useEffect, useState } from 'react';

export const useForm = ( initialForm = {}) => {

    //TODO: implementar useRef
  
    const [ formState, setFormState ] = useState( initialForm );

    useEffect(() => {
        setFormState( initialForm );
    }, [ initialForm ])

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
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