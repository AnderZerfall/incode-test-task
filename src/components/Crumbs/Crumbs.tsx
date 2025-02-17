import { Breadcrumb } from 'antd';
import { getOwnerLinkName, getRepoName } from '../../api/githubApi';
import { useMemo } from 'react';


type Props = {
  repoLink: string;
};

export const Crumbs: React.FC<Props> = ({ repoLink }) => {
  const ownerLink = useMemo(() => getOwnerLinkName(repoLink), [repoLink]);
  const repoName = useMemo(() => getRepoName(repoLink), [repoLink]);

  return (
    <Breadcrumb
      style={{ margin: '16px 0', }}
      separator=">"
    >
      <Breadcrumb.Item>
        <a
          href={ownerLink[1]}
          className=""
        >
          {ownerLink[0]}
        </a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <a
          href={repoLink}
          className=""
        >
          {repoName}
        </a>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};
