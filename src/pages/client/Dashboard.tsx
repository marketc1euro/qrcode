
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { QrCode, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import MainLayout from '@/components/layout/MainLayout';

const ClientDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser || currentUser.role !== 'client') {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground">You need to be logged in as a client to view this page.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                Welcome to your client dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={currentUser.profilePicture} alt={currentUser.name || currentUser.email} />
                <AvatarFallback className="text-4xl">{(currentUser.name?.[0] || currentUser.email[0]).toUpperCase()}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold mb-1">{currentUser.name}</h2>
              <p className="text-muted-foreground mb-6">{currentUser.email}</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full md:w-2/3 grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <QrCode className="mr-2 h-5 w-5" />
                Your QR Code
              </CardTitle>
              <CardDescription>
                Scan this code to access your custom link
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {currentUser.qrCode ? (
                <>
                  <div className="border p-6 rounded-lg shadow-sm mb-4">
                    <img 
                      src={currentUser.qrCode} 
                      alt="Your QR Code" 
                      className="w-48 h-48 object-contain"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => window.open(currentUser.qrCode, '_blank')}
                  >
                    Download QR Code
                  </Button>
                </>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No QR code available.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ExternalLink className="mr-2 h-5 w-5" />
                Your Custom Link
              </CardTitle>
              <CardDescription>
                This is your personalized link
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentUser.customLink ? (
                <div className="space-y-4">
                  <div className="p-3 border rounded-md bg-muted/50 flex items-center justify-between">
                    <span className="text-sm font-medium break-all">
                      {currentUser.customLink}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(currentUser.customLink || '');
                        toast({
                          title: "Link copied",
                          description: "Your custom link has been copied to clipboard",
                        });
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                  <Button 
                    onClick={() => window.open(currentUser.customLink, '_blank')}
                    className="w-full"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Your Link
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No custom link available.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ClientDashboard;
