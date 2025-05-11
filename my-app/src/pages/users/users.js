import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { PrivateContent, H2 } from '../../components';
import { TableRow, UserRow } from './components';
import { useServerRequest } from '../../hooks';
import { сheckAccess } from "../../utils";
import { selectUserRole } from "../../selectors";
import { ROLE } from '../../constants';
import styled from "styled-components";

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouIdUpdateUserList, setShouIdUpdateUserList ] = useState(false);
	const userRole = useSelector(selectUserRole);

    const requestServer = useServerRequest();

	useEffect(() => {
		if (!сheckAccess([ROLE.ADMIN], userRole)) {
			return;
		}
		Promise.all([requestServer('fetchUsers'), requestServer('fetchRoles')]).then(([usersRes, rolesRes]) => {
			if (usersRes.error || rolesRes.error) {
				setErrorMessage(usersRes.error || rolesRes.error);
				return;
			}
            setUsers(usersRes.res);
			setRoles(rolesRes.res);
		},
	);
	}, [requestServer, shouIdUpdateUserList, userRole]);

	const onUserRemove = (userId) => {
		requestServer('removeUser', userId).then(() => {
			setShouIdUpdateUserList(!shouIdUpdateUserList);
		});
	};

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
			<div className={className}>
			  <H2>Пользователи</H2>
			  <div>
				 <TableRow>
					<div className='login-column'>Логин</div>
					<div className='registered-at--column'>Дата регистрации</div>
					<div className='role-column'>Роль</div>
				</TableRow>
				{users.map(({id, login, registeredAt, roleId }) => (
						<UserRow
						key={id}
						id={id}
						login={login}
						registeredAt={registeredAt}
						roleId={roleId}
						roles={roles.filter(
							({ Id: roleId }) => roleId !== ROLE.GUEST,
					  )}
					  onUserRemove={() => onUserRemove(id)}
					/>
				))}
			</div>
	     </div>
	</PrivateContent>
	);
};

export const Users = styled(UsersContainer)`
    dicplay: flex;
    align-items: center;
    flex-direction: colimn;
	margin: 0 auto;
	width: 570px;
`;

