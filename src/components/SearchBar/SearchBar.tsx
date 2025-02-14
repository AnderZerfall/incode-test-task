import { Input } from "antd";
import { Button } from "antd";
import { Crumbs } from '../Crumbs/Crumbs';
import { StarCounter } from '../StarCounter/StarCounter';

import './SearchBar.scss'
import { useRef, useState } from "react";

type Props = {
    loadIssues: (inputRef) => void; 
}

export const SearchBar: React.FC<Props> = ({ loadIssues }) => {
    const inputRef = useRef(null);
    const [link, setLink] = useState('');

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();

        if (inputRef.current) {
            setLink(inputRef.current.input?.value);
            loadIssues(inputRef.current.input?.value)
        }
        
    }

    return (
        <>
          <form className="search-bar" onSubmit={handleSearch}>
             <Input placeholder="Enter repo URL" ref={inputRef} />
             <Button type='primary' htmlType="submit"/>
        </form>
        {link && (
             <div className="main-page__repo-info">
             <Crumbs repoLink={link}/>
             <StarCounter />
         </div>
        )}
       
        </>
      
    )
}