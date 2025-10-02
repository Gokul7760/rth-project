import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Bed, Bath, Square } from "lucide-react";

interface Property {
  id: string;
  property_id: string;
  property_title: string;
  property_type: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  size_sqm: number;
  price_vnd: number;
  price_per_sqm: number;
  availability_status: string;
  is_featured: boolean;
  date_listed: string;
}

const PropertyList = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });

    if (data && !error) {
      setProperties(data);
    }
    setLoading(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No properties yet</h3>
          <p className="text-muted-foreground">Click "Add Property" to create your first listing</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <Card key={property.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start mb-2">
              <Badge variant="outline">{property.property_id}</Badge>
              {property.is_featured && (
                <Badge className="bg-primary">Featured</Badge>
              )}
            </div>
            <CardTitle className="text-lg">{property.property_title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Building2 className="h-4 w-4 mr-2" />
              {property.property_type}
            </div>

            {property.address && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                {property.address}
              </div>
            )}

            <div className="grid grid-cols-3 gap-2 text-sm">
              {property.bedrooms && (
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1 text-muted-foreground" />
                  {property.bedrooms}
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1 text-muted-foreground" />
                  {property.bathrooms}
                </div>
              )}
              {property.size_sqm && (
                <div className="flex items-center">
                  <Square className="h-4 w-4 mr-1 text-muted-foreground" />
                  {property.size_sqm}m²
                </div>
              )}
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold text-primary">
                    {formatPrice(property.price_vnd)}
                  </p>
                  {property.price_per_sqm && (
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(property.price_per_sqm)}/m²
                    </p>
                  )}
                </div>
                <Badge variant="secondary">{property.availability_status}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PropertyList;