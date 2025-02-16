import { Input, Typography } from 'antd';
import { Button } from 'antd';
import { Crumbs } from '../Crumbs/Crumbs';
import { StarCounter } from '../StarCounter/StarCounter';
import { SyncOutlined } from '@ant-design/icons';
import './SearchBar.scss';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { isValidGitHubLink } from '../../api/githubApi';
import { toast } from 'react-toastify';
import { RootState } from '../../features/github/issuesSlices';

type Props = {
  loadIssues: (rawLink: string) => void;
  isLoading: boolean
};

export const SearchBar: React.FC<Props> = ({ loadIssues, isLoading }) => {
  const inputRef = useRef(null);
  const repoLink = useSelector((state: RootState) => state.issues.repoLink);
  const [searchStatus, setSearchStatus] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputRef.current) {
      const currentLink = inputRef.current.input?.value;

      try {
        isValidGitHubLink(currentLink)
        loadIssues(inputRef.current.input?.value);
        setSearchStatus('')
      } catch (error) {
        toast(error.message);
        setSearchStatus('error')
      }
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
          data-testid='search-bar'
          status={searchStatus}
        />
        <Button
          type="primary"
          htmlType="submit"
          size='large'
          data-testid='search-bar-button'
          loading={ isLoading && { icon: <SyncOutlined spin /> }}
          disabled={isLoading}
          style={{ width: '200px'}}
        >
          Load issues
        </Button>
      </form>
      
      <div className="repo-info">
        🗂️
        {repoLink ? (
          <>
            <Crumbs repoLink={repoLink} />
            <StarCounter repoLink={repoLink} />
          </>
        ) : <Typography.Text type='secondary'> Enter the link to your repository </Typography.Text>}
      </div>
      
    </>
  );
};
