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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      product_colors: {
        Row: {
          active: boolean
          hex: string
          id: string
          name: string
          product_id: string
          sort_order: number
        }
        Insert: {
          active?: boolean
          hex: string
          id?: string
          name: string
          product_id: string
          sort_order?: number
        }
        Update: {
          active?: boolean
          hex?: string
          id?: string
          name?: string
          product_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_colors_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_customization_sizes: {
        Row: {
          customization_id: string
          id: string
          label: string
          quantity: number
          size_id: string
        }
        Insert: {
          customization_id: string
          id?: string
          label: string
          quantity: number
          size_id: string
        }
        Update: {
          customization_id?: string
          id?: string
          label?: string
          quantity?: number
          size_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_customization_sizes_customization_id_fkey"
            columns: ["customization_id"]
            isOneToOne: false
            referencedRelation: "product_customizations"
            referencedColumns: ["id"]
          },
        ]
      }
      product_customizations: {
        Row: {
          back_area_cm2: number
          back_artwork_url: string | null
          back_height_cm: number
          back_preview_url: string | null
          back_width_cm: number
          calculated_price: number
          color_id: string
          configuration: Json
          created_at: string
          front_area_cm2: number
          front_artwork_url: string | null
          front_height_cm: number
          front_preview_url: string | null
          front_width_cm: number
          id: string
          product_id: string
          status: string
          updated_at: string
          user_id: string
          whatsapp_attachment_status: string
        }
        Insert: {
          back_area_cm2?: number
          back_artwork_url?: string | null
          back_height_cm?: number
          back_preview_url?: string | null
          back_width_cm?: number
          calculated_price?: number
          color_id: string
          configuration: Json
          created_at?: string
          front_area_cm2?: number
          front_artwork_url?: string | null
          front_height_cm?: number
          front_preview_url?: string | null
          front_width_cm?: number
          id?: string
          product_id: string
          status?: string
          updated_at?: string
          user_id: string
          whatsapp_attachment_status?: string
        }
        Update: {
          back_area_cm2?: number
          back_artwork_url?: string | null
          back_height_cm?: number
          back_preview_url?: string | null
          back_width_cm?: number
          calculated_price?: number
          color_id?: string
          configuration?: Json
          created_at?: string
          front_area_cm2?: number
          front_artwork_url?: string | null
          front_height_cm?: number
          front_preview_url?: string | null
          front_width_cm?: number
          id?: string
          product_id?: string
          status?: string
          updated_at?: string
          user_id?: string
          whatsapp_attachment_status?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_customizations_color_id_fkey"
            columns: ["color_id"]
            isOneToOne: false
            referencedRelation: "product_colors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_customizations_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_customizer_configs: {
        Row: {
          back_print_area: Json
          enabled: boolean
          front_print_area: Json
          garment_height_cm: number
          garment_width_cm: number
          pricing: Json
          product_id: string
        }
        Insert: {
          back_print_area?: Json
          enabled?: boolean
          front_print_area?: Json
          garment_height_cm?: number
          garment_width_cm?: number
          pricing?: Json
          product_id: string
        }
        Update: {
          back_print_area?: Json
          enabled?: boolean
          front_print_area?: Json
          garment_height_cm?: number
          garment_width_cm?: number
          pricing?: Json
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_customizer_configs_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: true
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean
          back_url: string | null
          category: string
          created_at: string
          description: string
          front_url: string
          id: string
          name: string
          price: number
          sort_order: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          back_url?: string | null
          category?: string
          created_at?: string
          description?: string
          front_url: string
          id?: string
          name: string
          price: number
          sort_order?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          back_url?: string | null
          category?: string
          created_at?: string
          description?: string
          front_url?: string
          id?: string
          name?: string
          price?: number
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      store_settings: {
        Row: {
          about_text: string
          accent_color: string
          announcement: string
          brand_name: string
          coupon_code: string
          coupon_discount: number
          grid_columns: number
          hero_image_url: string
          hero_layout: string
          hero_subtitle: string
          hero_title: string
          id: number
          instagram_url: string
          logo_url: string
          promo_price: number
          show_about: boolean
          show_offer: boolean
          updated_at: string
          whatsapp_number: string
        }
        Insert: {
          about_text?: string
          accent_color?: string
          announcement?: string
          brand_name?: string
          coupon_code?: string
          coupon_discount?: number
          grid_columns?: number
          hero_image_url: string
          hero_layout?: string
          hero_subtitle?: string
          hero_title?: string
          id?: number
          instagram_url?: string
          logo_url: string
          promo_price?: number
          show_about?: boolean
          show_offer?: boolean
          updated_at?: string
          whatsapp_number?: string
        }
        Update: {
          about_text?: string
          accent_color?: string
          announcement?: string
          brand_name?: string
          coupon_code?: string
          coupon_discount?: number
          grid_columns?: number
          hero_image_url?: string
          hero_layout?: string
          hero_subtitle?: string
          hero_title?: string
          id?: number
          instagram_url?: string
          logo_url?: string
          promo_price?: number
          show_about?: boolean
          show_offer?: boolean
          updated_at?: string
          whatsapp_number?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_store_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "user"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
