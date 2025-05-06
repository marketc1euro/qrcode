
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { QrCode, ArrowRight } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

const Home: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center text-center py-12">
        <div className="bg-primary/10 p-5 rounded-full mb-6">
          <QrCode size={48} className="text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          QR Code & Link Management Platform
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-8">
          Create, manage, and share custom QR codes and links for your clients in one centralized platform.
        </p>
        <div className="flex gap-4">
          <Link to="/login">
            <Button size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="bg-card hover-card-gradient p-6 rounded-lg shadow-sm">
          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <QrCode className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">Custom QR Codes</h3>
          <p className="text-muted-foreground">Generate unique QR codes for each client that link to their custom landing pages.</p>
        </div>
        
        <div className="bg-card hover-card-gradient p-6 rounded-lg shadow-sm">
          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">Client Management</h3>
          <p className="text-muted-foreground">Easily create and manage client profiles, tracking their personalized links and resources.</p>
        </div>
        
        <div className="bg-card hover-card-gradient p-6 rounded-lg shadow-sm">
          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">Secure Access</h3>
          <p className="text-muted-foreground">Provide secure login access for both administrators and clients with role-based permissions.</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
