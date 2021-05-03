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
    }, [currentUser, update]);
  }


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
      const mediaFiles = await Promise.all(media.map(async (file)=>{
        return await doFetch(baseUrl + 'media/' + file.file_id);
      }));
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
        return true;
      }
    } catch (e) {
      throw new Error('delete failed');
    } finally {
      setLoading(false);
    }
  };

  return {getMedia, postMedia, putMedia, deleteMedia, loading, mediaArray};
};

const useUsers = (update = false, user, input = '', follows = false) => {
  const [userArray, setUserArray] = useState([]);
  if (update) {
    if (follows) {
      useEffect(async () => {
        const users = await getUserAvatar(user, true);
        const userFollows = await getFollows(localStorage.getItem('token'));
        let followList = users.filter((item) => {
          const isMegaMatch = userFollows?.filter((follow) => {
            return follow.file_id === item.file_id;
          });
          return isMegaMatch.length > 0;
        });
        followList = await Promise.all(followList.map(async (item) => {
          return await getUserById(localStorage.getItem('token'), item.user_id);
        }));
        setUserArray(followList);
      }, []);
    } else if (input === '') {
      useEffect(async () => {
        try {
          const users = await getUserRecommendations(
              localStorage.getItem('token'), user);
          setUserArray(users);
        } catch (e) {
          console.error('useUsers error', e.message);
        }
      }, []);
    } else {
      useEffect(async () => {
        try {
          const users = await getSearchResults(
              localStorage.getItem('token'), input, user);
          setUserArray(users);
        } catch (e) {
          console.error('useUsers error', e.message);
        }
      }, []);
    }
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

  const getUserRecommendations = async (token, user) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      let avatars = await doFetch(baseUrl + 'tags/' + appIdentifier);
      avatars = avatars.filter((avatar)=>{
        return !!JSON.parse(avatar.description).skills;
      });
      const allUsers = await Promise.all(avatars.map(async (item) => {
        return await doFetch(baseUrl + 'users/' + item.user_id, fetchOptions);
      }));
      return allUsers.filter((item) => {
        return user.user_id !== item.user_id && (user.full_name.skills?.find(
            (skill) => JSON.parse(item.full_name).skills?.includes(skill),
        ) || user.full_name.genres?.find((genre) => JSON.parse(item.full_name).genres?.includes(genre),
        ) || JSON.parse(item.full_name).regions === user.full_name.regions ? user.full_name.regions : false);
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const searchFilter = (input, array) => {
    const regex = new RegExp(input, 'gi');
    const result = array.filter((item) => {
      return item.match(regex);
    });
    return result.length > 0;
  };
  const getSearchResults = async (token, input, user) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      console.log('getsearchresults', input, user);
      let avatars = await doFetch(baseUrl + 'tags/' + appIdentifier);
      avatars = avatars.filter((avatar)=>{
        return !!JSON.parse(avatar.description).skills;
      });
      const allUsers = await Promise.all(avatars.map(async (item) => {
        return await doFetch(baseUrl + 'users/' + item.user_id, fetchOptions);
      }));
      input = input.toLowerCase();

      return allUsers.filter((item) => {
        // console.log('item', item, user.user_id, JSON.parse(item.full_name).skills ? JSON.parse(item.full_name).artist_name.includes(input): 'joo');
        return user.user_id !== item.user_id && ( (searchFilter(input, JSON.parse(item.full_name).skills)) || searchFilter(input, JSON.parse(item.full_name).genres) ||
          (JSON.parse(item.full_name).regions.toLowerCase().includes(input)) || JSON.parse(item.full_name).artist_name?.toLowerCase().includes(input) ||
          item.username.includes(input));
      });
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

  const postFollow = async (user, token) => {
    let avatars = await doFetch(baseUrl + 'tags/' + appIdentifier);
    avatars = avatars.filter((avatar)=>{
      return user.user_id === avatar.user_id;
    });

    const data = {
      file_id: avatars[0].file_id,
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
      console.log('onnistuin seuraamaan', JSON.stringify(avatars[0].file_id));
      const result = await doFetch(baseUrl + 'favourites', fetchOptions);
      console.log('result', result);
      return result;
    } catch (e) {
      throw new Error('Following failed');
    }
  };

  const deleteFollow = async (user, token) => {
    let avatars = await doFetch(baseUrl + 'tags/' + appIdentifier);
    avatars = avatars.filter((avatar)=>{
      return user.user_id === avatar.user_id;
    });

    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      console.log('onnistuin poistamaan seuraamisen', avatars[0].file_id);
      const result = await doFetch(baseUrl + 'favourites/file/' + avatars[0].file_id, fetchOptions);
      console.log('result', result);
      return result;
    } catch (e) {
      throw new Error('Unfollowing failed');
    }
  };

  const getFollows = async (token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const response = await doFetch(baseUrl + 'favourites', fetchOptions);
      return response;
    } catch (e) {
      alert(e.message);
    }
  };

  const getUserAvatar = async (user, getAll = false) => {
    try {
      const avatars = await doFetch(baseUrl + 'tags/' + appIdentifier);
      if (getAll) {
        return avatars;
      }
      const userAvatar = avatars.filter((avatar)=>{
        return avatar.user_id === user.user_id;
      });
      return userAvatar[0];
    } catch (e) {
      console.error(e.message);
    }
  };

  return {register, getUserAvailable, getUser, putUser, getUserById, getUserRecommendations, getSearchResults, postFollow, deleteFollow, getFollows, getUserAvatar, userArray};
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

const useComment = (update = false, file) => {
  const [commentArray, setCommentArray] = useState([]);
  const [commentAuthor, setCommentAuthor] = useState({});
  console.log('useComments update', update);
  if (update) {
    useEffect(() => {
      try {
        (async () => {
          const comments = await getComment(file.file_id);
          const commentAuthors = Promise.all(comments.map(async (item) => {
            return await doFetch(baseUrl + 'users/' + item.user_id);
          }));
          setCommentArray(comments);
          setCommentAuthor(commentAuthors);
        })();
      } catch (e) {
        console.error(e.message);
      }
    }, [update]);
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
        'Content-Type': 'application/json',
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
      return await doFetch(baseUrl + 'comments/file/' + fileId);
    } catch (e) {
      alert(e.message);
    }
  };

  const deleteComment = async (fileId, token) =>{
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'comments/' +fileId, fetchOptions);
    } catch (e) {
      throw new Error('delete failed');
    }
  };

  return {postComment, getComment, deleteComment, commentArray, commentAuthor};
};

const useRating = (fileId, user) => {
  const [ratingArray, setRatingArray] = useState([]);

  useEffect(() => {
    try {

    } catch (e) {
      console.error(e.message);
    }
  }, []);
  const postRating = async (token, fileId, rating) => {
    const data = {
      file_id: fileId,
      rating: rating,
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
      return await doFetch(baseUrl + 'ratings', fetchOptions);
    } catch (e) {
      throw new Error('rating failed');
    }
  };
  const deleteRating = async (fileId, token) =>{
    const fetchOptions = {
      method: 'DELETE',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      return await doFetch(baseUrl + 'ratings/file/' +fileId, fetchOptions);
    } catch (e) {
      throw new Error('delete failed');
    }
  };
  const getRating = async (fileId) => {
    try {
      return await doFetch(baseUrl + 'ratings/file/' + fileId);
    } catch (e) {
      alert(e.message);
    }
  };
  return {getRating, postRating, deleteRating};
};

export {useMedia, useUsers, useLogin, useTag, useComment, useRating};


