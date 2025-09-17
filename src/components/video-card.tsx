import React, { useState } from 'react';
import {
  Card,
  // CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { X, Clock, Play, Info } from "lucide-react";
// import { cn } from "@/lib/utils";

interface VideoCardProps {
  youtubeId: string;
  thumbnailSrc: string;
  title: string;
  description: string;
  duration: string;
  category?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  youtubeId,
  thumbnailSrc,
  title,
  description,
  duration,
  category
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* Card */}
      <Card 
        className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
        onClick={openModal}
      >
        <div className="relative overflow-hidden">
          <img 
            src={thumbnailSrc} 
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <div className="scale-0 group-hover:scale-100 transition-transform duration-300">
              <Play className="h-12 w-12 text-white fill-white/20" />
            </div>
          </div>
          
          {/* Duration Badge */}
          <Badge variant="secondary" className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm">
            <Clock className="h-3 w-3 mr-1" />
            {duration}
          </Badge>
          
          {/* Category Badge */}
          {category && (
            <Badge className="absolute top-2 left-2 bg-primary/90">
              {category}
            </Badge>
          )}
        </div>
        
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        
        <CardFooter className="p-4 pt-0">
          <Button variant="outline" size="sm" className="w-full" onClick={openModal}>
            <Play className="h-4 w-4 mr-2" />
            Ver video
          </Button>
        </CardFooter>
      </Card>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-50 bg-background/80 backdrop-blur-sm rounded-full"
              onClick={closeModal}
            >
              <X className="h-4 w-4" />
            </Button>
            
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-0">
              {/* YouTube Video */}
              <div className="lg:col-span-2 bg-muted">
                <div className="relative pb-[56.25%] h-0">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
              
              {/* Descripción */}
              <div className="lg:col-span-1 p-6">
                <DialogHeader>
                  <DialogTitle className="text-xl">{title}</DialogTitle>
                  <DialogDescription className="mt-2">
                    {description}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {category && (
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-muted-foreground">
                          Categoría
                        </Label>
                        <Badge variant="secondary" className="w-full justify-center">
                          {category}
                        </Badge>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="duration" className="text-muted-foreground">
                        Duración
                      </Label>
                      <div className="flex items-center justify-center px-3 py-1 border rounded-md text-sm">
                        <Clock className="h-4 w-4 mr-2" />
                        {duration}
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4">
                    <Info className="h-4 w-4 mr-2" />
                    Ver más detalles
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoCard;