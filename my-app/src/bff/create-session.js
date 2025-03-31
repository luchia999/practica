import { removeComment } from './session';
import { ROLE } from '../constants';

export const createSession = (roleId) => {
  const session = {
    logout() {
      Object.keys(session).forEach((key) => {
        delete session[key];
      });
    },
  };

  switch (roleId) {
    case ROLE.ADMIN:{
      session.removeComment = removeComment;
      break;
	}
	case ROLE.MODERATOR:{
		session.removeComment = removeComment;
		break;
	  }
	  case ROLE.READER:{
		break;
	  }
    // Здесь могут быть дополнительные случаи для других ролей
    default:
      // Ничего не делать
  }
  return session;
};
