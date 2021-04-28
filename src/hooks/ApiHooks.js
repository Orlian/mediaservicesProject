/* eslint-disable max-len */
import {appIdentifier, baseUrl} from '../utils/variables';
import {useEffect, useState} from 'react';

const doFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (json.error) {
    throw new Error(json.message + ': ' + json.message);
  } else if (!response.ok) {
    throw new Error('doFetch failed');
  } else {
    return json;
  }
};

const useMedia = (update = false) => {
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(false);
  if (update) {
    useEffect(() => {
      try {
        (async () => {
          const media = await getMedia();
          setMediaArray(media);
        })();
      } catch (e) {
        console.error(e.message);
      }
    }, []);
  }
  const getMedia = async () => {
    try {
      setLoading(true);
      const response = await fetch(baseUrl + 'tags/' + appIdentifier);
      const files = await response.json();
      console.log('getMedia files', files);
      const media = await Promise.all(files.map(async (item) => {
        return await doFetch(baseUrl + 'media/' + item.file_id);
      }));
      return media;
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  };
  const postMedia = async (data, token) => {
    setLoading(true);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
      },
      body: data,
    };
    try {
      return await doFetch(baseUrl + 'media', fetchOptions);
    } catch (e) {
      throw new Error('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const putMedia = async (data, id, token) =>{
    setLoading(true);
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await doFetch(baseUrl + 'media/' +id, fetchOptions);
      return response;
    } catch (e) {
      throw new Error('modify failed');
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async (id, token) =>{
    setLoading(true);
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const response = await doFetch(baseUrl + 'media/' +id, fetchOptions);
      return response;
    } catch (e) {
      throw new Error('delete failed');
    } finally {
      setLoading(false);
    }
  };

  return {getMedia, postMedia, putMedia, deleteMedia, loading, mediaArray};
};

const useUsers = () => {
  // TODO: Sekoilua
  const [userArray, setUserArray] = useState([]);
  const register = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      const response = await doFetch(baseUrl + 'users', fetchOptions);
      return response;
    } catch (e) {
      alert(e.message);
    }
  };

  const getUserAvailable = async (username) => {
    try {
      const response = await doFetch(baseUrl + 'users/username/' + username);
      return response.available;
    } catch (e) {
      console.log(e.message);
    }
  };

  const getUser = async (token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'users/user', fetchOptions);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const getUserRecommendations = async (user, token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const allUsers = await doFetch(baseUrl + 'users', fetchOptions);
      const allUsersData = await Promise.all(allUsers.map(async (item) => {
        if (item.user_id < 400) {
          return false;
        } else {
          return await doFetch(baseUrl + 'users/' + item.user_id, fetchOptions);
        }
      }));
      const recommendedUsers = allUsersData.filter((data) => {
        return data !== false;
      });
      console.log('allUsersData', recommendedUsers);
      // TODO: Check if this is stupid
      /* recommendedUsers = recommendedUsers.filter((item) => {
        for (let i = 0; i < user.full_name.genres; i++) {
          if (item.full_name.genres.indexOf(user.full_name.genres[i]) > -1) {
            return true;
          }
      });
        } */
      console.log('recommendedUsers', recommendedUsers);
      // TODO: Selvitä sekoilut
      setUserArray(recommendedUsers);
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const putUser = async (inputs, token) => {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(inputs),
    };
    try {
      return await doFetch(baseUrl + 'users', fetchOptions);
    } catch (e) {
      alert(e.message);
    }
  };
  const getUserById = async (token, id) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'users/' + id, fetchOptions);
    } catch (e) {
      throw new Error(e.message);
    }
  };


  return {register, getUserAvailable, getUser, putUser, getUserById, getUserRecommendations, userArray};
};

const useLogin = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      const response = await doFetch(baseUrl + 'login', fetchOptions);
      return response;
    } catch (e) {
      alert(e.message);
    }
  };
  return {postLogin};
};

const useTag = () => {
  const postTag = async (token, id, tag = appIdentifier) => {
    const data = {
      file_id: id,
      tag,
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    try {
      return await doFetch(baseUrl + 'tags', fetchOptions);
    } catch (e) {
      throw new Error('tagging failed');
    }
  };

  const getTag = async (tag) => {
    try {
      const response = await doFetch(baseUrl + 'tags/' + tag);
      return response;
    } catch (e) {
      alert(e.message);
    }
  };

  return {postTag, getTag};
};

export {useMedia, useUsers, useLogin, useTag};


