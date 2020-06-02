import React, {useCallback, useContext, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {signInApi, checkUser} from "../api/api";
import {AuthContext} from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState('postulante.digitaltwin@timining.cl');
    const [password, setPassword] = useState('a9809937-a8fc-44db-960c-72515c0b03b8');
    const [error, setError] = useState(null);
    const {setData} = useContext(AuthContext);

    const procesarDatos = (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setError('Ingresa Email');
            return;
        }
        if (!password.trim()) {
            setError('Ingresa Password');
            return;
        }
        setError(null);
        login()
    }

    const login = useCallback(async () => {
        try {
            const res = await signInApi(email,password);
            setData({user:res, isLoading: false})
        } catch (error) {
            setError(error.message)
        }
    }, [email, password, setData]);

    if (checkUser()) {
        return (
            <Redirect to="/"/>
        )
    }

    return (
        <div className="mt-5">
            <div className="text-center">
                <h3>Acceso de usuarios</h3>
                <div className="row justify-content-center m-0">
                    <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                        <form onSubmit={procesarDatos}>
                            {
                                error && (
                                    <div className="alert alert-warning">{error}</div>
                                )
                            }
                            <input
                                type="email"
                                className="form-control mb-2"
                                placeholder="Ingresa email"
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                            />
                            <input
                                type="password"
                                className="form-control mb-2"
                                placeholder="Ingresa password"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                            />
                            <button className="btn btn-primary btn-lg btn-block" type="submit">
                                Iniciar session
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
