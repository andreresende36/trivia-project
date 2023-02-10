import md5 from 'crypto-js/md5';

const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';

const getToken = async () => {
  const response = await fetch(TOKEN_URL);
  const data = await response.json();
  localStorage.setItem('token', data.token);
};

const getProfileImage = (email) => {
  const hashCode = md5(email).toString();
  const imageUrl = `https://www.gravatar.com/avatar/${hashCode}`;
  return (
    <img
      src={ imageUrl }
      alt="Imagem de perfil"
      data-testid="header-profile-picture"
      className="header-profile-picture"
    />);
};

export { getToken, getProfileImage };
