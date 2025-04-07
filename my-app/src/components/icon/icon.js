import styled from "styled-components";

const IconContainer = ({ classHame, id }) => (
	<div className={classHame}>
        <i className={`fa ${id}`} aria-hidden="true" ></i>
		</div>
);

export const Icon = styled(IconContainer)`
      font-size: ${({ size = '24px' }) => size };
	  margin: ${({ margin = '0' }) => margin };
	`;
