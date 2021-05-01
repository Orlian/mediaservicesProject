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

const useMedia = (update = false, ownFiles, currentUser) => {
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState({});


  if (update) {
    useEffect(() => {
      try {
        (async () => {
          const media = await getMedia(currentUser, localStorage.getItem('token'));
          setMediaArray(media);
        })();
      } catch (e) {
        console.error(e.message);
      }
    }, [currentUser]);
  }

  useEffect(() => {
    try {
      (async () => {
        const avatar = await getAvatar(localStorage.getItem('token'));
        console.log('avatar mikä olet', avatar);
        setAvatar(avatar);
      })();
    } catch (e) {
      console.error(e.message);
    }
  }, []);

  const getMedia = async (currentUser, token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      setLoading(true);
      console.log('getmedia user', currentUser);
      const media = await doFetch(baseUrl + 'media/user/' + currentUser.user_id, fetchOptions);
      let mediaFiles = await Promise.all(media.map(async (file)=>{
        return await doFetch(baseUrl + 'media/' + file.file_id);
      }));
      mediaFiles = mediaFiles.filter((file)=>{
        return file.description.includes('description');
      });
      console.log('jooa', mediaFiles);
      return mediaFiles;
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const getAvatar = async (token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };

    try {
      setLoading(true);
      console.log('get avatar info of current user', currentUser);
      const media = await doFetch(baseUrl + 'media/user/', fetchOptions);
      const mediaFiles = media[0];
      return mediaFiles;
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
      if (response) {
        const media = await getMedia();
        setMediaArray(media);
      }
    } catch (e) {
      throw new Error('delete failed');
    } finally {
      setLoading(false);
    }
  };

  return {getMedia, postMedia, putMedia, deleteMedia, loading, mediaArray, getAvatar, avatar};
};

const useUsers = (update = false) => {
  const [userArray, setUserArray] = useState([]);
  // TODO: Looppaako tämä turhaan?
  if (update) {
    useEffect(async () => {
      try {
        const users = await getUserRecommendations(localStorage.getItem('token'));
        setUserArray(users);
      } catch (e) {
        console.error('useUsers error', e.message);
      }
    }, []);
  }
  const register = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      return await doFetch(baseUrl + 'users', fetchOptions);
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

  const getUserRecommendations = async (token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      let avatars = await doFetch(baseUrl + 'tags/' + appIdentifier);
      avatars = avatars.filter((avatar)=>{
        console.log('avatar', avatar);
        return !!JSON.parse(avatar.description).skills;
      });
      console.log('users', avatars);
      return await Promise.all(avatars.map(async (item) => {
        return await doFetch(baseUrl + 'users/' + item.user_id, fetchOptions);
      }));
    } catch (e) {
      console.log(e.message);
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

const useComment = (update, file) => {
  const [commentArray, setCommentArray] = useState([]);

  if (update) {
    useEffect(() => {
      try {
        (async () => {
          const comments = await getComment(file.file_id);
          setCommentArray(comments);
        })();
      } catch (e) {
        console.error(e.message);
      }
    }, []);
  }

  const postComment = async (token, fileId, comment) => {
    const data = {
      file_id: fileId,
      comment: comment,
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
      },
      body: JSON.stringify(data),
    };
    try {
      return await doFetch(baseUrl + 'comments', fetchOptions);
    } catch (e) {
      throw new Error('commenting failed');
    }
  };

  const getComment = async (fileId) => {
    try {
      const response = await doFetch(baseUrl + 'comments/file/' + fileId);
      return response;
    } catch (e) {
      alert(e.message);
    }
  };

  return {postComment, getComment, commentArray};
};

export {useMedia, useUsers, useLogin, useTag, useComment};


