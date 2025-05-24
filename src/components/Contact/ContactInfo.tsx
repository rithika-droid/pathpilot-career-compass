
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Phone, Mail, MessageCircle } from 'lucide-react';

const ContactInfo = () => {
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
              RN
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">Rithika Nemmaluri</h3>
            <p className="text-sm text-muted-foreground">Contact for Help</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <Phone className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Phone Support</p>
            <p className="text-sm text-muted-foreground">+91 8522943214</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <Mail className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Email Support</p>
            <p className="text-sm text-muted-foreground break-all">
              nemmaluririthika080606@gmail.com
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2">
            <MessageCircle className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Available</p>
            <p className="text-sm text-muted-foreground">Mon-Fri, 9am-5pm IST</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInfo;
