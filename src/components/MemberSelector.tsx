import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { members } from '../data/members';

interface Member {
  id: string;
  name: string;
  avatar: string;
}

interface MemberSelectorProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

const MemberSelector: React.FC<MemberSelectorProps> = ({ 
  value, 
  onValueChange, 
  placeholder = "Select member..." 
}) => {
  const [membersList, setMembersList] = useState<Member[]>([]);

  useEffect(() => {
    setMembersList(members);
  }, []);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {membersList.map((member) => (
          <SelectItem key={member.id} value={member.id}>
            <div className="flex items-center space-x-2">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span>{member.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MemberSelector;
