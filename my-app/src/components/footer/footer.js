import { useEffect, useState } from 'react';
import styled from 'styled-components';
export const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weather, setWeather] = useState('');
	useEffect(() => {
      fetch('https://api.openweathermap.org/data/2.5/weather?q=Moscow&ints=mrtric&Lang=ru&appid=da88451eefb96ec1019c44710253cca7')
	  .then((res) => res.json())
	  .then(({name, main, weather }) => {
           setCity(name);
		   setTemperature(Math.round(main.temp));
		   setWeather(weather[0].description);
	     });
	}, []);

   return (
     <div className={className}>
		<div>
		   <div>Блог веб-разработчика</div>
		   <div>web@developer.ru</div>
		</div>
		<div>
		   <div>
			{city},{' '}
			{new Date().toLocaleString('ru', { day: 'numeric', month: 'long'})}
			</div>
		   <div>
			  {temperature} градусов, {weather}
		   </div>
		</div>
	 </div>
   );
};

export const Footer = styled(FooterContainer)`
     display: flex;
	 justify-content: space-between;
	 align-items: center;
	 width: 1000px;
	 height: 120px;
	 padding: 20px 40px;
	 font-weight: bold;
	 box-shadow: rgb(0, 0, 0) 0px 2px 17px;
	 background-color: rgb(255, 255, 255);

`;
