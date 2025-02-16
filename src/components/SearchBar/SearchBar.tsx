import { Input } from 'antd';
import { Button } from 'antd';
import { Crumbs } from '../Crumbs/Crumbs';
import { StarCounter } from '../StarCounter/StarCounter';

import './SearchBar.scss';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

type Props = {
  loadIssues: (rawLink: string) => void;
};

export const SearchBar: React.FC<Props> = ({ loadIssues }) => {
  const inputRef = useRef(null);
  const repoLink = useSelector((state) => state.issues.repoLink);
  const [link, setLink] = useState(repoLink);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputRef.current) {
      setLink(inputRef.current.input?.value);
      loadIssues(inputRef.current.input?.value);
    }
  };

  return (
    <>
      <form
        className="search-bar"
        onSubmit={handleSearch}
      >
        <Input
          placeholder="Enter repo URL"
          ref={inputRef}
        />
        <Button
          type="primary"
          htmlType="submit"
        >
          Load issues
        </Button>
      </form>
      {link && (
        <div className="repo-info">
          <Crumbs repoLink={link} />
          <StarCounter repoLink={link} />
        </div>
      )}
    </>
  );
};
