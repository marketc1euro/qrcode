
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { User } from './AuthContext';

export interface Client extends User {
  role: 'client';
  name: string;
  email: string;
  profilePicture?: string;
  qrCode: string;
  customLink: string;
  createdAt: Date;
}

interface ClientContextType {
  clients: Client[];
  addClient: (client: Omit<Client, 'id' | 'role' | 'createdAt'>) => void;
  updateClient: (id: string, clientData: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  getClient: (id: string) => Client | undefined;
  loading: boolean;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

// Initial mock data
const initialClients: Client[] = [
  {
    id: '2',
    email: 'client1@example.com',
    role: 'client',
    name: 'John Smith',
    profilePicture: 'https://source.unsplash.com/random/200x200/?person=1',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://example.com/client/john',
    customLink: 'http://example.com/client/john',
    createdAt: new Date('2023-01-15')
  },
  {
    id: '3',
    email: 'client2@example.com',
    role: 'client',
    name: 'Sarah Johnson',
    profilePicture: 'https://source.unsplash.com/random/200x200/?person=2',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://example.com/client/sarah',
    customLink: 'http://example.com/client/sarah',
    createdAt: new Date('2023-02-20')
  },
  {
    id: '4',
    email: 'client3@example.com',
    role: 'client',
    name: 'Michael Brown',
    profilePicture: 'https://source.unsplash.com/random/200x200/?person=3',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=http://example.com/client/michael',
    customLink: 'http://example.com/client/michael',
    createdAt: new Date('2023-03-10')
  }
];

export function ClientProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const savedClients = localStorage.getItem('clients');
    if (savedClients) {
      try {
        const parsedClients = JSON.parse(savedClients).map((client: any) => ({
          ...client,
          createdAt: new Date(client.createdAt)
        }));
        setClients(parsedClients);
      } catch (e) {
        console.error("Error parsing clients from localStorage", e);
        setClients(initialClients);
      }
    } else {
      setClients(initialClients);
    }
    setLoading(false);
  }, []);

  // Save to localStorage whenever clients change
  useEffect(() => {
    if (clients.length > 0) {
      localStorage.setItem('clients', JSON.stringify(clients));
    }
  }, [clients]);

  const addClient = (clientData: Omit<Client, 'id' | 'role' | 'createdAt'>) => {
    const newClient: Client = {
      ...clientData,
      id: `client_${Date.now()}`,
      role: 'client',
      createdAt: new Date()
    };
    
    setClients(prev => [...prev, newClient]);
    toast({
      title: 'Client added',
      description: `${newClient.name} has been added successfully.`,
    });
  };

  const updateClient = (id: string, clientData: Partial<Client>) => {
    setClients(prev => 
      prev.map(client => 
        client.id === id ? { ...client, ...clientData } : client
      )
    );
    toast({
      title: 'Client updated',
      description: `Client information has been updated successfully.`,
    });
  };

  const deleteClient = (id: string) => {
    const clientToDelete = clients.find(client => client.id === id);
    setClients(prev => prev.filter(client => client.id !== id));
    toast({
      title: 'Client removed',
      description: `${clientToDelete?.name || 'Client'} has been removed.`,
    });
  };

  const getClient = (id: string) => {
    return clients.find(client => client.id === id);
  };

  return (
    <ClientContext.Provider value={{
      clients,
      addClient,
      updateClient,
      deleteClient,
      getClient,
      loading
    }}>
      {children}
    </ClientContext.Provider>
  );
}

export function useClients() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClients must be used within a ClientProvider');
  }
  return context;
}
