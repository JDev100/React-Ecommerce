import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

function FormInput({ name, label, required, control }) {
    //   const isError = false;

    // const { register, formState: { errors }, } = useFormContext();
    return (
        <Grid item xs={12} sm={6}>
            <Controller
                name={name}
                control={control}
                defaultValue= ''
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                    formState,
                }) => (
                    <TextField
                        helperText={error ? error.message : null}
                        // size="small"
                        error={!!error}
                        required={required}
                        onChange={onChange}
                        value={value}
                        fullWidth
                        label={label}
                        variant="outlined"
                    />
                )}
            />
        </Grid>

    );
}

export default FormInput;