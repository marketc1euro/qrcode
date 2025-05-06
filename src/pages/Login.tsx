
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
              <QrCode className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Connectez-vous à QR Client Hub</h1>
            <p className="text-muted-foreground mt-2">
              Entrez votre email ci-dessous pour accéder à votre compte
            </p>
          </div>
          
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Connexion</CardTitle>
                <CardDescription>
                  Accédez à votre tableau de bord administrateur ou client.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="email@exemple.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Connexion en cours..." : "Se connecter"}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <div className="mb-4">
              <p className="font-medium">Comptes de démonstration:</p>
              <p>Admin: admin@example.com</p>
              <p>Client: client1@example.com</p>
              <p>Nouveau client: marketc1euro / Market123!</p>
            </div>
            <p>
              Pour cette démo, n'importe quel mot de passe fonctionne pour les comptes préexistants.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
