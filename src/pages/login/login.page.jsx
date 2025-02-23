import { useEffect, useState } from 'react';
import User from '../../models/user';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AuthenticationService from '../../services/authentication.service';
import { setCurrentUser } from '../../store/actions/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
//import '../register/register.page.css'; //No need it.
import { I18nProvider, LOCALES } from "../../i18n";
import { FormattedMessage, IntlProvider } from "react-intl";


const LoginPage = () => {

    const [user, setUser] = useState(new User('', '', '', '', '', '', '', '', ''));
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const currentUser = useSelector(state => state.user);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    //mounted
    useEffect(() => {
        if (currentUser?.id) {
            //navigate
            navigate('/profile');
        }
    }, []);

    //<input name="x" value="y" onChange=(event) => handleChange(event)>
    const handleChange = (e) => {
        const { name, value } = e.target;

        console.log("name : " + name)
        console.log("value : " + value)

        setUser((prevState => {
            //e.g: prevState ({user: x, pass: x}) + newKeyValue ({user: xy}) => ({user: xy, pass: x})
            return {
                ...prevState,
                [name]: value
            };
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setSubmitted(true);

        if (!user.username || !user.password) {
            return;
        }

        setLoading(true);

        AuthenticationService.login(user).then(response => {
            //set user in session.
            dispatch(setCurrentUser(response.data));
            navigate('/profile');
        }).catch(error => {
            console.log(error);
            setErrorMessage('username or password is not valid.');
            setLoading(false);
        });
    };

    return (
        <I18nProvider locale={localStorage.getItem("language")}>
            <div className="container mt-5">
                <div className="card ms-auto me-auto p-3 shadow-lg custom-card">

                    <FontAwesomeIcon icon={faUserCircle} className="ms-auto me-auto user-icon" />

                    {errorMessage &&
                        <div className="alert alert-danger">
                            {errorMessage}
                        </div>
                    }

                    <form
                        onSubmit={(e) => handleLogin(e)}
                        noValidate
                        className={submitted ? 'was-validated' : ''}
                    >

                        <div className="form-group">
                            <label htmlFor="username"><FormattedMessage id='username' /></label>

                            <FormattedMessage id='username_w'>
                                {(msg) => (
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder={msg}
                                        value={user.username}
                                        onChange={(e) => handleChange(e)}
                                        required
                                    />
                                )}
                            </FormattedMessage>
                            <div className="invalid-feedback">
                                <FormattedMessage id='req_field' />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password"><FormattedMessage id='password' /></label>
                            <FormattedMessage id='password_w'>
                                {(msg) => (
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder={msg}
                                        value={user.password}
                                        onChange={(e) => handleChange(e)}
                                        required
                                    />
                                )}
                            </FormattedMessage>
                            <div className="invalid-feedback">
                                <FormattedMessage id='req_field' />
                            </div>
                        </div>

                        <button className="btn btn-dark w-20 mt-3" style={{ marginLeft: 123 }} disabled={loading}>
                            <FormattedMessage id='sign_in' />
                        </button>

                    </form>

                    <Link to="/register" className="btn btn-link" style={{ color: 'darkgray' }}>
                        <FormattedMessage id='create_new_acc' />
                    </Link>

                </div>
            </div>
        </I18nProvider>
    );
};

export { LoginPage };
