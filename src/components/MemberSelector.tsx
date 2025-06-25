
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Member {
  id: string;
  name: string;
  avatar: string;
  role: string;
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
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('kebun_members');
    if (stored) {
      setMembers(JSON.parse(stored));
    } else {
      // Default member if none exist
      const defaultMember = {
        id: '1',
        name: 'Garden Enthusiast',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
        role: 'Owner'
      };
      setMembers([defaultMember]);
      localStorage.setItem('kebun_members', JSON.stringify([defaultMember]));
    }
  }, []);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {members.map((member) => (
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
