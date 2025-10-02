import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

interface MasterDataItem {
  id: string;
  value: string;
  category: string;
}

const PropertyForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [masterData, setMasterData] = useState<MasterDataItem[]>([]);
  
  const [formData, setFormData] = useState({
    property_type: "",
    project: "",
    zone: "",
    property_title: "",
    transaction_type: "",
    address: "",
    availability_status: "",
    size_sqm: "",
    bedrooms: "",
    bathrooms: "",
    floors: "",
    floor_number: "",
    furnishing: "",
    year_built: "",
    orientation: "",
    view: "",
    parking_availability: "",
    pet_policy: "",
    price_vnd: "",
    contract_terms: "",
    deposit_terms: "",
    maintenance_fee: "",
    available_from: "",
    description: "",
    is_featured: false,
    landlord_name: "",
    landlord_phone: "",
    landlord_email: "",
    owner_type: "",
    landlord_notes: "",
    consultant_name: "",
    consultant_phone: "",
    consultant_email: "",
    internal_notes: "",
    land_use_type: "",
    incentives: "",
    developer_name: "",
    project_completion_year: "",
  });

  useEffect(() => {
    fetchMasterData();
  }, []);

  const fetchMasterData = async () => {
    const { data } = await supabase
      .from("master_data")
      .select("*")
      .eq("is_active", true)
      .order("display_order");
    
    if (data) {
      setMasterData(data);
    }
  };

  const getMasterDataByCategory = (category: string) => {
    return masterData.filter(item => item.category === category);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Generate property ID
      const { data: propertyIdData, error: idError } = await supabase
        .rpc('generate_property_id', { p_type: formData.property_type });

      if (idError) throw idError;

      const propertyData = {
        property_id: propertyIdData,
        property_type: formData.property_type,
        project: formData.project,
        zone: formData.zone,
        property_title: formData.property_title,
        transaction_type: formData.transaction_type,
        address: formData.address,
        availability_status: formData.availability_status,
        size_sqm: formData.size_sqm ? parseFloat(formData.size_sqm) : null,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        floors: formData.floors ? parseInt(formData.floors) : null,
        floor_number: formData.floor_number ? parseInt(formData.floor_number) : null,
        furnishing: formData.furnishing,
        year_built: formData.year_built ? parseInt(formData.year_built) : null,
        orientation: formData.orientation,
        view: formData.view,
        parking_availability: formData.parking_availability,
        pet_policy: formData.pet_policy,
        price_vnd: formData.price_vnd ? parseFloat(formData.price_vnd) : null,
        contract_terms: formData.contract_terms,
        deposit_terms: formData.deposit_terms,
        maintenance_fee: formData.maintenance_fee ? parseFloat(formData.maintenance_fee) : null,
        available_from: formData.available_from || null,
        description: formData.description,
        is_featured: formData.is_featured,
        landlord_name: formData.landlord_name,
        landlord_phone: formData.landlord_phone,
        landlord_email: formData.landlord_email,
        owner_type: formData.owner_type,
        landlord_notes: formData.landlord_notes,
        consultant_name: formData.consultant_name,
        consultant_phone: formData.consultant_phone,
        consultant_email: formData.consultant_email,
        internal_notes: formData.internal_notes,
        land_use_type: formData.land_use_type,
        incentives: formData.incentives,
        developer_name: formData.developer_name,
        project_completion_year: formData.project_completion_year ? parseInt(formData.project_completion_year) : null,
        created_by: user.id,
      };

      const { error } = await supabase
        .from("properties")
        .insert([propertyData]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: `Property ${propertyIdData} created successfully.`,
      });

      onSuccess();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="property_type">Property Type *</Label>
            <Select value={formData.property_type} onValueChange={(value) => setFormData({...formData, property_type: value})} required>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {getMasterDataByCategory('property_type').map(item => (
                  <SelectItem key={item.id} value={item.value}>{item.value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="property_title">Property Title *</Label>
            <Input
              id="property_title"
              value={formData.property_title}
              onChange={(e) => setFormData({...formData, property_title: e.target.value})}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="transaction_type">Transaction Type</Label>
            <Select value={formData.transaction_type} onValueChange={(value) => setFormData({...formData, transaction_type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {getMasterDataByCategory('transaction_type').map(item => (
                  <SelectItem key={item.id} value={item.value}>{item.value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="project">Project / Community</Label>
            <Select value={formData.project} onValueChange={(value) => setFormData({...formData, project: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {getMasterDataByCategory('project').map(item => (
                  <SelectItem key={item.id} value={item.value}>{item.value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="zone">Zone / Sub-area</Label>
            <Select value={formData.zone} onValueChange={(value) => setFormData({...formData, zone: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select zone" />
              </SelectTrigger>
              <SelectContent>
                {getMasterDataByCategory('zone').map(item => (
                  <SelectItem key={item.id} value={item.value}>{item.value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="availability_status">Availability Status</Label>
            <Select value={formData.availability_status} onValueChange={(value) => setFormData({...formData, availability_status: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {getMasterDataByCategory('availability_status').map(item => (
                  <SelectItem key={item.id} value={item.value}>{item.value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="size_sqm">Size (m²)</Label>
            <Input
              id="size_sqm"
              type="number"
              value={formData.size_sqm}
              onChange={(e) => setFormData({...formData, size_sqm: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input
              id="bedrooms"
              type="number"
              value={formData.bedrooms}
              onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input
              id="bathrooms"
              type="number"
              value={formData.bathrooms}
              onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="floors">Floors</Label>
            <Input
              id="floors"
              type="number"
              value={formData.floors}
              onChange={(e) => setFormData({...formData, floors: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="floor_number">Floor Number</Label>
            <Input
              id="floor_number"
              type="number"
              value={formData.floor_number}
              onChange={(e) => setFormData({...formData, floor_number: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="furnishing">Furnishing</Label>
            <Select value={formData.furnishing} onValueChange={(value) => setFormData({...formData, furnishing: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select furnishing" />
              </SelectTrigger>
              <SelectContent>
                {getMasterDataByCategory('furnishing').map(item => (
                  <SelectItem key={item.id} value={item.value}>{item.value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="year_built">Year Built</Label>
            <Input
              id="year_built"
              type="number"
              value={formData.year_built}
              onChange={(e) => setFormData({...formData, year_built: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="orientation">Orientation</Label>
            <Select value={formData.orientation} onValueChange={(value) => setFormData({...formData, orientation: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select orientation" />
              </SelectTrigger>
              <SelectContent>
                {getMasterDataByCategory('orientation').map(item => (
                  <SelectItem key={item.id} value={item.value}>{item.value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="view">View</Label>
            <Select value={formData.view} onValueChange={(value) => setFormData({...formData, view: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                {getMasterDataByCategory('view').map(item => (
                  <SelectItem key={item.id} value={item.value}>{item.value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pet_policy">Pet Policy</Label>
            <Select value={formData.pet_policy} onValueChange={(value) => setFormData({...formData, pet_policy: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select policy" />
              </SelectTrigger>
              <SelectContent>
                {getMasterDataByCategory('pet_policy').map(item => (
                  <SelectItem key={item.id} value={item.value}>{item.value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Financial Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price_vnd">Price (VND)</Label>
            <Input
              id="price_vnd"
              type="number"
              value={formData.price_vnd}
              onChange={(e) => setFormData({...formData, price_vnd: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maintenance_fee">Maintenance Fee (VND/month)</Label>
            <Input
              id="maintenance_fee"
              type="number"
              value={formData.maintenance_fee}
              onChange={(e) => setFormData({...formData, maintenance_fee: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contract_terms">Contract Terms</Label>
            <Input
              id="contract_terms"
              value={formData.contract_terms}
              onChange={(e) => setFormData({...formData, contract_terms: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deposit_terms">Deposit / Payment Terms</Label>
            <Input
              id="deposit_terms"
              value={formData.deposit_terms}
              onChange={(e) => setFormData({...formData, deposit_terms: e.target.value})}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="available_from">Available From</Label>
            <Input
              id="available_from"
              type="date"
              value={formData.available_from}
              onChange={(e) => setFormData({...formData, available_from: e.target.value})}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            rows={5}
            placeholder="Enter property description..."
          />
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox
              id="is_featured"
              checked={formData.is_featured}
              onCheckedChange={(checked) => setFormData({...formData, is_featured: checked as boolean})}
            />
            <Label htmlFor="is_featured">Featured Property</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Landlord Information (Private)</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="landlord_name">Landlord Name</Label>
            <Input
              id="landlord_name"
              value={formData.landlord_name}
              onChange={(e) => setFormData({...formData, landlord_name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="landlord_phone">Landlord Phone</Label>
            <Input
              id="landlord_phone"
              value={formData.landlord_phone}
              onChange={(e) => setFormData({...formData, landlord_phone: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="landlord_email">Landlord Email</Label>
            <Input
              id="landlord_email"
              type="email"
              value={formData.landlord_email}
              onChange={(e) => setFormData({...formData, landlord_email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="owner_type">Owner Type</Label>
            <Select value={formData.owner_type} onValueChange={(value) => setFormData({...formData, owner_type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {getMasterDataByCategory('owner_type').map(item => (
                  <SelectItem key={item.id} value={item.value}>{item.value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="landlord_notes">Landlord Notes</Label>
            <Textarea
              id="landlord_notes"
              value={formData.landlord_notes}
              onChange={(e) => setFormData({...formData, landlord_notes: e.target.value})}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="land_use_type">Land Use Type</Label>
            <Select value={formData.land_use_type} onValueChange={(value) => setFormData({...formData, land_use_type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {getMasterDataByCategory('land_use_type').map(item => (
                  <SelectItem key={item.id} value={item.value}>{item.value}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="developer_name">Developer Name</Label>
            <Input
              id="developer_name"
              value={formData.developer_name}
              onChange={(e) => setFormData({...formData, developer_name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project_completion_year">Project Completion Year</Label>
            <Input
              id="project_completion_year"
              type="number"
              value={formData.project_completion_year}
              onChange={(e) => setFormData({...formData, project_completion_year: e.target.value})}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="incentives">Incentives / Promotions</Label>
            <Input
              id="incentives"
              value={formData.incentives}
              onChange={(e) => setFormData({...formData, incentives: e.target.value})}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Property"}
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;