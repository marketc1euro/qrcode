
import React from 'react';
import { QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface QrCodeCardProps {
  qrCode: string;
  clientName: string;
  customLink: string;
}

const QrCodeCard: React.FC<QrCodeCardProps> = ({ qrCode, clientName, customLink }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <QrCode className="mr-2 h-5 w-5" />
          Client QR Code
        </CardTitle>
        <CardDescription>
          This QR code will redirect to the client's custom link.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="border p-4 rounded-lg shadow-sm mb-4">
          <img 
            src={qrCode} 
            alt={`QR Code for ${clientName}`}
            className="w-48 h-48 object-contain"
          />
        </div>
        <p className="text-sm text-muted-foreground text-center max-w-md">
          This QR code leads to: {customLink}
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline" onClick={() => window.open(qrCode, '_blank')}>
          Download QR Code
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QrCodeCard;
