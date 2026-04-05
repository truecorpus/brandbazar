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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          address_line_1: string
          address_line_2: string | null
          city: string
          country: string
          created_at: string
          id: string
          is_default: boolean | null
          label: string | null
          phone: string | null
          pincode: string
          recipient_name: string
          state: string
          updated_at: string
          user_id: string
        }
        Insert: {
          address_line_1: string
          address_line_2?: string | null
          city: string
          country?: string
          created_at?: string
          id?: string
          is_default?: boolean | null
          label?: string | null
          phone?: string | null
          pincode: string
          recipient_name: string
          state: string
          updated_at?: string
          user_id: string
        }
        Update: {
          address_line_1?: string
          address_line_2?: string | null
          city?: string
          country?: string
          created_at?: string
          id?: string
          is_default?: boolean | null
          label?: string | null
          phone?: string | null
          pincode?: string
          recipient_name?: string
          state?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      artwork_uploads: {
        Row: {
          created_at: string
          file_name: string
          file_size: number | null
          file_type: string | null
          file_url: string
          id: string
          is_final_approved: boolean | null
          order_item_id: string | null
          quote_id: string | null
          review_status: string | null
          reviewer_id: string | null
          reviewer_notes: string | null
          updated_at: string
          uploaded_by: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_size?: number | null
          file_type?: string | null
          file_url: string
          id?: string
          is_final_approved?: boolean | null
          order_item_id?: string | null
          quote_id?: string | null
          review_status?: string | null
          reviewer_id?: string | null
          reviewer_notes?: string | null
          updated_at?: string
          uploaded_by: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
          is_final_approved?: boolean | null
          order_item_id?: string | null
          quote_id?: string | null
          review_status?: string | null
          reviewer_id?: string | null
          reviewer_notes?: string | null
          updated_at?: string
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "artwork_uploads_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artwork_uploads_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "customer_quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artwork_uploads_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          action_type: string
          admin_user_id: string | null
          affected_record_id: string | null
          affected_table: string
          created_at: string
          id: string
          ip_address: unknown
          new_value: Json | null
          old_value: Json | null
        }
        Insert: {
          action_type: string
          admin_user_id?: string | null
          affected_record_id?: string | null
          affected_table: string
          created_at?: string
          id?: string
          ip_address?: unknown
          new_value?: Json | null
          old_value?: Json | null
        }
        Update: {
          action_type?: string
          admin_user_id?: string | null
          affected_record_id?: string | null
          affected_table?: string
          created_at?: string
          id?: string
          ip_address?: unknown
          new_value?: Json | null
          old_value?: Json | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          banner_image_url: string | null
          created_at: string
          description: string | null
          display_order: number | null
          icon_url: string | null
          id: string
          is_active: boolean | null
          meta_description: string | null
          meta_title: string | null
          name: string
          parent_category_id: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          banner_image_url?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          parent_category_id?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          banner_image_url?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          parent_category_id?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_category_id_fkey"
            columns: ["parent_category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_content: {
        Row: {
          body: string | null
          content_type: string
          created_at: string
          cta_link: string | null
          cta_text: string | null
          display_order: number | null
          id: string
          image_url: string | null
          is_active: boolean | null
          subtitle: string | null
          target_audience: string | null
          title: string
          updated_at: string
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          body?: string | null
          content_type: string
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          subtitle?: string | null
          target_audience?: string | null
          title: string
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          body?: string | null
          content_type?: string
          created_at?: string
          cta_link?: string | null
          cta_text?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          subtitle?: string | null
          target_audience?: string | null
          title?: string
          updated_at?: string
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      corporate_account_members: {
        Row: {
          corporate_account_id: string
          created_at: string
          id: string
          is_primary_contact: boolean | null
          user_id: string
        }
        Insert: {
          corporate_account_id: string
          created_at?: string
          id?: string
          is_primary_contact?: boolean | null
          user_id: string
        }
        Update: {
          corporate_account_id?: string
          created_at?: string
          id?: string
          is_primary_contact?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "corporate_account_members_corporate_account_id_fkey"
            columns: ["corporate_account_id"]
            isOneToOne: false
            referencedRelation: "corporate_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      corporate_accounts: {
        Row: {
          account_manager_id: string | null
          company_address: string | null
          company_name: string
          company_size: string | null
          contract_end_date: string | null
          contract_start_date: string | null
          created_at: string
          credit_limit: number | null
          current_balance: number | null
          gst_number: string | null
          id: string
          industry_type: string | null
          is_active: boolean | null
          notes: string | null
          onboarding_date: string | null
          pan_number: string | null
          payment_terms: string | null
          pricing_tier: string | null
          updated_at: string
        }
        Insert: {
          account_manager_id?: string | null
          company_address?: string | null
          company_name: string
          company_size?: string | null
          contract_end_date?: string | null
          contract_start_date?: string | null
          created_at?: string
          credit_limit?: number | null
          current_balance?: number | null
          gst_number?: string | null
          id?: string
          industry_type?: string | null
          is_active?: boolean | null
          notes?: string | null
          onboarding_date?: string | null
          pan_number?: string | null
          payment_terms?: string | null
          pricing_tier?: string | null
          updated_at?: string
        }
        Update: {
          account_manager_id?: string | null
          company_address?: string | null
          company_name?: string
          company_size?: string | null
          contract_end_date?: string | null
          contract_start_date?: string | null
          created_at?: string
          credit_limit?: number | null
          current_balance?: number | null
          gst_number?: string | null
          id?: string
          industry_type?: string | null
          is_active?: boolean | null
          notes?: string | null
          onboarding_date?: string | null
          pan_number?: string | null
          payment_terms?: string | null
          pricing_tier?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      coupons: {
        Row: {
          applicable_category_ids: string[] | null
          applicable_product_ids: string[] | null
          code: string
          created_at: string
          created_by: string | null
          description: string | null
          discount_type: string
          discount_value: number
          id: string
          is_active: boolean | null
          max_discount_cap: number | null
          min_order_value: number | null
          times_used: number | null
          usage_limit_per_user: number | null
          usage_limit_total: number | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          applicable_category_ids?: string[] | null
          applicable_product_ids?: string[] | null
          code: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          discount_type: string
          discount_value?: number
          id?: string
          is_active?: boolean | null
          max_discount_cap?: number | null
          min_order_value?: number | null
          times_used?: number | null
          usage_limit_per_user?: number | null
          usage_limit_total?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          applicable_category_ids?: string[] | null
          applicable_product_ids?: string[] | null
          code?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          discount_type?: string
          discount_value?: number
          id?: string
          is_active?: boolean | null
          max_discount_cap?: number | null
          min_order_value?: number | null
          times_used?: number | null
          usage_limit_per_user?: number | null
          usage_limit_total?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      customization_options: {
        Row: {
          created_at: string
          id: string
          is_required: boolean | null
          option_label: string
          option_type: string
          option_values: Json
          product_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_required?: boolean | null
          option_label: string
          option_type: string
          option_values?: Json
          product_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_required?: boolean | null
          option_label?: string
          option_type?: string
          option_values?: Json
          product_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "customization_options_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      customization_pricing_rules: {
        Row: {
          additional_cost_per_unit: number
          created_at: string
          id: string
          is_active: boolean | null
          minimum_quantity: number | null
          product_id: string | null
          rule_description: string | null
          rule_name: string
          rule_type: string
        }
        Insert: {
          additional_cost_per_unit?: number
          created_at?: string
          id?: string
          is_active?: boolean | null
          minimum_quantity?: number | null
          product_id?: string | null
          rule_description?: string | null
          rule_name: string
          rule_type: string
        }
        Update: {
          additional_cost_per_unit?: number
          created_at?: string
          id?: string
          is_active?: boolean | null
          minimum_quantity?: number | null
          product_id?: string | null
          rule_description?: string | null
          rule_name?: string
          rule_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "customization_pricing_rules_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      customization_sessions: {
        Row: {
          active_view: string | null
          bulk_data: Json | null
          created_at: string
          customer_user_id: string | null
          device_type: string | null
          expires_at: string
          id: string
          identical_quantity: number | null
          last_modified_at: string
          personalization_fields: Json | null
          personalized_quantity: number | null
          product_id: string | null
          selected_print_method: string | null
          selected_variant_id: string | null
          session_state: Json
          session_status: string
          template_id: string | null
          total_quantity: number | null
        }
        Insert: {
          active_view?: string | null
          bulk_data?: Json | null
          created_at?: string
          customer_user_id?: string | null
          device_type?: string | null
          expires_at?: string
          id?: string
          identical_quantity?: number | null
          last_modified_at?: string
          personalization_fields?: Json | null
          personalized_quantity?: number | null
          product_id?: string | null
          selected_print_method?: string | null
          selected_variant_id?: string | null
          session_state?: Json
          session_status?: string
          template_id?: string | null
          total_quantity?: number | null
        }
        Update: {
          active_view?: string | null
          bulk_data?: Json | null
          created_at?: string
          customer_user_id?: string | null
          device_type?: string | null
          expires_at?: string
          id?: string
          identical_quantity?: number | null
          last_modified_at?: string
          personalization_fields?: Json | null
          personalized_quantity?: number | null
          product_id?: string | null
          selected_print_method?: string | null
          selected_variant_id?: string | null
          session_state?: Json
          session_status?: string
          template_id?: string | null
          total_quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "customization_sessions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customization_sessions_selected_variant_id_fkey"
            columns: ["selected_variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "customization_sessions_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "product_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      design_elements: {
        Row: {
          category: string
          created_at: string
          element_name: string
          element_type: string
          id: string
          image_url: string | null
          is_premium: boolean | null
          svg_content: string | null
          tags: string[] | null
          usage_count: number | null
        }
        Insert: {
          category?: string
          created_at?: string
          element_name: string
          element_type: string
          id?: string
          image_url?: string | null
          is_premium?: boolean | null
          svg_content?: string | null
          tags?: string[] | null
          usage_count?: number | null
        }
        Update: {
          category?: string
          created_at?: string
          element_name?: string
          element_type?: string
          id?: string
          image_url?: string | null
          is_premium?: boolean | null
          svg_content?: string | null
          tags?: string[] | null
          usage_count?: number | null
        }
        Relationships: []
      }
      design_layers: {
        Row: {
          content: string | null
          created_at: string
          design_id: string
          fill_color: string | null
          filters_applied: Json | null
          font_color: string | null
          font_id: string | null
          font_size: number | null
          font_style: string | null
          font_weight: string | null
          height: number | null
          id: string
          layer_order: number
          layer_type: string
          letter_spacing: number | null
          opacity: number | null
          position_x: number | null
          position_y: number | null
          print_zone_id: string | null
          rotation: number | null
          stroke_color: string | null
          stroke_width: number | null
          text_alignment: string | null
          width: number | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          design_id: string
          fill_color?: string | null
          filters_applied?: Json | null
          font_color?: string | null
          font_id?: string | null
          font_size?: number | null
          font_style?: string | null
          font_weight?: string | null
          height?: number | null
          id?: string
          layer_order?: number
          layer_type: string
          letter_spacing?: number | null
          opacity?: number | null
          position_x?: number | null
          position_y?: number | null
          print_zone_id?: string | null
          rotation?: number | null
          stroke_color?: string | null
          stroke_width?: number | null
          text_alignment?: string | null
          width?: number | null
        }
        Update: {
          content?: string | null
          created_at?: string
          design_id?: string
          fill_color?: string | null
          filters_applied?: Json | null
          font_color?: string | null
          font_id?: string | null
          font_size?: number | null
          font_style?: string | null
          font_weight?: string | null
          height?: number | null
          id?: string
          layer_order?: number
          layer_type?: string
          letter_spacing?: number | null
          opacity?: number | null
          position_x?: number | null
          position_y?: number | null
          print_zone_id?: string | null
          rotation?: number | null
          stroke_color?: string | null
          stroke_width?: number | null
          text_alignment?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "design_layers_design_id_fkey"
            columns: ["design_id"]
            isOneToOne: false
            referencedRelation: "saved_designs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "design_layers_font_id_fkey"
            columns: ["font_id"]
            isOneToOne: false
            referencedRelation: "font_library"
            referencedColumns: ["id"]
          },
        ]
      }
      design_templates_gallery: {
        Row: {
          category: string | null
          created_at: string
          design_state: Json
          id: string
          industry_tags: string[] | null
          is_featured: boolean | null
          name: string
          product_template_id: string | null
          thumbnail_url: string | null
          usage_count: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          design_state?: Json
          id?: string
          industry_tags?: string[] | null
          is_featured?: boolean | null
          name: string
          product_template_id?: string | null
          thumbnail_url?: string | null
          usage_count?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string
          design_state?: Json
          id?: string
          industry_tags?: string[] | null
          is_featured?: boolean | null
          name?: string
          product_template_id?: string | null
          thumbnail_url?: string | null
          usage_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "design_templates_gallery_product_template_id_fkey"
            columns: ["product_template_id"]
            isOneToOne: false
            referencedRelation: "product_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      font_library: {
        Row: {
          category: string
          created_at: string
          font_family: string
          font_file_url: string | null
          font_name: string
          id: string
          is_active: boolean | null
          is_safe_for_print: boolean | null
          min_recommended_size: number | null
          preview_text_image_url: string | null
        }
        Insert: {
          category?: string
          created_at?: string
          font_family: string
          font_file_url?: string | null
          font_name: string
          id?: string
          is_active?: boolean | null
          is_safe_for_print?: boolean | null
          min_recommended_size?: number | null
          preview_text_image_url?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          font_family?: string
          font_file_url?: string | null
          font_name?: string
          id?: string
          is_active?: boolean | null
          is_safe_for_print?: boolean | null
          min_recommended_size?: number | null
          preview_text_image_url?: string | null
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount_in_words: string | null
          buyer_address: string | null
          buyer_gstin: string | null
          buyer_name: string | null
          buyer_state: string | null
          buyer_state_code: string | null
          cgst_amount: number | null
          cgst_rate: number | null
          corporate_account_id: string | null
          created_at: string | null
          credit_reason: string | null
          customer_id: string
          discount_amount: number | null
          due_date: string | null
          grand_total: number
          id: string
          igst_amount: number | null
          igst_rate: number | null
          invoice_date: string | null
          invoice_number: string | null
          invoice_type: string
          line_items: Json
          notes: string | null
          order_id: string | null
          original_invoice_id: string | null
          payment_id: string | null
          payment_method: string | null
          pdf_url: string | null
          seller_address: string | null
          seller_company: string | null
          seller_gstin: string | null
          seller_pan: string | null
          sgst_amount: number | null
          sgst_rate: number | null
          shipping_address: string | null
          shipping_state: string | null
          status: string | null
          subtotal: number
          taxable_amount: number
          total_gst: number | null
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount_in_words?: string | null
          buyer_address?: string | null
          buyer_gstin?: string | null
          buyer_name?: string | null
          buyer_state?: string | null
          buyer_state_code?: string | null
          cgst_amount?: number | null
          cgst_rate?: number | null
          corporate_account_id?: string | null
          created_at?: string | null
          credit_reason?: string | null
          customer_id: string
          discount_amount?: number | null
          due_date?: string | null
          grand_total?: number
          id?: string
          igst_amount?: number | null
          igst_rate?: number | null
          invoice_date?: string | null
          invoice_number?: string | null
          invoice_type?: string
          line_items?: Json
          notes?: string | null
          order_id?: string | null
          original_invoice_id?: string | null
          payment_id?: string | null
          payment_method?: string | null
          pdf_url?: string | null
          seller_address?: string | null
          seller_company?: string | null
          seller_gstin?: string | null
          seller_pan?: string | null
          sgst_amount?: number | null
          sgst_rate?: number | null
          shipping_address?: string | null
          shipping_state?: string | null
          status?: string | null
          subtotal?: number
          taxable_amount?: number
          total_gst?: number | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount_in_words?: string | null
          buyer_address?: string | null
          buyer_gstin?: string | null
          buyer_name?: string | null
          buyer_state?: string | null
          buyer_state_code?: string | null
          cgst_amount?: number | null
          cgst_rate?: number | null
          corporate_account_id?: string | null
          created_at?: string | null
          credit_reason?: string | null
          customer_id?: string
          discount_amount?: number | null
          due_date?: string | null
          grand_total?: number
          id?: string
          igst_amount?: number | null
          igst_rate?: number | null
          invoice_date?: string | null
          invoice_number?: string | null
          invoice_type?: string
          line_items?: Json
          notes?: string | null
          order_id?: string | null
          original_invoice_id?: string | null
          payment_id?: string | null
          payment_method?: string | null
          pdf_url?: string | null
          seller_address?: string | null
          seller_company?: string | null
          seller_gstin?: string | null
          seller_pan?: string | null
          sgst_amount?: number | null
          sgst_rate?: number | null
          shipping_address?: string | null
          shipping_state?: string | null
          status?: string | null
          subtotal?: number
          taxable_amount?: number
          total_gst?: number | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_corporate_account_id_fkey"
            columns: ["corporate_account_id"]
            isOneToOne: false
            referencedRelation: "corporate_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "customer_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_original_invoice_id_fkey"
            columns: ["original_invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_payment_id_fkey"
            columns: ["payment_id"]
            isOneToOne: false
            referencedRelation: "payments"
            referencedColumns: ["id"]
          },
        ]
      }
      mockups: {
        Row: {
          client_feedback: string | null
          client_responded_at: string | null
          created_at: string
          created_by: string
          id: string
          mockup_image_url: string
          order_item_id: string
          status: string | null
          version_number: number | null
        }
        Insert: {
          client_feedback?: string | null
          client_responded_at?: string | null
          created_at?: string
          created_by: string
          id?: string
          mockup_image_url: string
          order_item_id: string
          status?: string | null
          version_number?: number | null
        }
        Update: {
          client_feedback?: string | null
          client_responded_at?: string | null
          created_at?: string
          created_by?: string
          id?: string
          mockup_image_url?: string
          order_item_id?: string
          status?: string | null
          version_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mockups_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          channel: string | null
          created_at: string
          id: string
          is_read: boolean | null
          message: string | null
          notification_type: string
          recipient_id: string
          title: string
        }
        Insert: {
          action_url?: string | null
          channel?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string | null
          notification_type: string
          recipient_id: string
          title: string
        }
        Update: {
          action_url?: string | null
          channel?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string | null
          notification_type?: string
          recipient_id?: string
          title?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          artwork_file_urls: string[] | null
          bulk_personalization_data: Json | null
          created_at: string
          customization_selections: Json | null
          id: string
          is_personalized: boolean | null
          mockup_approved: boolean | null
          mockup_url: string | null
          order_id: string
          personalization_cost_per_unit: number | null
          print_notes: string | null
          product_id: string | null
          production_status: string | null
          quantity: number
          unit_price: number
          variant_id: string | null
        }
        Insert: {
          artwork_file_urls?: string[] | null
          bulk_personalization_data?: Json | null
          created_at?: string
          customization_selections?: Json | null
          id?: string
          is_personalized?: boolean | null
          mockup_approved?: boolean | null
          mockup_url?: string | null
          order_id: string
          personalization_cost_per_unit?: number | null
          print_notes?: string | null
          product_id?: string | null
          production_status?: string | null
          quantity?: number
          unit_price: number
          variant_id?: string | null
        }
        Update: {
          artwork_file_urls?: string[] | null
          bulk_personalization_data?: Json | null
          created_at?: string
          customization_selections?: Json | null
          id?: string
          is_personalized?: boolean | null
          mockup_approved?: boolean | null
          mockup_url?: string | null
          order_id?: string
          personalization_cost_per_unit?: number | null
          print_notes?: string | null
          product_id?: string | null
          production_status?: string | null
          quantity?: number
          unit_price?: number
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "customer_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          advance_amount: number | null
          advance_paid: boolean | null
          assigned_staff_id: string | null
          billing_address_id: string | null
          corporate_account_id: string | null
          created_at: string
          currency: string | null
          customer_id: string
          discount_amount: number | null
          expected_delivery_date: string | null
          gst_amount: number | null
          id: string
          internal_notes: string | null
          order_number: string | null
          order_status: string
          order_type: string
          payment_status: string
          payment_terms: string | null
          production_days: number | null
          remaining_amount: number | null
          shipping_address_id: string | null
          shipping_amount: number | null
          shipping_method: string | null
          shipping_zone_id: string | null
          special_instructions: string | null
          subtotal: number
          total_amount: number
          updated_at: string
        }
        Insert: {
          advance_amount?: number | null
          advance_paid?: boolean | null
          assigned_staff_id?: string | null
          billing_address_id?: string | null
          corporate_account_id?: string | null
          created_at?: string
          currency?: string | null
          customer_id: string
          discount_amount?: number | null
          expected_delivery_date?: string | null
          gst_amount?: number | null
          id?: string
          internal_notes?: string | null
          order_number?: string | null
          order_status?: string
          order_type?: string
          payment_status?: string
          payment_terms?: string | null
          production_days?: number | null
          remaining_amount?: number | null
          shipping_address_id?: string | null
          shipping_amount?: number | null
          shipping_method?: string | null
          shipping_zone_id?: string | null
          special_instructions?: string | null
          subtotal?: number
          total_amount?: number
          updated_at?: string
        }
        Update: {
          advance_amount?: number | null
          advance_paid?: boolean | null
          assigned_staff_id?: string | null
          billing_address_id?: string | null
          corporate_account_id?: string | null
          created_at?: string
          currency?: string | null
          customer_id?: string
          discount_amount?: number | null
          expected_delivery_date?: string | null
          gst_amount?: number | null
          id?: string
          internal_notes?: string | null
          order_number?: string | null
          order_status?: string
          order_type?: string
          payment_status?: string
          payment_terms?: string | null
          production_days?: number | null
          remaining_amount?: number | null
          shipping_address_id?: string | null
          shipping_amount?: number | null
          shipping_method?: string | null
          shipping_zone_id?: string | null
          special_instructions?: string | null
          subtotal?: number
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_billing_address_id_fkey"
            columns: ["billing_address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_corporate_account_id_fkey"
            columns: ["corporate_account_id"]
            isOneToOne: false
            referencedRelation: "corporate_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_shipping_address_id_fkey"
            columns: ["shipping_address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_shipping_zone_id_fkey"
            columns: ["shipping_zone_id"]
            isOneToOne: false
            referencedRelation: "shipping_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          gateway_transaction_id: string | null
          gst_invoice_number: string | null
          id: string
          invoice_url: string | null
          notes: string | null
          order_id: string
          payment_date: string | null
          payment_gateway: string | null
          payment_method: string | null
          payment_status: string | null
          refund_amount: number | null
          refund_date: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          gateway_transaction_id?: string | null
          gst_invoice_number?: string | null
          id?: string
          invoice_url?: string | null
          notes?: string | null
          order_id: string
          payment_date?: string | null
          payment_gateway?: string | null
          payment_method?: string | null
          payment_status?: string | null
          refund_amount?: number | null
          refund_date?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          gateway_transaction_id?: string | null
          gst_invoice_number?: string | null
          id?: string
          invoice_url?: string | null
          notes?: string | null
          order_id?: string
          payment_date?: string | null
          payment_gateway?: string | null
          payment_method?: string | null
          payment_status?: string | null
          refund_amount?: number | null
          refund_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "customer_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      pincode_serviceability: {
        Row: {
          city: string | null
          created_at: string
          id: string
          is_serviceable: boolean | null
          pincode: string
          state: string | null
          zone_id: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          id?: string
          is_serviceable?: boolean | null
          pincode: string
          state?: string | null
          zone_id?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string
          id?: string
          is_serviceable?: boolean | null
          pincode?: string
          state?: string | null
          zone_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pincode_serviceability_zone_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "shipping_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images: {
        Row: {
          alt_text: string | null
          created_at: string
          display_order: number | null
          id: string
          image_type: string | null
          image_url: string
          is_primary: boolean | null
          product_id: string
          variant_id: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_type?: string | null
          image_url: string
          is_primary?: boolean | null
          product_id: string
          variant_id?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          image_type?: string | null
          image_url?: string
          is_primary?: boolean | null
          product_id?: string
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_images_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      product_templates: {
        Row: {
          base_product_image_url: string | null
          canvas_height: number
          canvas_width: number
          created_at: string
          id: string
          print_zones: Json
          product_type: Database["public"]["Enums"]["product_type"]
          status: string
          template_name: string
          updated_at: string
          views: Json
        }
        Insert: {
          base_product_image_url?: string | null
          canvas_height?: number
          canvas_width?: number
          created_at?: string
          id?: string
          print_zones?: Json
          product_type: Database["public"]["Enums"]["product_type"]
          status?: string
          template_name: string
          updated_at?: string
          views?: Json
        }
        Update: {
          base_product_image_url?: string | null
          canvas_height?: number
          canvas_width?: number
          created_at?: string
          id?: string
          print_zones?: Json
          product_type?: Database["public"]["Enums"]["product_type"]
          status?: string
          template_name?: string
          updated_at?: string
          views?: Json
        }
        Relationships: []
      }
      product_variants: {
        Row: {
          additional_price: number | null
          color: string | null
          created_at: string
          id: string
          material: string | null
          product_id: string
          size: string | null
          sku: string | null
          status: string
          stock_quantity: number | null
          updated_at: string
          variant_image_urls: string[] | null
          variant_name: string
        }
        Insert: {
          additional_price?: number | null
          color?: string | null
          created_at?: string
          id?: string
          material?: string | null
          product_id: string
          size?: string | null
          sku?: string | null
          status?: string
          stock_quantity?: number | null
          updated_at?: string
          variant_image_urls?: string[] | null
          variant_name: string
        }
        Update: {
          additional_price?: number | null
          color?: string | null
          created_at?: string
          id?: string
          material?: string | null
          product_id?: string
          size?: string | null
          sku?: string | null
          status?: string
          stock_quantity?: number | null
          updated_at?: string
          variant_image_urls?: string[] | null
          variant_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          base_price: number
          bulk_price_tiers: Json | null
          category_id: string | null
          created_at: string
          fts: unknown
          gst_rate: number | null
          hsn_code: string | null
          id: string
          is_corporate_pick: boolean | null
          is_featured: boolean | null
          long_description: string | null
          meta_description: string | null
          meta_title: string | null
          name: string
          short_description: string | null
          slug: string
          sort_order: number | null
          status: string
          updated_at: string
        }
        Insert: {
          base_price?: number
          bulk_price_tiers?: Json | null
          category_id?: string | null
          created_at?: string
          fts?: unknown
          gst_rate?: number | null
          hsn_code?: string | null
          id?: string
          is_corporate_pick?: boolean | null
          is_featured?: boolean | null
          long_description?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          short_description?: string | null
          slug: string
          sort_order?: number | null
          status?: string
          updated_at?: string
        }
        Update: {
          base_price?: number
          bulk_price_tiers?: Json | null
          category_id?: string | null
          created_at?: string
          fts?: unknown
          gst_rate?: number | null
          hsn_code?: string | null
          id?: string
          is_corporate_pick?: boolean | null
          is_featured?: boolean | null
          long_description?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          short_description?: string | null
          slug?: string
          sort_order?: number | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_status: string
          company_name: string | null
          created_at: string
          designation: string | null
          full_name: string | null
          gst_number: string | null
          id: string
          last_login: string | null
          newsletter_opt_in: boolean | null
          phone: string | null
          preferred_language: string | null
          profile_photo_url: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          account_status?: string
          company_name?: string | null
          created_at?: string
          designation?: string | null
          full_name?: string | null
          gst_number?: string | null
          id?: string
          last_login?: string | null
          newsletter_opt_in?: boolean | null
          phone?: string | null
          preferred_language?: string | null
          profile_photo_url?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          account_status?: string
          company_name?: string | null
          created_at?: string
          designation?: string | null
          full_name?: string | null
          gst_number?: string | null
          id?: string
          last_login?: string | null
          newsletter_opt_in?: boolean | null
          phone?: string | null
          preferred_language?: string | null
          profile_photo_url?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      quotes: {
        Row: {
          admin_notes: string | null
          corporate_account_id: string | null
          created_at: string
          customer_id: string | null
          id: string
          lead_email: string | null
          lead_name: string | null
          lead_phone: string | null
          products_requested: Json
          quote_number: string | null
          responded_at: string | null
          status: string
          total_estimated_amount: number | null
          updated_at: string
          valid_until: string | null
        }
        Insert: {
          admin_notes?: string | null
          corporate_account_id?: string | null
          created_at?: string
          customer_id?: string | null
          id?: string
          lead_email?: string | null
          lead_name?: string | null
          lead_phone?: string | null
          products_requested?: Json
          quote_number?: string | null
          responded_at?: string | null
          status?: string
          total_estimated_amount?: number | null
          updated_at?: string
          valid_until?: string | null
        }
        Update: {
          admin_notes?: string | null
          corporate_account_id?: string | null
          created_at?: string
          customer_id?: string | null
          id?: string
          lead_email?: string | null
          lead_name?: string | null
          lead_phone?: string | null
          products_requested?: Json
          quote_number?: string | null
          responded_at?: string | null
          status?: string
          total_estimated_amount?: number | null
          updated_at?: string
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_corporate_account_id_fkey"
            columns: ["corporate_account_id"]
            isOneToOne: false
            referencedRelation: "corporate_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      return_requests: {
        Row: {
          admin_notes: string | null
          created_at: string
          credit_note_id: string | null
          customer_id: string
          description: string | null
          id: string
          order_id: string
          photo_urls: string[] | null
          reason: string
          refund_amount: number | null
          refund_status: string | null
          return_courier: string | null
          return_tracking_number: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string
          credit_note_id?: string | null
          customer_id: string
          description?: string | null
          id?: string
          order_id: string
          photo_urls?: string[] | null
          reason: string
          refund_amount?: number | null
          refund_status?: string | null
          return_courier?: string | null
          return_tracking_number?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          created_at?: string
          credit_note_id?: string | null
          customer_id?: string
          description?: string | null
          id?: string
          order_id?: string
          photo_urls?: string[] | null
          reason?: string
          refund_amount?: number | null
          refund_status?: string | null
          return_courier?: string | null
          return_tracking_number?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "return_requests_credit_note_id_fkey"
            columns: ["credit_note_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "return_requests_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "customer_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "return_requests_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          admin_response: string | null
          approved_at: string | null
          created_at: string
          id: string
          is_verified_purchase: boolean | null
          order_item_id: string | null
          product_id: string
          rating: number
          review_body: string | null
          review_title: string | null
          reviewer_id: string
          status: string | null
        }
        Insert: {
          admin_response?: string | null
          approved_at?: string | null
          created_at?: string
          id?: string
          is_verified_purchase?: boolean | null
          order_item_id?: string | null
          product_id: string
          rating: number
          review_body?: string | null
          review_title?: string | null
          reviewer_id: string
          status?: string | null
        }
        Update: {
          admin_response?: string | null
          approved_at?: string | null
          created_at?: string
          id?: string
          is_verified_purchase?: boolean | null
          order_item_id?: string | null
          product_id?: string
          rating?: number
          review_body?: string | null
          review_title?: string | null
          reviewer_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_designs: {
        Row: {
          admin_approval_notes: string | null
          approved_at: string | null
          created_at: string
          customer_user_id: string
          customization_summary: Json | null
          design_name: string | null
          design_state: Json
          id: string
          is_approved_by_admin: boolean | null
          preview_image_urls: string[] | null
          print_file_status: string | null
          print_file_urls: string[] | null
          product_id: string | null
          session_id: string | null
          template_id: string | null
        }
        Insert: {
          admin_approval_notes?: string | null
          approved_at?: string | null
          created_at?: string
          customer_user_id: string
          customization_summary?: Json | null
          design_name?: string | null
          design_state?: Json
          id?: string
          is_approved_by_admin?: boolean | null
          preview_image_urls?: string[] | null
          print_file_status?: string | null
          print_file_urls?: string[] | null
          product_id?: string | null
          session_id?: string | null
          template_id?: string | null
        }
        Update: {
          admin_approval_notes?: string | null
          approved_at?: string | null
          created_at?: string
          customer_user_id?: string
          customization_summary?: Json | null
          design_name?: string | null
          design_state?: Json
          id?: string
          is_approved_by_admin?: boolean | null
          preview_image_urls?: string[] | null
          print_file_status?: string | null
          print_file_urls?: string[] | null
          product_id?: string | null
          session_id?: string | null
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_designs_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_designs_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "customization_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_designs_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "product_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      shipments: {
        Row: {
          actual_delivery_date: string | null
          courier_partner: string | null
          created_at: string
          delivery_proof_url: string | null
          dimensions: string | null
          dispatch_date: string | null
          expected_delivery_date: string | null
          id: string
          order_id: string
          shipment_status: string | null
          shipping_cost: number | null
          tracking_number: string | null
          tracking_url: string | null
          updated_at: string
          weight: number | null
        }
        Insert: {
          actual_delivery_date?: string | null
          courier_partner?: string | null
          created_at?: string
          delivery_proof_url?: string | null
          dimensions?: string | null
          dispatch_date?: string | null
          expected_delivery_date?: string | null
          id?: string
          order_id: string
          shipment_status?: string | null
          shipping_cost?: number | null
          tracking_number?: string | null
          tracking_url?: string | null
          updated_at?: string
          weight?: number | null
        }
        Update: {
          actual_delivery_date?: string | null
          courier_partner?: string | null
          created_at?: string
          delivery_proof_url?: string | null
          dimensions?: string | null
          dispatch_date?: string | null
          expected_delivery_date?: string | null
          id?: string
          order_id?: string
          shipment_status?: string | null
          shipping_cost?: number | null
          tracking_number?: string | null
          tracking_url?: string | null
          updated_at?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "shipments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "customer_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shipments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      shipping_zones: {
        Row: {
          created_at: string
          express_days: number | null
          express_rate: number | null
          flat_rate: number | null
          free_shipping_threshold: number | null
          id: string
          is_active: boolean | null
          standard_days: number | null
          updated_at: string
          zone_name: string
          zone_type: string
        }
        Insert: {
          created_at?: string
          express_days?: number | null
          express_rate?: number | null
          flat_rate?: number | null
          free_shipping_threshold?: number | null
          id?: string
          is_active?: boolean | null
          standard_days?: number | null
          updated_at?: string
          zone_name: string
          zone_type?: string
        }
        Update: {
          created_at?: string
          express_days?: number | null
          express_rate?: number | null
          flat_rate?: number | null
          free_shipping_threshold?: number | null
          id?: string
          is_active?: boolean | null
          standard_days?: number | null
          updated_at?: string
          zone_name?: string
          zone_type?: string
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      customer_orders: {
        Row: {
          advance_amount: number | null
          advance_paid: boolean | null
          billing_address_id: string | null
          corporate_account_id: string | null
          created_at: string | null
          currency: string | null
          customer_id: string | null
          discount_amount: number | null
          expected_delivery_date: string | null
          gst_amount: number | null
          id: string | null
          order_number: string | null
          order_status: string | null
          order_type: string | null
          payment_status: string | null
          payment_terms: string | null
          production_days: number | null
          remaining_amount: number | null
          shipping_address_id: string | null
          shipping_amount: number | null
          shipping_method: string | null
          shipping_zone_id: string | null
          special_instructions: string | null
          subtotal: number | null
          total_amount: number | null
          updated_at: string | null
        }
        Insert: {
          advance_amount?: number | null
          advance_paid?: boolean | null
          billing_address_id?: string | null
          corporate_account_id?: string | null
          created_at?: string | null
          currency?: string | null
          customer_id?: string | null
          discount_amount?: number | null
          expected_delivery_date?: string | null
          gst_amount?: number | null
          id?: string | null
          order_number?: string | null
          order_status?: string | null
          order_type?: string | null
          payment_status?: string | null
          payment_terms?: string | null
          production_days?: number | null
          remaining_amount?: number | null
          shipping_address_id?: string | null
          shipping_amount?: number | null
          shipping_method?: string | null
          shipping_zone_id?: string | null
          special_instructions?: string | null
          subtotal?: number | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Update: {
          advance_amount?: number | null
          advance_paid?: boolean | null
          billing_address_id?: string | null
          corporate_account_id?: string | null
          created_at?: string | null
          currency?: string | null
          customer_id?: string | null
          discount_amount?: number | null
          expected_delivery_date?: string | null
          gst_amount?: number | null
          id?: string | null
          order_number?: string | null
          order_status?: string | null
          order_type?: string | null
          payment_status?: string | null
          payment_terms?: string | null
          production_days?: number | null
          remaining_amount?: number | null
          shipping_address_id?: string | null
          shipping_amount?: number | null
          shipping_method?: string | null
          shipping_zone_id?: string | null
          special_instructions?: string | null
          subtotal?: number | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_billing_address_id_fkey"
            columns: ["billing_address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_corporate_account_id_fkey"
            columns: ["corporate_account_id"]
            isOneToOne: false
            referencedRelation: "corporate_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_shipping_address_id_fkey"
            columns: ["shipping_address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_shipping_zone_id_fkey"
            columns: ["shipping_zone_id"]
            isOneToOne: false
            referencedRelation: "shipping_zones"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_quotes: {
        Row: {
          corporate_account_id: string | null
          created_at: string | null
          customer_id: string | null
          id: string | null
          lead_email: string | null
          lead_name: string | null
          lead_phone: string | null
          products_requested: Json | null
          quote_number: string | null
          responded_at: string | null
          status: string | null
          total_estimated_amount: number | null
          updated_at: string | null
          valid_until: string | null
        }
        Insert: {
          corporate_account_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string | null
          lead_email?: string | null
          lead_name?: string | null
          lead_phone?: string | null
          products_requested?: Json | null
          quote_number?: string | null
          responded_at?: string | null
          status?: string | null
          total_estimated_amount?: number | null
          updated_at?: string | null
          valid_until?: string | null
        }
        Update: {
          corporate_account_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string | null
          lead_email?: string | null
          lead_name?: string | null
          lead_phone?: string | null
          products_requested?: Json | null
          quote_number?: string | null
          responded_at?: string | null
          status?: string | null
          total_estimated_amount?: number | null
          updated_at?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_corporate_account_id_fkey"
            columns: ["corporate_account_id"]
            isOneToOne: false
            referencedRelation: "corporate_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_return_requests: {
        Row: {
          created_at: string | null
          credit_note_id: string | null
          customer_id: string | null
          description: string | null
          id: string | null
          order_id: string | null
          photo_urls: string[] | null
          reason: string | null
          refund_amount: number | null
          refund_status: string | null
          return_courier: string | null
          return_tracking_number: string | null
          reviewed_at: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          credit_note_id?: string | null
          customer_id?: string | null
          description?: string | null
          id?: string | null
          order_id?: string | null
          photo_urls?: string[] | null
          reason?: string | null
          refund_amount?: number | null
          refund_status?: string | null
          return_courier?: string | null
          return_tracking_number?: string | null
          reviewed_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          credit_note_id?: string | null
          customer_id?: string | null
          description?: string | null
          id?: string | null
          order_id?: string | null
          photo_urls?: string[] | null
          reason?: string | null
          refund_amount?: number | null
          refund_status?: string | null
          return_courier?: string | null
          return_tracking_number?: string | null
          reviewed_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "return_requests_credit_note_id_fkey"
            columns: ["credit_note_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "return_requests_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "customer_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "return_requests_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      check_admins_exist: { Args: never; Returns: boolean }
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin_or_above: { Args: { _user_id: string }; Returns: boolean }
      is_staff_or_above: { Args: { _user_id: string }; Returns: boolean }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      app_role:
        | "super_admin"
        | "admin"
        | "staff"
        | "corporate_client"
        | "individual_customer"
      product_type:
        | "mug"
        | "tshirt"
        | "cap"
        | "idcard"
        | "lamp"
        | "keychain"
        | "notebook"
        | "kit"
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
    Enums: {
      app_role: [
        "super_admin",
        "admin",
        "staff",
        "corporate_client",
        "individual_customer",
      ],
      product_type: [
        "mug",
        "tshirt",
        "cap",
        "idcard",
        "lamp",
        "keychain",
        "notebook",
        "kit",
      ],
    },
  },
} as const
