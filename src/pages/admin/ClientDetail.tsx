
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useClients } from '@/contexts/ClientContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MainLayout from '@/components/layout/MainLayout';
import { toast } from '@/hooks/use-toast';

// Import the new component files
import ClientProfileCard from '@/components/client/ClientProfileCard';
import QrCodeCard from '@/components/client/QrCodeCard';
import CustomLinkCard from '@/components/client/CustomLinkCard';
import ClientActions from '@/components/client/ClientActions';

const ClientDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getClient, updateClient, deleteClient } = useClients();
  const navigate = useNavigate();
  
  const client = getClient(id || '');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: client?.name || '',
    email: client?.email || '',
    profilePicture: client?.profilePicture || '',
    customLink: client?.customLink || '',
  });
  
  if (!client) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-2">Client Not Found</h1>
          <p className="text-muted-foreground mb-6">The client you are looking for does not exist or has been removed.</p>
          <button onClick={() => navigate('/admin/dashboard')}>Return to Dashboard</button>
        </div>
      </MainLayout>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Generate new QR code if custom link changed
    let updatedData: Partial<any> = { ...formData };
    if (formData.customLink !== client.customLink) {
      updatedData.qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(formData.customLink)}`;
    }
    
    updateClient(client.id, updatedData);
    setIsEditing(false);
    toast({
      title: "Client updated",
      description: "Client information has been updated successfully",
    });
  };

  const handleDelete = () => {
    deleteClient(client.id);
    navigate('/admin/dashboard');
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
          <p className="text-muted-foreground">Client Profile and Management</p>
        </div>
        <ClientActions 
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onSave={handleSave}
          onDelete={handleDelete}
          clientName={client.name}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ClientProfileCard
            name={client.name}
            email={client.email}
            profilePicture={client.profilePicture}
            isEditing={isEditing}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="qr-code" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="qr-code">QR Code</TabsTrigger>
              <TabsTrigger value="custom-link">Custom Link</TabsTrigger>
            </TabsList>
            <TabsContent value="qr-code">
              <QrCodeCard 
                qrCode={client.qrCode}
                clientName={client.name}
                customLink={client.customLink}
              />
            </TabsContent>
            <TabsContent value="custom-link">
              <CustomLinkCard
                customLink={client.customLink}
                isEditing={isEditing}
                formData={formData}
                handleInputChange={handleInputChange}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default ClientDetail;
