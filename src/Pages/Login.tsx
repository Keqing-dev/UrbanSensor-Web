import React, { useEffect, useState } from 'react';
// import logo from '../assets/img/mapoteca-logo.png';
import Input from '../Components/Forms/Input';
import { Form, Formik } from 'formik';
import * as Unicons from '@iconscout/react-unicons';
import { login } from '../Api/api';
import { useHistory } from 'react-router-dom';
import { Puff } from '@agney/react-loading';
import { object, string } from 'yup';
import santiago from '../assets/img/santiago.mp4';

function Login() {
    const history = useHistory();

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem('tk');
        if (token !== null ) {
            // @ts-ignore
            history.replace('/map');
        }
    }, [history]);

    return (
        <div className='login-container'>
            <div className='left-side'>
                <header className='logo-mapo'>
                    <div className='logo-container'>
                        {/*<img className='img-fluid' src={logo} alt='' />*/}
                        <p>Logo</p>
                    </div>
                    <div className='mx-3 my-auto'>
                        <h5>UrbanSensor</h5>
                        <h6>urbansensor.cl</h6>
                    </div>
                </header>

                <div className='left-side-container m-auto '>
                    <header>
                        <h1>Inicia Sesión</h1>
                        <p>Ingresa a la plataforma</p>
                    </header>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={object({
                            email: string().email().required(),
                            password: string().required(),
                        })}
                        onSubmit={(values, { setErrors }) => {
                            setLoading(true);
                            login(values)
                                .then((res) => {
                                    if (res.status !== 200) throw Error;
                                    return res.data;
                                })
                                .then((data) => {
                                    localStorage.setItem('tk', data.data.token);
                                    //@ts-ignore
                                    history.replace('/map');
                                })
                                .catch(() => {
                                    setLoading(false);
                                    setErrors({
                                        email: 'Datos Inválidos',
                                        password: 'Datos Inválidos',
                                    });
                                });
                        }}
                    >
                        <Form>
                            <div className='my-1'>
                                <Input
                                    name='email'
                                    label='Email'
                                    placeholder='email@example.com'
                                    type='email'
                                    trailingIcon={<Unicons.UilUser />}
                                />
                                <Input
                                    name='password'
                                    label='Contraseña'
                                    placeholder='••••••••'
                                    type='password'
                                    trailingIcon={<Unicons.UilEye />}
                                />
                            </div>

                            <div className='d-flex justify-content-between mt-3 '>
                                <div className='my-auto'>
                                    <p className='text-gray'>¿Olvidaste tu contraseña?</p>
                                </div>

                                <button type='submit' className='button button-primary'>
                                    {isLoading && (
                                        //@ts-ignore
                                        <Puff width={20} />
                                    )}
                                    {isLoading ? 'Ingresando' : 'Ingresar'}
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>

            <video className='background-login' autoPlay muted loop>
                <source src={santiago} type='video/mp4' />
            </video>
        </div>
    );
}

export default Login;
