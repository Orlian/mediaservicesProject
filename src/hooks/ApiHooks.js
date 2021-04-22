import {appIdentifier, baseUrl} from '../utils/variables';
import {useState} from 'react';

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

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const getMedia = async () => {
    try {
      const response = await fetch(baseUrl + '/tags/' + appIdentifier);
      const files = await response.json();
      const media = await Promise.all(files.map(async (item) => {
        return await doFetch(baseUrl + 'media/' + item.file_id);
      }));
      setMediaArray(media);
    } catch (e) {
      console.error(e.message);
    }
  };
  return {getMedia, mediaArray};
};

export {useMedia};
