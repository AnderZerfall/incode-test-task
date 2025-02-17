import { Input, Typography } from 'antd';
import { Button } from 'antd';
import { Crumbs } from '../Crumbs/Crumbs';
import { StarCounter } from '../StarCounter/StarCounter';
import { SyncOutlined } from '@ant-design/icons';
import './SearchBar.scss';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { isValidGitHubLink } from '../../api/githubApi';
import { toast } from 'react-toastify';
import { RootState } from '../../features/github/issuesSlices';

type Props = {
  loadIssues: (rawLink: string) => void;
  isLoading: boolean;
};

export const SearchBar: React.FC<Props> = ({ loadIssues, isLoading }) => {
  const [searchLink, setSearchLink] = useState('');
  const repoLink = useSelector((state: RootState) => state.issues.repoLink);
  const [searchStatus, setSearchStatus] = useState<'' | 'warning' | 'error'>('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      isValidGitHubLink(searchLink);
      loadIssues(searchLink);
      setSearchLink('');
      setSearchStatus('');
    } catch (error) {
      toast(error.message);
      setSearchStatus('error');
    }
  };

  return (
    <>
      <form className='search-bar' onSubmit={handleSearch}>
        <Input
          placeholder='Enter repo URL'
          value={searchLink}
          onChange={(event) => setSearchLink(event.target.value)}
          data-testid='search-bar'
          status={searchStatus}
        />
        <Button
          type='primary'
          htmlType='submit'
          size='large'
          data-testid='search-bar-button'
          loading={isLoading && { icon: <SyncOutlined spin /> }}
          disabled={isLoading}
          style={{ width: '200px' }}
        >
          Load issues
        </Button>
      </form>

      <div className='repo-info'>
        🗂️
        {repoLink ? (
          <>
            <Crumbs repoLink={repoLink} />
            <StarCounter repoLink={repoLink} />
          </>
        ) : (
          <Typography.Text type='secondary'> Enter the link to your repository </Typography.Text>
        )}
      </div>
    </>
  );
};
