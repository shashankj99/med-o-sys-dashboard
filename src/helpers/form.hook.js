import { useState } from 'react';

export const use_form_fields = (initialState) =>
{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [fields, setValues] = useState(initialState);

    return [
        fields,
        function (event)
        {
            if (event.hasOwnProperty('bsDate'))
                setValues({
                    ...fields,
                    dob_bs: event.bsDate,
                    dob_ad: event.adDate
                });
            else if(event.hasOwnProperty('province'))
                setValues({
                    ...fields,
                    province: event.province
                });
            else {
                setValues({
                    ...fields,
                    [event.target.id]: (event.target.files) ? event.target.files[0] : event.target.value,
                })
            }
        }
    ];
}
