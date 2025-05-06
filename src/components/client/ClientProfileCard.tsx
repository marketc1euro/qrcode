
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ClientProfileCardProps {
  name: string;
  email: string;
  profilePicture?: string;
  isEditing: boolean;
  formData: {
    name: string;
    email: string;
    profilePicture: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ClientProfileCard: React.FC<ClientProfileCardProps> = ({
  name,
  email,
  profilePicture,
  isEditing,
  formData,
  handleInputChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center text-center">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={isEditing ? formData.profilePicture : profilePicture} alt={name} />
          <AvatarFallback className="text-2xl">{name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        {isEditing ? (
          <div className="w-full space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profilePicture">Profile Picture URL</Label>
              <Input
                id="profilePicture"
                name="profilePicture"
                value={formData.profilePicture}
                onChange={handleInputChange}
              />
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-muted-foreground mb-4">{email}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ClientProfileCard;
