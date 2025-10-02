import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface MasterDataItem {
  id: string;
  category: string;
  value: string;
  display_order: number;
  is_active: boolean;
}

const CATEGORIES = [
  { value: 'project', label: 'Project / Community' },
  { value: 'zone', label: 'Zone / Sub-area' },
  { value: 'transaction_type', label: 'Transaction Type' },
  { value: 'property_type', label: 'Property Type' },
  { value: 'availability_status', label: 'Availability Status' },
  { value: 'furnishing', label: 'Furnishing' },
  { value: 'orientation', label: 'Orientation' },
  { value: 'view', label: 'View' },
  { value: 'pet_policy', label: 'Pet Policy' },
  { value: 'owner_type', label: 'Owner Type' },
  { value: 'land_use_type', label: 'Land Use Type' },
  { value: 'amenity', label: 'Amenities' },
  { value: 'nearby_amenity', label: 'Nearby Amenities' },
  { value: 'utility', label: 'Utilities Included' },
  { value: 'project_facility', label: 'Project Facilities' },
  { value: 'gallery_category', label: 'Gallery Categories' },
];

const MasterData = () => {
  const [masterData, setMasterData] = useState<MasterDataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('project');
  const [newValue, setNewValue] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchMasterData();
  }, [selectedCategory]);

  const fetchMasterData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("master_data")
      .select("*")
      .eq("category", selectedCategory)
      .order("display_order");

    if (data && !error) {
      setMasterData(data);
    }
    setLoading(false);
  };

  const handleAdd = async () => {
    if (!newValue.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a value",
      });
      return;
    }

    try {
      const maxOrder = masterData.length > 0 
        ? Math.max(...masterData.map(item => item.display_order))
        : 0;

      const { error } = await supabase
        .from("master_data")
        .insert([{
          category: selectedCategory,
          value: newValue,
          display_order: maxOrder + 1,
          is_active: true,
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item added successfully",
      });

      setNewValue('');
      fetchMasterData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("master_data")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item deleted successfully",
      });

      fetchMasterData();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Master Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Enter new value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
            />
            <Button onClick={handleAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {CATEGORIES.find(c => c.value === selectedCategory)?.label} Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Value</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {masterData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">
                      No items found
                    </TableCell>
                  </TableRow>
                ) : (
                  masterData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.value}</TableCell>
                      <TableCell>{item.display_order}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MasterData;