import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClients } from '@/contexts/ClientContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';

const NewClient: React.FC = () => {
  const navigate = useNavigate();
  const { addClient } = useClients();
  const { addUserAccount } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profilePicture: '',
    customLink: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Generate QR code using API
      const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(formData.customLink)}`;
      
      // Add client to the clients list
      const newClient = addClient({
        ...formData,
        qrCode,
      });
      
      // Add client to the auth system with specified role
      addUserAccount({
        email: formData.email,
        password: formData.password,
        role: 'client',
        name: formData.name,
        profilePicture: formData.profilePicture,
        qrCode: qrCode,
        customLink: formData.customLink
      });
      
      toast({
        title: "Client créé",
        description: `${formData.name} a été ajouté avec succès`,
      });
      
      navigate('/admin/dashboard');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Échec de la création du client",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ajouter un nouveau client</h1>
          <p className="text-muted-foreground">Créez un nouveau profil client avec QR code et lien personnalisé.</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Informations du client</CardTitle>
            <CardDescription>
              Entrez les détails du client et les informations de lien personnalisées.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Informations de base</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-muted-foreground">
                  Ce mot de passe sera utilisé par le client pour se connecter à son compte.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="profilePicture">URL de l'image de profil</Label>
                <Input
                  id="profilePicture"
                  name="profilePicture"
                  placeholder="https://exemple.com/profile.jpg"
                  value={formData.profilePicture}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-muted-foreground">
                  Entrez l'URL d'une image pour le profil du client (optionnel).
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Informations de lien personnalisé</h3>
              <div className="space-y-2">
                <Label htmlFor="customLink">URL du lien personnalisé *</Label>
                <Input
                  id="customLink"
                  name="customLink"
                  placeholder="https://example.com/page-client"
                  required
                  value={formData.customLink}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-muted-foreground">
                  C'est l'URL vers laquelle pointera le QR code. Ce doit être une URL valide.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/admin/dashboard')}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Création..." : "Créer le client"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </MainLayout>
  );
};

export default NewClient;
