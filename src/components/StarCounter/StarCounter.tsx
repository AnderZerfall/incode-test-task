import { useEffect, useState } from 'react';
import { getGithubStars, formatLink } from '../../api/githubApi';
import numeral from 'numeral';

interface Props {
  repoLink: string;
}

export const StarCounter: React.FC<Props> = ({ repoLink }) => {
  const [stars, setStars] = useState(0);

  useEffect(() => {
    getGithubStars(formatLink(repoLink)).then((githubStars) =>
      setStars(githubStars),
    );
  }, [repoLink]);

  return <span className="">⭐ {numeral(stars).format('0.0a')}</span>;
};
