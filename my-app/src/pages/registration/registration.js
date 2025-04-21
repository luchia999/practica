import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import { AuthFormError, Button, H2, Input } from '../../components';
import { useResetForm } from '../../hooks';
import { setUser } from '../../actions';
import { selectUserRole } from '../../selectors';
import styled from 'styled-components';
import { ROLE } from '../../constants';

const regFormSchema= yup.object().shape({
    login: yup
	    .string()
	    .required('Заполните логин')
	    .matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цыфры')
	    .min(3, 'Неверно заполнен логин. Минимум 3 символа')
	    .max(15, 'Неверно заполнен логин. Максимум 15 символов'),
    password: yup
	     .string()
		 .required('Заполните пароль')
		 .matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются буквы,цифры и знаки # %',
		)
		 .min(6, 'Неверно заполнен пароль. Минимум 6 символа')
		 .max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
	passchech: yup
	.string()
	.required('Заполните повтор пароля')
	.oneOf([yup.ref('password'), null], 'Повтор пароля не совпадает'),
});

const RegistrationContainer = ({ className }) => {
     const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	 } = useForm({
		defaultValues: {
			login: '',
			password: '',
			passchech: '',
		},
		resolver: yupResolver(regFormSchema),
	 });

	 const [serverError, setServerError] = useState(null);

	 const dispatch = useDispatch();

	 const roleId = useSelector(selectUserRole);

	 useResetForm(reset);

	 const onSubmit = ({ login, password }) => {
         server.register(login, password).then(({error, res}) => {
			if (error) {
                setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(res));
			sessionStorage.setItem('userData', JSON.stringify(res));
		 });
	 };

     const formError = errors?.login?.message || errors?.password?.message || errors?.passchech?.message;
	 const errorMessage = formError || serverError;

	 if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	 }

	 return (
         <div className={className}>
			<H2>Регистрация</H2>
			<form>onSubmit={handleSubmit(onSubmit)}
			    <Input
				   type="text"
				    placeholder="Логин..."
					{ ...register('login',{ onChange: () => setServerError(null),
				})}
			/>
			<Input
			   type="text"
			   placeholder="Пароль..."
			   { ...register('password', {    onChange: () => setServerError(null),
				})}
			 />
			 <Input
			   type="text"
			   placeholder="Проверка пароля..."
			   { ...register('passcheck', {    onChange: () => setServerError(null),
				})}
			 />
			<Button type='submit' disabled= {!!formError}>
				Зарегистрироваться
			</Button>
			{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
		  </form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
    dicplay: flex;
    align-items: center;
    flex-direction: colimn;

& > form {
	dicplay: flex;
	flex-direction: colimn;
	width: 260px;
	}
`;
