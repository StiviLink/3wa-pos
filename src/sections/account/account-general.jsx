import * as Yup from 'yup'
import {useCallback, useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// @mui
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
// utils
import { fData } from 'src/utils/format-number'
// assets
import { countries } from 'src/assets/data'
// components
import Iconify from 'src/components/iconify'
//import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
//hook
import useUser from "../hook/use-user"
import {convertImageToBase64} from "../hook"
//api
import {updateUser} from "../../api/user"

// ----------------------------------------------------------------------

export default function AccountGeneral() {
//  const { enqueueSnackbar } = useSnackbar();

  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    photoURL: Yup.mixed().nullable().required('Avatar is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    country: Yup.string().required('Country is required'),
    address: Yup.string().required('Address is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    zipCode: Yup.string().required('Zip code is required'),
    about: Yup.string().required('About is required')
  })

  const {currentUser, onUpdateCurrentUser} = useUser(), [base64, setBase64] = useState(currentUser.image)

  const defaultValues = {
    displayName: currentUser?.name || '',
    email: currentUser?.email || '',
    photoURL: currentUser?.imageUrl || null,
    phoneNumber: currentUser?.phone || '',
    country: currentUser?.country || '',
    address: currentUser?.address || '',
    state: currentUser?.state || '',
    city: currentUser?.city || '',
    zipCode: currentUser?.zipCode || '',
    about: currentUser?.description || ''
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = handleSubmit(async (data) => {
    try {
        data.idUser = currentUser.id
        data.image = base64
        data.description = data.about
        data.description = data.about
        await updateUser({...currentUser, ...data})
        onUpdateCurrentUser({...currentUser, ...data})
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
        const file = acceptedFiles[0]

        const newFile = Object.assign(file, {
            preview: URL.createObjectURL(file),
        })
        convertImageToBase64(newFile.preview, setBase64)

        if (file) {
            setValue('avatarUrl', newFile, { shouldValidate: true });
        }
    },
    [setValue]
  )

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="photoURL"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="displayName" label="Name" />
              <RHFTextField name="email" label="Email Address" disabled/>
              <RHFTextField name="phoneNumber" label="Phone Number" />
              <RHFTextField name="address" label="Address" />

              <RHFAutocomplete
                name="country"
                label="Country"
                options={countries.map((country) => country.label)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => {
                  const { code, label, phone } = countries.filter(
                    (country) => country.label === option
                  )[0];

                  if (!label) {
                    return null;
                  }

                  return (
                    <li {...props} key={label}>
                      <Iconify
                        key={label}
                        icon={`circle-flags:${code.toLowerCase()}`}
                        width={28}
                        sx={{ mr: 1 }}
                      />
                      {label} ({code}) +{phone}
                    </li>
                  );
                }}
              />

              <RHFTextField name="state" label="State/Region" />
              <RHFTextField name="city" label="City" />
              <RHFTextField name="zipCode" label="Zip/Code" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFTextField name="about" multiline rows={4} label="About" />

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  )
}
