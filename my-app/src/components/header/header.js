import { ControlPanel, Logo } from './components'
import styled from "styled-components";

const Discription = styled.div`
    font-style: italic;
`;

const HeaderContainer = ({classHame }) => (
	<header className={classHame}>
		<Logo />
         <Discription>
			Веб-технологии
			<br />
			Написание кода
			<br />
			Разбор ошибок
		 </Discription>
		<ControlPanel />
	</header>
);

	export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	top: 0;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	box-shadow: 0px -2px 17px rgba #000;
	background-color: #fff;
	z-index: 10px;
	`;
