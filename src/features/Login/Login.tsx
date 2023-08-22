import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useFormik} from 'formik';
import {FormControl, FormGroup, FormLabel} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../app/hooks/hooks';
import {Navigate} from 'react-router-dom';
import {getLogin} from './authSlice';
import styled from 'styled-components';


export type FormValues = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 8) {
        errors.password = 'Must be 8 characters or more';
    }


    return errors;
};


export const Login = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const loading = useAppSelector(state => state.auth.loading)
    const captchaImg = useAppSelector(state => state.auth.auth.captcha)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: ''
        },
        validate,
        onSubmit: (values: FormValues) => {
            dispatch(getLogin(values));
            if (captchaImg) formik.resetForm()
        },
    });

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }

    return (


                <FormControl>
                    <FormLabel style={{color: 'gray', textAlign: 'center'}}>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>

                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <TextField  {...formik.getFieldProps('email')} margin="normal"/>
                            {formik.touched.email && formik.errors.email ?
                                <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                            <TextField type={'password'} {...formik.getFieldProps('password')} margin="normal"/>
                            {formik.touched.password && formik.errors.password ?
                                <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                            <FormControlLabel label={'Remember me'} control={
                                <Checkbox checked={formik.values.rememberMe}  {...formik.getFieldProps('rememberMe')}
                                          color="primary"/>}
                            />
                            {captchaImg &&
                                <CaptchaContainer>
                                    <img alt={'captcha'} src={captchaImg}/>
                                    {formik.touched.captcha && formik.errors.captcha ?
                                        <div style={{color: 'red'}}>{formik.errors.captcha}</div> : null}
                                    <TextField {...formik.getFieldProps('captcha')}/>
                                </CaptchaContainer>
                            }

                            <Button disabled={loading}
                                    type="submit"
                                    variant="contained"
                                    sx={{mt: 5, mb: 2, }}
                            >
                                Sign In
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
    );
}

const CaptchaContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`