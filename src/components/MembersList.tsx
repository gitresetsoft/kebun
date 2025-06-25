
import React, { useState } from 'react';
import { User, Plus, Edit3, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Member {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

interface MembersListProps {
  isOwner?: boolean;
}

const MembersList: React.FC<MembersListProps> = ({ isOwner = false }) => {
  const [members, setMembers] = useState<Member[]>(() => {
    const stored = localStorage.getItem('kebun_members');
    return stored ? JSON.parse(stored) : [
      {
        id: '1',
        name: 'Garden Enthusiast',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
        role: 'Owner'
      }
    ];
  });

  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');

  const addMember = () => {
    if (!newMemberName.trim()) return;
    
    const newMember: Member = {
      id: Date.now().toString(),
      name: newMemberName.trim(),
      avatar: `https://images.unsplash.com/photo-151877066${Math.floor(Math.random() * 10)}39-4636190af475?w=400`,
      role: 'Member'
    };

    const updatedMembers = [...members, newMember];
    setMembers(updatedMembers);
    localStorage.setItem('kebun_members', JSON.stringify(updatedMembers));
    setNewMemberName('');
    setIsAddingMember(false);
  };

  const removeMember = (id: string) => {
    const updatedMembers = members.filter(member => member.id !== id);
    setMembers(updatedMembers);
    localStorage.setItem('kebun_members', JSON.stringify(updatedMembers));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">Garden Members</h3>
        {isOwner && (
          <Button
            onClick={() => setIsAddingMember(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member) => (
          <div key={member.id} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200">
            <div className="flex items-center space-x-3">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 truncate">{member.name}</h4>
                <p className="text-xs text-green-600">{member.role}</p>
              </div>
              {isOwner && member.role !== 'Owner' && (
                <button
                  onClick={() => removeMember(member.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {isAddingMember && (
        <div className="mt-6 p-4 bg-green-50 rounded-xl">
          <div className="flex space-x-3">
            <Input
              type="text"
              placeholder="Member name"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && addMember()}
            />
            <Button onClick={addMember} className="bg-green-600 hover:bg-green-700">
              Add
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsAddingMember(false);
                setNewMemberName('');
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembersList;
