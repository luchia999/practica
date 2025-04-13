import { useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import { Button, H2, Input } from '../../components';
import { setUser } from '../../actions';
import { selectUserRole } from '../../selectors';
import styled from 'styled-components';
import { ROLE } from '../../constants';


const authFormSchema= yup.object().shape({
    login: yup.string()
	.required('Заполните логин')
	    .matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цыфры')
	    .min(3, 'Неверно заполнен логин. Минимум 3 символа')
	    .max(15, 'Неверно заполнен логин. Максимум 15 символов'),
    password: yup
	     .string()
		 .required('Заполните пароль')
		 .matches(/^[\w#%]+$/, 'Неверно заполнен пароль. Допускаются буквы,цифры и знаки # %',)
		 .min(6, 'Неверно заполнен пароль. Минимум 6 символа')
		 .max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
});

const StyledLink = styled(Link)`
   text-align: center;
   text-dtcoration: underline;
   maegin: 20px 0;
   font-suze: 18px;
`;

const ErrorMessage = styled(Link)`
   font-suze: 18px;
   margin: 10px 0 0;
   padding:10px;
   background-color: #fcadad;
`;

const AuthorizationContainer = ({ className }) => {
     const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	 } = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	 });

	 const [serverError, setServerError] = useState(null);

	 const dispatch = useDispatch();
	 const store = useStore();

	 const roleId = useSelector(selectUserRole);

	 useEffect(() => {
		let curentWasLogout = store.getState().app.wasLogout;

        return store.subscribe(() => {
           let  previonsWasLogout = curentWasLogout;
			curentWasLogout = store.getState().app.wasLogout;

            if (curentWasLogout !== previonsWasLogout) {
				reset();
			}
		  });
	 }, [reset, store]);

	 const onSubmit = ({ login, password }) => {
         server.authorize(login, password).then(({error, res}) => {
			if (error) {
                setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(res));
		 });
	 };

     const formError = errors?.login?.message || errors?.password?.message;
	 const errorMessage = formError || serverError;

	 if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	 }

	 return (
         <div className={className}>
			<H2>Авторизация</H2>
			<form>onSubmit={handleSubmit(onSubmit)}
			    <Input type="text" placeholder="Логин..."{ ...register('login',{ onChange: () => setServerError(null),
				})} />
				<Input type="text" placeholder="Пароль..."{ ...register('password', { onChange: () => setServerError(null),
				})} />
				<Button type='submit' disabled={!!formError}>
					Авторизаваться
					</Button>
					{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
					<StyledLink to="/register">Регистрация</StyledLink>
			</form>
		 </div>
	 );
};

export const Authorization = styled(AuthorizationContainer)`
    dicplay: flex;
    align-items: center;
    flex-direction: colimn;

	& > form {
	dicplay: flex;
	flex-direction: colimn;
	width: 260px;
	}
`;
