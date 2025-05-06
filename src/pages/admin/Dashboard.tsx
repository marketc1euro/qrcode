
import React, { useState } from 'react';
import { useClients } from '@/contexts/ClientContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { UserPlus, Search, QrCode, ExternalLink, ArrowRight } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { formatDistanceToNow } from 'date-fns';

const Dashboard: React.FC = () => {
  const { clients, loading } = useClients();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage client profiles, QR codes, and custom links.</p>
        </div>
        <Link to="/admin/clients/new">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </Link>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Client Management</CardTitle>
          <CardDescription>Manage your clients and their associated QR codes and links.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search clients..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading clients...</p>
            </div>
          ) : filteredClients.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No clients found.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClients.map(client => (
                <Link to={`/admin/clients/${client.id}`} key={client.id}>
                  <div className="border rounded-lg p-4 hover:border-primary/50 hover:shadow-sm transition-all duration-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar>
                        <AvatarImage src={client.profilePicture} alt={client.name} />
                        <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium line-clamp-1">{client.name}</p>
                        <p className="text-xs text-muted-foreground">{client.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <QrCode className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">QR Code</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground truncate">Custom Link</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-xs">
                        Added {formatDistanceToNow(new Date(client.createdAt), { addSuffix: true })}
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Dashboard;
