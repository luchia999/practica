import { useEffect } from "react";
import { useStore } from "react-redux";

export const useResetForm = (reset) => {
	const store = useStore();

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
};
