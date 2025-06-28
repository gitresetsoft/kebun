import React, { useState } from 'react';
import { User, Plus, Edit3, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { createRecord, deleteRecord } from '@/data/supabaseUtil';
import { Member } from '@/data/members';
import { Modal } from './ui/modal';

interface MembersListProps {
  isOwner?: boolean;
  members: Member[];
}

const MembersList: React.FC<MembersListProps> = ({ isOwner = false, members }) => {
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  let currentMembers = members.sort((a, b) => {
    if (a.jawatan && !b.jawatan) return -1;
    if (!a.jawatan && b.jawatan) return 1;
    return 0;
  });

  const addMember = async () => {
    if (!newMemberName.trim()) return;
    
    const newMemberData = {
      name: newMemberName.trim(),
      avatar: `https://images.unsplash.com/photo-151877066${Math.floor(Math.random() * 10)}39-4636190af475?w=400`,
      role: 'Member'
    };

    try {
      const createdMember = await createRecord('mykebun_member', newMemberData) as Member;
      currentMembers.push(createdMember);
      setNewMemberName('');
      setIsAddingMember(false);
    } catch (error) {
      console.error('Ralat menambah ahli:', error);
    }
  };

  const removeMember = async (id: string) => {
    try {
      await deleteRecord('mykebun_member', id);
      currentMembers = currentMembers.filter(member => member.id !== id);
    } catch (error) {
      console.error('Ralat menghapus ahli:', error);
    }
  };

  const handleMemberClick = (member: Member) => {
    setSelectedMember(member);
    setIsMemberModalOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg">
      <div className="flex items-center justify-between">
        {/* <h3 className="text-2xl font-bold text-gray-900">Ahli Kebun</h3> */}
        {isOwner && (
          <Button
            onClick={() => setIsAddingMember(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Tambah Ahli
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentMembers.map((member) => (
          <div key={member.id} className="bg-green-50 shadow-lg rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200" onClick={() => handleMemberClick(member)}>
            <div className="flex items-center space-x-3">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 truncate">{member.name}</h4>
                <p className="text-xs text-green-600">{member.jawatan}</p>
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
              placeholder="Nama ahli"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && addMember()}
            />
            <Button onClick={addMember} className="bg-green-600 hover:bg-green-700">
              Tambah
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsAddingMember(false);
                setNewMemberName('');
              }}
            >
              Batal
            </Button>
          </div>
        </div>
      )}

      {isMemberModalOpen && selectedMember && (
        <Modal isOpen={isMemberModalOpen} onClose={() => setIsMemberModalOpen(false)}>
          <div className="p-8 text-center">
            <img 
              src={selectedMember.avatar} 
              alt={selectedMember.name} 
              className="w-45 h-auto rounded-full mx-auto mb-4 object-cover" 
            />
            <h3 className="text-xl font-semibold text-gray-900">{selectedMember.name}</h3>
            <p className="text-gray-600">{selectedMember.jawatan}</p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MembersList;
