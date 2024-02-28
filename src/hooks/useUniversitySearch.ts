import { useQuery } from 'react-query';
import axios from 'axios';

const getUniversities = async (name: string) => {
  const response = await fetch(
    `http://universities.hipolabs.com/search?country=Czech+Republic&name=${name}`
  );
  return response.json();
};

const useUniversitySearch = (name: string) => {
  return useQuery(['universities', name], () => getUniversities(name));
};

export default useUniversitySearch;
