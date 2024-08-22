import React, { useState } from 'react';

interface Props {
  setItems: (items: string[]) => void;
}

const SearchBar: React.FC<Props> = ({ setItems }) => {
  const [items, setItemsState] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newSkill, setNewSkill] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddSkill = () => {
    if (!items.includes(newSkill) && newSkill !== '') {
      setItemsState([...items, newSkill]);
      setNewSkill('');
    }
  };

  const filtereditems = items.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for items"
      />
      <ul>
        {filtereditems.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newSkill}
        onChange={(e) => setNewSkill(e.target.value)}
        placeholder="Add new skill"
      />
      <button onClick={handleAddSkill}>Add Skill</button>
    </div>
  );
};

export default SearchBar;