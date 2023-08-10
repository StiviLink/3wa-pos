import * as Yup from 'yup'
import {useCallback, useMemo, useState} from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { v4 as uuidv4 } from 'uuid'
// @mui
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import MenuItem from "@mui/material/MenuItem"
// utils
import { fData } from 'src/utils/format-number'
// routes
import { paths } from 'src/routes/paths'
import { useRouter } from 'src/routes/hook/use-router'
// assets
import { countries } from 'src/assets/data'
// components
import Label from 'src/components/label'
import Iconify from 'src/components/iconify'
import FormProvider, {
    RHFSwitch,
    RHFTextField,
    RHFUploadAvatar,
    RHFAutocomplete, RHFSelect,
} from 'src/components/hook-form'
//hook
import {axiosMailSend, convertImageToBase64} from "../hook"
import useUser from "../hook/use-user"
//api
import {getUserByEmail, createUser} from "src/api/user"
import {USER_ROLES_OPTIONS} from "../../_mock/_user"

// ----------------------------------------------------------------------
export default function UserNewEditForm({ currentUser }) {
  const router = useRouter(), [base64, setBase64] = useState(''),
      [imageUrl, setImageUrl] = useState(''), {onAddToUsers} = useUser()

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phone: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role is required'),
    zipCode: Yup.string().required('Zip code is required'),
    avatarUrl: Yup.mixed().nullable(),
    // not required
    status: Yup.string(),
    isVerified: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      city: currentUser?.city || '',
      role: currentUser?.role || '',
      email: currentUser?.email || '',
      state: currentUser?.state || '',
      status: currentUser?.status || '',
      address: currentUser?.address || '',
      country: currentUser?.country || '',
      zipCode: currentUser?.zipCode || '',
      avatarUrl: currentUser?.avatarUrl || null,
      phone: currentUser?.phone || '',
      isVerified: currentUser?.isVerified || false,
    }),
    [currentUser]
  )

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  })

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
        data.image = base64
        data.imageUrl = imageUrl
        data.idConnexion = uuidv4()
        console.info('DATA', data)
        const verifyUser = await getUserByEmail(data.email)
        console.info('verifyUser', verifyUser)
        if(!verifyUser){
            if(await createUser(data)){
                data.status = data.isVerified ? 'active' : 'pending'
                onAddToUsers(data)
                const dataEmail = {
                    Recipients: [{Email: data.email}],
                    Content: {
                        Body: [
                            {
                                ContentType: "HTML",
                                Content: `<h1><strong>Veuillez activer votre compte POS</strong></h1>
<p><a href=${'http://localhost:3000'+paths.auth.login+'?activate='+data.idConnexion+'&returnTo='+paths.dashboard.user.account}>Cliquez sur ce lien pour activer votre compte</a></p>
<br/><p>Votre mot de passe de connexion est <strong>password</strong>! Prière de le modifier une fois connecté</p>`,
                                Charset: "UTF-8"
                            }
                        ],
                        From: "Stivi Linkid <stivi-linkid@hotmail.com>",
                        Subject: "Activation du compte POS"
                    }
                }
                axiosMailSend(dataEmail).then(() => {
                    reset()
                    router.push(paths.dashboard.user.list)
                })
            }
        }
        else {
            alert('This email is already registered')
        }
    }
    catch (error) {
      console.error(error)
    }
  })

  const handleDrop = useCallback(
     (acceptedFiles) => {
      const file = acceptedFiles[0]

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
         setImageUrl(newFile.preview)
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
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentUser && (
              <Label
                color={
                  (values.status === 'active' && 'success') ||
                  (values.status === 'banned' && 'error') ||
                  'warning'
                }
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
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
            </Box>

            {currentUser && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== 'active'}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? 'banned' : 'active')
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}

            <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email Verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Disabling this will automatically send the user a verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />

            {currentUser && (
              <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Button variant="soft" color="error">
                  Delete User
                </Button>
              </Stack>
            )}
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
              <RHFTextField name="name" label="Full Name" />
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="phone" label="Phone Number" />

              <RHFAutocomplete
                name="country"
                label="Country"
                options={countries.map((country) => country.label)}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
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
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="zipCode" label="Zip/Code" />
                <RHFSelect name="role" label="Role">
                    {USER_ROLES_OPTIONS.map((role) => (
                        <MenuItem key={role} value={role}>
                            {role}
                        </MenuItem>
                    ))}
                </RHFSelect>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
