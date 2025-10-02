export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      master_data: {
        Row: {
          category: string
          created_at: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          updated_at: string | null
          value: string
        }
        Insert: {
          category: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
          value: string
        }
        Update: {
          category?: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string | null
          amenities: string[] | null
          auto_expiry_date: string | null
          availability_status: string | null
          available_from: string | null
          bank_info: string | null
          bathrooms: number | null
          bedrooms: number | null
          consultant_email: string | null
          consultant_name: string | null
          consultant_phone: string | null
          contract_terms: string | null
          created_at: string | null
          created_by: string | null
          currency_toggle: string | null
          date_listed: string | null
          deposit_terms: string | null
          description: string | null
          developer_name: string | null
          floor_number: number | null
          floor_plan_url: string | null
          floors: number | null
          furnishing: string | null
          id: string
          incentives: string | null
          internal_notes: string | null
          is_featured: boolean | null
          land_use_type: string | null
          landlord_email: string | null
          landlord_name: string | null
          landlord_notes: string | null
          landlord_phone: string | null
          maintenance_fee: number | null
          multi_language_support: string | null
          nearby_amenities: string[] | null
          old_ref_no: string | null
          orientation: string | null
          owner_type: string | null
          parking_availability: string | null
          pet_policy: string | null
          price_per_sqm: number | null
          price_vnd: number | null
          project: string | null
          project_completion_year: number | null
          project_facilities: string[] | null
          property_documents: string[] | null
          property_id: string
          property_images: string[] | null
          property_title: string
          property_type: string | null
          property_video_url: string | null
          size_sqm: number | null
          transaction_type: string | null
          updated_at: string | null
          utilities_included: string[] | null
          view: string | null
          year_built: number | null
          zone: string | null
        }
        Insert: {
          address?: string | null
          amenities?: string[] | null
          auto_expiry_date?: string | null
          availability_status?: string | null
          available_from?: string | null
          bank_info?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          consultant_email?: string | null
          consultant_name?: string | null
          consultant_phone?: string | null
          contract_terms?: string | null
          created_at?: string | null
          created_by?: string | null
          currency_toggle?: string | null
          date_listed?: string | null
          deposit_terms?: string | null
          description?: string | null
          developer_name?: string | null
          floor_number?: number | null
          floor_plan_url?: string | null
          floors?: number | null
          furnishing?: string | null
          id?: string
          incentives?: string | null
          internal_notes?: string | null
          is_featured?: boolean | null
          land_use_type?: string | null
          landlord_email?: string | null
          landlord_name?: string | null
          landlord_notes?: string | null
          landlord_phone?: string | null
          maintenance_fee?: number | null
          multi_language_support?: string | null
          nearby_amenities?: string[] | null
          old_ref_no?: string | null
          orientation?: string | null
          owner_type?: string | null
          parking_availability?: string | null
          pet_policy?: string | null
          price_per_sqm?: number | null
          price_vnd?: number | null
          project?: string | null
          project_completion_year?: number | null
          project_facilities?: string[] | null
          property_documents?: string[] | null
          property_id: string
          property_images?: string[] | null
          property_title: string
          property_type?: string | null
          property_video_url?: string | null
          size_sqm?: number | null
          transaction_type?: string | null
          updated_at?: string | null
          utilities_included?: string[] | null
          view?: string | null
          year_built?: number | null
          zone?: string | null
        }
        Update: {
          address?: string | null
          amenities?: string[] | null
          auto_expiry_date?: string | null
          availability_status?: string | null
          available_from?: string | null
          bank_info?: string | null
          bathrooms?: number | null
          bedrooms?: number | null
          consultant_email?: string | null
          consultant_name?: string | null
          consultant_phone?: string | null
          contract_terms?: string | null
          created_at?: string | null
          created_by?: string | null
          currency_toggle?: string | null
          date_listed?: string | null
          deposit_terms?: string | null
          description?: string | null
          developer_name?: string | null
          floor_number?: number | null
          floor_plan_url?: string | null
          floors?: number | null
          furnishing?: string | null
          id?: string
          incentives?: string | null
          internal_notes?: string | null
          is_featured?: boolean | null
          land_use_type?: string | null
          landlord_email?: string | null
          landlord_name?: string | null
          landlord_notes?: string | null
          landlord_phone?: string | null
          maintenance_fee?: number | null
          multi_language_support?: string | null
          nearby_amenities?: string[] | null
          old_ref_no?: string | null
          orientation?: string | null
          owner_type?: string | null
          parking_availability?: string | null
          pet_policy?: string | null
          price_per_sqm?: number | null
          price_vnd?: number | null
          project?: string | null
          project_completion_year?: number | null
          project_facilities?: string[] | null
          property_documents?: string[] | null
          property_id?: string
          property_images?: string[] | null
          property_title?: string
          property_type?: string | null
          property_video_url?: string | null
          size_sqm?: number | null
          transaction_type?: string | null
          updated_at?: string | null
          utilities_included?: string[] | null
          view?: string | null
          year_built?: number | null
          zone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_property_id: {
        Args: { p_type: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
