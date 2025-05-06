
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

interface CustomLinkCardProps {
  customLink: string;
  isEditing: boolean;
  formData: {
    customLink: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomLinkCard: React.FC<CustomLinkCardProps> = ({
  customLink,
  isEditing,
  formData,
  handleInputChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <ExternalLink className="mr-2 h-5 w-5" />
          Custom Link Management
        </CardTitle>
        <CardDescription>
          Configure the URL where the QR code will direct users.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-2">
            <Label htmlFor="customLink">Custom Link URL</Label>
            <Input
              id="customLink"
              name="customLink"
              value={formData.customLink}
              onChange={handleInputChange}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Changing this link will automatically regenerate the QR code.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3 border rounded-md bg-muted/50 flex items-center justify-between">
              <span className="text-sm font-medium break-all">
                {customLink}
              </span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(customLink);
                  toast({
                    title: "Link copied",
                    description: "The custom link has been copied to your clipboard",
                  });
                }}
              >
                Copy
              </Button>
            </div>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => window.open(customLink, '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit Link
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CustomLinkCard;
